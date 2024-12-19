FROM php:8.1.0-apache 

WORKDIR /var/www/html

COPY . /var/www/html

RUN docker-php-ext-install pdo pdo_mysql

EXPOSE 80

RUN echo "ServerName 127.0.0.1" >> /etc/apache2/apache2.conf

