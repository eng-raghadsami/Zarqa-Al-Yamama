FROM php:8.2-cli

# تثبيت Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# تثبيت إضافات PHP المطلوبة
RUN apt-get update && apt-get install -y \
    libpq-dev \
    unzip \
    && docker-php-ext-install pdo pdo_pgsql

# تحديد مجلد العمل
WORKDIR /app

# نسخ المشروع
COPY . .

# تثبيت المكتبات
RUN composer install --no-dev --optimize-autoloader

# تشغيل السيرفر
CMD php artisan migrate --force && php artisan optimize:clear && php artisan serve --host=0.0.0.0 --port=$PORT
