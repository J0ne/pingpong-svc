FROM node:14
WORKDIR /usr/src/app
COPY . .
RUN npm i
ENV DB_PASSWORD=password
EXPOSE 3003
CMD ["node", "./src/app.js"]
