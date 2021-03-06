function Node(data, left, right) {
  this.data = data;
  this.count = 1;
  this.left = left;
  this.right = right;
  this.show = show;
}

function show() {
  return this.data;
}

function BST() {
  this.root = null;
  this.insert = insert;
  this.inOrder = inOrder;
  this.preOrder = preOrder;
  this.postOrder = postOrder;
  this.getMin = getMin;
  this.getMax = getMax;
  this.find = find;
  this.remove = remove;
  this.removeNode = removeNode;
  this.update = update;
}

function insert(data) {
  const n = new Node(data, null, null);
  if (this.root == null) {
    this.root = n;
  } else {
    let current = this.root;
    let parent;
    while (true) {
      parent = current;
      if (data < current.data) {
        current = current.left;
        if (current == null) {
          parent.left = n;
          break;
        }
      } else {
        current = current.right;
        if (current == null) {
          parent.right = n;
          break;
        }
      }
    }
  }
}

function inOrder(node) {
  if (!(node == null)) {
    inOrder(node.left);
    process.stdout.write(node.show() + " ");
    inOrder(node.right);
  }
}

function preOrder(node) {
  if (!(node == null)) {
    process.stdout.write(node.show() + " ");
    preOrder(node.left);
    preOrder(node.right);
  }
}

function postOrder(node) {
  if (!(node == null)) {
    postOrder(node.left);
    postOrder(node.right);
    process.stdout.write(node.show() + " ");
  }
}

function getMin(data = null) {
  let current = data || this.root;
  while (!(current.left == null)) {
    current = current.left;
  }
  return current.data;
}

function getMax() {
  let current = this.root;
  while (!(current.right == null)) {
    current = current.right;
  }
  return current.data;
}

function find(data) {
  let current = this.root;
  if (current == null) {
    return null;
  } 
  while (current.data != data) {
    if (data < current.data) {
      current = current.left;
    } else {
      current = current.right;
    }
    if (current == null) {
      return null;
    }
  }
  return current;
}

function remove(data) {
  root = removeNode(this.root, data);
}

function removeNode(node, data) {
  if (node == null) {
    return null;
  }
  if (data == node.data) {
    if (node.left == null && node.right == null) {
      return null;
    }
    if (node.left == null) {
      return node.right;
    }
    if (node.right == null) {
      return node.left;
    }
    let tempNode = getMin(node.right);
    node.data = tempNode.data;
    node.right = removeNode(node.right, tempNode.data);
    return node;
  } else if (data < node.data) {
    node.left = removeNode(node.left, data);
    return node;
  } else {
    node.right = removeNode(node.right, data);
    return node;
  }
}

function update(data) {
  const grade = this.find(data);
  grade.count++;
  return grade;
}

function prArray(arr) {
  process.stdout.write(arr[0] + " ");
  for (let i=1; i<arr.length; ++i) {
    process.stdout.write(arr[i] + " ");
    if (i % 10 == 0) console.log('');
  }
}

function genArray(length) {
  let arr = [];
  for (let i=0; i<length; ++i) {
    arr[i] = Math.floor(Math.random() * 101);
  }
  return arr;
}

const grades = genArray(100);
// prArray(grades);
const gradedistro = new BST();
for (let i=0; i<grades.length; ++i) {
  let g = grades[i];
  let grade = gradedistro.find(g);
  if (grade == null) {
    gradedistro.insert(g);
  } else {
    gradedistro.update(g);
  }
}
const number = 67
console.log(`a grade ${number} is `);
const aGrade = gradedistro.find(number);
if (aGrade == null) {
  console.log('not found');
} else {
  console.log(`occured ${aGrade.count} times.`)
}