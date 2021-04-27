mongoose操作数据库的时候，collection 的名字不好修改，开始开发之前一定要取一个准确的名字，便于后期的拓展

mongoose的schema或者说是model非常灵活，可以随意增加，或者减少，但是不能改变任何字段的类型。所以遇到新的需求的时候，我们想到的方法是增加一个新的字段来替代原来的字段。这个时候不可避免的会造成数据的不规整和失真

mongoose里面有三个概念，schemal、model、entity。先来对其三者做个小小的总结概括。
Schema ： 一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力
Model ： 由Schema发布生成的模型，具有抽象属性和行为的数据库操作对
Entity ： 由Model创建的实体，他的操作也会影响数据库

    Schema、Model、Entity的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
    你可以使用Model来创建Entity，Entity实体是一个特有Model具体对象，但是他并不具备Model的方法，只能用自己的方法。

### 关系型数据库（如MySQL）

所有的关系型数据库都是通过sql语言操作
所有关系型数据库在操作之前需要设计表结构
表结构支持约束：唯一的、主键、默认值、非空


### 非关系型数据库（如MongDB）

非关系型数据库类似key-value的键值对
MongoDB最像关系型数据库的非关系型数据库

数据库=》数据库
数据表=》集合（数组）
表记录=》文档(对象)

## mongoose 基本概念
* Schema: 相当于一个数据库的模板. Model可以通过mongoose.model 集成其基本属性内容. 当然也可以选择不继承.
* Model: 基本文档数据的父类,通过集成Schema定义的基本方法和属性得到相关的内容.
* instance: 这就是实实在在的数据了. 通过 new Model()初始化得到.


## 安装 Mongoose 和 MongoDB
npm i mongoose

## 链接MongoDB
```js
// 导入 mongoose 模块
const mongoose = require('mongoose');

// 设置默认 mongoose 连接
const mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB);
// 让 mongoose 使用全局 Promise 库
mongoose.Promise = global.Promise;
// 取得默认连接
const db = mongoose.connection;

// 将连接与错误事件绑定（以获得连接错误的提示）
db.on('error', console.error.bind(console, 'MongoDB 连接错误：'));
db.once('open', function() {
  // we're connected!
});
```

## 定义和添加模型
模型使用 Schema 接口进行定义。 Schema 可以定义每个文档中存储的字段，及字段的验证要求和默认值。还可以通过定义静态和实例辅助方法来更轻松地处理各种类型的数据，还可以像使用普通字段一样使用数据库中并不存在的虚拟属性（稍后讨论）。

后续增加 可以使用 Schema#add 方法.

mongoose.model() 方法将模式“编译”为模型。模型就可以用来查找、创建、更新和删除特定类型的对象。

### 定义模式
下面的代码片段中定义了一个简单的模式。首先 require() mongoose，然后使用 Schema 构造器创建一个新的模式实例，使用构造器的对象参数定义各个字段。

```js
// 获取 Mongoose
const mongoose = require('mongoose');

// 定义一个模式
var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({
    a_string: String,
    a_date: Date
});

```
上面示例只有两个字段（一个字符串和一个日期），接下来将展示其它字段类型、验证和其它方法。

## 创建模型
使用 mongoose.model() 方法从模式创建模型：

```js
// 定义模式
const Schema = mongoose.Schema;

const SomeModelSchema = new Schema({
    a_string: String,
    a_date: Date
});

// 使用模式“编译”模型
const SomeModel = mongoose.model('SomeModel', SomeModelSchema);
```
第一个参数是为模型所创建集合的别名（Mongoose 将为 SomeModel 模型创建数据库集合），第二个参数是创建模型时使用的模式。

