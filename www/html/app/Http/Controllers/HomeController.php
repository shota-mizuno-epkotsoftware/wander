<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Post;

class HomeController extends Controller
{
    public function index()
    {
        /*
        return Inertia::render('Home', [
            'posts' => Post::latest()->get(),
        ]);
        */
        return Post::latest()->get();
    }
}
