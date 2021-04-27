// 实现一个带并发限制的异步调度器Scheduler，保证同时运行的任务最多有两个。完善代码中Scheduler类，使得以下程序能正确输出
class Scheduler {
  pending = []
  running = []
  max = 2
  resolve = null
  async add(promiseCreator) {
    await new Promise(async (resolve, reject) => {
      this.pending.push([promiseCreator, resolve])
      await this.check()
    })
  }
  async check() {
    if(this.running.length < this.max) {
      await this.start()
    }
  }

  async start () {
    const task = this.pending.shift()
    if (task) {
      const [promiseCreator, resolve] = task
      this.running.push(promiseCreator)
      await promiseCreator().then(async () => {
        const index = this.running.indexOf(promiseCreator)
        if (index > -1) {
          this.running.splice(index,1)
        }
        
        this.check()
        resolve()
      })
    }

  }
}
const timeout = (time) => new Promise(resolve => {
  setTimeout(resolve, time)
})
const scheduler = new Scheduler();
console.time('log')
const addTask = (time, order) => {
  scheduler.add(() => timeout(time))
    .then(() =>{ 
      console.timeLog('log')
      console.log(order)
    })
}
addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')
// output: 2 3 1 4
// 一开始，1、2两个任务进入队列
// 500ms时，2完成，输出2，任务3进队
// 800ms时，3完成，输出3，任务4进队
// 1000ms时，1完成，输出1
// 1200ms时，4完成，输出4