### 模式类型（字段）
模式可以包含任意数量的字段，每个字段代表 MongoDB 文档中的一段存储区域。下面是一个模式的示例，其中有许多常见字段类型和声明方式：
```js
const schema = new Schema(
{
  name: String,
  binary: Buffer,
  living: Boolean,
  updated: { type: Date, default: Date.now },
  age: { type: Number, min: 18, max: 65, required: true },
  mixed: Schema.Types.Mixed,
  _someId: Schema.Types.ObjectId,
  array: [],
  ofString: [String], // 其他类型也可使用数组
  nested: { stuff: { type: String, lowercase: true, trim: true } }
}, {})
```

其中的第二个参数 options, collection 用来声明collection的名字，var dataSchema = new Schema({..}, { collection: 'data' });

如果不传入collection参数，[Mongoose by default produces a collection name by passing the model name to the utils.toCollectionName method. This method pluralizes(使...复数化) the name. Set this option if you need a different name for your collection](https://mongoosejs.com/docs/guide.html#collection).

大多数 模式类型（ SchemaType，字段名之后的描述符）都是自解释的。除了：

* ObjectId：表示数据库中某一模型的特定实例。例如，一本书可能会使用它来表示其作者对象。它实际只包含指定对象的唯一 ID（_id） 。可以使用 populate() 方法在需要时提取相关信息。
* Mixed：任意模式类型。
* []：对象数组。以在此类模型上执行 JavaScript 数组操作（push、pop、unshift等）。上例中有一个没有指定类型的对象数组和一个 String 对象数组，数组中的对象可以是任意类型的。
代码还展示了声明字段的两种方法：

* 字段名和类型名作为键-值对（就像 name、binary 和 living）。
* 字段名后跟一个对象，在对象中定义 type 和字段的其它选项，可以是：
  * 默认值。
  * 内置验证器（例如最大/最小值）和自定义验证函数。
  * 该字段是否必需。
  * 是否将 String 字段自动转换为小写、大写，或截断两端空格（例如{ type: String, lowercase: true, trim: true })



### 验证
Mongoose 提供内置的和自定义的验证器，以及同步的和异步的验证器。你可以在所有情况下，指定可接受的范围或值，以及验证失败的错误消息。

* 所有 模式类型 都具有内置的 required 验证器。用于指定当前字段是否为保存文档所必需的。
* Number 有数值范围验证器 min 和 max。
* String 有：
  * enum：指定当前字段允许值的集合。
  * match：指定字符串必须匹配的正则表达式。
  * 字符串的最大长度 maxlength 和最小长度 minlength

### 虚拟属性
虚拟属性是可以获取和设置、但不会保存到 MongoDB 的文档属性。getter 可用于格式化或组合字段，而 setter 可用于将单个值分解为多个值从而便于存储。文档中的示例，从名字和姓氏字段构造（并解构）一个全名虚拟属性，这比每次在模板中使用全名更简单，更清晰。


### 方法和查询助手
模式支持 实例方法、静态方法 和 查询助手。实例方法和静态方法外表很相似，但有本质区别，实例方法针对特定记录，且可以访问当前对象。查询助手可用于扩展 Mongoose 的 链式查询 API（例如，在 find()、findOne() 和 findById() 方法外还可以添加一个 “byName” 查询）。

## 使用模型
就可以使用创建好的模式来创建模型。模型即数据库中可以搜索的一类文档，模型的实例即可以存取的单个文档。

### 创建和修改文档
* Model.create(data, callback))
如果是Entity，使用save方法，如果是Model，使用create方法
可以通过定义模型的实例并调用 save() 来创建记录。以下示例假定 SomeModel 是用现有模式创建的模型（只有一个字段 "name" ）：
```js

// 创建一个 SomeModel 模型的实例
const awesome_instance = new SomeModel({ name: '牛人' });

// 传递回调以保存这个新建的模型实例
awesome_instance.save( function (err) {
  if (err) {
    return handleError(err);
  } // 已保存
});

```

记录的创建（以及更新、删除和查询）操作是异步的，可以提供一个回调函数在操作完成时调用。由于 API 遵循错误参数优先的惯例，因此回调的第一个参数必为错误值（或 null）。如果 API 需要返回一些结果，则将结果作为第二个参数。

