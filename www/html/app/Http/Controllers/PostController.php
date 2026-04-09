<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class PostController extends Controller
{
    public function store(Request $request)
    {
        // バリデーションチェック
        $request->validate([
            'title' => 'required|string|max:255',
            'picture' => 'required|image|max:2048',
            'description' => 'required|string',
            'zip' => 'required',
            'pref' => 'required',
            'city' => 'required',
            'town' => 'required',
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
        ]);

        // データベース登録処理
        try {
            DB::transaction(function () use ($request) {
                Log::info('POSTデータ:', $request->all());
                $post = Post::create([
                    'user_id' => 1,
                    'title' => $request->input('title'),
                    'description' => $request->input('description'),
                ]);
                $path = $request->file('picture')->store('posts', 'public');
                Log::info('画像保存パス:', ['path' => $path]);
                $post->pictures()->create([
                    'name' => $path,
                ]);
                $post->address()->create([
                    'zip' => $request->input('zip'),
                    'prefecture' => $request->input('pref'),
                    'city' => $request->input('city'),
                    'town' => $request->input('town'),
                    'latitude' => $request->input('lat'),
                    'longitude' => $request->input('lng'),
                ]);
            });
        } catch (\Exception $e) {
            Log::error('保存失敗:', ['error' => $e->getMessage()]);
            return back()->withErrors(['error' => '保存に失敗しました']);
        }

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
