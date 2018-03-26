FROM nginx:latest

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

COPY /nginx/nginx.conf /etc/nginx/nginx.conf

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY ~/stock/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