还可以使用 create()，在定义模型实例的同时将其保存。回调的第一个参数返回错误，第二个参数返回新建的模型实例。

```js
SomeModel.create(
  { name: '也是牛人' }, 
  function(err, awesome_instance) {
    if (err) {
      return handleError(err);
    } // 已保存
  }
);

```
每个模型都有一个相关的连接（使用 mongoose.model() 时将做为默认连接）。可以通过创建新连接并对其调用 .model()，从而在另一个数据库上创建文档。

可以使用“圆点”加字段名来访问、修改新记录中的字段。操作后必须调用 save() 或 update() 以将改动保存回数据库。

```js
// 使用圆点来访问模型的字段值
console.log(awesome_instance.name); // 控制台将显示 '也是牛人'

// 修改字段内容并调用 save() 以修改记录
awesome_instance.name = "酷毙了的牛人";
awesome_instance.save( function(err) {
   if (err) {
     return handleError(err);
   } // 已保存
});
```

### 搜索纪录
* model.find({}, callback); 参数1忽略,或为空对象则返回所有集合文档
* model.find({},field,callback); 过滤查询,参数2: {‘name’:1, ‘age’:0} 查询文档的返回结果包含name , field的值中,1为包括，0为不包括
* model.find({},null,{limit:20}); 过滤查询,参数3: 游标操作 limit限制返回结果数量为20个,如不足20个则返回所有.
* model.findOne({}, callback); 查询找到的第一个文档
* model.findById('obj._i', callback); 查询找到的第一个文档,同上. 但是只接 _id 的值查询


可以使用查询方法搜索记录，查询条件可列在 JSON 文档中。以下代码展示了如何在数据库中找到所有网球运动员，并返回运动员姓名和年龄字段。这里只指定了一个匹配字段（运动项目，sport），也可以添加更多条件，指定正则表达式，或去除所有条件以返回所有运动员。

```js
const Athlete = mongoose.model('Athlete', yourSchema);

// SELECT name, age FROM Athlete WHERE sport='Tennis'
Athlete.find(
  { 'sport': 'Tennis' },
  'name age',
  function (err, athletes) {
    if (err) {
      return handleError(err);
    } // 'athletes' 中保存一个符合条件的运动员的列表
  }
);

```
若像上述代码那样指定回调，则查询将立即执行。搜索完成后将调用回调。

注：Mongoose 中所有回调都使用 callback(error, result) 模式。如果查询时发生错误，则参数 error 将包含错误文档，result 为 null。如果查询成功，则 error为 null，查询结果将填充至 result 。

若未指定回调，则 API 将返回 Query 类型的变量。可以使用该查询对象来构建查询，随后使用 exec() 方法执行（使用回调）。

```js
// 寻找所有网球运动员
const query = Athlete.find({ 'sport': 'Tennis' });

// 查找 name, age 两个字段
query.select('name age');

// 只查找前 5 条记录
query.limit(5);

// 按年龄排序
query.sort({ age: -1 });

// 以后某个时间运行该查询
query.exec(function (err, athletes) {
  if (err) {
    return handleError(err);
  } // athletes 中保存网球运动员列表，按年龄排序，共 5 条记录
})

```
上面的查询条件定义在 find() 方法中。也可以使用 where() 函数来执行此操作，可以使用点运算符（.）将所有查询链接在一起。以下代码与上述的查询基本相同，还添加了年龄范围的附加条件。

```js
Athlete.
  find().
  where('sport').equals('Tennis').
  where('age').gt(17).lt(50).  // 附加 WHERE 查询
  limit(5).
  sort({ age: -1 }).
  select('name age').
  exec(callback); // 回调函数的名字是 callback

```
find() 方法会取得所有匹配记录，但通常你只想取得一个。以下方法可以查询单个记录：

