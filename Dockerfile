FROM node:16.13 as build

WORKDIR /application
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:16.13
WORKDIR /application
COPY package.json .
RUN npm install --only=production
COPY --from=dist /application/dist/ ./dist
CMD npm run start:prod