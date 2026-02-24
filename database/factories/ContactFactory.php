<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ContactFactory extends Factory
{
    public function definition(): array
    {
        
        return [
            'user_id' => \App\Models\User::factory(), 
            'name' => fake()->name(),
            'cpf' => fake()->numerify('###########'), 
            'phone' => fake()->phoneNumber(),
            'cep' => fake()->numerify('########'),    
            'country' => 'Brasil',
            'city' => fake()->city(),
            'neighbourhood' => fake()->word(),
            'street' => fake()->streetName(),
            'number' => fake()->buildingNumber(),
        ];
    }
}