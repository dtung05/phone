# Cài đặt và biên dịch 
FROM php:8.3-fpm AS builder

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    unzip \
    git \
    libpq-dev \
    libonig-dev \
    libssl-dev \
    libxml2-dev \
    libcurl4-openssl-dev \
    libicu-dev \
    libzip-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
    pdo_mysql \
    pdo_pgsql \
    pgsql \
    intl \
    zip \
    bcmath \
    soap \
    gd \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && apt-get autoremove -y && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR /var/www

# Cài đặt Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Tận dụng docker cache cho composer dependencies
COPY composer.json composer.lock* ./
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-progress --prefer-dist --no-scripts

# Copy toàn bộ mã nguồn Laravel vào container và hoàn thiện autoloader
COPY . /var/www
RUN composer dump-autoload --optimize


# bản deploy
FROM php:8.3-fpm AS production

RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq-dev \
    libicu-dev \
    libzip-dev \
    libpng16-16 \
    libjpeg62-turbo \
    libfreetype6 \
    libfcgi-bin \
    procps \
    && apt-get autoremove -y && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN curl -o /usr/local/bin/php-fpm-healthcheck \
    https://raw.githubusercontent.com/renatomefi/php-fpm-healthcheck/master/php-fpm-healthcheck \
    && chmod +x /usr/local/bin/php-fpm-healthcheck

COPY ./docker/php-fpm/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Thư mục storage dự phòng
COPY ./storage /var/www/storage-init

# Copy các PHP extensions đã được biên dịch từ builder
COPY --from=builder /usr/local/lib/php/extensions/ /usr/local/lib/php/extensions/
COPY --from=builder /usr/local/etc/php/conf.d/ /usr/local/etc/php/conf.d/
COPY --from=builder /usr/local/bin/docker-php-ext-* /usr/local/bin/

# Sử dụng php.ini cấu hình production
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

# Cấu hình tuỳ chỉnh PHP-FPM pool
COPY ./docker/common/php-fpm/conf.d/*.conf /usr/local/etc/php-fpm.d/

# Copy mã nguồn đã build xong từ builder
COPY --from=builder /var/www /var/www

WORKDIR /var/www

# Phân quyền cho www-data
RUN chown -R www-data:www-data /var/www \
    && chmod -R 775 /var/www/storage /var/www/bootstrap/cache

USER www-data

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

EXPOSE 9000
CMD ["php-fpm"]
