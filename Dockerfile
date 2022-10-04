FROM node:16 

WORKDIR /app

COPY package.json /app

RUN npm install

RUN npm uninstall bcrypt

RUN npm install bcrypt 

COPY . /app

EXPOSE 8080

CMD ["npm", "start"]
