## [mongodb基本](https://www.jianshu.com/p/30f2a5736589)
MongoDB是一个介于关系数据库和非关系数据库(nosql)之间的产品，是非关系数据库当中功能最丰富，最像关系数据库的。
MongoDB是开源，高性能的NoSQL数据库，支持索引、集群、复制和故障转移、各种语言的驱动程序丰富；

> MongoDB 是由C++语言编写的，是一个基于分布式文件存储的开源数据库系统。
> MongoDB 旨在为WEB应用提供可扩展的高性能数据存储解决方案。
> MongoDB 将数据存储为一个文档，数据结构由键值(key=>value)对组成。
> MongoDB 文档类似于 JSON 对象。字段值可以包含其他文档，数组及文档数组。

## 启动\停止
```text
//启动
//mongodb默认执行mongod命令，所属盘符根目录下的/data/db作为自己的数据储存目录。
//第一次执行该命令时，先自己手动新建/data/db
mongod

//停止
在开启服务的控制台，直接ctrl+c停止或关闭控制台

```

## 进入和退出
```text
//进入
mongo
//退出
exit
```

## 基本命令
```text
show dbs               //查看显示所有的数据库
db                     //查看当前操作的数据库
show collections       //查看当前操作数据库的集合
use 数据库名称         //切换到指定的数据库，如果没有会新建
db.文档名称.insertOne({"name":"jack"})  //插入数据
db.文档名称.find()    //查看该文档对象的所有数据

```

## 数据库的基本操作
### 基本概念
文档，集合，数据库


sql术语| mongodb | 说明
---------|----------|---------
 database | database | 数据库
 table | collection  | 数据库表/集合
 row | document | 数据记录行/文档
 column | field | 数据库字段/域
 index | index | 索引
 table joins |  | 表连接 mongdb不支持
 primary key | primary key | 主键/mongdb自动将_id字段设置成主键


### 基本操作
创建数据库：

语法：use database_name
示例：use DB_Demo
如果数据库不存在，则创建数据库，否则切换到指定数据库。
要显示刚创建的数据库需要向 数据库插入一些数据。

删除数据库：
语法：db.dropDatabase()
示例：先切换到数据库 DB_Demo，再执行删除操作。（可以使用 db 命令查看当前数据库名，防止误操作）
use DB_Demo
db.dropDatabase()

创建集合：
语法：db.createCollection(name, options)
示例：先切换到数据库 DB_Demo并创建users集合
use DB_Demo
db.createCollection("users")

删除集合：
语法：db.collection.drop()
示例：db.user.drop()

插入文档：
语法：db.collection_name.insert(document)
示例：db.users.insert({name:'zhangsan',age:18})
语法：db.collection_name.save(document)
示例：db.users.save({name:'lisisi',age:16})
> 说明：insert和save方法都可以插入数据，当默认的“_id”值已存在时，调用insert方法插入会报错；而save方法不会,会更新相同的_id所在行数据的信息。

