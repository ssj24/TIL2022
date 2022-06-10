function Queue() {
    this.dataStore = [];
    this.enqueue = enqueue;
    this.dequeue = dequeue;
    this.front = front;
    this.back = back;
    this.toString = toString;
    this.empty = empty;
};

function enqueue(el) {
    this.dataStore.push(el);
};

// 우선순위 코드가 낮은 엘리먼트가 가장 빨리 처리될 수 있게 재정의
// function dequeue() {
//     var priority = this.dataStore[0].code;
//     var target = 0;
//     for (var i=1; i<this.dataStore.length; ++i) {
//         if (this.dataStore[i].code < priority) {
//             priority = this.dataStore[i].code;
//             target = i;
//         }
//     }
//     return this.dataStore.splice(target, 1);
// };
// 우선순위 코드가 높은 엘리먼트가 가장 빨리 처리될 수 있게 재정의
function dequeue() {
    var priority = this.dataStore[0].code;
    var target = 0;
    for (var i=1; i<this.dataStore.length; ++i) {
        if (this.dataStore[i].code > priority) {
            priority = this.dataStore[i].code;
            target = i;
        }
    }
    return this.dataStore.splice(target, 1);
};

function front() {
    return this.dataStore[0];
};

function back() {
    return this.dataStore[this.dataStore.length-1];
};

// patient를 위해 재정의
function toString() {
    var q2s = "";
    for (var i=0; i<this.dataStore.length; ++i) {
        q2s += this.dataStore[i].name + " code: "
               + this.dataStore[i].code + "\n";
    }
    return q2s;
};

function empty() {
    if (this.dataStore.length == 0) {
        return true;
    } else {
        return false;
    }
};

// code는 우선순위를 나타내는 integer
function Patient(name, code) {
    this.name = name;
    this.code = code;
}

// var ed = new Queue();
// var p = new Patient("Amy", 5);
// ed.enqueue(p);
// p = new Patient("Beak", 4);
// ed.enqueue(p);
// p = new Patient("Chloe", 6);
// ed.enqueue(p);
// p = new Patient("David", 1);
// ed.enqueue(p);
// p = new Patient("Earl", 1);
// ed.enqueue(p);
// p = new Patient("Finn", 5);
// ed.enqueue(p);
// console.log(ed.toString());

// var seen = ed.dequeue();
// console.log("Patient being treated: " + seen[0].name);
// console.log("Patients waiting to be seen: ");
// console.log(ed.toString());
// seen = ed.dequeue();
// console.log("Patient being treated: " + seen[0].name);
// console.log("Patients waiting to be seen: ");
// console.log(ed.toString());
// seen = ed.dequeue();
// console.log("Patient being treated: " + seen[0].name);
// console.log("Patients waiting to be seen: ");
// console.log(ed.toString());
// seen = ed.dequeue();
// console.log("Patient being treated: " + seen[0].name);
// console.log("Patients waiting to be seen: ");
// console.log(ed.toString());

// 우선순위 큐 예시를 변형하여 사용자가 ED 내 작업을 조정할 수 있도록 해 보자. 메뉴 시스템을 만들어서 1) 환자가 ED에 들어옴 2) 환자가 진료를 봤음 3) 대기 환자 띄우기를 선택할 수 있도록 만들자

function menu(num, p = {}) {
    if (num == 1) {
        ed.enqueue(p);
    } else if (num == 2) {
        seen = ed.dequeue();
        console.log("Patient being treated:", seen[0].name);
    } else if (num == 3) {
        console.log(`Patients waiting to be seen:\n${ed.toString()}`);
    }
}

var ed = new Queue();
var seen = {};
var patient = new Patient("Amy", 5);
menu(1, patient);
patient = new Patient("Beak", 4);
menu(1, patient);
patient = new Patient("Chloe", 6);
menu(1, patient);
patient = new Patient("David", 1);
menu(1, patient);
patient = new Patient("Earl", 1);
menu(1, patient);
patient = new Patient("Finn", 5);
menu(1, patient);
menu(2);
menu(2);
menu(3);