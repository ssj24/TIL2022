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

var q = new Queue();
q.enqueue("a");
q.enqueue("b");
q.enqueue("c");
console.log(q.toString());
q.dequeue();
console.log(q.toString());
console.log("front", q.front());
console.log("back", q.back());
