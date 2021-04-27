## [理解webpack4.splitChunks](https://www.cnblogs.com/kwzm/p/10314438.html)

### webpack中的三个概念module、chunk和bundle**

　　在研究splitChunks之前，我们必须先弄明白这三个名词是什么意思，主要是chunk的含义，要不然你就不知道splitChunks是在什么的基础上进行拆分。

　　从官网上貌似没找太多的解释，去网上搜了搜基本上都在转述这位老哥的回答[《what are module,chunk and bundle in webpack》](https://stackoverflow.com/questions/42523436/what-are-module-chunk-and-bundle-in-webpack)，我根据自己的理解给出我个人的看法：

- module：就是js的模块化webpack支持commonJS、ES6等模块化规范，简单来说就是你通过import语句引入的代码。
- chunk: chunk是webpack根据功能拆分出来的，包含三种情况：

　　　　1、你的项目入口（entry）

　　　　2、通过import()动态引入的代码

　　　　3、通过splitChunks拆分出来的代码

　　　　chunk包含着module，可能是一对多也可能是一对一。

- bundle：bundle是webpack打包之后的各个文件，一般就是和chunk是一对一的关系，bundle就是对chunk进行编译压缩打包等处理之后的产出。



### splitChunks

splitChunks就算你什么配置都不做它也是生效的，源于webpack有一个默认配置，这也符合webpack4的开箱即用的特性，它的默认配置如下：

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};
```

我们现在用一个简单的react项目来测试下打包之后的效果如何，我的这个项目有两个页面entry1.js和page1.js，entry1.js是入口文件，entry1.js里面动态引入了page1.js。

entry1.js

```js
 1 import React from 'react'
 2 import ReactDOM from 'react-dom'
 4 
 5 const App = () => {
 6   let Page1 = null
 7 
 8   import(/* webpackChunkName: "page1" */'./routes/page1').then(comp => {
 9     Page1 = comp
10   })
11   console.log($)
12   return (
13     <div>
14       <div>App</div>
15       <Page1 />
16     </div>
17   )
18 }
19 
20 ReactDOM.render(<App />, document.getElementById('root'))
```

page1.js

```js
 1 import React from 'react'
 2 import _ from 'lodash'
 4 
 5 const Page1 = () => {
 6   console.log($)
 7   
 8   return (
 9     <div>
10       <div>Page1</div>
11     </div>
12   )
13 }
14 
15 export default Page1
```

让我们想一想打包之后的代码是怎样的呢？

![20200322144743.png](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/20200322144743.png)

以上就是打包之后的代码，是否如你所想呢，让我们分析一下：

1、第一个main文件就是打包之后的入口文件，这个我们上面说了webpack会把入口文件单独拆成一个chunk，这个没有问题

2、第三个page1文件，我们上面也说过动态加载得文件webpack会将其拆分为一个chunk，这个也没有问题

3、第二个vendor~page1文件，这个是对page1文件里面引入的第三方库进行打包，具体就是lodash那个第三方库了，这个涉及到cacheGroup，我们在下面的系列文章里面会详细讲述

以上就是所有被拆分出来的包，但是我们发现有一个文件没有拆分出来，那就是entry1里面引入的第三方库react-dom，这个是为什么呢，这个就要涉及到我们接下来讲到的chunks属性的配置。

注意：这里提个小问题为什么react-dom这个第三方库只在entry1.js里面引入了一次就被拆分出来了？这个答案我将在第三篇文章[《理解webpack4.splitChunks之cacheGroups》](https://www.cnblogs.com/kwzm/p/10315080.html)里面进行解释。

 

为了方便阅读我将整个系列分为了若干小部分，大家可以各取所需：

[《理解webpack4.splitChunks之chunks》](https://www.cnblogs.com/kwzm/p/10314827.html)

[《理解webpack4.splitChunks之cacheGroups》](https://www.cnblogs.com/kwzm/p/10315080.html)

[《理解webpack4.splitChunks之maxInitialRequests》](https://www.cnblogs.com/kwzm/p/10316217.html)

[《理解webpack4.splitChunks之maxAsyncRequests》](https://www.cnblogs.com/kwzm/p/10316482.html)

[《理解webpack4.splitChunks之其余要点》](https://www.cnblogs.com/kwzm/p/10333554.html)

[ ](https://www.cnblogs.com/kwzm/p/10333554.html)

文章中所用到的源码仓库地址是[webpack-splitChunks-demo](https://github.com/kwzm/webpack-splitChunks-demo)



## [理解webpack4.splitChunks之cacheGroups](https://www.cnblogs.com/kwzm/p/10315080.html)

cacheGroups其实是splitChunks里面最核心的配置，一开始我还认为cacheGroups是可有可无的，这是完全错误的，splitChunks就是根据cacheGroups去拆分模块的，包括之前说的chunks属性和之后要介绍的种种属性其实都是对缓存组进行配置的。splitChunks默认有两个缓存组：vender和default，可以再来回顾一下splitChunks的默认配置：

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};
```

