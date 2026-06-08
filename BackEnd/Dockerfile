FROM php:8.2-cli

# تثبيت Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# تحديث الحزم وتثبيت الإضافات المطلوبة
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    zip \
    libpq-dev \
    && docker-php-ext-configure pgsql --with-pgsql=/usr/local/pgsql \
    && docker-php-ext-install pdo pdo_pgsql zip

# تحديد مجلد العمل
WORKDIR /app

# نسخ المشروع
COPY . .

# تثبيت المكتبات بدون dev
RUN composer install --no-dev --optimize-autoloader

# تنظيف الكاش
RUN php artisan config:clear \
    && php artisan route:clear \
    && php artisan cache:clear \
    && php artisan view:clear

# توليد Swagger docs
RUN php artisan l5-swagger:generate || true

# تشغيل السيرفر
CMD php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=$PORT
