# webpack编译流程分析

通过上两节我们了解到了，webpack的编译阶段可以分为准备阶段，将options转换为webpack 可识别的options配置项；构建阶段，其中，Compiler提供了构建各阶段的钩子函数，代码优化阶段， 而Compilation则提供了模块优化构建的流程。

## [#](https://pcaaron.github.io/pages/fe/webpack/flow.html#准备阶段)准备阶段

webpack准备阶段会将一些插件挂载到compiler实例上，同时进行EntryOptionPlugin的一些初始化。 接着进入Compiler，完成Compilation以及NormalModuleFactory、ContextModuleFactory工厂 函数的创建，最终进入compiler.run阶段。

```javascript
//webpack.js
...
const webpack = (options, callback) => {
    let compiler;
    if (Array.isArray(options)) {
        compiler = new MultiCompiler(
            Array.from(options).map(options => webpack(options))
    	);
    } else if (typeof options === "object") {
        // options设置默认参数
        options = new WebpackOptionsDefaulter().process(options);
    
        compiler = new Compiler(options.context);
        compiler.options = options;
        // NodeEnvironmentPlugin ：构建前，监听beforeRun钩子，执行缓存清理
        new NodeEnvironmentPlugin({
    		infrastructureLogging: options.infrastructureLogging
    	}).apply(compiler);
        // 遍历插件并将compiler对象传递给插件，当compiler钩子触发时候实现plugin内部监听
        if (options.plugins && Array.isArray(options.plugins)) {
            for (const plugin of options.plugins) {
                if (typeof plugin === "function") {
                    plugin.call(compiler, compiler);
                } else {
                    plugin.apply(compiler);
                }
            }
        }
        compiler.hooks.environment.call();
        compiler.hooks.afterEnvironment.call();
        //WebpackOptionsApply： 将所有的配置options参数转换成webpack内部插件，使用默认的插件列表
        // 例如，output.library则会使用LibraryTemplatePlugin；externals则使用ExternalsPlugin等
        // 另外，WebpackOptionsApply也完成了使用EntryOptionPlugin完成了entry options的初始化
        compiler.options = new WebpackOptionsApply().process(options, compiler);
    }
    ...
}
```

## [#](https://pcaaron.github.io/pages/fe/webpack/flow.html#构建阶段)构建阶段

进入Compiler，实例化Compiler时候会创建Compilation对象，NormalModuleFactory、ContextModuleFactory工厂方法， 执行run方法，触发beforeRun后则执行compile。
其中，与Compiler流程相关的钩子有：beforeRun/run，beforeCompile/AfterCompile，make，afterEmit/emit，done等， 而与监听有关的钩子有watchRun，watchClose

