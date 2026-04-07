<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function store(Request $request)
    {
        Post::create($request->all());
        return redirect()->route('home');
    }

    public function destroy(Post $post)
    {
        $post->delete();
        return redirect()->route('home');
    }

    public function update(Request $request, Post $post)
    {
        $post->update();
        return redirect()->route('home');
    }
}
