# ch1

## asynchrony: now & later

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



## a program in chunks

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



## async console

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



## event loop

timeout처럼 분명하게 비동기적으로 JS코드를 쓸 수 있지만 

ES6까지는 JS가 내장된 비동기 기능에 관해 직접적으로 언급한 적은 없다.

JS 엔진은 해당 시점에 요청 받은 하나의 덩어리를 실행하는 것 이상의 일을 하지 않기 때문이다.

`요청을 받았다면` 누가 요청을 한 것일까? 여기가 중요한 부분이다.



JS 엔진은 독립적으로 동작하지 않는다.

호스트 환경(대부분의 경우 웹 브라우저) 내부에서 동작한다. 

지난 몇 년간 JS는 브라우저를 넘어서 서버로 영역을 확장했다.

사실 로봇부터 전구까지 거의 대부분의 장비에 JS가 쓰이고 있다.

이렇게 다양한 환경에서 JS는 하나의 thread를 공유하고 있는데,

여러개의 프로그램 덩어리를 시간의 흐름에 따라 동작시키는 방식으로

매 순간 `이벤트 루프` 가 이루어진다.



JS 엔진은 내장된 시간 감각이 없지만 

JS 코드가 필요할 때 엔진을 호출함으로써 이벤트 루프가 가능하다.



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



## parallel threading

흔히 비동기를(async) 병렬과(parallel) 혼용하지만 둘은 다른 개념이다.

비동기는 지금과 나중 사이의 갭에 관련한 것이지만

병렬은 여러개가 동시에 실행되는 것이다.



병렬 컴퓨팅을 위한 가장 흔한 도구는 프로세스와 쓰레드다.

프로세스와 쓰레드는 독립적으로 실행되고 동시에 실행될 수도 있다.

별개의 프로세서, 더 나아가 별개의 컴퓨터에서 동작하는 여러개의 쓰레드는 

하나의 프로세스의 메모리를 공유할 수 있다.



그와는 반대로 이벤트 루프는 맡겨진 일을 작게 나누고 그것들을 순차적으로 실행한다.

병렬적인 접근이나 공유된 메모리의 변경을 허용하지 않는다.

병렬과 연속은 별개의 쓰레드에 있는 이벤트 루프와 협력적인 관계로 공존할 수 있다.



## run-to-completion

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



## concurrency

사용자가 스크롤을 내리면서 내용이 업데이트되는 사이트를 떠올려보자. 사이트가 올바르게 기능하려면 두 가지의 `프로세스`가 동시에 이루어져야 한다. (프로세스라고 표현했지만 실제로 컴퓨터 공학적 의미의 프로세스가 아니다. 가상의 프로세스로 어떤 동작을 이루는 연속적인 일을 의미한다.) 첫 번째 `프로세스`는 onscroll에 반응해서 새로운 데이터를 받기 위해 Ajax요청을 보낸다. 두 번째 `프로세스`는 Ajax 응답을 받아서 해당 데이터를 페이지에 렌더링한다.



만약 사용자가 빠르게 스크롤을 내린다면 두 개 이상의 onscroll 이벤트가 첫 번째 응답을 받기도 전에 생길 수도 있을 것이다. 그러다 보면 응답받는 데이터 순서가 달라질 수도 있다.



동시성(concurrency)은 두 개 이상의 `프로세스`가 동시에 실행되는 것으로 각각의 동작이 병렬적으로 실행되느냐와 무관하다. 프로세스 수준(태스크 수준)의 병행이라고 볼 수 있다.(오퍼레이션 수준의 병행은 각각의 프로세서 쓰레드에서 이루어진다.)



## noninteracting

두 가지 이상의 프로세스가 한 프로그램에서 동시에 동작하면서 서로 간섭을 할 때, 관련이 없는 태스크라면 굳이 상호작용을 하지 않아도 된다. 상호작용하지 않는다면 비결정주의(nondeterminism)는 전혀 문제되지 않는다.

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



## interaction

동시에 발생한 프로세스들은 간접적으로 스코프나 돔을 통해 상호작용하는 경우가 흔하다. 그런 때에는 `경쟁 상황`이 발생하지 않도록 조정해야 한다.(어떤 것이 먼저 실행되느냐에 따라 결과가 달라지는 상황)

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



또 다른 상황은 경쟁(race), 정확히 말하자면 잠금(latch) 상황이다. 처음 도착하는 것만 받아들인다. 이런 상황에서 비결정주의는 문제가 없다.

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



## cooperation

cooperative concurrency에서는 스코프 안에서 값을 공유하는 것이 주안점이 아니다. 긴 프로세스를 잘게 쪼개서 동시에 발생하는 프로세스들로 하여금 이벤트 루프 큐에 끼어들게 만드는 것이 목표라고 할 수 있다.

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

만약 url.1 요청이 먼저 응답을 받는다면 전체 리스트는 res에 한 번에 맵핑될 것이다. 만약 데이터가 몇 천개라면 별 일 아니겠지만 천만개라면 어떨까? 꽤 긴 시간이 필요할 것이다. 그런 프로세스가 동작하고 있는 중에는 페이지 상에서 다른 일이 처리될 수가 없다. 다른 ajax 요청도 불가능하고 UI가 갱신될 수도 없고 스크롤이 불가능할 수도 있다.

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

이렇게 코드를 바꿔서 한 번에 최대 천 개의 데이터만 다루면서 다른 프로세스들을 동작하게 만든다. 물론 이렇게 하면 응답의 순서를 보장할 수 없지만 순서가 중요하다면 위에서 말한 방법들을 쓰면 된다.

setTimeout(~,0)으로 비동기 스케쥴링을 다루는데 현재 이벤트 루프 큐의 맨 끝에 이 함수를 실행하라는 뜻이다. 기술적으로 해당 함수를 바로 큐에 넣는 것이 아니라 이 다음에 삽입을 하게 된다. 



## jobs

ES6부터 이벤트 루프 큐 위에 새로운 레이어로 잡 큐가 생겼다. 아마 가장 흔하게 알고 있는 예는 비동기 동작의 프로미스일 것이다.

잡 큐는 이벤트 루프 큐의 각 틱이 끝날 때마다 생기는 것으로

