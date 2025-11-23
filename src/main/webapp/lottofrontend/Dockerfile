FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY ../../../.. .
ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL $REACT_APP_API_BASE_URL

RUN npm run build

# 2. 빌드된 정적 파일을 nginx로 서빙
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
