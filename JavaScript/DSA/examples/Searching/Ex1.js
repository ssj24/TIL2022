function seqSearch(arr, data) {
  for (let i=0; i<arr.length; ++i) {
    if (arr[i] == data) return i;
  }
  return -1;
}
function seqSearchLast(arr, data) {
  for (let i=arr.length; i>0; --i) {
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

let nums = [];
for (let i=0; i<100; ++i) {
  nums[i] = Math.floor(Math.random()*101);
}
dispArr(nums);
let num = Math.floor(Math.random()*100);
let pos = seqSearch(nums, num);
let posLast = seqSearchLast(nums, num);
if (pos > -1) {
  console.log(`num ${num} is in the array at ${pos}.`);
  console.log(`last num ${num} is in the array at ${posLast}.`);
} else {
  console.log(`num ${num} is not in the array.`);
}