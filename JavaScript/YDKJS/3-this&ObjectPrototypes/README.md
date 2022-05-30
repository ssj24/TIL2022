# this & Object Prototypes

## this or That?

`this`는 특별한 식별자 키워드로 모든 함수의 스코프에서 자동적으로 만들어진다.

그러나 많은 개발자들이 this가 무엇을 가리키는 지 정확히 모르는 듯하다.

### why this?

그렇게 헷갈리는 것이라면 왜 this를 써야하는 걸까?

```js
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

이 코드가 어떻게 동작하는 지는 추후 설명한다.

identify()와 speak()은 여러 컨텍스트 오브젝트에서(me, you) 재사용할 수 있다.

각 오브젝트마다 다른 버전의 함수를 쓰지 않아도 된다.

this를 쓰지 않고 직접적으로 컨텍스트 오브젝트를 인자로 넘길 수도 있다.

```js
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

그러나 this 메커니즘은 위의 방법보다 좀 더 깔끔한 API 디자인을 만들어내서 재사용이 쉽다.

프로그램이 복잡해질수록 인자를 넘기는 것보다 this를 사용하는 것이 좋다.

### Confusions

this라는 이름을 개발자들이 직관적으로 해석하면서 문제가 생긴다.

가장 흔한 오해가 this를 함수 자체 혹은 함수의 스코프를 가리킨다는 것이다.

#### this != Itself

this는 함수 자체를 가리키는 것이 아니다.

함수 내부에서 스스로를 참조해야 하는 이유는

- 재귀
- 이벤트 핸들러 언바인드(첫 실행 이후) 등이 있다.

JS에 익숙하지 않은 개발자들은 함수를 오브젝트로 참조하는 것이

함수 호출 사이사이의 state를 저장하는 방법이라고 생각한다.

제한적이지만 가능한 방법이다. (더 나은 방법들은 책의 다른 부분에서 말한다.)

여기서는 이 방법을 이용해서 this가 함수를 자체 참조하게 만들지 않는다는 것을 증명하겠다.

```js
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

foo.count가 여전히 0이다. 

foo.count가 변할 거라고 믿는 것은 this.count++의 this가 무엇을 가리키는지 모르기 때문이다.

`foo.count = 0`는 foo 함수 오브젝트에 count라는 속성을 더한다.

그러나 this.count를 함수 안에서 참조하면 this는 함수 오브젝트를 가리키지 않는다.

속성명이 같지만 루트 오브젝트가 다르다.

그렇다면 무엇의 count 속성을 더하고 있었던 걸까?

전역 변수에 count가 생겼고 현재 값은 NaN이다.

count 속성을 가질 다른 오브젝트를 만들어보자

```js
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

이렇게 하면 count의 값이 더해지긴 하지만

문제를 해결했다기 보다는 우회했다고 할 수 있다.

this를 이해하기보다는 익숙한 메커니즘인 렉시컬 스코프를 이용한 것이다.

렉시컬 스코프를 쓰는 게 안 좋다는 것이 아니라 this를 이해하지 못해서 렉시컬 스코프를 쓰지 말라는 것이다.



함수 내부에서 함수를 참조하려면 this만으로는 부족하다.

함수를 가리키고 있는 렉시컬 식별자를 통해 함수를 참조하는 편이다.

```js
function foo() {
	foo.count = 4; // `foo` refers to itself
}

setTimeout( function(){
	// anonymous function (no name), cannot
	// refer to itself
}, 10 );
```

foo()는 내부에서 스스로를 참조하다

setTimeout()의 콜백함수인 익명 함수는 스스로를 참조할 적절한 방법이 없다.

> 예전에는(이제는 사라짐) `argument.callee`도 함수 내부에서 현재 실행중인 함수 오브젝트를 가리킨다.
>
> 이게 익명 함수를 부를 수 있는 방법이었는데
>
> 그냥! 기명 함수를 쓰자(적어도 self-reference가 필요한 함수라면)



그러므로 또 다른 해결책은 함수를 참조할 때 this가 아니라 foo를 써 버리는 것.

```js
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

그러나 위 방법도 this를 이해한 것이 아니라 foo의 렉시컬 스코프에 의존하는 것이다.



또 다른 해결책은 this가 foo 함수 오브젝트를 가리키게 하는 것이다.

```js
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

this를 기피하지 말고 활용하려고 노력하자

#### this != its Scope

this가 함수의 스코프를 가리킨다고 생각하는 것도 오해다

내부적으로 스코프가 속성을 가진 오브젝트라고 볼 수 있다.

하지만 스코프 오브젝트는 자바스크립트 코드로 접근할 수 없다.

(it's an inner part of the Engine's implementation)



```js
function foo() {
	var a = 2;
	this.bar();
}

function bar() {
	console.log( this.a );
}

foo(); //undefined
```

위의 코드는 경계를 벗어나서 this가 함수의 렉시컬 스코프를 가리킨다고 가정해서 실패한 코드다

this.bar()를 통해 bar()를 참조하려고 했다. 

이 시도가 통한 것은 우연에 불과하다. 

bar()를 호출하는 가장 자연스러운 방식은 this.을 생략하고 식별자를 렉시컬 참조하는 것이다. 

그러나 위 코드를 쓴 사람은 this를 foo()와 bar()의 렉시컬 스코프 사이의 다리를 만들기 위해 사용했다.

그래서 bar()가 foo()의 내부 스코프에 있는 변수 a에 접근할 수 있도록.

this 참조를 이용해서 렉시컬 스코프에 있는 무언가를 참조할 수 **없다**. 절대.



렉시컬 스코프 룩업과  this를 섞으려고 할 때마다 그런 일은 불가능하다는 것을 되새겨라.



### What's this?

그렇다면 this는 대체 무엇인가

this는 author-time이 아닌 runtime binding이다. 

함수가 실행될 때의 조건을 기반으로 하는 것이다.

this 바인딩은 함수가 어디서 선언되었느냐와는 무관하다

함수가 어떻게 호출되었는지가 중요하다



함수가 호출되었을 때, execution context라는 기록이 만들어진다.

여기에는 어디에서 함수가 호출되었는지(call-stack), 어떻게 함수가 호출되었는지, 어떤 인자를 받았는지 등등이 포함된다.

이 기록의 속성 중 하나는 this 참조로 함수의 실행이 지속되는 동안 사용된다.

## this all makes sense now!

## Objects

## Mixing (up) "Class" Objects

## Prototypes

## Behavior Delegation

## a-ES6 class