<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Contact;
use Inertia\Inertia;

class ContactController extends Controller
{

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

    public function edit(Contact $contact)
    {
        if ($contact->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('contacts/Edit', ['contact' => $contact]);
    }

    public function update(Request $request, Contact $contact)
    {
        if ($contact->user_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'cpf' => 'required|string|unique:contacts,cpf,' . $contact->id, 
            'phone' => 'required|string',
            'cep' => 'required|string',
            'city' => 'required|string',
            'latitude' => 'required|string',
            'longitude' => 'required|string',
            'street' => 'required|string',
            'number' => 'required|string',
        ]);

        $contact->update($validated);

        return redirect()->route('dashboard')->with('success', 'Contact updated!');
    }

    public function create()
    {
        return Inertia::render('contacts/Create'); 
    }

    public function destroy(Contact $contact)
    {
        $contact->delete();
        return back(); 
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'cpf' => 'required|string|unique:contacts,cpf',
            'phone' => 'required|string',
            'cep' => 'required|string',
            'city' => 'required|string',
            'street' => 'required|string',
            'number' => 'required|string',
            'neighbourhood' => 'nullable|string',
        ]);

        auth()->user()->contacts()->create($validated);

        return redirect()->route('dashboard')->with('success', 'Contact created!');
    }
}