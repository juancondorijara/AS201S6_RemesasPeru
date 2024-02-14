FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN ng build --prod
EXPOSE 4200
ENTRYPOINT ["npm", "start"]
