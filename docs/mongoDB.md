## Docker
1. 创建volume
docker volume create mongodbdata

2. 挂载
docker run --name my-mongo --restart=always -v mongodbdata:/data/db -d mongo