```javascript
//Compiler.js
...
const {
	Tapable,
	SyncHook,
	SyncBailHook,
	AsyncParallelHook,
	AsyncSeriesHook
} = require("tapable");
// NormalModule在构建时使用loader-runner运行loaders，
// 生成js代码则通过Parser解析依赖，最后通过parserPlugins添加依赖
const NormalModuleFactory = require("./NormalModuleFactory");
const ContextModuleFactory = require("./ContextModuleFactory");
const Compilation = require("./Compilation");
...
class Compiler extends Tapable {
	constructor(context) {
		super();
		this.hooks = {
			shouldEmit: new SyncBailHook(["compilation"]),
			// 构建完成后
			done: new AsyncSeriesHook(["stats"]),
			// 开启构建前
			beforeRun: new AsyncSeriesHook(["compiler"]),
			// 开始构建
			run: new AsyncSeriesHook(["compiler"]),
			emit: new AsyncSeriesHook(["compilation"]),
			afterEmit: new AsyncSeriesHook(["compilation"]),
			// 类似HtmlWebpackPlugin等一些插件会有独立的构建流程，则执行thisCompilation
			thisCompilation: new SyncHook(["compilation", "params"]),
			compilation: new SyncHook(["compilation", "params"]),
			beforeCompile: new AsyncSeriesHook(["params"]),
			compile: new SyncHook(["params"]),
			make: new AsyncParallelHook(["compilation"]),
			afterCompile: new AsyncSeriesHook(["compilation"]),
			watchRun: new AsyncSeriesHook(["compiler"]),
			failed: new SyncHook(["error"]),
			watchClose: new SyncHook([]),
			// 初始化options
			entryOption: new SyncBailHook(["context", "entry"])，
			...
		};
        ...
	}
	createCompilation() {
	    return new Compilation(this);
	}
	run(callback){
	    ...
	    // 开始真正构建
	    const onCompiled = (err, compilation) => {
	        if (err) return finalCallback(err);
	        // 最终编译完成判断是否生成资源
	        if (this.hooks.shouldEmit.call(compilation) === false) {
	            const stats = new Stats(compilation);
	            stats.startTime = startTime;
	            stats.endTime = Date.now();
	            this.hooks.done.callAsync(stats, err => {
	                if (err) return finalCallback(err);
	                return finalCallback(null, stats);
	            });
	            return;
	        }
	        this.emitAssets(compilation, err => {
	            if (err) return finalCallback(err);
            
	            if (compilation.hooks.needAdditionalPass.call()) {
	                compilation.needAdditionalPass = true;
            
	                const stats = new Stats(compilation);
	                stats.startTime = startTime;
	                stats.endTime = Date.now();
	                this.hooks.done.callAsync(stats, err => {
	                    if (err) return finalCallback(err);
	                    this.hooks.additionalPass.callAsync(err => {
	                        if (err) return finalCallback(err);
	                        this.compile(onCompiled);
	                    });
	                });
	                return;
	            }
           ...
	    };
	    this.hooks.beforeRun.callAsync(this, err => {
	        if (err) return finalCallback(err);
	        this.hooks.run.callAsync(this, err => {
	            if (err) return finalCallback(err);
	            this.readRecords(err => {
	                if (err) return finalCallback(err);
	                // 进入onCompiled
	                this.compile(onCompiled);
	            });
	        });
	    });
	}
	compile(callback) {
    	const params = this.newCompilationParams();
    	this.hooks.beforeCompile.callAsync(params, err => {
    		if (err) return callback(err);
    		this.hooks.compile.call(params);
    		const compilation = this.newCompilation(params);
    		// hooks.make会调用compilation的addEntry钩子
    		//从entry开始递归的分析依赖，对每个依赖模块进行build
    		this.hooks.make.callAsync(compilation, err => {
    		    if (err) return callback(err);
    		    // compilation.finish则模块构建完成后，会触发hooks.finishModules钩子
    		    // 获取到经过loader转换后的源码
    		    compilation.finish(err => {
    		        if (err) return callback(err);
    		        compilation.seal(err => {
    		            if (err) return callback(err);
    		            this.hooks.afterCompile.callAsync(compilation, err => {
    		                if (err) return callback(err);
    		                return callback(null, compilation);
    		            });
    		        });
    		    });
    		});
    	});
	}
	...
}

module.exports = Compiler;
```

Compilation就是负责模块的构建和构建优化的过程。 其中，Compilation相关的钩子有： 模块构建相关:buildModule，failModule，succeedModule 资源生成相关：moduleAsset，chunkAsset 优化相关的：optimize，afterOptimzeModules等。

