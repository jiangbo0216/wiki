1. 自顶向下分析算法
2. IO看清楚,在分析内部实现
3. 编译器前端: 源程序 -> 词法分析器 -> token -> 语法分析器(需要知道语言的语法规则) -> 抽象语法树 -> 语义分析器 -> 中间表示
4. 词法分析器一般会作为语法分析器的子模块
   

## 语法分析器自动生成
声明式规范(CFG 上下文无关文法) -> 语法分析器
手工: 递归下降分析算法

工具: ANTLR YACC bison SMLYACC CVP

### LL(1)分析算法
从左(L)向右读入程序,最左(L)推导,采用一个(1)前看符号
* 分析高效
* 错误定位和诊断信息准确
* 很多开源或商业生成工具

算法基本思想
* 表驱动的分析算法

### 架构
分析栈  分析表 语法 语法分析器自动生成器 词法分析器 token  语法分析器

### 自顶向下分析算法
语法分析: 给定文法 G 和句子 s ,回答 s 是否能从G推导出来

#### 基本思想
从 G 开始符号出发, 随意推导出某一个句子 t , 比较 t 和 s 

因为是从开始符号出发推出句子, 因此称为 自顶向下分析
* 对应于分析树自顶向下的构造顺序
**这里的序号很重要**
0: S -> N V N
1: N -> s
2:    | t
3:    | g
4:    | w
5: V -> e
6:    | d

```c
tokens[];  // all tokens
i = 0;
stack = [S]  // S 是开始符号
while(stack != [])
    if(stack[top] is a terminal t)
        if(t == tokens[i++])
            pop();
        else 
            backtrack();
    else if(stack[top] is a nonterminal T)
             pop();
             push(the next right hand side of T)       // 逆序压栈 对于上面的 CFG (Context Free Grammar), 第一次压入的是 底(N2  V N1)顶
```
改进: 
push(the next right hand side of T)   next -> correct (一种方案时使用一张表去索引正确的 非终结符 T 的推导, 一个维度是栈顶的非终结符, 另一个维度是输入的token), N 表示栈顶元素, 

N\T | s | t
---------|----------|---------
 S | 0 | 0
 N | 1 | 2
 V | 0 | 0


使用一个栈, 显示实现了一个非递归版本的递归下降分析算法, 非递归版本的树的遍历过程, 
问题:
需要用到回溯


## FIRST集
定义:
FIRST(N) = 从非终结符 N 开始推导得出的句子开头的所有可能的终结符集合

对 N -> a … 
FIRST(N) ∪= {a}

对N -> M … 
FIRST(N) ∪= FIRST(M)

## FIRST集用于构造LL(1)分析表(前看符号)

## FIRST_S
FIRST_S(β1 … βn) = FIRST(N),    
if β1 == N; {a},         
if β1 == a. // 在右侧产生式上标记这个FIRST_S集

## LL(1)分析表中的冲突(导致)
0: S -> N V N 
1: N -> s 
2:    | t 
3:    | g 
4:    | w 
5:    | w V 
6: V -> e 
7:    | d

冲突检测：
对N的两条产生式规则N->β和N->γ，要求 
FIRST_S( β) ∩ FIRST_S(γ) ={}

FIRST_S(w) ∩ FIRST_S(wV) = {w} 存在冲突

## 一般条件下的LL(1)分析表的构造
* 首先研究右侧的例子：
 
  * FIRST_S(X Y Z)?
 
    * 一般情况下需要知道某个非终结 符是否可以推出空串
 
    * NULLABLE
 
  * 并且一般需要知道在某个非终 结符后面跟着什么符号
 
    * 跟随集FOLLOW

Z -> d 
   | X Y Z 
Y -> c 
   | 
X -> Y 
   | a

### NULLABLE集合
* 归纳定义：
* 非终结符X属于集合NULLABLE，当且仅 当：
  * 基本情况：
    * X -> 
  * 归纳情况:
    * X -> Y1 … Yn
      * Y1, …, Yn 是n个非终结符，且都属于NULLABLE集

算法:
```c
NULLABLE = {};
while (NULLABLE is still changing)
    foreach (production p: X-> β) // 每次从头到尾扫描语法规则, 直到 NULLABLE 集合不再变化, 不动点算法
        if (β== ) 
            NULLABLE ∪= {X} 
        if (β== Y1 … Yn) 
            if (Y1 NULLABLE && … && Yn NULLABLE) 
                NULLABLE ∪= {X}
```

### FOLLOW集合
#### FOLLOW集的不动点算法
```c++
foreach(nonterminalN) 
    FOLLOW(N) = {}
while(someset is changing) 
    foreach(production p: N->β1 …βn)
        temp = FOLLOW(N) 
        foreach(βi from βn downto β1)  // 逆序！
            if (βi== a …) 
                temp = {a} 
            if (βi== M …) 
                FOLLOW(M) ∪= temp 
                if (M is not NULLABLE) 
                    temp = FIRST(M) 
                else temp ∪= FIRST(M)
```
## FIRST集合的完整计算公式
* 基于归纳的计算规则：
  * 基本情况：
    * X -> a
      * FIRST (X)  ∪=  {a}
  * 归纳情况：
    * X -> Y1 Y2 … Yn
      * FIRST (X)  ∪=  FIRST(Y1)
      * if Y1NULLABLE, FIRST (X) ∪=  FIRST(Y2)
      * if Y1,Y2 NULLABLE, FIRST(X) ∪=  FIRST(Y3) 
      * …

```c
foreach(nonterminalN) 
    FIRST(N) = {}
while(someset is changing) foreach(production p: N->β1 …βn)
    foreach(βi from β1 upto βn)
    if (βi== a …) 
        FIRST(N) ∪= {a} 
        break 
    if (βi== M …) 
        FIRST(N) ∪= FIRST(M) // FIRST(M) 这个是一个变量, 并不是一个函数递归调用
        if (M is not in NULLABLE) 
            break;
```

## FIRST_S 集合
```c++
foreach(production p) 
    FIRST_S(p) = {}

calculte_FIRST_S(production p: N->β1 …βn)
    foreach(βi from β1 to βn)
    if (βi== a …) 
        FIRST_S(p) ∪= {a} 
        return; 
    if (βi== M …) 
        FIRST_S(p) ∪= FIRST(M) 
        if (M is not NULLABLE) 
        return; 
    FIRST_S(p) ∪= FOLLOW(N)
```





