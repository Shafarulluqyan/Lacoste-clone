FROM node:18.12.1

WORKDIR /var/www/service-app

COPY package.json package-lock.json ./

RUN npm install

COPY ./ ./

EXPOSE 4002

CMD ["npm","run", "start"]
