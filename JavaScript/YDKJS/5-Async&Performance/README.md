# Async & Performance

[toc]

## Asynchrony: Now & Later

JS에서 시간과 관련된 프로그램 조작을 어떻게 해야 할까?

만든 프로그램 중 어느 부분이 **지금** 동작하고 어느 부분이 **나중에** 동작할까.

내가 직접적으로 조절할 수 없는 지금과 나중 사이의 갭 역시 존재한다.



모든 프로그램은 이 갭을 메우기 위한 방법을 가지고 있다.

사용자의 입력을 기다리거나

db로부터 데이터를 요청하거나

네트워크를 통해 데이터를 보내고 응답을 기다리거나

일정 간격을 두고 반복 작업을 하는 것 같은 방법 말이다.



지금과 나중의 관계가 비동기 프로그래밍의 중심이라고 할 수 있다.

해결 방법으로는 콜백 함수도 괜찮다고 할 수 있지만

JS가 계속 그 범위와 복잡성을 키워 나가고 있기 때문에

그에 따른 수요를 충족시키기 위해서는 다른 방법이 필요하다.



### a program in chunks

JS 프로그램을 하나의 .js 파일에 적는다고 해도

실제 프로그램은 여러개의 덩어리로 이루어져 있다.

그 중에 한 덩어리만이 지금 실행되고

나머지는 나중에 실행된다.

가장 흔한 덩어리 유형은 함수다.



문제가 있다면 JS의 `나중에`는 지금 바로 다음에 실행되지 않는다.

지금 완수되지 못 한 일은 비동기적으로 동작하게 된다. 다음 동작을 막거나 하지 않고 말이다.

보통의 Ajax 요청은 요청과 동시에 응답이 오지 않는다. 

ajax 요청의 응답을 data 변수에 담고,

바로 다음 중에서 data를 출력하는 코드를 짠다면

data는 ajax의 응답을 담지 않고 있을 것이다.

만약 JS가 지금 할당된 일을 다 해야만 다음 일을 수행한다면

data 출력은 ajax 요청의 응답을 받고 data에 할당한 뒤에야 이루어졌을 것이다.

그러나 JS는 그렇게 동작하지 않는다.



이런 상황에서 가장 흔하게 택하는 `지금부터 나중까지 기다리는 방식`은 콜백 함수다.

```js
ajax( "http://some.url.1", function myCallbackFunction(data) {
  console.log(data);
});
```

 

어떤 코드를 함수로 감싸고, 

이 함수를 어떤 이벤트에(타이머, 클릭 등등..) 대응해서 실행되게 한다면 

나중에 실행될 덩어리를 만든 것과 마찬가지다.



### async console

어떻게 `console.*`이 동작하는지와 관련한 사항은 알려지지 않았다.

공식적으로 이것은 JS의 일부분은 아니지만

호스팅 환경에 의해 JS에 더해져 있다.

즉, 브라우저와 JS 환경이 다르다면 결과가 달라질 수도 있다는 것이다.

어떤 때는 console.log()가 주어진 때에 바로 출력되지 않기도 한다.

```js
var a = {
	index: 1
};

// later
console.log( a ); // ??

// even later
a.index++;
```

보통은 { index: 1 }을 기대하고 console.log(a)를 하겠지만

어떤 상황에서는 브라우저가 콘솔을 지연시켜

{ index: 2 }가 출력될 수도 있다.

이런 특이한 상황을 맞닥뜨리면 JS 디버거에서 분기점을 설정해 보는 것이 좋다.

디버거 다음으로 좋은 방법은

출력하고 싶은 객체를 스트링으로 만들어서 출력하는 것으로

`JSON.stringify()` 를 쓸 수 있다.



### event loop

timeout처럼 분명하게 비동기적으로 JS코드를 쓸 수 있지만 

ES6까지는 JS가 내장된 비동기 기능에 관해 직접적으로 언급한 적은 없다.

JS 엔진은 해당 시점에 요청 받은 하나의 덩어리를 실행하는 것 이상의 일을 하지 않기 때문이다.

`요청을 받았다면` 누가 요청을 한 것일까? 여기가 중요한 부분이다.



JS 엔진은 독립적으로 동작하지 않는다.

호스트 환경(대부분의 경우 웹 브라우저) 내부에서 동작한다. 

지난 몇 년간 JS는 브라우저를 넘어서 서버로 영역을 확장했다.

사실 로봇부터 전구까지 거의 대부분의 장비에 JS가 쓰이고 있다.

이렇게 다양한 환경의 JS 사이에 존재하는 공통점은 `이벤트 루프`다