틱이 실행되는 동안 생기는 특정한 비동기적 행동으로

새로운 이벤트 전체를 이벤트 루프 큐에 더하지는 않지만

잡이라고 불리는 아이템을 현재 틱의 잡 큐의 맨 마지막에 삽입한다.

"아 이거 이 다음에 해야겠다. 다른 일을 하기 전에 해야지!" 같은 느낌이다.



## statement ordering

코드상에 있는 문장들의 순서는 JS 엔진이 실행하는 순서와 같지는 않다.

JS 엔진이 컴파일을 하면서 안전한 최적화를 하기 때문이다.

보통은 결과가 똑같이 나타나지만

아닌 경우도 있다.



# ch2: callbacks

## continuations

```JS
// A
ajax( "..", function(..){
	// C
} );
// B
```

A, B가 프로그램의 전반부 즉, 지금 실행될 부분이고 C가 후반부, 나중에 실행될 부분이다. 전반부가 즉시 실행되고 나면 우리가 결정할 수 없는 만큼의 일정 시간이 지난 후에 ajax 응답이 오면 후반부를 실행한다.

이를 다른 말로 하면, 콜백 함수는 프로그램의 후속문(continuation)을 감싸고 있다고 할 수 있다.



## nested/chained callbacks

```js
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

이런 코드가 주어진다면 순서대로 실행이 될 거라고 생각하지만 

비동기 JS 프로그램은 우리의 생각과는 다르게 작동할 수 있다.

```JS
doA( function(){
	doB();

	doC( function(){
		doD();
	} )

	doE();
} );

doF();
```

이런 코드가 있다면 실행 순서는 a - f - b - c - e - d가 될 것이다.

만약 a와 d가 비동기 함수가 아니었다면 순서는 a - b - c - d - e - f가 된다.

```JS
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

위의 코드 역시 네스팅 콜백이다.

하나씩 읽어나가다 보면 하나의 함수에서 다른 함수로 또 다른 함수로 이어지는 연속적인 흐름을 확인할 수 있다.

2~4번째 단계를 연결해서 연속적으로 동작시키려면

하드 코딩으로 1단계 안에 2단계를, 2단계 안에 3단계를, 3단계 안에 4단계를 넣어야 한다.

만약 2단계가 바로 3단계로 이어질 수 있다면 하드 코딩이 무조건 나쁜 건 아니다.

그러나 하드 코딩은 연속적인 진행이 이루어지지 않는 것에 대해 아무 책임을 지지 않으므로 약간 불안정하다고 할 수 있다. 예를 들어 2단계가 실패한다면 3단계는 실행할 수 없고, 2단계를 재실행하거나 에러에 대한 방안을 실행하게 된다.

이런 문제들은 매 단계에 하드 코딩으로 설정할 수 있지만 매우 반복적이고 프로그램의 다른 부분에서 재활용할 수 없다. 우리의 뇌는 해야 할 일을 연속적으로 계획한다. 이걸 하고 나면 저걸 하고 그 다음엔 그걸 하자!라는 식으로. 하지만 우리 뇌는 만약 장을 보러 나갔는데 사야할 목록을 집에 놔두고 왔다고 그냥 장을 안 보는 식으로 동작하지 않는다. 이런 일을 미리 예상하지 못했다고 해도 다시 집에 가서 목록을 들고 가게로 가도록 대처할 수 있다.

그러나 하드 코딩된 콜백은(에러 핸들링까지 하드 코드되었다고 해도) 그렇게 우아한 대처를 하지 못 한다. 일어날 수 있다고 예상되는 모든 할 일을 순서대로 쓴다면 코드가 너무너무 복잡해져서 유지 및 보수하는 것이 불가능해질 것이다.

그게 바로 콜백 지옥이다!! 네스팅 및 들여쓰기 된 모습은 그저 부차적인 것일 뿐이다.



## trust issues

뇌가 계획을 세우는 것과 콜백을 이용한 JS의 비동기적 코드간의 차이는 콜백이 가진 문제의 일부분일 뿐이다. 

```JS
// A
ajax( "..", function(..){
	// C
} );
// B
```

A, B는 JS프로그램의 관장 하에 지금 C는 제 3자 파티(위 코드상에서는 ajax 요청)에 의해 나중에 실행되는 부분이다. 보통 이렇게 직접 통제하지 못하는 작업이 프로그램에 많은 문제를 가져오지 않는다고 생각한다. 그러나 문제가 자주 발생하지 않는다고 큰 문제가 아니라고 할 수는 없다. 사실은 이 부분이 콜백 위주의 디자인에서 보이는 최악의 문제다. ajax 요청은 내가 직접 만든 함수도 아니고 직접적으로 통제할 수 있는 함수도 아니다. 

이렇게 제 3자 파티에게 실행 제어를 넘기는 것을 제어 역전(inversion of control)이라고 한다. 내 코드와 제 3자 유틸리티 사이에 말하지 않는 계약이 있어 내가 유지해야만 하는 것들이 있다.



## tale of five callbacks

제어 역전이 어째서 큰 문제일까? 극단적인 예를 들어보겠다. 고가의 tv를 파는 전자 상거래 사이트의 계산 시스템을 만드는 개발자라고 해보자. 개발자는 대부분의 페이지에서 괜찮게 동작하고 있는 계산 시스템을 가지고 있다. 마지막 페이지에서 사용자가 tv를 사겠다고 결정하는 버튼을 클릭하면 거래를 분석 및 추적하는(track) 회사가 제공하는 제 3자 파티의 함수를 부른다. 그러면 그 거래는 추적 가능하게 된다.

개발자는 제 3자 파티가 비동기적인 추적 유틸리티를 제공한 것을 알아차리게 된다. 개발자는 (아마도) 최고의 수행 호율을 위해 콜백 함수를 불러야만 한다. 최종적인 코드는 사용자의 신용 카드에 비용을 청구하고 감사하다는 페이지를 띄우는 것이다.

```JS
analytics.trackPurchase( purchaseData, function(){
	chargeCreditCard();
	displayThankyouPage();
} );
```

간단한 과정이다. 코드를 쓰고 테스트한다. 다 동작하면 실사용한다.

