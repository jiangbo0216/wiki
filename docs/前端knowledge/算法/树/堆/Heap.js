class Heap {
  
  constructor(comparatorFunction) {
    this.heapContainer = []
    this.compile  = Heap.defaultCompareFuntion
  }

  static defaultCompareFuntion () {
    if (a === b) {
      return 0;
    }

    return a < b ? -1 : 1;
  }

  // 保持堆从数组索引位置为1的位置开始
  buildHeap (arr) {
    this.heapContainer = [,...arr]
    for (let i = ~~(arr.length / 2); i >= 1; i--) {
      this.heapifyUpbranch(arr.length,i)
    }
  }

  // 从分支节点堆化, k 最大堆化的的范围到索引为k的位置
  heapifyUpbranch (k, i) {
    const a = this.heapContainer
    while (true) {
      let maxPos = i
      // 和分支节点的子节点比较
      if (i * 2 <= k && a[i] < a[i*2]) {
        maxPos = i * 2
      }
      if (i * 2 + 1<= k && a[maxPos] < a[i*2 + 1]) {
        maxPos = i * 2 + 1
      }

      if (maxPos === i) break

      this.swap(maxPos, i)

      i = maxPos
    }
  }

  heapifyDown () {

  }

  swap (indexOne, indexTwo) {
    const tmp = this.heapContainer[indexTwo]
    this.heapContainer[indexTwo] = this.heapContainer[indexOne]
    this.heapContainer[indexOne] = tmp
  }
}

const heap = new Heap()

heap.buildHeap([7,5,19,8,4,1,20,13,16,5])

console.log(heap)

function heapSort() {
  const heap = new Heap()
  heap.buildHeap([7,5,19,8,4,1,20,13,16])
  let k = heap.heapContainer.length - 1
  while (k > 1) {
    heap.swap(1, k)
    k--
    heap.heapifyUpbranch(k,1)
  }
  console.log(heap)
}


heapSort()