여러개의 프로그램 덩어리를 시간의 흐름에 따라 동작시키는 방식을 이벤트 루프라고 한다



JS 엔진은 내장된 시간 감각이 없지만 

JS 코드가 필요할 때 엔진을 호출함으로써 이벤트 루프가 가능하다.



ajax 요청을 하면 response 코드가 콜백 함수 부분이다

javascript 엔진은 호스팅 환경에게 요청에 대한 응답이 돌아오기까지 실행을 멈추고

응답이 돌아오면 이 함수를(콜백함수) 실행시켜달라고 한다

즉, 응답이 돌아오면 콜백 함수가 이벤트 루프에 들어가게 된다



반복문을 사용할 때

각각의 반복을 틱(tick)이라고 한다.

매 틱이 반복될 때 이미 큐에 이벤트가 기다리고 있다면

그 이벤트가 실행된다.

이 이벤트들이 콜백 함수다.



`setTimeout()` 은 콜백을 이벤트 루프 큐에 삽입시키지 않는다.

이것이 하는 일은 타이머를 만드는 것 뿐이다.

타이머가 울리면 콜백을 이벤트 루프에 삽입한다.

만약 이미 큐에 20개의 아이템이 있다면

지금 들어간 콜백은 그저 기다릴 뿐이다.

이것이 왜 setTimeout()이 정확한 시간에 동작하지 않는가에 대한 답이 되어줄 것이다.

setTImeout()을 써서 보장받는 것은

지정 시간이 끝나기 전에 콜백이 동작하지 않는 것이다.

콜백은 지정 시간이 끝난 직후 혹은 그 이후에 실행되게 된다.



### parallel threading

흔히 비동기를(async) 병렬과(parallel) 혼용하지만 둘은 다른 개념이다.

비동기는 지금과 나중 사이의 갭에 관련한 것이지만

병렬은 여러개가 동시에 실행되는 것이다.



병렬 컴퓨팅을 위한 가장 흔한 도구는 프로세스와 쓰레드다.

프로세스와 쓰레드는 독립적으로 실행되고 동시에 실행될 수도 있다.

별개의 프로세서, 더 나아가 별개의 컴퓨터에서 동작하는 여러개의 쓰레드는 

하나의 프로세스의 메모리를 공유할 수 있다.



그와는 반대로 이벤트 루프는 맡겨진 일을 작게 나누고 그것들을 순차적으로 실행한다.

병렬적인 접근이나 공유된 메모리의 변경을 허용하지 않는다.

병렬과 연속은 별개의 쓰레드에 있는 이벤트 루프로 공존할 수 있다.



### run-to-completion

```JS
var a = 1;
var b = 2;

function foo() {
	a++;
	b = b * a;
	a = b + 3;
}

function bar() {
	b--;
	a = 8 + b;
	b = a * 2;
}

// ajax(..) is some arbitrary Ajax function given by a library
ajax( "http://some.url.1", foo );
ajax( "http://some.url.2", bar );
```

JS는 싱글 쓰레드라서 foo()의 코드와 bar()의 코드는 각각 다른 덩어리다.

foo()의 코드가 실행되기 시작하면 

모든 코드가 동작한 뒤에야

bar()의 코드가 동작할 수 있다.

이를 run-to-completion 동작이라 한다.



foo()와 bar()의 코드는 서로 간섭할 수 없기 때문에

위의 코드는 둘 중 어떤 코드가 먼저 시작하느냐에 따라 답이 나뉜다.

문장 수준이 아니라 함수 수준의 비결정주의(nondeterminism)다

함수 순서의 비결정주의를 경쟁 상황(race condition)이라고 표현한다

foo()와 bar()가 더 먼저 실행되려고 레이싱을 하는 것과 같은 모습이기 때문이다

둘 중 무엇이 먼저 실행될 지 알 수 없기 때문에 경쟁이라는 말이 잘 어울린다



### concurrency

사용자가 스크롤을 내리면서 내용이 업데이트되는 사이트를 떠올려보자. 

사이트가 올바르게 기능하려면 두 가지의 `프로세스`가 동시에 이루어져야 한다. 

(프로세스라고 표현했지만 실제로 컴퓨터 공학적 의미의 프로세스가 아니다. 

가상의 프로세스로 어떤 동작을 이루는 연속적인 일을 의미한다.) 

첫 번째 `프로세스`는 onscroll 이벤트에 반응해서 새로운 데이터를 받기 위해 Ajax요청을 보낸다. 

두 번째 `프로세스`는 페이지에 렌더링할 데이터를 줄 Ajax 응답을 받는다.



만약 사용자가 빠르게 스크롤을 내린다면 

