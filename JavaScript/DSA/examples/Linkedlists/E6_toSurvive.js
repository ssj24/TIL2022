function Node(element) {
    this.element = element;
    this.next = null;
}

function LList() {
    this.head = new Node("head");
    this.curr = this.head;
    this.head.next = this.head;
    this.length = 0;
    this.find = find;
    this.insert = insert;
    this.findPrevious = findPrevious;
    this.remove = remove;
    this.display = display;
    this.show = show;
    this.multiInsert = multiInsert;
    this.toSurvive = toSurvive;
}

function find(item) {
    var currNode = this.head;
    while (currNode.element != item &&
        !(currNode.next.element == "head")) {
      currNode = currNode.next;
    }
    return currNode;
}

function insert(newElement, item) {
    var newNode = new Node(newElement);
    var current = typeof item == "object" ? 
                    item : this.find(item);
    newNode.next = current.next;
    current.next = newNode;
    this.curr = newNode;
    this.length++;
}

function findPrevious(item) {
    var currNode = this.head;
    while (!(currNode.next.element == "head") &&
        (currNode.next.element != item)) {
        currNode = currNode.next;
    }
    return currNode;
}

function remove(item) {
    var prevNode = this.findPrevious(item);
    if (!(prevNode.next == null) && 
        !(prevNode.next.element == "head")
    ) {
        prevNode.next = prevNode.next.next;
    }
    this.curr = prevNode;
    this.length--;
}

function display() {
    var currNode = this.head;
    while(!(currNode.next == null) &&
        !(currNode.next.element == "head")) {
        process.stdout.write(currNode.next.element+" ");
        currNode = currNode.next;
    }
    console.log();
}

function show() {
    console.log(this.curr.element);
}

function multiInsert(...nodes) {
    for (let i=0; i<nodes.length; ++i) {
        this.insert(nodes[i], this.curr);
    }
}

function toSurvive(m) {
    var currNode = this.head;
    let count = m;
    while(this.length > 2) {
        if (currNode.next.element == "head") {
            currNode = currNode.next.next;
        } else {
            currNode = currNode.next;
        }
        if (count == 1) {
            this.remove(currNode.element);
            count = m;
        } else {
            count--;
        }
    }
    this.display();
}

var people = new LList();
people.multiInsert("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z");
people.toSurvive(3);

// var alpha = new LList();
// alpha.insert("A", "head");
// alpha.insert("B", "A");
// alpha.insert("C", "B");
// alpha.display();
// alpha.remove("D");
// alpha.display();
// alpha.remove("B");
// alpha.display();