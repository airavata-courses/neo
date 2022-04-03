FROM node:14-alpine
RUN mkdir -p /usr/src/auth-service
WORKDIR /usr/src/auth-service

COPY package.json /usr/src/auth-service

RUN npm install

COPY . /usr/src/auth-service

RUN npm run compile

EXPOSE 43000

CMD ["npm", "start"]