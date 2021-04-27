# nside node: What happens when we execute a script?

Jan 20, 20205 min read

[![Inside node: What happens when we execute a script?](data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==)](https://blog.s1h.org/inside-node-executing-a-script/)

Whenever we execute a script, most often we do not think about what happens behind the curtains of our runtime.
We're just happy with running e.g. `node /path/to/file.js` and suddenly, magic happens.
Agreed, one does not require a deeper understanding of how the runtime works internally to be able to use the runtime, but it's not that bad either.

Investigating on runtime startup, module loading or the REPL can be quite some fun, and even if you do not need this knowledge in your day to day work, it might come in handy some time.

This post will take a look at what happens when we execute a JavaScript file with node, or start the node REPL.

------

```cpp
// If you want to understand what's going on, start reading in main
```

With Node.js being an open-source JavaScript runtime we're actually able to start reading in main!
Let's clone the node source first:

```bash
$ git clone https://github.com/nodejs/node.git && cd node
$ tree -L 1
.
├── AUTHORS
├── BSDmakefile
├── BUILDING.md
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── COLLABORATOR_GUIDE.md
├── CONTRIBUTING.md
├── CPP_STYLE_GUIDE.md
├── GOVERNANCE.md
├── LICENSE
├── Makefile
├── README.md
├── SECURITY.md
├── android-configure
├── benchmark
├── common.gypi
├── configure
├── configure.py
├── deps
├── doc
├── lib           # JS sources
├── node.gyp
├── node.gypi
├── src           # C++ sources
├── test
├── tools
└── vcbuild.bat

7 directories, 20 files
```

node actually consists of two kinds of code. There is a bunch of JavaScript, which is located inside `lib/`, as well as a large amount of C++, which can be found in `src/`. The whole startup process is done in C++ and nodes main entry point is located in `src/node_main.cc`.

The most important part here is

```cpp
return node::Start(argc, argv);
```

which calls the `Start` function located in `src/node.cc` and passes command-line parameters in `argc` and `argv`.

As a first step to get started, runtime initialization tasks are carried out in `Start()`. `InitializeOncePerProcess` will handle configuration given either via environment variable (e.g. `NODE_OPTIONS`) or CLI parameters (like `--abort-on-uncaught-exception`) and initialize V8. Once this is done, a new node instance is initialized using the [libuv default loop](http://docs.libuv.org/en/v1.x/loop.html#c.uv_default_loop) and finally run:

```cpp
NodeMainInstance main_instance(&params,
                               uv_default_loop(),
                               per_process::v8_platform.Platform(),
                               result.args,
                               result.exec_args,
                               indexes);
result.exit_code = main_instance.Run()
```

With `NodeMainInstance::Run()` we're getting closer to seeing what will actually be executed when running node. A new main thread execution environment is created in `src/node_main_instance.cc`:

```cpp
std::unique_ptr<Environment> env = CreateMainEnvironment(&exit_code);
```

This `Environment` instance is *the* central object in a node process which holds handles to libuv and V8.

When passed to `LoadEnvironment`

```cpp
LoadEnvironment(env.get());
```

main thread execution starts:

```cpp
void LoadEnvironment(Environment* env) {
  CHECK(env->is_main_thread());
  USE(StartMainThreadExecution(env));
}
```

At this point, we're about to switch from C++ to JavaScript land:

```cpp
MaybeLocal<Value> StartMainThreadExecution(Environment* env) {
  if (NativeModuleEnv::Exists("_third_party_main")) {
    return StartExecution(env, "internal/main/run_third_party_main");
  }

  std::string first_argv;
  if (env->argv().size() > 1) {
    first_argv = env->argv()[1];
  }

  if (first_argv == "inspect" || first_argv == "debug") {
    return StartExecution(env, "internal/main/inspect");
  }

  if (per_process::cli_options->print_help) {
    return StartExecution(env, "internal/main/print_help");
  }


  if (env->options()->prof_process) {
    return StartExecution(env, "internal/main/prof_process");
  }

  // -e/--eval without -i/--interactive
  if (env->options()->has_eval_string && !env->options()->force_repl) {
    return StartExecution(env, "internal/main/eval_string");
  }

  if (env->options()->syntax_check_only) {
    return StartExecution(env, "internal/main/check_syntax");
  }

  if (!first_argv.empty() && first_argv != "-") {
    return StartExecution(env, "internal/main/run_main_module");
  }

  if (env->options()->force_repl || uv_guess_handle(STDIN_FILENO) == UV_TTY) {
    return StartExecution(env, "internal/main/repl");
  }

  return StartExecution(env, "internal/main/eval_stdin");
}
```

In short, `StartExecution` will load, compile and execute the JS file given as the second argument. All files are located inside `lib/` folder.
The two parts which are of most interest for us are

```cpp
if (!first_argv.empty() && first_argv != "-") {
  return StartExecution(env, "internal/main/run_main_module");
}
```

and

```cpp
if (env->options()->force_repl || uv_guess_handle(STDIN_FILENO) == UV_TTY) {
  return StartExecution(env, "internal/main/repl");
}
```

The former snippet will execute a source file we passed as argument while the latter one will start the node REPL.

------

Both `lib/internal/main/repl.js` and `lib/internal/main/run_main_module.js` will run a central startup method which is `prepareMainThreadExecution` in `lib/internal/bootstrap/pre_execution.js`. `prepareMainThreadExecution` will perform several setup tasks, but at the end of the function it will also initialize both the CommonJS and the ES module loader.

The `Module` object in `lib/internal/modules/cjs/loader.js` is the CommonJS loaders core and `initializeCJSLoader` will monkey-patch a `runMain` method into it which will run `executeUserEntryPoint` in `lib/internal/modules/run_main.js`.

In case of a CommonJS module (which I will be assume here) `Module._load` will create a new `Module` instance and call `load` on it. Based on the file extension, the appropriate extension function will be used to load the module:

```js
Module._extensions[extension](this, filename);
```

The `*.js` extension will read the actual file content and compile it:

```js
const content = fs.readFileSync(filename, 'utf8');
module._compile(content, filename)
```

At the end, `module._compile` will call V8's [`ScriptCompiler::CompileFunctionInContext`](https://v8docs.nodesource.com/node-13.2/da/da5/classv8_1_1_script_compiler.html#a23b683964582b75c52d1958606e0d964) passing `exports`, `require`, `module`, `__filename` and `__dirname`, which corresponds to [the node module wrapper](https://nodejs.org/api/modules.html#modules_the_module_wrapper). Calling the resulting function executes our code and returns a result:

```js
result = compiledWrapper.call(thisValue, exports, require, module,
                              filename, dirname);
```

------

The second component of node which we didn't pay attention to yet is the [libuv eventloop](http://docs.libuv.org/en/v1.x/guide/basics.html#event-loops).

After we compiled and executed our JavaScript file, the node main instance starts the event loop:

```cpp
do {
    uv_run(env->event_loop(), UV_RUN_DEFAULT);

    per_process::v8_platform.DrainVMTasks(isolate_);

    more = uv_loop_alive(env->event_loop());
    if (more && !env->is_stopping()) continue;

    if (!uv_loop_alive(env->event_loop())) {
        EmitBeforeExit(env.get());
    }

    // Emit `beforeExit` if the loop became alive either after emitting
    // event, or after running some callbacks.
    more = uv_loop_alive(env->event_loop());
} while (more == true && !env->is_stopping());
```

> This event loop is encapsulated by uv_run() – the end-all function when using libuv.

The [uv_run_mode](http://docs.libuv.org/en/v1.x/loop.html#c.uv_run_mode) `UV_RUN_DEFAULT` will run the event loop until there are no more active and referenced handles or requests.

libuv distincts between handles and requests regarding their lifetime. Long-living objects are referred to as handles, while short-living operations on such handles are identified as requests.

```js
const http = require('http');

const requestHandler = (req, res) => {
  res.write('Hello World!');
  res.end();
};

const server = http.createServer(requestHandler);

server.listen(8080);
```

Looking at the example above, the `requestHandler` function is an example for a libuv request, while the `server` object which we call `listen` on is a handle.

As long as we do not stop our HTTP server, libuv will keep on running and processing incoming connections!

------

That's it for the most part. There are some things I skipped, but overall, this post captures the essential parts of what's going on inside node when we execute a script.

It's pretty interesting to dig around the source to see how it all fits together, there's already another topic on my list of things to find out!