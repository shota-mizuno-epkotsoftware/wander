# WANDER

![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Inertia.js](https://img.shields.io/badge/Inertia.js-9553E9?style=for-the-badge&logo=inertia&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![CSS Modules](https://img.shields.io/badge/CSS%20Modules-000000?style=for-the-badge&logo=cssmodules&logoColor=white)
![Apache](https://img.shields.io/badge/Apache-D22128?style=for-the-badge&logo=apache&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

GoogleMapsAPIによる位置情報を用いたSNS風アプリケーション

## アプリイメージ

![home画面動作イメージ(α)](./appImage.png)

## 使い方

### 目次

1. [アカウント登録・ログイン](#1-アカウント登録ログイン)
2. [ホーム画面（マップ）](#2-ホーム画面マップ)
3. [投稿する](#3-投稿する)
4. [投稿を見る・編集する](#4-投稿を見る編集する)
5. [投稿を削除する](#5-投稿を削除する)
6. [プロフィールを編集する](#6-プロフィールを編集する)

---

### 1. アカウント登録・ログイン

#### 新規登録

1. `http://localhost/register` にアクセス
2. 名前・メールアドレス・パスワードを入力して登録

#### ログイン

1. `http://localhost/login` にアクセス
2. メールアドレスとパスワードを入力してログイン

### 2. ホーム画面（マップ）

ログイン後、`http://localhost/home` に自動遷移

| エリア | 説明 |
|---|---|
| 地図 | Google Maps が表示され、投稿マーカーが並ぶ |
| メニューパネル | 投稿リストまたは投稿フォームを表示 |

パネル上部の切り替えボタンで表示を切り替え

- **投稿リスト** ボタン → 既存の投稿一覧を表示
- **投稿画面** ボタン → 新規投稿フォームを表示

---

### 3. 投稿する

1. パネル **「投稿画面」** ボタンをクリック
2. 地図上の投稿したい場所をクリックしてマーカーを立てる
   - マーカーはドラッグして移動可能
   - マーカーを立てると住所（郵便番号・都道府県・市区町村・町名）が自動入力される
3. フォームに以下を入力：
   - **タイトル**
   - **画像**：「画像を選択」ボタンから画像ファイルを選択(2MB以下)
   - **説明**：場所の説明やコメントを記入
4. **「投稿」** ボタンをクリックして送信
5. 投稿完了後、自動的に投稿リスト画面に戻る

> **注意**：マーカー必須

---

### 4. 投稿を見る・編集する

#### 投稿リストで見る

- パネル **「投稿リスト」** をクリックすると全投稿が一覧表示される
- 各投稿カードには投稿者のアバター・名前、住所、タイトル、説明、画像が表示される

#### 地図のマーカーから見る

- 地図上のマーカーをクリックすると、その投稿の詳細がパネルに表示される

#### 自分の投稿を編集する

1. 投稿リストまたは地図マーカーから自分の投稿を選択
2. 投稿カードの下に編集フォームが表示される
3. タイトル・画像・説明を変更する
4. **「更新」** ボタンをクリックして保存
5. 保存後、一覧に戻る

> 住所・位置情報は編集フォームからは変更不可（現在の仕様）

---

### 5. 投稿を削除する

1. 投稿リストから自分の投稿をクリックして選択
2. 投稿カード右下の **「×」** ボタンをクリック
3. 確認ダイアログで **「OK」** を選択すると削除される

> 他のユーザーの投稿には削除ボタンは表示されない

---

### 6. プロフィールを編集する

`http://localhost/profile` にアクセス（または認証済みページのナビゲーションから）。

#### プロフィール情報の更新

- **アバター画像**：ファイルを選択してアップロード（未設定の場合は名前の頭文字が表示される）
- **名前**：ユーザー名を変更
- **メールアドレス**：メールアドレスを変更

変更後 **「Save」** ボタンで保存

#### パスワードの変更

同ページの「Update Password」セクションから現在のパスワードと新しいパスワードを入力して変更

#### アカウントの削除

同ページの「Delete Account」セクションからアカウントを削除

## 環境構築

### 前提条件

- Docker / Docker Compose がインストール済み
- Node.js / npm がインストール済み
- Google Maps API キーを取得済み（[Google Cloud Console](https://console.cloud.google.com/) で取得）

### 1. リポジトリをクローン

```bash
git clone https://github.com/shota-mizuno-epkotsoftware/wander.git
cd wander
```

### 2. `.env` ファイルを作成

```bash
cp www/html/.env.example www/html/.env
```

`www/html/.env` を編集して以下の項目を設定：

```dotenv
# DBの接続先をDockerコンテナ名に変更
DB_HOST=mysql
DB_DATABASE=test_db_name
DB_USERNAME=test_user
DB_PASSWORD=test_pass

# メール送信（MailHog）
MAIL_HOST=mailhog
MAIL_PORT=1025

# Google Maps API キー（必須）
GOOGLE_MAPS_API_KEY=your_api_key_here
```

### 3. Docker コンテナを起動

```bash
docker compose up -d
```

起動されるサービス：

|サービス|URL|
|---|---|
|アプリ (Apache)|<http://localhost>|
|phpMyAdmin|<http://localhost:8080>|
|MailHog (メール確認)|<http://localhost:8025>|

### 4. Laravel 初期設定（コンテナ内）

```bash
docker compose exec app bash
cd /var/www/html

composer install
php artisan key:generate
php artisan migrate
php artisan storage:link
exit
```

### 5. フロントエンドのセットアップ（ローカル）

```bash
cd www/html
npm install
npm run dev
```

Vite の開発サーバーが起動(ホットリロード)

### 6. 動作確認

|URL|内容|
|---|---|
|<http://localhost>|ホーム・マップ画面|
|<http://localhost/register>|ユーザー登録|
|<http://localhost/login>|ログイン|
