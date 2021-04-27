# SQL語法之DDL和DML

[數據庫技術](https://www.itread01.com/infolist/數據庫技術/1/) · 發表 2018-10-25

sel ble tro har -c primary rom 多個 constrain



SQL語法之DDL和DML
**DDL數據庫定義語言**
　　　　create 創建
　　　　alter 修改
　　　　drop 刪除
　　　　　　drop和delete的區別
　　　　truncate
　　**DML 數據操作語言**
　　　　insert 插入數據
　　　　update 修改已有數據
　　　　delete from刪除表中數據
　　**數據庫約束**
　　　　空值與非空
　　　　primary key
　　　　auto_increment
　　　　unique
　　　　foreign key
　　　　　　級聯刪除
　　　　default
　　**索引**
\---------------------

## DDL(數據庫定義語言)

操作表結構

### create (創建)

創建表

```
create table [if not exists] 表名(
    列名 列類型,
    列名 列類型,
    ...
);
```

創建表並從其他表中復制數據

```
create table 表名
as
select * from 表名
```

### alter (修改)

添加列定義 (列名必須是原表中不存在的)

```
alter table 表名 add(
    列名 數據類型 ,
    ...
);
```

修改列定義 (列名必須是原表中存在的)

```
alter table 表名 modify 列名 數據類型;
```

MySQL中 一次只能修改一個列定義

如果修改數據列的默認值,只會對以後插入操作有作用,對以前已經存在的數據不會有任何影響

刪除列

```
alter table 表名 drop 列名;
```

重命名數據表

```
alter table 舊表名 rename to/as 新表名;
```

改列名

```
alter table 表名 change 舊列名 新列名 type;
```

改列名並修改數據類型

```
alter table 表名 change 舊表名 新表名 type [default expr] [first | after 列名];
修改數據庫成utf8的. 
mysql> alter database 數據庫名 character set utf8;
修改表默認用utf8. 
mysql> alter table 表名 character set utf8;
修改字段用utf8 
mysql> alter table 表名 modify type_name varchar(50) CHARACTER SET utf8;
```

### drop (刪除)

-刪除表

```
drop table 表名
```

1. 表結構被刪除,表對象不再存在
2. 表裏的數據也被刪除
3. 該表的所有相關索引,約束也被

#### drop和delete的區別

- - drop只是針對表結構
    `drop table 表名;`
    從數據庫中刪除這張表
  - delete針對表數據
    `delete table 表名;`
    清空這張表中的所有數據

### truncate

```
truncate 表名;
```

刪除表中的全部數據,但保留表數據.
相對於delete而言,速度更快,
不能像delete能刪除指定的記錄,truncate只能一次性刪除整個表中的全部記錄　　

------

------

## DML (數據操作語言)

操作數據表中的數據

### insert (插入數據)

- 按列的地理順序插入

```
insert into students values(
    1,‘張三‘,‘男‘,25,‘123467890‘
);
```

- 當只需要插入部分數據,或者不按照順序插入

```
insert into students (name,sex,age) values(‘田七‘,‘男‘,30);
```

- 從其他表中一次插入多條數據

```
inster into 表名 (列名1,列名2,...)
select 列名 from 表名; 
```

要求選擇出來的數據列和插入目的地的數據列個數相同,類型匹配.
MySQL提供了一種擴展語句,可以一次插入多條語句　　

```
insert into students values
    (1,‘張三‘,‘男‘,25,‘123467890‘),
    (2,‘李四‘,‘男‘,22,‘0987654321‘),
    (3,‘王五‘,‘男‘,20,‘0984324321‘),
    (4,‘趙六‘,‘男‘,29,‘0944654321‘);
```

### update (修改已有數據)

upadte用於修改數據表的記錄,每次可以修改多條記錄.通過使用`where`子句限定修改哪些記錄.
`where`類似於Java中的`if`,只有符合條件的記錄才會被修改,沒有`where`限定的值總是為`true`,
表示該表的的所有記錄都會被修改

```
update 表名 set 
列名1=值1,
列名2=值2,
...
[where 條件];
```

### delete from(刪除表中數據)

`delete from` 語句用於刪除指定數據表記錄,使用`delete from`時不需要指定列名,因為總是整行的刪除.

```
delete from 表名 [where 條件];
```

使用`where`指定刪除滿足條件的記錄,不使用`where`時刪除全部記錄　　

------


**數據庫約束**
通過約束可以更好的保證數據表中數據的完整性.
約束是在表上強制執行的數據校驗規則.
當表中數據存在相互依賴性時,可以保護相關的數據不被錯誤的刪除.
約束分為表級約束和列級約束
約束類型包括 :

- not null (非空約束);
- primary key (主鍵約束);
- unique key (唯一約束);
- default (默認約束);
- foreign key (外鍵約束);
- check (檢查) mysql中不支持

### 空值與非空

- NULL ,字段值可以為空
- NOT NULL,字段值不允許為空
- 創建表的時候添加約束

　

```
create table tb(
    username varchar(20) not null,
    age tinyint unsigned null   
);
```

- 表創建好之後增加刪除非空約束

　

```
--增加非空約束
alter table tb
modify age tinyint unsigned not null;
--刪除非空約束
alter table tb 
modify username carchar(20) null;
--取消非空約束並制定默認值
alter tabel tb 
modify age tinyint unsigned null default 90;
```

### primary key

- 主鍵約束相當於非空約束和唯一約束,即不能出現重復值,也不允許出現null值
- 每張數據表只能存在一個主鍵
- 主鍵保證記錄的唯一性
- 主鍵自動為`not null`
- 創建表時使用列級約束語法

```
create table primary_test(
    --創建主鍵約束
    test_id int primary key,
    test_name varchar(255)
)
```

- 創建表時使用表級約束語法

　

```
create table primary_tset2(
    test_id not null,
    test_name varchar(255),
    test_pass carchar(255),
    --指定主鍵約束名為test2_pk,對大部分數據庫有效,但對mysql無效,
    --mysql數據庫中該主鍵約束名依然是PRI
    constraint test2_pk primary key(test_id)
);
```

- 創建表時建立組合主鍵約束

```
create table primary_test3(
    test_name varchar(255),
    test_pass varchar(255),
    primary key(test_name,test_pass)
);
```

- 表被創建好之後添加主鍵約束

```
--使用add關鍵字
alter table primary_tset3
add primary key(test_name,test_pass);
--使用modify關鍵字
--為單獨的列添加主鍵約束
alter table primary_test3
modify test_name varchar(255) primary key;
```

- 刪除數據表的主鍵約束

　

```
alter table primary_test3
drop primary key;
```

### auto_increment

- 自動編號,且必須和主鍵組合使用
- 默認情況下,起始值為1,每次的增量為1

```
create table tb2(
    id smallint unsigned auto_increment primary key,
    username varchar(20) not null
);
```

一旦指定了某列具有自增長特性,則向該表插入記錄的時候不可為該列指定值,
該列的值由數據庫系統自動生成　　

### unique

- 唯一約束保證了記錄的唯一性
- 唯一約束的字段可以為空
- 每張數據表可以存在多個唯一約束
- 建表時創建唯一約束 使用列級約束語法

```
create tabel unique_test(
    test_id int not null ,
    --建立唯一約束,test_name不能出現相同的值
    test_name varchar(255) unique
);
```

- 建表時使用表級約束為多列組合建立唯一約束

　

```
create table nuique_test2(
    test_id int not null,
    test_name varchar(255),
    test_pass varchar(255),
    --使用表級約束語法建立唯一約束
    unique (test_name),
    --使用表級約束語法建立唯一約束,並指定約束名
    constraint test2_nk unique (test_pass)
);
```

上面分別為name和pass建立唯一約束,意味著這兩列都不能出現重復值

- 建表時建立組合唯一約束

```
create table nuique_test3(
    test_id int not null,
    test_name varchar(255),
    test_pass vatchar(255),
    --使用表級約束語法建立唯一約束,指定兩列組合不能為空
    constraint test3_nk unique (test_name,test_pass)
);
```

　

上面的情況要求name和pass組合的值不能出現重復

- 表創建以後修改刪除唯一約束

```
-添加唯一約束
alter table unique_test3
add unique(test_name,test_pass);
--使用modify關鍵字為單列采用列級約束語法添加唯一約束
alter table student
modify test_name varchar(255) unique;
--刪除unique_tset3表上的test3_uk唯一約束
alter table unique_test3
drop index test3_uk;
```

foreign key

- 保證數據一致性,完整性
- 實現一對一或一對多關系
- 外鍵約束的要求
  - 　　父表和子表必須使用相同的存儲引擎,而且禁止使用臨時表;
  - 　　數據表的存儲引擎只能是InnoDB
  - 　　外鍵列和參照列必須具有相似的數據類型,其中數字的長度或者是有符號位必須相同;而字符的長度則可以不同
  - 　　外鍵列和參照列必須創建索引,如果外鍵列不存在索引,MySQL將自動創建索引

子表:有foreign key的表
父表:被參照的表



- 采用列級約束語法建立外鍵約束直接使用references關鍵字,references指定該列參照哪個主表,以及參照主表的哪一個列

　

```
-為了保證從表參照的主表存在,通常應該先建立主表
create table teacher_table1
(
    teacher_id int auto_increment,
    teacher_name carchar(255),
    primary key(teacher_id)
);
create table student_table1
(
    --為本表建立主鍵約束
    sutdent_id int auto_increment primary key,
    sutdent_name carchar(255),
    --指定java_teacher參照到teacher_table1的teahcer_id列
    java_teahcer int references teacher_table1 (teacher_id) 
);
```

上面這種方法在mysql中不會生效,僅僅是為了和標準的SQL保持良好的兼容性,
因此如果要使mysql中的外鍵約束生效,則必須使用表級約束語法　

　

- 表級約束語法

　

```
create table teacher_table
(
    teacher_id int auto_increment,
    teacher_name varchar(255),
    primary key(teacher_id)
);
create table student_table
(
    student_id int auto_increment primary key,
    student_name varchar(255),
    java_teacher int,
    foreign key(java_teacher) references teacher_table(teacher_id)
);
！
```

以上這種方法沒有指定約束名,mysql則會為該外鍵約束名命名為table_name_ibfk_n,其中table_name時從表的表名,而n時從1開始的整數

建立多列組合的外鍵約束

```
foreign key(列名1,列名2,...) references 引用的表名(引用的列名1,引用的列名2,...)
```

- 表級約束語法,並指定外鍵約束名

　

```
create table teacher_table
(
    teacher_id int auto_increment,
    teacher_name varchar(255),
    primary key(teacher_id)
);
create table student_table
(
    student_id int auto_increment primary key,
    student_name varchar(255),
    java_teacher int,
    constraint student_teacher_fk foreign key(java_teacher) references teacher_table(teacher_id)
);
```

- 添加外鍵約束

```
alter table 表名 
add foreign key(列名1[,列名2,...]) 
references 引用的表名(引用的列名1[,引用的列名2,...]);
```

- 刪除外鍵約束語法

　

```
alter table 表名
drop foreign key 約束名;
```

**級聯刪除**
如果想定義刪除主表記錄時,從表記錄也被刪除,則需要在建立外鍵約束後添加
on delete cascade 或者 on delete set null

第一種是刪除主表記錄時,把參照該主表記錄的從表記錄全部級聯刪除
第二種是指定當刪除主表記錄時,把參照該主表記錄的從表記錄的外鍵設置為null

**default**

- 默認值
- 當插入記錄時,如果沒有明確為字段賦值,則自動賦值為默認值

**索引**
索引總是從屬於數據表,但它也和數據表一樣屬於數據庫對象.
創建索引的唯一作用就是加快對表的查詢,索引通過四通快速路徑訪問方法來快速定位數據,
從而減少磁盤I/O.

**創建索引的兩種方式**
\- 自動:當在表上定義主鍵,唯一和外鍵約束時,系統自動為該數據列創建對應索引
\- 手動:通過create index..語句創建索引
**刪除索引的兩種方式**
\- 自動:數據表被刪除時,該表上的索引自動被刪除
\- 手動:通過`drop index..`語句刪除索引

- 創建索引

```
　create index index_name on table_name (列名1[,列名2,...]);　
```

- 刪除索引

```
drop index index_name
on 表名;
```

　在mysql數據庫中,以為只要求同一個表內索引不能同名,所以刪除索引時必須指定表名
而在例如Oracle數據庫中要求索引名必須不同,所以無須指定表名.　



SQL語法之DDL和DML