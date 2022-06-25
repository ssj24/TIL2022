function Dictionary() {
    this.add = add;
    this.addCount = addCount;
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

function addCount(key) {
    if (this.count()) {
        if (Object.keys(this.datastore).includes(key)) {
            this.datastore[key]++;
        } else {
            this.datastore[key] = 1;
        }
    } else {
        this.datastore[key] = 1;
    }
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

function parseText(D, s) {
    for (var i of s.split(' ')) {
        console.log(i);
        D.addCount(i);
    }
}
var words = new Dictionary();
var text = "the brown fox jumped over the blue fox";
parseText(words, text);
words.showAll();