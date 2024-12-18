FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD=
ENV MYSQL_DATABASE=blog
ENV MYSQL_USER=testing
ENV MYSQL_PASSWORD=AlbedoScope123

COPY init.sql /docker-entrypoint-initdb.d/

RUN chmod 644 /docker-entrypoint-initdb.d/init.sql

EXPOSE 3306