findById()：用指定 id 查找文档（每个文档都有一个唯一 id）。
findOne()：查找与指定条件匹配的第一个文档。
findByIdAndRemove()、findByIdAndUpdate()、findOneAndRemove()、 findOneAndUpdate()：通过 id 或条件查找单个文档，并进行更新或删除。以上是更新和删除记录的便利函数。
注：还有一个 count() 方法，可获取匹配条件的项目的个数。在只期望获得记录的个数而不想获取实际的记录时可以使用。

```js
//根据id值查询数据
User.findById('5ca3894ee78a732a245e3bb8', function (err, ret) {
  if (err) {
    console.log('查询失败')
  } else {
    console.log(ret)
  }
})

```

查询还能做更多。请参阅 查询（Mongoose 英文文档）。

### 更新
* Model.update(conditions, data, [options], [callback])

### 删除
* Model.remove(conditions,callback);

### 文档间协同 —— population (人口的意思)
可以使用 ObjectId 模式字段来创建两个文档/模型实例间一对一的引用，（一组 ObjectIds 可创建一对多的引用）。该字段存储相关模型的 id。如果需要相关文档的实际内容，可以在查询中使用 populate() 方法，将 id 替换为实际数据。

例如，以下模式定义了作者和简介。每个作者可以有多条简介，我们将其表示为一个 ObjectId 数组。每条简介只对应一个作者。“ref”（黑体字）告知模式分配哪个模型给该字段。

```js
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const authorSchema = Schema({
  name    : String,
  stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

const storySchema = Schema({
  author : { type: Schema.Types.ObjectId, ref: 'Author' },
  title  : String
});

const Story  = mongoose.model('Story', storySchema);
const Author = mongoose.model('Author', authorSchema);
```

可以通过分配 _id 值来保存对相关文档的引用。下面我们创建一个作者、一条简介，并将新简介的 author 字段设置为新建作者的 id。

```js
const wxm = new Author({ name: '司马迁' });

wxm.save(function (err) {
  if (err) {
    return handleError(err);
  }

  // 现在库中有了作者司马迁，我们来新建一条简介
  const story = new Story({
    title: "司马迁是历史学家",
    author: wxm._id    // author 设置为作者 司马迁 的 _id。ID 是自动创建的。
  });

  story.save(function (err) {
    if (err) {
      return handleError(err);
    }  // 司马迁有了一条简介
  });
});

```
现在简介文档通过作者文档的 ID 引用了作者。可使用 populate() 在简介中获取作者信息，如下所示。

```js
Story
  .findOne({ title: '司马迁是历史学家' }) 
  .populate('author') // 使用作者 id 填充实际作者信息
  .exec(function (err, story) {
    if (err) {
      return handleError(err);
    }
    console.log('作者是 %s', story.author.name);
    // 控制台将打印 "作者是 司马迁"
  });

```
注：目光敏锐的读者可能会注意到，新的简介添加了作者，但并没有添加到 stories 数组中。那么怎样才能得到指定作者的所有简介？考虑把作者添加到 stories 数组中，但会导致作者和简介相关信息的要在两处进行维护。

更好的方法是获取作者的 _id，然后使用 find() 在所有简介的作者字段中搜索。

```js
Story
  .find({ author : wxm._id }) // 可以根据更多的条件来查询数据
  .exec(function (err, stories) {
    if (err) {
      return handleError(err);
    } // 返回所有 author 字段的值为 司马迁id 的简介
  });
```

### 修改器和更新器
#### 更新修改器
$inc 增减修改器,只对数字有效.下面的实例: 找到 age=22的文档,修改文档的age值自增1

* Model.update({'age':22}, {'$inc':{'age':1} }  ); // 执行后: age=23
$set 指定一个键的值,这个键不存在就创建它.可以是任何MondoDB支持的类型.


* Model.update({'age':22}, {'$set':{'age':'haha'} }  ); // 执行后: age='haha'
$unset 同上取反,删除一个键

