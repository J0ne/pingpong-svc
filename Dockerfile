FROM node:14
WORKDIR /usr/src/app
COPY . .
RUN npm i
ENV DB_PASSWORD=password
ENV LISTEN_PORT=8080
EXPOSE 8080
CMD ["node", "./src/app.js"]
