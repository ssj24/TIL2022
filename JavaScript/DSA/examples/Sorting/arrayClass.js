function CArray(numElements) {
  this.dataStore = [];
  this.pos = 0;
  this.numElements = numElements;
  this.insert = insert;
  this.toString = toString;
  this.clear = clear;
  this.setData = setData;
  this.swap = swap;
  this.bubbleSort = bubbleSort;

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

function bubbleSort() {
  let numElements = this.dataStore.length;
  let temp;
  for (let outer=numElements; outer>=2; --outer) {
    for (let inner=0; inner<=outer-1; ++inner) {
      if (this.dataStore[inner] > this.dataStore[inner + 1]) {
        swap(this.dataStore, inner, inner+1);
      }
    }
    console.log(this.toString());
  }
}

let numElements = 10;
let myNums = new CArray(numElements);
myNums.setData();
console.log(myNums.toString());
myNums.bubbleSort();
console.log(myNums.toString());