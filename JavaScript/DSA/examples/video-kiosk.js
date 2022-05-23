function List() {
  this.listSize = 0;
  this.pos = 0;
  this.dataStore = [];
  this.clear = clear;
  this.find = find;
  this.toString = toString;
  this.insert = insert;
  this.append = append;
  this.remove = remove;
  this.front = front;
  this.end = end;
  this.prev = prev;
  this.next = next;
  this.length = length;
  this.currPos = currPos;
  this.moveTo = moveTo;
  this.getElement = getElement;
  this.length = length;
  this.contains = contains;
}

function append(element) {
  this.dataStore[this.listSize++] = element;
  // [this.listSize++] 인덱스를 마지막으로 설정했을 뿐 아니라 
  // listSize도 하나 커지게 됐다
}

// remove: find - remove - adjust the space
function find(element) {
  for (var i=0; i<this.dataStore.length; ++i) {
    if (this.dataStore[i] == element) { // 
      return i;
    }
  }
  return -1; // element is not found
}
function remove(element) {
  var foundAt = this.find(element);
  if (foundAt > -1) {
    this.dataStore.splice(foundAt, 1);
    --this.listSize; // listSize 줄이기
    return true;
  }
  return false;
}

function length() {
  return this.listSize;
}

function toString() {
  return this.dataStore; 
  // 이렇게 하면 사실 스트링이 아니라 array를 리턴하긴 하는데..
  // 이 예시에서는 그냥 이 정도로만 하는 걸로
}

function insert(element, after) {
  var insertPos = this.find(after); // after라는 이미 리스트에 존재하는 엘리먼트를 명시해야 한다. 이 after 엘리먼트 다음에! 새로운 엘리먼트 추가하는 것
  if (insertPos > -1) {
    this.dataStore.splice(insertPos+1, 0, element);
    ++this.listSize;
    return true;
  }
  return false;
}

function clear() {
  delete this.dataStore; // dataStore array를 지우고
  this.dataStore = []; // 다시 새로운 비어 있는 array를 할당해준 것
  this.listSize = this.pos = 0;
}

function contains(element) {
  for (var i=0; i<this.dataStore.length; ++i) {
    if (this.dataStore[i] == element) {
      return true;
    }
  }
  return false;
}

// traversing a list
function front() {
  this.pos = 0;
}
function end() {
  this.pos = this.listSize - 1;
}
function prev() {
  if (this.pos > 0) {
    --this.pos;
  }
}
function next() {
  if (this.pos < this.listSize-1) {
    ++this.pos;
  }
}
function currPos() {
  return this.pos;
}
function moveTo(position) {
  this.pos = position;
}
function getElement() {
  return this.dataStore[this.pos];
}

const fs = require('fs').promises;

async function createArr(file) {
  // var arr = read(file).split("\n");
  var arr = (await fs.readFile(file, 'utf8')).split("\n");

  for (var i=0; i<arr.length; ++i) {
    arr[i] = arr[i].trim();
    // 각 엘리먼트 양 극단의 공백을 없앰
  }
  return arr;
}


// 영화 array에 영화 목록 저장
// var movieList = new List();
// for (var i=0; i<movies.length; ++i) {
//   movieList.append(movies[i]);
// }

// 키오스크에 영화 목록 띄우기
function displayList(list) {
  for (list.front(); list.currPos() < list.length(); list.next()) {
    if (list.getElement() instanceof Customer) {
      console.log(list.getElement()["name"] + 
                  ", " + list.getElement()["movie"]);
    }
    // 추후 만들 Customer 오브젝트는 스트링으로 이루어진 리스트와는 달라서
    // if 구문 추가
    else {
	    console.log(list.getElement());
    }
    if (list.currPos() == list.length()-1) return
  }
}

// 대출한 사람 목록 만들기
// var customers = new List();
function Customer(name, movie) {
  this.name = name;
  this.movie = movie;
}

// 영화 대출 작업: 키오스크 리스트에서 제거 - customers 리스트에 추가
function checkOut(name, movie, filmList, customerList) {
  if (filmList.contains(movie)) {
    var c = new Customer(name, movie);
    customerList.append(c);
    filmList.remove(movie);
  }
  else {
    console.log(movie + " is not available.");
  }
}

function getAnswers() {
  const prompt = require('prompt-sync')();

  let name = prompt('What is your name?');
  let movie = prompt('What movie would you like?')
  checkOut(name, movie, movieList, customers);
}
var movies, movieList, customers;

async function main(file) {
  movies = await createArr(file);
  movieList = new List();
  customers = new List();
  for await (let i of movies) {
    movieList.append(i);
  }
  console.log("Available movies: \n");
  displayList(movieList);
  getAnswers();
  // checkOut("Jane Doe", "The Matrix", movieList, customers);
  console.log("\nCustomer Rentals: \n");
  displayList(customers);
  console.log("\nMovies Now Available\n");
  displayList(movieList);
}
main("films.txt");