두 개 이상의 onscroll 이벤트가 첫 번째 응답을 받기도 전에 생길 수도 있을 것이다. 

그러다 보면 응답받는 데이터 순서가 달라질 수도 있다.



동시성(concurrency)은 두 개 이상의 `프로세스`가 동시에 실행되는 것으로 

각각의 동작이 병렬적으로 실행되느냐와 무관하다. 

프로세스 수준(태스크 수준)의 병행이라고 볼 수 있다.

(오퍼레이션 수준의 병행은 각각의 프로세서 쓰레드에서 이루어진다.)



### noninteracting

두 가지 이상의 프로세스가 한 프로그램에서 동시에 동작하면서 서로 간섭을 할 때, 

관련이 없는 태스크라면 굳이 상호작용을 하지 않아도 된다. 

상호작용하지 않는다면 비결정주의(nondeterminism)는 문제를 일으키지 않는다.

```JS
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

위와 같은 상황에서 foo()와 bar() 중 어떤 것이 더 먼저 실행될 지 알 수 없지만

그 순서와 무관하게 결과는 똑같다.



### interaction

동시에 발생한 프로세스들은 간접적으로 스코프나 돔을 통해 상호작용하는 경우가 흔하다. 

그런 때에는 `경쟁 상황`이 발생하지 않도록 조정해야 한다.(어떤 것이 먼저 실행되느냐에 따라 결과가 달라지는 상황)

```JS
var res = [];

function response(data) {
	res.push( data );
}

// ajax(..) is some arbitrary Ajax function given by a library
ajax( "http://some.url.1", response );
ajax( "http://some.url.2", response );
```

위와 같은 상황에서 원하는 순서가 있다면 아래와 같이 작성을 하는 것이 좋다.

url.1으로 가는 요청이 url.2로 가는 요청보다 항상 빠르다고 생각되더라도

브라우저는 아무것도 보장해주지 않는다는 것을 기억하자.

```JS
var res = [];

function response(data) {
	if (data.url == "http://some.url.1") {
		res[0] = data;
	}
	else if (data.url == "http://some.url.2") {
		res[1] = data;
	}
}

// ajax(..) is some arbitrary Ajax function given by a library
ajax( "http://some.url.1", response );
ajax( "http://some.url.2", response );
```



만약 두 가지 동작이 다 이루어진 뒤에만 어떤 동작을 실행하고 싶다면 아래와 같이 작성하자.

```JS
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
ajax( "http://some.url.1", foo );
ajax( "http://some.url.2", bar );
```

baz()를 둘러싼 if(a && b)를 게이트라고 부른다.



또 다른 상황은 경쟁(race), 정확히 말하자면 잠금(latch) 상황이다. 

처음 도착하는 것만 받아들인다. 이런 상황에서 비결정주의는 문제가 없다.

```JS
var a;

function foo(x) {
	if (a == undefined) {
		a = x * 2;
		baz();
	}
}

function bar(x) {
	if (a == undefined) {
		a = x / 2;
		baz();
	}
}

function baz() {
	console.log( a );
}

// ajax(..) is some arbitrary Ajax function given by a library
ajax( "http://some.url.1", foo );
ajax( "http://some.url.2", bar );
```



### cooperation

cooperative concurrency에서는 스코프 안에서 값을 공유하는 것이 주안점이 아니다. 

긴 프로세스를 잘게 쪼개서 동시에 발생하는 프로세스들로 하여금 이벤트 루프 큐에 끼어들게 만드는 것이 목표라고 할 수 있다.



값을 변화시키기 위해 긴 결과값을 가져와야 하는 ajax 요청을 생각해보자.

```JS
var res = [];

// `response(..)` receives array of results from the Ajax call
function response(data) {
	// add onto existing `res` array
	res = res.concat(
		// make a new transformed array with all `data` values doubled
		data.map( function(val){
			return val * 2;
		} )
	);
}

// ajax(..) is some arbitrary Ajax function given by a library
ajax( "http://some.url.1", response );
ajax( "http://some.url.2", response );
```

만약 url.1 요청이 먼저 응답을 받는다면 전체 리스트는 res에 한 번에 맵핑될 것이다. 

만약 데이터가 몇 천개라면 별 일 아니겠지만 천만개라면 어떨까? 꽤 긴 시간이 필요할 것이다. 

그런 프로세스가 동작하고 있는 중에는 페이지 상에서 다른 일이 처리될 수가 없다. 

다른 ajax 요청도 불가능하고 UI가 갱신될 수도 없고 스크롤이 불가능할 수도 있다.

좀 더 협조적인 동시 시스템을 만들어 이벤트 루프 큐가 한 가지 일만 하지 않게 하기 위해서 일을 잘게 쪼개는 것이다.

```JS
var res = [];

