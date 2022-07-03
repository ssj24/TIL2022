function HashTable() {
  this.table = new Array(137);
  this.simpleHash = simpleHash;
  this.betterHash = betterHash;
  this.showDistro = showDistro;
  this.put = put;
  this.get = get;
  this.buildChains = buildChains;
}

function put(key, data) {
  const pos = this.betterHash(key);
  let index = 0;
  if (this.table[pos][index] == undefined) {
    this.table[pos][index + 1] = data;
    ++index;
  }
  else {
    while (this.table[pos][index] != undefined) {
      ++index;
    }
    this.table[pos][index] = data;
  }
}

function get(key) {
  let index = 0;
  const hash = this.betterHash(key);
  if (this.table[pos][index] = key) {
    index += 2;
    return this.table[pos][index+1];
  }
  else {
    while (this.table[pos][index] != key) {
      index += 2;
    }
    return this.table[pos][index+1];
  }
  return undefined;
}

function showDistro() {
  for (let i = 0; i < this.table.length; ++i) {
    if (this.table[i][0] != undefined) {
      console.log(i + ": " + this.table[i]);
    }
  }
}
function simpleHash(data) {
  let total = 0;
  for (let i = 0; i < data.length; ++i) {
    total += data.charCodeAt(i);
  }
  console.log("Hash value: " + data + " -> " + total);
  return total % this.table.length;
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

function buildChains() {
  for (let i=0; i<this.table.length; ++i) {
    this.table[i] = new Array();
  }
}

const hTable = new HashTable();
hTable.buildChains();
const someNames = ["David", "Jennifer", "Donnie", "Raymond",
"Cynthia", "Mike", "Clayton", "Danny", "Jonathan"];
for (let i = 0; i < someNames.length; ++i) {
hTable.put(someNames[i]);
}
hTable.showDistro();