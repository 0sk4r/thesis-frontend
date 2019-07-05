# base image
FROM node:12.5.0-alpine

# set working directory
WORKDIR /thesis-frontend

# add `/app/node_modules/.bin` to $PATH
ENV PATH /thesis-frontend/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /thesis-frontend/package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

# start app
CMD ["npm", "start"]