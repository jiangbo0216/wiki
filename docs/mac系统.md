## [brew官网](https://brew.sh/index_zh-cn.html)
安装 Homebrew
`/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

## nginx
`brew install nginx`

安装完成之后:
* 注意文件在 `/usr/local/var/www` 文件夹下
* 对应的配置文件地址在/usr/local/etc/nginx/nginx.conf

### 运行nginx
nginx

### 修改配置
/usr/local/etc/nginx/nginx.conf

### 重新启动nginx
nginx -s reload

### 关闭nginx
nginx -s stop

### 系统hosts
/private/etc/hosts