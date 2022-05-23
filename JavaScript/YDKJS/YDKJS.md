[toc]

# Up&Going

## ch1

### code

프로그램은 (소스) 코드라고 불리기도 하는데 이는 컴퓨터에게 어떤 일을 할 지 말해주는 일련의 지시사항이다. 보통 코드는 텍스트 파일로 저장된다. JS는 브라우저의 콘솔에서 바로 코드를 작성할 수 있다.

지시사항을 유효하게 하는 규칙을 컴퓨터 언어라고 한다. 

### statements

컴퓨터 언어에서 특정한 일을 수행하기 위한 워드, 숫자, 연산자 등의 집합을 statement라고 한다.

## ch2

### Values&Types

JS에는 typed variable은 없지만 typed value는 있다.

- built-in types
  - string
  - number
  - boolean
  - null, undefined
  - object
  - symbol(ES6~)

`typeof` => 해당 값의 타입을 알려준다.

```js
var a;
typeof a; // "undefined"

a = "hello world"
typeof a; // "string"

a = null;
typeof a; // "object"

a = undefined;
typeof a; // "undefined"

a = { b: "c" };
typeof a; // "object"
```

typeof가 리턴하는 값은 내장된 타입 7가지 종류로 한정된다. 그렇지만 object가 아닌 `"object"`처럼 스트링 값으로 리턴한다. 

위의 예시를 통해 알 수 있듯이 typeof a는 a의 타입을 알려주는 것이 아니라 a가 현재 가지고 있는 값의 타입을 알려준다. **value만이! JS에서 타입을 가질 수 있다.** 

typeof null은 특이 케이스로 "object"를 리턴한다. 버그지만 오래된 버그니까 그냥 이렇게 외우자.

변수에 아무 값도 넣지 않았을 때, undefined라고 명시했을 때, 아무 값도 리턴하지 않는 함수, void 연산자처럼 특정한 경우에만 undefined 값을 가질 수 있다.

#### Objects

object 타입은 복합적인 값으로 각자 다른 타입을 가질 수 있는 속성(property)을 만들 수 있다. 속성은 이름을 붙인 공간이다.

```JS
var obj = {
	a: "hello world",
	b: 42,
	c: true
};
```

속성은 .이나 []로 접근할 수 있다. `obj.a`, `obj[b]`

.이 쓰기 더 쉽지만 []는 속성의 이름에 특별한 문자가 들어있을 때 유용하다. `obj["hello world!"]`. 이 때, "hello world!"를 키라고도 부른다. [] 접근법은 변수나 스트링 문법을(".."나 '..') 필요로 한다. 

```JS
var obj = {
	a: "hello world",
	b: 42
};

var b = "a";

obj[b];			// "hello world"
obj["b"];		// 42
```

JS에서 array와 function은 특별한 종류의 object 타입이라고 볼 수 있다.

##### Arrays

어레이는 속성으로 이름 붙인 특정 공간이 아니라 순차적으로 인덱스를 매긴 값을 가지는 오브젝트다. 

```JS
var arr = [
	"hello world",
	42,
	true
];

arr[0];			// "hello world"
arr[1];			// 42
arr[2];			// true
arr.length;		// 3

typeof arr;		// "object"
```

어레이 역시 일종의 오브젝트이기 때문에 속성을 가진다. 자동으로 가지는 length같은 속성이 있다. 

##### Functions

```JS
function foo() {
	return 42;
}

foo.bar = "hello world";

typeof foo;			// "function"
typeof foo();		// "number"
typeof foo.bar;		// "string"
```

함수 역시 오브젝트의 서브타입이지만 typeof는 "function"을 리턴한다.  함수 역시 주요 타입 중 하나로 속성을 가질 수 있음을 의미한다.

#### Comparing Values

비교 연산의 결과는 boolean

##### coercion

```JS
// explicit
var a = "42";

var b = Number( a );

a;				// "42"
b;				// 42 -- the number!

// implicit
var a = "42";

var b = a * 1;	// "42" implicitly coerced to 42 here

a;				// "42"
b;				// 42 -- the number!
```

coercion(강제 변환)은 예기치 않은 결과를 가져올 수도 있다.

##### Truthy & Falsy

boolean이 아닌 값을 boolean으로 변환시켜야 할 때, 어떤 값은 참이 되고 어떤 값은 거짓이 될까?

Falsy: ""(빈 스트링), 0|-0|NaN(넘버가 아닌 숫자), null | undefined, false

falsy가 아닌 것은 모두 참

빈 어레이나 빈 오브젝트 역시 참이다. 

##### equality

1. ==
2. ===
3. !=
4. !==

non-equality와 inequality는 다르다.

==는 강제 변환이 이루어질 수 있다는 가정 하에 값의 동일성을 확인한다. 

===는 강제 변환이 없을 때 값의 동일성을 확인한다. 단순히 값과 타입을 체크한다는 말은 부정확하다. strict equality라고도 불린다.

"42" == 42 -> true(implicit coercion)

"42" === 42 -> false

##### inequality



### Variables

### Conditionals

### Strict Mode

### Functions As Values

#### IIFEs

Immediately Invoked Function Expressions

#### Closure

*내가 이 책을 찾게 된 이유..!*

*클로저란 도대체 뭐고 어떤 상황에서 쓰는 걸까??*

*이 챕터에선 간단한 설명만 하고 넘어간다*

*다음 시리즈에서 자세하게 다루기로 했다.*



 가장 중요하지만 사람들이 잘 모르는 클로저.

클로저는 함수의 동작이 끝난 뒤에도 해당 함수( 변수)의 스코프를 "기억"하고 계속 해당 스코프에 접근하는 방법이라고 할 수 있다.

```javascript
function makeAdder(x) {
  function add(y) {
    return y + x;
  };
  return add;
}
// `plusOne` gets a reference to the inner `add()` function with closure over the `x` parameter of the outer `makeAdder()`
var plusOne = makeAdder(1);
var plusTen = makeAdder(10);

console.log(plusOne(3)); // 4 <= 1 + 3
plusOne(41); // 42 <= 1 + 41
plusTen(13); // 23 <= 10 + 13
// makeAdder의 인자는 x, 
// plusOne처럼 makeAdder()를 값으로 가지는
// 즉, 리턴된 add를 값으로 가지는 변수는
// 결국 plusOne(3)을 풀어서 add(3)을 호출하는 것이므로
// plusOne/plusTen의 인자는 y가 된다.
```

안쪽의 함수인 add()는 바깥쪽의 함수인 makeAdder()가 리턴할 때마다 참조된다.

add()는 makeAdder()로 넘어온 인자인 x 값을 기억할 수 있다.



*처음 이 코드를 봤을 때, 클로저를 떠나서 plusOne, plusTen이 어떻게 동작하는지 이해를 못 했는데 그냥 makeAdder()의 리턴이 add라서 add()가 되나보다*



이 코드의 클로저에 대한 설명:

1. makeAdder(1)을 호출했을 때, add()를 참조하게 된다. add()는 x의 값을 1로 기억하게 된다. 이 상태일 때 plusOne(..)이 호출되면 add는 x를 1로 두고 코드를 처리한다.
2. 마찬가지로 makeAdder(10)을 호출함으로써 x를 10으로 기억하고 있는 상태에서 plusTen(..)이 호출되는 것!

클로저를 처음 보면 이상해 보일 수도 있지만

수많은 연습을 통해 클로저를 이해하고 나면

굉장히 강력한 기술이 될 것이니

믿고 노력하자!

##### Modules

JS에서 클로저가 가장 흔하게 쓰이는 곳이 바로 모듈 패턴.

모듈은 변수나 함수의 **프라이빗** 실행 디테일을 정의한다.

(외부에는 공개되지 않는데, 바깥에서 접근 가능한 퍼블릭 API에도 역시 공개되지 않는다.)

```javascript
function User(){
  var username, password;

  function doLogin(user,pw) {
    username = user;
    password = pw;
  }

  var publicAPI = {
    login: doLogin
  };

  return publicAPI;
}

// create a `User` module instance
var fred = User();

fred.login( "fred", "1234red!@#$" );
```

User() 함수는 username과 password라는 두 변수와 doLogin() 함수를 감싸고 있는 outer scope.

흔히 쓰이는 new User()를 일부러 쓰지 않았는데,

User()는 함수이지 클래스가 아니기 때문이다.

new를 쓰는 것은 부적절하고 일종의 자원 낭비이다.

User()를 실행하면 User 모듈의 인스턴스가 만들어진다.

완전히 새로운 스코프 하나가 생기는 것이므로

그 안에 속한 변수/함수들의 카피가 만들어지게 된다.

이 인스턴스를 fred라는 변수에 할당한 뒤에

다시 User()를 호출하면

fred에 할당된 인스턴스와는 다른 새로운 인스턴스가 생성된다.



doLogin() 함수는 username과 password에 클로저를 가진다.

즉, doLogin()은 User()의 동작이 끝난 뒤에도 username과 password에 접근할 수 있다.



publicAPI는 login이라는 하나의 프로퍼티/메소드를 가진 오브젝트이다.

login은 doLogin()을 참조한다.

User()에서 publicAPI를 리턴한 것이 fred를 호출했을 때 나오는 인스턴스이다.



여기에서 User() 함수의 동작이 멈춘다.

클로저가 아니라면 내부의 변수들인 username과 password는 사라졌다고 생각해도 좋다.

하지만 login()에 클로저가 있기 때문에 여전히 접근할 수 있게 된다.



fred.login()을 호출할 수 있는 것 역시 클로저 덕분이다.

fred.login()은 doLogin()을 호출하는 것과 같은 일이다.





### this Identifier

흔히 잘못 이해되고 있는 또다른 개념이 바로 this라고 할 수 있다.

this가 객체지향패턴이라고 생각하기 쉽지만 JS에서 this는 다른 구조를 가지고 있다.



어떤 함수가 내부에 this를 참조하고 있다면, 대개는 오브젝트를 참조하는 것이다.

어떤 오브젝트를 가리키냐는 해당 함수가 어떻게 호출되었느냐에 따라 다르다.



보통 생각하는 것처럼 this가 함수 그 자체를 가리키는 게 아니라는 것이 중요하다.



```javascript
function foo() {
  console.log( this.bar );
}

var bar = "global";

var obj1 = {
  bar: "obj1",
  foo: foo
};

var obj2 = {
  bar: "obj2"
};

foo();  // "global"
obj1.foo();  // "obj1"
foo.call(obj2);  // "obj2"
new foo();  // undefined
```

this에는 네 가지 규칙이 있다. 

상기 코드의 마지막 네 줄에서 그 규칙을 볼 수 있다.

1. foo()에서 this는 논스트릭트 모드일 경우 전역 객체, 스트릭트 모드일 경우 undefined이다.

   스트릭트 모드에서는 bar 프로퍼티에 접근하려고 하면 에러가 나므로

   this.bar로 찾을 수 있는 value는 "global"이다.

2. obj1.foo()의 this는 obj1 오브젝트이다.

3. foo.call(obj2)의 this는 obj2 오브젝트이다.

4. new foo()에서 this는 새로운 오브젝트이다.

즉, this가 어디를 가리키는 지 알려면 함수가 어떻게 호출되었는지를 알아야 한다.



### Prototypes

오브젝트에 있는 프로퍼티를 참조했는데 그 프로퍼티가 존재하지 않을 때,

JavaScript는 자동으로 오브젝트의 내부 프로토타입 참조를 사용하여

찾고 있는 프로퍼티를 가진 다른 오브젝트를 찾는다.

프로퍼티가 없을 때의 대비책이라고 할 수 있다.



오브젝트에서 내부 프로토타입 참조를 통한 대비책 링크는 오브젝트가 만들어졌을 때 활성화된다.

쉽게 설명하자면 Object.create()에 내장된 유틸리티라는 것이다.



```javascript
var foo = {
  a: 42
};

// 'foo'에 연결하는 'bar' 생성
var bar = Object.create(foo);

bar.b = "hello world";

bar.b;  // "hello world"
bar.a;  // 42
```

bar 오브젝트에 a라는 프로퍼티는 존재하지 않지만

bar가 foo에 프로토타입 링크가 되어 있으므로

JavaScript는 자동으로 foo 오브젝트에서 a를 찾는 대비책을 실행한다.



대개 이 기능은 class의 상속 메카니즘을 흉내내기 위해 사용된다.



그러나 프로토타입을 사용하는 좀 더 자연스러운 방법은

"작동 위임(behavior delegation)" 패턴이 될 것이다.

링크된 오브젝트들이 서로 필요한 동작들을 대신할 수 있도록 디자인하는 것이다.



### Old&New

새로운 JS 버전을 아직 브라우저가 채택하지 않았을 때,

JS의 새로운 기능을 쓰기 위해서 사용할 수 있는 방법은

polyfilling과 transpiling이다.

#### Polyfilling

"polyfill"이라는 단어는 Remy Sharp에 의해서 만들어진 개념이다.

새로운 기능과 같은 동작을 하는 코드를 만들어서 이전 버전의 JS 환경에서도 돌아가게 하는 것을 의미한다.



예를 들면, ES6는 Number.isNaN()이라는 유틸리티를 쓴다.

 이를 polyfill하여 ES6 브라우저 여부와 상관 없이 코드에서 사용할 수 있는 유틸리티로 만들 수 있다. 

```js
if (!Number.isNaN) {
  Number.isNaN = function isNaN(x) {
    return x !== x;
  };
}
```

 if문은 ES6 브라우저일 경우 이미 존재하는 Number.isNaN() 유틸리티를 polyfill하는 것을 방지한다.

만약 존재하지 않는다면 Number.isNaN()을 정의한다.



모든 기능이 완벽하게 polyfill할 수 있는 것은 아니다.

조금씩 변화를 줘야할 때도 있다.



이미 존재하고 있는 polyfill들은 아래 링크에서 확인할 수 있다.