6개월이 지났고 아무 문제도 없었다. 개발자는 그런 코드를 썼다는 기억조차 잊어버릴 시간이 지났다. 어느 날 아침 출근하기 전 들른 카페에서 라떼를 마시다가 상사로부터 온 전화를 받고 패닉에 빠져 회사로 뛰어가게 된다. 

회사에 도착하자 vip 고객이 굉장히 화가 나 본인 카드가 같은 tv를 5번이나 결제했다고 말하는 것을 보게 된다. cs부서에서 사과를 하고 환불을 해줬지만 상사는 왜 이런 일이 발생했는지 설명을 바란다. 로그들을 몇 개 살펴보고 나니 가능한 해설은 하나뿐이라는 것을 깨닫는다. 왜인지 모르겠지만 분석 유틸리티가 개발자의 콜백을 한 번이 아닌 다섯 번 부른 것이다. 그들이 제공한 문서에는 이런 일이 언급되어 있지 않았다.

개발자는 제 3자 회사의 cs부서에 연락을 한다. 다음 날 받은 해명 메일은 다음과 같았다. 분석 회사의 개발자가 특정 상황 하에서는 타임아웃으로 실패하기 전까지 일초에 한 번 5초 동안 제공받은 콜백을 실행하는 실험적인 코드를 연구하는 중이었다. 어쩌다보니 그것이 프로덕션에 푸시되었으며 굉장히 당황스럽다며 사과를 하는 내용이었다. 사장은 더 이상 그들을 믿지 못하겠다며 그런 상황이 다시 발생한다면 어떻게 안전한 계산을 할 수 있을지 알아내라고 한다.

개발자는 즉석에서 다음과 같은 코드를 짠다.

```JS
var tracked = false;

analytics.trackPurchase( purchaseData, function(){
	if (!tracked) {
		tracked = true;
		chargeCreditCard();
		displayThankyouPage();
	}
} );
```

QA기술자가 묻는다. 만약 콜백이 호출되지 않는다면 어떡해요? 생각치 못한 부분이므로 그 부분을 해결해야 한다. 제 3자 회사가 개발자의 콜백을 호출하면서 생길 수 있는 모든 에러에 대해 떠올려 목록으로 만들어본다. 추적되기도 전에 너무 빨리 콜백을 호출한다던가 너무 늦게 호출한다던가 전혀 호출하지 않는다던가.... 개발자는 서서히 깨닫게 된다. 개발자 스스로도 믿는다고 확신할 수 없는 유틸리티에게 보내는 모든 가능한 콜백에 대해 각각 로직을 만들어내야 한다는 것을. 

콜백 지옥의 일면을 확인할 수 있었길 바란다.



## not just others' code

여전히 콜백 지옥이 그렇게 끔찍하게 느껴지지 않는다면 제 3자 파티의 유틸리티와 크게 상호작용하지 않는 사람일 수도 있다. 아마 API나 스스로 만든 라이브러리를 써서 당신의 통제에서 벗어난 상황이 없기 때문일 수도 있다. 그렇다면 스스로 만든 유틸리티는 정말 신뢰할 만한 것일까?

미연의 사고를 방지하기 위해 프로그램을 짤 때 어느 정도까지는 개발자 스스로 짜야 한다는 데에는 대부분 동의할 것이다.

```JS
// 입력값을 너무 믿을 때(안전하지 않음)
function addNumbers(x,y) {
	return x + y;
}

addNumbers( 21, 21 );	// 42
addNumbers( 21, "21" );	// "2121"


// 안전하지만 좀 더 친근한 방법?
function addNumbers(x,y) {
	// ensure numerical input
	x = Number( x );
	y = Number( y );

	// + will safely do numeric addition
	return x + y;
}

addNumbers( 21, 21 );	// 42
addNumbers( 21, "21" );	// 42


// 방어적인 태도!
function addNumbers(x,y) {
	// ensure numerical input
	if (typeof x != "number" || typeof y != "number") {
		throw Error( "Bad parameters" );
	}

	// if we get here, + will safely do numeric addition
	return x + y;
}

addNumbers( 21, 21 );	// 42
addNumbers( 21, "21" );	// Error: "Bad parameters"

```

입력값을 확인하고 표준화하는 것은 완전히 믿는 코드에 대해서도 당연히 이루어지는 작업이다. "Trust but Verify"

그러니 비동기 콜백 함수에 대해서도 똑같이 해야 맞지 않을까? 

그러나 콜백은 우리가 쉬운 길을 가게 두지 않는다.

모든 시스템을 우리 스스로 짜야 하고 

각 비동기 콜백마다 문건을 만들어야 할 것이다.

콜백과 관련한 가장 큰 문제는 제어의 역전으로 인한 신뢰의 붕괴다.

제 3자 파티 유틸리티와 독점 계약을 맺지 않은 콜백을 사용하고 있고

모든 신뢰 문제와 관련해서 제어의 역전 현상을 대비하지 않고 있다면

당신의 코드에는 아직 발생하지 않은 버그가 도사리고 있다.

잠복하고 있다고 해서 병이 아닌 것은 아니다.



## trying to save callbacks

지금까지 언급한 신뢰 문제를 해결하기 위해 다양한 콜백 디자인들이 시도되어 왔다. 용감하지만 콜백 패턴을 살리기에는 부족한 시도들이었다.

1. 좀 더 우아한 에러 핸들링을 하기 위해 몇몇 API 디자인은 분리된 콜백을 제공했다.

   하나는 성공을 알리는 것이고 다른 것은 에러를 알리는 것이었다.

   ```JS
   function success(data) {
   	console.log( data );
   }
   
   function failure(err) {
   	console.error( err );
   }
   
   ajax( "http://some.url.1", success, failure );
   ```

   이 디자인에서 failure() 에러 핸들러는 선택 사항이었고, 제시되지 않는다면 당신이 에러를 처리하지 않기를 원한다고 가정했다. 

   ES6 프로미스 API가 사용하는 방식이 바로 이것이다.

