# 概要

GoogleMapsAPIによる位置情報を用いたSNS風アプリケーション

## アプリイメージ

![home画面動作イメージ(α)](./appImage.png)

## 使用技術

![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Inertia.js](https://img.shields.io/badge/Inertia.js-9553E9?style=for-the-badge&logo=inertia&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![CSS Modules](https://img.shields.io/badge/CSS%20Modules-000000?style=for-the-badge&logo=cssmodules&logoColor=white)
![Apache](https://img.shields.io/badge/Apache-D22128?style=for-the-badge&logo=apache&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

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
