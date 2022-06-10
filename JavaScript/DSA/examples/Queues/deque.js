function Deque() {
    this.dataStore = [];
    this.enqueue = enqueue;
    this.insert = insert;
    this.dequeue = dequeue;
    this.pop = pop;
    this.front = front;
    this.back = back;
    this.toString = toString;
    this.empty = empty;
};
function insert(el) {
    this.dataStore.unshift(el);
}

function pop() {
    return this.dataStore.pop();
}
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
        q2s += this.dataStore[i] + "";
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

function isPalindrome(word) {
    for (var i=0; i<word.dataStore.length; ++i) {
        if (word.dataStore[i] != word.dataStore.reverse()[i]) {
            return console.log(word.toString(), "is not palindrome.")
        }
    }
    return console.log(word.toString(), "is palindrome!")
};

// var d = new Deque();
// d.enqueue("a");
// d.enqueue("b");
// d.enqueue("c");
// console.log(d.toString());
// d.insert("first");
// console.log(d.toString());
// d.dequeue();
// console.log(d.toString());
// d.pop();
// console.log(d.toString());
// console.log("front", d.front());
// console.log("back", d.back());


var w = new Deque();
w.enqueue("r");
w.enqueue("a");
w.enqueue("c");
w.enqueue("e");
w.enqueue("c");
w.enqueue("a");
w.enqueue("r");
isPalindrome(w);