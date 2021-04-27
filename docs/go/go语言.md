## package,variablea,function
go程序由package组成
程序从main package中开始运行
通常，package的名字和引入路径的最后一个元素相同
import语法
```go
import (
	"fmt"
	"math"
)

import "fmt"
import "math"
```

[导出的值使用以大写字母开头](https://tour.golang.org/basics/3)
[函数参数类型后置](hhttps://blog.golang.org/gos-declaration-syntax)
参数省略
```go
package main

import "fmt"

func add(x, y int) int {
	return x + y
}

func main() {
	fmt.Println(add(42, 13))
}

```

多个返回值
```go

import "fmt"

func swap(x, y string) (string, string) {
	return y, x
}

func main() {
	a, b := swap("hello", "world")
	fmt.Println(a, b)
}
```

naked return
```go
package main

import "fmt"

func split(sum int) (x, y int) {
	x = sum * 4 / 9
	y = sum - x
	return
}

func main() {
	fmt.Println(split(17))
}
```
var变量列表，var可以是package或者function level
```go
package main

import "fmt"

var c, python, java bool

func main() {
	var i int
	fmt.Println(i, c, python, java)
}

```
Variables with initializers
```go
package main

import "fmt"

var i, j int = 1, 2 //  确定类型

func main() {
  var c, python, java = true, false, "no!" // omit type
	fmt.Println(i, j, c, python, java)
}
```
函数中的简单变量声明`:=`，变量外不能使用
```go
package main

import "fmt"

func main() {
	var i, j int = 1, 2
	k := 3
	c, python, java := true, false, "no!"

	fmt.Println(i, j, k, c, python, java)
}

```

基本类型
```t
bool

string

int  int8  int16  int32  int64
uint uint8 uint16 uint32 uint64 uintptr

byte // alias for uint8

rune // alias for int32
     // represents a Unicode code point

float32 float64

complex64 complex128
```

zero value 未初始化时默认值
0 for numeric types,
false for the boolean type, and
"" (the empty string) for strings.

类型转换，必须使用显式转换
The expression T(v) converts the value v to the type T.

Some numeric conversions:

var i int = 42
var f float64 = float64(i)
var u uint = uint(f)
Or, put more simply:

i := 42
f := float64(i)
u := uint(f)

常量 const，不能是使用:=


* [fmt](https://golang.org/pkg/fmt/) Package fmt implements formatted I/O with functions analogous(可比拟的) to C's printf and scanf.
* [math](https://golang.org/pkg/math/) Package math provides basic constants and mathematical functions.
  * [rath](https://golang.org/pkg/math/rand/) Package rand implements pseudo-random number generators.


## 流程控制 for,if else, switch, defer
只有一种循环结构， for, parenthesis省略, {}必须
* the init statement: executed before the first iteration, 作用域只在for语句中
* the condition expression: evaluated before every iteration
* the post statement: executed at the end of every iteration

省略
```go
package main

import "fmt"

func main() {
	sum := 1
	for ; sum < 1000; {
		sum += sum
	}
	fmt.Println(sum)
}

```

while的变体
```go
package main

import "fmt"

func main() {
	sum := 1
	for sum < 1000 {
		sum += sum
	}
	fmt.Println(sum)
}

```

死循环
```go
package main

import "fmt"

func main() {
	sum := 1
	for sum < 1000 {
		sum += sum
	}
	fmt.Println(sum)
}

```

if 和 for 相似 parentheses 省略, 但是 {} 必须
if 执行前, 可以设置初始化语句, 作用域制导 if 结束, 包括else

switch 同样由初始化语句, 作用域知道switch结束, 不需要break, 
no condition switch 
```go
package main

import (
	"fmt"
	"time"
)

func main() {
	t := time.Now()
	switch {
	case t.Hour() < 12:
		fmt.Println("Good morning!")
	case t.Hour() < 17:
		fmt.Println("Good afternoon.")
	default:
		fmt.Println("Good evening.")
	}
}

```

defer 参数立即求值, 但是延迟执行

Deferred function calls are pushed onto a stack. When a function returns, its deferred calls are executed in last-in-first-out order.

## More types: structs, slices, and maps
指针  holds the memory address of a value. go没有指针运算, 
&生成指向操作数的指针
*操作符表示指针的底层值

指针: 高级语言实现了指针的功能, 不需要显式的指针, 在c 和go的语言中, 我们需要显示的指针

struct是field的集合
```go
package main

import "fmt"

type Vertex struct {
	X int
	Y int
}

func main() {
	fmt.Println(Vertex{1, 2})
}

```

struct 使用. 来访问 struct field
```go
package main

import "fmt"

type Vertex struct {
	X int
	Y int
}

func main() {
	v := Vertex{1, 2}
	v.X = 4
	fmt.Println(v.X)
}

```

pointer to structs
```go
package main

import "fmt"

type Vertex struct {
	X int
	Y int
}

func main() {
	v := Vertex{1, 2}
	p := &v // structs 的指针
	p.X = 1e9 // 可以省略 * 
	fmt.Println(v)
}

```

struct leterals
```go
package main

import "fmt"

type Vertex struct {
	X, Y int
}

var (
	v1 = Vertex{1, 2}  // has type Vertex
	v2 = Vertex{X: 1}  // Y:0 is implicit
	v3 = Vertex{}      // X:0 and Y:0
	p  = &Vertex{1, 2} // has type *Vertex
)

func main() {
	fmt.Println(v1, p, v2, v3)
}

```


arrays 数组
声明数组 var a [10]int, 数组的长度是类型的一部分,所以数组不能重新定义大小
```go
package main

import "fmt"

func main() {
	var a [2]string
	a[0] = "Hello"
	a[1] = "World"
	fmt.Println(a[0], a[1])
	fmt.Println(a)

	primes := [6]int{2, 3, 5, 7, 11, 13}
	fmt.Println(primes)
}

```

slice 动态大小, 比数组更常见
a[low : high] 包含第一个元素, 但是不包含最后一个元素
slice 像是数组的引用, 改变slice的元素, 共享相同底层数组的其他片将看到这些更改, 数组也会发生变化
slice literals [3]bool{true, true, false}
```go
package main

import "fmt"

func main() {
	q := []int{2, 3, 5, 7, 11, 13}
	fmt.Println(q)

	r := []bool{true, false, true, true, false, true}
	fmt.Println(r)

	s := []struct {
		i int
		b bool
	}{
		{2, true},
		{3, false},
		{5, true},
		{7, true},
		{11, false},
		{13, true},
	}
	fmt.Println(s)
}

```
slice default 默认值
var a [10]int
以下的表达相等
```go
a[0:10]
a[:10]
a[0:]
a[:]
```

slice的长度和容量
The length of a slice is the number of elements it contains.

The capacity of a slice is the number of elements in the underlying array, counting from the first element in the slice.
```go
package main

import "fmt"

func main() {
	s := []int{2, 3, 5, 7, 11, 13}
	printSlice(s)

	// Slice the slice to give it zero length.
	s = s[:0]
	printSlice(s)

	// Extend its length.
	s = s[:4]
	printSlice(s)

	// Drop its first two values.
  s = s[2:] // 切片的第一个元素从2开始,所以cap(s)为4
	printSlice(s)
}

func printSlice(s []int) {
	fmt.Printf("len=%d cap=%d %v\n", len(s), cap(s), s)
}

```

nil zero of a slice
length capacity 为0


使用make初始化slice, 间接的动态数组
```go
package main

import "fmt"

func main() {
	a := make([]int, 5)
	printSlice("a", a)

	b := make([]int, 0, 5)
	printSlice("b", b)

	c := b[:2]
	printSlice("c", c)

	d := c[2:5]
	printSlice("d", d)
}

func printSlice(s string, x []int) {
	fmt.Printf("%s len=%d cap=%d %v\n",
		s, len(x), cap(x), x)
}

```


slice可以包含任何类型, 包含其他的slice
```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	// Create a tic-tac-toe board.
	board := [][]string{
		[]string{"_", "_", "_"},
		[]string{"_", "_", "_"},
		[]string{"_", "_", "_"},
	}

	// The players take turns.
	board[0][0] = "X"
	board[2][2] = "O"
	board[1][2] = "X"
	board[1][0] = "O"
	board[0][2] = "X"

	for i := 0; i < len(board); i++ {
		fmt.Printf("%s\n", strings.Join(board[i], " "))
	}
}

```

appending (附加) 到 slice, 如果s的背景数组太小，无法容纳所有给定的值，则会分配一个更大的数组。返回的切片将指向新分配的数组。
```go
package main

import "fmt"

func main() {
	var s []int
	printSlice(s)

	// append works on nil slices.
	s = append(s, 0)
	printSlice(s)

	// The slice grows as needed.
	s = append(s, 1)
	printSlice(s)

	// We can add more than one element at a time.
	s = append(s, 2, 3, 4)
	printSlice(s)
}

func printSlice(s []int) {
	fmt.Printf("len=%d cap=%d %v\n", len(s), cap(s), s)
}

```

range 
The range form of the for loop iterates over a slice or map.

When ranging over a slice, two values are returned for each iteration. The first is the index, and the second is a copy of the element at that index.
使用_省略返回值
```go
for i, _ := range pow
for _, value := range pow
for i := range pow
```

```go
package main

import "fmt"

var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}

func main() {
	for i, v := range pow {
		fmt.Printf("2**%d = %d\n", i, v)
	}
}

```


map
zero value of a map is nil, nil map没有键，也不能添加键。

map literal
```go
package main

import "fmt"

type Vertex struct {
	Lat, Long float64
}

var m = map[string]Vertex{
	"Bell Labs": Vertex{
		40.68433, -74.39967,
	},
	"Google": Vertex{
		37.42202, -122.08408,
	},
}

func main() {
	fmt.Println(m)
}

```
省略top-level type
```go
package main

import "fmt"

type Vertex struct {
	Lat, Long float64
}

var m = map[string]Vertex{
	"Bell Labs": {40.68433, -74.39967}, // 类型被省略
	"Google":    {37.42202, -122.08408},
}

func main() {
	fmt.Println(m)
}

```

改变maps的值
```go
package main

import "fmt"

func main() {
	m := make(map[string]int)

	m["Answer"] = 42 // 插入值
	fmt.Println("The value:", m["Answer"]) // 取值

	m["Answer"] = 48
	fmt.Println("The value:", m["Answer"])

	delete(m, "Answer")
	fmt.Println("The value:", m["Answer"])

	v, ok := m["Answer"] // 测试一个键是否存在使用一个双值赋值
	fmt.Println("The value:", v, "Present?", ok)
}

```
The value: 42
The value: 48
The value: 0
The value: 0 Present? false

函数也是值，能像其他值一样当成参数传递

函数闭包



## 方法和继承
定义类型的方法
```go
package main

import (
	"fmt"
	"math"
)

type Vertex struct {
	X, Y float64
}

func (v Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func main() {
	v := Vertex{3, 4}
	fmt.Println(v.Abs())
}

```

方法是一个具有receiver的方法
您只能使用与方法在同一包中定义类型的接收器来声明方法。您不能使用类型定义在另一个包(其中包括内置类型，如int)中的接收器来声明方法。

```go
package main

import (
	"fmt"
	"math"
)

type MyFloat float64

func (f MyFloat) Abs() float64 {
	if f < 0 {
		return float64(-f)
	}
	return float64(f)
}

func main() {
	f := MyFloat(-math.Sqrt2)
	fmt.Println(f.Abs())
}

```

指针receiver
引用类型和传引用是两个概念，Go中只有传值
复合类型与引用类型之间的区别，这应该也是值传递和引用传递的区别
Go语言中提供了对struct的支持,struct,中文翻译称为结构体，与数组一样，属于复合类型，并非引用类型。
```go
package main

import (
	"fmt"
	"math"
)

type Vertex struct {
	X, Y float64
}

func (v Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func (v *Vertex) Scale(f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}

func main() {
	v := Vertex{3, 4}
	v.Scale(10) // 自动转换  (&v).Scale(5)，function不会应用这种转换
	fmt.Println(v.Abs())
}

```

method 对比 指针receiver
```go
var v Vertex
ScaleFunc(v, 5)  // Compile error!
ScaleFunc(&v, 5) // OK

var v Vertex
v.Scale(5)  // OK
p := &v
p.Scale(10) // OK

```

相反也是可以的
```go
var v Vertex
fmt.Println(AbsFunc(v))  // OK
fmt.Println(AbsFunc(&v)) // Compile error!

var v Vertex
fmt.Println(v.Abs()) // OK
p := &v
fmt.Println(p.Abs()) // OK

```

## interface implicitly
```go
package main

import "fmt"

type I interface {
	M()
}

type T struct {
	S string
}

// This method means type T implements the interface I,
// but we don't need to explicitly declare that it does so.
func (t T) M() { // 接口继承
	fmt.Println(t.S)
}

func main() {
	var i I = T{"hello"}
	i.M()
}

```

## 接口 保留了一个值具体类型
```go
package main

import (
	"fmt"
	"math"
)

type I interface {
	M()
}

type T struct {
	S string
}

func (t *T) M() {
	fmt.Println(t.S)
}

type F float64

func (f F) M() {
	fmt.Println(f)
}

func main() {
	var i I

	i = &T{"Hello"}
	describe(i)
	i.M()

	i = F(math.Pi)
	describe(i)
	i.M()
}

func describe(i I) {
	fmt.Printf("(%v, %T)\n", i, i)
}

```
输出的值保留了具体的值
(&{Hello}, *main.T)
Hello
(3.141592653589793, main.F)
3.141592653589793

## interface的zero值
```go
package main

import "fmt"

type I interface {
	M()
}

type T struct {
	S string
}

func (t *T) M() {
	if t == nil {
		fmt.Println("<nil>")
		return
	}
	fmt.Println(t.S)
}

func main() {
	var i I
	
	var t *T
	
	i = t
	fmt.Printf("(%v, %T)\n", i, i)
	describe(i)
	i.M()

	i = &T{"hello"}
	describe(i)
	i.M()
}

func describe(i I) {
	fmt.Printf("(%v, %T)\n", i, i)
}

```

输出
(<nil>, *main.T)
(<nil>, *main.T)
<nil>
(&{hello}, *main.T)
hello

## Nil interface
nil接口值既不包含值也不包含具体类型。
在nil接口上调用方法是一个运行时错误，因为在接口元组中没有类型来指示调用哪个具体方法。


## 空接口
指定0方法的接口类型称为空接口:
接口{}
空接口可以包含任何类型的值。(每种类型至少实现了0个方法。)
空接口由处理未知类型值的代码使用。例如,fmt。Print接受接口{}类型的任意数量的参数。

```go
package main

import "fmt"

func main() {
	var i interface{}
	describe(i)

	i = 42
	describe(i)

	i = "hello"
	describe(i)
}

func describe(i interface{}) {
	fmt.Printf("(%v, %T)\n", i, i)
}

```

(<nil>, <nil>)
(42, int)
(hello, string)

## 类型断言 assertion
t: =我。(t)
该语句断言接口值i持有具体类型T，并将底层T值赋给变量T。
如果我不持有一个T，这个声明将会引发恐慌。
要测试接口值是否包含特定类型，类型断言可以返回两个值:基础值和一个布尔值，后者报告断言是否成功。
t, ok:= i.(t)
如果我持有一个T，那么T将是基础值，ok将为真。
如果不是，ok就是假的
> 请注意此语法与从地图中读取的语法之间的相似性。
```go
package main

import "fmt"

func main() {
	var i interface{} = "hello"

	s := i.(string)
	fmt.Println(s)

	s, ok := i.(string)
	fmt.Println(s, ok)

	f, ok := i.(float64)
	fmt.Println(f, ok)

	f = i.(float64) // panic
	fmt.Println(f)
}

```
hello
hello true
0 false
panic: interface conversion: interface {} is string, not float64

goroutine 1 [running]:
main.main()
	/tmp/sandbox377984392/prog.go:17 +0x220

## Type Swithes
```go
package main

import "fmt"

func do(i interface{}) {
	switch v := i.(type) {
	case int:
		fmt.Printf("Twice %v is %v\n", v, v*2)
	case string:
		fmt.Printf("%q is %v bytes long\n", v, len(v))
	default:
		fmt.Printf("I don't know about type %T!\n", v)
	}
}

func main() {
	do(21)
	do("hello")
	do(true)
}

```
Twice 21 is 42
"hello" is 5 bytes long
I don't know about type bool!

类型开关中的声明具有与类型断言i.(T)相同的语法，但特定类型T被关键字type替换。


## Stringer
One of the most ubiquitous(无处不在) interfaces is Stringer defined by the fmt package.
```go
type Stringer interface {
    String() string
}
```
使用
```go
package main

import "fmt"

type Person struct {
	Name string
	Age  int
}

func (p Person) String() string {
	return fmt.Sprintf("%v (%v years)", p.Name, p.Age)
}

func main() {
	a := Person{"Arthur Dent", 42}
	z := Person{"Zaphod Beeblebrox", 9001}
	fmt.Println(a, z)
}
```

Arthur Dent (42 years) Zaphod Beeblebrox (9001 years)

```go
package main

import "fmt"

type IPAddr [4]byte

// TODO: Add a "String() string" method to IPAddr.
func (addr IPAddr) String() string {
	return fmt.Sprintf("%d.%d.%d.%d", addr[0], addr[1], addr[2], addr[3])
}

func main() {
	hosts := map[string]IPAddr{
		"loopback":  {127, 0, 0, 1},
		"googleDNS": {8, 8, 8, 8},
	}
	for name, ip := range hosts {
		fmt.Printf("%v: %v\n", name, ip)
	}
}

```

loopback: 127.0.0.1
googleDNS: 8.8.8.8

## Error
和Stringer类似是`built-in`接口

```go
type error interface {
    Error() string
}

```
```go
package main

import (
	"fmt"
	"time"
)

type MyError struct {
	When time.Time
	What string
}

func (e *MyError) Error() string {
	return fmt.Sprintf("at %v, %s",
		e.When, e.What)
}

func run() error {
	return &MyError{
		time.Now(),
		"it didn't work",
	}
}

func main() {
	if err := run(); err != nil {
		fmt.Printf("%T", err)
		fmt.Println(err)
	}
}
```

## Reader
func (T) Read(b []byte) (n int, err error) // 返回值

```go
package main

import (
	"fmt"
	"io"
	"strings"
)

func main() {
	r := strings.NewReader("Hello, Reader!")

	b := make([]byte, 8)
	for {
		n, err := r.Read(b)
		fmt.Printf("n = %v err = %v b = %v\n", n, err, b)
		fmt.Printf("b[:n] = %q\n", b[:n])
		if err == io.EOF {
			break
		}
	}
}

```
输出
n = 8 err = <nil> b = [72 101 108 108 111 44 32 82]
b[:n] = "Hello, R"
n = 6 err = <nil> b = [101 97 100 101 114 33 32 82]
b[:n] = "eader!"
n = 0 err = EOF b = [101 97 100 101 114 33 32 82]
b[:n] = ""


## Images


## Goroutines
A goroutine is a lightweight thread managed by the Go runtime.

`go f(x, y, z)`
starts a new goroutine running

`f(x, y, z)`
The evaluation of `f, x, y`, and `z` happens in the current goroutine and the execution of `f` happens in the new goroutine.

Goroutines run in the same address space, so access to shared memory must be synchronized. The sync package provides useful primitives, although you won't need them much in Go as there are other primitives.

```go
package main

import (
	"fmt"
	"time"
)

func say(s string) {
	for i := 0; i < 5; i++ {
		time.Sleep(100 * time.Millisecond)
		fmt.Println(s)
	}
}

func main() {
	go say("world")
	say("hello")
}

```

## Channels
通道是一种有类型的管道，您可以通过它使用通道操作符发送和接收值

```go
package main

import "fmt"

func sum(s []int, c chan int) { // chan的类型是int
	sum := 0
	for _, v := range s {
		sum += v
	}
	c <- sum // send sum to c
}

func main() {
	s := []int{7, 2, 8, -9, 4, 0}

	c := make(chan int)
	go sum(s[:len(s)/2], c)
	go sum(s[len(s)/2:], c)
	x, y := <-c, <-c // receive from c

	fmt.Println(x, y, x+y)
}
```

## Buffered Channels
```go
package main

import "fmt"

func main() {
	ch := make(chan int, 1)
	ch <- 1
	ch <- 2
	fmt.Println(<-ch)
	fmt.Println(<-ch)
}
```
fatal error: all goroutines are asleep - deadlock!

```go
package main

import "fmt"

func main() {
	ch := make(chan int, 2)
	ch <- 1
	ch <- 2
	fmt.Println(<-ch)
	fmt.Println(<-ch)
}

```
1
2

## Range and Close
A sender can close a channel to indicate that no more values will be sent. Receivers can test whether a channel has been closed by assigning a second parameter to the receive expression: after

v, ok := <-ch
ok is false if there are no more values to receive and the channel is closed.

The loop for i := range c receives values from the channel repeatedly until it is closed.

Note: Only the sender should close a channel, never the receiver. Sending on a closed channel will cause a panic.

Another note: Channels aren't like files; you don't usually need to close them. Closing is only necessary when the receiver must be told there are no more values coming, such as to terminate a range loop.

```go
package main

import (
	"fmt"
)

func fibonacci(n int, c chan int) {
	x, y := 0, 1
	for i := 0; i < n; i++ {
		c <- x
		x, y = y, x+y
	}
	close(c)
}

func main() {
	c := make(chan int, 10)
	go fibonacci(cap(c), c)
	for i := range c {
		fmt.Println(i)
	}
}

```
0
1
1
2
3
5
8
13
21
34

## select
The select statement lets a goroutine wait on multiple communication operations.

A select blocks until one of its cases can run, then it executes that case. It chooses one at random if multiple are ready.

// 这个代码的执行顺序很奇怪
```go
package main

import "fmt"

func fibonacci(c, quit chan int) {
	x, y := 0, 1
	for {
		select {
		case c <- x:
			x, y = y, x+y
		case <-quit:
			fmt.Println("quit")
			return
		}
	}
}

func main() {
	c := make(chan int)
	quit := make(chan int)
	go func() {
		for i := 0; i < 10; i++ {
			fmt.Println(<-c)
		}
		quit <- 0
	}()
	fibonacci(c, quit)
}

```


## Default Selection
The default case in a select is run if no other case is ready.

Use a default case to try a send or receive without blocking:
```go
select {
case i := <-c:
    // use i
default:
    // receiving from c would block
}
```

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	tick := time.Tick(100 * time.Millisecond)
	boom := time.After(500 * time.Millisecond)
	for {
		select {
		case <-tick:
			fmt.Println("tick.")
		case <-boom:
			fmt.Println("BOOM!")
			return
		default:
			fmt.Println("    .")
			time.Sleep(50 * time.Millisecond)
		}
	}
}
```
    .
    .
tick.
    .
    .
tick.
    .
    .
tick.
    .
    .
tick.
    .
    .
tick.
BOOM!


## sync.Mutex
We've seen how channels are great for communication among goroutines.

But what if we don't need communication? What if we just want to make sure only one goroutine can access a variable at a time to avoid conflicts?

This concept is called mutual exclusion, and the conventional name for the data structure that provides it is mutex.

Go's standard library provides mutual exclusion with sync.Mutex and its two methods:

Lock
Unlock
We can define a block of code to be executed in mutual exclusion by surrounding it with a call to Lock and Unlock as shown on the Inc method.

We can also use defer to ensure the mutex will be unlocked as in the Value method.



```go
package main

import (
	"fmt"
	"sync"
	"time"
)

// SafeCounter is safe to use concurrently.
type SafeCounter struct {
	v   map[string]int
	mux sync.Mutex
}

// Inc increments the counter for the given key.
func (c *SafeCounter) Inc(key string) {
	c.mux.Lock()
	// Lock so only one goroutine at a time can access the map c.v.
	c.v[key]++
	c.mux.Unlock()
}

// Value returns the current value of the counter for the given key.
func (c *SafeCounter) Value(key string) int {
	c.mux.Lock()
	// Lock so only one goroutine at a time can access the map c.v.
	defer c.mux.Unlock()
	return c.v[key]
}

func main() {
	c := SafeCounter{v: make(map[string]int)}
	for i := 0; i < 1000; i++ {
		go c.Inc("somekey")
	}

	time.Sleep(time.Second)
	fmt.Println(c.Value("somekey"))
}
```

