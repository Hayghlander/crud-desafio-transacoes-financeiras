# Escolher a imagem base do PHP com extensões necessárias
FROM php:8.3-cli

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    git \
    zip \
    unzip \
    libzip-dev \
    && docker-php-ext-install zip pdo pdo_mysql

# Instalar o Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Definir o diretório de trabalho dentro do container
WORKDIR /var/www

# Copiar os arquivos do projeto para dentro do container
COPY . /var/www

# Copiar o script wait-for-it.sh para dentro do container
COPY wait-for-it.sh /usr/bin/wait-for-it.sh

# Tornar o script executável
RUN chmod +x /usr/bin/wait-for-it.sh

# Instalar as dependências do projeto Laravel
RUN composer install

# Definir permissão para a pasta de cache do Laravel
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Expor a porta 8000, que o php artisan serve usará
EXPOSE 8000

# Comando padrão para rodar o servidor Laravel
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
