FROM node:14-alpine
RUN mkdir -p /usr/src/database-service
WORKDIR /usr/src/database-service

COPY package.json /usr/src/database-service

RUN npm install

COPY . /usr/src/database-service

RUN npm run compile

EXPOSE 40000

CMD ["npm", "start"]