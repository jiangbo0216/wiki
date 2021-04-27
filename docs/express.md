## express generator
`npx express-generator --view=pug myapp`
`cd myapp``npm install ``DEBUG=myapp:* & npm start`

## 集成mysql
`npm install mysql`

## mysql信息
### 加密方式(my.ini文件)
```
#默认使用“mysql_native_password”插件认证
default_authentication_plugin=mysql_native_password
```
### 查看加密方式
`select host, user, authentication_string, plugin from user;`


## 创建表
CREATE DATABASE mydb;

## 选中表
USE mydb;

## 创建表

CREATE TABLE IF NOT EXISTS `tasks` (
  `id` int(11) NOT NULL,
  `task` varchar(200) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
);
 
ALTER TABLE `tasks` ADD PRIMARY KEY (`id`);
ALTER TABLE `tasks` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

## 插入数据
INSERT INTO `tasks` (`id`, `task`, `status`, `created_at`) VALUES
(1, 'Find bugs', 1, '2016-04-10 23:50:40'),
(2, 'Review code', 1, '2016-04-10 23:50:40'),
(3, 'Fix bugs', 1, '2016-04-10 23:50:40'),
(4, 'Refactor Code', 1, '2016-04-10 23:50:40'),
(5, 'Push to prod', 1, '2016-04-10 23:50:50');

## 静态资源使用缓存
### built-in middleware
```javascript
express.static(root, [options])
app.use(express.static('public'))
// virtual path prefix
app.use('/static', express.static('public'))
```

### 使用反向代理 reverse proxy
参考： http://expressjs.com/en/advanced/best-practice-performance.html#use-a-reverse-proxy
方向代理位于web app前面，除了将**请求定向**到app外，还对**请求执行支持操作**，It can handle error pages, compression（压缩）, caching, serving files, and load balancing among other things.

将不需要应用程序状态知识的任务交给反向代理可以释放Express来执行专门的应用程序任务。因此，建议在生产环境中运行Express，运行在Nginx或HAProxy等反向代理之后。

不推荐使用express的静态options
参考： http://expressjs.com/en/4x/api.html#express.static
