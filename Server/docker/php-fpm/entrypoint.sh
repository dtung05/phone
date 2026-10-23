#!/bin/sh
set -e

# 1. Đảm bảo các thư mục framework và log của Laravel tồn tại và có quyền ghi
mkdir -p /var/www/storage/framework/cache/data \
         /var/www/storage/framework/sessions \
         /var/www/storage/framework/views \
         /var/www/storage/logs \
         /var/www/bootstrap/cache

# 2. Tự động tạo link storage cho ảnh nếu chưa có
if [ ! -L "/var/www/public/storage" ]; then
    php artisan storage:link --no-interaction || true
fi

# 3. Tự động chạy migration tạo bảng database nếu chưa có (chỉ chạy trên app, tránh Reverb chạy đè)
if [ "$1" = "php-fpm" ]; then
    echo "===> Kiểm tra và cập nhật migration database..."
    php artisan migrate --force --no-interaction || true
fi

# 4. Chạy lệnh CMD mặc định (php-fpm hoặc php artisan reverb:start)
exec "$@"
