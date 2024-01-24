FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install json
COPY . .
RUN npm run build
EXPOSE 4200
ENTRYPOINT ["npm", "start"]
