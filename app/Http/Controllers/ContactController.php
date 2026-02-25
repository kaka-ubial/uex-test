<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Requests\Settings\ContactRequest;
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
public function update(ContactRequest $request, Contact $contact)
{
    $contact->update($request->validated());
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
public function store(ContactRequest $request)
{
    auth()->user()->contacts()->create($request->validated());
    return redirect()->route('dashboard')->with('success', 'Contact created!');
}
}