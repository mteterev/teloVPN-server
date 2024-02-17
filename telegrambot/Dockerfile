FROM node:16-alpine

RUN mkdir -p /home/node/telegrambot/node_modules && chown -R node:node /home/node/telegrambot

WORKDIR /home/node/telegrambot

COPY package*.json ./

RUN npm install

USER node

COPY --chown=node:node . .

CMD [ "npm", "run", "start" ]