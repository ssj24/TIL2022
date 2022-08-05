function insertionSort(arr) {
  var temp, inner;
  for (var outer = 1; outer <= arr.length-1; ++outer) {
    temp = arr[outer];
    inner = outer;
    while (inner > 0 && (arr[inner-1] >= temp)) {
      arr[inner] = arr[inner-1];
      --inner;
    }
    arr[inner] = temp;
  }
}

function binSearch(arr, data) {
  let upperBound = arr.length - 1;
  let lowerBound = 0;
  while (lowerBound <= upperBound) {
    let mid = Math.floor((upperBound + lowerBound) / 2);
    // console.log(`current mid point is ${mid}`);
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

function dispArr(arr) {
  for (let i=0; i<arr.length; ++i) {
    process.stdout.write(arr[i] + " ");
    if (i % 10 == 9) console.log();
    // if (i % 10 != 0) console.log();
  }
}

function count(arr, data) {
	let count = 0;
  let position = binSearch(arr, data);
  if (position > -1) {
    ++count;
    for (let i=position-1; i>0; --i) {
      if (arr[i] == data) {
				++count;
      } else {
        break;
      }
    }
    for (let i=position+1; i<arr.length; ++i) {
      if (arr[i] == data) {
        ++count;
      } else {
				break;
      }
    }
  }
  return count;
}

let nums = [];
for (let i=0; i<100; ++i) {
  nums[i] = Math.floor(Math.random()*101);
}
insertionSort(nums);
dispArr(nums);
let val = Math.floor(Math.random()*101);
let retVal = binSearch(nums, val);
let occVal = count(nums, val);
console.log(`Found ${val} occurrences of ${occVal}.`);
if (retVal >= 0) {
  console.log(`Found ${val} at position ${retVal}`);
} else {
	console.log(`${val} is not in array`);
}
