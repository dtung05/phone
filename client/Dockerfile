
FROM node:22-bookworm-slim AS base
WORKDIR /app
COPY package.json package-lock.json ./

#Cấu hinfhcho dev 
FROM base AS dev
RUN npm ci
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

#Cấu hình cho production  
FROM base AS builder
RUN npm ci
COPY . .

# Nhận các biến môi trường khi build tĩnh 
ARG VITE_BASE_URL=http://localhost:8000/api/
ARG VITE_URL_IMG=http://localhost:8000/storage/
ARG VITE_REVERB_APP_KEY=brxbyvwk5tegqzjdn66u
ARG VITE_REVERB_HOST=localhost
ARG VITE_REVERB_PORT=8080
ARG VITE_REVERB_SCHEME=http

ENV VITE_BASE_URL=$VITE_BASE_URL \
    VITE_URL_IMG=$VITE_URL_IMG \
    VITE_REVERB_APP_KEY=$VITE_REVERB_APP_KEY \
    VITE_REVERB_HOST=$VITE_REVERB_HOST \
    VITE_REVERB_PORT=$VITE_REVERB_PORT \
    VITE_REVERB_SCHEME=$VITE_REVERB_SCHEME

RUN npm run build


FROM nginx:alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