// `response(..)` receives array of results from the Ajax call
function response(data) {
	// let's just do 1000 at a time
	var chunk = data.splice( 0, 1000 );

	// add onto existing `res` array
	res = res.concat(
		// make a new transformed array with all `chunk` values doubled
		chunk.map( function(val){
			return val * 2;
		} )
	);

	// anything left to process?
	if (data.length > 0) {
		// async schedule next batch
		setTimeout( function(){
			response( data );
		}, 0 );
	}
}

// ajax(..) is some arbitrary Ajax function given by a library
ajax( "http://some.url.1", response );
ajax( "http://some.url.2", response );
```

이렇게 코드를 바꿔서 한 번에 최대 천 개의 데이터만 다루면서 다른 프로세스들을 동작하게 만든다. 

물론 이렇게 하면 응답의 순서를 보장할 수 없지만 순서가 중요하다면 위에서 말한 방법들을 쓰면 된다.

setTimeout(~,0)으로 비동기 스케쥴링을 다루는데 현재 이벤트 루프 큐의 맨 끝에 이 함수를 실행하라는 뜻이다. 

기술적으로 해당 함수를 바로 큐에 넣는 것이 아니라 이 다음에 삽입을 하게 된다. 



### jobs

ES6부터 이벤트 루프 큐 위에 새로운 레이어로 잡 큐가 생겼다. 

아마 가장 흔하게 알고 있는 예는 비동기 동작의 프로미스일 것이다.

잡 큐는 이벤트 루프 큐의 각 틱이 끝날 때마다 실행된다.

틱이 실행되는 동안 생기는 특정한 비동기적 행동으로

새로운 이벤트 전체를 이벤트 루프 큐에 더하는 것이 아니라

잡이라고 불리는 아이템을 현재 틱의 잡 큐의 맨 마지막에 삽입한다.

"아 이거 이 다음에 해야겠다. 다른 일을 하기 전에 해야지!" 같은 느낌이다.

노래방 우선예약 같은 기능!

잡 큐에서도 무한 루프가 가능하므로 조심하자



```javascript
console.log( "A" );

setTimeout( function(){
	console.log( "B" );
}, 0 );

// theoretical "Job API"
schedule( function(){
	console.log( "C" );

	schedule( function(){
		console.log( "D" );
	} );
} );
```

ABCD가 아닌 ACDB rk skdhsek



### statement ordering

코드상에 있는 문장들의 순서는 JS 엔진이 실행하는 순서와 같지는 않다.

JS 엔진이 컴파일을 하면서 안전한 최적화를 하기 때문이다.

보통은 결과가 똑같이 나타나지만 아닌 경우도 있다.



```javascript
var a, b;

a = 10;
b = 30;

a = a + 1;
b = b + 1;

console.log( a + b ); // 42
```

JS 엔진이 코드를 컴파일링한 뒤 코드를 재배열하는 것이 훨씬 빠르다고 생각할 수도 있다

재배열을 우리 눈으로 볼 수는 없지만 아래 코드가 더 빨라서 JS 엔진이 코드를 재배열했다고 해보자

```javascript
var a, b;

a = 10;
a++;

b = 30;
b++;

console.log( a + b ); // 42

// OR

var a, b;

a = 11;
b = 31;

console.log( a + b ); // 42

// OR

// because `a` and `b` aren't used anymore, we can
// inline and don't even need them!
console.log( 42 ); // 42
```

세 가지 재배열 모두 javascript 엔진이 컴파일 과정에서 안전한 최적화를 한 것이다

결과는 모두 동일하게 나타난다


그러나 이런 최적화가 다른 결과를 가져올 수도 있다

```javascript
var a, b;

a = 10;
b = 30;

// we need `a` and `b` in their preincremented state!
console.log( a * b ); // 300

a = a + 1;
b = b + 1;

