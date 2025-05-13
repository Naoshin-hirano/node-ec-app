FROM node:18.14.1-alpine

WORKDIR /app

RUN npm i -g @nestjs/cli
COPY package.json ./
COPY package-lock.json ./
RUN npm install
# アプリケーションコードのコピー
COPY . .
# TypeScript をビルド（←これがないと dist/ ができない）
RUN npm run build
# アプリを起動
CMD ["node", "dist/main.js"]