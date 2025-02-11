FROM node:20

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci

ENV NODE_ENV=production

USER node

EXPOSE 3001

CMD ["npm", "start"]