2. 또 하나의 흔한 콜백 패턴은 'error-first style'로 대부분의 node.js API에서 컨벤션으로 쓰여 노드 스타일이라고 불리기도 한다.

   하나의 콜백의 첫 번째 인자가 에러 객체를 위해 안배된다.

   만약 성공이라면 이 인자는 비워져있고(empty/falsy) 그 다음에 성공한 데이터가 자리한다.

   만약 에러가 온다면 첫 번째 인자로 에러값이 오고(set/truthy) 대개 따라오는 것은 없다.

   ```JS
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

두 가지 방법 모두 주된 신뢰 문제를 해결해주지는 못했다. 

원치 않는 중복된 호출을 막아주지도 못 했고

오히려 성공과 에러 모두 답을 받게 되면서 더 복잡해졌으며

그럼에도 불구하고 각 조건에 따른 코드를 짜야만 한다.



아예 호출되지 않는 것과 관련된 신뢰 문제는 어떨까?

이것이 문제라면 타임아웃을 설정해서 이벤트를 취소하면 된다.

유틸리티를 만들어서 해결하는 것이다.

```JS
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

또 다른 신뢰 문제는 너무 일찍 호출이 된다는 것이다. 특정한 행동이 수행되기 전에 호출이 되는 것이다. 동기적으로(지금) 혹은 비동기적으로(나중에) 수행해야 할 콜백과 관련한 문제다.

이런 비결정성은(nondeterminism) 추적하기 매우 어려운 버그로 나타난다. 





# ch3: promises

프로그램의 후속문 부분을 콜백 함수로 감싸서 제 3자 파티에 넘기면서 그저 모든 일이 잘 되기를 바랐던 것이 기존의 방식이다. 이 때 제어의 역전 현상이 일어날 수도 있어서 문제였는데, 제어의 역전 현상을 뒤집을 수 있다면 어떨까?

프로그램의 후속문을 제 3자에 넘기는 대신에 제 3자 쪽에서 이 일이 언제 끝날 지 알려 줄 수 있는 능력이 있는지 여부를 보내주면 그 다음에 내 코드에서 다음에 무엇을 할 지 결정할 수 있는 식으로 만들 수 있다. 이런 패러다임을 프로미스라고 부른다.

프로미스는 JS 생태계에 돌풍을 불어왔고 새롭게 추가되는 비동기 API는프로미스를 기반으로 하고 있다.

## what is a promise?

### future value

햄버거 전문점에 가서 치즈버거를 주문하고 돈을 지불했다. 가치 거래를 한 것으로 받기로 한 가치는 치즈버거인 셈이다. 대개는 치즈버거를 바로 주지 않는다. 점원은 치즈버거 대신 주문번호가 쓰인 영수증을 건네준다. 이 영수증은 나중에 치즈버거를 주겠다는 약속이다.

치즈버거를 기다리면서 다른 할 일을 한다. 아직 치즈버거를 받지는 못 했지만 나는 치즈버거를 받게 될 것임을 알고 있다. 영수증이 일종의 치즈버거 플레이스홀더 역할을 한다. 이 플레이스홀더는 시간과는 독립적으로 가치를 지닌다. 바로 미래값이다.(future value)

시간이 지나 내 주문번호가 불리면 영수증을 건네주고 치즈버거를 받아온다. 내 미래값이 준비되면 프로미스와 가치를 교환하는 것이다.

예상과 다른 일이 벌어질 수도 있다. 내 주문번호가 불려서 갔더니 치즈버거가 다 팔렸다는 소식을 전해주는 것이다. 고객으로써 느낄 황당함을 떠나서 얘기해보자. 여기서 우리는 미래값의 중요한 성격을 볼 수 있다. 성공할 수도 실패할 수도 있다는 것이다. 

치즈버거를 주문할 때마다 치즈버거를 받을 수도 있지만 치즈버거가 다 팔려서 다른 음식을 먹어야 할 수도 있다.

### values now and later

숫자 타입과 관련한 계산을 하는 vaule와 관련한 코드를 짤 때, 우리는 값이 현재값이라고 추정하곤 한다.

```JS
var x, y = 2;

console.log( x + y ); // NaN  <-- because `x` isn't set yet
```

x + y 수식은 이미 x와 y의 값이 결정되어 있다고(resolved) 가정하고 있다.

'x와 y의 값이 정해진 (바로) 다음에 x와 y를 더해라'는 코드를 만들어보자.

```JS
function add(getX,getY,cb) {
	var x, y;
	getX( function(xVal){
		x = xVal;
		// both are ready?
		if (y != undefined) {
			cb( x + y );	// send along sum
		}
	} );
	getY( function(yVal){
		y = yVal;
		// both are ready?
		if (x != undefined) {
			cb( x + y );	// send along sum
		}
	} );
}

// `fetchX()` and `fetchY()` are sync or async
// functions
add( fetchX, fetchY, function(sum){
	console.log( sum ); // that was easy, huh?
} );
```

보기 좋은 코드는 아니지만 비동기 패턴과 관련해서 중요한 부분이 있다.

x와 y를 미래값으로 생각하고 add()를 진행하기 때문에 add()는 x와 y가 지금 값을 가지고 있는지 아닌지 싱경쓰지 않는다. 다른 말로 하면 이는 now와 later를 정규화시켜 add()의 결과를 예상 가능하게 만든 것이다.

잠깐이지만 일관적인(now와 later의 값 차이가 없음) add()를 사용함으로써 비동기 코드를 해석하기 훨씬 쉬워졌다.

지금과 나중의 값을 일정하게 유지하려면 둘 모두 나중 값으로 만들어 모든 작업을 비동기적으로 만들면 된다. 

### promise value

x + y 예를 프로미스를 이용해서 표현해보자.

```JS
function add(xPromise,yPromise) {
	// `Promise.all([ .. ])` takes an array of promises,
	// and returns a new promise that waits on them
	// all to finish
	return Promise.all( [xPromise, yPromise] )

	// when that promise is resolved, let's take the
	// received `X` and `Y` values and add them together.
	.then( function(values){
		// `values` is an array of the messages from the
		// previously resolved promises
		return values[0] + values[1];
	} );
}

// `fetchX()` and `fetchY()` return promises for
// their respective values, which may be ready
// *now* or *later*.
add( fetchX(), fetchY() )

// we get a promise back for the sum of those
// two numbers.
// now we chain-call `then(..)` to wait for the
// resolution of that returned promise.
.then( function(sum){
	console.log( sum ); // that was easier!
} );
```

코드상에서 두 가지 프로미스를 볼 수 있다.

