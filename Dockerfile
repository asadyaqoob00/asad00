FROM php:apache
RUN apt-get update && apt-get upgrade -y
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli