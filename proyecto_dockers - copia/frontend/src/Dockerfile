FROM node:22.11.0

COPY . /var/www/html

WORKDIR /var/www/html

RUN npm install

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev"]