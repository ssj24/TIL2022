const fs = require('fs');

const words = fs.readFileSync("words.txt", 'utf8').split(" ");

function seqSearch(arr, data) {
  for (let i = 0; i < arr.length; ++i) {
    if (arr[i] == data) {
      return i;
    }
  }
  return -1;
}

function binSearch(arr, data) {
  let upperBound = arr.length-1;
  let lowerBound = 0;
  while (lowerBound <= upperBound) {
    let mid = Math.floor((upperBound + lowerBound) / 2);
    if (arr[mid] < data) {
      lowerBound = mid + 1;
    } else if (arr[mid] > data) {
      upperBound = mid - 1;
    } else {
      return mid;
    }
  }
  return -1;
}

function insertionSort(arr) {
let temp, inner;
for (let outer = 1; outer <= arr.length-1; ++outer) {
  temp = arr[outer];
  inner = outer;
  while (inner > 0 && (arr[inner-1] >= temp)) {
    arr[inner] = arr[inner-1];
    --inner;
  }
  arr[inner] = temp;
}
}

let word = "rhetoric";

// let startS = new Date().getTime();
// let positionS = seqSearch(words, word);
// let stopS = new Date().getTime();
// let elapsedS = stopS - startS;
// if (positionS >= 0) {
//   console.log("Found " + word + " at position " + positionS + ".");
//   console.log("Sequential search took " + elapsedS + " milliseconds.");
// } else {
//   console.log(word + " is not in the file.");
// };

insertionSort(words);
let startB = new Date().getTime();
let positionB = binSearch(words, word);
let stopB = new Date().getTime();
let elapsedB = stopB - startB;
if (positionB >= 0) {
  console.log("Found " + word + " at position " + positionB + ".");
  console.log("Binary search took " + elapsedB + " milliseconds.");
} else {
  console.log(word + " is not in the file.");
};

