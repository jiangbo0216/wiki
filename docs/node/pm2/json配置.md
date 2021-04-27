```js
{
  "apps": [
    {
      "name": "AA",
      "script": "./bin/www",
      "cwd": "./",
      "watch": true,
      "node_args": ["--inspect"], // pm2 debug
      "ignore_watch": [
        "node_modules",
        ".git",
        ".vscode",
        "public",
        "views",
        "logs",
        "cache"
      ],
      "watch_options": {
        "followSymlinks": false
      },
      "kill_timeout": 1000,
      "error_file": "logs/pm2_err.log",
      "out_file": "logs/pm2_out.log",
      "merge_logs": true,
      "log_date_format": "YYYY-MM-DD HH:mm:ss Z",
      "env": { // 环境变量
        "NODE_ENV": "development",
        "PORT": "3001",
        "REDIS_HOST": "127.0.0.1",
        "REDIS_PORT": "6379",
        "REDIS_PASS": "AAA",
        "REDIS_DB": 0,
        "MYSQL_HOST": "127.0.0.1",
        "MYSQL_USER": "root",
        "MYSQL_PASS": "BB",
        "MYSQL_DB": "db",
        "MYSQL_PORT": "3306"
      },
      "instances": 1,
      "max_memory_restart": "1000M",
      "exec_interpreter": "node",
      "exec_mode": "fork"
    }
  ]
}

```

vscode attach模式

```
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Launch Program",
      "skipFiles": [
        "<node_internals>/**"
      ],
    }
  ]
}
```
