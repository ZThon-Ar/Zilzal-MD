FROM node:lts-buster

RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  npm i pm2 -g && \
  rm -rf /var/lib/apt/lists/*
  yarn cache clean
  rm yarn.lock
  rm -rf node_modules/

COPY package.json .

RUN yarn install

COPY . .

CMD ["pm2-runtime", "."]
