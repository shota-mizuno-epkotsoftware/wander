<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Post;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Map', [
            'apiKey' => config('services.google.maps_key'),
            //'mapId' => config('services.google.maps_map_id'),
            'posts' => Post::with(['address', 'pictures'])->get(),
        ]);
    }
}
