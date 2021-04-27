# Process

[Process](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process)

- [Process events](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_events)
  - [Event: `'beforeExit'`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_event_beforeexit)
  - [Event: `'disconnect'`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_event_disconnect)
  - [Event: `'exit'`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_event_exit)
  - [Event: `'message'`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_event_message)
  - [Event: `'multipleResolves'`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_event_multipleresolves)
  - [Event: `'rejectionHandled'`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_event_rejectionhandled)
  - [Event: `'uncaughtException'`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_event_uncaughtexception)
    - [Warning: Using `'uncaughtException'` correctly](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_warning_using_uncaughtexception_correctly)
  - [Event: `'uncaughtExceptionMonitor'`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_event_uncaughtexceptionmonitor)
  - [Event: `'unhandledRejection'`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_event_unhandledrejection)
  - [Event: `'warning'`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_event_warning)
    - [Emitting custom warnings](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_emitting_custom_warnings)
  - [Signal events](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_signal_events)
- [`process.abort()`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_abort)
- [`process.allowedNodeEnvironmentFlags`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_allowednodeenvironmentflags)
- [`process.arch`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_arch)
- [`process.argv`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_argv)
- [`process.argv0`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_argv0)
- [`process.channel`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_channel)
  - [`process.channel.ref()`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_channel_ref)
  - [`process.channel.unref()`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_channel_unref)
- [`process.chdir(directory)`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_chdir_directory)
- [`process.config`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_config)
- [`process.connected`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_connected)
- [`process.cpuUsage([previousValue\])`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_cpuusage_previousvalue)
- [`process.cwd()`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_cwd)
- [`process.debugPort`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_debugport)
- [`process.disconnect()`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_disconnect)
- [`process.dlopen(module, filename[, flags\])`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_dlopen_module_filename_flags)
- [`process.emitWarning(warning[, options\])`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_emitwarning_warning_options)
- [`process.emitWarning(warning[, type[, code\]][, ctor])`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_emitwarning_warning_type_code_ctor)
  - [Avoiding duplicate warnings](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_avoiding_duplicate_warnings)
- [`process.env`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_env)
- [`process.execArgv`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_execargv)
- [`process.execPath`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_execpath)
- [`process.exit([code\])`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_exit_code)
- [`process.exitCode`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_exitcode)
- [`process.getegid()`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_getegid)
- [`process.geteuid()`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_geteuid)
- [`process.getgid()`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_getgid)
- [`process.getgroups()`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_getgroups)
- [`process.getuid()`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_getuid)
- [`process.hasUncaughtExceptionCaptureCallback()`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_hasuncaughtexceptioncapturecallback)
- [`process.hrtime([time\])`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_hrtime_time)
- [`process.hrtime.bigint()`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_hrtime_bigint)
- [`process.initgroups(user, extraGroup)`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_initgroups_user_extragroup)
- [`process.kill(pid[, signal\])`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_kill_pid_signal)
- [`process.mainModule`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_mainmodule)
- [`process.memoryUsage()`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_memoryusage)
- [`process.nextTick(callback[, ...args\])`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_nexttick_callback_args)
- [`process.noDeprecation`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_nodeprecation)
- [`process.pid`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_pid)
- [`process.platform`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_platform)
- [`process.ppid`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_ppid)
- [`process.release`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_release)
- [`process.report`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_report)
  - [`process.report.compact`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_report_compact)
  - [`process.report.directory`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_report_directory)
  - [`process.report.filename`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_report_filename)
  - [`process.report.getReport([err\])`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_report_getreport_err)
  - [`process.report.reportOnFatalError`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_report_reportonfatalerror)
  - [`process.report.reportOnSignal`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_report_reportonsignal)
  - [`process.report.reportOnUncaughtException`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_report_reportonuncaughtexception)
  - [`process.report.signal`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_report_signal)
  - [`process.report.writeReport([filename\][, err])`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_report_writereport_filename_err)
