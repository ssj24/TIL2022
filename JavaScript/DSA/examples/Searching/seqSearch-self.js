function seqSearch(arr, data) {
  for (let i=0; i<arr.length; ++i) {
    if (arr[i] == data && i>(arr.length*0.2)) {
      swap(arr, i, 0);
      return true;
    } else if (arr[i] == data) return true;
  }
  return false;
}

function swap(arr, index, curIdx) {
  temp = arr[index];
  arr[index] = arr[curIdx];
  arr[curIdx] = temp;
}

let nums = [];
for (let i=0; i<10; ++i) {
  nums[i] = Math.floor(Math.random() * 11) ;
}
let val = 3;
if (seqSearch(nums, val)) {
  dispArr(nums);
  console.log(`found ${val}`);
  dispArr(nums);
} else {
  console.log(`${val} is not in array.`);
}