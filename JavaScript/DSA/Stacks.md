# Stacks

리스트는 데이터의 순서가 중요하지 않을 때나 검색할 필요가 없을 때 유용하다.

그렇지 않다면 단순한 리스트보다는 더 복잡하지만 리스트 같은 자료 구조가 필요하다.

리스트 같은 자료 구조로 많이 쓰이는 것이 **스택**이다.

스택은 데이터가 맨 위(top)에만 더해지거나 삭제될 수 있어서 효율적인 자료 구조로 빠르고 간단하다.

표현식부터 함수 호출까지 모든 곳에서 쓰인다.

## Stack Operations

스택은 리스트의 한 쪽 끝인 탑에만 접근이 가능한 리스트다.

후입선출(LIFO, Last In First Out) 자료 구조로

빵집의 쟁반처럼 손님들은 맨 위에 있는 쟁반을 가져가고

새로 들어오는 쟁반은 위에 얹어지는 식이다.

현재 스택의 탑에 있지 않은 엘리먼트에는 접근할 수 없다. 

- push(): 스택에 엘리먼트를 더함
- pop(): 스택의 엘리먼트를 뺌. 
- peek(): 탑 엘리먼트를 제거하지 않고 그 값을 리턴함



## A Stack Implementation

```js
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
```

push 함수를 보면 this.top의 뒤에 ++가 붙어, 

사용되는 것은 현재 top이지만 사용된 뒤에는 top이 하나 더 커진다는 것을 알 수 있다. 

빈 스택에서 peek()을 호출하면 `undefined`

:pushpin: clear()가 top만 고쳤는데 왜일까..?dataStore는 왜 안 바꾸지
아마.. dataStore는 어차피 보여지지 않고
다음 push/pop/peek는 변수 top을 통해 접근할 수 있기 때문인 것 같다



## Using the Stack Class

스택을 이용해서 해결하기 좋은 몇 가지 문제를 살펴본다.

### Multiple Base Conversions

스택은 숫자의 진법을 변환할 때 쓰인다.

n: 숫자, b: 바꾸고 싶은 진법

1. n의 가장 끝 숫자는 n % b. 이 숫자를 스택에 push
2. n을 n / b로 바꾼다
3. n이 0이 될 때까지 1, 2를 반복
4. 스택이 빌 때까지 pop

```js
function mulBase(num, base) {
  var s = new Stack();
  do {
    s.push(num % base);
    num = Math.floor(num /= base);
  } while (num > 0);
  var converted = "";
  while (s.length() > 0) {
    converted += s.pop();
  }
  return converted;
}

var num = 32;
var base = 2;
var newNum = mulBase(num, base);
console.log(num, 'converted to base', base, 'is', newNum);
var num = 125;
var base = 8;
var newNum = mulBase(num, base);
console.log(num, 'converted to base', base, 'is', newNum);
```

 위 알고리즘은 2진법부터 9진법까지 통한다



### Palindromes

앞에서부터 읽어도 뒤에서부터 읽어도 같은 단어를 팰린드롬(회문)이라고 한다.

ex) `dad`,`A man, a plan, a canal: Panama`(공백과 문장 부호를 무시하면), `1001`

주어진 스트링이 팰린드롬인지 아닌지 판단하는 데 스택을 쓸 수 있다.

주어진 스트링의 문자를 왼쪽부터 하나씩 스택에 push한다.

다 넣으면 스택에는 주어진 것과는 반대의 순서로 문자가 들어있다.

하나씩 pop해서 새로운 스트링을 만든다.

주어진 스트링과 새로운 스트링을 비교해서 같으면 팰린드롬이다.

 

### Demonstrating Recursion

재귀를 보여줄 때도 스택이 쓰인다

```js
function factorial(n) {
  if (n === 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}
console.log(factorial(5)); // 120
```

이것을 스택을 이용해서 보여주자면..

```js
function fact(n) {
  var s = new Stack();
  while (n > 1) {
    s.push(n--);
  }
  var product = 1;
  while (s.length() > 0) {
    product *= s.pop();
  }
  return product;
}
console.log(fact(5)); // 120
```



## Exercises

1. 주어진 표현식에 괄호가 짝을 맞추고 있는지 찾고, 짝이 맞지 않다면 해당 위치를 리턴하는 함수를 만들어라.(해당 위치를 짝이 없는 괄호의 위치라고 가정하겠다)

   ```js
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
   ```

   

2. 스택 두 개를 활용해서(하나는 피연산자, 하나는 연산자) infix 표현식을 postfix 표현식으로 바꾸고 표현식을 계산하는 함수를 만들어라.(`(a+b)*c` => `ab+c*`)

   :mega: infix to postfix?

   https://www.web4college.com/converters/infix-to-postfix-prefix.php

   - infix: 보통의 표현식. a + b

   - postfix: 연산자가 피연산자 뒤에 나옴. ab+

   - prefix: 피연산자가 연산자 뒤에 나옴. +ab

   - 변환 알고리즘

     1. 입력된 스트링을 앞에서부터 훑다가
     2. 피연산자면 결과 스택에 넣고
     3. 연산자고 연산자 스택이 비어 있다면 연산자 스택에 넣는다
     4. 3에서 연산자 스택이 비어 있지 않다면 아래와 같은 가능성이 있다
        -  if the precedence of scanned operator is greater than the top most operator of operator's stack, push this operator into operand's stack
        - if the precedence of scanned operator is less than or equal to the top most operator of operator's stack, pop the operators from operand's stack untill we find a low precedence operator thatn the scanned character. never pop out ('(' or ')') whatever may be the precedence level of scanned character.
        - if the character is opening round bracket('('), push it into operator's stack
        - if the character is closing round bracket(')'), pop out operators from operator's stack until we find an opening bracket('(')
        - now pop out all the remaining operators from the operator's stack and push into output stack

   - https://www.geeksforgeeks.org/infix-to-postfix-converter-using-javascript/

     ```js
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
     function InfixtoPostfix() {
     
     	// Postfix array created
     	var postfix = [];
     	var temp = 0;
     	push('@');
     	infixval = document.getElementById("infixvalue").value;
     
     	// Iterate on infix string
     	for (var i = 0; i < infixval.length; i++) {
     		var el = infixval[i];
     
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
     
     	// To print postfix expression in HTML
     	document.getElementById("text").innerHTML = st;
     }
     
     ```

     

   

3. 하리보 젤리를 순서대로 꺼낼 수 있는 기계가 있다. 빨강, 노랑, 하양 젤리가 들어있는데 노랑 젤리를 좋아하지 않아서 꺼내고 싶지 않다. 스택을 사용하여(여러 개 가능) 기계 안의 젤리 순서를 바꾸지 않고 노랑을 없애는 함수를 만들어라.

   ```js
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
   ```

   