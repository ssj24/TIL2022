function Node(element) {
    this.element = element;
    this.next = null;
}

function LList() {
    this.head = new Node("head");
    this.head.next = this.head;
    this.find = find;
    this.insert = insert;
    this.findPrevious = findPrevious;
    this.remove = remove;
    this.display = display;
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
    var current = this.find(item);
    newNode.next = current.next;
    current.next = newNode;
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

var alpha = new LList();
alpha.insert("A", "head");
alpha.insert("B", "A");
alpha.insert("C", "B");
alpha.display();
alpha.remove("D");
alpha.display();
alpha.remove("B");
alpha.display();