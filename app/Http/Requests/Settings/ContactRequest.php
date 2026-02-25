<?php

namespace App\Http\Requests\Settings;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\CpfValidation;

class ContactRequest extends FormRequest
{
    /**
     * Prepare the data for validation.
     * * This method runs before the 'rules' are applied. It sanitizes input by 
     * removing non-numeric characters from 'phone' and 'cep', ensuring 
     * consistent data formatting in the database regardless of user input style.
     */
    protected function prepareForValidation()
    {
        $this->merge([
            'phone' => preg_replace('/\D/', '', $this->phone),
            'cep' => preg_replace('/\D/', '', $this->cep),
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     * * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
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
            /**
             * Geographic coordinates:
             * Ensures coordinates are present and formatted as valid numbers 
             * for correct rendering on the frontend map component.
             */
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ];
    }
}