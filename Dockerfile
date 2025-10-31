#Utilse une image légère Node.js
FROM node:18-alpine

#Crée un repertoire dans le conteneur
WORKDIR /app

# Copie les fichiers package.json et package-lock.json
COPY package*.json ./

# Installe les dependances*
RUN npm install

# Copie tout le reste du code
COPY . .

# Génére le client prisma
RUN npx prisma generate

# Expose le port sur lequel ton API tourne
EXPOSE 3000

# Commande de démarrage
CMD [ "npm", "run", "dev" ]