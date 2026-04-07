<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Post;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Address>
 */
class AddressFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'post_id' => Post::factory(),
            'latitude' => fake()->latitude(),
            'longitude' => fake()->longitude(),
            'zip' => fake()->numerify('#######'),
            'prefecture' => fake()->prefecture(),
            'city' => fake()->city(),
            'town' => fake()->streetAddress(),
        ];
    }
}
