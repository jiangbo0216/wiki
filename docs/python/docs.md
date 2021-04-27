## [open(file, mode='r', buffering=-1, encoding=None, errors=None, newline=None, closefd=True, opener=None)](https://docs.python.org/3/library/functions.html?highlight=open#open)
Open file and return a corresponding [file object](https://docs.python.org/3/glossary.html#term-file-object). If the file cannot be opened, an OSError is raised.

```python
>>> import os
>>> dir_fd = os.open('somedir', os.O_RDONLY)
>>> def opener(path, flags):
...     return os.open(path, flags, dir_fd=dir_fd)
...
>>> with open('spamspam.txt', 'w', opener=opener) as f:
...     print('This will be written to somedir/spamspam.txt', file=f)
...
>>> os.close(dir_fd)  # don't leak a file descriptor
```

## for & [List Comprehensions](https://docs.python.org/3/tutorial/datastructures.html?highlight=comprehensions#list-comprehensions) & with
```python
>>> with open("requirements.txt") as data:
...     install_requires = [
...         line for line in data.read().split("\n")
...             if line and not line.startswith("#")
...     ]
...     print(install_requires) # 没有printf
... 
```
### List Comprehensions
List comprehensions provide a concise way to create lists. Common applications are to make new lists where each element is the result of some operations applied to each member of another sequence or iterable, or to create a subsequence of those elements that satisfy a certain condition.

摘要: 
* 列表推导提供了简明的创建列表的方式
* 除此之外，因为是Python内置的用法，底层使用C语言实现，相较于编写Python代码而言，运行速度更快。


For example, assume we want to create a list of squares, like:

```python
>>>
>>> squares = []
>>> for x in range(10):
...     squares.append(x**2)
...
>>> squares
[0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

```
Note that this creates (or overwrites) a variable named x that still exists after the loop completes. We can calculate the list of squares without any side effects using:

```python
squares = list(map(lambda x: x**2, range(10)))

```
or, equivalently:

```python
squares = [x**2 for x in range(10)]

```
which is more concise and readable.

