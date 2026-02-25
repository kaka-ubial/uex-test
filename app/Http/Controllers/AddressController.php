<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;

class AddressController extends Controller
{
    /**
     * Proxies requests to the ViaCep API.
     * * This acts as an internal bridge to avoid CORS issues on the frontend
     * and to sanitize/format the postal code data before it reaches the client.
     *
     * @param string $cep The postal code (e.g., "01001-000" or "01001000")
     * @return JsonResponse
     */
    public function proxyCep($cep)
    {
        $cep = preg_replace('/\D/', '', $cep);

        if (strlen($cep) !== 8) {
            return response()->json(['erro' => true]);
        }

        /**
         * Perform the external request.
         * Note: 'verify' => false is used here to bypass SSL certificate issues
         * that were found in the local dev environment.
         */
        $response = Http::withOptions([
            'verify' => false,
        ])->get("https://viacep.com.br/ws/{$cep}/json/");
        $data = $response->json();

        if ($response->failed() || isset($data['erro'])) {
            return response()->json(['erro' => true]);
        }

        // Return a filtered subset of the data to keep the payload clean
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