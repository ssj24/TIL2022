function CArray(numElements) {
  this.dataStore = [];
  this.pos = 0;
  this.numElements = numElements;
  this.insert = insert;
  this.toString = toString;
  this.clear = clear;
  this.setData = setData;
  this.swap = swap;
  this.mergeSort = mergeSort;
  this.mergeArrays = mergeArrays;

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

function mergeSort(arr) {
  if (arr.length < 2) return;
  let step = 1;
  let left, right;
  while (step < arr.length) {
    left = 0;
    right = step;
    while(right + step <= arr.length) {
      mergeArrays(arr, left, left+step, right, right+step);
      left = right + step;
      right = left + step;
    }
    if (right < arr.length) {
      mergeArrays(arr, left, left+step, right, arr.length);
    }
    step *= 2;
  }
}

function mergeArrays(arr, startLeft, stopLeft, startRight, stopRight) {
  const rightArr = new Array(stopRight - startRight + 1);
  const leftArr = new Array(stopLeft - startLeft + 1);
  let k = startRight;
  for (let i=0; i<(rightArr.length - 1); ++i) {
    rightArr[i] = arr[k];
    ++k;
  }
  k = startLeft;
  for (let i=0; i<(leftArr.length - 1); ++i) {
    leftArr[i] = arr[k];
    ++k;
  }
  rightArr[rightArr.length-1] = Infinity;
  leftArr[leftArr.length-1] = Infinity;
  let m = 0;
  let n = 0;
  for (let i=startLeft; k<stopRight; ++k) {
    if (leftArr[m] <= rightArr[n]) {
      arr[i] = leftArr[m];
      m++;
    } else {
      arr[i] = rightArr[n];
      n++;
    }
  }
  console.log("left array: ", leftArr);
  console.log("right array: ", rightArr);
}

let nums = [6, 10, 1, 9, 4, 8, 2, 7, 5];
mergeSort(nums);
console.log(nums);

// 데이터를 반으로 쪼갠다
function splitData(aData){
    if(aData.length < 2) {
        return aData;
    }
 
    var nMiddleIndex = Math.floor(aData.length / 2),
        aLeft = aData.slice(0, nMiddleIndex),
        aRight = aData.slice(nMiddleIndex, aData.length);
    
    // 재귀로 리스트를 분할한다.
    return mergeData(splitData(aLeft), splitData(aRight));
}
 
// 데이터를 머지한다
function mergeData(aLeft, aRight){
    var aResult = [];
    
    while(aLeft.length && aRight.length){
        if(aLeft[0] <= aRight[0]){
            aResult.push(aLeft.shift());
        }else{
            aResult.push(aRight.shift());
        }    
    }
 
    while(aLeft.length){
        aResult.push(aLeft.shift());
    }
 
    while(aRight.length){
        aResult.push(aRight.shift());
    }
    
    return aResult;
}
 
var aData = [6,5,4,1,3,2];
console.log(splitData(aData));
