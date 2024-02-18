FROM node:14 as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

EXPOSE 4200

ENTRYPOINT ["npm", "start"]

FROM nginx:1.17.1-alpine

COPY --from=build-step /app/dist/remesas-peru /usr/share/nginx/html
