# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
# Todo (Nour): [prod] find smaller image
FROM node:lts-alpine as production-stage
ENV NODE_ENV=production\
  NODE_OPTIONS=--enable-source-maps
WORKDIR /app
COPY --from=build-stage /app/dist /app/dist
COPY --from=build-stage /app/node_modules /app/node_modules
EXPOSE 5050
CMD ["node", "./dist/index.js"]
