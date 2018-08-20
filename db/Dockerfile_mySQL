FROM mysql:5.7

ENV MYSQL_ROOT_PASSWORD=dog
ENV MYSQL_DATABASE=rental_hosts
ENV MYSQL_USER=root

ADD schema.sql /docker-entrypoint-initdb.d

EXPOSE 3306
