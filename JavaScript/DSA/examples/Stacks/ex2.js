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
// 2. 스택 두 개를 활용해서(하나는 피연산자, 하나는 연산자) infix 표현식을 postfix 표현식으로 바꾸고 표현식을 계산하는 함수를 만들어라.
// (`(a+b)*c` => `ab+c*`)
// function in2postfix(expr) {
//     expr = expr.replace(/\s/g, '');
//     let operands = new Stack();
//     let operators = new Stack();
//     // for (let i=0; i<expr.length; ++i) {
//     //     if (expr[i] in ['+', '-', '*', '/', '(', ')']) {
//     //         if (!operators.length()) {
//     //             operators.push(expr[i]);
//     //         } else {

//     //         }
//     //     } else operands.push(expr[i]);
//     // }

// }
// in2postfix('a + b / c');


// Created an empty array
var stackarr = [];

// Variable topp initialized with -1
var topp = -1;

// Push function for pushing
// elements inside stack
function push(e) {
	topp++;
	stackarr[topp] = e;
}

// Pop function for returning top element
function pop() {
	if (topp == -1)
		return 0;
	else {
		var popped_ele = stackarr[topp];
		topp--;
		return popped_ele;
	}
}

// Function to check whether the passed
// character is operator or not
function operator(op) {
	if (op == '+' || op == '-' ||
		op == '^' || op == '*' ||
		op == '/' || op == '(' ||
		op == ')') {
		return true;
	}
	else
		return false;
}

// Function to return the precedency of operator
function precedency(pre) {
	if (pre == '@' || pre == '(' || pre == ')') {
		return 1;
	}
	else if (pre == '+' || pre == '-') {
		return 2;
	}
	else if (pre == '/' || pre == '*') {
		return 3;
	}
	else if (pre == '^') {
		return 4;
	}
	else
		return 0;
}

// Function to convert Infix to Postfix
function InfixtoPostfix(expr) {

	// Postfix array created
	var postfix = [];
	var temp = 0;
	push('@');

	// Iterate on infix string
	for (var i = 0; i < expr.length; i++) {
		var el = expr[i];

		// Checking whether operator or not
		if (operator(el)) {
			if (el == ')') {
				while (stackarr[topp] != "(") {
					postfix[temp++] = pop();
				}
				pop();
			}

			// Checking whether el is ( or not
			else if (el == '(') {
				push(el);
			}

			// Comparing precedency of el and
			// stackarr[topp]
			else if (precedency(el) > precedency(stackarr[topp])) {
				push(el);
			}
			else {
				while (precedency(el) <=
					precedency(stackarr[topp]) && topp > -1) {
					postfix[temp++] = pop();
				}
				push(el);
			}
		}
		else {
			postfix[temp++] = el;
		}
	}

	// Adding character until stackarr[topp] is @
	while (stackarr[topp] != '@') {
		postfix[temp++] = pop();
	}

	// String to store postfix expression
	var st = "";
	for (var i = 0; i < postfix.length; i++)
		st += postfix[i];

}
