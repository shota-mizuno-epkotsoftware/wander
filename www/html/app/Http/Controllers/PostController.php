<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

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
        try {
            $post->delete();
            return redirect()->route('home')->with('error', '削除に失敗しました');
        } catch (\Exception $e) {
            Log::error('削除失敗:', ['error' => $e->getMessage()]);
            return back()->withErrors([['error' => '削除に失敗しました']]);
        }
    }

    public function update(Request $request, Post $post)
    {
        Log::info($request->all());
        // バリデーションチェック
        $request->validate([
            'title' => 'required|string|max:255',
            'picture' => 'nullable|image|max:2048',
            'description' => 'required|string',
            'zip' => 'required',
            'pref' => 'required',
            'city' => 'required',
            'town' => 'required',
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
        ]);
        try {
            DB::transaction(function () use ($request, $post) {
                $post->update([
                    'title' => $request->input('title'),
                    'description' => $request->input('description'),
                ]);
                $post->address->update([
                    'zip' => $request->input('zip'),
                    'prefecture' => $request->input('pref'),
                    'city' => $request->input('city'),
                    'town' => $request->input('town'),
                    'latitude' => $request->input('lat'),
                    'longitude' => $request->input('lng'),
                ]);
                if ($request->hasFile('picture')) {
                    storage::delete('public/' . $post->pictures[0]->name);
                    $path = $request->file('picture')->store('posts', 'public');
                Log::info('画像保存パス:', ['path' => $path]);
                $post->pictures()->update([
                    'name' => $path,
                ]);
                }
            });
        } catch (\Exception $e) {
            Log::error('更新失敗:', ['error' => $e->getMessage()]);
            return back()->withErrors(['error' => '保存に失敗しました']);
        }
        return redirect()->route('home');
    }
}
