# 機能一覧

## アプリケーションメイン

|URI|リクエストメソッド|コード#メソッド|機能名|備考|
|---|---|---|---|---|
|/home|GET|HomeController#index|トップ画面表示||
|/post|POST|PostController#store|投稿|差分更新|
|/post/{post}|DELETE|PostController#destroy|投稿削除|差分更新|
|/post/{post}|PATCH|PostController#update|投稿修正|差分更新|
