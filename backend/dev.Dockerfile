FROM node:10.5.0
RUN mkdir -p /home/node/node_modules && chown -R node:node /home/node
WORKDIR /home/node
RUN yarn global add nodemon --silent
COPY package.json ./
COPY yarn.lock ./
RUN yarn -s
EXPOSE $PORT 9229
CMD [ "npm", "run", "dev" ]