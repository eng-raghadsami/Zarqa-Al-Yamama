# استخدم صورة PHP الرسمية
FROM php:8.2-cli

# نسخ Composer من صورة رسمية
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# تثبيت المتطلبات
RUN apt-get update && apt-get install -y \
    git unzip zip libpq-dev libzip-dev \
    && docker-php-ext-install pdo pdo_pgsql zip

# تعيين مجلد العمل
WORKDIR /app

# نسخ المشروع
COPY . .

# تثبيت الـ dependencies
RUN composer install --no-dev --optimize-autoloader
# توليد Swagger docs أثناء الـ build (لا يحتاج قاعدة بيانات)
RUN php artisan l5-swagger:generate || true

# تشغيل الـ migrations وتعبئة قاموس المصطلحات عند الإقلاع (TermSeeder يعتمد updateOrCreate فآمن للتكرار) ثم تشغيل السيرفر
CMD php artisan migrate --force \
    && php artisan db:seed --class=TermSeeder --force \
    && php artisan serve --host=0.0.0.0 --port=$PORT
