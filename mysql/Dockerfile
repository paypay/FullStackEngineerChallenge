# Derived from official mysql image
FROM mysql:5.7

# Add a database
ENV MYSQL_DATABASE paypay

# Add the content of the sql-scripts/ to docker-entrypoint-initdb.d/
# The scripts will be executed during container startup automatically
COPY ./sql-scripts/ /docker-entrypoint-initdb.d/
