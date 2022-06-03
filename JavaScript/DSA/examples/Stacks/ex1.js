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

// 1. 주어진 표현식에 괄호가 짝을 맞추고 있는지 찾고, 짝이 맞지 않다면 해당 위치를 리턴하는 함수를 만들어라.
function isParenthesesBalenced(expr) {
    let parentheses = new Stack();
    for (let i=0; i<expr.length; ++i) {
        if (expr[i] == "(") {
            parentheses.push(i);
        } else if (expr[i] == ")") {
            if (parentheses) parentheses.pop();
            else return parentheses.peek();
        }
    }
    if (parentheses.length()) return parentheses.peek();
    return 'it is balanced!';
}
let testExpr =`2.3 + 23 / 12 + (3.14159 * .24`;
console.log(isParenthesesBalenced(testExpr));