fecthXd와 fetchY는 직접적으로 호출되고 반환하는 값은 프로미스로 add()에게 건네어진다. 프로미스로 대표되는 값들은 지금 혹은 나중에 결정된다. x와 y는 미래값이므로 시간과 독립적인 방식으로 값을 추론한다.

두 번째 프로미스는 add()가 Promise.all()을 통해 만들어서 반환한다. then()을 사용함으로써 프로미스가 반환될 때까지 기다린다. add()의 실행이 끝나면 sum 미래값이 결정되고 출력할 수 있다. 

치즈버거 때와 마찬가지로 프로미스의 값을 결정하는 것은 거절당할 수도 있다. 거절 당하면 프로그램의 로직에 따른 값을 가질 수도 있고 런타임 에러를 일으킬 수도 있다.

프로미스는 미래값을 만들 때 중복해서 사용하기 좋은 메카니즘을 가지고 있다.



## completion event

각각의 프로미스는 미래값의 역할을 맡는다. 프로미스를 결정하는 또 다른 방법으로는 flow-control mechanism이 있다. 비동기적인 작업으로 두 세 단계를 거친다.(일시적으로 이거 그리고 나면 저거)

foo()를 호출해서 어떤 작업을 수행하도록 하는데 우리가 세부사항을 모른다고 가정해보자. foo()는 바로 일을 마칠 수도 있고 시간이 걸릴 수도 있다.

다음 일을 하려면 우리는 foo()가 언제 끝나는지 알아야만 한다. foo()가 끝났을 때 우리에게 알려주면 그 다음을 계속하는 것이다.

JS에서는 보통 알람을 이벤트의 관점에서 생각한다. 그렇다면 foo()에서 보낸 완료 이벤트를 들으려면 어떡해야 할까?

콜백을 이용하면 알람은 foo()에서 부른 콜백이 될 것이다. 그러나 프로미스를 이용하면 관계가 조금 변하게 된다. foo()에서 온 이벤트를 들으면 그에 따라서 다음을 진행하는 것이다.

```JS
foo(x) {
	// start doing something that could take a while
}

foo( 42 )

on (foo "completion") {
	// now we can do the next step!
}

on (foo "error") {
	// oops, something went wrong in `foo(..)`
}
```

foo()를 호출하고 이벤트 리스너를 두 개 만들었다. 하나는 완료, 하나는 에러를 위한 것으로 foo()에서 나올 수 있는 두 가지 결과를 커버한다. 중요한 건 foo()는 코드를 호출하는 것이 이런 이벤트들에 보여지고 있는 것을 모른다는 것이다.

그러나 그런 코드들은 JS 환경이 가지고 있지 않은 일종의 마법을 필요로한다. 좀 더 자연스러운 JS 방식은 다음과 같다.

```JS
function foo(x) {
	// start doing something that could take a while

	// make a `listener` event notification
	// capability to return

	return listener;
}

var evt = foo( 42 );

evt.on( "completion", function(){
	// now we can do the next step!
} );

evt.on( "failure", function(err){
	// oops, something went wrong in `foo(..)`
} );
```

foo()는 이벤트에 대한 응답을 할 수 있는지 여부를 바로 표현하고,

그 표현을 받은 foo()를 부른 코드는 그에 대하여 두 가지 이벤트 핸들러를 등록한다.

보통의 콜백 코드가 역전된 것이 잘 보이는 지 모르겠다. 

foo()에게 콜백을 넘기는 대신에 foo()로부터 이벤트 관련 여부를 응답으로 받아 evt에 저장한다.

evt는 콜백을 받는다.

콜백은 제어의 역전 현상을 띌 수밖에 없는데

콜백 패턴을 뒤집음으로써 역전의 역전을 불러온다. 

다시 제어를 할 수 있게 된 것이다.



가장 중요한 이점 중 하나는 코드의 여러 조각들이 이벤트 리스닝 여부를 받을 수 있다는 것이다. 각각 독립적으로 언제 foo()가 실행 완료되었는지 알림을 받고 그 다음 단계를 수행할 지 알 수 있게 된다.

```JS
var evt = foo( 42 );

// let `bar(..)` listen to `foo(..)`'s completion
bar( evt );

// also, let `baz(..)` listen to `foo(..)`'s completion
baz( evt );
```

또한 문제를 분리할 수 있다.

bar()와 baz()는 foo()가 어떻게 호출되었는지와는 무관하다.

foo()는 bar()와 baz()가 존재하는지 혹은 작업 완료 알림을 기다리는지 신경 쓸 필요도 알 필요도 없다.

evt 객체는 중립적인 제 3자 파티로 각각 다른 문제를 중재하는 역할을 한다.

### promise "events"

이벤트 리스닝 여부인 evt는 프로미스를 위한 analogy다.

이전에 본 코드를 프로미스 기반의 방법으로 바꾼다면 foo()가 프로미스 인스턴스를 만들고 리턴하면 그 프로미스가 bar(), baz()로 패스되었을 것이다.

프로미스가 만드는 `이벤트` 는 이벤트처럼 동작하긴 하지만 이벤트는 아니다.

그래서 완료되거나(completion) 에러를 일으키지 않는다. 

대신 then()을 써서 then 이벤트를 등록한다.(좀 더 정확히 하면 then()이 fulfillment/rejection 이벤트를 등록한다.)

```JS
function foo(x) {
	// start doing something that could take a while

	// construct and return a promise
	return new Promise( function(resolve,reject){
		// eventually, call `resolve(..)` or `reject(..)`,
		// which are the resolution callbacks for
		// the promise.
	} );
}

var p = foo( 42 );

bar( p );

baz( p );
```

new Promise( function(){})에서 보여지는 패턴은 revealing constructor이라고 불린다.

패스받은 함수는 바로 실행된다.(callback의 then()처럼 비동기가 아니다.)

함수의 인자 두 개는 프로미스를 위한 resolution 함수로

첫 번째가 성공했을 때, 두 번째가 실패했을 때 실행된다.



또 다른 방법은 다음과 같다.