```javascript
//Compilation.js
...
const {
	Tapable,
	SyncHook,
	SyncBailHook,
	SyncWaterfallHook,
	AsyncSeriesHook
} = require("tapable");
...
class Compilation extends Tapable {
	constructor(compiler) {
		super();
		this.hooks = {
		    // 模块构建相关的钩子
			buildModule: new SyncHook(["module"]),
			rebuildModule: new SyncHook(["module"]),
			failedModule: new SyncHook(["module", "error"]),
			succeedModule: new SyncHook(["module"]),
			// entry相关的
			addEntry: new SyncHook(["entry", "name"]),
			failedEntry: new SyncHook(["entry", "name", "error"]),
			succeedEntry: new SyncHook(["entry", "name", "module"]),
			dependencyReference: new SyncWaterfallHook([
				"dependencyReference",
				"dependency",
				"module"
			]),

			finishModules: new AsyncSeriesHook(["modules"]),
			finishRebuildingModule: new SyncHook(["module"]),
			//seal相关的
			unseal: new SyncHook([]),
			seal: new SyncHook([]),
			// chunks相关的
			beforeChunks: new SyncHook([]),
			afterChunks: new SyncHook(["chunks"]),
			// 优化相关的
			optimizeDependenciesBasic: new SyncBailHook(["modules"]),
			optimizeDependencies: new SyncBailHook(["modules"]),
			optimizeDependenciesAdvanced: new SyncBailHook(["modules"]),
			afterOptimizeDependencies: new SyncHook(["modules"]),
			optimize: new SyncHook([]),
			optimizeModulesBasic: new SyncBailHook(["modules"]),
			optimizeModules: new SyncBailHook(["modules"]),
			optimizeModulesAdvanced: new SyncBailHook(["modules"]),
			afterOptimizeModules: new SyncHook(["modules"]),
			optimizeChunksBasic: new SyncBailHook(["chunks", "chunkGroups"]),
			optimizeChunks: new SyncBailHook(["chunks", "chunkGroups"]),
			//资源生成
			chunkHash: new SyncHook(["chunk", "chunkHash"]),
            moduleAsset: new SyncHook(["module", "filename"]),
		    ...
		};
		...
	}
	addEntry(context, entry, name, callback) {
	    this.hooks.addEntry.call(entry, name);
        ...
    	if (entry instanceof ModuleDependency) {
            slot.request = entry.request;
        }
        // 将模块添加到依赖列表，执行模块构建buildModule
        this._addModuleChain(
            context,
    		entry,
    		module => {
                this.entries.push(module);
        },
    	(err, module) => {
    		...
    		this.hooks.succeedEntry.call(entry, name, module);
    		return callback(null, module);
        });
    }
    // 最后会进入buildModule
    buildModule(module, optional, origin, dependencies, thisCallback) {
    	...
    	this.hooks.buildModule.call(module);
    	// 进入doBuild
    	//依赖loader-runner运行构建，完成后会运行parser.parse解析，最后把依赖模块添加到依赖列表modules
    	module.build(
    	    this.options,
    		this,
    		this.resolverFactory.get("normal", module.resolveOptions),
    		this.inputFileSystem,
    		error => {
    	        ...
    	        if (error) {
    	            this.hooks.failedModule.call(module, error);
    	            return callback(error);
    			}
    			this.hooks.succeedModule.call(module);
    	        return callback();
    	    }
    	);
	}
    ...
}

module.exports = Compilation;
```

## [#](https://pcaaron.github.io/pages/fe/webpack/flow.html#文件生成)文件生成

最后Compilation完成seal和优化之后，会回到Compiler执行emitAssets，将内容输出到磁盘上。

```javascript
//Compiler.js
...
class Compiler extends Tapable {
    constructor(context){...}
    emitAssets(compilation, callback) {
        this.hooks.emit.callAsync(compilation, err => {
            if (err) return callback(err);
            outputPath = compilation.getPath(this.outputPath);
            this.outputFileSystem.mkdirp(outputPath, emitFiles);
        });
    }
    ...
}
```

## [#](https://pcaaron.github.io/pages/fe/webpack/flow.html#总结)总结

可以简单的总结为，webpack的编译按照钩子调用顺序执行的流程：
初始化EntryOptions，进入Compiler.run开始编译，hooks.make会调用Compilation的addEntry钩子，从entry开始递归的 分析依赖，对每个依赖模块进行build，对模块位置进行解析beforeResolve，然后开始构建模块buildModule，通过normalModuleLoader 将loader加载完成的module进行编译，生成AST抽象语法树，接着遍历AST，对require等一些调用进行依赖收集，最后将所有依赖构建 完成后，执行seal和优化，并回到Compiler.emit执行磁盘输出，完成编译流程。