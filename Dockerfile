FROM mhart/alpine-node:latest as app-builder

ADD yarn.lock /yarn.lock
ADD package.json /package.json

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin

WORKDIR /app
COPY . /app

RUN yarn
RUN yarn run build

FROM nginx:latest
COPY --from=app-builder /app/build /usr/share/nginx/html

EXPOSE 80
