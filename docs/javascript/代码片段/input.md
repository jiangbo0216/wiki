## input文字到末尾

```js
function setSelectionRange (input, selectionStart, selectionEnd) {
  if (!input) return
  if (input.setSelectionRange) {
    input.focus()
    input.setSelectionRange(selectionStart, selectionEnd)
  } else if (input.createTextRange) {
    const range = input.createTextRange()
    range.collapse(true)
    range.moveEnd('character', selectionEnd)
    range.moveStart('character', selectionStart)
    range.select()
  }
}
```
