### 1. [本地存储概述](https://blog.csdn.net/weixin_44908855/article/details/109696777?spm=1001.2014.3001.5502)

1. 随着互联网的快速发展，基于网页的应用越来越普遍，同时也变的越来越复杂，为了满足各种各样的需求，会经常性在本地存储大量的数据，`HTML5`规范提出了相关的解决方案。

### 2. 本地存储特性

1. 数据存储在用户的浏览器中
2. 设置、读取非常方便，甚至页面刷新不会丢失数据
3. 容量较大，`sessionStorage`约5M、`localStorage`约20M
4. `sessionStorage`和`localStorage`是`window`的属性
5. 只能存储字符串，可以将对象`JSON.stringify()`编码后存储

### 3. 临时储存:`sessionStorage`

1. 它的生命周期为关闭浏览器窗口

2. 在同一个窗口（页面）下数据可以共享

3. 以键值对的形式存储使用

4. 存储数据：

   ```js
   sessionStorage.setItem(key, value)
   
   ```

5. 获取数据：

   ```js
   sessionStorage.getItem(key)
   
   ```

6. 删除数据：

   ```js
   sessionStorage.removeItem(key)
   
   ```

7. 清空数据：

   ```js
   sessionStorage.clear()
   
   ```

### 4. 永久存储：`localStorage`

1. 生命周期永久生效，除非手动删除，否则关闭页面也会存在

2. 可以多个窗口（页面）共享数据（同一个浏览器可以共享数据）

3. 以键值对的形式存储

4. 存储数据：

   ```js
   localStorage.setItem(key, value)
   
   ```

5. 获取数据：

   ```js
   localStorage.getItem(key)
   
   ```

6. 删除数据：

   ```js
   localStorage.removeItem(key)
   
   ```

7. 清空数据：

   ```js
   localStorage.clear()
   ```