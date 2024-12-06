# Usar la imagen base de Node.js
FROM node:14

# Definir el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar todo el código fuente
COPY . .

# Exponer el puerto en el que la app va a correr
EXPOSE 8095

# Comando para ejecutar la aplicación
CMD [ "npm", "start" ]
