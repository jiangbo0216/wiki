



## Index expressions (下标表达式)

A primary expression of the form
形式的基本表达式

```go
a[x]
```

denotes the element of the array, pointer to array, slice, string or map a indexed by x. The value x is called the index or map key, respectively. The following rules apply:

数组，数组指针，slice， string， map下标为x的元素

If `a` is not a map:

- the index `x` must be of integer type or an untyped constant 整型或者是无类型常量
- a constant index must be non-negative and [representable](https://golang.org/ref/spec#Representability) by a value of type `int` 非负
- a constant index that is untyped is given type `int` 
- the index `x` is *in range* if `0 <= x < len(a)`, otherwise it is *out of range* 越界问题

For `a` of [array type](https://golang.org/ref/spec#Array_types) `A`:

- a [constant](https://golang.org/ref/spec#Constants) index must be in range
- if `x` is out of range at run time, a [run-time panic](https://golang.org/ref/spec#Run_time_panics) occurs 越界 panic 会出现
- `a[x]` is the array element at index `x` and the type of `a[x]` is the element type of `A`

For `a` of [pointer](https://golang.org/ref/spec#Pointer_types) to array type: 数组类型的指针

- `a[x]` is shorthand for `(*a)[x]`

For `a` of [slice type](https://golang.org/ref/spec#Slice_types) `S`:

- if `x` is out of range at run time, a [run-time panic](https://golang.org/ref/spec#Run_time_panics) occurs 越界问题
- `a[x]` is the slice element at index `x` and the type of `a[x]` is the element type of `S`

For `a` of [string type](https://golang.org/ref/spec#String_types):

- a [constant](https://golang.org/ref/spec#Constants) index must be in range if the string `a` is also constant
- if `x` is out of range at run time, a [run-time panic](https://golang.org/ref/spec#Run_time_panics) occurs
- `a[x]` is the non-constant byte value at index `x` and the type of `a[x]` is `byte`
- `a[x]` may not be assigned to

For `a` of [map type](https://golang.org/ref/spec#Map_types) `M`:

- `x`'s type must be [assignable](https://golang.org/ref/spec#Assignability) to the key type of `M`
- if the map contains an entry with key `x`, `a[x]` is the map element with key `x` and the type of `a[x]` is the element type of `M`
- if the map is `nil` or does not contain such an entry, `a[x]` is the [zero value](https://golang.org/ref/spec#The_zero_value) for the element type of `M`

Otherwise `a[x]` is illegal.

An index expression on a map `a` of type `map[K]V` used in an [assignment](https://golang.org/ref/spec#Assignments) or initialization of the special form

```
v, ok = a[x]
v, ok := a[x]
var v, ok = a[x]
```

yields an additional untyped boolean value. The value of `ok` is `true` if the key `x` is present in the map, and `false` otherwise.

产生一个额外的无类型布尔值。

Assigning to an element of a `nil` map causes a [run-time panic](https://golang.org/ref/spec#Run_time_panics).





### Map types

```go
/* 声明变量，默认 map 是 nil */
var map_variable map[key_data_type]value_data_type

/* 使用 make 函数 */
map_variable := make(map[key_data_type]value_data_type)

```

A map is an unordered group of elements of one type, called the element type, indexed by a set of unique *keys* of another type, called the key type. The value of an uninitialized map is `nil`.

```
MapType     = "map" "[" KeyType "]" ElementType .
KeyType     = Type .
```

The [comparison operators](https://golang.org/ref/spec#Comparison_operators) `==` and `!=` must be fully defined for operands of the key type; thus the key type must not be a function, map, or slice. If the key type is an interface type, these comparison operators must be defined for the dynamic key values; failure will cause a [run-time panic](https://golang.org/ref/spec#Run_time_panics).

key类型必须可以作为 == 和 != 的操作数

```
map[string]int
map[*T]struct{ x, y float64 }
map[string]interface{}
```

The number of map elements is called its length. For a map `m`, it can be discovered using the built-in function [`len`](https://golang.org/ref/spec#Length_and_capacity) and may change during execution. Elements may be added during execution using [assignments](https://golang.org/ref/spec#Assignments) and retrieved with [index expressions](https://golang.org/ref/spec#Index_expressions); they may be removed with the [`delete`](https://golang.org/ref/spec#Deletion_of_map_elements) built-in function.

A new, empty map value is made using the built-in function [`make`](https://golang.org/ref/spec#Making_slices_maps_and_channels), which takes the map type and an optional capacity hint as arguments:

```
make(map[string]int)
make(map[string]int, 100)
```

The initial capacity does not bound its size: maps grow to accommodate the number of items stored in them, with the exception of `nil` maps. A `nil` map is equivalent to an empty map except that no elements may be added.

