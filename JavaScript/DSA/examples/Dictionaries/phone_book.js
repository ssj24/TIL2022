function Dictionary() {
    this.add = add;
    this.datastore = new Array();
    this.find = find;
    this.remove = remove;
    this.show = show;
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
    console.log(key, 'is deleted')
}

function show(key) {
    console.log(key+": " + this.datastore[key]);
}

function showAll() {
    for (var key of Object.keys(this.datastore).sort()) {
        console.log(key + " => " + this.datastore[key]);
    }
    if (!(this.count())) console.log('this dict is empty.')
}

function count() {
    var n = 0;
    for (var key of Object.keys(this.datastore)) {
        ++n;
    }
    return n;
}

function clear() {
    for (var key of Object.keys(this.datastore)) {
        delete this.datastore[key];
    }
}

var num_book = new Dictionary();

const fs = require('fs');
const data = fs.readFileSync("phone_book.txt", 'utf8');
for (var i of data.split("\n")) {
    let name = i.split(' ')[0];
    let number = i.split(' ')[1];
    num_book.add(name, number);
}
num_book.show('aaa');
num_book.showAll();
num_book.remove('aaa');
num_book.showAll();
num_book.clear();
num_book.showAll();

