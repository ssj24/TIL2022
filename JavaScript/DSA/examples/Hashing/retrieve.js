function HashTable() {
  this.table = new Array(137);
  this.betterHash = betterHash;
  this.showDistro = showDistro;
  this.put = put;
  this.get = get;
}

function put(key, data) {
  const pos = this.betterHash(key);
  this.table[pos] = data;
}

function get(key) {
  return this.table[this.betterHash(key)];
}

function showDistro() {
  for (let i = 0; i < this.table.length; ++i) {
    if (this.table[i] != undefined) {
      console.log(i + ": " + this.table[i]);
    }
  }
}

function betterHash(string) {
  const H = 37;
  let total = 0;
  for (let i=0; i<string.length; ++i) {
    total += H * total + string.charCodeAt(i);
  }
  total = total % this.table.length;
  if (total < 0) {
    total += this.table.length-1;
  }
  return parseInt(total);
}

const pnumbers = new HashTable();
// let name, number;
const pBook = [
  {
    name: 'weather',
    number: 1111
  },
  {
    name: 'is',
    number: 22
  },
  {
    name: 'too',
    number: 333
  },
  {
    name: 'hot',
    number: 4
  }
]
const hTable = new HashTable();
for (let i=0; i<pBook.length; ++i) {
  hTable.put(pBook[i].name, pBook[i].number);
}
hTable.showDistro();
console.log(hTable.get('too'));