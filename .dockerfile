FROM node:16-alpine AS builder
ARG REACT_APP_PROD_BASE_URL
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build
