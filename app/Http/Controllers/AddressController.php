<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;

class AddressController extends Controller
{
    /**
     * The function `proxyCep` in PHP processes a given postal code (CEP), retrieves address information
     * from an Via Cep API, and returns the formatted data in JSON format.
     */
    public function proxyCep($cep)
    {
        $cep = preg_replace('/\D/', '', $cep);

        if (strlen($cep) !== 8) {
            return response()->json(['erro' => true]);
        }

        $response = Http::withOptions([
            'verify' => false,
        ])->get("https://viacep.com.br/ws/{$cep}/json/");
        $data = $response->json();

        if ($response->failed() || isset($data['erro'])) {
            return response()->json(['erro' => true]);
        }

        return response()->json([
            'cep' => $data['cep'] ?? '',
            'logradouro' => $data['logradouro'] ?? '',
            'complemento' => $data['complemento'] ?? '',
            'bairro' => $data['bairro'] ?? '',
            'localidade' => $data['localidade'] ?? '',
            'uf' => $data['uf'] ?? '',
        ]);
    }
}