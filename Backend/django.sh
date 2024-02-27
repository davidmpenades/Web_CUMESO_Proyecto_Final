#!/bin/bash

./wait-for-postgres.sh postgres_container 5432

until PGPASSWORD=$PG_PASSWORD psql -h $PG_HOST -U $PG_USER -lqt | cut -d \| -f 1 | grep -qw $PG_DB; do
  echo "Waiting for the '$PG_DB' database to be created..."
  sleep 1
done

echo "Showing Migrations..."
python3 manage.py showmigrations
echo ====================================

echo "Creating Migrations..."
python3 manage.py makemigrations
echo ====================================

echo "Starting Migrations..."
python3 manage.py migrate
echo ====================================

# echo "Create dump..."
# cat ./bk/db_init.sql > ./bk/exportacion.sql
# PGPASSWORD=$PG_PASSWORD pg_dump -h $PG_HOST -U $PG_USER -d $PG_DB >> ./bk/exportacion.sql

echo "Starting Server..."
python3 manage.py runserver 0.0.0.0:8000