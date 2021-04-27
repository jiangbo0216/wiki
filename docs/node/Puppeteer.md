## 使用puppeteer表单登录
```js
const puppeteer = require('puppeteer');

(async () => {
const browser = await puppeteer.launch({headless: false, userDataDir: 'user-data',}); // 设置用户数据目录
const page = await browser.newPage(); // 打开新的页面
// await page.setDefaultNavigationTimeout(0);
await page.goto('https://appstoreconnect.apple.com/login'); // 打开页面
await page.waitForSelector('div#idms-auth-container iframe'); // 等待 指定iframe
const authContainer = await page.$('div#idms-auth-container iframe')  // 选择指定iframe
const iframe = await authContainer.contentFrame() // 获取iframe
const userNameEle = await await iframe.waitForSelector('#account_name_text_field'); //
// await userNameEle.type('jiangbo0216@gmail.com')
// const iconSign = await iframe.waitForSelector('.icon_sign_in');
// await iconSign.click()
const passwEle = await iframe.waitForSelector('#password_text_field');
await passwEle.type('Jb1995@02', {delay:1000}) // 输入密码, 如果没有delay会有问题
const iconSign2 = await iframe.waitForSelector('#sign-in'); // 登录按钮
await iconSign2.click() // 点击登录
})()
```