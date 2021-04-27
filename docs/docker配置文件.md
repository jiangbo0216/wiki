docker-compose.yml 配置文件
```
version: '3' # compose-file的语法版本

services: # 定义服务
  service: # 服务名
    image: 'service'
    build:
      context: . # 指定dockerfile所在文件夹的路径
      dockerfile: ./Dockerfile.dev # dockerfile文件的相对路径
    ports:
      - 8081:8081 # 端口映射
    volumes:
      - ./:/app # 将项目中的文件挂在到容器内部的工作目录
      - node_modules:/app/node_modules

volumes:
  node_modules:
    external: true
```
使用之前使用 `docker volume create node_modules` 创建`volume`


Dockerfile 配置文件
```
  FROM node:12.8.0

# Create app directory
WORKDIR /app


RUN apt-get update && \
    apt-get install libgl1-mesa-glx -y
COPY package.json .
RUN npm config set registry http://your.url.com
RUN npm install
CMD ["npm", "run", "dev-spa"]
```