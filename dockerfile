FROM node:11

EXPOSE 3000

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN rm -rf node_modules/
RUN rm -rf build/

RUN npm install --update-binary --no-shrinkwrap
RUN npm install serve -g
RUN npm run build

ENTRYPOINT [ "npm" ]
CMD ["run", "start"]