FROM node:14-alpine as build

WORKDIR /Neo-FE

COPY ./ /Neo-FE

RUN npm install

RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx

RUN rm -rf /usr/share/nginx/html/*

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /Neo-FE/dist/neo-fe /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]