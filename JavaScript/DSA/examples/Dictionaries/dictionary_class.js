function Dictionary() {
    this.add = add;
    this.datastore = new Array();
    this.find = find;
    this.remove = remove;
    this.showAll = showAll;
    this.count = count;
    this.clear = clear;
}

function add(key, value) { // key가 value의 인덱스가 된다
    this.datastore[key] = value;
}

function find(key) {
    return this.datastore[key];
}

function remove(key) {
    delete this.datastore[key];
}

function showAll() {
    for (var key of Object.keys(this.datastore).sort()) {
        console.log(key + " => " + this.datastore[key]);
    }
}

function count() {
    var n = 0;
    for (var key of Object.keys(this.datastore)) {
        ++n;
    }
    return n;
}

function clear() {
    for (var key in Object.keys(this.datastore)) {
        delete this.datastore[key];
    }
}

var pbook = new Dictionary();
pbook.add("a","123");
pbook.add("b", "345");
pbook.add("c", "456");
pbook.add("f", "012");
pbook.add("d", "723");
pbook.add("g", "666");
pbook.add("e", "987");
console.log("Number of entries: " + pbook.count());
console.log("b's extension: " + pbook.find("b"));
pbook.remove("b");
pbook.showAll();
pbook.clear();
console.log("Number of entries: " + pbook.count());
