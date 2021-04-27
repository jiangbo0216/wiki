## tough-cookie 判断cookie是否过期

```js
// tough-cookie 判断cookie过期
const {CookieJar, Cookie} = require("tough-cookie")
const fs = require("fs")
const path = require("path")
const dayjs = require("dayjs")
let account = 'jiangbo0216@gmail.com'
let jar
let cookies = fs.readFileSync(path.resolve(process.cwd(), `cookies/${account}_cookie.txt`)).toString()
if (cookies) {
    jar = CookieJar.fromJSON(JSON.parse(cookies))
}

console.log(Object.keys(jar))

jar.store.findCookie('appstoreconnect.apple.com', '/', 'dqsid', function(err , cookie) {
  console.log(cookie)
  const cookieStartTime = dayjs(cookie.expiryDate())
  const now = dayjs()
  console.log(now)
  console.log(now.isAfter(cookieStartTime))
  console.log(cookie.expiryDate())
  console.log(cookie.TTL()) // 总是返回 1799000, TTL 这个方法有bug, 当 Expires=Wed, 29 Apr 2020 06:09:27 GMT; Max-Age=1799
  console.log(8 * 60 * 60 * 1000)
})
```