console.log( a + b ); // 42
```



## Callbacks

챕터1에서는 함수를 하나의 나누어지지 않는 작업처럼 다뤘다

함수 내부의 statement들은 예상 가능한 순서로 실행된다고 가정했다(컴파일러 레벨 위)

그러나 함수 레벨에서 이벤트의 순서는 다양하다



함수는 `콜백`의 역할을 맡는다

이벤트 루프 큐에 있는 아이템을 처리할 차례가 되면 

프로그램으로 불러들이는(call back into the program) 타겟이 되기 때문이다



콜백은 javascript 프로그램에서 비동시성을 다루는 가장 흔한 방법이다

콜백은 비동기적인 작업을 훌룡하게 처리하지만 단점도 있다



### Continuations

```javascript
// A
ajax( "..", function(..){
	// C
} );
// B
```

A, B가 프로그램의 전반부, NOW이고

C가 후반부, LATER다

전반부가 바로 실행되고 정해지지 않은 멈춤 상태가 찾아온다

시간이 지나 Ajax 요청이 끝나면

프로그램은 멈춤 상태가 시작된 곳에서부터 다시 실행을 시작하고

후반부를 이어나간다(continue)

즉, 콜백 함수가 프로그램의 연속성을 보장한다(..? wrap/encapsulate)



```javascript
// A
setTimeout( function(){
	// C
}, 1000 );
// B
```

이 순서를 설명한다면

'A를 실행한 뒤 1000ms 타이머를 설정하고 B를 실행한다

타이머가 울리면 C를 한다'정도가 될 것이다

그러나 이것은 우리 뇌가 동작하는 방식으로 코드를 설명한 것이라 충분하지 않다

우리가 이해하는 방식과 코드가 동작하는 방식은 다르다



### Sequential Brain

멀티태스커라고 주장하는 사람들은 실은 빠르게 아주 잘게 쪼갠 태스크 사이를 왔다갔다 하는 사람들이다(패스트 싱글 태스커?)

뇌가 이벤트 루프 큐처럼 동작한다고 단순화시켜서 생각할 수 있다

'오늘은 외출을 해야겠다'라는 문장을 쓸 때

한 음절을 쓰는 것을 하나의 태스크로 구분한다고 하자

그러면 이 문장을 쓰면서 여러 번 다른 태스크로 눈을 돌릴 기회가 주어지는 것이다



#### Doing Versus Planning

인간은 계획을 세울 때 연속적이고 동시에 발생하는 방식을 쓰는 경우가 많다(sequential, synchronous way)

'가게에 가서 우유를 사고 세탁소에 옷을 맡겨야겠다'

계획을 세울 때는 비동기적인 형식이 아닌 것을 확인할 수 있다

인간은 보통 연속적인 이벤트들로 계획을 짠다 

가게를 가서 우유를 사고 그 다음 세탁소를 가는 것처럼

자연스럽게 우유를 사는 일이 가게를 가는 일이 이루어질 때까지 기다린다고 가정한다



synchronous code, statement by statement

```javascript
// swap `x` and `y` (via temp variable `z`)
z = x;
x = y;
y = z;
```

synchronous 코드이기 때문에 x=y는 z=x를 기다리고 y=z는 x=y를 기다린다



계획을 짜는 것을 비동기적인 방식으로 하는 것은 상상할 수 없다

가게를 가야 하는데, 가는 길에 엄마 전화를 받아서 '지금 가게 가는 중이에요'라고 말하고

엄마가 나에게 말하는 동안에 네이버 지도를 열어야겠다

네이버 지도가 열리는 동안 주변을 돌아보고...

이런 식으로 짤 수는 없다는 것이다

우리가 생각하고 계획하는 의식의 흐름과는 다르기 때문에

개발자들이 비동기적인 코드를 짤 때 부자연스럽다고 느끼게 된다

우리는 단계적으로 생각하지만

비동기적인 코드는 단계적으로 표현되지 않는다



#### Nested/Chained Callbacks

```javascript
listen( "click", function handler(evt){
	setTimeout( function request(){
		ajax( "http://some.url.1", function response(text){
			if (text == "hello") {
				handler();
			}
			else if (text == "world") {
				request();
			}
		} );
	}, 500) ;
} );
```

세 함수가 중첩되어 있는데 각 함수는 비동기적인 태스크(task, process, series)를 나타낸다

이런 코드는 콜백 헬이라고 불리기도 한다

클릭 이벤트를 기다렸다가

타이머를 설정하고

ajax 응답이 오면

if-else 구문을 실행한다



이렇게 코드가 순서대로 실행된다는 가정에는 문제가 있다

```javascript
doA( function(){
	doB();

	doC( function(){
		doD();
	} )

	doE();
} );

doF();
```

doA - doF - doB - doC - doE - doD순인 것을 바로 알아볼 수 있을까?



순서대로 함수의 이름을 바꿔보겠다

```javascript
doA( function(){
	doC();

	doD( function(){
		doF();
	} )

	doE();
} );

doB();
```

doA와 doD가 async가 아니라면 어떨까?

sync 함수라면 순서가 A-C-D-F-E-B가 될 것이다

중첩된 것이 문제일까?

중첩은 분명히 문제의 원인 중 하나가 맞다



아래는 중첩을 사용하지 않고 짠 코드다

```javascript
listen( "click", handler );