想想[第一篇文章](https://www.cnblogs.com/kwzm/p/10314438.html)里为什么默认的打包能够将第三方库拆分出来，就是因为cacheGroups里面定义了vendors这个缓存组，它的test设置为 /[\\/]node_modules[\\/]/ 表示只筛选从node_modules文件夹下引入的模块，所以所有第三方模块才会被拆分出来。除此之外还有一个default缓存组，它会将至少有两个chunk引入的模块进行拆分，它的权重小于vendors，下面我们通过demo来测试一下。

我修改webpack的entry，新加入一个entry2.js，代码如下：

webpack配置：
![20200322145004.png](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/20200322145004.png)



entry1.js

```js
import React from 'react'
import ReactDOM from 'react-dom'
import $ from './assets/jquery'

const App = () => {
  return (
    <div>
      <div>entry1</div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```



entry2.js

```js
import React from 'react'
import ReactDOM from 'react-dom'
import $ from './assets/jquery'

const App = () => {
  return (
    <div>
      <div>entry2</div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```



打包之后的结果如下：
![20200322145513.png](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/20200322145513.png)
![20200322145727.png](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/20200322145727.png)

entry1.js和entry2.js都引入了jquery.js，所以jquery.js的引用次数为2，minChunks的默认值为2，所以正好满足要求于是第二个包被拆分出来了。

你当然也可以自己定义缓存组来根据你的项目实际情况进行耕细粒度的拆分。　　

另外还需要说明一下，cacheGroups之外设置的约束条件比如说默认配置里面的chunks、minSize、minChunks等等都会作用于cacheGroups，除了`test`, `priority` and `reuseExistingChunk，这三个`是只能定义在cacheGroup这一层的，这也就解释了[第一篇文章](https://www.cnblogs.com/kwzm/p/10314438.html)里面为什么entry里面引入的第三方库react-dom只被entry1.js引入了一次就会被打包出来，因为默认的minChunks=1，这个属性会作用于所有的cacheGroups，但是cacheGroups也可以将上面的所有属性都重新定义，就会覆盖外面的默认属性，比如default这个缓存组就设置了minChunks=2，他会覆盖掉默认值1。

 

注意：这块再提一个思考，为什么entry1.js和entry2.js里面都引入了react-dom这个第三方库，它完全满足default这个cacheGroup的条件但是为什么没有被包含在default~entry1~entry2这个chunk中而是被纳入了vendor~entry1~entry2这个chunk里面了呢？

其实这是因为priority这个属性起了作用，它的含义是权重，如果有一个模块满足了多个缓存组的条件就会去按照权重划分，谁的权重高就优先按照谁的规则处理，default的priority是-20明显小于vendors的-10，所以会优先按照vendors这个缓存组拆分。





## [理解webpack4.splitChunks之chunks](https://www.cnblogs.com/kwzm/p/10314827.html)

　　上回说到按照默认的splitChunks配置，入口里面的第三方依赖没有打包出来，这个是因为chunks属性的原因，下面我们就介绍chunks属性的意义和用法。

chunks的含义是拆分模块的范围，它有三个值async、initial和all。

- async表示只从异步加载得模块（动态加载import()）里面进行拆分
- initial表示只从入口模块进行拆分
- all表示以上两者都包括

我们回顾下上一篇文章里面我们说的webpack splitChunks默认配置：

```
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};
```



我们发现chunks的默认配置是async，也就是只从动态加载得模块里面进行拆分，怪不得能够把page1引入的第三方模块拆分出来，但是因为entry1.js属于入口chunk所以它引入的第三方库react-dom就没能拆分出来。

　　现在让我们来将chunks设置为all看看能否修复这个问题，下图就是chunks设置all拆分出来的代码：

![20200322151126.png](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/20200322151126.png)
这回我们发现入口模块的第三方依赖已经被成功拆分出来了（第一个），接下来让我来考考你，如果我将chunks设置为initial，打包的结果会是什么呢？

![20200322151107.png](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/20200322151107.png)

上面就是chunks设置为initial的结果，不知道你猜对了吗，也就是将page1.js这个动态加载的模块所引入的第三方模块去掉了，没有拆分出来，因为initial只会对入口模块进行拆分。



## [理解webpack4.splitChunks之maxInitialRequests](https://www.cnblogs.com/kwzm/p/10316217.html)

　　maxInitialRequests是splitChunks里面比较难以理解的点之一，它表示允许入口并行加载的最大请求数，之所以有这个配置也是为了对拆分数量进行限制，不至于拆分出太多模块导致请求数量过多而得不偿失。

　　这里需要注意几点：

- 入口文件本身算一个请求
- 如果入口里面有动态加载得模块这个不算在内
- 通过runtimeChunk拆分出的runtime不算在内
- 只算js文件的请求，css不算在内
- 如果同时又两个模块满足cacheGroup的规则要进行拆分，但是maxInitialRequests的值只能允许再拆分一个模块，那尺寸更大的模块会被拆分出来

　　是不是感觉还是太抽象了难以理解，我下面会通过一个例子来实际演示一下：

　　我在webpack里面配置三个入口文件entry1.js、entry2.js和entry3.js：

![20200322153609.png](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/20200322153609.png)

　　splitChunks的配置如下基本就是默认配置（只不过把chunks的范围改为了all）：

```js
splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
```

　　entry1.js：



```
import React from 'react'
import ReactDOM from 'react-dom'
import $ from './assets/jquery'
import OrgChart from './assets/orgchart'

const App = () => {
  let Page1 = null

  import(/* webpackChunkName: "page1" */'./routes/page1').then(comp => {
    Page1 = comp
  })

  return (
    <div>
      <div>App</div>
      <Page1 />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

　　entry2.js



```
import React from 'react'
import ReactDOM from 'react-dom'
import $ from './assets/jquery'

const App = () => {
  console.log($)
  return (
    <div>
      <div>entry2</div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```



　　entry3.js



```
import React from 'react'
import ReactDOM from 'react-dom'
import OrgChart from './assets/orgchart'

const App = () => {
  return (
    <div>
      <div>App</div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```



　　打包结果：

![20200322153619.png](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/20200322153619.png)

　　让我们来分析下这个demo：

　　1、entry1.js和entry2.js两个入口会被拆分成两个文件就是最下面这两个，这个没有问题

　　2、因为entry1.js和entry2.js都引入了第三方库react、react-dom所以会被cacheGroups中的vendors缓存组进行拆分成第二个包vendors~entry1~entry2

　　3、因为entry1.js和entry2.js都引入了共同的模块jquery.js（注意default不是从node_modules里面引入的，是我下载到本地的），所以满足cacheGroups的default缓存组，所以被拆成了第二个包default~entry1~entry2

　　4、page1因为是在entry1.js里面动态引入的所以被拆分出来

　　5、vendors~page1就是page1里面引入的第三方库lodash

　　6、剩下的三个文件都是入口chunk

　　但是这里我们发现我们在entry1.js和entry3.js里面共同引入的orgchart.js没有被拆分出来，这个文件是完全满足cacheGroups中的default这个缓存组的，但是却没有被拆分出来，查看打包的分析页面：

![20200322153628.png](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/20200322153628.png)

![20200322153635.png](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/20200322153635.png)
　　我们发现orgchart.js确实都还在入口文件里面面，那为什么会导致这个问题呢，这就是因为咱们今天的主角maxInitialRequests，因为它的默认值为3，所以每个入口的并发请求数就不能大于3，我们看下entry1的并发请求数目前有哪些：

　　1、entry1.js本身是一个对应的就是entry1.cc7c4ca4.js这个文件

　　2、vendors~entry1~entry2~entry3.chunkhash.chunk.js（hash太长了就不写了= =）

　　3、default~entry1~entry2.chunkhash.chunk.js

　　所以目前已经达到了最大的请求数3，这就是为什么不会吧orgchart.js再拆分出来的原因，那么如果我把maxInitialRequests改为4呢？

　　打包之后的结果如下：

![20200322153647.png](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/20200322153647.png)
![20200322153653.png](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/20200322153653.png)
　　可以看到多打出来的包正是我们希望的orgchart.js文件，这也证明了maxInitialRequests的作用。

　　

　　注意：你有没有发现第一次打包的时候为什么是jquery被拆分了而orgchart.js没有被拆分，为啥不是倒过来呢？

　　这就是我在文章开头所说的当同时又两个模块满足拆分条件的时候更大的包会先被拆分

　![20200322153701.png](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/20200322153701.png)

　　可以看到jquery.js的大小明显大于orgchart.js的大小，所以它被先拆分了。



## [理解webpack4.splitChunks之maxAsyncRequests](https://www.cnblogs.com/kwzm/p/10316482.html)

　　maxAsyncRequests和maxInitialRequests有相似之处，它俩都是用来限制拆分数量的，maxInitialRequests是用来限制入口的拆分数量而maxAsyncRequests是用来限制异步模块内部的并行最大请求数的，说白了你可以理解为是每个import()它里面的最大并行请求数量。

　　这其中要注意以下几点：

　　1、import()文件本身算一个请求

　　2、并不算js以外的公共资源请求比如css

　　3、如果同时有两个模块满足cacheGroup的规则要进行拆分，但是maxInitialRequests的值只能允许再拆分一个模块，那尺寸更大的模块会被拆分出来

　　我们还是通过一个例子来解释一下，我定义三个入口文件entry1.js、entry2.js和entry3，entry1.js里面动态加载page1.js

　　webpack的配置如下：

　　因为默认的maxAsyncRequests为5太大了，不方便测试，所以改为了3

![20200322153906.png](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/20200322153906.png)
　　entry1.js：


```
import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  let Page1 = null

  import(/* webpackChunkName: "page1" */'./routes/page1').then(comp => {
    Page1 = comp
  })

  return (
    <div>
      <div>App</div>
      <Page1 />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```



　　entry2.js



```
import React from 'react'
import ReactDOM from 'react-dom'import $ from './assets/jquery'
const App = () => {
  console.log($)
  return (
    <div>
      <div>entry2</div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```



　　entry3.js



```
import React from 'react'
import ReactDOM from 'react-dom'
import OrgChart from './assets/orgchart'

const App = () => {
  return (
    <div>
      <div>App</div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```



　　page1.js



```
import React from 'react'
import _ from 'lodash'
import $ from '../assets/jquery'
import OrgChart from '../assets/orgchart'

const Page1 = () => {
  return (
    <div>
      <div>Page1</div>
    </div>
  )
}

export default Page1
```



　　打包结果：

![20200322154012.png](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/20200322154012.png)
　　让我们分享一下打包结果，主要是看和page1有关的，因为page1是通过import()动态引入的

　　1、vendors~page1.chunkhash.chunk.js是page1里面引入的第三方库lodash，这个是根据cacheGroups进行拆分的，如果不明白可以去看我之前的文章[《理解webpack4.splitChunks之cacheGroups》](https://www.cnblogs.com/kwzm/p/10315080.html)

　　2、page1.chunkhash.chunk.js是page1.js文件本身，这个也没问题，如果不明白为啥import()的文件会被拆分可以去看我的第一篇文章[《理解webpack.splitChunks》](https://www.cnblogs.com/kwzm/p/10314438.html)[
](https://www.cnblogs.com/kwzm/p/10314438.html)

　　3、default~entry2~page1.chunkhash.js这个拆分的entry2和page1的共用文件jquery.js，这个是根据cacheGroups进行拆分的，如果不明白可以去看我之前的文章[《理解webpack4.splitChunks之cacheGroups》](https://www.cnblogs.com/kwzm/p/10315080.html)

　　那么page1这个异步模块的并发请求数正好是设置的最大值3，符合maxAsyncRequests

　　这里我们发现除了jquery.js之外page1.js和entry3.js还共同引入了orgchart.js文件，但是却没有被拆分出来，这就是因为maxAsyncRequests的限制，如果我们把值改为4呢？

　　改为4后进行打包，打包的结果如下：

![20200322154029.png](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/20200322154029.png)
![20200322154037.png](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/20200322154037.png)

　　我们发现orgchart.js被打包出来了，这个时候page1.js的最大请求数量也变成了4个。

 

　　注意： 这里有一个小问题，为啥是jquery.js被拆分了而不是orgchart.js？

　　仔细看文章的小伙伴应该会发现我在文章开头提到的需要注意的几个点中最后一点，在匹配maxAsyncRequests这个条件进行拆分的时候尺寸大的包会先被拆分

![20200322154100.png](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/20200322154100.png)

　　由上图我们知道jquery.js的尺寸远远大于orgchart.js的尺寸，所以它被先拆分了。

　　

　　PS：至于vendors~page1.chunkhash.chunk.js为啥没有把react拆出来可以去看我的最后一篇博客[《理解webpack之其余要点》](https://www.cnblogs.com/kwzm/p/10333554.html)



## [理解webpack4.splitChunks之其余要点](https://www.cnblogs.com/kwzm/p/10333554.html)

　　splitChunks除了之前文章提到的规则外，还有一些要点或是叫疑惑因为没有找到官方文档的明确说明，所以是通过我自己测试总结出来的，只代表我自己的测试结果，不一定正确。

- splitChunks.cacheGroup必须同时满足各个条件才能生效，这个之前我理解错误，我以为比如minSize或是minChunks等条件只要满足一条就可以拆分，但是实际上必须同时满足才行
- splitChunks的配置项都是作用于cacheGroup上的，如果将cacheGroup的默认两个分组vendor和default设置为false，则splitChunks就不会起作用
- minChunks、maxAsyncRequests、maxInitialRequests的值必须设置为大于等于1的数
- 当chunk没有名字时，通过splitChunks分出的模块的名字用id替代，当然你也可以通过name属性自定义
- 当父chunk和子chunk同时引入相同的module时，并不会将其分割出来而是删除掉子chunk里面共同的module，保留父chunk的module，这个是因为 optimization.removeAvaliableModules 默认是true
- 当两个cacheGroup.priority相同时，先定义的会先命中
- 除了js，splitChunks也适用于css

