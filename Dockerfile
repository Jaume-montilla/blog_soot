FROM node:20.17.0

WORKDIR /var/www/html

COPY . /var/www/html

RUN npm install

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev"]