function handler() {
	setTimeout( request, 500 );
}

function request(){
	ajax( "http://some.url.1", response );
}

function response(text){
	if (text == "hello") {
		handler();
	}
	else if (text == "world") {
		request();
	}
}
```

이 코드는 중첩을 사용하지 않았지만 여전히 콜백 헬이라고 불리울만하다



우리가 코드를 한 줄씩 분석을 하면 흐름을 보기 위해

이 함수에서 저 함수로 왔다갔다하게 된다

단순화된 버전인 이 코드에서도 그렇다면 실제 코드에서는 훨씬 더 복잡한 양상을 보일 것이다



2, 3, 4단계는 연속해서 일어나니까 하나로 묶는다면

1단계에서 2단계를, 2단계에서 3단계를, 4단계에서 3단계를 하드 코딩으로 콜백하기만 하면 된다

하드코딩이 꼭 나쁜 것만은 아니다

2단계에서 3단계로 가는 것이 언제나 필요한 일이라면 말이다



하지만 하드코딩은 코드를 유연하지 않게 만든다

2단계가 실패한다면 3단계로는 절대 갈 수 없고, 

2단계를 다시 시도하지도 않을 것이며

에러 핸들링 단계로 이동하지도 않을 것이다

그런 처리를 위해서는 단계마다 각 과정을 다 하드코딩해줘야 하는데

반복적이고 재사용 불가능한 코드들이 쓰여지게 된다

이것이 바로 콜백 헬의 진면목이다

중첩이나 들여쓰기는 콜백 헬의 부차적인 모습일 뿐이다



중요한 것은 우리의 뇌가 계획을 짜는 것과 콜백 async 코드가 맞지 않는다는 것이다

코드에 비동기성을 표현할 때 우리 뇌가 동작하는 것처럼 짜려고 하는 마음과 싸워야 한다



### Trust Issues

```javascript
// A
ajax( "..", function(..){
	// C
} );
// B
```

A, B는 지금 실행되는 부분으로 메인 javascript 프로그램의 지배를 받는다

하지만 C는 나중에 실행되는 부분으로 javascript가 아닌 제3자, 여기서는 ajax 함수의 지배를 받는다

대개 이런 식으로 지배력을 상실하는 것이 문제를 불러일으키지는 않는다



하지만 가끔은 그런 일도 일어난다

callback-driven 디자인의 가장 안 좋은 문제라고 볼 수도 있다

예시의 ajax가 내가 쓴 함수가 아니거나 내가 직접적으로 컨트롤할 수 있는 함수가 아니라

제 3자에 의해 제공받은 유틸리티라면 어떨까?



이것을 제어의 역전(inversion of control)이라고 한다

프로그램의 일부분을 컨트롤할 수 있는 권한을 제 3자에게 넘긴 것이다



#### Tale of Five Callbacks

제어의 역전 현상이 큰 문제가 아닌 것처럼 보일 수 있다

그러나 이는 신뢰도 문제와 관련이 있다



비싼 TV를 파는 사이트의 결제 시스템을 만든다고 하자

모든 단계의 페이지를 잘 만들어놨고

마지막 페이지에서 사용자가 '결제' 버튼을 누르면 

거래를 분석하는 회사의(제 3자) 함수를 불러와서 이 판매를 트래킹하게 한다

이 제 3자의 함수가 비동기적인 트래킹 기능을 제공하기 때문에(아마도 퍼포먼스를 위해서)

나는 콜백 함수를 불러야 한다

이렇게 콜백 함수를 부른 뒤에 사용자의 신용 카드에 비용을 청구할 수 있고

사용자에게 구매 감사하다는 페이지를 띄울 수 있다



제 3자의 함수는 아래와 같이 생겼다

```javascript
analytics.trackPurchase( purchaseData, function(){
	chargeCreditCard();
	displayThankyouPage();
} );
```

모든 기능은 잘 작동하는 걸 테스트했고 프로덕션을 위한 배포까지 마쳤다



6개월이 지날 때까지 아무 문제가 없었고

이 코드를 쓴 기억마저 희미해지고 있던 한 아침 전화가 울린다

VIP 손님이 한 TV가 다섯 번 결제됐다고 항의하는 전화다

무엇이 문제였을까?



코드를 훑어본 결과 문제는 트래킹 분석 유틸리티일 수 밖에 없다는 결론이 나온다

이 함수가 콜백 함수를 다섯번이나 부른 것이다

그들이 제공하는 문서에 이런 에러는 나와있지 않다



트래킹 분석 회사에 문의를 남기고 답변을 받았다

개발자가 실험적 코드를 짜고 있었는데

특정 조건 하에서는 타임아웃으로 실패하기 전에 5초 동안 콜백을 1초에 한번씩 부르는 코드였다

이를 프로덕션 코드로 만들 의도가 없었는데

어쩌다보니 그렇게 됐다;;

너무 죄송하고 앞으로 절대 그런 일이 없게 하겠다는 내용이다



상사에게 해당 내용을 보고했지만 상사는 더 이상 그 회사를 믿을 수 없고(나에 대한 신뢰도 좀 약해졌고)

그런 일을 방어할 수 있는 방법을 만들어내라고 한다



나는 즉석에서 다음과 같은 코드를 짠다

```javascript
var tracked = false;

