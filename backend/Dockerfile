FROM node:20.10.0-alpine3.18

WORKDIR /app

COPY package.json .

RUN npm i

COPY index.js .

EXPOSE 3000

CMD ["node", "index.js"]

# This Dockerfile sets up a Node.js environment using the Alpine Linux distribution.
