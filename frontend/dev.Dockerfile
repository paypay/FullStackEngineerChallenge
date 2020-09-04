FROM node:12.2.0-alpine
WORKDIR /home/node
ENV PATH /home/node/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN npm config set unsafe-perm true
RUN yarn global add react-scripts@3.0.1 -g --silent
RUN yarn -s
CMD ["npm", "start"]
