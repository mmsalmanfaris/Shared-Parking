# frontend/Dockerfile

FROM node:20 as build

WORKDIR /app
COPY . .

# Install dependencies and build
RUN npm install --force && npm run build

# Use Nginx for serving
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
