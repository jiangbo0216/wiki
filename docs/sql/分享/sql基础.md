## 一、sql执行顺序

(1)from
(3) join
(2) on
(4) where
(5)group by(开始使用select中的别名，后面的语句中都可以使用)
(6) avg,sum....
(7)having
(8) select
(9) distinct

(10) order by
(11) limit

## sql语句分类

SQL语句可以分为以下四类：数据操作语言(DML)、数据定义语言(DDL)、事务控制语言(TCL)。

- [Data Definition Language (DDL) Statements](https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_1001.htm#i2099120)
- [Data Manipulation Language (DML) Statements](https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_1001.htm#i2099257)
- [Transaction Control Statements](https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_1001.htm#i2099286)
- [Session Control Statements](https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_1001.htm#i2099318)
- [System Control Statement](https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_1001.htm#i2099335)
- [Embedded SQL Statements](https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_1001.htm#i2099350)

- 数据操作语言(DML：Data Manipulation Language)

  由数据库管理系统(DBMS) 提供，用于让用户或程序员使用，实现对数据库中数据的操作。

  * CALL
  * DELETE
  * EXPLAIN PLAN
  * INSERT
  * LOCK TABLE
  * MERGE
  * SELECT
  * UPDATE

- 数据定义语言(DDL：Data Definition Language)

  用于定义SQL模式、基本表、视图和索引的创建和撤消操作。

  * ALTER ... (All statements beginning with ALTER)
  * ANALYZE
  * ASSOCIATE STATISTICS
  * AUDIT
  * COMMENT
  * CREATE ... (All statements beginning with CREATE)
  * DISASSOCIATE STATISTICS
  * DROP ... (All statements beginning with DROP)
  * FLASHBACK ... (All statements beginning with FLASHBACK)
  * GRANT
  * NOAUDIT
  * PURGE
  * RENAME
  * REVOKE
  * TRUNCATE

- 事务控制语言(TCL：Transaction Control Language)

  用于数据库的事务管理。

  * COMMIT
  * ROLLBACK
  * SAVEPOINT
  * SET TRANSACTION

以上信息主要参考Oracle官方文档，和某些站点上的定义可能略有不同。 例如：在某些站点的介绍中，SELECT并不属于DDL，而是将其归为一个特别的语言类——数据查询语言(DQL：Data Query Language)。 想要了解Oracle SQL语句分类的更多信息，你可以参考Oracle官方文档<https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_1001.htm>

## DDL语句

### 数据库管理

一、创建库
create database 【if not exists】 库名【 character set 字符集名】;

二、修改库
alter database 库名 character set 字符集名;
三、删除库
drop database 【if exists】 库名;

### 表管理

#### 一、创建表 ★

create table 【if not exists】 表名(
 字段名 字段类型 【约束】,
 字段名 字段类型 【约束】,
 。。。
 字段名 字段类型 【约束】

)

#### 二、修改表

1.添加列
alter table 表名 add column 列名 类型 【first|after 字段名】;
2.修改列的类型或约束
alter table 表名 modify column 列名 新类型 【新约束】;
3.修改列名
alter table 表名 change column 旧列名 新列名 类型;
4 .删除列
alter table 表名 drop column 列名;
5.修改表名
alter table 表名 rename 【to】 新表名;

### 三、删除表

drop table【if exists】 表名;

#### 四、复制表

1、复制表的结构
create table 表名 like 旧表 ;
2、复制表的结构+数据
create table 表名
select 查询列表 from 旧表【where 筛选】;

#### 数据类型

一、数值型
1、整型
tinyint、smallint、mediumint、int/integer、bigint
1         2        3          4            8

特点：
①都可以设置无符号和有符号，默认有符号，通过unsigned设置无符号
②如果超出了范围，会报out or range异常，插入临界值
③长度可以不指定，默认会有一个长度
长度代表显示的最大宽度，如果不够则左边用0填充，但需要搭配zerofill，并且默认变为无符号整型

2、浮点型
定点数：decimal(M,D)
浮点数:
 float(M,D)   4
 double(M,D)  8

特点：
①M代表整数部位+小数部位的个数，D代表小数部位
②如果超出范围，则报out or range异常，并且插入临界值
③M和D都可以省略，但对于定点数，M默认为10，D默认为0
④如果精度要求较高，则优先考虑使用定点数

二、字符型
char、varchar、binary、varbinary、enum、set、text、blob

char：固定长度的字符，写法为char(M)，最大长度不能超过M，其中M可以省略，默认为1
varchar：可变长度的字符，写法为varchar(M)，最大长度不能超过M，其中M不可以省略

三、日期型
year年
date日期
time时间
datetime 日期+时间          8
timestamp 日期+时间         4   比较容易受时区、语法模式、版本的影响，更能反映当前时区的真实时间

#### 约束

一、常见的约束
NOT NULL：非空，该字段的值必填
UNIQUE：唯一，该字段的值不可重复
DEFAULT：默认，该字段的值不用手动插入有默认值
CHECK：检查，mysql不支持
PRIMARY KEY：主键，该字段的值不可重复并且非空  unique+not null
FOREIGN KEY：外键，该字段的值引用了另外的表的字段

主键和唯一
1、区别：
①、一个表至多有一个主键，但可以有多个唯一
②、主键不允许为空，唯一可以为空
2、相同点
都具有唯一性
都支持组合键，但不推荐
外键：
1、用于限制两个表的关系，从表的字段值引用了主表的某字段值
2、外键列和主表的被引用列要求类型一致，意义一样，名称无要求
3、主表的被引用列要求是一个key（一般就是主键）
4、插入数据，先插入主表
删除数据，先删除从表
可以通过以下两种方式来删除主表的记录

1. 方式一：级联删除
ALTER TABLE stuinfo ADD CONSTRAINT fk_stu_major FOREIGN KEY(majorid) REFERENCES major(id) ON DELETE CASCADE;

2. 方式二：级联置空
ALTER TABLE stuinfo ADD CONSTRAINT fk_stu_major FOREIGN KEY(majorid) REFERENCES major(id) ON DELETE SET NULL;

二、创建表时添加约束
create table 表名(
 字段名 字段类型 not null,#非空
 字段名 字段类型 primary key,#主键
 字段名 字段类型 unique,#唯一
 字段名 字段类型 default 值,#默认
 constraint 约束名 foreign key(字段名) references 主表（被引用列）

)
注意：
   支持类型  可以起约束名
列级约束  除了外键  不可以
表级约束  除了非空和默认 可以，但对主键无效

列级约束可以在一个字段上追加多个，中间用空格隔开，没有顺序要求

三、修改表时添加或删除约束
1、非空
添加非空
alter table 表名 modify column 字段名 字段类型 not null;
删除非空
alter table 表名 modify column 字段名 字段类型 ;

2、默认
添加默认
alter table 表名 modify column 字段名 字段类型 default 值;
删除默认
alter table 表名 modify column 字段名 字段类型 ;
3、主键
添加主键
alter table 表名 add【 constraint 约束名】 primary key(字段名);
删除主键
alter table 表名 drop primary key;

4、唯一
添加唯一
alter table 表名 add【 constraint 约束名】 unique(字段名);
删除唯一
alter table 表名 drop index 索引名;
5、外键
添加外键
alter table 表名 add【 constraint 约束名】 foreign key(字段名) references 主表（被引用列）;
删除外键
alter table 表名 drop foreign key 约束名;

四、自增长列
特点：
1、不用手动插入值，可以自动提供序列值，默认从1开始，步长为1
auto_increment_increment
如果要更改起始值：手动插入值
如果要更改步长：更改系统变量
set auto_increment_increment=值;
2、一个表至多有一个自增长列
3、自增长列只能支持数值型
4、自增长列必须为一个key

一、创建表时设置自增长列
create table 表(
 字段名 字段类型 约束 auto_increment
)
二、修改表时设置自增长列
alter table 表 modify column 字段名 字段类型 约束 auto_increment
三、删除自增长列
alter table 表 modify column 字段名 字段类型 约束

## DML语句

### 插入

一、方式一
语法：
insert into 表名(字段名,...) values(值,...);
特点：
1、要求值的类型和字段的类型要一致或兼容
2、字段的个数和顺序不一定与原始表中的字段个数和顺序一致
但必须保证值和字段一一对应
3、假如表中有可以为null的字段，注意可以通过以下两种方式插入null值
①字段和值都省略
②字段写上，值使用null
4、字段和值的个数必须一致
5、字段名可以省略，默认所有列

二、方式二
语法：
insert into 表名 set 字段=值,字段=值,...;

两种方式 的区别：
1.方式一支持一次插入多行，语法如下：
insert into 表名【(字段名,..)】 values(值，..),(值，...),...;
2.方式一支持子查询，语法如下：
insert into 表名
查询语句;

### 修改

一、修改单表的记录 ★
语法：update 表名 set 字段=值,字段=值 【where 筛选条件】;

二、修改多表的记录【补充】
语法：
update 表1 别名
left|right|inner join 表2 别名
on 连接条件  
set 字段=值,字段=值
【where 筛选条件】;

### 删除

方式一：使用delete
一、删除单表的记录★
语法：delete from 表名 【where 筛选条件】【limit 条目数】
二、级联删除[补充]
语法：
delete 别名1,别名2 from 表1 别名
inner|left|right join 表2 别名
on 连接条件
 【where 筛选条件】

方式二：使用truncate
语法：truncate table 表名

两种方式的区别【面试题】★

1.truncate删除后，如果再插入，标识列从1开始
  delete删除后，如果再插入，标识列从断点开始
2.delete可以添加筛选条件
 truncate不可以添加筛选条件
3.truncate效率较高
4.truncate没有返回值
delete可以返回受影响的行数
5.truncate不可以回滚
delete可以回滚

### 查询

语法：
select 查询列表    ⑦
from 表1 别名       ①
连接类型 join 表2   ②
on 连接条件         ③
where 筛选          ④
group by 分组列表   ⑤
having 筛选         ⑥
order by排序列表    ⑧
limit 起始条目索引，条目数;  ⑨

## 分析sql执行计划

```sql
explain  QUERY PLAN select * from user_file where id='VMHttj1N6-7bm4xTeZcI9cOZA1' and trashed=0
```

<https://www.sqlite.org/eqp.html>

## 比较时间大小 datetime 函数
