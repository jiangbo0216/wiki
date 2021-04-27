## Promise

promise.all([asyncTask(1),asyncTask(2),asyncTask(3)]) 任务是顺序发起的

Promise.all([Promise.reject('error').catch(console.log)]) 这样是不会抛出异常

Promise.all([Promise.reject('error')]).catch(console.log) 统一处理

