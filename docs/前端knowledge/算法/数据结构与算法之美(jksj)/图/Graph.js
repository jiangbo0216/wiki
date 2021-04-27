class Graph {
  v = 0 // 顶点个数
  adj = Object.create(null) // 邻接表

  constructor (v) {
    this.v = v
  }

  addEdge (s, t) {
    const edge = this.adj[s] || []
    edge.push(t)
    this.adj[s] = edge
    this.adj[t] = this.adj[t] || []
  }
}

const graph = new Graph(3)
graph.addEdge(1, 2)
graph.addEdge(1, 3)
graph.addEdge(2, 3)

// Kahn 算法
function topoSortByKahn (graph) {
  let inDegree = Object.create(null)
  Object.keys(graph.adj).forEach((vertex) => {
    if (!inDegree[vertex]) { // 初始化入度为0
      inDegree[vertex] = 0
    }
    for (const neighbor of graph.adj[vertex]) {
      inDegree[neighbor] = (inDegree[neighbor] || 0) + 1
    }
  })

  let queue = []
  Object.keys(inDegree).forEach((vertex) => {
    if (inDegree[vertex] === 0) {
      queue.push(vertex)
    }
  }) 

  while(queue.length > 0) {
    const vertex = queue.shift()
    process.stdout.write('-->' + vertex)
    for (const neighbor of graph.adj[vertex]) {
      --inDegree[neighbor]
      if (inDegree[neighbor] === 0) queue.push(neighbor)
    }
  }
  console.log()
}


topoSortByKahn(graph)