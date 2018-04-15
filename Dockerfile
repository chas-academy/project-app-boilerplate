FROM mhart/alpine-node:latest

ADD yarn.lock /yarn.lock
ADD package.json /package.json

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin

RUN yarn

WORKDIR /app
ADD . /app

EXPOSE 7771

CMD ["yarn", "start"]
