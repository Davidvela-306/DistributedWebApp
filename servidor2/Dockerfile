# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo
WORKDIR /servidor2

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto
EXPOSE 3001

# Comando para iniciar la aplicación
CMD ["npm", "run", "start"]