# [Does println! borrow or own the variable?](https://stackoverflow.com/questions/30450399/does-println-borrow-or-own-the-variable)

I am confused with borrowing and ownership. In the Rust [documentation about reference and borrowing](https://doc.rust-lang.org/book/first-edition/references-and-borrowing.html)

```rust
let mut x = 5;
{
    let y = &mut x;
    *y += 1;
}
println!("{}", x);
```

They say

> `println!` can borrow `x`.

I am confused by this. If `println!` borrows `x`, why does it pass `x` not `&x`?

I try to run this code below

```rust
fn main() {
    let mut x = 5;
    {
        let y = &mut x;
        *y += 1;
    }
    println!("{}", &x);
}
```

This code is identical with the code above except I pass `&x` to `println!`. It prints '6' to the console which is correct and is the same result as the first code.



## answer

The macros `print!`, `println!`, `eprint!`, `eprintln!`, `write!`, `writeln!` and `format!` are a special case and implicitly take a reference to any arguments to be formatted.

These macros do not behave as normal functions and macros do for reasons of convenience; the fact that they take references silently is part of that difference.

```rust
fn main() {
    let x = 5;
    println!("{}", x);
}
```

Run it through `rustc -Z unstable-options --pretty expanded` on the nightly compiler and we can see what `println!` expands to:

```rust
#![feature(prelude_import)]
#[prelude_import]
use std::prelude::v1::*;
#[macro_use]
extern crate std;
fn main() {
    let x = 5;
    {
        ::std::io::_print(::core::fmt::Arguments::new_v1(
            &["", "\n"],
            &match (&x,) {
                (arg0,) => [::core::fmt::ArgumentV1::new(
                    arg0,
                    ::core::fmt::Display::fmt,
                )],
            },
        ));
    };
}
```

Tidied further, it’s this:

```rust
use std::{fmt, io};

fn main() {
    let x = 5;
    io::_print(fmt::Arguments::new_v1(
        &["", "\n"],
        &[fmt::ArgumentV1::new(&x, fmt::Display::fmt)],
        //                     ^^
    ));
}
```

Note the `&x`.

If you write `println!("{}", &x)`, you are then dealing with two levels of references; this has the same result because there is an implementation of [`std::fmt::Display`](https://doc.rust-lang.org/std/fmt/trait.Display.html) for `&T` where `T` implements `Display` (shown as `impl<'a, T> Display for &'a T where T: Display + ?Sized`) which just passes it through. You could just as well write `&&&&&&&&&&&&&&&&&&&&&&&x`.