FROM node:14-alpine
RUN mkdir -p /usr/src/registry-service
WORKDIR /usr/src/registry-service

COPY package.json /usr/src/registry-service

RUN npm install

COPY . /usr/src/registry-service

RUN npm run compile

EXPOSE 41000

CMD ["npm", "start"]