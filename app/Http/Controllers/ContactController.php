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
 * Display a listing of the contacts.
 * * Fetches contacts belonging strictly to the authenticated user.
 * Real-time filtering via search strings (Name or CPF) 
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
 * Show the form for editing the specified contact.
 * * Includes a manual authorization check to ensure users cannot 
 * access contacts belonging to others via URL manipulation.
 */
public function edit(Contact $contact)
{
    if ($contact->user_id !== auth()->id()) {
        abort(403);
    }

    return Inertia::render('contacts/Edit', ['contact' => $contact]);
}

/**
 * Update the specified contact in storage.
 * * Relies on ContactRequest for validation (including CPF rules).
 */
public function update(ContactRequest $request, Contact $contact)
{
    $contact->update($request->validated());
    return redirect()->route('dashboard')->with('success', 'Contact updated!');
}

/**
 * Show the form for creating a new contact.
 */
public function create()
{
    return Inertia::render('contacts/Create'); 
}

/**
 * Remove the specified contact from storage.
 * * Utilizes Route Model Binding to automatically find the Contact instance.
 */
public function destroy(Contact $contact)
{
    $contact->delete();
    return back(); 
}

/**
 * Store a newly created contact in storage.
 * * Creates the contact through the User relationship to automatically
 * assign the 'user_id' foreign key to the authenticated user.
 */
public function store(ContactRequest $request)
{
    auth()->user()->contacts()->create($request->validated());
    return redirect()->route('dashboard')->with('success', 'Contact created!');
}
}