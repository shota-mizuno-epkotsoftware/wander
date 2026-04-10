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

## 環境構築(整備中)

### 1. リポジトリをクローン

### 2. .env を作成

```bash
cp www/html/.env.example www/html/.env
```

### 3. 起動

```bash
docker compose up -d
```

### 4. Laravel の初期設定

```bash
docker compose exec app bash
cd /var/www/html
composer install
php artisan key:generate
php artisan migrate
composer require laravel/breeze --dev
php artisan breeze:install react
```

### 5. フロントエンドのインストール（ローカル）

```bash
cd www/html
npm install
npm run dev
```

### 6. マイグレーション

```bash
docker compose exec app bash
cd /var/www/html
php artisan migrate
```

### 7. 確認

- <http://localhost>
- <http://localhost/login>
- <http://localhost/register>
