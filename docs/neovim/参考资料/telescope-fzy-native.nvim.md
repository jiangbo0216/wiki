[nvim-telescope/telescope-fzy-native.nvim](https://github.com/nvim-telescope/telescope-fzy-native.nvim)

# telescope-fzy-native.nvim

fzy 排序编译版本

FZY style sorter that is compiled

## Installation

It is possible that you will already have a compiled binary matching your system. You can find out information about compiling the binary at the implementation repo: https://github.com/romgrk/fzy-lua-native

You can install this with your favorite package manager. Make sure that it installs git submodules if stuff isn't working!

## Usage

You can override the file & generic sorter by default simply by adding

```
require('telescope').load_extension('fzy_native')
```

somewhere after your `require('telescope').setup()` call.

To configure them individually, you should do the following:

```
require('telescope').setup {
    extensions = {
        fzy_native = {
            override_generic_sorter = false,
            override_file_sorter = true,
        }
    }
}
require('telescope').load_extension('fzy_native')
```