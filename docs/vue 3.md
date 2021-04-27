## Composition API、
composition 以一种更加结构的方式进行编码
之前的vue2的写法细分到组件，所有的数据绑定到组件，现在在组件和功能之间加了一层，使得功能独立于组件，更像一个完整的数据结构生态系统的样子，
最终composition的哲学使得组件水道渠成，
为了使得功能更加清晰，使用了typescript对function进行解释

```js
<template>
  <div id="app">
    <h1 class="title">My todo list</h1>
    <app-item-input @addItem="addItem" />
    <app-list @removeItem="removeItem" :items="state.items" />
  </div>
</template>

<script>
import { reactive } from "@vue/composition-api";
import AppList from "@/components/AppList.vue";
import AppItemInput from "@/components/AppItemInput.vue";
export default {
  name: "app",
  components: { AppList, AppItemInput },
  setup() {
    const state = reactive({
      items: []
    });
    const addItem = $event => state.items.unshift($event);
    const removeItem = $event => state.items.splice($event, 1);
    return {
      state,
      addItem,
      removeItem
    };
  }
};
</script>

<style>
#app {
  max-width: 400px;
  margin: 0 auto;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.title {
  text-align: center;
}
</style>
```

```js
import Vue from 'vue'
import App from './App.vue'
import CompositionApi from '@vue/composition-api'

Vue.config.productionTip = false
Vue.use(CompositionApi)

new Vue({
  render: h => h(App),
}).$mount('#app')
```

