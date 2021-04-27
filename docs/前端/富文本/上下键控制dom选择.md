# 富文本 上下键控制dom选中

对于富文本编辑器输入@的时候, 出现需要@的选项, 同时支持上下按键进行选择

增加一个hover样式

```css
.msg-chat-member__item.hover {
  background: var(--background);
}

```

```js
  // 声明当前选中的元素索引
  atIndex = 0

  blur () {
    this.sel = window.getSelection()
    this.range = this.sel.getRangeAt(0)
    // this.range = document.createRange()
    // this.range.deleteContents()
    // window.getSelection().removeAllRanges()
  }


  showAt () {
    this.atIndex = 0
    this.$nextTick(() => {
      // this.$refs.inputBox?.blur()
      // 初始化, at选中0号元素
      this.$refs.selectMember.children[this.atIndex].classList.add('hover')
      // 记录当前的select 和 range信息
      this.blur()
    })
  }

  handleKeyDown (event) {
    switch (event.key) {
      case 'ArrowUp':
        this.selectAt(event.key)
        break
      case 'ArrowDown':
        this.selectAt(event.key)
        break
      default:
        break
    }
  }

  selectAt (key) {
    const childs = this.$refs.selectMember.children
    switch (key) {
      case 'ArrowUp':
        // eslint-disable-next-line no-case-declarations
        const idx = this.atIndex - 1
        childs[this.atIndex]?.classList.remove('hover')
        this.atIndex = idx < 0 ? 0 : idx
        childs[this.atIndex]?.classList.add('hover')
        break
      case 'ArrowDown':
        // eslint-disable-next-line no-case-declarations
        const idx1 = this.atIndex + 1
        childs[this.atIndex]?.classList.remove('hover')
        this.atIndex = idx1 < childs.length - 1 ? idx1 : childs.length - 1
        childs[this.atIndex]?.classList.add('hover')
        break

      default:
        break
    }
    childs[this.atIndex]?.scrollIntoView({
      block: 'nearest'
    })
  }
```

[scrollIntoView](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)

### [Parameters](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView#Parameters)

- `alignToTop` Optional

  Is a [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) value:If `true`, the top of the element will be aligned to the top of the visible area of the scrollable ancestor. Corresponds to `scrollIntoViewOptions: {block: "start", inline: "nearest"}`. This is the default value.If `false`, the bottom of the element will be aligned to the bottom of the visible area of the scrollable ancestor. Corresponds to `scrollIntoViewOptions: {block: "end", inline: "nearest"}`.

- `scrollIntoViewOptions` Optional

  Is an Object with the following properties:

  `behavior` OptionalDefines the transition animation. One of `auto` or `smooth`. Defaults to `auto`.`block` OptionalDefines vertical alignment. One of `start`, `center`, `end`, or `nearest`. Defaults to `start`.`inline` OptionalDefines horizontal alignment. One of `start`, `center`, `end`, or `nearest`. Defaults to `nearest`.

```js
element.scrollIntoView();
element.scrollIntoView(alignToTop); // Boolean parameter
element.scrollIntoView(scrollIntoViewOptions); // Object parameter
```

```html
<div
  @keydown.enter.exact.prevent="handleEnter"
  @keydown.up.prevent="handleKeyDown"
  @keydown.down.prevent="handleKeyDown"
>
<ul ref="selectMember">
  <li class="msg-chat-member__item" @click="at({type: 'all'})">
    <span class="msg-chat-member__character">@</span><span class="msg-chat-member__name">所有人</span>
  </li>
  <li class="msg-chat-member__item" v-for="item in groupMembers" :key="item.user_id" @click="at({user: item})">
    <td-avatar :src="item.avatar_url" />
    <span class="msg-chat-member__name" :style="`${!isCreator && 'color: inherit'}`">{{ item.nickname }}</span>
  </li>
</ul>
</div>
```

## [扩展(input限定输入数字, 上下键选择增加input数字)](https://codepen.io/mharis/pen/kzcfv)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .quantity::-webkit-inner-spin-button, 
    .quantity::-webkit-outer-spin-button { 
      -webkit-appearance: none; 
      margin: 0; 
    }
  </style>
</head>
<body>
  <input type="number" step="1" min="1" value="1" class="quantity" />
</body>
</html>
```
