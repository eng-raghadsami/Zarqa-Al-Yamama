# استخدام صورة PHP CLI
FROM php:8.2-cli

# تثبيت Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# تثبيت إضافات PHP المطلوبة
RUN apt-get update && apt-get install -y \
    libpq-dev \
    unzip \
    zip \
    && docker-php-ext-install pdo pdo_pgsql zip

# تحديد مجلد العمل
WORKDIR /app

# نسخ المشروع
COPY . .

# تثبيت المكتبات بدون dev (لأن IdeHelper مربوط بالبيئة local فقط)
RUN composer install --no-dev --optimize-autoloader

# تنظيف الكاش وضبط المشروع
RUN php artisan config:clear \
    && php artisan route:clear \
    && php artisan cache:clear \
    && php artisan view:clear

# توليد Swagger docs (إذا كنتِ تستخدمين l5-swagger)
RUN php artisan l5-swagger:generate || true

# تشغيل السيرفر مع المهاجرات
CMD php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=$PORT
