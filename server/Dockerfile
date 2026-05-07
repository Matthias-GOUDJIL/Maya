FROM node:20-alpine

WORKDIR /app

# Copier et installer les dépendances du serveur
COPY server/package*.json ./
RUN npm install

# Copier le code du serveur
COPY server/ .

# Copier le code partagé vers /shared (pour correspondre à l'import ../../shared/*)
COPY shared /shared/

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "dev"]
