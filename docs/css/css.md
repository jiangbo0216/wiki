## 鼠标形状
`cursor: pointer;`

## 两个css类有相同的样式写法
`.<className1>.<className2>`


## flex布局与absolute
```
<div class="xlx-signin__title">  使用flex容器水平垂直剧中
  <img class="xlx-sign__title-img" :src="titleImg" alt="" srcset="">
  <span class="xlx-signin__help">?</span> 使用absolute破坏水平文档流，但是仍然能保持垂直居中
</div>
```

## css模糊
`filter: blur(5px)`

## css动画 animation
`animation: slidein 3s ease-in 1s infinite reverse both running;`
名字 时间 函数 延迟（延时） 次数 方向 保持 状态  === 时间函数 的名字 叫做延迟 次数和方向保持不变
其中 `keyframes-name`可以前置也可以后置
```
<single-animation>#
where 
<single-animation> = <time> || <timing-function> || <time> || <single-animation-iteration-count> || <single-animation-direction> || <single-animation-fill-mode> || <single-animation-play-state> || [ none | <keyframes-name> ]

where 
<timing-function> = linear | <cubic-bezier-timing-function> | <step-timing-function>
<single-animation-iteration-count> = infinite | <number>
<single-animation-direction> = normal | reverse | alternate | alternate-reverse
<single-animation-fill-mode> = none | forwards | backwards | both
<single-animation-play-state> = running | paused
<keyframes-name> = <custom-ident> | <string>

where 
<cubic-bezier-timing-function> = ease | ease-in | ease-out | ease-in-out | cubic-bezier(<number>, <number>, <number>, <number>)
<step-timing-function> = step-start | step-end | steps(<integer>[, <step-position>]?)

where 
<step-position> = jump-start | jump-end | jump-none | jump-both | start | end


```

## justify-cotent: space-evenly 不兼容问题


## rotateY 以Y轴中心旋转
## rotateX 以X轴中心旋转
例子：



## background 属性
```
[ <bg-layer> , ]* <final-bg-layer>
where 
<bg-layer> = <bg-image> || <bg-position> [ / <bg-size> ]? || <repeat-style> || <attachment> || <box> || <box>
<final-bg-layer> = <'background-color'> || <bg-image> || <bg-position> [ / <bg-size> ]? || <repeat-style> || <attachment> || <box> || <box>

```
图像 位置/大小 重复 滚动/固定 位置盒子 裁剪盒子 what where how 图片的位置和大小，都给我滚蛋


## CSS transition 和 animation
```
img{
    height:15px;
    width:15px;
}

img:hover{
    height: 450px;
    width: 450px;
}

img{
    transition: 1s;
}
```
transition 的作用在于，指定状态变化所需要的时间。

```
where 
<single-transition> = [ none | <single-transition-property> ] || <time> || <timing-function> || <time>
```
属性 时间 函数 时间 署时寒时

局限：
（1）transition需要事件触发，所以没法在网页加载时自动发生。

（2）transition是一次性的，不能重复发生，除非一再触发。 对比次数

（3）transition只能定义开始状态和结束状态，不能定义中间状态，也就是说只有两个状态。

（4）一条transition规则，只能定义一个属性的变化，不能涉及多个属性。

## 使用transition 使二级菜单延迟消失， 从而能能够hover上去

## visibility 和 display：none相互冲突 ，是的transition出现bug

## box-sizing: border-box 、 border 设置border的时候会造成内容的移位
这个时候可以使用 outline 替代

## css animation 造成字体显示模糊

## 滚动条
::-webkit-scrollbar 滚动条整体部分，可以设置宽度啥的
::-webkit-scrollbar-button 滚动条两端的按钮
::-webkit-scrollbar-track 外层轨道
::-webkit-scrollbar-track-piece 内层滚动槽
::-webkit-scrollbar-thumb 滚动的滑块
::-webkit-scrollbar-corner 边角
::-webkit-resizer 定义右下角拖动块的样式


## 选择同名第几个dom
```
  &:nth-of-type(1) {
    padding-top: 1.1rem;
  }
```

## 2倍图需要特殊设置background-size为一倍的大小 或者使用zoom属性强行缩放

## flex布局和text-overflow: ellipsis;
父元素使用flex水平布局，子元素中设置为flex为1的元素需要实现文字过长的省略号的时候，flex为1的元素可能会挤压其他元素
这个时候设置父元素
.content {
    flex: 1;
    width: 0;
}
或者
.content {
    flex: 1;
    overflow: hidden；
}

## ul 和 li
{
  margin: 0;
  padding: 0; // 注意这里并不会把 list-style 去除掉
}

### [list-style](https://developer.mozilla.org/en-US/docs/Web/CSS/list-style)
list-style: georgian outside url('/non-existent.svg'); // type postion image

### 下划线
text-decoration

## 使用absolute margin居中
需要设置元素的宽高， 和 left right top bottom 为0
.element {
    width: 600px; height: 400px;
    position: absolute; left: 0; top: 0; right: 0; bottom: 0;
    margin: auto;    /* 有了这个就自动居中了 */
}

## [裁剪 clip-path](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path)
The clip-path CSS property creates a clipping region that sets what part of an element should be shown. Parts that are inside the region are shown, while those outside are hidden.
创建一个裁剪区域，区域内展示，区域外的隐藏
circle 半径计算 [`sqrt(width^2+height^2)/sqrt(2)`](https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape)


## [vertical-align](https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align)
适用于 inline table-cell box


## 防止图片裂掉
//解决当img为空时出现空框，图裂的问题
```css

img[src=""],img:not([src]){
          opacity:0;
}
```


## filter: drop-shadow(offset-x offset-y blur-radius spread-radius color)
