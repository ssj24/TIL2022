function seqSearch(arr, data) {
  for (let i=0; i<arr.length; ++i) {
    if (arr[i] == data) return i;
  }
  return -1;
}

function dispArr(arr) {
  for (let i=0; i<arr.length; ++i) {
    process.stdout.write(arr[i] + " ");
    if (i % 10 == 9) console.log();
    // if (i % 10 != 0) console.log();
  }
}

function findMin(arr) {
  let min = arr[0];
  let idx = 0
  for (let i=1; i<arr.length; ++i) {
    if (arr[i] < min) {
      min = arr[i];
      idx = i;
    }
  }
  return [min, idx];
}

function NMin(arr, n) {
  let nMin;
  while (n) {
    nMin = findMin(arr);
    arr.splice(nMin[1], 1);
    --n;
  }
  return nMin;
}

let nums = [];
for (let i=0; i<10000; ++i) {
  nums[i] = Math.floor(Math.random()*10001);
}

let n = Math.floor(Math.random() * 10000);
let nMinValue = NMin(nums, n);
console.log(`${n}th-smallest number is ${nMinValue[0]} at position ${nMinValue[1]}.`);