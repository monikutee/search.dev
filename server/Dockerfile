##build step

FROM node:20.11.1-alpine
RUN apk add --no-cache python3 py3-pip git openssh-client g++ make
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN yarn install
RUN npm run build

##run step

FROM node:20.11.1-alpine

RUN apk add --no-cache python3 py3-pip git openssh-client g++ make
WORKDIR /usr/src/app
COPY package*.json ./
COPY .env.* ./


RUN yarn install --only=production
COPY --from=0 /usr/src/app/dist ./dist
EXPOSE 2000
CMD yarn start_docker