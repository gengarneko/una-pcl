FROM node:20-alpine AS builder
WORKDIR /usr/src/app

COPY . .
RUN bun install
RUN bun run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=builder /usr/src/app/apps/web3d/dist .
COPY ./build/nginx.conf /etc/nginx/conf.d/default.conf