* Model.update({'age':22}, {'$unset':{'age':'haha'} }  ); //执行后: age键不存在`

#### 数组修改器
$push给一个键push一个数组成员,键不存在会创建


```js
Model.update({'age':22}, {'$push':{'array':10} } ); //执行后: 增加一个 array 键,类型为数组, 有一个成员 10`

```
$addToSet 向数组中添加一个元素,如果存在就不添加

```js
Model.update({'age':22}, {'$addToSet':{'array':10} } ); // 执行后: array中有10所以不会添加
```
$each 遍历数组, 和 $push 修改器配合可以插入多个值

```js
Model.update({'age':22}, {'$push':{'array':{'$each': [1,2,3,4,5]}} } ); //执行后: array : [10,1,2,3,4,5]

```
$pop 向数组中尾部删除一个元素


```js
Model.update({'age':22}, {'$pop':{'array':1} } ); //执行后: array : [10,1,2,3,4] tips: 将1改成-1可以删除数组首部元素

```

$pull 向数组中删除指定元素


```js
Model.update({'age':22}, {'$pull':{'array':10} } ); // 执行后: array : [1,2,3,4] 匹配到array中
```

### 条件查询
* $lt小于
* $lte 小于等于
* $gt 大于
* $gte 大于等于
* $ne 不等于


```js
Model.find({'age':{ '$get':18 , '$lte':30 } } ); //查询 age 大于等于18并小于等于30的文档

```

### 或查询 OR:
* $in 一个键对应多个值
* $nin 同上取反, 一个键不对应指定值
* $or 多个条件匹配, 可以嵌套 $in 使用
* $not 同上取反, 查询与特定模式不匹配的文档

```js
Model.find({'age':{ '$in':[20,21,22.'haha']} } ); //查询 age等于20或21或21或'haha'的文档
Model.find({'$or' :  [ {'age':18} , {'name':'xueyou'} ] }); //查询 age等于18 或 name等于'xueyou' 的文档
```


### 类型查询:
null 能匹配自身和不存在的值, 想要匹配键的值 为null, 就要通过 ‘$exists’ 条件判定键值已经存在 “$exists” (表示是否存在的意思)

```js
Model.find('age' :  { '$in' : [null] , 'exists' : true  } ); // 查询 age值为null的文档

Model.find({name:{$exists:true}},function(error,docs){
  //查询所有存在name属性的文档
});
Model.find({telephone:{$exists:false}},function(error,docs){
  //查询所有不存在telephone属性的文档
});
```

### 正则表达式:
MongoDb 使用 Prel兼容的正则表达式库来匹配正则表达式

```js
find( {'name' : /joe/i } );  //查询name为 joe 的文档, 并忽略大小写
find( {'name' : /joe?/i } ); //查询匹配各种大小写组合
```

### 查询数组:
* Model.find({'array':10} ); 查询 array(数组类型)键中有10的文档, array : [1,2,3,4,5,10] 会匹配到
* Model.find({'array[5]':10} ); 查询 array(数组类型)键中下标5对应的值是10, array : [1,2,3,4,5,10] 会匹配到
* $all 匹配数组中多个元素
* Model.find({'array':[5,10]} ); 查询 匹配array数组中 既有5又有10的文档
* $size 匹配数组长度
* Model.find({'array':{"$size" : 3} } ); 查询 匹配array数组长度为3 的文档
* $slice 查询子集合返回
* Model.find({'array':{"$skice" : 10} } ); 查询 匹配array数组的前10个元素
* Model.find({'array':{"$skice" : [5,10] } } ); 查询 匹配array数组的第5个到第10个元素

#### where
用它可以执行任意javacript语句作为查询的一部分,如果回调函数返回 true 文档就作为结果的一部分返回

```js
//where
//查询数据类型是字符串时，可支持正则
User.where('age', '2').exec(function(err, data){
    if (err) console.log(err);
    console.log(data);
});

