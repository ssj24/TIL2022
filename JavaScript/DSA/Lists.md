# Lists

저장할 것이 몇 개 없을 때, 리스트를 사용하면 좋다

특히 **검색할 필요가 없을 때**, **목록을 정렬할 필요가 없을 때** 유용하다



## A List ADT

list abstract data type

a list is an ordered sequence of data

리스트의 요소들을 엘리먼트(element)라고 한다

어떤 데이터 타입이든 가능하고

리스트의 크기를 미리 정하지 않아도 된다

- empty list: no elements

- length: the number of elements stored in a list. 내부적으로 listSize 변수에 저장됨

| listSize     | 리스트에 저장된 엘리먼트 갯수                |
| ------------ | -------------------------------------------- |
| pos          | 현재 위치                                    |
| length       | 리스트에 저장된 엘리먼트 갯수 리턴           |
| clear()      | 리스트의 모든 엘리먼트 삭제                  |
| toString()   | 리스트를 스트링으로 리턴                     |
| getElement() | 현 위치의 엘리먼트 리턴                      |
| insert()     | **존재하는** 엘리먼트 마지막에 엘리먼트 추가 |
| append()     | 리스트 마지막에 엘리먼트 추가                |
| remove()     | 엘리먼트 삭제                                |
| front()      | 현재 위치를 리스트 처음으로 설정             |
| end()        | 현재 위치를 리스트 마지막으로 설정           |
| prev()       | 현재 위치를 엘리먼트 하나 전으로             |
| next()       | 현재 위치를 하나 뒤로                        |
| currPos()    | 현재 위치를 리턴                             |
| moveTo()     | 현재 위치를 특정 위치로 지정                 |



> a list ADT는 리스트를 위한 저장 함수를 명시하지는 않았지만 여기서는 dataStore라는 어레이를 쓰겠다



## A List Class Implementation

```js
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


var alphas = new List();
alphas.append("A");
alphas.append("B");
alphas.append("C");
alphas.append("D");
alphas.append("E");
alphas.append("F");

alphas.front();
console.log(alphas.getElement()); // A

alphas.next();
alphas.next();
alphas.next();
alphas.prev();
console.log(alphas.getElement()); // C
```



## Iterating Through a List

List 클래스의 내부 저장 메커니즘을 참조하지 않고 리스트 내부를 이동할 수 있게 해 주는 것이 바로 반복자(iterator)

front, end, prev, next, currPos 함수가 반복자 역할을 해 준다

반복자는 단순히 리스트 엘리먼트들 사이를 이동하는 데 쓰고

추가/삭제 등의 기능과 엮지 않는 것이 좋다

- array의 인덱스가 아니라 반복자를 사용하는 것의 장점
  1. 엘리먼트에 접근할 때 데이터 저장 구조를 걱정할 필요가 없다
  2. 반복자를 갱신하지 않고 리스트를 업데이트할 수 있다
  3. 다른 데이터 유형의 엘리먼트에 접근할 수 있는 통일된 수단을 제공한다

```js
// 0 => n
for(names.front(); names.currPos()<names.length(); names.next()) {
  print(names.getElement());
}

// n => 0
for(names.end(); names.currPos()>=0; names.prev()) {
  print(names.getElement());
}
```

현재 위치를 리스트의 0/n으로 설정한 뒤,

리스트 요소 전체를 훑을 때까지 반복을 멈추지 않는다

next()/prev()를 이용해 엘리먼트를 하나씩 이동시킨다



## A List-Based Application

vs code로 구현하면서 코드를 좀 고쳤다

- films.txt

  The Shawshank Redemption

  The Godfather

  The Godfather: Part II

  Pulp Fiction

  The Good, the Bad and the Ugly

  12 Angry Men

  Schindler’s List

  The Dark Knight

  The Lord of the Rings: The Return of the King

  Fight Club

  Star Wars: Episode V - The Empire Strikes Back

  One Flew Over the Cuckoo’s Nest

  The Lord of the Rings: The Fellowship of the Ring

  Inception

  Goodfellas

  Star Wars

  Seven Samurai

  The Matrix

  Forrest Gump

  City of God

