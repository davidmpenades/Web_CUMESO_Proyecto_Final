# Etapa 1: Constructor
FROM node:20 AS constructor

# Establecer el directorio de trabajo en /app
WORKDIR /app

# Copiar los archivos de configuración de npm
COPY package.json .
COPY package-lock.json .

# Instalar las dependencias del proyecto
RUN npm install --production

# Etapa 2: Final
FROM node:20-slim

# Establecer el directorio de trabajo en /app
WORKDIR /app

# Copiar los archivos generados en la etapa de construcción
COPY --from=constructor /app .

# Copiar todos los archivos del proyecto
COPY . .

# Exponer el puerto 5173
EXPOSE 5173

# Comando por defecto para ejecutar la aplicación en modo desarrollo
CMD ["npm", "run", "dev"]