```JS
function bar() {
	// `foo(..)` has definitely finished, so
	// do `bar(..)`'s task
}

function oopsBar() {
	// oops, something went wrong in `foo(..)`,
	// so `bar(..)` didn't run
}

// ditto for `baz()` and `oopsBaz()`

var p = foo( 42 );

p.then( bar, oopsBar );

p.then( baz, oopsBaz );
```

마지막 두 줄을 p.then().then();으로 쓰면 위와는 전혀 다른 결과를 가져올 수 있으므로 주의해야 한다. 

p 프로미스를 bar(), baz()에 넘겨주는 대신 프로미스가 bar(), baz()가 언제 실행될 지를 제어하게 한다. 에러 핸들링에서 가장 큰 차이가 난다.

이전 방법은 foo()의 성공/실패와 무관하게  bar()가 호출이 되어 만약 foo()가 실패했다면 bar()가 알아서 본인의 대비책을 실행한다.

하지만 지금 본 방법은 foo()가 성공했을 때만 bar()를 호출한다. 실패하면 oopsBar()를 호출한다.

옳은 방법이 있는 것은 아니다. 어떤 방법이든 프로미스 p가 foo()에서 리턴되면 다음 일어날 일을 제어한다. 두 방법 모두 프로미스 p에 대해 then()을 두 번 호출하면서 끝이난다. 이미 결정된 프로미스는 같은 resolution(fulfillment/rejection)을 계속 가지고 있기 때문에 후에도 필요한 만큼 계속 사용할 수 있다.



## thenable duck typing

프로미스를 사용하면서 가장 중요한 것은 어떤 값이 진짜 프로미스인지 아닌지를 구별하는 것이다. 좀 더 직접적으로 말하자면 이 값이 프로미스처럼 행동할 지를 구별해야 한다.

프로미스가 new Promise() 문법을 통해서 construct되므로 p가 Promise의 인스턴스인지 체크하면 될 거라고 생각할 수도 있지만(p instanceof Promise) 그로는 충분치 않다. 주로 다른 브라우저 윈도우로부터 프로미스 값을 받는데 기존 윈도우/프레임과는 다른 독자적인 프로미스일 수도 있다. 그러면 instanceof로 확인하면 거짓이 나오게 될 것이다.

라이브러리나 프레임워크는 고유의 프로미스를 만들고 ES6의 프로미스를 쓰지 않을 것이다. 예전 브라우저의 경우 프로미스가 아예 없기 때문에 라이브러리를 이용해서 프로미스를 쓰는 경우가 많다.

thenable 방법으로 프로미스를 구분할 수 있는데 이 객체/함수에 then 메소드가 있는지를 보는 것이다. 모양을 바탕으로(어떤 속성(property)이 보이는지) 값의 타입을 가정하는 타입 체크는 덕 타이핑(duck typing)이라고 불린다. "만약 이것이 오리같이 생겼고 오리처럼 운다면, 이것은 오리다." 

```JS
if (
	p !== null &&
	(
		typeof p === "object" ||
		typeof p === "function"
	) &&
	typeof p.then === "function"
) {
	// assume it's a thenable!
}
else {
	// not a thenable
}
```

덕 타입 체크와 thenable을 함께 쓰면 위와 같다.

위의 코드에는 문제가 있다. then() 함수가 있는 어떤 객체/함수를 프로미스인지 확인하고 싶은데 promise/thenable로 취급하고 싶지는 않다면 이 방법은 맞지 않다. 이 방법을 쓰면 객체는 자동적으로 thenable로 취급되어 특별한 규칙이 적용되게 된다.(특별한 규칙은 다른 챕터에서 서술) 

이 값에 then()이 있다는 것을 몰랐다고 해도 똑같다.

```JS
var o = { then: function(){} };

// make `v` be `[[Prototype]]`-linked to `o`
var v = Object.create( o );

v.someStuff = "cool";
v.otherStuff = "not so cool";

v.hasOwnProperty( "then" );		// false
```

v는 프로미스나 thenable처럼 보이지 않는다. 그저 몇몇 속성을 가지고 있는 평범한 객체다. 그러나 v는 prototype으로 다른 객체인 o와 링크되어 있는데 o는 then()을 가지고 있다. thenable 덕 타입 체크는 v가 thenable이라고 착각할 수도 있다.

또 다른 경우는 다음과 같다.

```JS
Object.prototype.then = function(){};
Array.prototype.then = function(){};

var v1 = { hello: "world" };
var v2 = [ "Hello", "World" ];
```

v1, v2는 thenable로 판단될 것이다. 어떤 코드가 사고로 우연히 혹은 고의로 Object.prototype이나 Array.prototype 등 기존 프로토타입에 then()을 더할 지 알 수 없고 통제할 수 없다. 만약 콜백을 인자로 호출하는 함수가 더해진다면 어떤 프로미스든 그 값으로 결정될 것이다.

너무 과장되었다고 생각할 수도 있다. 하지만 ES6 이전의 커뮤니티에서는 프로미스를 기반으로 하지 않는 라이브러리가 then()이라는 메소드를 쓰기도 했다는 것을 알아두자.

thenable 덕 타이핑은 좋은 방법이다. 다만 위험성이 있다는 것을 알고 써야한다.



## promise trust

- Call the callback too early

  프로미스는 이 문제와 관련하여 예민할 수 밖에 없는다. 바로 완수되는(fulfilled) 프로미스라도(new Promise(function(resolve) {resolve(42); })) 동시에 확인할 수는 없기 때문이다.

  프로미스에서 then()을 호출하면 그 프로미스가 이미 결정되었을지라도 then()에 보낸 콜백은 언제나 비동기적으로 호출된다. setTimeout(,0)을 쓸 필요가 없다.