语法：db.collection_name.insertOne(document)
说明：向指定集合中插入一条文档数据
语法：db.collection_name.insertMany(document)
说明：向指定集合中插入多条文档数据(注意是数组）
示例：db.users.insertMany([{name:'wangsansan',age:'22'},{name:'zhanglili',age:21}])

删除文档：
语法：db.collection_name.remove(条件)
示例： db.users.remove({'name':'zhangsan'})
语法：db.collection_name.deleteOne(条件)
说明： 删除 指定条件的一个文档
语法：db.collection_name.deleteMany(条件)
说明： 删除 指定条件的全部文档

修改文档：
语法：db.collection_name.update({"条件字段名":"字段值"},{$set:{"要修改的字段名":"修改后的字段值"}})
说明： 只修改第一条发现的文档
示例：db.users.update({'name':'zhangsan'},{$set:{'name':'wanger'}})
语法：db.collection_name.update({"条件字段名":"字段值"},{$set:{"要修改的字段名":"修改后的字段值"}},{multi:true});
说明： 修改多条相同的文档，需要设置 multi 参数为 true。

查询文档：
查询集合中所有数据：db.collection_name.find(); 例：db.users.find().pretty()
按条件查询（支持多条件）：db.collection_name.find(条件); 例：db.users.find({name:'zhangsan'});
限制数量：db.collection_name.find().limit(数量);
跳过指定数量：db.collection_name.find().skip(数量);
查询第一条（支持条件）：db.collection_name.findOne(条件);
查询数量：db.collection_name.find().count();
排序：db.collection_name.find().sort({"字段名":1}); 1：表示升序，-1：表示降序
指定字段返回： db.collection_name.find({},{"字段名":0}); 1：返回 0：不返回

常用命令：
使用 db 命令查看当前数据库名
查看所有数据库，可以使用 show dbs 命令
查看已有集合，可以使用 show collections 命令
find() 方法以非结构化的方式来显示所有文档，语法：db.collection_name.find()
以易读的方式来读取数据使用 pretty() 方法，语法：db.collection_name.find().pretty()
use database_name如果数据库不存在，则创建数据库，否则切换到指定数据库

## 其它注意事项
1、数据库命名规则：
不能是空字符串
不能含有空格、.、$、/、\和\0(空字符)
应全部小写
最多64字节
2、保留数据库
有一些数据库名是保留的，可以直接访问这些有特殊作用的数据库

admin:'root'数据库，要是将一个用户添加到这个数据库，这个用户自动继承所有数据库的权限，一些特定的服务器端命令也只能从这个数据库运行，比如列出所有的数据库或者关闭服务器
local:这个数据库永远不会被复制，可以用来存储于本地单台服务器的任意集合
config:当mongoDB用于分片设置时，config数据库在内部使用，用于保存分片的相关信息


## [mongdb安全问题](https://www.jianshu.com/p/79caa1cc49a5)
### Mongodb enable authentication
MongoDB 默认直接连接，无须身份验证，如果当前机器可以公网访问，且不注意Mongodb 端口（默认 27017）的开放状态，那么Mongodb就会产生安全风险，被利用此配置漏洞，入侵数据库。

### 容易遭受入侵的环境
使用默认 mongod 命令启动 Mongodb
机器可以被公网访问
在公网上开放了 Mongodb 端口

### 安全风险
数据库隐私泄露
数据库被清空
数据库运行缓慢

### 解决方案
1. 禁止公网访问 Mongodb 端口
   1. 网络配置（由于网络配置因人而异，需要根据自己实际环境进行配置，不作冗述。大致可以从以下方面禁止。）
      1. 在路由器中关闭端口转发
      2. 防火墙 iptables 禁止访问
   2. 验证端口能否访问方式
      1. 在外网机器命令行中运行
         1. telnet your.machine.open.ip 27017
2. 启用验证
   1.  创建用户管理员账户
       1.  启动数据库
           1.  mongod --port 27017 --dbpath /data/db1
       2.  创建管理员
   2.  用户验证登录
       1.  mongod --auth --port 27017 --dbpath /data/db1
   3.  验证登录命令
       1.  mongo --port 27017 -u "adminUser" -p "adminPass" --authenticationDatabase "admin"
       2.  连接之后再验证
   4.  创建普通用户
   5.  内建角色
   6.  URI形式访问
       1. mongodb://your.db.ip.address:27017/foo
       2. mongodb://simpleUser:simplePass@your.db.ip.address:27017/foo

创建管理员
```
use admin
db.createUser(
  {
    user: "adminUser",
    pwd: "adminPass",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)
```

连接之后验证
```
mongo --port 27017

use admin
db.auth("adminUser", "adminPass")
```

创建普通用户
```
use foo

db.createUser(
  {
    user: "simpleUser",
    pwd: "simplePass",
    roles: [ { role: "readWrite", db: "foo" },
             { role: "read", db: "bar" } ]
  }
)
```
现在我们有了一个普通用户
用户名：simpleUser
密码：simplePass
权限：读写数据库 foo， 只读数据库 bar。


内建角色
Read：允许用户读取指定数据库
readWrite：允许用户读写指定数据库
dbAdmin：允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问system.profile
userAdmin：允许用户向system.users集合写入，可以找指定数据库里创建、删除和管理用户
clusterAdmin：只在admin数据库中可用，赋予用户所有分片和复制集相关函数的管理权限。
readAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读权限
readWriteAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读写权限
userAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的userAdmin权限
dbAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的dbAdmin权限。
root：只在admin数据库中可用。超级账号，超级权限
