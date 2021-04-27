# [SQL结构化查询语-DDL语言](https://www.yisu.com/zixun/5927.html)

**一、SQL结构化查询语言概述**
SQL是[关系型数据库](https://www.yisu.com/mysql/)所使用的标准语言，最初是基于IBM的实现在1986年被批准的。1987年，“国际标准化组织(ISO)”把ANSI(美国国家标准化组织) SQL作为国际标准。
**1. SQL语言规范**

> 在数据库系统中，SQL语句关键词不区分大小写(建议用大写)
>
> - 数据库的资源对象是区分大小写的，如表、数据库这类资源在操作系统中以独立文件形来存储，如果文件系统对文件命名区分大小写则SQL语言内引用资源对象
> - 资源内的元素不区分大小写，如：表的字段名称不区分大小写，因为在操作系统中不是独立的文件。
>
> SQL语句可单行或多行书写，以“;”结尾。
> 关键词不能跨多行或简写。
> 用空格和缩进来提高语句的可读性（但并不强制）。
> 子句通常位于独立行，便于编辑，提高可读性（）。

**2. 注释：**

> | 注释类型 | 注释符号 | 说明                   | 标准                                     |
> | :------- | :------- | :--------------------- | :--------------------------------------- |
> | 单行注释 | --       | --与注释内容之间有空格 | SQL标准                                  |
> | 多行注释 | /*       | 多行内容被/*包裹       | SQL标准                                  |
> | 单行注释 | #        | 多行内容被#包裹        | [mysql](https://www.yisu.com/mysql/)标准 |

**3.SQL语言分类**

- \>DDL: Data Defination Language 数据定义语言
  CREATE，DROP，ALTER
- \>DML: Data Manipulation Language 数据操纵语言
  INSERT，DELETE，UPDATE
- \>DQL：Data Query Language 数据查询语言
  SELECT
- \>DCL：Data Control Language 数据控制语言
  GRANT，REVOKE，COMMIT，ROLLBACK

**4.SQL语言帮助**

- 登录SQL SEHLL中help加关键字即可查看帮助。

  > 例：[Mysql](https://www.yisu.com/mysql/)> HELP KEYWORD;

- 登录SQL SEHLL中输入help contents;可以查看按类查看帮助。

  > 例：按类查看帮助
  > MariaDB [hellodb]> help contents;
  > You asked for help about help category: "Contents"
  > For more information, type 'help <item>', where <item> is one of the following
  > categories:
  > Account Management
  > Administration
  > Compound Statements
  > Data Definition
  > Data Manipulation
  > Data Types
  > Functions
  > Functions and Modifiers for Use with GROUP BY
  > Geographic Features
  > Help Metadata
  > Language Structure
  > Plugins
  > Procedures
  > Table Maintenance
  > Transactions
  > User-Defined Functions
  > Utility

**5.数据库对象和命名**

- \>**数据库的组件(对象)：**
  **数据库、表、索引、视图**、用户、**存储过程、函数、触发器、事件调度器**等这些资源对象基本上在操作系统中有独立的文件存储。
- \>**命名规则：**
  必须以字母开头，可包括数字和三个特殊字符（# _ $）
  不要使用[MYSQL](https://www.yisu.com/mysql/)的保留字
  同一database(Schema)下的对象不能同名

**一、数据库管理操作：**
数据库的管理操作包括：创建、修改、删除、查看信息等操作

**1. 查看字符集**

> show character set;

**2. 查看数据库**

> SHOW DATABASES;查看都有哪些数据库，即查看数据库列表。
> SHOW DATABASES like 'vmlab';查看指定的数据库。
> SHOW CREATE DATABASE vmlab;查看创建数据库过程，可以快速查看数据库采用的字符集。

**3. 创建数据库**

> CREATE DATABASE vmlab; 用DBMS默认设置创建数据库
> CREATE DATABASE microcisco CHARACTER SET "utf8mb4" COLLATE 'utf8mb4_bin';指定字符集为“utf8mb4”字符集排序规则为“utf8mb4_bin”

**4. 修改数据库**

> ALTER DATABASE vmlab CHARCATER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci';
> 将vmlab数据库字符集修改为： 'utf8mb4' ，字符集的排序规则为：'utf8mb4_unicode_ci' 。
> **注意：**
> 修改数据库字符集只对后继新存储的数据有效，但对已有数据不生效，生产中除非必须否则不建议修改
> 设置[服务器](https://www.yisu.com/)默认的字符集，可以在配置文件vim /etc/my.cnf的[mysqld]选项部分指定字符集character-set-server=utf8mb4，这样以后所有创建的数据库都会继承字DBMS的字符集

**5. 删除数据库：**

> DROP DATABASE like 'microcisco';

**6. 基于SQL脚本创建数据库：**

> mysql < hellodb_innodb.sql -uroot -ppassword

**二、表管理操作**

注意：创建表之前一定要先指定在哪个数据库中创建。

**1. 查看表信息：**

> DESC students; //desc 指定表名即可查看表结构
> SHOW TABLES FROM mysql; //查看指定数据库中都有哪些表。
> SHOW COLUMNS FROM mysql.user; //查看指定表都有哪些字段，执行结果与desc相同。
> SHOW CREATE TABLE vmlab\G; //查看创建vmlab表时执行的命令，即表是如何创建的。可以参考该方法创建脚本文件。
> SHOW TABLE STATUS LIKE 'students'\G; //查看表状态信息，比较常用可以显示字符集、创建时间、更新时间、表引擎等信息。
> SHOW TABLE STATUS FROM mysql\G; //查看指定数据库的所有表状态。

**2. 创建表**

> 注意事项，表内字段修饰符NO NULL被指定后则在添加记录时该字段必须指定值。一般建议第一列ID为主键，且自动增长。
> **方法一：**直接创建 ()内指定字段名称，存储的数据类型，修饰符等信息，不同定段字定义以逗号分隔
> CREATE TABLE students (id int UNSIGNED AUTO_INCREMENT PRIMARY KEY,name VARCHAR(10) NOT NULL,age TINYINT UNSIGNED);
> **方法二：**通过查询现存表创建，新表会被直接插入查询而来的数据（注意：此方法复制表结构，但不会复制字段的修饰符信息，原表的数据会被复制。）
> CREATE TABLE vmlab SELECT * FROM students;从students表提取数据创建新表vmlab
>
> **方法三：**通过复制现存表的表结构，但不复制数据（注意：此方法复制表结构，但不会复制原表的数据。）
> CREATE TABLE vmlab LIKE students;参考现存表students创建新表vmlab。

**3. 删除表：**

> drop table vmlab;

**4. 修改表：**
修改表基本上都是针对列操作，生产环境基本上很少需要修改，必须字段意味着需求变更。对表的所有修改操作都需要使用ALTER TABLE 然后指定表名，再指定操作类型：添加操作用ADD、删除操作用DROP、更改操作用CHANGE，添加修改操作相当于重新字义字段，所以必须要指定数据类型。

> **表重命名：** ALTER TABLE vmlab RENAME vmlab1;
> **插入字段：**插入字段实际上就是新定义字段因此必须指定数据类型
> ALTER TABLE vmlab ADD phone CHAR(11) **AFTER** age; //在vmlab1表的age列后插入新列名为phone，数据类型为char 长度为11个字符。
> ALTER TABLE vmlab ADD ID int UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY **FIRST**; 在首列添加一列并定义为主键。
> ALTER TABLE vmlab ADD Gender ENUM('M','F','S'); //不指定位置则在表最后一列添加新的字段，ENUM为列表类型。
>
> **修改字段数据类型：**
> ALTER TABLE microcisco MODIFY phone int; //将microcisco表的phone字段数据类型修改为int型
> **字段改名：**
> ALTER TABLE vmlab CHANGE COLUMN phone mobile char(11); //将vmlab表中的phone字段改名为mobile，并将数据类型改为char类型，长度为11个字符。注意：字段改名必须指定改名后的字段数据类型。
> **删除字段：**
> ALTER TABLE vmlab DROP COLUMN phone; //删除vmlab表的phone字段。
> **修改表字符集：**
> ALTER TABLE vmlab CHARACTER SET utf8mb4; //修改vmlab表的字符集为utf8mb4。
> **修改字段数据类型：**
> ALTER TABLE vmlab CHANGE name name VARCHAR(20);
> **删除主键：**
> ALTER TABLE vmlab DROP PRIMARY KEY;
> **定义主键：**
> ALTER TABLE vmlab CHANGE id id int UNSIGNED NOT NULL PRIMARY KEY; //**注意：**定义主键相当于重新定义字段因