对比 react hooks
```js
const { React, ReactDOM, TweenMax, TimelineMax } = window
const { useEffect, useState, useRef, useReducer } = React
const { render } = ReactDOM
const rootNode = document.getElementById('app')

const ANIM_SPEED = 0.25

const initialState = {
  dataSet: undefined,
  searchTime: 0,
  searching: false,
  keyword: undefined,
}
const ACTIONS = {
  SEARCH_NEW: 'SEARCH_NEW',
  SEARCH_RESULTS: 'SEARCH_RESULTS',
  COPY: 'COPY',
}

const colorSearchReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SEARCH_NEW:
      return {
        searching: true,
        searchTime: Date.now(),
        dataSet: state.dataSet,
        keyword: action.keyword,
      }
    case ACTIONS.SEARCH_RESULTS:
      return { searching: false, searchTime: null, dataSet: action.data }
    case ACTIONS.COPY:
      return {
        searching: false,
        searchTime: null,
        dataSet: state.dataSet.map(c => ({
          ...c,
          copiedHex: c.color.hex === action.color,
          copiedRgb:
            `rgb(${c.color.rgb.r}, ${c.color.rgb.g}, ${c.color.rgb.b})` ===
            action.color,
        })),
      }
    default:
      return state
  }
}
const URL = 'https://color-image-search.herokuapp.com/search/'
const useColorSearch = () => {
  const searchResults = useRef(null)
  const [{ searchTime, searching, dataSet, keyword }, dispatch] = useReducer(
    colorSearchReducer,
    initialState
  )
  const grabImages = async keyword => {
    if (!keyword) return
    const data = await (await (await fetch(`${URL}${keyword}`)).json()).images
    dispatch({ type: ACTIONS.SEARCH_RESULTS, data })
  }
  useEffect(() => {
    grabImages(keyword)
  }, [searchTime])

  const search = async keyword => {
    if (!keyword) return
    searchResults.current = []
    dispatch({ type: ACTIONS.SEARCH_NEW, keyword })
  }

  const copy = color => {
    // Copy to clipboard
    const input = document.createElement('input')
    input.value = color
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    input.remove()
    dispatch({ type: ACTIONS.COPY, color })
  }
  return [dataSet, searching, search, copy]
}

const App = () => {
  const [keyword, setKeyword] = useState('')
  const invisiput = useRef(null)
  const colorsRef = useRef(null)
  const [selected, setSelected] = useState(null)
  const selectedRef = useRef(null)
  const selectedImageRef = useRef(null)
  const colorRef = useRef(null)
  const formRef = useRef(null)
  const [data, searching, search, copy] = useColorSearch()

  // const data = new Array(12).fill().map(() => ({ color: { hex: 'red' } }))

  const unset = () => {
    setSelected(null)
    search(keyword)
  }
  const onSubmit = e => {
    e.preventDefault()
    if (selected) {
      closeSelected(unset)
    } else {
      unset()
    }
  }

  const copyToClipboard = color => {
    invisiput.current.value = color
    invisiput.current.select()
    document.execCommand('copy')
    copy(color)
  }

  useEffect(() => {
    if (selected) {
      const colorEl = colorsRef.current.children[selected.index]
      const { top, left, bottom, right } = colorEl.getBoundingClientRect()
      const {
        top: containerTop,
        left: containerLeft,
        right: containerRight,
        bottom: containerBottom,
      } = colorsRef.current.getBoundingClientRect()

      const colorPos = {
        top: top - containerTop,
        left: left - containerLeft,
        bottom: containerBottom - bottom,
        right: containerRight - right,
      }
      colorRef.current = {
        pos: colorPos,
      }
      const onStart = () => {
        TweenMax.set(selectedRef.current, {
          opacity: 1,
          '--color': selected.data.color.hex,
          '--red': selected.data.color.rgb.r,
          '--green': selected.data.color.rgb.g,
          '--blue': selected.data.color.rgb.b,
          '--t': colorPos.top,
          '--r': colorPos.right,
          '--b': colorPos.bottom,
          '--l': colorPos.left,
          zIndex: 2,
        })
      }
      new TimelineMax({ onStart })
        .add(
          TweenMax.to(selectedRef.current, ANIM_SPEED, {
            '--t': -10,
            '--r': -10,
            '--b': -10,
            '--l': -10,
          })
        )
        .add(
          TweenMax.to(selectedImageRef.current, ANIM_SPEED, {
            opacity: 1,
          })
        )
    }
  }, [selected])

  const closeSelected = cb => {
    const colorPos = colorRef.current.pos
    const onComplete = () => {
      TweenMax.set(selectedRef.current, { opacity: 0, zIndex: -1 })
      if (cb && typeof cb === 'function') {
        cb()
      }
    }
    new TimelineMax({ onComplete })
      .add(TweenMax.to(selectedImageRef.current, ANIM_SPEED, { opacity: 0 }))
      .add(
        TweenMax.to(selectedRef.current, ANIM_SPEED, {
          '--t': colorPos.top,
          '--r': colorPos.right,
          '--b': colorPos.bottom,
          '--l': colorPos.left,
        })
      )
  }

  return (
    <div className="color-search">
      <input ref={invisiput} className="input-invisible" />
      <form ref={formRef} onSubmit={onSubmit} className="input-container">
        <input
          value={keyword}
          disabled={searching}
          onChange={e => setKeyword(e.target.value)}
          placeholder="Search for a color"
        />
        <button
          className="input-container__button"
          role="button"
          disabled={searching}
          onClick={onSubmit}>
          <div className="search">
            <div className="search__glass" />
            <div className="search__prongs">
              {new Array(10).fill().map((d, i) => (
                <div key={`loader-prong--${i}`} />
              ))}
            </div>
          </div>
        </button>
      </form>
      <div
        ref={colorsRef}
        className={`colors ${searching ? 'colors--searching' : ''}`}>
        {data &&
          data.length !== 0 &&
          data.map((s, index) => (
            <div
              key={`color--${index}`}
              className="color"
              style={{
                '--color': s.color.hex,
              }}
              onClick={() => setSelected({ index, data: data[index] })}></div>
          ))}
        {data && data.length !== 0 && selected && (
          <div
            ref={selectedRef}
            className={`color--selected ${
              selected.data.color.dark ? 'color--selected-dark' : ''
            }`}>
            <button className="color__close" onClick={closeSelected}>
              <svg viewBox="0 0 24 24">
                <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
              </svg>
            </button>
            <button
              onClick={() => copyToClipboard(selected.data.color.hex)}
              className="info">
              {data && data[selected.index] && data[selected.index].copiedHex
                ? 'COPIED!'
                : selected.data.color.hex}
            </button>
            <button
              onClick={() =>
                copyToClipboard(
                  `rgb(${selected.data.color.rgb.r}, ${selected.data.color.rgb.g}, ${selected.data.color.rgb.b})`
                )
              }
              className="info">
              {data && data[selected.index] && data[selected.index].copiedRgb
                ? 'COPIED!'
                : `rgb(${selected.data.color.rgb.r}, ${selected.data.color.rgb.g}, ${selected.data.color.rgb.b})`}
            </button>
            <div className="info">
              Photo by{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://unsplash.com/@${selected.data.user.username}?utm_source=color-image-search&utm_medium=referral`}>
                {selected.data.user.name}
              </a>{' '}
              on{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://unsplash.com/?utm_source=color-image-search&utm_medium=referral">
                Unsplash
              </a>
            </div>
            <div ref={selectedImageRef} className="img">
              <img
                className="image--loading"
                key={selected.data.id}
                alt={selected.data.alt_description}
                src={selected.data.urls.regular}
              />
            </div>
          </div>
        )}
        {data && data.length === 0 && <h1>No results! 😭</h1>}
      </div>
    </div>
  )
}
render(<App />, rootNode)

```

```css
*
  box-sizing border-box

body
  margin 0
  padding 0
  overflow-x hidden
  font-family 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif

.input-container
  display inline-grid
  grid-template-columns auto 60px
  margin 0
  height 60px
  margin 1rem 0
  width 100%

  &:hover
    [disabled]
      border-color #ddd

    input
      border-color #111

      ~ button
        border-color #111

        .search__glass
          border-color #111

          &:after
            background #111

