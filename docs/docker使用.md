## 国内镜像

<https://dockerhub.azk8s.cn>
<https://reg-mirror.qiniu.com>

执行 $ docker info，如果从结果中看到了如下内容，说明配置成功。

Registry Mirrors:
 <https://dockerhub.azk8s.cn/>

## 搜索

docker search mysql

## 下载

docker pull mysql:5.6

## 创建并启动

docker run -d -p:3306:3306 -e MYSQL_ROOT_PASSWORD=1 --name mysql mysql

## 映射 主机:容器

docker run --rm -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=1 --name mysql -v ~/mysql:/var/lib/mysql mysql

## 查看容器

docker ps mysql

## 进入容器  这里也可以直接使用 sh

docker exec -it mysql /bin/bash

docker pull mysql

docker container rm mysql

docker run --rm --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=1 -d mysql

docker exec -it mysql bash

mysql -uroot -p -h localhost #输入密码

grant all PRIVILEGES on .* to root@'%' WITH GRANT OPTION;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'

docker inspect --format='{{.Name}} - {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker ps -aq)
查看容器ip

获取所有容器名称及其ip地址
`docker inspect -f '{{.Name}} - {{.NetworkSettings.IPAddress }}' $(docker ps -aq)`

### mysql 8 的node mysql连接问题

docker exec -it YOUR_CONTAINER mysql -u root -p
Enter password:
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '{your password}';
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '{your password}';
SELECT plugin FROM mysql.user WHERE User = 'root';

## 删除容器

`docker container prune`

## 查看容器日志

`docker log <container>`

## 重启容器

`docker restart <container>`

## monggo

docker volume create --name mymongo

docker run --rm -it  -p 3000:3000/tcp  -p 8000:8000/tcp  tanliyuan123/artipub:1.3.0

docker run --rm -it --link mymongo  -p 3000:3000/tcp  -p 8000:8000/tcp tanliyuan123/artipub:1.3.0

docker run --name mymongo -p 27017:27017 -v mymongo:/data/db -d --restart=always mongo
