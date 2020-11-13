# build environment
FROM node:12.2.0-alpine as build
RUN mkdir -p /home/node/node_modules
WORKDIR /home/node
ENV PATH /home/node/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN npm config set unsafe-perm true
RUN yarn global add react-scripts@3.0.1 -g --silent
RUN yarn -s

ARG CACHEBUST=1
COPY . .

ARG REACT_APP_PORT

ENV REACT_APP_PORT $REACT_APP_PORT

ARG REACT_APP_BACKENDHOST
ENV REACT_APP_BACKENDHOST $REACT_APP_BACKENDHOST

ARG CACHEBUST=1
RUN yarn run build --silent

# production environment
FROM alpine:latest
COPY --from=build /home/node/build /home/node/build
