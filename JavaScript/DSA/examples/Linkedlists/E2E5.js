function Node(element) {
    this.element = element;
    this.next = null;
    this.previous = null;
}

function LList() {
    this.head = new Node("head");
    this.curr = this.head;
    this.find = find;
    this.insert = insert;
    this.display = display;
    this.remove = remove;
    this.findLast = findLast;
    this.dispReverse = dispReverse;
    this.show = show;
    this.back = back;
    this.multiInsert = multiInsert;
    // this.getInput = getInput;
    // this.interactInsert = interactInsert;
}

function find(item) {
    var currNode = this.head;
    while (currNode.element != item) {
      currNode = currNode.next;
    }
    return currNode;
}

function insert(newElement, item) {
    var newNode = new Node(newElement);
    var current = typeof item == "object"? item : this.find(item);
    newNode.next = current.next;
    newNode.previous = current;
    current.next = newNode;
    this.curr = newNode;
}

function display() {
    var currNode = this.head;
    while(!(currNode.next == null)) {
        process.stdout.write(currNode.next.element+" ");
        currNode = currNode.next;
    }
    console.log();
}

function remove(item) {
    var currNode = this.find(item);
    if (!(currNode.next == null)) {
        currNode.previous.next = currNode.next;
        currNode.next.previous = currNode.previous;
        this.curr = currNode.previous;
        currNode.next = null;
        currNode.previous = null;
    }
}

function findLast() {
    var currNode = this.head;
    while (!(currNode.next == null)) {
        currNode = currNode.next;
    }
    return currNode;
}

function dispReverse() {
    var currNode = this.head;
    currNode = this.findLast();
    while (!(currNode.previous == null)) {
        process.stdout.write(currNode.element+" ");
        currNode = currNode.previous;
    }
    console.log();
}

function show() {
    console.log(this.curr.element);
}

function back(n) {
    for (let i=0; i<n; ++i) {
        if (this.curr.previous.element = "head") {
            break
        }
        else if (this.curr.previous != null) {
            this.curr = this.curr.previous;
        } else break
    }
}

function multiInsert(...nodes) {
    for (let i=0; i<nodes.length; ++i) {
        this.insert(nodes[i], this.curr);
    }
}

// const readline = require("readline");

// async function interactInsert() {
//     let count = 0;
//     let answer = "";
//     while (true) {
//         answer = await this.getInput(1);
//         console.log('111', answer)
//         if (answer) {
//             answer = await this.getInput(0);
//             console.log('222', answer)
//             this.insert(answer, this.curr);
//             count++
//         }
//         else {
//             console.log('333', answer);
//             console.log(count, "insert is completed.");
//             break
//         }
//     };
// }


// function getInput(n) {
//     let userInput = "";
//     let qString = n ? "Do you want to insert new score? (y / n)\n" : "What is the score?\n";
//     const rl = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout,
//     });
//     rl.question(qString, function (answer) {
//         console.log('first',n);
//         if (n) {
//             answer.toLowerCase();
//             if (answer == "y") userInput = 1
//             else if (answer == "n") userInput = 0
//         } else {
//             console.log('here');
//             userInput = answer;
//             console.log(userInput, "is inserted.");
//         }
//         rl.close();
//     });
//     console.log('last',userInput);
//     return userInput;
// }

var Grades = new LList();
Grades.multiInsert(95, 11, 80, 60, 90, 80, 70, 100, 95);
Grades.insert(80, Grades.curr);
Grades.display();


// var alpha = new LList();
// alpha.insert("A", "head");
// alpha.insert("B", "A");
// alpha.insert("C", "B");
// alpha.display();
// alpha.remove("B");
// alpha.show();
// alpha.display();
// alpha.dispReverse();
// alpha.show();
// alpha.back(2);
// alpha.show();