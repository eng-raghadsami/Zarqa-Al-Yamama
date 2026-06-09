# 1. استخدام صورة PHP الرسمية
FROM php:8.2-cli

# 2. تثبيت المكتبات الأساسية (التي تسببت في الخطأ سابقاً)
RUN apt-get update && apt-get install -y \
    libzip-dev \
    libssl-dev \
    ca-certificates \
    libpq-dev \
    git \
    unzip \
    && docker-php-ext-install pdo pdo_pgsql zip \
    && update-ca-certificates

# 3. تثبيت Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# 4. إعداد المجلد
WORKDIR /app

# 5. نسخ الملفات
COPY . .

# 6. تثبيت المكتبات (بدون Dev لتقليل الأخطاء)
RUN composer install --no-dev --optimize-autoloader

# 7. أمر التشغيل النهائي
CMD php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=$PORT
