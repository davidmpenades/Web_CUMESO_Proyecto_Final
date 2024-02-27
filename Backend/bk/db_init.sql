-- Crear la base de datos
CREATE DATABASE cumeso;

-- Conectarse a la base de datos cumeso
\c cumeso;

-- Crear un usuario y asignarle privilegios
-- CREATE USER david WITH PASSWORD '1234';
ALTER ROLE david SET client_encoding TO 'utf8';
ALTER ROLE david SET default_transaction_isolation TO 'read committed';
ALTER ROLE david SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE cumeso TO david;