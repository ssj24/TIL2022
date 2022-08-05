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
  for (let i=1; i<arr.length; ++i) {
    if (arr[i] < min) min = arr[i];
  }
  return min;
}

function findMax(arr) {
  let max = arr[0];
  for (let i=1; i<arr.length; ++i) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}


let nums = [];
for (let i=0; i<100; ++i) {
  nums[i] = Math.floor(Math.random()*101);
}
dispArr(nums);
let num = Math.floor(Math.random()*100);
let pos = seqSearch(nums, num);
if (pos > -1) {
  console.log(`num ${num} is in the array at ${pos}.`);
} else {
  console.log(`num ${num} is not in the array.`);
}
let minValue = findMin(nums);
let maxValue = findMax(nums);
console.log(`minimum value of nums is ${minValue},\nmaximum value of nums is ${maxValue}.`);