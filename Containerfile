FROM php:8.2-cli

RUN npm install && npm run dev; cd backend && php -S localhost:8080

EXPOSE 80
