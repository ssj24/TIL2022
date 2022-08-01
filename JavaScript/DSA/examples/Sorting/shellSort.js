function CArray(numElements) {
  this.dataStore = [];
  this.pos = 0;
  this.numElements = numElements;
  this.insert = insert;
  this.toString = toString;
  this.clear = clear;
  this.setData = setData;
  this.swap = swap;
  this.gaps = [5,3,1];
  this.setGaps = setGaps;
  this.shellSort = shellSort;
  this.dynamicShellSort = dynamicShellSort;
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

function setGaps(arr) {
  this.gaps = arr;
}

function shellSort() {
  for (let g = 0; g < this.gaps.length; ++g) {
    for (let i = this.gaps[g]; i < this.dataStore.length; ++i) {
      let temp = this.dataStore[i];
      for (let j = i; j >= this.gaps[g] &&
            this.dataStore[j-this.gaps[g]] > temp;
            j -= this.gaps[g]) {
        this.dataStore[j] = this.dataStore[j - this.gaps[g]];
    }
    this.dataStore[j] = temp;
    console.log(this.toString());
    }
    console.log();
  }
}

function dynamicShellSort() {
  let N = this.dataStore.length;
  let h = 1;
  while (h < N/3) {
    h = 3 * h + 1;
  }
  while (h >= 1) {
    for (var i = h; i < N; i++) {
      for (var j = i; j >= h && this.dataStore[j] < this.dataStore[j-h]; j -= h) {
        swap(this.dataStore, j, j-h);
      }
    }
    h = (h-1)/3;
  }
}

let numElements = 100;
let myNums = new CArray(numElements);
myNums.setData();
console.log("Before DynamicShellsort: \n");
console.log(myNums.toString());
myNums.dynamicShellSort();
console.log("\nAfter DynamicShellsort: \n");
console.log(myNums.toString());
