FROM node:20 AS build-stage

ENV VITE_BACKEND_URL="/api"

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run test

RUN npm run build

FROM nginx:1.25-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]