ES5-Shim (https://github.com/es-shims/es5-shim) 

ES6-Shim (https://github.com/es-shims/es6-shim).

#### Transpiling

언어에 추가된 새로운 문법을 polyfill할 수는 없다.

이전 브라우저에서 새로운 문법은 unrecognized/invalid 에러를 뿜게 될 것이다.



이 때 선택할 수 있는 방법이 코드를 대등한 내용의 예전 코드로 바꾸는 것이다.

이를 transforming과 compiling을 합쳐서 transpiling이라고 한다.



코드 린터나 미니파이어처럼 빌드할 때 transfiler를 적용하면 된다.



그냥 이전 문법으로 코드를 작성하면 된다고 생각할 수도 있지만 그것과는 다르다.

새로운 문법을 사용함으로써 읽기 쉽고 유지하기 쉬운 코드를 쓸 수 있고,

최신의 문법이 최적화를 가져오기 때문이다.



ES6의 새로운 기능인 함수인자의 기본값이다.

```js
function foo(a = 2) {
  console.log(a);
}

foo();  // 2
foo(42);  //42
```

이를 transpile하면 다음과 같다.

```js
function foo() {
  var a = arguments[0] !== (void 0) ? arguments[0] : 2;
  console.log(a);
}
```

transpile한 코드를 보면 작동 원리가 잘 보인다.



추천하는 transpiler는 다음과 같다.

* Babel (https://babeljs.io) (formerly 6to5): Transpiles ES6+ into ES5
* Traceur (https://github.com/google/traceur-compiler): Transpiles ES6, ES7, and beyond into ES5 



### Non-JavaScript

대부분의 JS는 브라우저 같은 환경에서 작동하도록 쓰여진다.

코드가 JS에 의해서 직접적으로 통제되는 것이 아니다.



가장 흔한 JS가 아닌 JS는 DOM API다.

```js
var el = document.getElementById("foo");
```

브라우저에서 코드가 돌아갈 때 document 변수는 전역 변수로 존재한다.

JS 엔진에서 제공하는 변수가 아니다.

보통의 JS 오브젝트와 비슷해보이지만 그와는 다르다.

특별한 오브젝트로 보통 호스트 오브젝트로 불린다.

getElementById()는 DOM의 내장된 메소드다.



input/output(I/O)도 JS의 통제를 받지 않는다.

alert()나 console.log()도 브라우저의 기능이다.



# SCOPE&CLOSURES

## What is Scope?

변수에 값을 저장하고, 저장한 값을 불러내서 변형할 수 있으면 프로그램에 `state`를 줄 수 있다. state가 없는 프로그램은 제한된 기능만 사용할 수 있다.

- 변수는 어디에 저장될까?
- 프로그램은 어떻게 변수를 찾을까?
- 프로그램은 어떤 때에 변수를 필요로 할까?

변수를 저장하고 찾기 위해 필요한 규칙들을 Scope라고 한다.

### Compiler Theory

자바스크립트는 동적언어이자 인터프리터 언어로 분류되지만 사실 자바스크립트는 컴파일 언어다.

다른 컴파일 언어들처럼 사전에 완벽히 컴파일되거나 배포 시스템에 의해 컴파일되는 언어는 아니지만 말이다.

전통적인 언어 컴파일러와 상당히 흡사한 과정을 거친다.

컴필레이션이라고 부르는 실행 전에 밟는 세 가지 단계가 있다.

1. Tokenizing/Lexing

   글자들을 의미 있는 조각으로 즉, 토큰으로 쪼갠다.

   ex) var a = 2;를 예시로 들자면 var, a, =, 2, ;로 쪼갤 수 있을 것이다. 공백은 토큰에 포함이 될 수도 그렇지 않을 수도 있다.(의미 여부에 따라 다름) 토크나이징과 렉싱은 학문적으로 미묘하게 다르다. 토큰이 stateless이냐 stateful이냐에 따라 다르다.

2. Parsing: an array of tokens ⇒ a tree of nested elements

   각 엘리먼트는 모여서 프로그램의 문법적 구조를 나타낸다. 이 트리를 AST(Abstract Syntax Tree)라고 부른다.

3. Code-Generation: AST ⇒ executable code

JS는 이 세 단계보다는 좀 더 복잡한 과정을 거친다. 예를 들면, 파싱과 코드 제너레이션 과정에서 실행 효율을 위한 최적화 과정같은 것이 있다. 다만 실행 전에 빌드 과정을 거치는 것이 아니기 때문에 최적화를 위해 많은 시간을 투자할 수 없다.

JS의 컴파일은 코드가 실행되기 몇 ms 전에 이루어진다.

### Understanding Scope

#### The Cast

var a = 2;라는 프로그램을 실행하기 위해 필요한 것들은 무엇일까?

1. engine: 컴파일과 실행을 시작하고 끝내는 주체
2. compiler: 파싱과 코드 제너레이션 등 힘든 일을 한다.
3. scope: 선언된 식별자(변수) 리스트를 만들고 유지/보수한다.

#### Back & Forth

엔진처럼 생각하는 것이 중요하다. var a = 2;를 하나의 statement라고 생각하겠지만 엔진의 관점에서는 그렇지 않다. 엔진은 이 문장에서 두 가지 statement를 본다. 하나는 컴파일러가 컴파일 과정에서 처리할 문장이고 다른 하나는 엔진이 실행 과정에서 처리할 문장이다.

컴파일러가 하는 첫 번째 일은 렉싱으로 코드를 토큰화하는 것이다.

var a를 본 컴파일러는 스코프에게 a라는 변수가 있는지 물어본다. 만약 있다면 이 선언을 무시하고 지나간다. 없다면 스코프에게 새로운 변수를 선언하고 a라고 이름 붙이라고 한다.

a = 2를 엔진이 실행할 수 있는 코드로 만든다. 코드 엔진은 스코프에게 a라는 변수가 현재 스코프에서 접근 가능하냐고 묻는다. 가능하다면 그 변수를 쓰고 없다면 다른 스코프를 찾는다.

만약 엔진이 결국 변수를 찾아낸다면 거기에 2를 할당하고 없다면 에러를 뿜는다.

#### Compiler Speak

할당 연산의 방향에 따른 LHS(left), RHS(right)

만약 변수가 왼쪽에 온다면 LHS, 오른쪽에 온다면 RHS

LHS는 값을 할당하기 위한 변수 컨테이너를 찾는다면

RHS는 해당 변수에 할당된 값을 찾아오는 데 쓰인다. (console.log(a);)

### Nested Scope

스코프는 대개 하나만 있지 않다. 블락 혹은 함수는 다른 블락 혹은 함수에 네스트되어 있고 스코프 역시 다른 스코프 안에 네스트되어 있다. 만약 현재 스코프에서 변수를 찾지 못한다면 엔진은 이 스코프를 감싸는 스코프에게 물어보고 계속 올라가다 보면 전역 스코프(global scope)까지 갈 수 있다. 전역 스코프에도 없으면 에러..

### Errors

LHS와 RHS는 변수가 선언되지 않았을 때의 대처 방식이 다르다.

```jsx
function foo(a) {
	console.log( a + b );
	b = a;
}

foo( 2 );
```

RHS가 b 때문에 처음 조회를 할 때 b는 발견되지 않을 것이다. 스코프에서 발견되지 않는 b를 선언되지 않은 변수(undeclared variable)라고 한다. RHS가 변수를 찾는데 실패하면 엔진은 ReferenceError를 만들어낸다.

LHS가 변수를 찾는 데 실패했고 프로그램이 스트릭트 모드에서 구동 중이었다면 전역 스코프에 새로운 변수를 만들어서 엔진에게 건네준다. 스트릭트 모드는 ES5에서 추가된 기능으로 normal/relaxed/lazy모드가 있다. 자동으로 전역 변수를 만들어주는 기능을 끌 수도 있는데 만약 꺼져 있다면 엔진이 ReferenceError를 만들게 된다.

만약 RHS에서 변수는 찾았는데 그 값으로 작업을 하는 게 불가능하다면 어떨까? 함수처럼 실행을 하려 했는데 함수가 아닌 값이라던지, 참조한 속성이 null/undefined값이라면? 엔진은 TypeError를 만든다.

ReferenceError는 스코프 관련한 실패이고 TypeError는 스코프가 성공한 뒤 결과물을 도출해내는 데 실패했을 때 만들어진다.

## Lexical Scope

스코프의 종류에는 두 가지가 있는데,

가장 흔하게 쓰이는 Lexical Scope와

Bash scripting이나 Perl의 몇몇 모드를 비롯한 소수의 프로그래밍 언어에서 쓰이는 Dynamic Scope가 그것이다.

### Lex-time

전통적인 언어 컴파일러의 첫 번째 작업 과정은 lexing(== tokenizing)이다. 렉싱 프로세스는 소스 코드 스트링을 검사하고 파싱의 결과로 나온 토큰에 의미를 부여한다. 바로 여기에서 lexical scope의 이름이 유래된 것이다.

렉시컬 스코프는 렉싱 타임에 정의되는 스코프이다.

렉시컬 스코프는 스코프의 어디에 변수와 블락이 당신에 의해 만들어졌는지를 기반으로 렉서가 코드를 실행시킬 때 그를 저장하는 것이다.

스코프는 서로 겹치지 않는다. 두 가지 스코프에 걸치고 있는 함수는 없다는 뜻이다. 

### Look-ups

## Function vs. Block Scope

스코프는 여러개의 버블로 구성된다. 각 버블은 일종의 컨테이너 역할을 하는데 그 안에서 식별자들이(변수, 함수) 선언된다. 버블 안에 또 다른 버블이 있을 수 있다.

무엇이 새로운 버블을 만드는 걸까?

### Scope From Functions

JS는 함수 기반의 스코프가 있다. 선언되는 함수마다 버블을 만든다. 다른 데이터 스트럭쳐는 스스로 스코프 버블을 만들지 못한다.고 알려져있지만 이것이 완벽한 사실은 아니다.

일단 함수의 스코프에 대해 알아보자.

```JS
function foo(a) {
	var b = 2;

	// some code

	function bar() {
		// ...
	}

	// more code

	var c = 3;
}
```

foo()의 스코프 버블은 a, b, c, bar 식별자를 포함한다.

스코프 내부에서 식별자들이 선언되는 위치는 중요하지 않다. 

bar()는 독자적인 스코프 버블을 가진다.

전역 스코프는(global scope) 단 하나만의 식별자를 가지는데 바로 foo다

a, b, c, bar는 foo의 스코프 버블에 속해있으므로

foo의 밖에서는 접근할 수 없다.(접근시 ReferenceError)

a, b, c, bar는 전역 스코프에서는 접근할 수 없지만

bar 내부에서는 가능하다.



함수 스코프는 모든 변수가 함수에 속한다는 아이디어를 준다. 

모든 변수들은 자신이 속한 함수 내부에서(nested 함수 포함) 사용되고 다시 사용될 수 있다.(재할당) 

이런 디자인은 JS 변수의 동적 특성을 잘 살릴 수 있게 해준다. 

동시에 이런 디자인이기 때문에 조심을 해야한다. 

모든 스코프에 존재하는 변수는 예상 밖의 결과를 가져올 수도 있다.

### Hiding In Plain Scope

옛날에는 함수를 선언하고 그 안에 코드를 더하는 것이라고 생각했다. 그 반대로 생각해보는 것은 어떨까? 코드 중 어떤 부분이 있고 그 부분을 선언한 함수로 감싸는 느낌은 어떤가. 마치 코드를 감추는 것 같은 효과를 보여준다.

코드의 어느 부분을 새로 만들어낸 스코프 버블로 감싸는 것은

변수/함수의 선언으로 인해 내부의 코드가 새롭게 감싼 함수의 스코프에 속하게 된다는 것으로 이전의 스코프와는 다른 스코프에 속하게 됐다는 뜻이다.

다른 말로 하면 함수의 스코프로 감쌈으로써 변수와 함수들을 감출 수 있다.

변수와 함수들을 감춘다는 것이 왜 유용한 기술이 될까?

스코프 기반의 숨김을 좋아하는 데는 여러 이유가 있다.

최소 권한의 원칙(Principle Of Least Privilege)이라는 소프트웨어 디자인 원칙에서도 그 이유를 찾아볼 수 있다. 이 원칙은 모듈이나 오브젝트를 위한 API 같은 소프트웨어의 디자인에서 필요한 최소한의 범위만을 공개하고 나머지는 모두 감춰야한다는 뜻이다. 이 원칙은 변수와 함수가 속할 스코프를 고르는 선택에까지 적용된다. 만약 모든 변수와 함수가 전역 스코프에 있다면 중첩된 스코프(nested scope) 어디에서나 접근이 가능할 것이다. 그러나 이는 POLP의 원칙에 위배된다.

```jsx
function doSomething(a) {
	b = a + doSomethingElse( a * 2 );

	console.log( b * 3 );
}

function doSomethingElse(a) {
	return a - 1;
}

var b;

doSomething( 2 ); // 15
```

위 코드에서 b와 doSomethingElse는 doSomething 함수 내부에서만 쓰이는데도 불구하고 전역 스코프에서 접근 가능하게 설계되어 있다. 이는 의도와 관계 없이 부작용이 일어날 수 있으므로 다음과 같이 바꾸는 것이 좋다.

```jsx
function doSomething(a) {
	function doSomethingElse(a) {
		return a - 1;
	}

	var b;

	b = a + doSomethingElse( a * 2 );

	console.log( b * 3 );
}

doSomething( 2 ); // 15
```

비공개(private) 데이터는 비공개 데이터로 만드는 것이 더 나은 소프트웨어 디자인이다.

#### Collision Avoidance

변수와 함수를 스코프 내부에 숨김으로써 얻을 수 있는 또 다른 이점은 다른 용도로 만들어진 같은 이름의 다른 식별자들이 충돌하는 것을 막을 수 있다는 점이다. 충돌은 대개 의도치 않은 값의 덮어쓰기를 초래한다.

해당 함수 내부에서만 쓸 변수라면 변수의 이름으로 바깥 스코프에 존재하는 이름을 선택하든 아니든 새로운 변수를 선언해서 사용하는 것이 옳은 방법이다.

#### Global "Namespaces"

변수간 충돌은 특히 전역 스코프에서 자주 일어난다. 다양한 라이브러리들을 쓸수록 충돌할 가능성이 높아지는데 각자 변수와 함수들을 잘 숨겨놓아야 충돌을 방지할 수 있다.

라이브러리들은 대개 전역 스코프에 독특한 이름을 가진 하나의 변수(대개 오브젝트)를 선언하는 방식을 쓴다. 이 오브젝트는 해당 라이브러리를 위한 네임스페이스(namespace) 역할을 하게 된다. 모든 기능들은 오브젝트의 속성의 하나로 만들어진다.

#### Module Management

충돌을 방지하기 위해 택할 수 있는 다른 방법은 좀 더 현대적인 모듈 접근으로 의존성 매니저(dependency manager)를 사용하는 것이다. 이런 도구를 사용하는 것은 라이브러리가 전역 스코프에 어떤 식별자도 더하지 않고 동작하게 만들어준다. 식별자들은 의존성 매니저의 다양한 메카니즘을 통해 다른 특정 스코프에 import된다.

이런 도구들이 렉싱 스코프 규칙에서 제외되는 마법을 부리는 것이 아니다. 그저 스코프 규칙을 잘 이용하는 것이다. 어떤 식별자도 공유된 스코프에서 선언되지 않고 비공개로 유지되어 충돌 가능성을 없앤다.

방어적으로 코드를 짜는 것 역시 의존성 매니저와 같은 결과를 만들 수 있다.

### Functions As Scopes

지금까지 함수로 코드를 감싸 변수와 함수 선언을 숨기는 것에 대해 설명했다.

```jsx
var a = 2;

function foo() { // <-- insert this

	var a = 3;
	console.log( a ); // 3

} // <-- and this
foo(); // <-- and this

console.log( a ); // 2
```

이 기술은 분명 통하는 방식이긴 하지만 이상적인 방식이라고 할 수는 없다. 몇몇 문제점을 가지고 있기 때문이다.

첫번째 문제점은 이름을 가진 함수 foo()를 선언해야만 한다는 것이다. 해당 스코프를 감싸고 있는 스코프(이 경우에는 전역 스코프)에 foo라는 식별자를 더해야만 한다.

또한 내부의 코드를 실행하기 위해서는 해당 함수를 이름으로 호출해야만 한다.

만약 함수가 이름을 필요로 하지 않았더라면(그 이름을 감싸고 있는 스코프에 더하지 않아도 된다면), 함수가 자동으로 실행된다면 더 좋은 방법이었을 것이다.

그리고 JS는 두 문제점 모두를 해결할 방식을 제공하고 있다.

```jsx
var a = 2;

(function foo(){ // <-- insert this

	var a = 3;
	console.log( a ); // 3

})(); // <-- and this

console.log( a ); // 2
```

foo()가 ()로 감싸져 있는 것이 보이는가? ()로 함수를 감쌈으로써 함수를 일반적인 선언이 아닌 함수 표현식(function-expression)이라고 보게 된다.

선언과 표현을 나누는 가장 쉬운 방법은 function의 위치이다. 만약 function이 선언의 가장 앞이라면 선언이고 그렇지 않다면 표현이다.

함수 선언과 함수 표현식의 중요한 차이점은 함수의 이름이 식별자로 작용하느냐라고 할 수 있다.

()로 함수를 감싸는 순간 foo는 ()스코프 안에 속한 것이 되어 전역 스코프에서 접근할 수 없다.

#### Anonymous vs. Named

콜백 함수의 파라미터로 사용되는 함수 표현에 익숙할 것이다.

```jsx
setTimeout( function(){
	console.log("I waited 1 second!");
}, 1000 );
```

상기 함수는 익명 함수 표현식이라고 불린다. 함수에 이름 식별자가 없기 때문이다. 함수 표현식은 익명이 될 수 있는데 함수 선언식은 이름을 생략할 수 없다.

익명 함수 표현식은 빠르고 쉽게 쓸 수 있고 많은 라이브러리들과 도구들이 이런 스타일을 선호한다.

그러나 익명 함수 표현식을 쓸 때 고려해야 할 점들도 있다.

1. 익명 함수는 스택에 표시할 이름이 없으므로 디버그하기가 힘들다
2. 익명 함수가 스스로를 다시 호출해야 하는 상황이 온다면(재귀같은) 이제는 사용되지 않는 arguments.callee 참조가 필요하다. 셀프 참조의 또다른 예는 이벤트 핸들러 함수가 한 번 실행된 뒤 unbind itself할 때이다.
3. 함수의 이름은 코드를 읽기 쉽게 만드는 역할을 하기도 한다. 서술적인(descriptive) 이름은 코드에 대한 문서 역할을 할 수도 있다.

인라인 함수 표현식은 강력하고 유용하다. 함수 표현에 이름을 주는 것은 상기한 단점을 모두 상쇄할 수 있으며 딱히 단점이라할 만한 것이 없다. 그러므로 좋은 습관은 함수 표현에 이름을 주는 것이다.

```jsx
setTimeout( function timeoutHandler(){ // <-- Look, I have a name!
	console.log( "I waited 1 second!" );
}, 1000 );
```

#### Invoking Function Expressions Immediately

```jsx
var a = 2;

(function foo(){

	var a = 3;
	console.log( a ); // 3

})();

console.log( a ); // 2
```

foo가 () 안에 속하게 됨으로써 foo는 함수 표현식이 되었다. 이 함수를 실행하려면 감싼 ()의 마지막에 ()를 더해주면 된다. `(function foo(){})()`

이 패턴을 IIFE(Immediately Invoked Function Expression, 즉시 호출 함수)라고 한다.

IIFE는 이름이 필수가 아니기 때문에 익명 함수 표현식을 쓰는 방식이 흔하다. 이름을 가진 IIFE도 불가능한 것은 아니다. 익명 함수 표현식보다 기명 함수 표현식이 더 나은 방식이므로 이름을 가진 IIFE를 쓰도록 하자.

```jsx
var a = 2;

(function IIFE(){

	var a = 3;
	console.log( a ); // 3

}());

console.log( a ); // 2
```

함수를 호출하는()이 첫번째 코드에서는 함수를 감싼 ()의 바깥에 있지만 두번째 코드에서는 감싸고 있는 ()의 안에 위치한다.

둘 모두 똑같이 기능하므로 선호하는 쪽을 택하면 된다.

흔히 쓰이는 IIFE의 또 다른 변형은 이것이 무엇인지 사실을 쓰는 것이다. 그냥 함수를 호출하고 인수(argument)를 건네준다.

```jsx
var a = 2;

(function IIFE( global ){

	var a = 3;
	console.log( a ); // 3
	console.log( global.a ); // 2

})( window );

console.log( a ); // 2
```

window 오브젝트 참조를 넘겼지만 해당 파라미터를 global이라고 이름 지었다.

이러한 패턴을 쓰는 또 다른 경우는 기본값인 undefined 식별자를 값으로 덮어쓴다. 파라미터를 undefined라고 이름 짓지만 아무 값도 건네주지 않음으로써 undefined 식별자가 코드 블럭 내의 undefined 값이 된다.

```jsx
undefined = true; // setting a land-mine for other code! avoid!

(function IIFE( undefined ){

	var a;
	if (a === undefined) {
		console.log( "Undefined is safe here!" );
	}

})();
```

또 다른 변형은 순서를 뒤집어서 함수를 호출하고 파라미터를 건네주는 것이 먼저 오고 함수가 실행되는 것이 뒤에 온다. 이 패턴은 UMD(Universal Module Definition) 프로젝트에서ㅓ 사용된다.

```jsx
var a = 2;

(function IIFE( def ){
	def( window );
})(function def( global ){

	var a = 3;
	console.log( a ); // 3
	console.log( global.a ); // 2

});
```

def 함수 표현은 코드의 후반부에 정의되었고

코드의 전반부에 정의된 IIFE 함수의 파라미터로 넘겨지게 된다.

그리고 나서 파라미터 def가 호출되고 window를 넘기면

IIFE에서 global 파라미터가 된다.

### Blocks As Scopes

함수가 가장 흔히 사용되는 스코프이지만 다른 스코프 유형도 있다. 블럭 스코프를 지원하는 언어들이 많이 있다. JS는 그 중 하나가 아니지만 블럭 스코프와 같은 코드를 쓸 수는 있다.

```jsx
for (var i=0; i<10; i++) {
	console.log( i );
}
```

변수 i는 for 반복문의 헤드에서 선언되었다. i를 for문에서 선언한 이유는 for문 내부에서만 쓸 변수이기 때문이다.

바로 그게 블럭 스코핑이다. 변수를 가능한 한 근처에서 선언하고, 가능한 한 해당 변수가 선언되는 로컬에서 선언한다.

```jsx
var foo = true;

if (foo) {
	var bar = foo * 2;
	bar = something( bar );
	console.log( bar );
}
```

bar 변수는 if문 안에서만 사용되므로 if문 안에서 선언해야겠다는 느낌이 올 것이다. 그러나 var를 사용할 때는 어디에서 선언하느냐는 중요치 않다. **var는 둘러싸고 있는 스코프에 속한다.**

그러므로 상기 코드는 블럭 스코핑처럼 보이지만 클럭 스코핑이 아니다.

블럭 스코프는 POLP 원칙의 연장으로 블럭 내부의 정보를 숨긴다.

```jsx
for (var i=0; i<10; i++) {
	console.log( i );
}
```

변수 i가 for문에서만 쓰이는데 굳이 함수 스코프의 전체를 오염시킬 필요가 무엇이겠는가? 더 중요한 것은 개발자들이 변수를 만들면서 계획한 목적에 맞는지를 스스로 확인해야 한다. 만약 의도한 곳이 아닌 데서 변수가 사용되고 있다면 문제가 될 것이다.

i를 위한 블럭 스코프는 i를 for문에서만 사용 가능하게 하므로,

만약 i를 함수 바깥에서 사용하려 한다면 에러가 난다.

그러나 표면상으로 JS에는 블럭 스코프를 위한 기능이 없다.

#### with

with를 블럭 스코프 형태로 쓸 수 있다. 오브젝트에서 만들어진 스코프는 with문이 살아있을 동안은 계속 존재한다. 바깥의 스코프에서는 접근할 수 없다.

#### try/catch

ES3에서 catch 구문 내부의 변수 선언을 통해 catch 블럭의 블럭 스코프화를 언급한 적이 있다.

```jsx
try {
	undefined(); // illegal operation to force an exception!
}
catch (err) {
	console.log( err ); // works!
}

console.log( err ); // ReferenceError: `err` not found
```

err이 catch 구문에 존재하고 err을 다른 곳에서 참조하려 하면 에러가 난다.

일반적인 JS 환경에서 적용 가능한 기능이지만

린터들은 한 스코프 안에 두 개 이상의 catch 구문이 있는 것을 좋아하지 않는다. 만약 같은 식별자 이름이 있는 경우 에러를 선언한다. 안전하게 블럭 스코프되어 있는데도 린터가 에러를 선언하는 것... 이 에러를 피하려면 변수 이름을 다르게 하던지, 중복된 변수 이름을 체크하는 린트를 꺼버리던지...

#### let

ES6에서 새로 도입된 let 키워드는 변수가 선언된 블럭 스코프에 변수가 속하게 한다. let은 암시적으로 변수를 존재하는 블럭에 속하게 한다. 암시적인 스코핑은 충분한 주의가 주어지지 않으면 혼란스러울 수 있다.

블럭 스코핑을 위해 명시적으로 블럭을 만들면 변수가 어디에 속해있는지 확실히 알 수 있다.

```jsx
var foo = true;

if (foo) {
	{ // <-- explicit block
		let bar = foo * 2;
		bar = something( bar );
		console.log( bar );
	}
}

console.log( bar ); // ReferenceError
```

명확하게 블럭을 만들어서 리팩토링할 때 쉽게 구분할 수 있다.

let 선언은 블럭 스코프의 맨 위로 호이스팅 되지 않는다.

선언문이 나타날 때까지 해당 선언은 존재하지 않는 것처럼 보인다.

#### Garbage Collection

블럭 스코핑이 유용한 또 다른 이유는 클로져, garbage collection과 관련이 있다.

```jsx
**function process(data) {
	// do something interesting
}

var someReallyBigData = { .. };

process( someReallyBigData );

var btn = document.getElementById( "my_button" );

btn.addEventListener( "click", function click(evt){
	console.log("button clicked");
}, /*capturingPhase=*/false );**
```

클릭 핸들러 콜백인 click 함수는 someReallyBigData 변수가 전혀 필요하지 않다. process가 실행된 뒤에 someReallyBigData는 가비지 콜렉트될 수 있다는 뜻이다. 그러나 JS 엔진은 여전히 그 구조를 가지고 있을 가능성이 높다. click 함수가 전체 스코프 위에 클로져를 가지고 있기 때문이다.

블럭 스코핑이 그런 문제를 해결할 수 있다. 엔진에게 someReallyBigData 구조를 가지고 있을 필요가 없다고 말해줄 수 있다.

```jsx
function process(data) {
	// do something interesting
}

// anything declared inside this block can go away after!
{
	let someReallyBigData = { .. };

	process( someReallyBigData );
}

var btn = document.getElementById( "my_button" );

btn.addEventListener( "click", function click(evt){
	console.log("button clicked");
}, /*capturingPhase=*/false );
```

#### let Loops

let이 가장 유용하게 쓰이는 것이 바로 for 반복문이다.

```jsx
for (let i=0; i<10; i++) {
	console.log( i );
}

console.log( i ); // ReferenceError
```

let이 i를 for문에 묶어놓은 것이 다가 아니다. 매 반복마다 i를 다시 bind시킨다. 값을 확실히 재할당하는 것이다.

매 반복마다 일어나는 일은 다음과 같다.

```jsx
{
	let j;
	for (j=0; j<10; j++) {
		let i = j; // re-bound for each iteration!
		console.log( i );
	}
}
```

감싸고 있는 함수의 스코프나 전역 스코프가 아니라 임의의 블럭에 속하는 let 선언은 기존 코드가 가지는 함수 스코프 기반의 var 선언에 대한 의존성 때문에 실수를 일으킬 수 있다. var를 let으로 바꾸려면 리팩토링을 할 때 더 많은 주의가 필요할 것이다.

```jsx
var foo = true, baz = 10;

if (foo) {
	var bar = 3;

	if (baz > bar) {
		console.log( baz );
	}

	// ...
}
```

이를 리팩토링하면,

```jsx
var foo = true, baz = 10;

if (foo) {
	var bar = 3;

	// ...
}

if (baz > bar) {
	console.log( baz );
}
```

블럭 스코프 변수를 사용하는 경우라면?

```jsx
var foo = true, baz = 10;

if (foo) {
	let bar = 3;

	if (baz > bar) { // <-- don't forget `bar` when moving!
		console.log( baz );
	}
}
```

#### const

ES6에서는 let과 함께 const를 소개했다. const는 let처럼 블럭 스코프 변수를 만들지만 그 값이 변하지 않는다. 값을 변경하려고 하면 에러가 난다.

```jsx
var foo = true;

if (foo) {
	var a = 2;
	const b = 3; // block-scoped to the containing `if`

	a = 3; // just fine!
	b = 4; // error!
}

console.log( a ); // 3
console.log( b ); // ReferenceError!
```



## Hoisting

함수 스코프와 블럭 스코프 모두 어떤 스코프 안에서 선언된 변수는 해당 스코프에 속한다는 규칙을 가진다. 그러나 스코프 내에서 변수가 선언된 위치에 따라 조금씩 다른 부분이 있다.

### Chicken Or The Egg?

JS 프로그램이 위에서 아래로 한 줄씩 순서대로 실행된다고 생각하기 쉽다. 대부분의 경우 그렇지만 아닌 경우도 있다.

```jsx
a = 2;

var a;

console.log( a );
```

여기서 프린트 되는 것은 무엇일까?

undefined라고 생각하는 개발자들이 많겠지만 실제로는 2가 프린트된다.

```jsx
console.log( a );

var a = 2;
```

이전의 a가 2였으므로

이번에도 2가 프린트 될 거라고 생각하거나

선언되기 전에 a가 사용됐으므로

ReferenceError가 날 거라고 생각하기 쉽다.

그러나 이번에는 undefined가 나온다.

무엇이 먼저인가? 선언인가 아니면 할당인가.

### The Compiler Strikes Again

엔진이 JS 코드를 해석(interpret)하기 전에 컴파일을 먼저 한다고 말했었다. 컴파일의 과정 중 하나는 모든 선언을 찾고 그 선언에 적절한 스코프를 엮는 것이다. 이것이 바로 렉시컬 스코프의 주안점이었다.

변수 선언이든 함수 선언이든 모든 선언은 코드가 실행되기 전에 먼저 처리된다고 생각하는 것이 좋다.

`var a = 2;`를 보면 하나의 문장(statement)이라고 생각할 것이다. 그러나 JS가 보는 var a = 2;는 두 개의 문장이다. var a;와 a = 2; 첫 번째 문장은 선언으로 컴파일 과정에서 처리된다. 두 번째 문장은 할당으로 실행 될 때까지 그 자리에 남겨둔다.

그러므로 첫 번째 코드는 다음과 같이 처리된다.

```jsx
var a;
a = 2;

console.log( a );
```

상단은 컴파일 과정에서, 하단은 실행 과정에서 처리되는 부분이다.

두 번째 코드는 다음과 같다.

```jsx
// compilation
var a;

//execution
console.log( a );
a = 2;
```

이 과정을 비유적으로 이해해보자면 선언은 코드의 맨 위로 옮겨지는 셈이다. 여기에서 호이스팅이라는 이름이 나온 것이다.

즉, 선언이 할당 이전에 처리된다.

선언만 호이스트되기 때문에 할당이나 다른 executable logic은 제 자리에 있다.

```jsx
foo();

function foo() {
	console.log( a ); // undefined

	var a = 2;
}
```

foo의 선언은(이 경우엔 실제 함수의 암묵적인 값을 포함하고 있다) 호이스트된다. 그래서 코드의 첫 번째 줄에서 foo를 호출해도 실행된다.

호이스팅은 스코프 별로 이루어진다.(per-scope) 그래서 var a는 foo의 맨 위로 호이스트되는 것이지 프로그램의 맨 위로 호이스트되는 것이 아니다.

위 코드를 해석하면 다음과 같은 모양일 것이다.

```jsx
function foo() {
	var a;

	console.log( a ); // undefined

	a = 2;
}

foo();
```

함수 선언은 호이스트되지만

함수 표현은 호이스트되지 않는다.

```jsx
foo(); // not ReferenceError, but TypeError!

var foo = function bar() {
	// ...
};
```

변수 식별자 foo는 호이스트되어 전역 스코프에 붙게 된다. 그래서 referenceError가 나지는 않는다. 하지만 foo는 아직 아무 값이 없으므로 foo()는 undefined를 보내려고 하지만 TypeError다.

기명 함수 표현식이지만 이름 식별자는 둘러싼(enclosing) 스코프에서 사용할 수 없다는 사실을 기억하자.

```jsx
foo(); // TypeError
bar(); // ReferenceError

var foo = function bar() {
	// ...
};
```

이를 호이스팅과 같이 좀 더 확실하게 해석하면:

```jsx
var foo;

foo(); // TypeError
bar(); // ReferenceError

foo = function() {
	var bar = ...self...
	// ...
}
```

### Functions First

함수 선언과 변수 선언은 호이스팅된다. 함수가 먼저 호이스팅된 후 변수가 호이스팅된다.

```jsx
foo(); // 1

var foo;

function foo() {
	console.log( 1 );
}

foo = function() {
	console.log( 2 );
};
```

2 대신에 1이 프린트됐다

이를 해석하면:

```jsx
function foo() {
	console.log( 1 );
}

foo(); // 1

foo = function() {
	console.log( 2 );
};
```

var foo가 중복 선언되었다.(그리고 무시됐다.)

var foo가 function foo()보다 전에 선언되었지만 함수 선언이 먼저 호이스팅되기 때문에 일어난 일이다.

여러 개의 / 중복적인 var 선언문이 효과적으로 무시되는 가운데 뒤따라오는 함수 선언문은 이전의 것을 앞선다.

```jsx
foo(); // 3

function foo() {
	console.log( 1 );
}

var foo = function() {
	console.log( 2 );
};

function foo() {
	console.log( 3 );
}
```

그냥 학문적인 얘기로 들릴 수도 있지만 같은 스코프 내에서의 중복 정의가 정말 나쁜 생각이고 혼돈을 가져올 수 있다는 것을 기억하자.

평범한 블럭 내부의 함수 선언은 감싸고 있는 스코프로 호이스트된다.

```jsx
foo(); // "b"

var a = true;
if (a) {
   function foo() { console.log( "a" ); }
}
else {
   function foo() { console.log( "b" ); }
}
```

블럭 내에서 함수를 선언하는 것은 불안정하므로 최대한 지양하자.

## Scope Closure

### Enlightenment

클로저는 JS 어디에나 있고 당신은 이를 알아차리고 받아들여야 한다.

클로저를 이해하기 위해서 특별한 툴이 필요한 것도 아니고 새로운 문법이나 패턴을 알아야 하는 것도 아니다. 

클로저는 렉시컬 스코프의 코드에 따라 나타나는 결과다. 특별한 의도를 가지고 클로저를 만들어야 되는 것이 아니다. 클로저는 당신의 코드 어디에서나 만들어진다. 

### Nitty Gritty

클로저는 함수가 본인의 렉시컬 스코프를 기억하고 접근할 수 있는 것이다. 함수가 해당 렉시컬 스코프의 바깥에서 실행되어도 마찬가지다.

```JS
function foo() {
	var a = 2;

	function bar() {
		console.log( a ); // 2
	}

	bar();
}

foo();
```

위의 코드는 네스티드 스코프를 설명할 때 본 적이 있다. bar()는 렉시컬 스코프의 RHS 룩업 참조에 의해 바깥 스코프에 있는 변수 a에 접근할 수 있다.

이것이 클로저일까? 기술적으로는 그럴 수 있겠지만 위의 정의에 따르면 아니라고 볼 수 있다. 그러나 접근을 가능하게 하는 렉시컬 스코프의 RHS 룩업 참조 규칙은 클로저의 일부이다.

학문적인 관점에서 상기 코드에서 bar 함수는 foo 함수의 스코프 위로 클로저를 가진다. 심지어는  bar가 접근 가능한 다른 모든 스코프 위에 클로저를 가지는데 이 경우에는 전역 스코프도 포함된다. 

간단하게 말하면 bar가 foo의 안에 있기 때문에 bar가 foo의 스코프 위로 클로저를 가지는 것이다.

이 방식으로 정의된 클로저는 볼 수는 없다. 렉시컬 스코프는 볼 수 있다.

```JS
function foo() {
	var a = 2;

	function bar() {
		console.log( a );
	}

	return bar;
}

var baz = foo();

baz(); // 2 -- Whoa, closure was just observed, man.
```

bar는 foo의 inner 스코프에 접근할 수 있는 렉시컬 스코프를 가지고 있다. bar 함수를 값으로 넘겨주면서 bar가 참조하고 있는 함수 오브젝트 자체를 리턴하게 된다.

foo를 실행한 뒤에 foo가 리턴하는 값을(bar 함수를) baz에 할당하는데, 그러면 baz를 부르게 된다. baz를 부른다는 것은 bar를 부른다는 것이다. 그저 다른 식별자가 참조하는 것뿐이다.

bar를 부르면 당연히 bar가 실행되고, 이 경우에 bar는 본인이 선언된 렉시컬 스코프 밖에서 실행되게 된다.

foo가 실행되면 foo의 inner 스코프 전체가 가비지 콜렉터에 의해 사라지게 될 거라고 생각한다. foo의 내부 코드가 더 이상 쓰이지 않는 것처럼 보이기 때문에 그렇게 생각하게 된다.

그러나 클로저는 그렇게 놔두지 않는다. 이너 스코프가 사실은 사용 중이기 때문이다. 누가 사용 중이냐고? 바로 함수 bar가 사용 중이다.

 bar는 본인이 선언된 곳을 기억하고 있기 때문에 foo의 이너 스코프 위의 클로저를 렉시컬 스코프로 가지고 있다. 따라서 언제라도 bar가 참조할 수 있도록 해당 스코프를 살려두는 것이다. bar는 그 스코프를 여전히 참조하고 있고 그 참조를 클로저라고 부른다.

몇 ms 이후 변수 baz가 불리고(이너 함수인 bar를 부르고), baz는 author-time 렉시컬 스코프에 접근할 수 있으므로 변수 a에도 접근할 수 있다.

author-time 렉시컬 스코프 바깥에서도 함수를 부를 수 있다. 클로저가 함수의 author-time에 정의되었던 렉시컬 스코프에 계속 접근 가능하게 해 주기 때문이다.

함수가 값으로 넘겨지고 다른 장소에서 불리는 모든 것들이 클로저의 예시이다.

```JS
function foo() {
	var a = 2;

	function baz() {
		console.log( a ); // 2
	}

	bar( baz );
}

function bar(fn) {
	fn(); // look ma, I saw closure!
}
```

내부의 함수 baz를 bar에게 넘겨주면서, 그 내부의 함수를 호출하는데(이제 fn이라고 이름 지어진), 호출하면 a에 접근가능한 것으로 foo의 내부 스코프 위의 클로저를 확인할 수 있다.

다음은 간접적인 방식이다.

```JS
var fn;

function foo() {
	var a = 2;

	function baz() {
		console.log( a );
	}

	fn = baz; // assign `baz` to global variable
}

function bar() {
	fn(); // look ma, I saw closure!
}

foo();

bar(); // 2
```

내부의 함수를 함수의 렉시컬 스코프 바깥으로 꺼내기 위해 어떤 방법을 쓰든지

어디에서 실행이 되든지

함수는 본래 선언된 스코프의 참조를 유지하고 그 클로저가 실행된다.

### Now I Can See

```js
function wait(message) {

	setTimeout( function timer(){
		console.log( message );
	}, 1000 );

}

wait( "Hello, closure!" );
```

timer라는 내부 함수를 setTimeout에 넘겼다. timer의 스코프 클로저는 wait의 스코프 위로 있으므로 message 변수를 계속 참조할 수 있다. wait이 실행된 다음 1000ms가 지나면 내부의 스코프는 사라져야 맞지만, 내부 함수인 timer의 클로저가 해당 스코프 위에 존재하기 때문이다.

함수를 1급 함수로 써서 해당 값을 파라미터로 넘길 때, 함수들의 클로저를 볼 수 있다.

```JS
var a = 2;

(function IIFE(){
	console.log( a );
})();
```

위의 코드는 작동하지만 클로저를 볼 수 있는 예시는 아니다. IIFE 함수가 본인의 렉시컬 스코프 밖에서 실행되지 않았기 때문이다. a의 참조는 클로저를 통한 것이 아니라 보통의 렉시컬 스코프 룩업을 통해서 이루어졌다.

### Loops + Closure

for 구문을 통해서 클로저를 잘 볼 수 있다.

```JS
for (var i=1; i<=5; i++) {
	setTimeout( function timer(){
		console.log( i );
	}, i*1000 );
}
```

린터가 반복문 안에 함수를 놓는 것에 대해 에러 표시를 할 수도 있지만 그건 잘못된 일이다.

위의 코드가 기대하는 결과는 1초에 하나씩 1부터 5까지 프린트하는 것이다. 그러나 이를 실제로 실행하면 1초마다 6이 다섯 번 프린트 되는 것을 확인할 수 있다. 

6은 어디서 나온걸까? for 반복문의 종료 조건은 i가 5 이하가 아닐 때다. 처음으로 종료 조건에 걸릴 때가 바로 i가 6일 때다. 그러므로 반복문이 끝난 뒤 i의 마지막 값을 반영한 아웃풋이 나온다.

코드를 다시 찬찬히 보면 알아차릴 수 있을 것이다. timeout 함수의 콜백은 반복문이 완성된 후 동작한다. 사실 setTimeout(..., 0)이었다고 해도 콜백 함수는 반복문이 완성된 뒤에 동작할 수 있으므로 매번 6이 프린트된다.

그렇다면 처음 의도한 것과 같은 결과를 얻으려면 코드를 어떻게 써야 할까?

반복문의 매 틱이 그 틱이 끝나기 전까지 해당 i를 복사하여 가지고 있어야 한다. 그러나 반복문에서 실행되는 다섯 개의 함수는 매 틱마다 새롭게 정의되지만 결국 클로저가 같은 전역 스코프 위에 있다. 그러므로 결국 i는 하나고 같은 i를 참조하는 것이다.

반복문은 뭔가 복잡한 무언가가 있을 거라고 생각하기 쉽다. 그렇지 않다. 다섯 개의 타임아웃 콜백 함수가 순서대로 선언되는 것이나 반복문이나 똑같다.

다시 돌아와서 처음 의도한 것과 같은 결과를 얻으려면 매 틱마다 새로운 클로저 스코프가 필요하다.

```JS
for (var i=1; i<=5; i++) {
	(function(){
		setTimeout( function timer(){
			console.log( i );
		}, i*1000 );
	})();
}
```

위의 코드는 의도대로 동작할까? 그렇지 않다. IIFE에 의해 타임아웃 함수 콜백이 매번 새로운 클로저 스코프를 만드는 데도 틀린 이유는 무엇일까? 스코프가 비어있기 때문이다. IIFE는 비어있는 아무것도 하지 않는 스코프를 만든다. 사용하기 위해서는 스코프 안에 무언가 있어야 한다.

독자적인 변수를 넣어주는 것은 어떨까

```JS
for (var i=1; i<=5; i++) {
	(function(){
		var j = i;
		setTimeout( function timer(){
			console.log( j );
		}, j*1000 );
	})();
}
```

이제 의도한 것처럼 동작하는 코드를 완성했다.

아래도 똑같이 동작한다.

```JS
for (var i=1; i<=5; i++) {
	(function(j){
		setTimeout( function timer(){
			console.log( j );
		}, j*1000 );
	})( i );
}
```

물론 IIFE가 평범한 함수이기 때문에 i를 넘겨주고 원하는 이름으로, j로 부를 수 있고 다시 i라고 부를 수도 있다.

매 틱마다 새로운 클로저 스코프를 만든다.

#### Block Scoping Revisited

IIFE를 사용해서 매 틱마다 새로운 스코프를 만들었다. 다시 말해서 우리는 매 틱마다 블럭 스코프가 필요했던 것이다. 세 번째 챕터에서 let 선언을 통해 블럭을 낚아채서 바로 그 블럭에서 변수를 선언했던 것을 기억할 것이다.

블럭을 스코프로 바꿔서 클로저를 그 위로 만든 것인데, 그래서 다음 코드가 동작할 수 있다.

```jsx
for (var i=1; i<=5; i++) {
	let j = i; // yay, block-scope for closure!
	setTimeout( function timer(){
		console.log( j );
	}, j*1000 );
}
```

그 외에도 for 반복문의 헤드에서 let 선언을 해서 일어난 특별한 행동이 있다. 변수가 반복문을 위해 한 번만 선언되는 것이 아니라 매 틱마다 선언된다는 것이다. 변수는 틱마다 초기화된다.

```jsx
for (let i=1; i<=5; i++) {
	setTimeout( function timer(){
		console.log( i );
	}, i*1000 );
}
```

블럭 스코프와 클로저가 함께 동작함으로써 문제를 해결한다.

## Modules

클로저를 이용하는 또 다른 패턴도 있다. 겉으로 보기에 콜백같아 보이지는 않는 이 방법은 모듈이라고 부른다.

```jsx
function foo() {
	var something = "cool";
	var another = [1, 2, 3];

	function doSomething() {
		console.log( something );
	}

	function doAnother() {
		console.log( another.join( " ! " ) );
	}
}
```

클로저가 보이지는 않지만

private 데이터 변수인 something과 another, 내부 함수인 doSomething, doAnother를 볼 수 있다. 두 함수는 foo의 내부 스코프 위로 렉시컬 스코프를 즉 클로저를 가진다.

```jsx
function CoolModule() {
	var something = "cool";
	var another = [1, 2, 3];

	function doSomething() {
		console.log( something );
	}

	function doAnother() {
		console.log( another.join( " ! " ) );
	}

	return {
		doSomething: doSomething,
		doAnother: doAnother
	};
}

var foo = CoolModule();

foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3
```

이게 바로 우리가 JS에서 모듈이라고 부르는 패턴이다. 대표적인 모듈은 revealing module으로 위에서 본 변형이 바로 revealing 모듈이다.

1. CoolModule은 함수로 모듈 인스턴스를 만들기 위해서는 호출이 되어야만 한다. outer 함수에서 실행되지 않고서는 내부 스코프를 만들거나 클로저를 만들 수 없다.
2. CoolModule 함수는 오브젝트를 리턴한다. 리턴하는 오브젝트는 내부의 함수를 참조하지만 내부의 데이터 변수를 참조하지는 않는다. 변수는 계속 숨겨져 있고 private하다. 리턴되는 객체 값을 모듈을 위한public API라고 볼 수 있다.

리턴된 객체는 최종적으로 바깥의 변수 foo에 할당되고,

API에서 메소드 속성들에 접근할 수 있게 된다. foo.doSomething()

꼭 모듈에서 실제 오브젝트를 리턴해야만 하는 것은 아니다. 그냥 내부의 함수를 직접적으로 리턴해도 된다. 제이쿼리가 대표적인 예이다. jQuery와 $ 식별자, 둘 다 제이쿼리 모듈을 위한 public API다. 동시에 함수이기도 하다. (함수는 오브젝트이므로 본인만의 속성을 가질 수도 있다.)

doSomething, doAnother 함수는 모듈 인스턴스의(CoolModule을 실행시킴으로써 만들어진 인스턴스) 내부 스코프 위에 클로저를 가진다. 두 함수를 렉시컬 스코프 바깥으로 보냄으로써(리턴을 통해서) 클로저를 볼 수 있는 조건은 완성되었다.

모듈 패턴을 실행하기 위해서는 두 가지 필요조건이 있다.

1. 바깥에서 감싸고 있는 함수가 필요하다.(outer enclosing function) 이 함수는 무조건 한 번은 실행이 되어야 한다.(모듈 인스턴스를 만들기 위해서)
2. 바깥의 함수는 최소한 하나 이상의 내부 함수를 리턴해야 한다. 그를 통해 내부의 함수가 private 스코프 위에 클로저를 가질 수 있고 private state에 접근 및 변경할 수 있다.

함수를 속성으로 가지는 오브젝트만 가지고 모듈이라고 말할 수는 없다. 함수를 호출함으로써 리턴된 오브젝트가 데이터 속성만 가지고 있다면 역시 모듈이라고 할 수는 없다.

위의 코드를 보면 혼자서 모듈을 만드는 CoolModule이 몇 번이고 호출될 수 있고, 호출될 때마다 새로운 모듈 인스턴스를 만든다. 이 패턴에서 조금 변형을 줘서 하나의 인스턴스만 보는 것을 싱글톤(singleton)이라고 한다.

```jsx
var foo = (function CoolModule() {
	var something = "cool";
	var another = [1, 2, 3];

	function doSomething() {
		console.log( something );
	}

	function doAnother() {
		console.log( another.join( " ! " ) );
	}

	return {
		doSomething: doSomething,
		doAnother: doAnother
	};
})();

foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3
```

모듈 함수를 IIFE로 바꾼 뒤 바로 실행을 시키고 리턴 값을 우리의 하나뿐인 모듈 인스턴스 식별자인 foo에 할당한다.

모듈도 함수의 하나일 뿐이므로 인자를 받을 수 있다.

```jsx
function CoolModule(id) {
	function identify() {
		console.log( id );
	}

	return {
		identify: identify
	};
}

var foo1 = CoolModule( "foo 1" );
var foo2 = CoolModule( "foo 2" );

foo1.identify(); // "foo 1"
foo2.identify(); // "foo 2"
```

모듈 패턴의 또 다른 변형은 public API로 리턴하는 오브젝트의 이름을 짓는 것이다.

```jsx
var foo = (function CoolModule(id) {
	function change() {
		// modifying the public API
		publicAPI.identify = identify2;
	}

	function identify1() {
		console.log( id );
	}

	function identify2() {
		console.log( id.toUpperCase() );
	}

	var publicAPI = {
		change: change,
		identify: identify1
	};

	return publicAPI;
})( "foo module" );

foo.identify(); // foo module
foo.change();
foo.identify(); // FOO MODULE
```

내부 참조를 모듈 인스턴스 내부의 public API 객체에 묶어둠으로써 모듈 인스턴스를 안에서부터 변형할 수 있다. 메소드, 속성을 더하고 지우거나 값을 바꿀 수 있다.

### Modern Modules

다양한 모듈 의존성 매니저들은(module dependency loaders/managers) 모듈 정의 패턴을 감싸서 friendly API로 만든다. 하나의 특정한 라이브러리를 시험하기보다 설명하기 위해 간단한 코드를 보자.

```jsx
var MyModules = (function Manager() {
	var modules = {};

	function define(name, deps, impl) {
		for (var i=0; i<deps.length; i++) {
			deps[i] = modules[deps[i]];
		}
		modules[name] = impl.apply( impl, deps );
	}

	function get(name) {
		return modules[name];
	}

	return {
		define: define,
		get: get
	};
})();
```

상기 코드에서 가장 중요한 부분은 `modules[name] = impl.apply(impl, deps)`다. 이 코드는 모듈을 감싸고 있는 함수를 호출하고(의존성을 넘겨주고), 리턴 값인 모듈의 API를 이름으로 추적할 수 있는 모듈 내부의 리스트에 저장한다.

모듈을 정의하기 위해 다음과 같이 사용할 수 있다.

```jsx
MyModules.define( "bar", [], function(){
	function hello(who) {
		return "Let me introduce: " + who;
	}

	return {
		hello: hello
	};
} );

MyModules.define( "foo", ["bar"], function(bar){
	var hungry = "hippo";

	function awesome() {
		console.log( bar.hello( hungry ).toUpperCase() );
	}

	return {
		awesome: awesome
	};
} );

var bar = MyModules.get( "bar" );
var foo = MyModules.get( "foo" );

console.log(
	bar.hello( "hippo" )
); // Let me introduce: hippo

foo.awesome(); // LET ME INTRODUCE: HIPPO
```

foo와 bar 모두 public API를 리턴하는 함수로 정의되어 있다. foo는 bar의 인스턴스를 dependency parameter로 받기까지 한다.

모듈 매니저가 어떤 마법을 부리는 것이 아니라 모듈 패턴의 특성을 만족시켜줄 뿐이다. 감싸고 있는 함수를 호출하고 리턴값을 모듈을 위한 API에 저장한다.

즉, 모듈 위에 wrapper tool이 있다고 해도 모듈은 그냥 모듈일 뿐이다.

### Future Modules

ES6는 모듈을 위해 1급 문법을 더했습니다. 모듈 시스템을 통해서 로드된 파일은 ES6가 별개의 파일로 인식한다. 각 모듈은 다른 모듈이나 특정한 API를 불러올 수 있고 스스로의 public API를 내보낼 수 있다.

함수 기반의 모듈은 컴파일러가 바로 알아차릴 수 있는 정적(static) 패턴이 아니기 때문에 API가 런타임이 되기 전에는 알 수가 없다. 즉, 모듈의 API를 런타임 동안 변형을 줄 수 있다.

그와 대조적으로 ES6 모듈 API는 정적이라서 API가 런타임 동안 변할 수 없다. 컴파일러도 ES6 모듈 API가 정적임을 알고 있기 때문에 컴파일하는 동안 불러온 모듈 API의 일부를 참조하는 코드를 확인해서 모듈 API가 존재하지 않는다면 빠르게(컴파일 과정에서) 에러를 만들 수 있다.

ES6 모듈은 인라인 포맷이 없다. 꼭 별개의 파일에서 정의되어야 한다. 모듈마다 하나의 파일이 필요하다. 브라우저나 엔진은 기본 모듈 로더가 있는데 불러올 때 모듈 파일을 동기적으로 로드한다.

```JS
// bar.js

function hello(who) {
	return "Let me introduce: " + who;
}

export hello;
```

```js
// foo.js

// import only `hello()` from the "bar" module
import hello from "bar";

var hungry = "hippo";

function awesome() {
	console.log(
		hello( hungry ).toUpperCase()
	);
}

export awesome;
```

```js
// import the entire "foo" and "bar" modules
module foo from "foo";
module bar from "bar";

console.log(
	bar.hello( "rhino" )
); // Let me introduce: rhino

foo.awesome(); // LET ME INTRODUCE: HIPPO
```

`import` 는 모듈의 API에서 하나 이상을 현재 스코프로 불러온다. 각각 변수에 저장된다.(이 경우에는 hello에!) `module`은 모듈 API 전체를 불러와서 변수에 저장한다.(foo, bar) `export`는 변수, 함수같은 식별자를 현재 모듈의 public API로 내보낸다. 

모듈 파일 내부의 코드는 스코프 클로저에 감싸여진 것처럼 취급된다. 

## 부록1 Dynamic Scope

다이나믹 스코프는 렉시컬 스코프와 상반되는 모델이다. 다이나믹 스코프는 `this`와 비슷한 메커니즘이다.

렉시컬 스코프는 엔진이 변수를 찾는 방법에 관한 일련의 규칙이다. 중요한 특징은 author-time, 즉 코드가 쓰여질 때 규정된다는 것이다.(eval()이나 with로 반칙을 쓴 경우가 아니라면)

다이나믹 스코프는 코드가 쓰여질 때 정적으로 규정되기보다는 런타임에 동적으로 정해진다.

```JS
function foo() {
	console.log( a ); // 2
}

function bar() {
	var a = 3;
	foo();
}

var a = 2;

bar();
```

렉시컬 스코프는 RHS로 foo() 내부의 a를 참조하여 전역 변수 a를 덮어써서 foo는 2를 아웃풋으로 내놓는다.

다이나믹 스코프는 그와 반대로 어떻게 그리고 어디서 함수와 스코프가 선언되는지 신경쓰지 않는다. 그보다는 어디에서 호출이 됐느냐에 집중한다. 즉, 스코프 체인은 콜 스택을 기반으로 하고 코드의 스코프 네스팅을 기반으로 하지 ㅇ낳는다.

만약 JS가 다이나믹 스코프를 가지고 있고 foo가 호출된다면 이론적으로는 아래의 코드의 아웃풋은 3이어야 한다.

```JS
function foo() {
	console.log( a ); // 3  (not 2!)
}

function bar() {
	var a = 3;
	foo();
}

var a = 2;

bar();
```

어째서일까? foo가 a 변수를 참조할 수 없기 때문에 렉시컬 스코프 체인을 올라가는 대신 콜스택을 타고 올라가서 foo가 어디에서 호출되었는지를 찾아낸다. foo가 bar에서 호출되었기 때문에 bar 스코프의 변수들을 확인한다. 그리고 거기에서 a를 찾아 a의 값인 3을 내놓는다.

뭔가 이상하다고 생각하는가? 렉시컬 스코프를 흔히 봐와서 그럴 것이다. 

사실 JS에는 다이나믹 스코프가 없다. 렉시컬 스코프 뿐이다. 그러나 `this` 메커니즘이 다이나믹 스코프처럼 동작한다. 

write-time 기반의 렉시컬 스코프는 어디서 함수가 선언되었는지를 중시하고

runtime 기반의 다이나믹 스코프는(`this`는) 함수가 어디서 호출되었는지를 중시한다.

`this`는 함수가 어떻게 호출되었는지를 중시하는데, 다이나믹 스코프와의 연관성을 알 수 있다.

## 부록2 Polyfilling Block Scope

## 부록3 Lexical-this

ES6부터 새로 도입된 화살표 함수(arrow function)가 있다.

```JS
var foo = a => {
	console.log( a );
};

foo( 2 ); // 2
```



```JS
var obj = {
	id: "awesome",
	cool: function coolFn() {
		console.log( this.id );
	}
};

var id = "not awesome";

obj.cool(); // awesome

setTimeout( obj.cool, 100 ); // not awesome
```

위 코드에는 문제가 있다. cool 함수에 묶인 this가 없다는 것이다. 그 문제를 해결하기 위한 방법은 여러가지가 있지만 흔히 쓰는 방법은 `var self = this;`다.

```JS
var obj = {
	count: 0,
	cool: function coolFn() {
		var self = this;

		if (self.count < 1) {
			setTimeout( function timer(){
				self.count++;
				console.log( "awesome?" );
			}, 100 );
		}
	}
};

obj.cool(); // awesome?
```

`var self = this`는 this와 관련한 방안이지만 더 편한 방법이 있을 수도 있다. 바로 렉시컬 스코프다. self는 렉시컬 스코프와 클로저를 통해서 해결할 수 있는 식별자다. 

ES6의 화살표 함수는 `렉시컬 this`를 제공한다.

```JS
var obj = {
	count: 0,
	cool: function coolFn() {
		if (this.count < 1) {
			setTimeout( () => { // arrow-function ftw?
				this.count++;
				console.log( "awesome?" );
			}, 100 );
		}
	}
};

obj.cool(); // awesome?
```

화살표 함수는 보통 함수처럼 this를 쓸 수 없다. this와 관련된 일반적인 규칙이 하나도 적용되지 않는다. 화살표 함수의 this 값은 바로 바깥의 렉시컬 스코프가 된다.

위의 코드에서 화살표 함수는 this cool 함수의 this 바인딩을 상속 받는다.

복잡한 코드에서 화살표 함수를 사용하면 this 바인딩과 렉시컬 스코프 규칙을 헷갈리게 된다. 그러므로 두 가지를 한 코드상에서 함께 쓰지 않는 것이 좋다.

화살표 함수의 또 다른 단점은 익명이라는 것이다.

좀 더 적절한 해결방식은 this 메커니즘을 좀 더 옳은 방식으로 사용하는 것이다.

```JS
var obj = {
	count: 0,
	cool: function coolFn() {
		if (this.count < 1) {
			setTimeout( function timer(){
				this.count++; // `this` is safe because of `bind(..)`
				console.log( "more awesome" );
			}.bind( this ), 100 ); // look, `bind()`!
		}
	}
};

obj.cool(); // more awesome
```

화살표 함수를 이용한 새로운 렉시컬 this나 bind() 둘 중 무엇을 선호하든지

화살표 함수가 단순히 일반 함수보다 적게 타이핑하기 위해 존재하는 것이 아니라는 것을 알아두자.

화살표 함수는 의도된 차이점이 있으므로 그를 주지해서 코드를 짜야 한다.

# this&OBJECT PROTOTYPES

## this Or THAT?

아마도 JS에서 가장 헷갈리는 것이 this 아닐까. this는 특별한 식별자로 모든 함수의 스코프에서 자동으로 정의되는 키워드다. this가 정확히 무엇을 가리키는 걸까

### Why this?

```jsx
function identify() {
	return this.name.toUpperCase();
}

function speak() {
	var greeting = "Hello, I'm " + identify.call( this );
	console.log( greeting );
}

var me = {
	name: "Kyle"
};

var you = {
	name: "Reader"
};

identify.call( me ); // KYLE
identify.call( you ); // READER

speak.call( me ); // Hello, I'm KYLE
speak.call( you ); // Hello, I'm READER
```

위 코드는 identify와 speak 함수가 다양한 오브젝트에서 재사용될 수 있게 한다. 각 객체마다 다른 버전의 함수가 필요하지 않다는 뜻이다.

this를 쓰지 않고 객체를 직접 넘겨줄 수도 있다.

```jsx
function identify(context) {
	return context.name.toUpperCase();
}

function speak(context) {
	var greeting = "Hello, I'm " + identify( context );
	console.log( greeting );
}

identify( you ); // READER
speak( me ); // Hello, I'm KYLE
```

그러나 this 메커니즘은 암묵적으로 객체를 참조할 수 있게 넘겨줌으로써 API 디자인을 깔끔하게 하고 재사용을 쉽게 한다.

패턴이 복잡할수록 인자를 명시하는 것이 this를 사용하는 것보다 난잡해보인다.

### Confusions

this는 두 가지 **잘못된** 의미로 인식되는 경우가 많다.

#### 잘못된 의미1: 자기 자신

흔히 this가 함수 자신을 가리킨다고 생각한다. 문법적으로 그렇게 오해할 만하다. 왜 함수 내부에서 함수 자신을 참조하고 싶을까? 흔한 이유로는 재귀나 처음 호출된 뒤 엮인 이벤트 핸들러를 없애는 경우 등이 있다.

JS 메커니즘에 익숙하지 않은 개발자는 함수를 객체로써 참조할 때(모든 함수는 객체죠!) 함수 호출 사이에 state를(속성같은 값) 저장한다고 생각한다. 이런 일은 분명 가능하지만 제한이 있다. 앞으로 함수 오브젝트의 state를 저장할 수 있는 더 나은 패턴들을 알아볼 것이다. 일단 this로 state를 저장하는 패턴을 살펴봄으로써 this가 함수를 참조하는 방식이 우리가 생각하는 방식과 다르다는 것을 확인하자

```jsx
 function foo(num) {
	console.log( "foo: " + num );

	// keep track of how many times `foo` is called
	this.count++;
}

foo.count = 0;

var i;

for (i=0; i<10; i++) {
	if (i > 5) {
		foo( i );
	}
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9

// how many times was `foo` called?
console.log( foo.count ); // 0 -- WTF?
```

네 번의 console.log를 통해 foo가 네 번 호출된 것은 분명하지만 foo.count는 여전히 0이다. this.count++에서 this를 너무 직설적으로 이해하는데서 혼란이 온다.

`foo.count = 0`가 실행되었을 때 함수 객체 foo에 count라는 속성이 더해진 것은 사실이다. 그러나 this.count를 함수 내에서 참조할 때 this는 해당 함수 객체를 가리키고 있지 않다. 속성 이름이 동일하더라도 root 객체가 다르다.

책임감 있는 개발자라면 이쯤에서 그렇다면 내가 하나씩 더한 count 속성은 어디 있는 거냐고 물어봐야 한다. 전역 변수 count가 만들어져 있는 것을 확인할 수 있다. 그리고 값은 NaN이다. 대체 이게 왜 전역 변수고 왜 값은 NaN일까? 여기에서 멈춰서 왜 this가 생각한 대로 참조를 하지 않는지 깊게 생각하지 않고 새로운 오브젝트를 만들어 count 속성을 넣어놓곤 한다.

```jsx
function foo(num) {
	console.log( "foo: " + num );

	// keep track of how many times `foo` is called
	data.count++;
}

var data = {
	count: 0
};

var i;

for (i=0; i<10; i++) {
	if (i > 5) {
		foo( i );
	}
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9

// how many times was `foo` called?
console.log( data.count ); // 4
```

이 방법이 문제를 해결해주기는 하지만 진짜 문제는 건드리지도 않은 것과 마찬가지다. this가 무엇을 의미하고 어떻게 동작하는지는 알지 못하고 익숙한 메커니즘인 렉시컬 스코프로 돌아가는 것이다.

함수 객체를 해당 함수 내부에서 참조하는 용도로 this는 부적절하다. 함수를 가리키는 렉시컬 식별자(변수)를 통한 참조가 더 적절하다.

다음 두 함수를 보자

```jsx
function foo() {
	foo.count = 4; // `foo` refers to itself
}

setTimeout( function(){
	// anonymous function (no name), cannot
	// refer to itself
}, 10 );
```

첫번째 함수는 기명 함수로 foo가 함수 내부에서 스스로를 참조하는 데 쓰일 수 있다. 그러나 두 번째 예시에서 콜백 함수가 setTimeout()의 인자로 들어가는데, 콜백 함수는 익명 함수라서 참조할 만한 적절한 방법이 없다.

arguments.callee로 참조를 하는 방법을 써왔으나 이제는 deprecated되었다. 이 방식을 통한 참조는 익명 함수 객체를 내부에서 접근할 수 있는 유일한 방식이라고 여겨져 왔다. 물론 제일 좋은 방법은 익명 함수를 쓰지 않는 것이다.(적어도 자기 참조가 필요한 상황에서는)

다른 해결 방안은 foo를 함수 객체 참조를 위한 식별자로 쓰고 this를 아예 쓰지 않는 것이다.

```jsx
function foo(num) {
	console.log( "foo: " + num );

	// keep track of how many times `foo` is called
	foo.count++;
}

foo.count = 0;

var i;

for (i=0; i<10; i++) {
	if (i > 5) {
		foo( i );
	}
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9

// how many times was `foo` called?
console.log( foo.count ); // 4
```

그러나 이런 접근은 this를 이해하지 못하고 렉시컬 스코프에 의지한다는 데서 삼천포로 빠졌다고 할 수 있다.

또 다른 방법은 this를 foo 함수 객체를 참조하기 위해 쓰는 것이다.

```jsx
function foo(num) {
	console.log( "foo: " + num );

	// keep track of how many times `foo` is called
	// Note: `this` IS actually `foo` now, based on
	// how `foo` is called (see below)
	this.count++;
}

foo.count = 0;

var i;

for (i=0; i<10; i++) {
	if (i > 5) {
		// using `call(..)`, we ensure the `this`
		// points at the function object (`foo`) itself
		foo.call( foo, i );
	}
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9

// how many times was `foo` called?
console.log( foo.count ); // 4
```

this를 피하지 말고 받아들여 보자.

#### 잘못된 의미2: 해당 스코프

this가 잘못 인식되는 두 번째 의미는 해당 함수의 스코프를 참조한다는 것이다. 어느 정도는 진실이 섞여 있지만 역시 잘못 인식됐다고 할 수 있다.

this는 어쨌든 함수의 렉시컬 스코프를 가리키는 것은 아니다. 내부적으로 스코프는 이용 가능한 식별자들을 속성으로 가지는 오브젝트와 같다. 그러나 스코프 오브젝트는 JS 코드를 통해 접근할 수 없다. 엔진 실행 과정에서 생기는 내부적인 부분이다.

함수의 렉시컬 스코프를 암묵적으로 참조하기 위해 this를 사용하려 하는 다음 코드를 살펴보자

```jsx
function foo() {
	var a = 2;
	this.bar();
}

function bar() {
	console.log( this.a );
}

foo(); //undefined
```

부자연스러워 보일 수 있지만 위 코드는 공개 포럼에 올라온 실제 코드를 변형한 것이다.

위 코드에는 하나 이상의 실수가 있다.

첫 번째, this.bar()를 통해 bar 함수를 참조하려고 시도했다. 만약 이 코드가 원하는 대로 실행된다면 실수일 것이다. bar를 호출하는 가장 자연스러운 방식은 this.bar()가 아니라 bar()일 것이다. 그리고 식별자를 통해 렉시컬 참조를 하는 것이다.

위와 같은 코드를 쓰는 개발자들은 foo의 렉시컬 스코프와 bar의 렉시컬 스코프 사이의 연결고리를 만들기 위해 this를 사용하기도 한다. bar가 foo의 내부 스코프에 있는 변수 a에 접근할 수 있게 만들고 싶은 것이다. 그러나 그런 연결고리는 불가능하다. this 참조는 렉시컬 스코프처럼 타고 올라가는 참조를 할 수 없다. 그냥 안 된다.

렉시컬 스코프 룩업과 this를 함께 사용하고 싶어지면 떠올리자. 그런 것은 불가능하다.

### What's `this`?

지금까지 잘못된 인식들을 얘기했다. 진짜 this 메커니즘은 어떻게 동작하는 걸까?

this가 코드를 작성할 때 만들어지지 않고 런타임에 만들어진다는 얘기는 이미 했었다. this를 함수가 호출되는 곳을 기반으로 하기 때문이다. this는 함수가 어디서 선언되었는지가 아니다.

함수가 호출될 때 execution context(activation record)가 만들어진다. 이것은 함수가 어디서 호출되었는지에(콜 스택) 관한 정보, 어떻게 함수가 호출되었는지에 관한 정보, 그리고 어떤 인자가 들어왔는지에 관한 정보 등을 가지고 있다. 이 context의 속성 중 하나는 this 참조다. this 속성은 해당 함수 호출 기간 동안 사용된다.

## this All Makes Sense Now!

### Call-site

콜 사이트를 어디서 어떻게 함수가 호출되었는지를 가리키는 것으로 이를 기반으로 this가 만들어진다. this 바인딩을 이해하기 위해서는 콜 사이트를 이해해야만 한다.

콜 사이트를 찾는 것은 대개 '함수가 어디서 호출되었는지를 보자'로 귀결되지만 항상 그렇게 간단하지는 않다. 어떤 코딩 패턴은 애매한 콜 사이트를 가지고 있다.

콜 스택을 고려하는 것이 중요하다. 콜 스택은 지금까지 호출된 함수들의 스택을 말한다. 우리가 신경 써야 하는 콜 사이트는 현재 호출된 함수 이전의 호출에 있다.

다음 코드를 통해 콜 스택과 콜 사이트를 이해해보자.

```jsx
function baz() {
    // call-stack is: `baz`
    // so, our call-site is in the global scope

    console.log( "baz" );
    bar(); // <-- call-site for `bar`
}

function bar() {
    // call-stack is: `baz` -> `bar`
    // so, our call-site is in `baz`

    console.log( "bar" );
    foo(); // <-- call-site for `foo`
}

function foo() {
    // call-stack is: `baz` -> `bar` -> `foo`
    // so, our call-site is in `bar`

    console.log( "foo" );
}

baz(); // <-- call-site for `baz`
```

콜 스택에서 진자 콜 사이트를 찾기 위해 노력해보자. 콜 사이트만이 this 바인딩을 가리는 데 중요한 것이기 때문이다.

함수 호출의 순서를 보면서 콜 스택을 시각화해 보자. 콜 스택을 보는 또 다른 방법은 브라우저에서 디버거 툴을 이용하는 것이다. 대부분의 모던 데스크톱 브라우저는 개발자 도구를 내장하고 있다. 개발자 도구는 JS 디버거를 가지고 있다.

위의 코드에서 foo 함수의 첫 번째 줄에 분기점을 만들거나 `debugger;`를 삽입해서 디버깅을 할 수 있다. 디버거는 해당 부분에서 일시정지하여 그 라인까지 호출된 함수 목록을 보여준다. 이 목록이 바로 콜 스택이다.

### Nothing But Rules

this가 함수가 호출된 동안 어디를 가리키는 지를 콜 사이트가 어떻게 결정하는 지에 대해 알아보자.  콜 사이트를 검사해서 네 가지 규칙이 적용되는 지를 확인해야 한다. 네 가지 규칙에 대해 알아보자.

#### Default Binding

첫 번째 규칙은 함수를 호출하는 가장 흔한 경우인 독립적으로 함수를 호출하는 경우에 적용된다. 이 규칙을 기본 규칙으로 생각하자. 다른 규칙이 적용되지 않을 때는 이 규칙을 적용해야 한다.

```JS
function foo() {
	console.log( this.a );
}

var a = 2;

foo(); // 2
```

 전역 스코프에서 선언된 a는 전역 오브젝트의 속성 a와 같은 말이다. 사본이 아니라 전역 스코프에서 선언이 되면 전역 오브젝트의 속성으로 생성되는 것이다. foo가 호출되면 this.a가 전역 변수 a를 말하는 것이다. 왜냐하면 this의 기본 바인딩이 함수 호출에 적용되었으므로 this가 전역 오브젝트를 가리키기 때문이다.

만약 strict mode가 켜져 있다면 전역 오브젝트는 기본 바인딩으로 부적격하므로 this는 undefined가 된다.

```JS
function foo() {
	"use strict";

	console.log( this.a );
}

var a = 2;

foo(); // TypeError: `this` is `undefined`
```

this 바인딩 규칙은 모두 콜 사이트에 기반하지만, 전역 오브젝트는 strict mode가 아닐 때문 기본 바인딩이 될 수 있다는 것을 기억하자. foo의 콜 사이트가 strict mode인지가 중요한 것이 아니라 foo의 컨텐츠가 strict mode에서 동작하는지가 중요하다.

```JS
function foo() {
	console.log( this.a );
}

var a = 2;

(function(){
	"use strict";

	foo(); // 2
})();
```

 strict mode와 non-strict mode를 섞는 것은 단연코 좋지 않은 코드이다. 하지만 제 3자 라이브러리를 삽입했을 때는 내가 해결할 수 없으므로 이런 규칙을 잘 생각하자.

#### Implicit Binding

콜 사이트가 context 오브젝트를 가지고 있을까? context 오브젝트는 owning/containing 오브젝트라고도 할 수 있지만 context 오브젝트가 맞는 용어다.

```JS
function foo() {
	console.log( this.a );
}

var obj = {
	a: 2,
	foo: foo
};

obj.foo(); // 2
```

foo가 전역 스코프에서 선언된 뒤, 

obj의 속성으로 foo가 추가되었다.

foo가 obj에서 처음으로 선언된 것인지 아닌지, 밖에서 선언된 뒤 참조로 추가되었는지와

함수가 정말 obj에 owned/contained되었는지는 무관하다



콜 사이트는 함수 참조를 위해 obj의 context를 사용한다. 그러므로 obj 오브젝트는 함수가 호출될 때 함수 참조를 own/contain하고 있다고 말할 수 있다.

foo의 호출보다 obj에 대한 참조가 선행되었다. 함수 참조를 위한 context 오브젝트가 있을 때, 암묵적인 바인딩 규칙은 그 context 오브젝트가 함수 호출의 this 바인딩에 쓰인다고 말한다.

obj가 foo 호출의 this이므로 this.a는 obj.a와 같은 말이다.

오브젝트 속성 참조 체인의 가장 위 혹은 가장 마지막이 콜 사이트가 된다.

```JS
function foo() {
	console.log( this.a );
}

var obj2 = {
	a: 42,
	foo: foo
};

var obj1 = {
	a: 2,
	obj2: obj2
};

obj1.obj2.foo(); // 42
```

##### Implicitly Lost

언제 암묵적인 this 바인딩의 효력이 사라지고 기본 바인딩으로 돌아갈까? 즉, 전역 오브젝트나 undefined가 될까(strict mode가 켜져있냐 아니냐에 따라 다르다)

```JS
function foo() {
	console.log( this.a );
}

var obj = {
	a: 2,
	foo: foo
};

var bar = obj.foo; // function reference/alias!

var a = "oops, global"; // `a` also property on global object

bar(); // "oops, global"
```

bar가  obj.foo를 참조하는 것처럼 보이지만 foo 자체에 대한 참조일 뿐이다. 중요한 것은 콜 사이트인데 콜 사이트는 bar다. 가장 기본적인 함수 호출로 기본 바인딩이 적용된다.

좀 더 까다로운 상황은 콜백 함수다.

```JS
function foo() {
	console.log( this.a );
}

function doFoo(fn) {
	// `fn` is just another reference to `foo`

	fn(); // <-- call-site!
}

var obj = {
	a: 2,
	foo: foo
};

var a = "oops, global"; // `a` also property on global object

doFoo( obj.foo ); // "oops, global"
```

변수를 넘기는 것은 암묵적인 할당에 해당한다. 여기서는 함수를 넘기고 있으므로 이는 암묵적인 참조를 할당하는 것이다. 그러므로 결과는 이전의 코드와 같다.

만약 변수로 넘겨 콜백 함수가 되는 것이 내가 만든 함수가 아니라 내장 함수라면 어떨까? 여전히 결과는 같다.

```JS
function foo() {
	console.log( this.a );
}

var obj = {
	a: 2,
	foo: foo
};

var a = "oops, global"; // `a` also property on global object

setTimeout( obj.foo, 100 ); // "oops, global"
```

```JS
function setTimeout(fn,delay) {
	// wait (somehow) for `delay` milliseconds
	fn(); // <-- call-site!
}
```

콜백 함수가 this 바인딩을 잃는 것은 꽤나 흔한 일이다. 

this가 우리를 놀래키는 또 다른 경우는 콜백으로 넘긴 함수가 호출을 위해 this를 의도적으로 변경할 때다.  예를 들면 이벤트 핸들러는 JS의 라이브러리로 콜백 함수가 this를 이벤트가 만들어진 해당 DOM 요소로 가지도록 변환시키는 편이다. 어떤 때는 유용할 수도 어떤 때는 불쾌할 수도 있는 일이지만 우리가 선택할 수 있는 일은 아니다.

this가 예상치 못하게 바뀌면 내 콜백 함수 참조가 예상한 대로 실행되지 못하고, 내가 의도한 바인딩을 가질 수 없게 된다. 이는 조금 있다 나올 this를 고정함으로써 고칠 수 있는 문제다

#### Explicit Binding

암묵적인 바인딩은 오브젝트에 변형을 주어 자체적으로 함수를 참조하게 한 뒤에 그 속성 함수를 참조하여 간접적으로 오브젝트의 this에 바인드되게 한다.

그러나 속성으로 가지지 않고 함수를 호출할 때 특정 오브젝트에 this 바인딩을 주고 싶다면 어떻게 해야할까? 모든 함수는 유틸리티를 가진다.(`[[Prototype]]` 을 통해 가능하다) 특히, call()과 apply() 메소드가 있다. 기술적으로 JS 호스트 환경이 함수가 그런 기능을 가지지 못하도록 할 수도 있지만 이는 아주 드문 일이다.

유틸리티들은 어떻게 동작할까. call과 apply 모두 첫번째 인자로 this로 사용할 오브젝트를 받고 해당 this를 사용할 함수를 호출한다. this로 사용할 것을 직접적으로 쓰기 때문에 명시적 바인딩이라고 부른다.

```JS
function foo() {
	console.log( this.a );
}

var obj = {
	a: 2
};

foo.call( obj ); // 2
```

foo.call(obj)를 통해 foo에 명시적 바인딩을 주었다.

만약 원시 값을(string, boolean, number 타입) this 바인딩으로 넘기면 원시값들은 각자의 오브젝트 형으로 감싸진다.(new String(), new Boolean(), new Number()) 이를 박싱(boxing)이라 부른다.

##### Hard Binding

명시적인 바인딩 자체로는 의도한 this 바인딩을 잃어버리는 문제를 해결할 수 없지만 

명시적인 바인딩의 변형 패턴들은 가능하다.

```JS
function foo() {
	console.log( this.a );
}

var obj = {
	a: 2
};

var bar = function() {
	foo.call( obj );
};

bar(); // 2
setTimeout( bar, 100 ); // 2

// `bar` hard binds `foo`'s `this` to `obj`
// so that it cannot be overriden
bar.call( window ); // 2
```

bar는 내부적으로 foo.call(obj)를 호출하여, foo가 obj를 this 바인딩으로 갖도록 강제한다. 이후에 어떻게 bar를 호출하든지 무조건 obj와 함게 foo를 호출하는 결과가 나온다. 이 바인딩은 명시적이고 강력하므로 하드 바인딩이라 부른다.

함수를 하드 바인딩하는 전형적인 방법은 넘겨지는 인자들과 리턴 값을 pass-thru하는 것이다.

```JS
function foo(something) {
	console.log( this.a, something );
	return this.a + something;
}

var obj = {
	a: 2
};

var bar = function() {
	return foo.apply( obj, arguments );
};

var b = bar( 3 ); // 2 3
console.log( b ); // 5
```



또 다른 하드 바인딩 패턴은 다시 사용할 수 있는 헬퍼를 만드는 것이다.

```JS
function foo(something) {
	console.log( this.a, something );
	return this.a + something;
}

// simple `bind` helper
function bind(fn, obj) {
	return function() {
		return fn.apply( obj, arguments );
	};
}

var obj = {
	a: 2
};

var bar = bind( foo, obj );

var b = bar( 3 ); // 2 3
console.log( b ); // 5
```



하드 바인딩은 꽤나 흔한 패턴이므로 ES5부터 내장 유틸리티가 제공되어 왔다.

Function.prototype.bind

```JS
function foo(something) {
	console.log( this.a, something );
	return this.a + something;
}

var obj = {
	a: 2
};

var bar = foo.bind( obj );

var b = bar( 3 ); // 2 3
console.log( b ); // 5
```

bind()는 새로운 함수를 리턴하는데, 그 함수는 넘겨준 값을 this로 하는 기존 함수다.

ES6부터 bind로 만들어진 함수는 name 속성을 가지는데, 이 name은 기존의 타겟 함수에 기반한다.

위의 예시에서 bar.name은 bound foo를 리턴한다. 

##### API Call "Contexts"

많은 라이브러리의 함수와 내장 함수들은 선택 인자를 제공한다. 이 선택 인자는 context라고 불리는데 콜백 함수가 특정한 this를 가지기 위해 bind를 쓰지 않아도 될 수 있게 한다.

```JS
function foo(el) {
	console.log( el, this.id );
}

var obj = {
	id: "awesome"
};

// use `obj` as `this` for `foo(..)` calls
[1, 2, 3].forEach( foo, obj ); // 1 awesome  2 awesome  3 awesome
```

내부적으로 이 함수들은 call/apply를 이용해 명시적인 바인딩을 사용할 확률이 매우 높다.

#### `new` Binding

네 번째이자 마지막 this 바인딩 규칙이다. 전통적인 클래스 기반 언어에서 생성자는(constructors) 클래스에 특별한 메소드로 new 연산자를 통해 클래스의 인스턴스가 만들어졌을 때 해당 클래스의 생성자를 호출한다. `something = new MyClass(..);`

JS는 `new` 연산자를 가지고 있고 클래스 기반 언어와 같은 식으로 동작한다. 

일단, JS에서의 생성자를 재정의해보자. 생성자는 `new` 연산자가 앞에 붙은 함수의 하나일 뿐이다. 클래스에 종속된 것도 아니고 클래스의 인스턴스도 아니다. 특별한 타입의 함수도 아니고 그저 일반 함수일 뿐이지만 호출될 때 new에 의해 다른 곳으로 인도될 뿐이다.

Number() 함수 역시 생성자처럼 동작한다. Number()처럼 내장된 오브젝트 함수들을 포함한 오래된 함수들은 앞에 new를 붙여서 호출할 수 있다. 그러면 생성자를 통한 호출이 되는 것이다. 생성자 함수라는 것은 없지만 생성자를 이용해 함수를 호출하는 것이 있다.

함수를 호출할 때 함수 앞에 new를 붙이면 즉, 생성자를 이용해 함수를 호출하면 다음과 같은 일들이 자동으로 진행된다.

1. 완전히 새로운 오브젝트가 생성된다.
2. 새로 생성된 오브젝트는 [[Prototype]]으로 연결된다.
3. 새로 생성된 오브젝트의 this 바인딩은 해당 오브젝트를 가리킨다.
4. 함수가 본인을 대체하는 오브젝트를 리턴하지 않는 이상, new와 함께 호출된 함수는 자동으로 새로 생성된 오브젝트를 리턴한다.

```JS
function foo(a) {
	this.a = a;
}

var bar = new foo( 2 );
console.log( bar.a ); // 2
```



### Everything In Order

함수 호출과 관련된 4가지 this 바인딩 규칙을 알아보았다. 해야 할 것은 콜 사이트를 알아내어 어떤 규칙이 적용되는지를 찾는 것이다. 그러나 콜 사이트에 적용 가능한 규칙이 여러 가지라면 어떻게 해야 할까? 규칙간에 우선순위가 있다.

기본 바인딩은 당연히 가장 낮은 우선순위를 갖는다. 그렇다면 암묵적인 바인딩과 명시적인 바인딩 중 무엇이 앞설까?

```JS
function foo() {
	console.log( this.a );
}

var obj1 = {
	a: 2,
	foo: foo
};

var obj2 = {
	a: 3,
	foo: foo
};

obj1.foo(); // 2
obj2.foo(); // 3

obj1.foo.call( obj2 ); // 3
obj2.foo.call( obj1 ); // 2
```

명시적인 바인딩이 우위를 가지므로 명시적인 바인딩이 적용되는지를 먼저 확인해야 한다.



new 바인딩의 우선순위는 어디일까

```JS
function foo(something) {
	this.a = something;
}

var obj1 = {
	foo: foo
};

var obj2 = {};

obj1.foo( 2 );
console.log( obj1.a ); // 2

obj1.foo.call( obj2, 3 );
console.log( obj2.a ); // 3

var bar = new obj1.foo( 4 );
console.log( obj1.a ); // 2
console.log( bar.a ); // 4
```

new 바인딩은 암묵적인 바인딩에 우선한다. 

new와 call/apply는 함께 사용될 수 없다. new foo.call(obj1)은 허용되지 않는 문법이다.

그러므로 하드 바인딩을 이용해서 new 바인딩과 명시적인 바인딩의 우선순위를 체크해보겠다.

하드 바인딩은 Function.prototype.bind()를 통해서 다른 this 바인딩을 무시하고 bind를 통해 넘긴 오브젝트를 this 바인딩으로 쓴다. 그래서 명시적 바인딩의 한 가지 형태인 하드 바인딩이 new 바인딩보다 앞서는 것처럼 보인다.

```JS
function foo(something) {
	this.a = something;
}

var obj1 = {};

var bar = foo.bind( obj1 );
bar( 2 );
console.log( obj1.a ); // 2

var baz = new bar( 3 );
console.log( obj1.a ); // 2
console.log( baz.a ); // 3
```

bar는 obj1으로 하드 바인딩 되었지만 new bar(3)이 obj1.a를 3으로 바꾸지 못 했다. 그 대신 하드 바인딩된 obj1은 new를 통해 덮어쓸 수 있다. new가 적용되었으므로 새로운 오브젝트가 만들어졌고 그 오브젝트는 baz라고 이름지어졌다. 그래서 baz.a가 3의 값을 가진다.

가짜 바인드 헬퍼를 다시 되돌아보자.

```JS
function bind(fn, obj) {
	return function() {
		fn.apply( obj, arguments );
	};
}
```

헬퍼의 코드가 어떻게 동작하는 지를 이해한다면

헬퍼를 통해서는 new 연산자가 하드 바인딩에 우선할 수 없다는 것을 알 것이다.



그러나 내장된 Function.prototype.bind는 그럴 수 있다. MDN페이지에서 bind에 대해 제공하는 polyfill이다.

```JS
if (!Function.prototype.bind) {
	Function.prototype.bind = function(oThis) {
		if (typeof this !== "function") {
			// closest thing possible to the ECMAScript 5
			// internal IsCallable function
			throw new TypeError( "Function.prototype.bind - what " +
				"is trying to be bound is not callable"
			);
		}

		var aArgs = Array.prototype.slice.call( arguments, 1 ),
			fToBind = this,
			fNOP = function(){},
			fBound = function(){
				return fToBind.apply(
					(
						this instanceof fNOP &&
						oThis ? this : oThis
					),
					aArgs.concat( Array.prototype.slice.call( arguments ) )
				);
			}
		;

		fNOP.prototype = this.prototype;
		fBound.prototype = new fNOP();

		return fBound;
	};
}
```



new가 덮어쓰는 것을 가능하게 하는 부분은 다음과 같다.

```JS
this instanceof fNOP &&
oThis ? this : oThis

// ... and:

fNOP.prototype = this.prototype;
fBound.prototype = new fNOP();
```

이미 하드 바운딩 된 함수가 new를 통해 호출되었다면 기존의 this 대신 새롭게 만들어진 this를 쓰게 된다.

왜 new가 하드 바인딩보다 우선 적용되는 것이 유용할까?

new 생성자를 통해 만들어진 오브젝트가 하드 바인딩된 this를 무시하고 함수의 인자들을 가져올 수 있게 된다. bind가 가지는 기능 중 하나가 처음에 제시되는 this 바인딩 인자 다음에 오는 인자들을 기본으로 가져갈 수 있게 해 준다. 이를 부분적인 어플리케이션(partial application)이라 한다.

```JS
function foo(p1,p2) {
	this.val = p1 + p2;
}

// using `null` here because we don't care about
// the `this` hard-binding in this scenario, and
// it will be overridden by the `new` call anyway!
var bar = foo.bind( null, "p1" );

var baz = new bar( "p2" );

baz.val; // p1p2
```

#### Determining this

다음의 질문들을 순서대로 던져서 해당되는 this를 적용한다.

1. new와 함께 함수가 호출되었는가? this는 새롭게 생성된 오브젝트다
2. call/apply로 함수가 호출되었는다? this는 명시된 오브젝트다
3. 함수가 context와 함께 호출되었는가? this는 context object다
4. 위의 질문에 대한 답이 모두 아니라면 this의 기본 바인딩이 적용된다. 스트릭트 모드라면 undefined, 아니라면 전역 오브젝트다.

### Binding Exceptions

모든 규칙에는 예외가 있다. 의도한 바와 다르게 기본 바인딩 규칙이 적용되는 경우가 있다. 이제부터 예외에 대해 알아보자.

#### Ignored this

bind/call/apply로 함수를 호출할 때 this 바인딩 인자로 null이나 undefined를 넘긴다면 그런 값들은 무시되므로 기본 바인딩이 적용된다.

apply를 이용해서 인자로 받은 어레이를 스프레딩 할 수 있다. 그와 마찬가지로 bind도 인자를 curry할 수 있다.(값을 미리 정할 수 있다.)

```JS
function foo(a,b) {
	console.log( "a:" + a + ", b:" + b );
}

// spreading out array as parameters
foo.apply( null, [2, 3] ); // a:2, b:3

// currying with `bind(..)`
var bar = foo.bind( null, 2 );
bar( 3 ); // a:2, b:3
```

이 유틸리티들은 첫 번재 인자로 this 바인딩을 요구한다. 만약 함수에서 this가 중요하지 않은 경우라면 플레이스 홀더가 필요하다. 그런 때에 null을 this 바인딩으로 만드는 것은 꽤나 합리적으로 보인다. 

this 바인딩을 쓰지 않을 때 null을 주는 것이 위험할 때도 있다. 만약 당신이 제어할 수 없는 제 3자 라이브러리 함수 등을 호출할 때 null을 쓴다면, 그리고 그 함수가 this를 참조한다면 기본 바인딩 규칙에 의해 전역 오브젝트를 참조하거나 변형시킬 수도 있기 때문이다.

#### safer this

좀 더 안전한 방식은 에러가 발생하지 않도록 구체적으로 설정한 오브젝트를 this 바인딩으로 만드는 것이다. DMZ 오브젝트라고 부를 수 있는 그저 비어있는 오브젝트보다 특별하지 않지만 delegate되지 않은 오브젝트를 만드는 것이다. 

완전히 비어있는 DMZ 오브젝트를 만들 수 있는 가장 쉬운 방법은 Object.create(null)이다. 이를 통해 { }와 비슷하지만 Object.prototype으로 만들어졌을 때와는 달리 delegation이 없다. 즉, { } 보다는 더 비어있는 셈이다.

```JS
function foo(a,b) {
	console.log( "a:" + a + ", b:" + b );
}

// our DMZ empty object
var ø = Object.create( null );

// spreading out array as parameters
foo.apply( ø, [2, 3] ); // a:2, b:3

// currying with `bind(..)`
var bar = foo.bind( ø, 2 );
bar( 3 ); // a:2, b:3
```

#### Indirection

당신이 의도하든 하지 않든 간접적으로 함수를 참조할 수 있다. 그런 함수가 호출되면 기본 바인딩 규칙이 적용된다. 가장 흔한 간접 참조는 할당할 때 이뤄진다.

```JS
function foo() {
	console.log( this.a );
}

var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4 };

o.foo(); // 3
(p.foo = o.foo)(); // 2
```

p.foo = o.foo 할당의 결과 값은 근본적인 함수 오브젝트에 대한 참조다. 효과적인 foo의 콜 사이트는 p.foo()나 o.foo()가 아니다. 기본 바인딩 규칙이 적용된다.

#### Softening Binding

하드 바인딩을 통해 기본 바인딩이 적용되는 것을 방지한다고 말했다. 그러나 하드 바인딩은 함수의 유연성을 떨어트려 암묵적인 바인딩이나 다른 명시적 바인딩이 this를 덮어쓰는 것을 방지한다.

만약 전역 오브젝트나 undefined가 아닌 다른 기본 바인딩을 줄 수 있다면 어떨까? 여전히 암묵적 혹은 명시적 바인딩을 통해 this 바인딩을 줄 수도 있다면 말이다.

그런 바인딩을 소프트 바인딩이라 부른다.

```JS
if (!Function.prototype.softBind) {
	Function.prototype.softBind = function(obj) {
		var fn = this,
			curried = [].slice.call( arguments, 1 ),
			bound = function bound() {
				return fn.apply(
					(!this ||
						(typeof window !== "undefined" &&
							this === window) ||
						(typeof global !== "undefined" &&
							this === global)
					) ? obj : this,
					curried.concat.apply( curried, arguments )
				);
			};
		bound.prototype = Object.create( fn.prototype );
		return bound;
	};
}
```

softBind() 유틸리티는 ES5의 내장된 bind 유틸리티와 비슷한 동작을 제공한다. 함수를 호출할 때 this를 확인해서 전역 오브젝트이거나 undefined면 미리 명시해 놓은 대체할 기본 오브젝트(이 경우엔 obj)를 this 바인딩으로 쓴다. 전역 오브젝트나 undefined가 아니라면 this 바인딩은 바뀌지 않는다. 

```JS
function foo() {
   console.log("name: " + this.name);
}

var obj = { name: "obj" },
    obj2 = { name: "obj2" },
    obj3 = { name: "obj3" };

var fooOBJ = foo.softBind( obj );

fooOBJ(); // name: obj

obj2.foo = foo.softBind(obj);
obj2.foo(); // name: obj2   <---- look!!!

fooOBJ.call( obj3 ); // name: obj3   <---- look!

setTimeout( obj2.foo, 10 ); // name: obj   <---- falls back to soft-binding
```



### Lexical `this`

보통의 함수는 우리가 배운 4가지 규칙이 적용된다. 그러나 ES6에서 새로 도입된 특별한 함수인 화살표 함수는 이러한 규칙이 적용되지 않는다. 화살표 함수는 function 키워드가 아니라 =>에 의해 표시된다. 화살표 함수의 this 바인딩은 함수를 감싸고 있는 함수나 전역 스코프를 가져온다.

```JS
function foo() {
	// return an arrow function
	return (a) => {
		// `this` here is lexically adopted from `foo()`
		console.log( this.a );
	};
}

var obj1 = {
	a: 2
};

var obj2 = {
	a: 3
};

var bar = foo.call( obj1 );
bar.call( obj2 ); // 2, not 3!
```

foo에서 만들어진 화살표 함수는 foo의 this를 호출된 때의 렉시컬 스코프로 정한다. foo가 obj1에 this 바인딩되었기 때문에 화살표 함수의 리턴에 의해 참조된 bar 역시 obj1에 this 바인딩되었다. 화살표 함수의 렉시컬 바인딩은 덮어씌울 수 없다. new 연산자조차 덮어쓸 수 없다.

화살표 함수는 보통 콜백 함수로 많이 이용된다.

```JS
function foo() {
	setTimeout(() => {
		// `this` here is lexically adopted from `foo()`
		console.log( this.a );
	},100);
}

var obj = {
	a: 2
};

foo.call( obj ); // 2
```

화살표 함수를 이용하면 bind를 쓰지 않고 this를 확정시킬 수 있다. 전통적인 this 메커니즘을 쓰지 않고 렉시컬 스코프를 쓴다. 



```JS
function foo() {
	var self = this; // lexical capture of `this`
	setTimeout( function(){
		console.log( self.a );
	}, 100 );
}

var obj = {
	a: 2
};

foo.call( obj ); // 2
```

 self = this와 화살표 함수가 bind를 쓰지 않기 위해 좋은 대책같지만 this를 이해하고 쓰는 것과는 조금 차이가 있다.

만약 this 스타일의 코드를 쓰고 싶은데 this 메커니즘을 렉시컬 스코프를 이용해서 구현하고 싶다면

1. 렉시컬 스코프만 써라. 아니면,
2. this 메커니즘을 완전히 받아들이고 bind를 쓰고 self = this나 화살표 함수를 쓰는 것을 지양해라



두 스타일을 섞은 코드도 분명히 동작할 수 잇지만 유지보수하기 힘든 코드가 되므로 되도록이면 한 쪽을 선택하자

## Objects

### Syntax

오브젝트의 형태는 선언형과 생성형 두 가지다

```JS
// 선언형
var myObj = {
	key: value
	// ...
};

// 생성형
var myObj = new Object();
myObj.key = value;
```

선언형과 생성형의 결과로 생기는 오브젝트는 동일하다. 유일한 차이점이라면 선언형은 한 번에 여러가지 속성을 더할 수 있다면 생성형은 한 번에 하나의 속성만 더할 수 있다는 것이다. 대개 선언형을 사용한다.

### Type

JS의 대부분이 오브젝트를 기반으로 한다. JS의 오브젝트는 여섯 가지 원시 타입을 가진다.

- `string`
- `number`
- `boolean`
- `null`
- `undefined`
- `object`



단순한 원시형(string, number, boolean, null, undefined) 자체가 오브젝트는 아니다. typeof null이 "object"를 리턴하는 버그가 있지만 null 역시 하나의 원시형이지 오브젝트는 아니다.

JS의 모든 것은 오브젝트라는 말도 있지만 이는 사실이 아니다.

몇몇 특별한 오브젝트의 서브 타입이 있는데 이것을 복잡한 원시형이라고 할 수 있다.

함수는 오브젝트의 서브 타입이다. 기술적으로는 호출할 수 있는 오브젝트라고 한다. JS의 함수를 일급함수라고 부르는 이유는 함수가 호출할 수 있는 기능이 더해진 일반 오브젝트라서 다른 오브젝트처럼 사용할 수 있기 때문이다.

#### Built-in Objects

오브젝트의 서브 타입은 더 있다. 보통 내장 오브젝트라고 한다. 이름이 동일한 단순 원시형에 대응하는 오브젝트형이라고 생각하기 쉽지만 그보다는 좀 더 복잡한 관계를 가진다.

- `String`
- `Number`
- `Boolean`
- `Object`
- `Function`
- `Array`
- `Date`
- `RegExp`
- `Error`

상기한 내장 오브젝트들은 다른 언어에서는 실제 타입이나 클래스로 취급된다. 그러나 JS에서는 하나의 내장 함수다. 각 내장 함수는 생성자로 쓰일 수 있다. 생성자로 쓰일 경우 새롭게 생성된 오브젝트를 리턴한다.

```JS
var strPrimitive = "I am a string";
typeof strPrimitive;							// "string"
strPrimitive instanceof String;					// false

var strObject = new String( "I am a string" );
typeof strObject; 								// "object"
strObject instanceof String;					// true

// inspect the object sub-type
Object.prototype.toString.call( strObject );	// [object String]
```

strObject는 String 생성자에 의해 만들어진 오브젝트다.

strPrimitive는 원시 타입으로 오브젝트가 아니다. immutable하다.

이것을 가지고 연산을 하려면(길이 확인, 각 글자에 접근) String 오브젝트가 필요하다.

다행히 JS는 필요할 때 자동으로 string 원시 타입을 String 오브젝트로 변환시켜준다.

즉, 당신이 명시적으로 오브젝트 폼을 만들어야 할 필요는 없다.

이와 같은 변환이 number, boolean에서도 일어난다.

null/undefined는 오브젝트 폼이 없고 원시 값만 있다.

반대로 Date는 생성자를 통해서만 만들어질 수 있다.

Objects, Arrays, Functions, and RegExps는 선언을 통해 만들든 생성자를 통해 만들든 상관없이 모두 오브젝트다. 생성자는 어떤 경우 선언보다 더 많은 옵션을 제공한다. 오브젝트는 생성 방식에 구애를 받지 않으므로 좀 더 간단한 선언 방식을 주로 사용한다.

Error 오브젝트는 코드에서 명시적으로 만들어지는 경우는 드물고 예외에 의해 자동적으로 발생한다. 생성자를 통해 만들 수도 있다. `new Error()`



### Contents

오브젝트의 컨텐츠는 그 값의 타입이 무엇이든 우리가 속성(property)라고 부르는 이름을 붙인 공간에 저장된다.

컨텐츠라고 하면 오브젝트에 저장된 것처럼 보이는 값을 의미한다.

오브젝트 컨테이너 안에 속성의 이름이 저장되어 있는데,

그 이름은 저장된 값을 참조하는 포인터 역할을 한다.

```jsx
var myObject = {
	a: 2
};

myObject.a;		// 2

myObject["a"];	// 2
```

myObject의 a에 저장된 값에 접근하기 위해서 `.`이나 `[]`를 사용한다.

`.a` 은 속성 접근, `["a"]`는 키 접근이라고 부른다.

둘 모두 같은 위치에 접근하는 것으로 당연히 같은 값을 가져온다.

두 접근법의 가장 큰 차이는 `.`은 식별자(identifier)를 . 연산자 뒤에 필요로 한다는 것이고

`[".."]`는 속성의 이름이 될 수 있는 스트링이라면 아무거나 받을 수 있다는 것이다.

만약 속성의 이름이 'Super-Fun!'이라면 .으로는 접근할 수 없다.

`[""]`가 해당 위치에 접근하기 위해 string 값을 사용하므로 프로그램은 string을 만들어 내서 사용해도 된다.

```jsx
var wantA = true;
var myObject = {
	a: 2
};

var idx;

if (wantA) {
	idx = "a";
}

// later

console.log( myObject[idx] ); // 2
```

오브젝트에서 속성의 이름은 항상 스트링이다.(원시 타입) 다른 값을 쓰려면 일단 스트링으로 변환시켜야 한다.

#### Computed Property Names

[]를 이용해서 오브젝트의 속성에 접근하는 문법은 키 값에 연산이 들어갈 때 유용하다

ex) myObject[prefix + name]



```JS
var prefix = "foo";

var myObject = {
	[prefix + "bar"]: "hello",
	[prefix + "baz"]: "world"
};

myObject["foobar"]; // hello
myObject["foobaz"]; // world
```

연산을 이용한 속성 이름은 ES6부터 도입되었는데 ES6 Symbol에 특히 유용하다. 

```JS
var myObject = {
	[Symbol.Something]: "hello world"
};
```

#### Property vs. Method



### Iteration

## Mising (Up) "Class" Objects

### Class Theory

### Class Mechanics

### Class Inheritance

### Mixins

## Prototypes

### `[[Prototype]]`

### "Class"

### "(Prototypal) Inheritance"

### Object Links

## Behavior Delegations

### Towards Delegation-Oriented Design

### Classes vs. Objects

### Simpler Design

### Nicer Syntax

### Introspection

## ES6 class



# TYPES&GRAMMAR

## Types

JS처럼 동적 언어는 타입이 없다고 알고 있겠지만 JS에도 타입이라고 부르는 것이 있다

- Undefined
- Null
- Boolean
- String
- Number
- Object
- Symbol(ES6부터!)

가 바로 그것이다. 엄격한 타입을 좋아하는 사람들은 아마 JS의 타입은 진정한 의미의 타입이 아니라고 주장할 것이다. JS의 타입은 보통 쓰이는 타입보다 훨씬 할 수 있는 것이 적다. 

JS의 타입을 정의해 보자면 a *type* is an intrinsic, built-in set of characteristics that uniquely identifies the behavior of a particular value and distinguishes it from other values, both to the engine **and to the developer**.

### A Type By Any Other Name...

JS가 타입을 가지고 있는지 아닌지가 왜 중요할까? 각 타입에 내재된 행동을 이해해야만 타입을 변환시키는 적절한 방법을 알 수 있다. 거의 모든 JS프로그램이 값의 변환을 전제로 할 것이다. 

### Built-in Types

null, undefined, boolean, number, string, object, symbol의 7가지가 JS의 내장 타입으로 object를 제외한 6가지는 원시타입이라고 불린다. 

typeof 연산자는 주어진 값의 타입을 판별하고 리턴하는 값은 언제나 내장 타입 7가지 중 하나다.  리턴값은 스트링이다. 

```JS
typeof undefined     === "undefined"; // true
typeof true          === "boolean";   // true
typeof 42            === "number";    // true
typeof "42"          === "string";    // true
typeof { life: 42 }  === "object";    // true

// added in ES6!
typeof Symbol()      === "symbol";    // true

typeof null === "object"; // true
```

버그지만 그냥... null의 타입은 object라고 기억하자

만약 null 타입을 구별해야 한다면!

```JS
var a = null;

(!a && typeof a === "object"); // true
```

null은 원시 타입 중에 falsy 값을 갖는 유일한 타입이다.

null 대신 typeof가 리턴하는 7번째 값은 바로 "function"이다. function을 JS에서 하나의 최상위 내장 타입이라고 보면 될 것 같다. function은 object의 subtype으로 부를 수 있는 오브젝트(callable object)라고 할 수 있다. 함수는 오브젝트의 서브타입이기 때문에 속성(property)을 가질 수 있다. 함수의 length 속성은 함수가 받는 인자의 갯수이다.

```JS
function a(b,c) {...}

typeof a === "function";  // true

a.length; // 2                 
```

array 역시 오브젝트의 서브타입이지만 어레이의 typeof는 오브젝트다. 

### Values as Types

변수는 타입을 가지지 않지만 값은 타입을 가진다. 변수는 어떤 값이든 가질 수 있다. 

#### undefined vs undeclared

아직 아무 값도 할당되지 않은 변수는 사실은 undefined 값을 가지고 있다. 그래서 그런 변수에 typeof를 쓰면 "undefined"를 리턴한다.

```JS
var a;

typeof a; // "undefined"

var b = 42;
var c;

// later
b = c;

typeof b; // "undefined"
typeof c; // "undefined"
```

undefined와 undeclared를 같은 것이라고 생각할 수 있지만 둘은 조금 다른 개념이다. undefined 변수는 접근 가능한 스코프 내에서 선언이 되었지만 아직 할당받은 값이 없는 것이고 undeclared 변수는 아직 접근 가능한 스코프 내에서 정식으로 선언되지 않은 변수이다.

```JS
var a;

a; // undefined
b; // ReferenceError: b is not defined

typeof a; // "undefined"
typeof b; // "undefined"
```

typeof는 선언되지 않은 변수도 undefined를 리턴한다.

#### typeof Undeclared

모든 전역 변수는 전역 오브젝트의 속성이다. 전역 오브젝트는 브라우저에서 윈도우 오브젝트를 말한다. 

## Values

### Arrays

다른 프로그래밍 언어와 달리 JS에서의 어레이는 어떤 타입의 값이든(string, number, object, array) 담을 수 있는 컨테이너다.

어레이의 값에 delete를 쓰면 해당 엘리먼트는 지워지지만 어레이의 length 속성은 갱신되지 않는다. 

sparse array(빈 공간이 있는 어레이)를 만들지 않도록 주의하자

```JS
var a = [];

a[0] = 1;
a[2] = 3;
a[1]; // undefined
a.length; // 3

delete a[0]
a.length; // 3

a // [undefined, undefined, 3]
```

어레이의 빈 자리는 마치 undefined 값을 가진 것처럼 보이지만 

a[1] = undefined라고 직접 할당되는 것과는 다른 양상을 보인다.



어레이는 인덱스가 매겨져있지만 어레이 역시 오브젝트이기 때문에 스트링으로 된 키나 속성을 더할 수 있다.(이 때 키와 속성은 어레이의 length에 영향을 끼치지 않는다.)

```JS
var a = [];
a[0] = 1;
a["foobar"] = 2;

a.length; // 1
a["foobar"]; // 2
a.foobar; // 2
```

주의해야 할 점은 만약 10진수 숫자를 글자로 된 키로 사용한다면 넘버 인덱스로 인식된다.

 ```JS
var a = [];
a["13"] = 42;
a.length; // 14
 ```

대개의 경우 어레이에 스트링 키/속성을 더하는 것은 좋은 생각이 아니다. 그런 경우에는 어레이가 아니라 오브젝트를 써야 한다.

#### Array-Likes

어레이같이 생긴 값을 진짜 어레이로 바꾸는 방법!(어레이의 유틸리티를 사용할 수 있도록.. indexOf(), concat(), forEach()...)

어레이같이 생긴 값이라 하면 숫자로 인덱스가 매겨진 값들의 집합을 뜻한다.

많은 DOM 쿼리 연산이 DOM 엘리먼트들의 리스트를 리턴하는데 이 리스트는 어레이는 아니지만 어레이처럼 생겼다. 함수의 arguments 오브젝트도 어레이같은 리스트다.

어레이로의 변환을 하는 가장 흔한 방법은 slice() 유틸리티를 사용하는 것이다.

```JS
 function foo() {
   var arr = Array.prototype.slice.call(arguments);
   var arr2 = Array.from( arguments );
   arr.push("bam");
   console.log(arr);
 }

foo("bar", "baz"); // ["bar", "baz", "bam"]
```

 만약 slice()가 위의 코드에서와 같이 다른 인자 없이 호출된다면 디폴트 값은 해당 어레이를 복제하는 것이다.(위의 경우에서는 어레이 같이 생긴 리스트를!)

ES6부터는 Array.from()이라는 내장된 유틸리티를 통해서 어레이로 변환시킬 수 있다.

### Strings

스트링을 문자들로 이루어진 어레이라고 생각하는 사람들이 많다. 내부적으로 어레이를 사용할 수도 있지만 JS에서 스트링은 어레이가 아니라는 것이 중요하다. 

스트링은 어레이처럼 length 속성, indexOf() 메소드, concat() 메소드를 가진다. 

그러나 스트링은 immutable이다.(변경할 수 없다.) 어레이는 mutable.

스트링을 인덱스로 접근하는 a[1]같은 방법은 JS에서 항상 유효하지는 않다. IE 구버전은 이를 인정하지 않았다. 스트링에서 인덱스를 쓰는 옳은 방법은 `a.charAt(1)`이다.

스트링은 immutable하기 때문에 스트링의 메소드가 스트링의 컨텐츠를 제 자리에서 변경할 수는 없다. 새로운 스트링을 만들어서 리턴하는 경우가 흔하다. 어레이의 메소드는 대개 해당 어레이를 직접 변경해서 리턴한다.

어레이의 메소드들은 스트링에 사용된다면 좋은 시너지를 가져올 수 있는데 immutable/mutable의 차이로 사용이 불가능하므로 어레이의 메소드 중 non-mutaion 방식을 스트링에 쓸 수 있다.

```JS
var a = "foo";
var b = ["f", "o", "o"];
a.join // undefined
a.map // undefined

var c = Array.prototype.join.call(a, "-");
var d = Array.prototype.map.call(a, function(v) {
  return v.toUpperCase() + ".";
}).join("");

c; // "f-o-o"
d; // "F.O.O"

a.reverse; // undefined
b.reverse(); // ["o", "o", "f"]
b; // ["o", "o", "f"]
```

reverse는 스트링에 쓸 수 없다.(Array.prototype으로 빌려도 못 씀)

변경된 것을 리턴해야 하는데 스트링은 그것이 불가능하기 때문

이를 위해서는 스트링을 어레이로 변환해서 reverse를 쓰고 다시 스트링으로 변환시키는 방법이 있다. 이 방법은 복잡한 문자에는 통하지 않는다.(유니코드 글자, 아스트랄 심볼, 멀티바이트 글자 등...)

```JS
var e = a
	.split("") // split `a` into an array of characters
	.reverse()
	.join("");
e; // "oof"
```

### Numbers

 JS가 가진 숫자 타입은 단 하나 넘버다. 넘버는 integer 값과 소숫점 이하 소수 모두를 포함한다. JS의 인티저는 진짜 인티저가 아니라는 말이 많다. JS의 인티저는 소숫점 이하가 없는 값을 뜻한다. 

#### Numeric Syntax

toFixed() 메소드는 소숫점 이하 숫자가 몇 자리나 올 지를 나타낸다.

```JS
var a = 42.59;

a.toFixed( 0 ); // "43"
a.toFixed( 1 ); // "42.6"
a.toFixed( 2 ); // "42.59"
a.toFixed( 3 ); // "42.590"
a.toFixed( 4 ); // "42.5900"
```

넘버의 아웃풋이 스트링이라는 것..!

toPrecision()은 toFixed()와 비슷하지만 중요한 숫자가 몇 개나 표시될 지를 나타낸다.

```JS
var a = 42.59;

a.toPrecision( 1 ); // "4e+1"
a.toPrecision( 2 ); // "43"
a.toPrecision( 3 ); // "42.6"
a.toPrecision( 4 ); // "42.59"
a.toPrecision( 5 ); // "42.590"
a.toPrecision( 6 ); // "42.5900"
```

넘버를 꼭 변수에 넣을 필요는 없지만 주의해서 사용해야 한다.

```JS
// invalid syntax:
42.toFixed( 3 );	// SyntaxError

// these are all valid:
(42).toFixed( 3 );	// "42.000"
0.42.toFixed( 3 );	// "0.420"
42..toFixed( 3 );	// "42.000"
```

#### small decimal values

binary floating-point number의 가장 악명 높은 부작용은 (IEEE 754를 사용하는 모든 언어에서 나타나는 부작용이다) 다음과 같다.

```JS
0.1 + 0.2 === 0.3; // false
```

수학적으로 이는 참일 텐데 왜 거짓일까

이진 부동 소수점 숫자인 0.1과 0.2는 정확히 0.1과 0.2가 아니다. 그러므로 둘을 합한 것 역시 정확히 0.3이 아니고 0.3000000000004에 가깝다고 할 수 있다. 그리고 비교 연산에서 가깝다는 아무 의미가 없다.

### Special Values

#### the non-value values

undefined 타입은 undefined 값 하나만을 가진다. null 타입 역시 null 값 하나만을 가진다. undefined와 null은 empty 값이나 non 값으로 쓰이기도 한다. 어떤 개발자들은 두 값을 구분하기도 하는데 그 방법은

null은 empty, undefined는 missing value 혹은

null은 값이 있었지만 이제는 없는 경우, undefined는 아직 값이 할당된 적이 없는 경우로 나뉜다.

어떤 방법을 쓰든 null은 특별한 키워드이지 식별자가 아니다. 그러므로 null을 변수에 할당할 수 없다. undefined는 식별자다.

#### Undefined

스트릭트 모드가 아니라면 undefined 식별자에 값을 할당할 수도 있다.(물론 권장하지는 않는다)

스트릭트 모드에서 할당하려고 시도하면 TypeError

스트릭트 모드든 아니든 변수를 만들어서 undefined라고 이름 붙일 수는 있지만 역시 권장하지는 않는다.

#### void operator

undefined가 내장된 식별자로 내장된 undefined 값을 가지고 있는데, 이 값을 가질 수 있는 또 다른 방법이 void 연산자이다.

```JS
var a = 42;

console.log( void a, a ); // undefined 42
```

void 0, void 1, undefined 값 사이에 실질적인 차이는 없다. 그러나 void 연산자는 특정한 상황에서 유용하게 쓰이는데 바로 result 값이 없는 때이다.

#### Special Numbers

##### the Not Number, Number

두 인자가 다 넘버(혹은 10진수, 16진수로 인터프리트될 수 있는 값)가 아닌데 수학적 연산을 실행하면 유효한 넘버를 만들 수 없어서 NaN 값을 리턴한다.

 NaN은 not a number의 줄임말인데 이는 너무 단순화되어 있다. NaN은 유효하지 않은 넘버, 실패한 넘버, 나쁜 넘버 등으로 생각하는 것이 낫지 넘버가 아니라고 생각하면 안 된다.

```JS
var a = 2 / "foo"; // NaN
typeof a === "number";  // true
```

NaN의 타입이 넘버라는 것에 주목하자

NaN은 일종의 경계값(sentinel value)으로 넘버 셋에 있는 특별한 종류의 에러 조건을 나타낸다. 이 에러 조건은 '수학적 연산을 시도했지만 실패했고 이게 내가 실패한 넘버 연산 대신 결과로 내놓는 값이야'를 나타낸다.

```JS
var a = 2 / "foo";

a == NaN; // false
a === NaN; // false
NaN !== NaN; // true

isNaN(a); // true
```

NaN은 특별한 값으로 다른  NaN 값, 즉 자기 자신과 동일한 값이 아니다. NaN은 유일한 값이다. NaN을 비교하려면 isNaN()을 써야 한다. 그러나 이 메소드에는 치명적인 결함이 있는데 스트링 같은 경우 분명히 넘버 타입은 아니지만 isNaN 메소드에 true를 리턴한다. 처음부터 있었던 버그로 ES6에서 이런 경우를 위해 추가된 유틸리티가 `Number.isNaN()` 이 있다.

```JS
var a = 2 / "foo";
var b = "foo";

a; // NaN
b; // "foo"

window.isNaN( a ); // true
window.isNaN( b ); // true -- ouch!

if (!Number.isNaN) {
	Number.isNaN = function(n) {
		return (
			typeof n === "number" &&
			window.isNaN( n )
		);
	};
}

var a = 2 / "foo";
var b = "foo";

Number.isNaN( a ); // true
Number.isNaN( b ); // false -- phew!
```

NaN이 유일하게 자기 자신과도 동일하지 않은 값이므로 그를 이용해서 아래와 같이 간단하게 만들 수도 있다.

```JS
if (!Number.isNaN) {
	Number.isNaN = function(n) {
		return n !== n;
	};
}
```

JS 프로그램을 짜면서 NaN은 피할 수 없는 문제다. 그래서 신뢰할 수 있도록 테스트를 하는 것이 중요한데 단순히 isNaN()을 쓰면 버그가 있으므로 꼭 상기한 것처럼 Number.isNaN()을 쓰도록 하자

##### Infinities

JS에서 어떤 값을 0으로 나누는 연산은 C같은 언어에서 에러나 런타임 초과가 나오는 것과 달리 Infinity라는 값을 리턴한다.

```JS
var a = 1 / 0; // Infinity
var b = -1 / 0; // -Infinity
```

어떤 값이 너무 커서 Infinity가 되고 나면 다시 정상 숫자로 돌아올 수는 없다. 

js에서  Infinity / Infinity는  NaN을 리턴한다.

양의 유한한 넘버를(positive finite number) Infinity로 나누면 답은 0!

음의 유한한 넘버는라면? 그건 밑에서 서술하겠다.

##### Zeros

JS에서는 보통의 0 (양의 0으로 +0이라고 쓸 수 있다)과 음의 0(-0)이 있다.

```JS
var a = 0 / -3; // -0
var b = 0 * -3; // -0
```

더하기와 빼기로는 -0를 도출해낼 수 없다.

만약 -0를 스트링으로 만들면 "0"이 된다.

그러나 "-0"를 넘버로 바꾸는 것은 가능하다.

```JS
var a = 0 / -3;

// (some browser) consoles at least get it right
a;							// -0

// but the spec insists on lying to you!
a.toString();				// "0"
a + "";						// "0"
String( a );				// "0"

// strangely, even JSON gets in on the deception
JSON.stringify( a );		// "0"

+"-0";				// -0
Number( "-0" );		// -0
JSON.parse( "-0" );	// -0

var a = 0;
var b = 0 / -3;

a == b;		// true
-0 == 0;	// true

a === b;	// true
-0 === 0;	// true

0 > -0;		// false
a > b;		// false
```

### Value vs Reference

JS는 포인터가 없어서 참조가 다른 프로그래밍 언어와는 조금 다르게 동작한다. 하나의 JS 변수가 다른 변수를 참조할 수 없다. 그냥 불가능하다. JS의 참조는 값을 가리킨다. 만약 10가지의 다른 참조가 있다면 그 10개는 모두 하나의 공유된 값을 각자 참조한다. 그 중 하나도 서로를 참조하거나 포인터하지 않는다.

JS에서 value와 reference 할당/패싱을 통제할 수 있도록 어떤 힌트를 주지는 않는다. value의 타입은 그 value가 value-copy에 의해 할당되었는지 reference-copy에 의해 할당되었는지에 의해 갈린다.

```JS
var a = 2;
var b = a; // `b` is always a copy of the value in `a`
b++;
a; // 2
b; // 3

var c = [1,2,3];
var d = c; // `d` is a reference to the shared `[1,2,3]` value
d.push( 4 );
c; // [1,2,3,4]
d; // [1,2,3,4]
```

원시 타입의 경우 항상 value-copy에 의해 값을 할당받는다. null, undefined, string, number, boolean, symbol이 그것이다. 복합적인 값인 오브젝트,(어레이를 포함하여) 함수는 언제나 reference-copy에 의해 값이 할당된다.

a의 카피인 b의 값이 바뀐다고 해서 a의 값이 영향을 받지는 않는다.

그러나 c, d는 참조 카피이므로 경우가 다르다. c, d는 공유된 값인 [1, 2, 3]을 참조하는데 공유된 값이 복합적인 값이므로, c든 d든 [1, 2, 3]이라는 값을 가지고 있는 것이 아니다. 그냥 해당 값을 참조하는 것이다. 그러므로 어느 한 쪽이 공유된 값에 변형을 가하면 모두 영향을 받는다. 참조는 값 그 자체를 가리키는 것이지 변수를 가리키는 것이 아니다. 만약 d가 다른 것을 참조한다고 해서 c 역시 다른 것을 참조하게 되지는 않는다.

```JS
var a = [1,2,3];
var b = a;
a; // [1,2,3]
b; // [1,2,3]

// later
b = [4,5,6];
a; // [1,2,3]
b; // [4,5,6]
```

```JS
function foo(x) {
	x.push( 4 );
	x; // [1,2,3,4]

	// later
	x = [4,5,6];
	x.push( 7 );
	x; // [4,5,6,7]
}

var a = [1,2,3];

foo( a );

a; // [1,2,3,4]  not  [4,5,6,7]
```

x = [4, 5, 6];부터는 더 이상 x가 a가 아니다. 그래서 a가 [1, 2, 3, 4]가 된다.

```JS
function foo(x) {
	x.push( 4 );
	x; // [1,2,3,4]

	// later
	x.length = 0; // empty existing array in-place
	x.push( 4, 5, 6, 7 );
	x; // [4,5,6,7]
}

var a = [1,2,3];

foo( a );

a; // [4,5,6,7]  not  [1,2,3,4]
```

x.length = 0; 문장은 새로운 어레이를 만드는 게 아니라 a 어레이를 비운 것이므로 a는 [4, 5, 6, 7]이 된다.

## Natives

흔히 사용되는 네이티브 리스트

* `String()`
* `Number()`
* `Boolean()`
* `Array()`
* `Object()`
* `Function()`
* `RegExp()`
* `Date()`
* `Error()`
* `Symbol()` -- added in ES6!

이 네이티브들은 사실 내장 함수들이다. 

### Internal [[Class]]

### Boxsing Wrappers

### Unboxing

### Natives as Constructors

## Coercion

### Converting Values

### Abstract Value Operations

### Explicit Coercion

### Implicit Coercion

### Loose Equals vs Strict Equals

### Abstract Relational Comparison

## Grammar

### Statements & Expressions

statement와 expression이 대충 같은 것이라고 생각하는 개발자들이 많다. 그러나 JS 프로그램에서 둘은 중요한 차이점을 가진다. 

sentence는 단어들을 완벽한 형태로 조합하여 생각을 표현하는 것이다. 하나 이상의 구문으로 구성되어 있고 각 구문은 접속사나 구두점으로 연결될 수 있다. 구문은 더 작은 구문들로 이루어질 수 있다. 어떤 구문들은 불완전하여 구문만으로는 홀로 설 수 없지만 어떤 구문은 완전하다. 이러한 규칙들을 영어의 문법이라고 부른다.

이런 문법이 JS에도 있다. statements는 sentences고 expressions는 구문, 연산자는 각 구문을 연결해 주는 접속사/구두점이다. 

JS의 모든 expression은 하나의 특정한 value result로 나타낼 수 있다.

```JS
var a = 3 * 6;
var b = a;
b;
```

첫번째 줄의 3*6(18으로 나타낼 수도..), 두번째 줄의 a, 세번째 줄의 b 모두 expression이다. a, b는 각 변수에 저장된 값으로 나타낼 수 있다.

각 줄은 expression을 포함하고 있는 statement이다. 첫번째 두번째 줄은 선언문이다. 세번째 줄은 b라는 표현만을 가지고 있는데 이 자체로  statement이고 표현문이다.

### statement completion values

모든 statement는 completion value를 가지고 있다.(그게 undefined라 할지라도) completion value를 어떻게 확인할 수 있을까? 가장 확실한 방법은 콘솔에서 해당 문장을 쳐보는 것이다. 

var b = a라는 문장의 completion value는 무엇일까? a는 위에서 18이 할당되었었지만 var 문장은 undefined다. 그냥 var 문장은 그렇게 정해졌다. 만약  var a = 42;를 확인해도 42가 아닌 undefined가 completion value다.

콘솔이 출력하는 completion value는 우리가 프로그램에서 쓸 수 있는 값이 아니다. 그렇다면 어떻게  completion value를 잡아낼 수 있을까? 

우리는 다른 타입의 statement completion value를 고려해야 한다. 어느 {} 블럭이든 해당 블럭의 마지막 statement/expression의 completion value를 completion value로 가진다. 

```JS
var b;

if (true) {
	b = 4 + 38;
}
```

만약 이를 콘솔에 친다면 42를 볼 수 있을 것이다. 

그러나 다음과 같은 경우는 completion value를 잡아낼 수 없다.

```JS
var a, b;

a = if (true) {
	b = 4 + 38;
};
```

문장의 completion value를 잡아서 다른 변수에 할당할 수 없다. 

### expression side effects

대부분의 표현은 부작용이 없다. 가장 흔한 부작용을 보여주는 expression은 함수를 호출하는 표현이다.

```JS
function foo() {
	a = a + 1;
}

var a = 1;
foo();		// result: `undefined`, side effect: changed `a`
```

또 다른 표현은 다음과 같다.

```JS
var a = 42;
var b = a++;

a;	// 43
b;	// 42
```

a++는 두 가지 다른 행동을 가지고 있다. 첫번째, a의 현재값을 리턴한다.(42를 b에 할당하기 위해서) 두번째, a의 값을 하나 더한다.

많은 개발자들이 b가 a와 같이 43이라는 값을 가졌다고 착각한다. 이는 ++ 연산자를 잘못 이해하고 있기 때문이다. ++ 연산자와 -- 연산자는 unary 연산자로 뒤에 올 수도 앞에 올 수도 있다.

```JS
var a = 42;

a++;	// 42
a;		// 43

++a;	// 44
a;		// 44
```

++가 앞에 위치했을 때는 표현이 리턴되기 전에 더하기가 이루어지지만, 뒤에 위치하면 리턴을 한 뒤에 1이 더해진다.

이런 부작용을 방지하기 위해 a++를 ()로 감싸면 더해진 뒤 리턴이 이루어질 거라고 믿는 사람들도 있다. 그러나 값이 리턴되는 것이 먼저다 

```JS
var a = 42;
var b = (a++);

a;	// 43
b;	// 42
```

쓸 수 있는 방법이 있긴 하다. `,` statement-series comma operator로 여러 표현식을 하나의 statement로 만들어준다.

```JS
var a = 42, b;
b = ( a++, a );

a;	// 43
b;	// 43
```

()는 연산자 우선순위 때문에 필요하다. 

(a++, a)에서 두번째 a는 a++가 유효해진 후의 값을 가져온다.

부작용이 있는 또 다른 표현은 delete다. delete는 오브젝트의 속성을 없애거나 array의 슬롯을 없앨 때 사용된다.

```JS
var obj = {
	a: 42
};

obj.a;			// 42
delete obj.a;	// true
obj.a;			// undefined
```

만약 delete 연산이 유효하다면(존재하지 않는 속성 포함) true가 아니라면  false가 결과값이다. 이 연산의 부작용은 오브젝트의 속성이나 어레이의 슬롯을 지우는 것이다. 

마지막 부작용의 예시가 될 연산자는 = 연산자다.

```JS
var a;

a = 42;		// 42
a;			// 42
```

부작용을 가지는 연산자가 아닌 것처럼 보일 수도 있지만 a = 42 statement의 결과값이 막 할당된 42인 것을 보면 a에 할당된 값인 42가 바로 부작용이다.  +=, -= 역시 같은 부작용을 보인다.

할당 표현의 결과 값이 할당된 값이기 때문에 연속 할당을 할 때 유용하다.

```JS
var a, b, c;

a = b = c = 42;
```

var a = b = 42처럼 표현하면 b가 따로 선언된 것이 아니라면 스트릭트 모드라면 error, 아니면 새로운 전역변수 b가 나온다.

### contextual rules

JS 문법 중에 어디서 어떻게 사용되느냐에 따라 다르게 작용하는 것들이 있다.  흔한 몇몇 개만 서술하겠다.

#### {} curly braces

##### object literals

##### labels

##### blocks

##### object destructuring

#### else if and optional blocks

### Operator Precedence

#### Short Circuited

#### Tighter Binding

#### Associativity

#### Disambiguation

### Automatic Semicolons

#### Error Correction

### Errors

#### Using Variables Too Early

### Function Arguments

### `try..finally`

### `switch`

## Mixed Environment JavsScript

# ASYNC&PERFORMANCE

## Asynchrony: Now & Later

시간의 경과에 따른 JS 프로그램의 행동을 어떻게 표현하고 통제할 수 있을까? 시간의 경과라고 해서 for 반복문의 시작부터 끝까지를 말하는 게 아니다. 프로그램의 어떤 부분은 지금 시작되고 어떤 부분은 나중에 시작되는지, 그 차이는 무엇이 가져오는 걸까? now와 later의 관계가 바로 비동기 프로그래밍의 핵심이다. 대개 콜백 함수를 이용해왔으나 JS는 계속 그 크기를 불려가고 있으므로 콜백 함수 이상의 무언가가 필요하다. 

### A Program in Chunks

하나의 js 파일에 쓰인 js 프로그램일지라도 분명 세부적으로 들어가보면 여러 덩어리들로 이루어져있을 것이다. 한 덩어리는 지금 당장(now) 실행되고, 다른 덩어리들은 나중에(later) 실행된다다. 가장 흔한 덩어리 유형은 함수다.

later는 정확히 now의 다음에 실행되는 것은 아니다.

In other words, tasks that cannot complete *now* are, by definition, going to complete asynchronously, and thus we will not have blocking behavior as you might intuitively expect or want.

다른 말로 하자면 지금 마무리할 수 없는 태스크는 비동시적으로 끝나게 된다. 그러므로 우리가 무의식적으로 기대하는 blocking behavior는 일어나지 않는다

ajax 요청은 요청과 동시에 답변을 받아오지 않는다. 우리는 비동기적으로 ajax 요청을 지금 실행하고 응답은 나중에 받을 수 있다. ajax가 답변이 올 때까지 다른 행동을 멈출 수 없기 때문에 콜백 함수를 쓰게 된다. 콜백 함수는 간단하지만 제일 좋은 방법이라고 할 수는 없다.

```javascript
// callback function
ajax("http://some.url.1", function myCallbackFunction(data) {
  console.log(data);
});
```

동시적인 Ajax 요청을 만드는 것이 기술적으로 가능하지만 절대로 쓰지 마라. 왜냐하면 그런 요청은 브라우저 UI의 동작을 멈추기 때문이다.(버튼이나 스크롤 등을 포함해서 모든 동작)

### Async Console

console.*이 어떻게 작동하는 지도 모르고 공식적인 JS의 일부도 아니지만 console.\*은 JS에 호이스팅 환경으로 추가되어 있다.

그러므로 다른 브라우저나 JS 환경은 작동의 혼선을 불러올 수 잇다.

어떤 브라우저에서 혹은 어떤 조건 아래에서 console.log()는 바로 출력되지 않는다. I/O가 매우 느리고 많은 프로그램에 의해 방해받기 때문이다. 비동시적으로 백그라운드에서 돌아갈 수 있는 브라우저에서 console.log()는 더 빠르게 작동할 수 있다.

If you run into this rare scenario, the best option is to use breakpoints in your JS debugger instead of relying on `console` output. The next best option would be to force a "snapshot" of the object in question by serializing it to a `string`, like with `JSON.stringify(..)`.

console.log()를 now로 보고, console.log()의 인자에 변화를 주는 것을 later라고 생각하고 코드를 쓸 수 있다. 그런데 어떤 환경에서는 생각처럼 코드가 작동하지 않고 변화를 준 later부분이 실행된 이후에야 console.log()가 실행되기도 한다. 이런 특수한 상황에서 취할 수 있는 방법 중 최선은 JS 디버거의 브레이크 포인트를 쓰는 것이다. 차선은 오브젝트의 스냅샷을 찍도록 강제하는 것으로 스트링으로 시리얼라이징하는 것이다. (ex)JSON.stringify())

### Event Loop

ES6 이전까지 자바스크립트가 공식적으로 비동기와 관련한 언급을 한 적은 없다. JS 엔진은 **요청받았을 때** 프로그램의 **한** 부분을 실행하는 것 이상을 한 적이 없다. 요청을 받았다면 누구에게 요청을 받은 것일가?

JS 엔진은 대개 브라우저 상에서 작동한다. 지난 몇 년간 JS는 브라우저를 넘어서서 그 영역을 확장해 왔다. 대표적으로 Node.js 같은 서버를 들 수 있다. 요즘은 자바스크립트가 로봇부터 전구에 이르기까지 거의 모든 종류의 기기에 내장되어 있다.

그 모든 환경에는 한 가지 공통점이 있는데 여러 덩어리를 다룰 수 있는 메카니즘이 있다는 것이다. 시간의 흐름에 따라 필요한 순간에 JS 엔진을 작동시키는 식으로 동작하는데 이를 event loop라고 한다.

즉, JS 엔진은 자체적으로 시간을 감지하는 것이 아니다. JS 엔진은 요청을 받은 것을 실행해왔을 뿐이다. JS 코드가 실행될 때에는 항상 예정된 이벤트가(scheduled events) 있다.

예를 들어 서버에 데이터를 보내려고 ajax 요청을 할 때, 흔히 콜백이라고 불리는 함수로 응답시의 코드를 설정할 것이다. 그러면 JS 엔진은 호스팅 환경에게 ' `지금` 실행을 유예할 건데 니가 네트워크 요청을 끝내고 데이터를 받아왔을 때 지금 유예시킨 이 함수를 호출해줘!'라고 말하는 것이다.

브라우저는 네트워크로부터 응답을 받을 준비를 하고, **응답을 받은 후에** 예정된 콜백 함수를 실행하기 위해 이벤트 루프에 삽입한다.

다음 코드는 이벤트 루프를 간략화한 수도코드다

```js
var eventLoop = [ ];
var event;

// keep going "forever"
while (true) {
	// perform a "tick"
	if (eventLoop.length > 0) {
		// get the next event in the queue
		event = eventLoop.shift();

		// now, execute the next event
		try {
			event();
		}
		catch (err) {
			reportError(err);
		}
	}
}
```

이벤트 루프는 큐처럼 FIFO.

한 번 반복되는 것을 tick이라고 한다. 각 틱마다 이벤트가 큐에 있다면 꺼내서 실행하게 된다. 이 이벤트가 바로 콜백 함수다.

setTImeout()은 콜백 함수를 이벤트 루프 큐에 넣는 것이 아니라는 것을 기억하자!

그저 타이머를 맞춘 것일 뿐으로, 정해진 시간이 지나면 콜백 함수를 이벤트 루프에 삽입한다. 그러면 언젠가 실행될 미래의 틱이 해당 함수를 꺼내서 실행하는 것이다. 정해진 시간이 지났을 때, 이미 이벤트 루프에 20개의 아이템이 있었다면 콜백 함수는 그만큼을 기다려야만 한다. 새치기를 하는 방법은 없다. 이것이 setTImeout() 타이머가 정확한 시간에 함수를 실행시키지 못하는 이유다. setTimeout()은 설정한 시간 이전에 콜백 함수가 실행되지 않게 하는 것은 보장하지만 그 이후 언제 실행이 될 지는 정확히 말할 수 없다.

이벤트 루프 큐에 꼭 내 프로그램과 직접적인 연관이 있는 이벤트만 있는 것은 아니다.(내가 통제할 수 없다)

이벤트 루프 큐는 호스팅 환경뿐 아니라 JS 엔진의 통제도 받는데 이는 ES6부터다. ES6부터 프로미스가 등장하면서 생긴 변화로 프로미스가 이벤트 루프 큐의 스케쥴 작업에 대한 직접적인 컨트롤을 요구하기 때문에 이벤트 루프가 어떻게 동작하는지 명시해두었다.

### Parallel Threading

async와 parallel(비동기와 병렬)을 혼용하는 경우가 많다. 사실 두 개념은 꽤나 다르다. 비동기는 now와 later 사이의 갭이고 병렬은 어떤 일들이 동시에 발생하는 것이다.

패러렐 컴퓨팅을 사용하는 가장 흔한 도구는 프로세스와 쓰레드다. 프로세스와 쓰레드는 독립적으로 실행하고 때때로 동시에 실행한다. 각기 다른 프로세서에서 혹은 아예 다른 컴퓨터에서 패러렐 컴퓨팅이 이루어지는데 멀티 쓰레드는 하나의 프로세스의 메모리를 공유할 수 있다.

그와 반대로 이벤트 루프는 하나의 작업을 작고 연속적인 단위로 쪼갬으로써 병렬 접근을 거부하고 공유된 메모리의 변화를 제한한다. 패러렐리즘과(parallelism) 시리얼리즘(serialism)은 별개의 쓰레드 안에 서로 협조하는(cooperating) 이벤트 루프의 형태로 공존할 수 있다.

```js
function later() {
	answer = answer * 2;
	console.log( "Meaning of life:", answer );
}
```

later 함수 전체가 하나의 작업으로 이벤트 루프 큐에 들어간다고 볼 수도 있지만 사실 이는 저레벨 작업 십여개로 이루어져있다. 싱글 쓰레드 상황에서 쓰레드 큐의 아이템이 저레벨 작업인지 아닌지는 중요한 문제가 아니다. 하지만 아무것도 쓰레드를 중단시킬 수는 없다. 그러나 패러렐 시스템이라면 두 개의 다른 쓰레드가 한 프로그램에서 작동하므로 예상치 못한 결과를 볼 확률이 높다.

```js
var a = 20;

function foo() {
	a = a + 1;
}

function bar() {
	a = a * 2;
}

// ajax(..) is some arbitrary Ajax function given by a library
ajax( "http://some.url.1", foo );
ajax( "http://some.url.2", bar );
```

JS의 싱글 쓰레드 하에서 만약 foo()가 bar()보다 일찍 실행되었다면 a가 42일 것이고 bar()가 일찍 실행되었다면 a가 41일 것이다.

만약 JS 이벤트가 병렬적으로 실행되는 데이터를 공유한다면 문제를 발견하기는 더 힘들어진다.

JS는 절대로! 쓰레드간에 데이터를 공유하지 않는다.  그 정도 수준의 nondeterminism은 문제가 되지 않는다는 뜻이다. 그러나 JS가 항상 deterministic한 것은 아니다. 모든 nondeterminism이 나쁜 것도 아니다.

#### Run-to-Completion

싱글 쓰레딩이기 때문에 함수 내부의 코드는 독립적이다. 만약 한 함수가 실행되기 시작했다면 해당 함수 내부의 모든 코드가 끝나기 전까지는 다음 함수가 실행될 수 없다는 뜻이다. 이를 run-to-completion 행동이라 한다.

프로그램에 함수가 두 개 있고 둘 다 같은 변수를 사용한다면

어떤 함수가 먼저 실행되느냐에 따라 다른 결과가 나올 것이다.

그러므로 nondeterminism이지만 문장 수준의 nondeterminism이 아니라 함수 수준의(이벤트 수준의) nondeterminism이라 할 수 있으므로 기존의 쓰레드보다는 좀 더 deterministic해졌다.

함수 수준의 nondeterminism은 race condition이라는 용어로도 자주 불리는데 여러 함수 중에 어떤 것이 먼저 동작되느냐가 마치 경쟁처럼 보이기 때문이다. 경쟁이란 단어를 사용하는 것은 어떤 함수가 먼저 실행될 지 예측할 수 없기 때문이다.

### Concurrency

소셜네트워크 뉴스피드처럼 사용자가 스크롤을 내림에 따라 점진적으로 데이터를 로드하는 사이트를 떠올려보자. 해당 기능을 만들기 위해서는 두가지 다른 프로세스가 동시에 실행되어야 한다. 여기서 쓰이는 '프로세스'는 진짜 오퍼레이팅 시스템 레벨의 프로세스가 아니라 가상의 일련의 작업을 뜻한다.

첫번째 프로세스는 onscroll 이벤트에 대한 응답으로 새로운 컨텐츠를 가져오기 위한 ajax 요청 만들기가 될 것이다. 두번째 프로세스는 페이지에 렌더하기 위한 ajax 응답을 받아오는 것이다.

만약 사용자가 스크롤을 빠르게 내린다면 여러개의 onscroll 이벤트가 첫번째 응답을 받아와서 처리하기도 전에 만들어질 것이다. 그러면 여러개의 onscroll 이벤트와 ajax 응답 이벤트가 서로 뒤죽박죽 섞여서 실행이 된다.

동시실행은(concurrency) 두 개 이상의 프로세스가 같은 기간 동안 동시에 실행될 때를 나타낸다. 각 오퍼레이션이 병렬으로 동작하느냐와는 무관한 개념이다. 동시실행을 프로세스 레벨의 혹은 태스트 레벨의 패러렐리즘이라고 볼 수 있는데 오퍼레이션 레벨의 패러렐리즘과는(별개의 프로세서 쓰레드) 반대되는 개념이다.

요청하고 응답을 받고 나서 두번째 요청이 이루어지면 좋겠지만 이벤트 루프 큐가 다음과 같은 상황이 이루어질 가능성은 꽤나 많다.

```
onscroll, request 1   <--- Process 1 starts
onscroll, request 2
response 1            <--- Process 2 starts
onscroll, request 3
response 2
response 3
onscroll, request 4
onscroll, request 5
onscroll, request 6
response 4
onscroll, request 7   <--- Process 1 finishes
response 6
response 5
response 7            <--- Process 2 finishes
```

JS는 한 번에 한 가지 이벤트만 처리할 수 있기 때문에 요청2나 응답 1 중 어느 하나가 먼저 실행되어야만 한다.

프로세스 1과 프로세스 2는 동시실행되고 있지만(태스크 레벨 패러렐) 각 이벤트는 이벤트 루프 큐에서 순차적으로 실행되고 있다.

응답 5와 6처럼 예상과는 다른 순서로 응답을 받게 될 수도 있다.

#### Noninteracting

두 개 이상의 프로세스가 하나의 프로그램 내부에서 서로의 이벤트에 끼어들면서 동시실행될 때, 태스크가 연관되어 있지 않다면 굳이 프로세스들이 서로 교류를 해야할 필요는 없다. 교류하지 않는다면 nondeterminism은 전혀 문제가 되지 않는다.

```js
var res = {};

function foo(results) {
	res.foo = results;
}

function bar(results) {
	res.bar = results;
}

// ajax(..) is some arbitrary Ajax function given by a library
ajax( "http://some.url.1", foo );
ajax( "http://some.url.2", bar );
```

foo와 bar는 두 개의 동시실행되는 프로세스들로 어떤 것이 먼저 실행되든지 nondeterminate하다. 어떤 것이 먼저 실행되든지 상관없이 프로그램을 만들었기 때문에 두 함수는 서로 끼어들거나 싸우지 않고 독립적으로 동작한다.

그러므로 이는 race condition 버그가 아니다. 순서와 무관하게 코드가 의도한 대로 동작한다.

#### interaction

그러나 현실에서는 동시실행되는 프로세스들은 서로 교류하는 경우가 훨씬 흔하다. 스코프나 돔을 통해서 간접적으로라도 말이다. 그런 상호작용이 이루어졌을 때 레이스 컨디션이 일어나는 것을 방지하며 코드를 짜야 한다.

순서를 암시하는 코드를 짜서 동시에 발생한 두 개의 프로세스들이 서로 간섭하는, 그래서 때때로 원하는 결과가 나오지 않는 코드는 다음과 같다.

```jsx
var res = [];

function response(data) {
	res.push( data );
}

// ajax(..) is some arbitrary Ajax function given by a library
ajax( "<http://some.url.1>", response );
ajax( "<http://some.url.2>", response );
```

두 개의 동시발생한 프로세스는 response의 호출로 ajax 응답을 처리하기 위해 호출된다. 어느 것이 먼저 실행될지는 명시되지 않았다.

이렇게 발생하는 레이스 컨디션을 방지하기 위해서 다음과 같이 순서를 명시해주자.

```jsx
var res = [];

function response(data) {
	if (data.url == "<http://some.url.1>") {
		res[0] = data;
	}
	else if (data.url == "<http://some.url.2>") {
		res[1] = data;
	}
}

// ajax(..) is some arbitrary Ajax function given by a library
ajax( "<http://some.url.1>", response );
ajax( "<http://some.url.2>", response );
```

어떤 ajax 응답이 먼저 돌아오느냐와는 무관하게 각 포지션을 정해준다. 간단한 방법으로 레이스 컨디션 nondeterminism을 방지할 수 있다.

같은 DOM을 공유하는 여러개의 함수 호출이 동시에 발생할 때도 이와 똑같이 처리할 수 있다.

어떤 concurrency 시나리오들은 coordinated interaction이 없으면 무조건 고장이 난다.

```jsx
var a, b;

function foo(x) {
	a = x * 2;
	baz();
}

function bar(y) {
	b = y * 2;
	baz();
}

function baz() {
	console.log(a + b);
}

// ajax(..) is some arbitrary Ajax function given by a library
ajax( "<http://some.url.1>", foo );
ajax( "<http://some.url.2>", bar );
```

foo가 먼저든 bar가 먼저든 항상 baz는 너무 일찍 실행되게 된다.(a나 b 둘 중 하나는 undefined이므로)  그러나 두 번째 함수가 baz를 호출할 때는 정상적으로 작동한다.

또 다른 방법은 다음과 같다.

```jsx
var a, b;

function foo(x) {
	a = x * 2;
	if (a && b) {
		baz();
	}
}

function bar(y) {
	b = y * 2;
	if (a && b) {
		baz();
	}
}

function baz() {
	console.log( a + b );
}

// ajax(..) is some arbitrary Ajax function given by a library
ajax( "<http://some.url.1>", foo );
ajax( "<http://some.url.2>", bar );
```

if (a && b) 조건문이 baz 호출을 감싸는 `게이트`가 되어줌으로써 a, b 중 누가 먼저 들어오든 상관 없이 다 도착해야만 다음으로 넘어갈 수 있다.

종종 만나게 될 또다른 concurrency interaction condition 은 `레이스`라고 불린다. 그러나 좀 더 정확한 표현은 랫치(latch)다. 처음 시작하는 것만 이기는 것이 특징으로 nondeterminism도 수용 가능하다.

## Callbacks

## Promises

## Generators

## Program Performance

## Benchmarking & Tuning

## asynquence

## Advanced Async Patterns

# ES6&BEYOND

## ES? Now & Future

## Syntax

## Organization

## Async Flow Control

## Collections

## API Additions

## Meta Programming

## Beyond ES6

