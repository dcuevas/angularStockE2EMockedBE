FROM smebberson/alpine-nginx-nodejs:latest

WORKDIR /app

COPY package.json /app/

RUN npm install

COPY ./ /app/

RUN npm run build

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

COPY /nginx/nginx.conf /etc/nginx/nginx.conf

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