analytics.trackPurchase( purchaseData, function(){
	if (!tracked) {
		tracked = true;
		chargeCreditCard();
		displayThankyouPage();
	}
} );
```

QA가 만약 제 3자의 코드가 콜백을 아예 안 부르면 어떡하냐고 묻는다



콜백과 관련해서 생길 수 있는 모든 불상사를 떠올려본다

- 트래킹이 되기 전 너무 빠르게 콜백을 부른다
- 콜백을 너무 늦게 부르거나 아예 부르지 않는다
- 콜백을 너무 적게 혹은 너무 많이 부른다
- 필수 환경이나 인자를 넘기는 데 실패한다
- 에러나 예외 상황을 알리지 않는다

이런 리스트를 떠올리며 생각한다

이제 신뢰할 수 없는 유틸리티에 넘겨질 콜백 하나하나마다 이런 코드를 짜야하는 구나...

콜백 헬에 빠졌구나...



#### Not Just Others' Code

이것이 제 3자의 유틸리티를 사용했기 때문에 생기는 문제일까?

내가 직접 짠 API나 라이브러리를 사용한다면 신뢰도 문제는 없을까?



이런 문제를 겪다 보면 내가 스스로 방어적인 함수를 만들어야겠다는 생각을 할 수 있다

```javascript
function addNumbers(x,y) {
	// 어떤 인자가 들어오느냐에 따라 예상치 못한 결과를 볼 수 있다
	return x + y;
}

addNumbers( 21, 21 );	// 42
addNumbers( 21, "21" );	// "2121"
```



이 코드의 신뢰도를 높이기 위해 다음과 같은 코드를 짠다

```javascript
function addNumbers(x,y) {
	// ensure numerical input
	if (typeof x != "number" || typeof y != "number") {
		throw Error( "Bad parameters" );
	}
	return x + y;
}

addNumbers( 21, 21 );	// 42
addNumbers( 21, "21" );	// Error: "Bad parameters"
```

좀 더 친숙한 버전으로 신뢰도를 높인 코드도 있다

```javascript
function addNumbers(x,y) {
	// ensure numerical input
	x = Number( x );
	y = Number( y );
	return x + y;
}

addNumbers( 21, 21 );	// 42
addNumbers( 21, "21" );	// 42
```

이런 식으로 신뢰도를 올린 코드는 흔하다

"Trust But Verify"



그렇다면 이렇게 비동기 함수 콜백을 짜서 통제권을 확보할 수 있지 않을까?

물론 그래야한다

그러나 콜백은 우리를 돕기 위한 어떤 것도 제공하지 않는다

그래서 각 비동기 콜백 함수마다 반복되는 코드를 짜야 한다



제어의 반전이 콜백 함수와 관련해서 해결해야 할 가장 큰 문제다

콜백 함수를 쓰고 있는데(제 3자의 유틸리티든 아니든) 제어의 반전을 막는 로직이 없다면

그 코드는 잠재적 버그를 가지고 있는 것이다



### Trying to Save Callbacks

신뢰도 문제를 해결하기 위한 콜백 디자인들이 몇 개 있다



에러 핸들링에 주력하는 패턴. 콜백을 나눈다(하나는 성공, 하나는 에러를 다룸)

```javascript
function success(data) {
	console.log( data );
}

function failure(err) {
	console.error( err );
}

ajax( "http://some.url.1", success, failure );
```

이 디자인을 사용하는 API는 보통 failure 에러 핸들러의 사용이 필수가 아니다

그래서 failure를 사용하지 않으면 그냥 에러를 표시하지 않는다

이 디자인이 바로 ES6 프로미스 API가 사용하는 디자인이다



또 다른 패턴으로 error-first 스타일이 있다

(Node.js API의 거의 모든 컨벤션에서 사용되서 node 스타일이라고 부르기도 한다)

콜백의 첫 인자가 에러 오브젝트다

만약 성공하면 에러 오브젝트는 empty/falsy가 된다

다음 인자가 있다면 성공한 데이터다

실패하면 에러 오브젝트가 set/truthy가 되고 대개 다음 인자는 없다

```javascript
function response(err,data) {
	// error?
	if (err) {
		console.error( err );
	}
	// otherwise, assume success
	else {
		console.log( data );
	}
}

