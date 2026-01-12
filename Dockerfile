# Multi-stage Dockerfile for building a Vite React app and serving with nginx
# Build stage
FROM node:20-alpine AS build
WORKDIR /app

# install deps (use yarn)
COPY package.json yarn.lock ./
RUN corepack enable && yarn install --frozen-lockfile --network-concurrency 1

# copy sources and build
COPY . .
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
RUN yarn build

# Production stage
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Add simple nginx config to support SPA history fallback
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