- [`process.resourceUsage()`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_resourceusage)
- [`process.send(message[, sendHandle[, options\]][, callback])`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_send_message_sendhandle_options_callback)
- [`process.setegid(id)`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_setegid_id)
- [`process.seteuid(id)`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_seteuid_id)
- [`process.setgid(id)`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_setgid_id)
- [`process.setgroups(groups)`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_setgroups_groups)
- [`process.setuid(id)`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_setuid_id)
- [`process.setUncaughtExceptionCaptureCallback(fn)`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_setuncaughtexceptioncapturecallback_fn)
- [`process.stderr`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_stderr)
  - [`process.stderr.fd`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_stderr_fd)
- [`process.stdin`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_stdin)
  - [`process.stdin.fd`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_stdin_fd)
- [`process.stdout`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_stdout)
  - [`process.stdout.fd`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_stdout_fd)
  - [A note on process I/O](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_a_note_on_process_i_o)
- [`process.throwDeprecation`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_throwdeprecation)
- [`process.title`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_title)
- [`process.traceDeprecation`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_tracedeprecation)
- [`process.umask()`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_umask)
- [`process.umask(mask)`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_umask_mask)
- [`process.uptime()`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_uptime)
- [`process.version`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_version)
- [`process.versions`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_versions)
- [Exit codes](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_exit_codes)

## process

一个全局对象提供了当前Node.js进程的信息, 并对其进行控制

## events

The `process` object is an instance of [`EventEmitter`](https://nodejs.org/dist/latest-v14.x/docs/api/events.html#events_class_eventemitter).

### Event: `'beforeExit'`

当 Node.js 清空其事件循环并且没有其他工作要安排时，会触发 `'beforeExit'` 事件。 通常，Node.js 进程将在没有调度工作时退出，但是在 `'beforeExit'` 事件上注册的监听器可以进行异步调用，从而导致 Node.js 进程继续。

调用监听器回调函数时会将 [`process.exitCode`](http://nodejs.cn/s/TMxzzD) 的值作为唯一参数传入。

对于导致显式终止的条件，不会触发 `'beforeExit'` 事件，例如调用 [`process.exit()`](http://nodejs.cn/s/53qrEa) 或未捕获的异常。

### Event: `'disconnect'`

如果使用 IPC 通道衍生 Node.js 进程（参见[子进程](http://nodejs.cn/s/73VVnB)和[集群](http://nodejs.cn/s/4cbAVb)文档），则在 IPC 通道关闭时将触发 `'disconnect'` 事件。

### Event: `'exit'`

- `code` [integer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

当 Node.js 进程因以下原因之一即将退出时，则会触发 `'exit'` 事件：

- 显式调用 `process.exit()` 方法；
- Node.js 事件循环不再需要执行任何其他工作。

监听器函数必须只执行同步操作。 在调用 `'exit'` 事件监听器之后，Node.js 进程将立即退出，从而导致在事件循环中仍排队的任何其他工作被放弃。 例如，在以下示例中，定时器中的操作不会发生：

```js
process.on('exit', (code) => {
  setTimeout(() => {
    console.log('此处不会运行');
  }, 0);
});
```

### Event: `'uncaughtException'`

### Event: `'unhandledRejection'`

## `process.arch`

## `process.argv`

## 优雅退出程序

`SIGKILL` is the signals that tells a process to immediately terminate, and would ideally act like
process.exit() .

`SIGTERM` is the signals that tells a process to gracefully terminate. It is the signal that's sent
from process managers like upstart or supervisord and many others.
You can send this signal from inside the program, in another function:

```js
process.kill(process.pid, 'SIGTERM')

```

Or from another Node.js running program, or any other app running in your system that knows
the PID of the process you want to terminate

```js
process.on('SIGTERM', () => {
  server.close(() => {
  console.log('Process terminated')
  })
})

```
