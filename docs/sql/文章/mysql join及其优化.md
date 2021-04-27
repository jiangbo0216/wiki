[Mysql Join语法以及性能优化](https://www.cnblogs.com/blueoverflow/p/4714470.html)



**阅读目录(Content)**

- [引言](https://www.cnblogs.com/blueoverflow/p/4714470.html#_label0)

- [一．Join语法概述](https://www.cnblogs.com/blueoverflow/p/4714470.html#_label1)

- - [JOIN 功能分类](https://www.cnblogs.com/blueoverflow/p/4714470.html#_lab2_1_0)

- [二.Inner join](https://www.cnblogs.com/blueoverflow/p/4714470.html#_label2)

- [三.Left join](https://www.cnblogs.com/blueoverflow/p/4714470.html#_label3)

- [四.Right join](https://www.cnblogs.com/blueoverflow/p/4714470.html#_label4)

- [五.Cross join](https://www.cnblogs.com/blueoverflow/p/4714470.html#_label5)

- [六.Full join](https://www.cnblogs.com/blueoverflow/p/4714470.html#_label6)

- [七.性能优化](https://www.cnblogs.com/blueoverflow/p/4714470.html#_label7)

- - [1.显示(explicit) inner join VS 隐式(implicit) inner join](https://www.cnblogs.com/blueoverflow/p/4714470.html#_lab2_7_0)

  - [2.left join/right join VS inner join](https://www.cnblogs.com/blueoverflow/p/4714470.html#_lab2_7_1)

  - - [2.1 on与 where的执行顺序](https://www.cnblogs.com/blueoverflow/p/4714470.html#_label3_7_1_0)
    - [2.2 注意ON 子句和 WHERE 子句的不同](https://www.cnblogs.com/blueoverflow/p/4714470.html#_label3_7_1_1)
    - [2.3 尽量避免子查询，而用join](https://www.cnblogs.com/blueoverflow/p/4714470.html#_label3_7_1_2)

- [八.测试题(多表连接join查询)](https://www.cnblogs.com/blueoverflow/p/4714470.html#_label8)

- - [1. 题目](https://www.cnblogs.com/blueoverflow/p/4714470.html#_lab2_8_0)

  - - [1.1 班级表](https://www.cnblogs.com/blueoverflow/p/4714470.html#_label3_8_0_0)
    - [1.2 比赛表](https://www.cnblogs.com/blueoverflow/p/4714470.html#_label3_8_0_1)

  - [2. 详解](https://www.cnblogs.com/blueoverflow/p/4714470.html#_lab2_8_1)

  - - [2.1 分析](https://www.cnblogs.com/blueoverflow/p/4714470.html#_label3_8_1_0)
    - [2.2 结果](https://www.cnblogs.com/blueoverflow/p/4714470.html#_label3_8_1_1)

[回到顶部(go to top)](https://www.cnblogs.com/blueoverflow/p/4714470.html#_labelTop)

# 引言

　　**内外联结的区别**是**内联结**将**去除所有不符合条件**的记录，而**外联结**则**保留其中部分**。**外左联结**与**外右联结**的区别在于如果用**A左联结B**则**A中所有记录都会保留**在结果中，此时B中只有符合联结条件的记录，而右联结相反，这样也就不会混淆了。

 

![img](https://images0.cnblogs.com/blog2015/760403/201508/091828521433656.jpg)

[回到顶部(go to top)](https://www.cnblogs.com/blueoverflow/p/4714470.html#_labelTop)

# 一．Join语法概述

join 用于多表中字段之间的联系，语法如下：

代码如下:

```
FROM table1 INNER|LEFT|RIGHT JOIN table2 ON conditiona
```

table1:左表；table2:右表。

## JOIN 功能分类

**INNER JOIN（内连接,或等值连接）**：取得两个表中存在连接匹配关系的记录。

**LEFT JOIN（左连接）**：取得左表（table1）完全记录，即是右表（table2）并无对应匹配记录。

**RIGHT JOIN（右连接）**：与 LEFT JOIN 相反，取得右表（table2）完全记录，即是左表（table1）并无匹配对应记录。

注意：mysql不支持Full join,不过可以通过UNION 关键字来合并 LEFT JOIN 与 RIGHT JOIN来模拟FULL join.

接下来给出一个列子用于解释下面几种分类。如下两个表(A,B)

代码如下:

[![复制代码](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/copycode.gif)](javascript:void(0);)

```
mysql> select A.id,A.name,B.name from A,B where A.id=B.id;
+----+-----------+-------------+
| id | name | name |
+----+-----------+-------------+
| 1 | Pirate | Rutabaga |
| 2 | Monkey | Pirate |
| 3 | Ninja | Darth Vader |
| 4 | Spaghetti | Ninja |
+----+-----------+-------------+
4 rows in set (0.00 sec)
```

[![复制代码](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/copycode.gif)](javascript:void(0);)

[回到顶部(go to top)](https://www.cnblogs.com/blueoverflow/p/4714470.html#_labelTop)

# 二.Inner join

**内连接**，也叫**等值连接**，inner join产生**同时符合A和B**的一组数据。

代码如下:

[![复制代码](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/copycode.gif)](javascript:void(0);)

```
mysql> select * from A inner join B on A.name = B.name;
+----+--------+----+--------+
| id | name | id | name |
+----+--------+----+--------+
| 1 | Pirate | 2 | Pirate |
| 3 | Ninja | 4 | Ninja |
+----+--------+----+--------+
```

[![复制代码](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/copycode.gif)](javascript:void(0);)

![img](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/201452791529955.png)

[回到顶部(go to top)](https://www.cnblogs.com/blueoverflow/p/4714470.html#_labelTop)

# **三.Left join**

代码如下:

[![复制代码](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/copycode.gif)](javascript:void(0);)

```
mysql> select * from A left join B on A.name = B.name;
#或者：select * from A left outer join B on A.name = B.name;
+----+-----------+------+--------+
| id | name | id | name |
+----+-----------+------+--------+
| 1 | Pirate | 2 | Pirate |
| 2 | Monkey | NULL | NULL |
| 3 | Ninja | 4 | Ninja |
| 4 | Spaghetti | NULL | NULL |
+----+-----------+------+--------+
4 rows in set (0.00 sec)
```

[![复制代码](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/copycode.gif)](javascript:void(0);)

**left join,**（或left outer join:在Mysql中两者等价，推荐使用left join.）**左连接从左表(A)产生一套完整的记录,与匹配的记录(右表(B))** .如果没有匹配,右侧将包含null。

![img](http://files.jb51.net/file_images/article/201405/201452791556355.png?20144279168)

如果想只从左表(A)中产生一套记录，但不包含右表(B)的记录，可以通过设置where语句来执行，如下：

 代码如下:

[![复制代码](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/copycode.gif)](javascript:void(0);)

```
mysql> select * from A left join B on A.name=B.name where A.id is null or B.id is null;
+----+-----------+------+------+
| id | name | id | name |
+----+-----------+------+------+
| 2 | Monkey | NULL | NULL |
| 4 | Spaghetti | NULL | NULL |
+----+-----------+------+------+
2 rows in set (0.00 sec)
```

[![复制代码](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/copycode.gif)](javascript:void(0);)

![img](http://files.jb51.net/file_images/article/201405/201452791622237.png?201442791632)

同理，还可以模拟inner join. 如下：

 代码如下:

[![复制代码](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/copycode.gif)](javascript:void(0);)

```
mysql> select * from A left join B on A.name=B.name where A.id is not null and B.id is not null;
+----+--------+------+--------+
| id | name | id | name |
+----+--------+------+--------+
| 1 | Pirate | 2 | Pirate |
| 3 | Ninja | 4 | Ninja |
+----+--------+------+--------+
2 rows in set (0.00 sec)
```

[![复制代码](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/copycode.gif)](javascript:void(0);)

求差集：

根据上面的例子可以求差集，如下：

 代码如下:

[![复制代码](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/copycode.gif)](javascript:void(0);)

```
SELECT * FROM A LEFT JOIN B ON A.name = B.name
WHERE B.id IS NULL
union
SELECT * FROM A right JOIN B ON A.name = B.name
WHERE A.id IS NULL;
# 结果
+------+-----------+------+-------------+
| id | name | id | name |
+------+-----------+------+-------------+
| 2 | Monkey | NULL | NULL |
| 4 | Spaghetti | NULL | NULL |
| NULL | NULL | 1 | Rutabaga |
| NULL | NULL | 3 | Darth Vader |
+------+-----------+------+-------------+
```

[![复制代码](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/copycode.gif)](javascript:void(0);)

![img](http://files.jb51.net/file_images/article/201405/201452791648140.png?20144279173)

[回到顶部(go to top)](https://www.cnblogs.com/blueoverflow/p/4714470.html#_labelTop)

# 四.Right join

代码如下:

[![复制代码](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/copycode.gif)](javascript:void(0);)

```
mysql> select * from A right join B on A.name = B.name;
+------+--------+----+-------------+
| id | name | id | name |
+------+--------+----+-------------+
| NULL | NULL | 1 | Rutabaga |
| 1 | Pirate | 2 | Pirate |
| NULL | NULL | 3 | Darth Vader |
| 3 | Ninja | 4 | Ninja |
+------+--------+----+-------------+
4 rows in set (0.00 sec)
```

[![复制代码](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/copycode.gif)](javascript:void(0);)

同left join。

[回到顶部(go to top)](https://www.cnblogs.com/blueoverflow/p/4714470.html#_labelTop)

# 五.Cross join

**cross join**：交叉连接，得到的结果是**两个表的乘积**，即**笛卡尔积**

笛卡尔（Descartes）乘积又叫直积。假设集合A={a,b}，集合B={0,1,2}，则两个集合的笛卡尔积为{(a,0),(a,1),(a,2),(b,0),(b,1), (b,2)}。可以扩展到多个集合的情况。类似的例子有，如果A表示某学校学生的集合，B表示该学校所有课程的集合，则A与B的**笛卡尔积**表示**所有可能的选课情况**。

代码如下:

[![复制代码](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/copycode.gif)](javascript:void(0);)

```
mysql> select * from A cross join B;
+----+-----------+----+-------------+
| id | name | id | name |
+----+-----------+----+-------------+
| 1 | Pirate | 1 | Rutabaga |
| 2 | Monkey | 1 | Rutabaga |
| 3 | Ninja | 1 | Rutabaga |
| 4 | Spaghetti | 1 | Rutabaga |
| 1 | Pirate | 2 | Pirate |
| 2 | Monkey | 2 | Pirate |
| 3 | Ninja | 2 | Pirate |
| 4 | Spaghetti | 2 | Pirate |
| 1 | Pirate | 3 | Darth Vader |
| 2 | Monkey | 3 | Darth Vader |
| 3 | Ninja | 3 | Darth Vader |
| 4 | Spaghetti | 3 | Darth Vader |
| 1 | Pirate | 4 | Ninja |
| 2 | Monkey | 4 | Ninja |
| 3 | Ninja | 4 | Ninja |
| 4 | Spaghetti | 4 | Ninja |
+----+-----------+----+-------------+
16 rows in set (0.00 sec)
```

[![复制代码](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/copycode.gif)](javascript:void(0);)

```
#再执行：mysql> select * from A inner join B; 试一试

#在执行mysql> select * from A cross join B on A.name = B.name; 试一试
```

实际上，在 MySQL 中（**仅限于 MySQL**） **CROSS JOIN** 与 **INNER JOIN** 的表现是**一样的**，在不指定 ON 条件得到的结果都是笛卡尔积，反之取得两个表完全匹配的结果。 INNER JOIN 与 CROSS JOIN 可以省略 INNER 或 CROSS 关键字，因此下面的 SQL 效果是一样的：

代码如下:

```
... FROM table1 INNER JOIN table2
... FROM table1 CROSS JOIN table2
... FROM table1 JOIN table2
```

[回到顶部(go to top)](https://www.cnblogs.com/blueoverflow/p/4714470.html#_labelTop)

# 六.Full join

代码如下:

[![复制代码](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/copycode.gif)](javascript:void(0);)

```
mysql> select * from A left join B on B.name = A.name 
-> union 
-> select * from A right join B on B.name = A.name;
+------+-----------+------+-------------+
| id | name | id | name |
+------+-----------+------+-------------+
| 1 | Pirate | 2 | Pirate |
| 2 | Monkey | NULL | NULL |
| 3 | Ninja | 4 | Ninja |
| 4 | Spaghetti | NULL | NULL |
| NULL | NULL | 1 | Rutabaga |
| NULL | NULL | 3 | Darth Vader |
+------+-----------+------+-------------+
6 rows in set (0.00 sec)
```

[![复制代码](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/copycode.gif)](javascript:void(0);)

**全连接**产生的**所有记录（双方匹配记录）**在表A和表B。如果**没有匹配**,则对面**将包含null**。

![img](http://files.jb51.net/file_images/article/201405/201452791935716.png?201442791945)

[回到顶部(go to top)](https://www.cnblogs.com/blueoverflow/p/4714470.html#_labelTop)

# 七.性能优化

## 1.显示(explicit) inner join VS 隐式(implicit) inner join

如：

代码如下:

```
select * from
table a inner join table b
on a.id = b.id;
```

VS

代码如下:

```
select a.*, b.*
from table a, table b
where a.id = b.id;
```

我在数据库中比较(10w数据)得之，它们用时几乎相同，第一个是显示的inner join，后一个是隐式的inner join。

## 2.left join/right join VS inner join

**尽量用inner join.避免 LEFT JOIN 和 NULL.**

在使用left join（或right join）时，应该清楚的知道以下几点：

### 2.1 on与 where的执行顺序

ON 条件（“A LEFT JOIN B ON 条件表达式”中的ON）用来决定如何从 B 表中检索数据行。如果 B 表中没有任何一行数据匹配 ON 的条件,将会额外生成一行所有列为 NULL 的数据,在匹配阶段 WHERE 子句的条件都不会被使用。仅在**匹配阶段完成以后**，**WHERE 子句条件**才会被使用。**ON**将从**匹配阶段产生的数据**中**检索过滤**。

所以我们要注意：在使用Left (right) join的时候，一定要在先给出**尽可能多的匹配满足条件，减少Where的执行**。如：

PASS

代码如下:

```
select * from A
inner join B on B.name = A.name
left join C on C.name = B.name
left join D on D.id = C.id
where C.status>1 and D.status=1;
```

Great

代码如下:

```
select * from A
inner join B on B.name = A.name
left join C on C.name = B.name and C.status>1
left join D on D.id = C.id and D.status=1
```

从上面例子可以看出，**尽可能满足ON的条件**，而**少用Where的条件**。从执行性能来看第二个显然更加省时。

### 2.2 注意ON 子句和 WHERE 子句的不同

如作者举了一个列子：

代码如下:

[![复制代码](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/copycode.gif)](javascript:void(0);)

```
mysql> SELECT * FROM product LEFT JOIN product_details
ON (product.id = product_details.id)
AND product_details.id=2;
+----+--------+------+--------+-------+
| id | amount | id | weight | exist |
+----+--------+------+--------+-------+
| 1 | 100 | NULL | NULL | NULL |
| 2 | 200 | 2 | 22 | 0 |
| 3 | 300 | NULL | NULL | NULL |
| 4 | 400 | NULL | NULL | NULL |
+----+--------+------+--------+-------+
4 rows in set (0.00 sec)
 

mysql> SELECT * FROM product LEFT JOIN product_details
ON (product.id = product_details.id)
WHERE product_details.id=2;
+----+--------+----+--------+-------+
| id | amount | id | weight | exist |
+----+--------+----+--------+-------+
| 2 | 200 | 2 | 22 | 0 |
+----+--------+----+--------+-------+
1 row in set (0.01 sec)
```

[![复制代码](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/copycode.gif)](javascript:void(0);)

从上可知，第一条查询使用 ON 条件决定了从 LEFT JOIN的 product_details表中检索符合的所有数据行。第二条查询做了简单的LEFT JOIN，然后使用 WHERE 子句从 LEFT JOIN的数据中过滤掉不符合条件的数据行。

### 2.3 尽量避免子查询，而用join

往往性能这玩意儿，更多时候体现在数据量比较大的时候，此时，我们应该避免复杂的子查询。如下：

PASS

 代码如下:

```
insert into t1(a1) select b1 from t2 where not exists(select 1 from t1 where t1.id = t2.r_id);
```

Great

代码如下:

```
insert into t1(a1) 
select b1 from t2 
left join (select distinct t1.id from t1 ) t1 on t1.id = t2.r_id 
where t1.id is null;  
```

 