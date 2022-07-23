function Vertex(label) {
  this.label = label;
}

function Graph(v) {
  this.vertices = v;
  this.edges = 0;
  this.adj = [];
  for (let i=0; i<this.vertices; ++i) {
    this.adj[i] = [];
    this.adj[i].push("");
  }
  this.addEdge = addEdge;
  this.showGraph = showGraph;
  this.dfs = dfs;
  this.bfs = bfs;
  this.edgeTo = [];
  this.marked = [];
  for (let i=0; i<this.vertices; ++i) {
    this.marked[i] = false;
  }
  this.pathTo = pathTo;
  this.hasPathTo = hasPathTo;
}

function addEdge(v, w) {
  this.adj[v].push(w);
  this.adj[w].push(v);
  this.edges++;
}

function showGraph() {
  for (let i=0; i<this.vertices; ++i) {
    process.stdout.write(i + " => ");
    for (let j=0; j<this.vertices; ++j) {
      if (this.adj[i][j] != undefined) {
        process.stdout.write(this.adj[i][j] + " ");
      }
    }
    console.log();
  }
}

function dfs(v) {
  this.marked[v] = true;
  if (this.adj[v] != undefined) {
    console.log("visited: ", v);
  }
  this.adj[v].forEach(w => {
    if (w != "" && !this.marked[w]) this.dfs(w);
  })
}

function bfs(s) {
  let queue = [];
  this.marked[s] = true;
  queue.push(s);
  while (queue.length > 0) {
    let v = queue.shift();
    if (v != undefined) {
      console.log("visited: ", v);
    }
    this.adj[v].forEach(w => {
      if (w != "" && !this.marked[w]) {
        this.edgeTo[w] = v;
        this.marked[w] = true;
        queue.push(w);
      }
    })
  }
}

function pathTo(v) {
  let source = 0;
  if (!this.hasPathTo(v)) {
    return undefined;
  }
  let path = [];
  for (let i=v; i!=source; i=this.edgeTo[i]) {
    path.push(i);
  }
  path.push(s);
  return path;
}

function hasPathTo(v) {
  return this.marked[v];
}

g = new Graph(5);
g.addEdge(0, 1);
g.addEdge(0, 2);
g.addEdge(1, 3);
g.addEdge(2, 4);
let vertex = 4;
let paths = g.pathTo(vertex);
while (paths.length > 0) {
  if (paths.length > 1) {
    process.stdout.write(paths.pop(), "-");
  } else {
    process.stdout.write(paths.pop());
  }
}