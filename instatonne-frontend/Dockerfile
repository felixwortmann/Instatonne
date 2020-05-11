###
# PHASE 2
#
# BUILD THE APP
###

FROM node:12.7-alpine AS build-js
WORKDIR /usr/src/app

COPY instatonne-frontend/. instatonne-frontend/
COPY instatonne.openapi.yml instatonne.openapi.yml
WORKDIR /usr/src/app/instatonne-frontend

RUN npm ci
RUN npm run build:prod:docker


###
# PHASE 2
#
# SERVE THE APP
###

FROM nginx:alpine

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-js /usr/src/app/instatonne-frontend/dist/instatonne-frontend /usr/share/nginx/html
