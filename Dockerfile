FROM node:12-alpine
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD [ "npm", "start" ]