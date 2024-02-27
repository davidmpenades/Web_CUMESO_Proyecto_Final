#!/bin/bash
# wait-for-postgres.sh

# Establecer la opción -e para que el script se detenga si hay un error
set -e

# Obtener los argumentos pasados al script
host="$1"
port="$2"
shift 2
cmd="$@"

# Esperar hasta que PostgreSQL esté disponible
until PGPASSWORD=$PG_PASSWORD psql -h "$host" -p "$port" -U "$PG_USER" -c '\q'; do
  >&2 echo "Postgres no está disponible - esperando"
  sleep 1
done

# Agregar un retraso adicional para asegurar que PostgreSQL esté completamente inicializado
sleep 5

# Ejecutar el comando proporcionado después de que PostgreSQL esté disponible
>&2 echo "Postgres está activo - ejecutando comando"
PGPASSWORD=$PG_PASSWORD exec $cmd
