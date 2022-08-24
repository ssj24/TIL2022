# Async & Performance

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



## Promises

## Generators

## Program Performance

## Benchmarking & Tuning

## a-Library: asynquence

## a-Advanced Async Patterns

