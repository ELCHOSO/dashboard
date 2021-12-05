FROM node:latest

WORKDIR /app
COPY ./package*.json ./
RUN npm install -g npm@8.1.3
RUN npm ci
RUN npm i -g nodemon
COPY . .
RUN chown -R node:node /app
USER node