User
    .where('age').gte(1).lte(10)
    .where('name', '张三')
    .exec(function(err, data){
      if (err) console.log(err);
      console.log(data);
    });
```

### 游标:
limit(3) 限制返回结果的数量,
skip(3) 跳过前3个文档,返回其余的
sort( {'username':1 , 'age':-1 } ) 排序 键对应文档的键名, 值代表排序方向, 1 升序, -1降序

### 其他
数量查询
```js
// //返回数量
User.count({age: 2}, function(err, data){
    if (err) console.log(err);
    console.log(data);
})
```

分页查询
```js
var User = require("./user.js");
function getByPager(){
    var pageSize = 5;                   //一页多少条
    var currentPage = 1;                //当前第几页
    var sort = {'logindate':-1};        //排序（按登录时间倒序）
    var condition = {};                 //条件
    var skipnum = (currentPage - 1) * pageSize;   //跳过数
    User.find(condition).skip(skipnum).limit(pageSize).sort(sort).exec(function (err, res) {
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}
getByPager();
```


### 自定义validate
```js
var personSchema = new Schema({
name:{
    type: String,
    validate:{
        validator: function(value){
            //只能以字母开头，只能包含英文数字下划线。
            return /^[a-zA-Z][a-zA-Z0-9_]*$/.test(value);
        },
        message: '{VALUE} is not a valid username. It must begin with a letter.'
    },
    required: [true, 'Username is required']
},
phone: {
    type: String,
    validate: {
    validator: function(v) {
        //11位电话号码
        return /\d{11}/.test(v);
        },
        message: '{VALUE} is not a valid phone number!'
    },
    required: [true, 'User phone number required']
},
gender:{
    type: String,
    enum: {
        //只能是男女
        values: ['female', 'male'],
        message: '{VALUE} is not a valid gender'
    },s
}
},{collection: 'person'})
var Person = mongoose.model('Person', personSchema);
//测试数据
var one = new Person({
    name: '123',
    phone:'11111',
    gender:' male'
})
```

## API

```ts
find(callback?: (err: any, res: T[]) => void): DocumentQuery<T[], T, QueryHelpers> & QueryHelpers;
find(conditions: any, callback?: (err: any, res: T[]) => void): DocumentQuery<T[], T, QueryHelpers> & QueryHelpers;
find(conditions: any, projection?: any | null,
  callback?: (err: any, res: T[]) => void): DocumentQuery<T[], T, QueryHelpers> & QueryHelpers;
find(conditions: any, projection?: any | null, options?: any | null,
  callback?: (err: any, res: T[]) => void): DocumentQuery<T[], T, QueryHelpers> & QueryHelpers;
```



[projection](https://mongoosejs.com/docs/api.html#query_Query-select)

Specifies which document fields to include or exclude (also known as the query "projection")

When using string syntax, prefixing a path with - will flag that path as excluded. When a path does not have the - prefix, it is included. Lastly, if a path is prefixed with +, it forces inclusion of the path, which is useful for paths excluded at the schema level.

A projection must be either inclusive or exclusive. In other words, you must either list the fields to include (which excludes all others), or list the fields to exclude (which implies all other fields are included). The _id field is the only exception because MongoDB includes it by default.

示例:
1. string '-__v'
2. 
指定要包含或排除哪些文档字段(也称为查询“投影”)
当使用字符串语法时，在路径前面加上-将把该路径标记为已排除。当一个路径没有-前缀时，它就会被包含进来。最后，如果路径的前缀是+，则强制包含路径，这对于模式级别上被排除的路径非常有用。
投影必须是包含或排除的。换句话说，您必须列出要包含的字段(这排除了所有其他字段)，或者列出要排除的字段(这意味着包含了所有其他字段)。_id字段是t
示例
```js
// include a and b, exclude other fields
query.select('a b');

// exclude c and d, include other fields
query.select('-c -d');

// Use `+` to override schema-level `select: false` without making the
// projection inclusive.
const schema = new Schema({
  foo: { type: String, select: false },
  bar: String
});
// ...
query.select('+foo'); // Override foo's `select: false` without excluding `bar`

// or you may use object notation, useful when
// you have keys already prefixed with a "-"
query.select({ a: 1, b: 1 });
query.select({ c: 0, d: 0 });
```

[option](https://mongoosejs.com/docs/api.html#query_Query-setOptions)
Options:
The following options are only for find():

* tailable
* sort
* limit
* skip
* maxscan
* batchSize
* comment
* snapshot
* readPreference
* hint
The following options are only for write operations: update(), updateOne(), updateMany(), replaceOne(), findOneAndUpdate(), and findByIdAndUpdate():

* upsert
* writeConcern
* timestamps: If timestamps is set in the schema, set this option to false to skip timestamps for that particular update. Has no effect if timestamps is not enabled in the schema options.
* omitUndefined: delete any properties whose value is undefined when casting an update. In other words, if this is set, Mongoose will delete baz from the update in Model.updateOne({}, { foo: 'bar', baz: undefined }) before sending the update to the server.
The following options are only for find(), findOne(), findById(), findOneAndUpdate(), and findByIdAndUpdate():

* lean
* populate
* projection
The following options are only for all operations except update(), updateOne(), updateMany(), remove(), deleteOne(), and deleteMany():

* maxTimeMS
The following options are for findOneAndUpdate() and findOneAndRemove()

* useFindAndModify
* rawResult
The following options are for all operations
* collation
* session
* explain

## 排序

```js
// Find First 10 News Items
News.find({
    deal_id:deal._id // Search Filters
},
['type','date_added'], // Columns to Return
{
    skip:0, // Starting Row
    limit:10, // Ending Row
    sort:{
        date_added: -1 //Sort by Date Added DESC
    }
},
function(err,allNews){
    socket.emit('news-load', allNews); // Do something with the array of 10 objects
})
```



## 实现id自增
IncrementId
```js
var mongoose = require('mongoose');

var Sequence = require('./sequence');

var pieceSchema = mongoose.Schema({

    id: { type : Number, index: { unique: true } },
    content: String,
    link: String,
    pics:[String] ,
    author: mongoose.Schema.ObjectId ,
    work: Boolean,
    updated: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now }
    
})

//在创建文档时，获取自增ID值
pieceSchema.pre('save', function(next) {
    var self = this;
    if( self.isNew ) {
        Sequence.increment('Piece',function (err, result) {
            if (err)
              throw err;
            self.id = result.value.next;
            next();
        });
    } else {
        next();
  }
})

var Piece = mongoose.model('Piece', pieceSchema);

module.exports = Piece
```

sequence
```js
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var models = {};
/**
  * 存储ID的序列值
  */
SequenceSchema = new Schema({
    _id: String,
    next: Number 
});

SequenceSchema.statics.findAndModify = function (query, sort, doc, options, callback) {
    return this.collection.findAndModify(query, sort, doc, options, callback);
};

SequenceSchema.statics.increment = function (schemaName, callback) {
    return this.collection.findAndModify({ _id: schemaName }, [], 
            { $inc: { next: 1 } }, {"new":true, upsert:true}, callback);
};

var Sequence = mongoose.model('Sequence', SequenceSchema);

module.exports = Sequence
```



# MongoDB逻辑操作符$or, $and,$not,$nor,$in

```
{ $or: [ { <expression1> }, { <expression2> }, ... , { <expressionN> } ] }
```

```
{ $and: [ { <expression1> }, { <expression2> } , ... , {<expressionN> } ] }
```



## 生成ObjectId

```js
var mongoose = require('mongoose');
var id = mongoose.Types.ObjectId();
```



## upsert

upsert 的名字也很有趣是个混合体：update+insert