## 安装
sudo apt-get update
sudo apt-get install mysql-server

## 配置
sudo mysql_secure_installation
[运行附带的安全脚本](https://dev.mysql.com/doc/refman/5.7/en/mysql-secure-installation.html)
* You can set a password for root accounts.
* You can remove root accounts that are accessible from outside the local host.
* You can remove anonymous-user accounts.
* You can remove the test database (which by default can be accessed by all users, even anonymous users), and privileges that permit anyone to access databases with names that start with test_.

## 验证运行状态
 systemctl status mysql.service
使用wsl2需要使用下面的命令
sudo service mysql restart
sudo service mysql start
sudo service mysql stop

## 远程连接
需要设置 mysql 数据库支持外部或者远程访问，则需要把绑定 IP 地址改为 0.0.0.0，或者不写IP地址。因此编辑配置文件：

$ sudo vim /etc/mysql/mysql.conf.d/mysqld.cnf
修改绑定地址为 0.0.0.0, 直接注释掉也可以。原来默认绑定 127.0.0.1 注释掉。

bind-address = 0.0.0.0

另外需要进入 MySQL 程序修改 root 账户的远程访问的权限。如果这一步不执行，则远程用 Navicat 访问时，会报 1130 错误。

$ sudo mysql -u root -p
进入 MySQL 以后输入

GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '您的数据库密码' WITH GRANT OPTION;
同时刷新权限

flush privileges;
修改完 mysqld.cnf 文件有最好重新启动服务器。

systemctl restart mysql.service
最终就完成了 MySQL 的安装与远程访问设置。


## 登录
mysql -uroot -p (或者需要使用sudo )

```
show tables;
show databases;
use <databaseName>
CREATE DATABASE <databaseName>;

```
## 用户(user)
user表在mysql这个数据库中
use mysql;

select host, user, authentication_string, plugin from mysql.user;

主机 user 认证string plugin

## 主机
mysql的%虽然表示是任何主机，但是它只是针对于通过TCP/IP连接过来的主机。类似于mysql -h 172.16.0.3这种。 
另外还有两种：

1、localhost

2、127.0.0.1 
%不能替代上面两种，也就是说，你在本机用mysql -hlocalhost（等同于mysql 不指定-h)，mysql -h127.0.0.1方式连接数据库，MySQL的权限验证模块都会采用不同的方式。

## 修改mysql plugin
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'

ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '1';

Don't forget to `flush privileges`;



## node 连接池
```
var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'example.org',
  user            : 'bob',
  password        : 'secret',
  database        : 'my_db'
});
 
pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
```
参考链接： https://www.npmjs.com/package/mysql


### 常用命令
连接远程
mysql -u root -p -h host

选中表格
use databaseName;

获取数据库中的表
select TABLE_NAME,TABLE_TYPE,ENGINE,TABLE_ROWS,TABLE_COMMENT,CREATE_TIME,UPDATE_TIME, CHECK_TIME from information_schema.TABLES where TABLE_SCHEMA='xxxx' ;

或者

SHOW TABLES;

获取表中的字段

select COLUMN_NAME,DATA_TYPE,CHARACTER_MAXIMUM_LENGTH,IS_NULLABLE,COLUMN_COMMENT from information_schema.COLUMNS where TABLE_NAME='xxxx' ;

或者
DESCRIBE xxx;

desc xxxx;