function CArray(numElements) {
  this.dataStore = [];
  this.pos = 0;
  this.numElements = numElements;
  this.insert = insert;
  this.toString = toString;
  this.clear = clear;
  this.setData = setData;
  this.swap = swap;
  this.qSort = qSort;

  for (let i=0; i<numElements; ++i) {
    this.dataStore[i] = i;
  }
}

function setData() {
  for (let i=0; i<this.numElements; ++i) {
    this.dataStore[i] = Math.floor(Math.random() *
                        (this.numElements + 1));
  }
}

function clear() {
  for (let i=0; i<this.dataStore.length; ++i) {
    this.dataStore[i] = 0;
  }
}

function insert(element) {
  this.dataStore[this.pos++] = element;
}

function toString() {
  let retstr = "";
  for (let i=0; i<this.dataStore.length; ++i) {
    retstr += this.dataStore[i] + " ";
    if (i > 0 && i % 10 == 0) {
      retstr += "\n";
    }
  }
  return retstr;
}

function swap(arr, index1, index2) {
  let temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

function qSort(arr) {
  if (arr.length == 0) return [];
  let left = [];
  let right = [];
  let pivot = arr[0];
  for (let i=1; i<arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return qSort(left).concat(pivot, qSort(right));
}

let a = [];
for (let i=0; i<10; ++i) {
  a[i] = Math.floor((Math.random() * 100) + 1);
}
console.log(a);
console.log(qSort(a));
