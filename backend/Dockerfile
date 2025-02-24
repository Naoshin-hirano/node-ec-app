FROM node:18.14.1-alpine

WORKDIR /app

RUN npm i -g @nestjs/cli
COPY backend/package.json ./
COPY backend/package-lock.json ./
RUN npm install