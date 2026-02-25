<?php

namespace App\Http\Requests\Settings;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\CpfValidation;

class ContactRequest extends FormRequest
{
    protected function prepareForValidation()
    {
        $this->merge([
            'phone' => preg_replace('/\D/', '', $this->phone),
            'cep' => preg_replace('/\D/', '', $this->cep),
        ]);
    }

    public function rules(): array
    {
        $contactId = $this->route('contact')?->id;

        return [
            'name' => 'required|string|max:255',
            'cpf' => ['required', 'string', new CpfValidation, "unique:contacts,cpf,{$contactId}"],
            'phone' => 'required|string',
            'cep' => 'required|string',
            'city' => 'required|string',
            'neighbourhood' => 'nullable|string',
            'street' => 'required|string',
            'number' => 'required|string',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ];
    }
}