# [nvim-compe](https://github.com/hrsh7th/nvim-compe)

自动补全

Auto completion plugin for nvim.

## Table Of Contents

- [Concept](https://github.com/hrsh7th/nvim-compe#concept)
- [Features](https://github.com/hrsh7th/nvim-compe#features)
- Usage
  - Prerequisite
    - [Vim script Config](https://github.com/hrsh7th/nvim-compe#vim-script-config)
    - [Lua Config](https://github.com/hrsh7th/nvim-compe#lua-config)
  - [Mappings](https://github.com/hrsh7th/nvim-compe#mappings)
  - [Highlight](https://github.com/hrsh7th/nvim-compe#highlight)
- Built-in sources
  - [Common](https://github.com/hrsh7th/nvim-compe#common)
  - [Neovim-specific](https://github.com/hrsh7th/nvim-compe#neovim-specific)
  - [External-plugin](https://github.com/hrsh7th/nvim-compe#external-plugin)
- [External sources](https://github.com/hrsh7th/nvim-compe#external-sources)
- FAQ
  - [Can't get sorting to work correctly](https://github.com/hrsh7th/nvim-compe#cant-get-sorting-to-work-correctly)
  - [How to use LSP snippet?](https://github.com/hrsh7th/nvim-compe#how-to-use-lsp-snippet)
  - [How to use tab to navigate completion menu?](https://github.com/hrsh7th/nvim-compe#how-to-use-tab-to-navigate-completion-menu)
  - [How to expand snippets from completion menu?](https://github.com/hrsh7th/nvim-compe#how-to-expand-snippets-from-completion-menu)
- Demo
  - [Auto Import](https://github.com/hrsh7th/nvim-compe#auto-import)
  - [LSP + Magic Completion](https://github.com/hrsh7th/nvim-compe#lsp--rust_analyzers-magic-completion)
  - [Buffer Source Completion](https://github.com/hrsh7th/nvim-compe#buffer-source-completion)
  - [Calc Completion](https://github.com/hrsh7th/nvim-compe#calc-completion)
  - [Nvim Lua Completion](https://github.com/hrsh7th/nvim-compe#nvim-lua-completion)
  - [Vsnip Completion](https://github.com/hrsh7th/nvim-compe#vsnip-completion)
  - [Snippets.nvim Completion](https://github.com/hrsh7th/nvim-compe#snippetsnvim-completion)
  - [Treesitter Completion](https://github.com/hrsh7th/nvim-compe#treesitter-completion)
  - [Tag Completion](https://github.com/hrsh7th/nvim-compe#tag-completion)
  - [Spell Completion](https://github.com/hrsh7th/nvim-compe#spell-completion)

## Concept

- Simple core
- No flicker
- Lua source & Vim source
- Better matching algorithm
- Support LSP completion features (trigger character, isIncomplete, expansion)
- Respect VSCode/LSP API design

## Features

- VSCode compatible expansion handling
  - rust-analyzer's [Magic completion](https://rust-analyzer.github.io/manual.html#magic-completions)
  - vscode-html-languageserver-bin's closing tag completion
  - Other complex expansion are supported
- Flexible Custom Source API
  - The source can support `documentation` / `resolve` / `confirm`
- Better fuzzy matching algorithm
  - `gu` can be matched `get_user`
  - `fmodify` can be matched `fnamemodify`
  - See [matcher.lua](https://github.com/hrsh7th/nvim-compe/blob/master/lua/compe/matcher.lua#L57) for implementation details
- Buffer source carefully crafted
  - The buffer source will index buffer words by filetype specific regular expression if needed

## Usage

Detailed docs in [here](https://github.com/hrsh7th/nvim-compe/blob/master/doc/compe.txt) or `:help compe`.

### Prerequisite

Neovim version 0.5.0 or above (not released yet, use nightlies or build from source).

You must set `completeopt` to `menuone,noselect` which can be easily done as follows.

Using Vim script

```
set completeopt=menuone,noselect
```

Using Lua

```
vim.o.completeopt = "menuone,noselect"
```

The `source` option is required if you want to enable but others can be omitted.

#### Vim script Config

```
let g:compe = {}
let g:compe.enabled = v:true
let g:compe.autocomplete = v:true
let g:compe.debug = v:false
let g:compe.min_length = 1
let g:compe.preselect = 'enable'
let g:compe.throttle_time = 80
let g:compe.source_timeout = 200
let g:compe.incomplete_delay = 400
let g:compe.max_abbr_width = 100
let g:compe.max_kind_width = 100
let g:compe.max_menu_width = 100
let g:compe.documentation = v:true

let g:compe.source = {}
let g:compe.source.path = v:true
let g:compe.source.buffer = v:true
let g:compe.source.calc = v:true
let g:compe.source.nvim_lsp = v:true
let g:compe.source.nvim_lua = v:true
let g:compe.source.vsnip = v:true
let g:compe.source.ultisnips = v:true
```

#### Lua Config

```
require'compe'.setup {
  enabled = true;
  autocomplete = true;
  debug = false;
  min_length = 1;
  preselect = 'enable';
  throttle_time = 80;
  source_timeout = 200;
  incomplete_delay = 400;
  max_abbr_width = 100;
  max_kind_width = 100;
  max_menu_width = 100;
  documentation = true;

  source = {
    path = true;
    buffer = true;
    calc = true;
    nvim_lsp = true;
    nvim_lua = true;
    vsnip = true;
    ultisnips = true;
  };
}
```

### Mappings

```
inoremap <silent><expr> <C-Space> compe#complete()
inoremap <silent><expr> <CR>      compe#confirm('<CR>')
inoremap <silent><expr> <C-e>     compe#close('<C-e>')
inoremap <silent><expr> <C-f>     compe#scroll({ 'delta': +4 })
inoremap <silent><expr> <C-d>     compe#scroll({ 'delta': -4 })
```

If you use [cohama/lexima.vim](https://github.com/cohama/lexima.vim)

```
" NOTE: Order is important. You can't lazy loading lexima.vim.
let g:lexima_no_default_rules = v:true
call lexima#set_default_rules()
inoremap <silent><expr> <C-Space> compe#complete()
inoremap <silent><expr> <CR>      compe#confirm(lexima#expand('<LT>CR>', 'i'))
inoremap <silent><expr> <C-e>     compe#close('<C-e>')
inoremap <silent><expr> <C-f>     compe#scroll({ 'delta': +4 })
inoremap <silent><expr> <C-d>     compe#scroll({ 'delta': -4 })
```

If you use [Raimondi/delimitMate](https://github.com/Raimondi/delimitMate)

```
inoremap <silent><expr> <C-Space> compe#complete()
inoremap <silent><expr> <CR>      compe#confirm({ 'keys': "\<Plug>delimitMateCR", 'mode': '' })
inoremap <silent><expr> <C-e>     compe#close('<C-e>')
inoremap <silent><expr> <C-f>     compe#scroll({ 'delta': +4 })
inoremap <silent><expr> <C-d>     compe#scroll({ 'delta': -4 })
```

### Highlight

You can change documentation window's highlight group via following.

```
highlight link CompeDocumentation NormalFloat
```

## Built-in sources

### Common

- buffer
- path
- tags
- spell
- calc
- omni (Warning: It has a lot of side-effect.)

### Neovim-specific

- nvim_lsp
- nvim_lua

### External-plugin

- [vim_lsp](https://github.com/prabirshrestha/vim-lsp)
- [vim_lsc](https://github.com/natebosch/vim-lsc)
- [vim-vsnip](https://github.com/hrsh7th/vim-vsnip)
- [ultisnips](https://github.com/SirVer/ultisnips)
- [snippets.nvim](https://github.com/norcalli/snippets.nvim)
- [luasnip](https://github.com/L3MON4D3/LuaSnip)
- [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter) (Warning: it sometimes really slow.)

## External sources

- [tabnine](https://github.com/tzachar/compe-tabnine)
- [zsh](https://github.com/tamago324/compe-zsh)
- [conjure](https://github.com/tami5/compe-conjure)
- [dadbod](https://github.com/kristijanhusak/vim-dadbod-completion)
- [latex-symbols](https://github.com/GoldsteinE/compe-latex-symbols)
- [tmux](https://github.com/andersevenrud/compe-tmux)

## FAQ

### Can't get it work.

If you are enabling the `omni` source, please try to disable it.

### Incredibly lagging.

If you are enabling the `treesitter` source, please try to disable it.

### How to remove `Pattern not found`?

You can set `set shortmess+=c` in your vimrc.

### How to use LSP snippet?

1. Set `snippetSupport=true` for LSP capabilities.

   ```
   local capabilities = vim.lsp.protocol.make_client_capabilities()
   capabilities.textDocument.completion.completionItem.snippetSupport = true
   capabilities.textDocument.completion.completionItem.resolveSupport = {
     properties = {
       'documentation',
       'detail',
       'additionalTextEdits',
     }
   }
   
   require'lspconfig'.rust_analyzer.setup {
     capabilities = capabilities,
   }
   ```

2. Install `vim-vsnip`

   ```
   Plug 'hrsh7th/vim-vsnip'
   ```

   or `snippets.nvim`

   ```
   Plug 'norcalli/snippets.nvim'
   ```

   or `UltiSnips`

   ```
   Plug 'SirVer/ultisnips'
   ```

### How to use tab to navigate completion menu?

`Tab` and `S-Tab` keys need to be mapped to `<C-n>` and `<C-p>` when completion menu is visible. Following example will use `Tab` and `S-Tab` (shift+tab) to navigate completion menu and jump between [vim-vsnip](https://github.com/hrsh7th/vim-vsnip) placeholders when possible:

```
local t = function(str)
  return vim.api.nvim_replace_termcodes(str, true, true, true)
end

local check_back_space = function()
    local col = vim.fn.col('.') - 1
    if col == 0 or vim.fn.getline('.'):sub(col, col):match('%s') then
        return true
    else
        return false
    end
end

-- Use (s-)tab to:
--- move to prev/next item in completion menuone
--- jump to prev/next snippet's placeholder
_G.tab_complete = function()
  if vim.fn.pumvisible() == 1 then
    return t "<C-n>"
  elseif vim.fn.call("vsnip#available", {1}) == 1 then
    return t "<Plug>(vsnip-expand-or-jump)"
  elseif check_back_space() then
    return t "<Tab>"
  else
    return vim.fn['compe#complete']()
  end
end
_G.s_tab_complete = function()
  if vim.fn.pumvisible() == 1 then
    return t "<C-p>"
  elseif vim.fn.call("vsnip#jumpable", {-1}) == 1 then
    return t "<Plug>(vsnip-jump-prev)"
  else
    return t "<S-Tab>"
  end
end

vim.api.nvim_set_keymap("i", "<Tab>", "v:lua.tab_complete()", {expr = true})
vim.api.nvim_set_keymap("s", "<Tab>", "v:lua.tab_complete()", {expr = true})
vim.api.nvim_set_keymap("i", "<S-Tab>", "v:lua.s_tab_complete()", {expr = true})
vim.api.nvim_set_keymap("s", "<S-Tab>", "v:lua.s_tab_complete()", {expr = true})
```

### How to expand snippets from completion menu?

Use `compe#confirm()` mapping, as described in section [Mappings](https://github.com/hrsh7th/nvim-compe#mappings).

## Demo

### Auto Import

[![auto import](nvim-compe-imgs/68747470733a2f2f692e696d6775722e636f6d2f474a534b78574b2e676966)](https://camo.githubusercontent.com/b9216ad230657040e871484f535874d36cc086cea874b8f16e0f01cd06e090c9/68747470733a2f2f692e696d6775722e636f6d2f474a534b78574b2e676966)

### LSP + [rust_analyzer's Magic Completion](https://rust-analyzer.github.io/manual.html#magic-completions)

[![lsp](nvim-compe-imgs/68747470733a2f2f692e696d6775722e636f6d2f704d78486b59472e676966)](https://camo.githubusercontent.com/ff24032fc99e2b04e753292a28acb110910e051d34de72fd3a0df57643ab5c99/68747470733a2f2f692e696d6775722e636f6d2f704d78486b59472e676966)

### Buffer Source Completion

[![buffer](nvim-compe-imgs/68747470733a2f2f692e696d6775722e636f6d2f714366656235642e676966)](https://camo.githubusercontent.com/13cfec77ae2ecb99b589b119bba65b1f65a0885093ed47f7b1e65f290943f6de/68747470733a2f2f692e696d6775722e636f6d2f714366656235642e676966)

### Calc Completion

[![calc](nvim-compe-imgs/68747470733a2f2f692e696d6775722e636f6d2f67666f503966662e676966)](https://camo.githubusercontent.com/d674dbb9672f57124df90150d1ef0526cadbd6cbe1009b9cc4693128970d3a7b/68747470733a2f2f692e696d6775722e636f6d2f67666f503966662e676966)

### Nvim Lua Completion

[![nvim lua](nvim-compe-imgs/68747470733a2f2f692e696d6775722e636f6d2f7a4766567a324d2e676966)](https://camo.githubusercontent.com/0057c105b4e4e9d1459976a6443f20a59e90eafb9212b5c574ef7a82d225d421/68747470733a2f2f692e696d6775722e636f6d2f7a4766567a324d2e676966)

### Vsnip Completion

[![vsnip](nvim-compe-imgs/68747470733a2f2f692e696d6775722e636f6d2f7932774e4474432e676966)](https://camo.githubusercontent.com/aed4ea1ac873378f64794915f7cb642128b6e2ceea5cdcf2160495ada4669d41/68747470733a2f2f692e696d6775722e636f6d2f7932774e4474432e676966)

### Snippets.nvim Completion

[![snippets.nvim](nvim-compe-imgs/68747470733a2f2f692e696d6775722e636f6d2f3430344b4a37432e676966)](https://camo.githubusercontent.com/e8aeca4d5ac81dd8e0fa36345ecae874c8172231493f1a7ddd25a96ed22f72b8/68747470733a2f2f692e696d6775722e636f6d2f3430344b4a37432e676966)

### Treesitter Completion

[![treesitter.nvim](nvim-compe-imgs/68747470733a2f2f692e696d6775722e636f6d2f496e374b7377752e676966)](https://camo.githubusercontent.com/b8c7e4464b279ecade86e7068fe4a601fa201d415be3db189557c6f3255a6451/68747470733a2f2f692e696d6775722e636f6d2f496e374b7377752e676966)

### Tag Completion

[![tag](nvim-compe-imgs/68747470733a2f2f692e696d6775722e636f6d2f4b4f4148634d322e676966)](https://camo.githubusercontent.com/c4521f1fde18e475dee03947dc91049b5d932c0277cd52e2c578fd88475ea0af/68747470733a2f2f692e696d6775722e636f6d2f4b4f4148634d322e676966)

### Spell Completion

[![spell](nvim-compe-imgs/68747470733a2f2f692e696d6775722e636f6d2f723132724c42532e676966)](https://camo.githubusercontent.com/4fb25e1b8a9b856ac5890ef2675f5511d4c8268b27329f36f2a47bd1911811f7/68747470733a2f2f692e696d6775722e636f6d2f723132724c42532e676966)