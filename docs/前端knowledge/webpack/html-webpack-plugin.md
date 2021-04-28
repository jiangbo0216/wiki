可以在html中插入js代码, 实现条件插入的功能

```js
    <% if ('production' !== process.env.NODE_ENV) { %>
      <script src="//cdnjs.cloudflare.com/ajax/libs/vConsole/3.2.0/vconsole.min.js"></script>
    <script type="text/javascript">
      var vConsole = new VConsole()
    </script>
    <% } %>
```