function Queue() {
    this.dataStore = [];
    this.enqueue = enqueue;
    this.dequeue = dequeue;
    this.front = front;
    this.back = back;
    this.toString = toString;
    this.empty = empty;
    this.count = count;
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

function count() {
    return this.dataStore.length;
}

function Dancer(name, sex) {
    this.name = name;
    this.sex = sex;
}

const fs = require('fs').promises;

async function getDancers(males, females) {
  var names = (await fs.readFile('dancers.txt', 'utf8')).split("\n");

  for (var i=0; i<names.length; ++i) {
    names[i] = names[i].trim();
  }
  for (var i=0; i<names.length; ++i) {
      var dancer = names[i].split(" ");
      var sex = dancer[0];
      var name = dancer[1];
      if (sex == "F") {
          females.enqueue(new Dancer(name, sex));
      } else {
          males.enqueue(new Dancer(name, sex));
      }
  }
}

function dance(males, females) {
    console.log("new partners will come in! \n");
    while (!females.empty() && !males.empty()) {
        person = females.dequeue();
        console.log("Female dancer ", person.name);
        person = males.dequeue();
        console.log("Male dancer ", person.name, "\n");
    }
    return console.log("no more partners!");
};

var maleDancers = new Queue();
var femaleDancers = new Queue();
getDancers(maleDancers, femaleDancers);
setTimeout(function() {
    if (maleDancers.count() > 0) {
        console.log("There are ", maleDancers.count(), " male dancers watiting to dance.");
    };
    if (femaleDancers.count() > 0) {
        console.log("There are ", femaleDancers.count(), " female dancers watiting to dance.");
    };
    dance(maleDancers, femaleDancers);
    if (!femaleDancers.empty()) {
        console.log("female dnacer", femaleDancers.front().name + " is waiting.");
    };
    if (!maleDancers.empty()) {
        console.log("male dnacer", maleDancers.front().name + " is waiting.");
    };
}, 100);