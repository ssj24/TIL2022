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

// 이미 리스트에 있는 엘리먼트보다 클 때만 새로운 엘리먼트를 삽입할 수 있는 함수 만들기(오름차순)
function largerInsert(list, element) {
  let max = list.getElement(list[0]);
  for (let i=0; i<list.length(); ++i) {
    if (list[i] > max) max = list[i];
  }
  if (element > max) {
    list.append(element);
    return;
  }
  else console.log('TOO SMALL!')
}

// 이미 리스트에 있는 엘리먼트보다 작을 때만 새로운 엘리먼트를 삽입할 수 있는 함수 만들기
function smallerInsert(list, element) {
  let min = list.getElement(list[0]);
  for (let i=0; i<list.length(); ++i) {
    if (list[i] < min) min = list[i];
  }
  if (element < min) {
    list.append(element);
    return;
  }
  else console.log('TOO LARGE!')
}

// 이름과 성별을 저장하는 Person 클래스 만들기. 최소 10개 이상의 Person 오브젝트 생성하기. 같은 성별을 가진 사람들 표시하는 함수 만들기
function Person(name, gender) {
  this.name = name;
  this.gender = gender;
}
function sameGender(list, name) {
  let result = new List();
  for (let i=0; i<list.length(); ++i) {
    if (name.gender == list.dataStore[i].gender) {
      result.append(list.dataStore[i].name);
      console.log('hhh');
    }
  }
  return result;
}


var people = new List();
var aaa = new Person('aaa', 'F');
people.append(aaa);
var bbb = new Person('bbb', 'M');
people.append(bbb);
var ccc = new Person('ccc', 'F');
people.append(ccc);
var ddd = new Person('ddd', 'F');
people.append(ddd);
var eee = new Person('eee', 'F');
people.append(eee);
var fff = new Person('fff', 'F');
people.append(fff);
var ggg = new Person('ggg', 'F');
people.append(ggg);
var hhh = new Person('hhh', 'F');
people.append(hhh);
var iii = new Person('iii', 'F');
people.append(iii);
var jjj = new Person('jjj', 'F');
people.append(jjj);

// console.log(people.dataStore);
var result = sameGender(people, bbb);
console.log(result.dataStore);