function Queue() {
    this.dataStore = [];
    this.enqueue = enqueue;
    this.dequeue = dequeue;
    this.front = front;
    this.back = back;
    this.toString = toString;
    this.empty = empty;
};

function enqueue(el) {
    this.dataStore.push(el);
};

function dequeue() {
    return this.dataStore.shift();
};

function front() {
    return this.dataStore[0];
};

function back() {
    return this.dataStore[this.dataStore.length-1];
};

function toString() {
    var q2s = "";
    for (var i=0; i<this.dataStore.length; ++i) {
        q2s += this.dataStore[i] + "\n";
    }
    return q2s;
};

function empty() {
    if (this.dataStore.length == 0) {
        return true;
    } else {
        return false;
    }
};

//-----------------------sort----------------------
function distribute(nums, queues, n, digit) {
    for (var i=0; i<n; ++i) {
        if (digit == 1) {
            queues[nums[i]%10].enqueue(nums[i]);
        } else { // 10의 자리
            queues[Math.floor(nums[i] / 10)].enqueue(nums[i]);
        }
    }
}

function collect(queues, nums) {
    var i = 0;
    for (var digit=0; digit<10; ++digit) {
        while (!queues[digit].empty()) {
            nums[i++] = queues[digit].dequeue();
        }
    }
}

// function displayArray(arr) {
//     for (var i=0; i<arr.length; ++i) {
//         console.log(arr[i], " ");
//     }
// }

var queues = [];
for (var i=0; i<10; ++i) {
    queues[i] = new Queue();
}
var nums = [];
for (var i=0; i<10; ++i) {
    nums[i] = Math.floor(Math.floor(Math.random() * 101));
}
console.log("before: ")
console.log(nums.toString());
distribute(nums, queues, 10, 1);
collect(queues, nums);
distribute(nums, queues, 10, 10);
collect(queues, nums);
console.log("\nAfter radix sort: ");
console.log(nums.toString());