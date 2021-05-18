[nvim-lua/popup.nvim](https://github.com/nvim-lua/popup.nvim)

# popup.nvim

弹窗支持

[WIP] An implementation of the Popup API from vim in Neovim. Hope to upstream when complete

## Installation

```
" This is a requirement, which implements some useful window management
"   items for neovim
Plug 'nvim-lua/plenary.nvim'

Plug 'nvim-lua/popup.nvim'
```

## Goals

Provide an API that is compatible with the vim `popup_*` APIs. After stablization and any required features are merged into Neovim, we can upstream this and wrap it with C functions to make the APIs compatible.

## Discussion:

- Should we support similar dictionaries in the neovim style.
  - Can you use "row" and "col", which are the neovim words for where you are going to place your window? Or will we just say these are different words because that's how vim does it?

## List of Neovim Features Required:

-  

  Add Z-index for floating windows

  -  When complete, we can add `zindex` parameter

-  Key handlers (used for `popup_filter`)

-  

  scrollbar for floating windows

  -  scrollbar
  -  scrollbarhighlight
  -  thumbhighlight

Optional:

-  

  Add forced transparency to a floating window.

  - Apparently overrides text?
  - This is for the `mask` feature flag

Unlikely (due to technical difficulties):

-  

  Add

   

  ```
  textprop
  ```

   

  wrappers?

  - textprop
  - textpropwin
  - textpropid

-  

  "close"

  - But this is mostly because I don't know how to use mouse APIs in nvim. If someone knows. please make an issue in the repo, and maybe we can get it sorted out.

Unlikely (due to not sure if people are using):

-  tabpage

## Progress

Suported Features:

-  

  what

  - string
  - list of strings

-  

  popup_create-arguments

  -  border
  -  borderchars
  -  col
  -  cursorline
  -  highlight
  -  line
  -  {max,min}{height,width}
  - [?] moved
    -  "any"
    -  "word"
    -  "WORD"
    -  "expr"
    -  (list options)
  -  padding
  - [?] pos
    - Somewhat implemented. Doesn't work with borders though.
  -  time
  -  title
  -  wrap

## All known unimplemented vim features at the moment

- borderhighlight
- firstline
- hidden
- ~ pos
- posinvert
- fixed
- filter
- filtermode
- mapping
- callback
- mouse:
  - mousemoved
  - close
  - drag
  - resize
- (not implemented in vim yet) flip

Would love contributors ;)