- Call the callback too late

  프로미스의 then()으로 등록한 observation 콜백은 프로미스 생성 여부가 호출하는 resolve()/reject()에 자동으로 예약된다. 예약된 콜백들은 다음 비동기 때에 실행될 것으로 예정된다.

  동시 연쇄 작업이(a synchronous chain of tasks) 다른 콜백을 지연 실행시킬 수는 없다.  프로미스가 결정되었을 때 then()을 통해 등록된 모든 콜백은 다음 비동기적인 기회가 오면 순서대로 호출이 된다. 그런 콜백 중의 하나 내부에서 일어나는 일은 다른 콜백을 호출하는 일에 어떠한 영향을 줄 수 없다.

  ```JS
  p.then( function(){
  	p.then( function(){
  		console.log( "C" );
  	} );
  	console.log( "A" );
  } );
  p.then( function(){
  	console.log( "B" );
  } );
  // A B C
  ```

  여기서 C는 B를 막거나 새치기 할 수 없다.

  - promise scheduling quirks

    스케쥴링, 특히 두 가지 무관한 프로미스 사이의 콜백의 관련 순서는 다양한 차이를 줄 수 있다. 만약 p1, p2가 이미 결정되었다면, p1.then(); p2.then()이 p2를 위한 콜백을 부르기 전에 p1을 위한 콜백을 부를 것이다. 그렇지만 그와 다른 결과가 나오는 경우도 있다.

    ```JS
    var p3 = new Promise( function(resolve,reject){
    	resolve( "B" );
    } );
    
    var p1 = new Promise( function(resolve,reject){
    	resolve( p3 );
    } );
    
    var p2 = new Promise( function(resolve,reject){
    	resolve( "A" );
    } );
    
    p1.then( function(v){
    	console.log( v );
    } );
    
    p2.then( function(v){
    	console.log( v );
    } );
    
    // A B  <-- not  B A  as you might expect
    ```

    p1은 바로 값으로 결정되는 것이 아니라 다른 프로미스 p3로 결정되는데, p3는 B로 결정된다. p1의 콜백은 p2의 콜백보다 비동기 잡 큐의 뒤에 위치하게 된다.

    그런 의도치 않은 상황을 피하려면 프로미스, 콜백의 오더링/스케쥴링을 믿어서는 안 된다. 최대한 여러 콜백의 순서가 중요하지 않게 코드를 짜는 것이 좋다.

- Never calling the callback

  어떤 상황이든(JS 에러를 포함해서) 프로미스의 결정은 알려야만 한다. 프로미스가 결정되었다면 프로미스를 위한 콜백이 fulfillment이든 rejection이든 호출되게 된다.

  물론 콜백 자체에 JS 에러가 있다면 원하는 결과를 볼 수는 없겠지만 콜백이 호출되는 것은 사실이다. 

  프로미스 자체가 계속 결정되지 않는다면 어떨까? 바로 그게 race라는 상황에서 프로미스가 내놓은 답변이라고 해도 말이다.

  ```JS
  // a utility for timing out a Promise
  function timeoutPromise(delay) {
  	return new Promise( function(resolve,reject){
  		setTimeout( function(){
  			reject( "Timeout!" );
  		}, delay );
  	} );
  }
  
  // setup a timeout for `foo()`
  Promise.race( [
  	foo(),					// attempt `foo()`
  	timeoutPromise( 3000 )	// give it 3 seconds
  ] )
  .then(
  	function(){
  		// `foo(..)` fulfilled in time!
  	},
  	function(err){
  		// either `foo()` rejected, or it just
  		// didn't finish in time, so inspect
  		// `err` to know which
  	}
  );
  ```

  foo()의 결과를 받아내야만 프로그램이 무한하게 돌아가는 것을 막을 수 있다.

- Call the callback too few or too many times

  콜백은 한 번만 호출되면 되는데 너무 적다는 것은 한 번도 호출되지 않았다는 것이므로 이미 본 케이스와 같다.

  너무 많은 경우는 다음과 같다. 프로미스는 한 번만 결정될 수 있는데 프로미스를 만드는 코드가 resolve()나 reject()를 여러번 호출하려 한다면, 프로미스는 첫 번째 결정만을 따르고 그 다음에 들어오는 시도들은 모두 무시하게 된다. then()으로 등록된 콜백 역시 한 번씩만 호출된다.

  물론 같은 콜백을 여러번 쓴다면 쓴 만큼 호출이 된다.

- Fail to pass along any necessary environment/parameters

  프로미스는 fulfillment와 rejection 둘 중 하나의 결정값(resolution value)만을 가질 수 있다.

  만약 값을 특정짓지 않으면 undefined가 된다. 값이 무엇이든 등록된 모든 콜백에 지금이든 나중이든 패스되게 된다.

  만약 resolve()/reject()를 여러개의 인자와 함께 호출한다면 첫 번째 이후의 모든 인자는 무시된다. 이상하게 보일 수도 있지만 여러 개의 인자를 넣는 것은 프로미스 메카니즘과 어긋나기 때문이다. API를 잘못 사용하는 것 역시(ex) resolve() 여러 번 호출하기) 막히는 것과 마찬가지다.

  만약 여러 값을 보내고 싶다면 하나의 어레이나 오브젝트로 감싸야 한다.

  JS 함수는 스코프에서 클로저를 가지므로 어떻게 감싸져있든지 값에 접근할 수 있다. 콜백만을 쓰는 디자인에서 역시 마찬가지다.

- Swallow any errors/exceptions that may happen

  만약 프로미스가 어떤 이유로 거절된다면 그 값은 리젝션 콜백으로 넘어가게 된다.

  만약 프로미스가 생성 혹은 값이 결정되는 과정에서 타입에러나 리퍼런스에러같은 JS의 예외가 발생한다면 해당 예외는 프로미스를 거절하게 만든다.

  ```js
  var p = new Promise( function(resolve,reject){
  	foo.bar();	// `foo` is not defined, so error!
  	resolve( 42 );	// never gets here :(
  } );
  
  p.then(
  	function fulfilled(){
  		// never gets here :(
  	},
  	function rejected(err){
  		// `err` will be a `TypeError` exception object
  		// from the `foo.bar()` line.
  	}
  );
  ```

  foo.bar()에서 발생한 JS 에러는 당신이 캐치하고 응답할 수 있는 프로미스 리젝션이 된다.

  어떤 에러도 비동기적일 수 없는데, 이 에러는 비동기적인 반응을 만들어낼 수 있다는 점에서 중요하다. 프로미스는 JS의 예외마저도 비동기적인 행동으로 바꾸어 경쟁 상황이 만들어질 수 있는 가능성을 현격히 줄여준다.

  만약 프로미스가 fulfill되었는데 예외적인 JS 에러가 observation(then()으로 등록된 콜백에서) 중 발견되었다면 어떨까? 

  ```js
  var p = new Promise( function(resolve,reject){
  	resolve( 42 );
  } );
  
  p.then(
  	function fulfilled(msg){
  		foo.bar();
  		console.log( msg );	// never gets here :(
  	},
  	function rejected(err){
  		// never gets here either :(
  	}
  );
  ```

  foo.bar()에서 만들어진 예외가 사라진 것처럼 보이지만 그렇지 않다. 그러나 뭔가 잘못된 것은 확실하다. p.then()은 또 다른 프로미스를 리턴하는데 그 프로미스가 타입 에러로 리젝트된다.

  우리가 만들어놓은 에러 핸들러가 호출되지 않는 이유는 무엇일까? 겉으로 보기에는 호출이 되어야 할 것 같지만 프로미스가 한 번 결정되면 immutable하다는 근본적인 원칙을 거스르기 때문이다. p는 이미 42로 fulfill되었다. p의 resolution을 observe하면서 에러가 있다고 이를 리젝션으로 변경할 수는 없다.

  원칙을 위배하는 것뿐만 아니라 그런 행동은 큰 혼돈을 불러일으킬 수도 있다. 만약 프로미스 p에 then()으로 등록된 콜백이 여러개가 있다면 어떤 것은 호출되고 어떤 것은 호출되지 않을 수 있다.

