# 環境構築

1. リポジトリをクローン
2. .envを作成
\`\`\`
cp www/html/.env.example www/html/.env
\`\`\`
3. 起動
\`\`\`
docker compose up -d
\`\`\`
4. Laravelの初期設定
\`\`\`
docker compose exec app bash
cd /var/www/html
composer install
php artisan key:generate
php artisan migrate
composer require laravel/breeze --dev
php artisan breeze:install react
\`\`\`
5. フロントエンドのインストール(ローカル)
cd www/html
npm install
npm run dev
\`\`\`
6. マイグレーション
docker compose exec app bash
cd /var/www/html
php artisan migrate

7. 確認
<http://localhost>
<http://localhost/login>
<http://localhost/register>
