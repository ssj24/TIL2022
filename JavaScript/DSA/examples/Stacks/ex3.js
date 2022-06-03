function Stack() {
    this.dataStore = [];
    this.top = 0;
    this.push = push;
    this.pop = pop;
    this.peek = peek;
    // for convenience
    this.clear = clear;
    this.length = length;
    }

function push(element) {
    this.dataStore[this.top++] = element;
}
function pop() {
    return this.dataStore[--this.top];
}
function peek() {
    return this.dataStore[this.top-1];
}

function clear() {
    this.top = 0;
}
function length() {
    return this.top;
}
// 3. 하리보 젤리를 순서대로 꺼낼 수 있는 기계가 있다.
// 빨강, 노랑, 하양 젤리가 들어있는데 노랑 젤리를 좋아하지 않아서 꺼내고 싶지 않다.
// 스택을 사용하여(여러 개 가능) 기계 안의 젤리 순서를 바꾸지 않고 노랑을 없애는 함수를 만들어라.
function dispenser(stack) {
    while (stack.peek() == 'y') {
        stack.pop();
    }
    return stack.pop();
}
var jellys = new Stack();
jellys.push('r');
jellys.push('w');
jellys.push('y');
jellys.push('y');
jellys.push('w');
jellys.push('y');
jellys.push('r');
jellys.push('y');

console.log(dispenser(jellys)); // r
console.log(dispenser(jellys)); // w
console.log(dispenser(jellys)); // w
