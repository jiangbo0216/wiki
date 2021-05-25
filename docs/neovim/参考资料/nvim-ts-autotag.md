# [nvim-ts-autotag](https://github.com/windwp/nvim-ts-autotag)

Use treesitter to **autoclose** and **autorename** html tag

It work with html,tsx,vue,svelte.

## Usage

```
Before        Input         After
------------------------------------
<div           >         <div></div>
<div></div>    ciwspan   <span></span>
------------------------------------
```

## xSetup

Neovim 0.5 and nvim-treesitter to work

User treesitter setup

```
require'nvim-treesitter.configs'.setup {
  autotag = {
    enable = true,
  }
}
```

or you can use a set up function

```
require('nvim-ts-autotag').setup()
```

## Default values

```
local filetypes = {
  'html', 'javascript', 'javascriptreact', 'typescriptreact', 'svelte', 'vue'
}
local skip_tags = {
  'area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'slot',
  'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr','menuitem'
}
```

### Override default values

```
require'nvim-treesitter.configs'.setup {
  autotag = {
    enable = true,
    filetypes = { "html" , "xml" },
  }
}
-- OR
require('nvim-ts-autotag').setup({
  filetypes = { "html" , "xml" },
})
```