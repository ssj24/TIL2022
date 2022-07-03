function HashTable() {
  this.table = new Array(137);
  this.simpleHash = simpleHash;
  this.betterHash = betterHash;
  this.showDistro = showDistro;
  this.put = put;
  // this.get = get;
}

function simpleHash(data) {
  let total = 0;
  for (let i = 0; i < data.length; ++i) {
    total += data.charCodeAt(i);
  }
  console.log("Hash value: " + data + " -> " + total);
  return total % this.table.length;
}

function put(data) {
  const pos = this.betterHash(data);
  this.table[pos] = data;
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

const someWords = ['a11', 'beach', 'col', 'demon', 'evil', 'fan'];
const hTable = new HashTable();
for (let i=0; i<someWords.length; ++i) {
  hTable.put(someWords[i]);
}
hTable.showDistro();