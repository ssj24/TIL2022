function Node(element) {
    this.element = element;
    this.next = null;
}

function LList() {
    this.head = new Node("head");
    this.curr = this.head;
    this.find = find;
    this.insert = insert;
    this.findPrevious = findPrevious;
    this.remove = remove;
    this.display = display;
    this.show = show;
    this.advance = advance;
    this.multiInsert = multiInsert;
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
    var current = typeof item == "object" ? item : this.find(item);
    newNode.next = current.next;
    current.next = newNode;
    this.curr = newNode;
}

function findPrevious(item) {
    var currNode = this.head;
    while (!(currNode.next == null) &&
        (currNode.next.element != item)) {
        currNode = currNode.next;
    }
    return currNode;
}

function remove(item) {
    var prevNode = this.findPrevious(item);
    if (!(prevNode.next == null)) {
        prevNode.next = prevNode.next.next;
        this.curr = prevNode;
    }
}

function display() {
    var currNode = this.head;
    while(!(currNode.next == null)) {
        process.stdout.write(currNode.next.element+" ");
        currNode = currNode.next;
    }
    console.log();
}

function show() {
    console.log(this.curr.element);
}

function advance(n) {
    for (let i=0; i<n; ++i) {
        if (this.curr.next != null) {
            this.curr = this.curr.next;
        } else break
    }
}

function multiInsert(...nodes) {
    for (let i=0; i<nodes.length; ++i) {
        this.insert(nodes[i], this.curr);
    }
}

var mathGrades = new LList();
mathGrades.multiInsert(95, 11, 80, 60);
mathGrades.insert(2, 80);
mathGrades.display();

// var alpha = new LList();
// alpha.insert("A", "head");
// alpha.insert("B", "A");
// alpha.insert("C", "B");
// alpha.insert("D", "C");
// alpha.insert("E", "D");
// alpha.display();
// alpha.show();
// alpha.remove("B");
// alpha.display();
// alpha.show();
// alpha.advance(2);
// alpha.show();