<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Contact;
use App\Rules\CpfValidation;
use Inertia\Inertia;

class ContactController extends Controller
{

/**
 * The index function retrieves contacts based on a search query and returns them for display in a
 * dashboard using Inertia.js.
 */
public function index(Request $request)
{
    $search = $request->query('search');

    $contacts = auth()->user()->contacts()
        ->when($search, function ($query, $search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('cpf', 'like', "%{$search}%");
            });
        })
        ->orderBy('name', 'asc')
        ->paginate(10) 
        ->withQueryString();

    return Inertia::render('dashboard', [
        'contacts' => $contacts,
        'filters' => $request->only(['search']) 
    ]);
}

/**
 * The edit function checks if the user is authorized to edit a contact and renders the edit page with
 * the contact data.
 */
public function edit(Contact $contact)
{
    if ($contact->user_id !== auth()->id()) {
        abort(403);
    }

    return Inertia::render('contacts/Edit', ['contact' => $contact]);
}

/**
 * The function updates a contact's information after validating and sanitizing the input data.
 */
public function update(Request $request, Contact $contact)
{
    if ($contact->user_id !== auth()->id()) {
        abort(403);
    }

    $request->merge([
        'phone' => preg_replace('/[^0-9]/', '', $request->phone),
        'cep' => preg_replace('/[^0-9]/', '', $request->cep),
    ]);

    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'cpf' => ['required', 'string', new CpfValidation, 'unique:contacts,cpf,' . $contact->id],
        'phone' => 'required|string',
        'cep' => 'required|string',
        'city' => 'required|string',
        'neighbourhood' => 'nullable|string',
        'street' => 'required|string',
        'number' => 'required|string',
        'latitude' => 'required|numeric',
        'longitude' => 'required|numeric',
    ]);

    $contact->update($validated);

    return redirect()->route('dashboard')->with('success', 'Contact updated!');
}

/**
 * The create function returns a view for creating contacts using the Inertia framework in PHP.
 */
public function create()
{
    return Inertia::render('contacts/Create'); 
}

/**
 * The function `destroy` deletes a contact record and redirects back to the previous page.
 */
public function destroy(Contact $contact)
{
    $contact->delete();
    return back(); 
}

/**
 * The store function processes and validates user input to create a new contact associated with the
 * authenticated user.
 */
public function store(Request $request)
{

    $request->merge([
        'phone' => preg_replace('/[^0-9]/', '', $request->phone),
        'cep' => preg_replace('/[^0-9]/', '', $request->cep),
    ]);

    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'cpf' => ['required', 'string', new CpfValidation, 'unique:contacts,cpf'],
        'phone' => 'required|string',
        'cep' => 'required|string',
        'city' => 'required|string',
        'neighbourhood' => 'nullable|string',
        'street' => 'required|string',
        'number' => 'required|string',
        'latitude' => 'required|numeric',
        'longitude' => 'required|numeric',
    ]);

    auth()->user()->contacts()->create($validated);

    return redirect()->route('dashboard')->with('success', 'Contact created!');
}
}