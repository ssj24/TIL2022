function HashTable() {
  this.table = new Array(137);
  this.betterHash = betterHash;
  this.showDistro = showDistro;
  this.put = put;
  // this.get = get;
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

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getStuData(arr) {
  for (let i=0; i<arr.length; ++i) {
    let num = '';
    for (let j=1; j<=9; ++j) {
      num += Math.floor(Math.random()*10);
    }
    num += getRandomInt(50, 100);
    arr[i] = num;
  }
}

const numStudents = 10;
const arrSize = 97;
const idLen = 9;
const students = new Array(numStudents);
getStuData(students);
console.log("Student data: ");
for (let i=0; i<students.length; ++i) {
  console.log(students[i].substring(0, 8) + " " + students[i].substring(9));
}
console.log("\nData distribution: ")
const hTable = new HashTable();
for (let i=0; i<students.length; ++i) {
  hTable.put(students[i]);
}
hTable.showDistro();