ajax( "http://some.url.1", response );
```



두 패턴 모두 신뢰도 문제를 해결하지 못 했다

예상치 못하게 반복되는 콜백 호출을 막을 수 있는 코드가 없다

성공, 에러, 혹은 둘 다 아닌 경우에 다 대응해야 해서 더 어려워졌다

이게 표준 패턴이긴 하지만 쓸데없이 길게 쓰여진 면이 있다



콜백을 아예 부르지 않는 신뢰도 문제는 어떻게 해야 할까?

이게 문제라면 이벤트를 취소하는 타임아웃을 만들어야 한다

```javascript
function timeoutify(fn,delay) {
	var intv = setTimeout( function(){
			intv = null;
			fn( new Error( "Timeout!" ) );
		}, delay )
	;

	return function() {
		// timeout hasn't happened yet?
		if (intv) {
			clearTimeout( intv );
			fn.apply( this, [ null ].concat( [].slice.call( arguments ) ) );
		}
	};
}

// using "error-first style" callback design
function foo(err,data) {
	if (err) {
		console.error( err );
	}
	else {
		console.log( data );
	}
}

ajax( "http://some.url.1", timeoutify( foo, 500 ) );
```



너무 빨리 콜백함수가 호출되는 문제는 비결정주의와도 관련이 있다

콜백은 항상 비동기적으로 호출해야 한다

> Zalgo라는 동기/비동기와 관련한 가상의 몬스터가 있을 정도다
>
> Don't Release Zalgo!(https://github.com/oren/oren.github.io/blob/master/posts/zalgo.md)
>
> Designing APIs for Asynchrony(http://blog.izs.me/post/59142742143/designing-apis-for-asynchrony)



```javascript
function result(data) {
	console.log( a );
}

var a = 0;

ajax( "..pre-cached-url..", result );
a++;
```

위의 코드가 동기적인 콜백이라 0을 프린트할까

비동기적인 콜백이라 1을 프린트할까?

이는 조건에 따라 달라진다

Zalgo의 무서움이 느껴질 거라고 믿는다



다루는 API가 비동기적으로 동작하는지 알 수 없을 때는 어떻게 해야할까?

비동기성을 확인하기 위한 `asyncify`를 만들어서 활용해보자

```javascript
function asyncify(fn) {
	var orig_fn = fn,
		intv = setTimeout( function(){
			intv = null;
			if (fn) fn();
		}, 0 )
	;

	fn = null;

	return function() {
		// firing too quickly, before `intv` timer has fired to
		// indicate async turn has passed?
		if (intv) {
			fn = orig_fn.bind.apply(
				orig_fn,
				// add the wrapper's `this` to the `bind(..)`
				// call parameters, as well as currying any
				// passed in parameters
				[this].concat( [].slice.call( arguments ) )
			);
		}
		// already async
		else {
			// invoke original function
			orig_fn.apply( this, arguments );
		}
	};
}

function result(data) {
	console.log( a );
}

var a = 0;

ajax( "..pre-cached-url..", asyncify( result ) );
a++;
```

ajax 요청이 캐시에 있어 콜백 함수를 바로 요청해야 하거나

나중에 비도이적으로 수행해야 하거나 상관없이

이 코드는 언제나 0이 아니라 1을 내놓는다

(result()는 비동기적으로 호출될 수밖에 없으므로 a++은 result()보다 앞서서 동작한다)



콜백 함수를 이용해서 많은 것들을 할 수 있지만

들여야 하는 시간과 정성이 매우 크다

다양한 신뢰 문제를 해결하기 위해 여러 콜백 함수에 재사용할 수 있는 방법이 필요한데

ES6가 내놓은 해답이 Promise다



## Promises



### What is a promise?

#### Future Value

#### Completion Event



### Thenable Duck Typing



### Promise Trust



#### Calling too early



#### Calling too late



#### Never calling the callback



#### Calling too few or too many times



#### Failing to Pass Along Any Parameters/Environment



#### Swallowing Any Errors/Exceptions



#### Trustable Promise?



#### Trust Built



### Chain Flow



### Error Handling



### Promise Patterns



### Promise API Recap



### Promise Limitations

## Generators

## Program Performance

## Benchmarking & Tuning

## a-Library: asynquence

## a-Advanced Async Patterns

