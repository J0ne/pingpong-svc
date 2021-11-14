FROM node:14
WORKDIR /usr/src/app
COPY . .
RUN npm i
CMD ["node", "./src/app.js"]