```js
// films.txt를 읽고
// 각 줄을 하나의 엘리먼트로 하는 movies array 생성
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
```

📌 텍스트 파일을 읽는 법
read()가 안 되서 fs 사용

```js
// 영화 array에 영화 목록 저장
// var movieList = new List();
for (var i=0; i<movies.length; ++i) {
  movieList.append(movies[i]);
}

// 키오스크에 영화 목록 띄우기
function displayList(list) {
  for (list.front(); list.currPos() < list.length(); list.next()) {
    if (list.getElment() instanceof Customer) {
      console.log(list.getElement()["name"] + 
                  ", " + list.getElement()["movie"]);
    }
    // 추후 만들 Customer 오브젝트는 스트링으로 이루어진 리스트와는 달라서
    // if 구문 추가
    else {
	    console.log(list.getElment());      
    }
    if (list.currPos() == list.length()-1) return
    // list.next()가 pos가 listSize와 동일해지면 아무 작업을 하지 않아서
    // 무한 루프 현상 발생하게 되는데 그를 방지하기 위한 if 구문 추가
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

// var movies = createArr('films.txt');
// var movieList = new List();
// var customers = new List();
// for (let i = 0; i < movies.length; ++i) {
//   movieList.append(movies[i]);
// }
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
```

📌 input 받기
readline은 input 넣는 걸 안 기다려줘서 prompt-sync로..

`npm install prompt-sync`
`const prompt = require('prompt-sync')();`
`let name = propmt("What's your name?");`

📌 movies가 결과값을 받아오기까지 안 기다려줘서 main 함수를 만들어봄

```shell
Available movies:

The Shawshank Redemption
The Godfather
The Godfather: Part II
Pulp Fiction
The Good, the Bad and the Ugly
12 Angry Men
Schindler’s List
The Dark Knight
The Lord of the Rings: The Return of the King
Fight Club
Star Wars: Episode V - The Empire Strikes Back
One Flew Over the Cuckoo’s Nest
The Lord of the Rings: The Fellowship of the Ring
Inception
Goodfellas
Star Wars
Seven Samurai
The Matrix
Forrest Gump
City of God
What is your name?sujee
What movie would you like?Star Wars

Customer Rentals: 

sujee, Star Wars

Movies Now Available

The Shawshank Redemption
The Godfather
The Godfather: Part II
Pulp Fiction
The Good, the Bad and the Ugly
12 Angry Men
Schindler’s List
The Dark Knight
The Lord of the Rings: The Return of the King
Fight Club
Star Wars: Episode V - The Empire Strikes Back
One Flew Over the Cuckoo’s Nest
The Lord of the Rings: The Fellowship of the Ring
Inception
Goodfellas
Seven Samurai
The Matrix
Forrest Gump
City of God
```



## Exercise

1. 이미 리스트에 있는 엘리먼트보다 클 때만 새로운 엘리먼트를 삽입할 수 있는 함수 만들기(오름차순)
2. 이미 리스트에 있는 엘리먼트보다 작을 때만 새로운 엘리먼트를 삽입할 수 있는 함수 만들기
3. 이름과 성별을 저장하는 Person 클래스 만들기. 최소 10개 이상의 Person 오브젝트 생성하기. 같은 성별을 가진 사람들 표시하는 함수 만들기
4. 비디오 키오스크 프로그램을 수정해서 영화를 빌릴 때 대출 중인 영화 리스트에 영화를 더하고, 이 목록을 대출할 때 보여주기
5. 비디오 키오스크 프로그램에 반납 함수 만들기. 반납된 영화는 대출 중인 영화 리스트에서 지우고 대출 가능한 영화 리스트에 더하기