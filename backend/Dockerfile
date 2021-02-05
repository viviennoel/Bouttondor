 FROM node:latest

 RUN mkdir -p /app
 WORKDIR /app
 #/usr/src/app
 COPY . /app
 RUN rm -rf /app/node_modules
 RUN npm install

 EXPOSE 3000

 ENTRYPOINT ["node"]

 CMD ["server.js"]
