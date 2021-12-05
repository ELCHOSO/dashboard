FROM node:lts
WORKDIR /app
COPY ./package*.json ./
USER root
RUN npm i -g nodemon
RUN npm ci
COPY . .
RUN chown -R node:node /app
