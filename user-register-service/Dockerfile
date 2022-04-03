FROM node:14-alpine
RUN mkdir -p /usr/src/user-register-service
WORKDIR /usr/src/user-register-service

COPY package.json /usr/src/user-register-service

RUN npm install

COPY . /usr/src/user-register-service

RUN npm run compile

EXPOSE 42000

CMD ["npm", "start"]