- trustable promise?

  프로미스의 패턴을 기반으로 한 신뢰를 형성하려면 살펴봐야 할 마지막 포인트가 있다.

  프로미스가 콜백을 없애는 것과 상관이 없다는 것을 알아차렸을 것이다. 그저 콜백이 어디서 패스되는지에 관여할 뿐이다. 콜백을 foo()에게 패스하는 대신에 foo() 뒤에서 프로미스를 만들어 거기에 콜백을 패스한다.

  왜 프로미스가 있으면 콜백만 있는 것보다 신뢰할 수 있을까?

  

  But why would this be any more trustable than just callbacks alone? How can we be sure the *something* we get back is in fact a trustable Promise? Isn't it basically all just a house of cards where we can trust only because we already trusted?

  One of the most important, but often overlooked, details of Promises is that they have a solution to this issue as well. Included with the native ES6 `Promise` implementation is `Promise.resolve(..)`.

  If you pass an immediate, non-Promise, non-thenable value to `Promise.resolve(..)`, you get a promise that's fulfilled with that value. In other words, these two promises `p1` and `p2` will behave basically identically:

  ```js
  var p1 = new Promise( function(resolve,reject){
  	resolve( 42 );
  } );
  
  var p2 = Promise.resolve( 42 );
  ```

  But if you pass a genuine Promise to `Promise.resolve(..)`, you just get the same promise back:

  ```js
  var p1 = Promise.resolve( 42 );
  
  var p2 = Promise.resolve( p1 );
  
  p1 === p2; // true
  ```

  Even more importantly, if you pass a non-Promise thenable value to `Promise.resolve(..)`, it will attempt to unwrap that value, and the unwrapping will keep going until a concrete final non-Promise-like value is extracted.

  Recall our previous discussion of thenables?

  Consider:

  ```js
  var p = {
  	then: function(cb) {
  		cb( 42 );
  	}
  };
  
  // this works OK, but only by good fortune
  p
  .then(
  	function fulfilled(val){
  		console.log( val ); // 42
  	},
  	function rejected(err){
  		// never gets here
  	}
  );
  ```

  This `p` is a thenable, but it's not a genuine Promise. Luckily, it's reasonable, as most will be. But what if you got back instead something that looked like:

  ```js
  var p = {
  	then: function(cb,errcb) {
  		cb( 42 );
  		errcb( "evil laugh" );
  	}
  };
  
  p
  .then(
  	function fulfilled(val){
  		console.log( val ); // 42
  	},
  	function rejected(err){
  		// oops, shouldn't have run
  		console.log( err ); // evil laugh
  	}
  );
  ```

  This `p` is a thenable but it's not so well behaved of a promise. Is it malicious? Or is it just ignorant of how Promises should work? It doesn't really matter, to be honest. In either case, it's not trustable as is.

  Nonetheless, we can pass either of these versions of `p` to `Promise.resolve(..)`, and we'll get the normalized, safe result we'd expect:

  ```js
  Promise.resolve( p )
  .then(
  	function fulfilled(val){
  		console.log( val ); // 42
  	},
  	function rejected(err){
  		// never gets here
  	}
  );
  ```

  `Promise.resolve(..)` will accept any thenable, and will unwrap it to its non-thenable value. But you get back from `Promise.resolve(..)` a real, genuine Promise in its place, **one that you can trust**. If what you passed in is already a genuine Promise, you just get it right back, so there's no downside at all to filtering through `Promise.resolve(..)` to gain trust.

  So let's say we're calling a `foo(..)` utility and we're not sure we can trust its return value to be a well-behaving Promise, but we know it's at least a thenable. `Promise.resolve(..)` will give us a trustable Promise wrapper to chain off of:

  ```js
  // don't just do this:
  foo( 42 )
  .then( function(v){
  	console.log( v );
  } );
  
  // instead, do this:
  Promise.resolve( foo( 42 ) )
  .then( function(v){
  	console.log( v );
  } );
  ```

  **Note:** Another beneficial side effect of wrapping `Promise.resolve(..)` around any function's return value (thenable or not) is that it's an easy way to normalize that function call into a well-behaving async task. If `foo(42)` returns an immediate value sometimes, or a Promise other times, `Promise.resolve( foo(42) )` makes sure it's always a Promise result. And avoiding Zalgo makes for much better code.

- trust built

  Hopefully the previous discussion now fully "resolves" (pun intended) in your mind why the Promise is trustable, and more importantly, why that trust is so critical in building robust, maintainable software.

  Can you write async code in JS without trust? Of course you can. We JS developers have been coding async with nothing but callbacks for nearly two decades.

  But once you start questioning just how much you can trust the mechanisms you build upon to actually be predictable and reliable, you start to realize callbacks have a pretty shaky trust foundation.

  Promises are a pattern that augments callbacks with trustable semantics, so that the behavior is more reason-able and more reliable. By uninverting the *inversion of control* of callbacks, we place the control with a trustable system (Promises) that was designed specifically to bring sanity to our async.

## chain flow

