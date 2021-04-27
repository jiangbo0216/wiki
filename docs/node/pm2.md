## pm2

advance, production process manager for node.js

Node.js先进的，生产进程管理

## pm2日志位置

~/.pm2/pm2.log

或者是`~/.pm2/logs/[app-name]_error.log`

这里可以查看异常重启的原因，或者inspect时的端口

By default, logs (error and output), pid files, dumps, and PM2 logs are located in ~/.pm2/:

.pm2/
├── dump.pm2 保存/恢复进程列表
├── custom_options.sh
├── pm2.log 日志
├── pm2.pid 进程id
├── logs
└── pids

## pm2命令

Fork mode

* pm2 start app.js --name my-api
Start and name a process

Cluster mode

* pm2 start app.js -i 0
Will start maximum processes with LB depending on available CPUs

Listing

* pm2 list
Display all processes status
* pm2 jlist
Print process list in raw JSON
* pm2 prettylist
Print process list in beautified JSON
* pm2 describe 0
Display all information about a specific process
* pm2 monit
Monitor all processes

Logs

* pm2 logs [--raw]
Display all processes logs in streaming
* pm2 flush
Empty all log files
* pm2 reloadLogs
Reload all logs

Actions

* pm2 stop all
Stop all processes
* pm2 restart all
Restart all processes
* pm2 reload all
Will 0s downtime reload (for NETWORKED apps)
* pm2 stop 0
Stop specific process id
* pm2 restart 0
Restart specific process id
* pm2 delete 0
Will remove process from pm2 list
* pm2 delete all
Will remove all processes from pm2 list

Misc

* `pm2 reset <process>`
Reset meta data (restarted time…)
* pm2 updatePM2
Update in memory pm2
* pm2 ping
Ensure pm2 daemon has been launched
* pm2 sendSignal SIGUSR2 my-app
Send system signal to script
* pm2 start app.js --no-daemon
Run pm2 daemon in the foreground if it doesn’t exist already
* pm2 start app.js --no-vizion
Skip vizion features (versioning control)
* pm2 start app.js --no-autorestart
Do not automatically restart app

## pm2-logrotate

### install

pm2 install pm2-logrotate

### config

```
pm2 set pm2-logrotate:max_size 1K (1KB)
pm2 set pm2-logrotate:compress true (compress logs when rotated)
pm2 set pm2-logrotate:rotateInterval '*/1 * * * *' (force rotate every minute)
```

## pm2 查看安装的modules

pm2 ls

## 修改了启动配置文件需要重启应用, 设置了对应环境需要加上环境参数

```shell
pm2 start start.json --env production
```
