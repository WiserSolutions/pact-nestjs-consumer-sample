FROM node:10

WORKDIR /usr/app

COPY package*.json ./

RUN npm install 

COPY . .


EXPOSE 3001

CMD ["run","test:pact"]

ENTRYPOINT [ "npm" ]