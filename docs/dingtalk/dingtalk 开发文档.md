## [开发文档](https://ding-doc.dingtalk.com/doc#/serverapi2/)

## [钉钉群机器人](https://ding-doc.dingtalk.com/doc#/serverapi2/krgddi)
```js
const ChatBot = require('dingtalk-robot-sender');

// 直接使用 webhook, testflight群通知机器人
const robot = new ChatBot({
  webhook: 'https://oapi.dingtalk.com/robot/send?access_token=95fa396d6f4bec063e83ee9c0594ca8f566d430e71c80b93b2f7fb09f0c62ab5'
});


module.exports = {
  robot
}

// 使用
await dingRobot.send({
  "msgtype": "text", 
  "text": {
    "content": `testflight：${message}，已经为您清除了了原来的测试组，并创建了新的测试组`
  }, 
  "at": {
    "isAtAll": false
  }
})
```