input
  box-sizing border-box
  cursor pointer
  padding 0 24px
  font-size 18px
  border 2px solid #aaa
  border-radius 10px 0 0 10px
  outline transparent
  transition border-color .25s ease, color .25s ease

  &::placeholder
    color #aaa


  &:hover
  &:active
  &:focus
    border-color #111

    ~ button
      border-color #111

      .search__glass
        border-color #111
        transition border-color 0.25s ease

        &:after
          background #111
          transition background 0.25s ease

  &[disabled]
  &:hover[disabled]
    border-color #ddd
    color #ddd

    ~ button
      border-color #ddd

      .search__glass
        border-color transparent

.input-container__button
  cursor pointer
  width 60px
  outline transparent
  border-radius 0 10px 10px 0
  position relative
  border 2px solid #aaa
  border-left-width 0
  transition border-color 0.25s ease
  background transparent

  &:hover[disabled] .search__glass
    border-color transparent

  &[disabled] .search__prongs
    opacity 1
    transition opacity .25s .25s ease

  &[disabled] .search__glass
    transform translate(0, 0)
    border-color transparent
    transition border-color 0.25s ease, transform 0.25s ease

  &[disabled] .search__glass:after
    background transparent
    transition background 0.25s ease, transform 0.25s ease
    transform translate(-50%, 0) rotate(-45deg) translate(0, 100%) scaleY(0)

.search
  height 24px
  width 24px
  border-radius 100%
  position absolute
  top 50%
  left 50%
  transform translate(-50%, -50%)

  &__glass
    border-radius 100%
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    border 4px solid #aaa
    transition border-color 0.25s ease, transform 0.25s ease
    transform translate(-10%, -10%)

    &:after
      content ''
      position absolute
      height 12px
      top 50%
      left 50%
      background #aaa
      transition background 0.25s ease, transform 0.25s ease
      width 4px
      transform-origin top center
      transform translate(-50%, 0) rotate(-45deg) translate(0, 95%) scaleY(1)
      border-radius 0 0 2px 2px

  &__prongs
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    animation rotate 1s infinite linear
    opacity 0
    transition opacity .25s ease

    > div
      for $prong in (1..10)
        &:nth-of-type({$prong})
          height 2px
          width 2px
          background #222
          position absolute
          top 50%
          left 50%
          transform translate(-50%, -50%) rotate($prong * 36deg) translate(0, 10px)

@keyframes rotate
  to
    transform rotate(360deg)

#app
  display flex
  justify-content center
  align-items center
  min-height 100vh

.colors
  min-height 250px
  display grid
  align-items center
  justify-content center
  grid-template-columns repeat(3, auto)
  grid-gap 4px
  transition opacity .25s ease, filter .25s ease
  position relative

  &:empty
    min-height 0

  &--searching
    filter grayscale(1)

.color
  background-color var(--color)
  position relative
  height 100px
  width 100px
  cursor pointer
  overflow hidden
  text-transform uppercase
  transition transform 0.1s ease
  border-radius 10px

  &:hover
    transform scale(0.9)

  &__close
    cursor pointer
    position absolute
    top 5px
    right 5px
    height 44px
    border 0
    background transparent
    width 44px
    svg
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      width 30px
      height 30px
      path
        fill #fff

  &--selected
    border-radius 10px
    position absolute
    color #FFFFFF
    overflow hidden
    background var(--color)
    opacity 0
    top 0
    right 0
    bottom 0
    left 0
    font-weight bold
    display flex
    flex-direction column
    justify-content flex-end
    align-items flex-end
    padding 1rem
    z-index -1
    $clip = inset(calc(var(--t) * 1px) calc(var(--r) * 1px) calc(var(--b) * 1px) calc(var(--l) * 1px))
    -webkit-clip-path $clip
    clip-path $clip

    a
    button
      color #FFF


    &-dark
      color #111

      a
      button
        color #111

      svg path
        fill #111
  &__hex
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    font-weight bold
    z-index 2
    color #fafafa
    background 'rgba(%s, %s, %s, 0.75)' % (var(--r) var(--g) var(--b))
    padding 4px
    border-radius 2px

    &--dark
      color #111

.img
img
  border-radius 10px
  object-fit cover
  position absolute
  top 0
  width 100%
  height 100%
  left 0
  animation fadeIn 0.25s ease
  z-index -1

.img
  opacity 0

.info
  cursor pointer
  padding 0.5rem 0 0.5rem
  text-align right
  background 'rgba(%s, %s, %s, %s)' % (var(--red) var(--green) var(--blue) var(--alpha, 0))
  transition background 0.25s ease
  border 0
  font-weight bold

  &:hover
    --alpha 1
    ~ .img
      --alpha 0

@keyframes fadeIn
  from
    opacity 0

.img:after
  content ''
  background 'rgba(%s, %s, %s, %s)' % (var(--red) var(--green) var(--blue) var(--alpha, 0.75))
  position absolute
  transition background 0.25s ease
  top 0
  right 0
  bottom 0
  left 0

.input-invisible
  position fixed
  top 0
  left 100%

```