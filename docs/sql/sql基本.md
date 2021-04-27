# [sql基本](https://zhuanlan.zhihu.com/p/93768619)

CASE 表达式从SQL-92标准开始引入，不依赖具体数据库，提高SQL的代码的可移植性

## 视图

从SQL的角度来看，视图和表是相同的，两者的区别在于表中保存的是实际的数据，而视图中保存的是SELECT语句（视图本身并不存储数据）。

在使用视图时，视图会先运行其保存的SQL语句，从表里查找结果并生成一张**临时表**。

**创建视图：**

```sql
Create view 视图名称（视图的列名在这里定义）
As
Select 查询语句（select语句中列的排列顺序和视图中列的排列顺序相同）
```

**视图的用法：在from子句中使用视图名称代替表名称**

```sql
SELECT 性别,人数
FROM 按性别汇总;
```

**删除视图：**

方法一：在客户端中选中要删除的视图，右键并选择删除视图

方法二：用SQL语句删除

```sql
Drop  view 视图名称
```

**视图的优点：**

1. 可以将频繁使用的SQL语句保存成视图，以后使用的时候不用重新书写，从而提高效率
2. 视图中的数据会随原表的变化自动更新，保持数据的最新状态
3. 视图不保存数据，可以节省储存设备的容量

**使用视图的注意事项：**

1. 避免在视图的基础上再创建视图，多重视图会降低SQL运行性能
2. 通过汇总得到的视图无法进行更新

## **子查询**

子查询是一次性视图，在select语句执行完之后就会消失。

子查询将用来定义视图的select语句直接用在from子句后面，即在select查询语句中嵌套了另一个select查询语句。

**SQL运行顺序：先运行子查询，再运行子查询外面的语句。**

```sql
SELECT 性别,人数
FROM (
SELECT 性别,COUNT(*) AS 人数
FROM student
GROUP BY 性别) AS 按性别汇总
```

**子查询不仅可以放在from子句后面，也可以放在where子句后面，**具体是放在in，any（有任何一个满足就返回true），all（全部都满足才返回true）后面的括号里构成复杂的查询条件。

Any和all要与比较运算符使用。Any和some用法相同。

**any的用法**（哪些学生的成绩比课程号0002的全部成绩里的任意一个高）

```sql
SELECT 学号,成绩
FROM score
where 成绩> ANY(
SELECT 成绩
FROM score
WHERE 课程号='0002');
```

**all的用法**（哪些学生的成绩比课程号0002的全部成绩里的都高）

```sql
SELECT 学号,成绩
FROM score
WHERE 成绩>ALL(
SELECT 成绩
FROM score
WHERE 课程号='0002');
```

**偶尔使用的SQL查询语句可以使用子查询，不用保存为视图。**

**使用子查询的注意事项：**

1. 如果两个数值进行比较，比如all得到的是数据，不能写a>3*all(b)，正确的写法是a/3>all(b)
2. 避免使用多层嵌套子查询
3. 子查询的 as 和子查询名称可以省略，但是最好不要省略，养成良好的书写习惯，以便所有人能够看懂子查询语句的意思。

## 标量子查询

标量子查询必须且只能返回一行一列的结果。返回单一的值。所以可以和比较运算符一起使用。

**标量子查询的运用**

```sql
SELECT 学号,成绩
FROM score
WHERE 成绩>(SELECT AVG(成绩)
            FROM score);
```

成绩在差生平均成绩和优等生平均成绩之间的学生有哪些

```sql
SELECT 学号,成绩
FROM score
WHERE 成绩 BETWEEN
(SELECT AVG(成绩)
FROM score
WHERE 成绩<=60) AND
(SELECT AVG(成绩)
FROM score
WHERE 成绩>=80);
```

**标量子查询的书写位置不局限在where查询语句中，通常任何可以使用单一值的位置都可以使用**。能够使用常数或者列名的地方，无论是select子句、group by子句、having子句、order by子句，几乎所有的地方都可以使用。

**标量子查询用在select子句中**

查询学号、成绩和平均成绩

```sql
SELECT 学号,成绩,(SELECT AVG(成绩)
                  FROM score) AS '平均成绩'
FROM score;
```

**标量子查询用在having子句中**

查询成绩大于平均成绩的学生

```sql
SELECT 学号,课程号,成绩
FROM score
GROUP BY 课程号
HAVING AVG(成绩)>(SELECT AVG(成绩)
                  FROM score);
```

**什么时候用标量子查询：**

当我们需要单一值的时候。

**注意事项：**

不能返回多行结果。

## **关联子查询**

在细分的组内进行比较时，可以使用关联子查询。**关联子查询起关键作用的是子查询语句中的where子句。**

**关联子查询语句**

查找每个课程中大于对应课程平均成绩的学生

```sql
SELECT 学号,课程号,成绩
FROM score AS s1
WHERE 成绩>(SELECT AVG(成绩)
            FROM score AS s2
            WHERE s1.课程号=s2.课程号);
```

**关联子查询语句的执行顺序：**

1、先执行外层查询，查找出score表里所有的学号、课程号、成绩，结果如下：

```sql
SELECT 学号,课程号,成绩
FROM score AS s1
```

2、上图中的第一条结果进入子查询，因为子查询里通过where语句关联了两个表，子查询得出课程号0001的平均成绩80。

```sql
(SELECT AVG(成绩)
            FROM score AS s2
            WHERE 课程号=0001)
```

3、将子查询得出的结果80返回外层查询where语句中进行比较，得出执行结果。

```sql
SELECT 学号,课程号,成绩
FROM score AS s1
WHERE 学号=0001 AND 课程号=001 AND 成绩>80;
```

可以看出第一条记录不满足查询条件，查询结果中将不显示此条记录。

4、score表中后面的每行数据进行同样的执行顺序，得出最终结果。

**使用关联子查询的注意事项：**

1. 在上面的案例中，因为比较对象是同一张表score，因此为了进行区别，分别使用了s1和s2两个别名。在使用关联子查询时，需要在表所对应的列名之前加上表的别名，以<表名>.<列名>的形式记录
2. 子查询内部设定的关联名称，只能在子查询内部使用。（内部可以看到外部，外部看不到内部）。所以结合条件一定要写在子查询中。

**SQL中的函数包含汇总函数、算术函数、字符串函数、日期函数**，包含的具体函数见下图（在实际工作中，可以在使用函数时通过搜索引擎查找使用哪个函数，不用每个都记着）：

![20200818155038](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/20200818155038.png)

![20200818155047](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/20200818155047.png)

![20200818155056](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/20200818155056.png)

![20200818155106](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/20200818155106.png)

