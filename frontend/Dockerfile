# Build step
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# When hosted with the nginx proxy, it proxies /api endpoints to the backend
ENV VITE_API_BASE_URL=/api
RUN npm run build

# Production server step
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
