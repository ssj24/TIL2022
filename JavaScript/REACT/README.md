# 리액트를 다루는 기술

[toc]



## 리액트

### 왜 리액트인가?

규모가 큰 애플리케이션을 순수 JS로만 관리하려면 힘드니까

Angular, Backbone.js, Derby.js, Ember.js, Ext.js, Knockback.js, Sammy.js, PureMVC, Vue.js 등의 프레임워크가 등장



프레임워크는 주로 MVC(Model-View-Controller) 아키텍쳐, MVVM(Model-View-View Model) 아키텍쳐 등을 사용한다

앵귤러는 MVW(Model-View-Whatever) 아키텍쳐

이런 아키텍쳐들의 공통점은 모델과 뷰가 있다는 것이다

**모델**은 애플리케이션에서 사용하는 데이터를 관리하는 영역이고

**뷰**는 사용자에게 보이는 부분이다



사용자의 인풋 => 컨트롤러는 모델 데이터 조회/수정 => 변경사항 뷰에 반영

뷰에 반영하는 과정에서 보통 뷰가 변형된다

페이스북 개발팀이 최대한 성능을 아끼고 편안한 사용자 경험을 제공하면서 구현하고자 개발한 것이 바로 리액트다

> 어떤 데이터가 변할 때마다 기존 뷰를 날려 버리고 새로 렌더링
>
> 이 때 CPU 점유율이 너무 높은 것이나 메모리의 사용, 끊김 현상들을 해결하는 것이 과제



리액트는 다른 프레임워크와 달리 오직 V에만 신경 쓰는 라이브러리다

리액트에서 특정 부분이 어떻게 생길지 정하는 선언체를 **컴포넌트**라고 한다

다른 프레임워크의 템플릿과는 다르다

템플릿은 보통 데이터셋이 주어지면 HTML 태그 형식을 문자열로 반환하는데

이와 달리 컴포넌트는 재사용이 가능한 API로 수많은 기능들을 내장하고 있으며,

컴포넌트 하나에서 해당 컴포넌트의 생김새와 작동 방식을 정의한다



렌더링: 사용자 화면에 뷰를 보여 주는 것

리액트 라이브러리의 효율성은 최초 렌더링과 데이터 변경으로 인한 리렌더링에 있다



#### 초기 렌더링

render()

컴포넌트가 어떻게 생겼는지 정의한다

html 형식의 문자열을 반환하지 않고

뷰가 어떻게 생겼고 어떻게 작동하는지에 대한 정보를 지닌 객체를 반환한다



컴포넌트 내부에는 또 다른 컴포넌트들이 들어갈 수 있는데,

이 때 render()를 실행하면 그 내부에 있는 컴포넌트들도 재귀적으로 렌더링한다

최상위 컴포넌트의 렌더링 작업이 끝나면

1. HTML 마크업을 만들고 
2. 실제 페이지의 DOM 안에 넣는다



#### 조화

조화 과정(reconciliation)을 거친다: 리액트에서 뷰를 업데이트하는 것

뷰가 변형된다기 보다는 새로운 요소로 갈아끼우는 과정이기 때문

이 작업도 render 함수가 수행한다

컴포넌트가 새로운 데이터를 가지고 render 함수를 호출하면

render가 해당 데이터를 가지고 뷰를 생성한다

그러면 바로 DOM에 반영하지 않고

이전에 render가 만든 컴포넌트 정보와 비교한다

그 차이를 최소한의 연산으로 알아내어 DOM 트리에 업데이트한다



### 리액트의 특징

#### Virtual DOM

리액트의 특징 중 하나가 가상 돔을 사용하는 것

가상 돔을 활용해 업데이트 처리를 간결하게 할 수 있다



DOM이란?

Document Object Model

객체로 문서 구조를 표현하는 방법으로 XML이나 HTML로 작성한다

돔은 트리 형태라서 특정 노드 검색/수정/제거/삽입 가능

수많은 곳에서 사용되지만 동적 UI에 최적화되어 있지 않다

그래서 동적인 변화를 반영하는 데 시간이 걸린다

빠르게 처리하려면 돔을 최소한으로 조작하여 처리하는 방식을 쓸 수 있다

리액트는 가상 돔 방식을 사용하여 돔 업데이트를 추상화함으로써 돔 처리 횟수를 최소화/효율화한다



virtual DOM

가상 돔을 사용하면 실제 돔이 아니라 이를 추상화한 JS 객체를 구성하여 사용한다

실제 돔의 가벼운 사본 느낌

리액트의 실제 돔 업데이트 절차

1. 데이터를 업데이트하면 전체 UI를 가상 돔에 리렌더링
2. 이전 가상 돔에 있던 내용과 현재 내용 비교
3. 바뀐 부분만 실제 돔에 적용



가상 돔이 무조건 빠른 것은 아니다

리액트는 지속적으로 데이터가 변화하는 대규모 애플리케이션 구축을 위해 만들어졌기 때문에

해당 용도로 쓸 때 제일 효과가 좋다

리액트를 사용하지 않아도 코드 최적화를 통해 돔 속도를 개선할 수 있고

작업이 매우 간단할 때는 리액트를 사용하지 않는 것이 더 낫다



### 기타 특징

리액트는 프레임워크가 아니라 라이브러리라서 뷰만 담당한다

기타 기능은 직접 구현해야 한다

- 라우팅: react-router
- ajax: axios, fetch
- 상태 관리: redux, MobX

이렇게 취향대로 라이브러리를 골라서 스택을 설정할 수 있다



리액트는 다른 웹 프레임워크나 라이브러리와 혼용할 수 있다

Backbone.js, AngularJS등..



### 환경 설정

1. node.js 설치

   - 맥은 nvm 설치

     `curl -0- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash`

     `nvm --version`

   - 터미널 재시작해도 버전이 나타나지 않는다면?

     `vim ~/.bash_pofile`

     `export NVM_DIR="$HOME/.nvm"`

     `[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm`

   - nvm 설치 후!

     `nvm install --lts`

2. yarn

   npm과 마찬가지로 패키지 관리자 도구

   yarn이 좀 더 빠르고, 효율적인 캐시 시스템, 기타 부가 기능

   - `npm install --global yarn`

     `yarn --version`

   - `brew install yarn`

3. vscode

   - 확장 프로그램
     - ESLint: JS 문법 및 코드 스타일 검사
     - Reactjs Code Snippets: 제작자 charalampos karypidis
     - Prettier-Code formatter

4. git

5. create-react-app

   - `yarn create react-app hello-react`

     `npm init react-app <name>`

   - cd hello-react

   - yarn start

   

## JSX

1. enclosing tag

   반드시 하나의 부모 요소로 감싸야 한다

   ```react
   function App() {
     return(
     	<div> work </div>
     )
   }
   export default App;
   ```

   이렇게 되야지

   ```react
   function App() {
     return(
     	<div> it will </div>
       <div> throw an error </div>
     )
   }
   export default App;
   ```

   이렇게 여러 요소가 최상단에 있으면 안 된다

   

   가상 돔에서 컴포넌트 변화를 감지할 때 효율적으로 비교하려면 

   컴포넌트 내부가 하나의 돔트리 구조로 이루어져야 하기 때문에 그렇다

   div가 아니라 리액트v16부터 도입된 `Fragment`를 써도 된다

   ```react
   import { Fragment } from 'react';
   
   function App() {
     return (
     	<Fragment>
       	<h1> hi </h1>
         <h2> it's react </h2>
       </Fragment>
     )
   }
   
   export default App;
   ```

   `<Fragment></Fragment>` 대신에 `<> </>`를 써도 fragment가 사용된다

   

2. JS 표현

   JSX 안에서는 JS 표현식을 쓸 수 있다

   JSX 내부에서 `{}`로 감싸면 JS 표현식이다

   ```react
   function App() {
     const name = 'react';
     return (
     	<>
       	<h1> {name} is </h1>
       	<h2> working now! </h2>
       </>
   	)
   }
   ```



 - if 문

   JSX 내부의 JS 표현식에서 if문을 사용할 수는 없기 때문에

   JSX 밖에서 if문을 사용하여 값을 설정해놓거나

   {} 내에서 **조건부 연산자(삼항 연산자)**를 사용하면 된다

   ```react
   function App() {
     const name = 'react';
     return (
     	<div>
         {name === '리액트' ? (
         	<h2> 리액트입니다 </h2>
         ) : (
         	<h2> 리액트가 아닙니다 </h2>
         )}
       </div>
   	)
   }
   ```

   

 - AND연산자(&&)를 사용한 조건부 렌더링

   ```react
   function APP() {
     const name = 'REACT';
     return <div>{name === '리액트' ? <h1>리액트입니다</h1> : null}</div>;
   }
   ```

   특정 조건을 만족하지 않을 때 아예 아무것도 렌더링하지 않아야 하는 상황...

   아래처럼 &&연산자를 사용하여 더 짧게 만들 수 있음

   ```react
   function APP() {
     const name = 'REACT';
     return <div>{name === '리액트' && <h1>리액트입니다</h1>}</div>;
   }
   ```

   이와 같은 코드에서는 리액트가 아니므로 브라우저에 아무것도 나타나지 않는다

   false를 렌더링할 때는 null과 마찬가지로 아무것도 나타나지 않아

   && 연산자를 쓸 수 있는 것인데

   falsy한 값인 0은 예외적으로 화면에 나타난다

   ```react
   function APP() {
     const num = 0;
     return num && <h1>리액트입니다</h1>;
   }
   ```

   위 코드는 화면에 숫자 0을 보여준다



- 💡JSX와 괄호

  ​	JSX를 괄호로 감싸는 것은 필수가 아니다

  ​	보통 여러 줄이면 감싸고

  ​	한 줄이면 감싸지 않지만 필수사항은 아니다

  

- undefined는 렌더링하지 않는다

  리액트 컴포넌트에서는 함수에서 undefined만 반환하여 렌더링하지 않는다

  오류가 난다

  따라서 어떤 값이 undefined일 수도 있다면 OR연산자(||)를 활용하여 오류를 방지한다

  ```react
  const name = undefined;
  return name || '값이 undefined입니다.';
  ```

  JSX 내부에서 undefined를 렌더링하는 것은 괜찮다

  ```react
  const name = undefined;
  return <div>{name}</div>
  ```

  

- 인라인 스타일링

  리액트에서 돔 요소에 스타일을 적용할 때는 문자열 형태가 아니라 객체 형태로!

  background-color같은 이름은 카멜 표기법으로 `backgroundColor`로 작성

  ```react
  const name = 'react';
  const style = {
    backgroundColor: 'black',
    color: 'aqua',
    fontSize: '48px',
    padding: 16 // 단위 생략시 px
  }
  return <div style={style}>{name}</div>;
  ```

  바로 스타일을 지정하고 싶다면?

  ```react
  const name = 'react';
  return 
  	<div style={{
      backgroundColor: 'black',
      color: 'aqua',
      fontSize: '48px',
      padding: 16 // 단위 생략시 px
    }}
    >
    	{name}
  	</div>;
  ```

  

- className

  `class="myClass"`가 아니라 `className`

  App.css 파일에 react 클래스 정의한 후

  ```react
  import './App.css';
  
  function App () {
    const name = 'react';
    return <div className="react">{name}</div>;
  }
  ```

  className이 아니라 class로 설정해도 스타일이 적용되기는 하지만

  콘솔탭에 경고가 뜬다



- 꼭 닫아야 하는 태그

  html에서 br이나 input 등은 열기만 하고 닫지 않는데

  JSX에서는 꼭 닫아야 한다 태그 사이에 별도의 내용이 들어가지 않는 경우에는 

  `self-closing 태그`로 작성한다 `<input />`처럼!



- 주석

  `{/*   */}` 이렇게 작성한다

  시작 태그를 여러 줄로 작성할 때는 그 내부에서 `//`로 주석 작성 가능

  그 외에 곳에서 `//`를 쓰거나 `/* */`를 쓰면 그대로 페이지에 노출된다

  ```react
  function App() {
    return (
    	<>
      	{/* 이게 바로 주석 */}
      	<div
          className = "react" // 시작 태그를 여러 줄로 작성하면 여기에 주석 작성 가능
        >
      		리액트입니다
      	</div>
      	// 이런 주석이나
      	/* 이런 주석은 페이지에 보인다 */
      	<input />
      </>
    )
  }
  ```



### ESLint와 Prettier

vs code의 확장 프로그램

#### ESLint

문법 검사 도구

코드 작성 시 실수하면 에러/경고 메시지를 vs code 에디터에서 바로 확인할 수 있다

#### Prettier

코드 스타일 자동 정리 도구

`shift + command + p`를 한 다음 format이라고 치면 format document가 나온다

beautify 등 다른 포맷 도구가 있다면 충돌이 발생할 수 있는데

`format document with.. `메뉴로 가서 prettier를 선택하면

파일의 코드를 정리해준다

들여쓰기를 정돈하고

세미콜론이 빠졌다면 추가하고

작은따옴표는 큰따옴표로 바꿔준다



prettier는 스타일을 커스터마이징할 수 있다

프로젝트의 루트 디렉터리(src가 위치한 곳)에서 `.prettierrc` 파일을 생성한 뒤

```json
{
  "singleQuote": true,
  "semi": true,
  "useTabs": false,
  "tabWidth": 2
}
```



아예 저장할 때마다 실행하고 싶다면?

code > preference > settings > format on save



## 컴포넌트

컴포넌트는 단순한 템플릿 이상의 역할을 한다

주어진 데이터에 맞는 UI를 만드는 것은 물론이고

라이프사이클 API를 이용한 작업을 할 수 있고

임의 메서드를 만들어 특별한 기능을 더할 수도 있다



### 클래스형 컴포넌트

컴포넌트는 함수 컴포넌트와 클래스형 컴포넌트로 나뉜다

앞장의 App 컴포넌트가 함수 컴포넌트다

App 컴포넌트를  클래스형 컴포넌트로 바꾼다면

```react
import React, { Component } from 'react';

class App extends Component {
  render() {
    const name = 'react';
    return <div className="react">{name}</div>;
  }
}
export default App;
```

클래스형 컴포넌트는 state 및 라이프사이클을 사용할 수 있고

임의 메서드를 정의할 수 있다는 것이 다르다



- 💡 ES6의 클래스 문법

  ES6 이전에는 JS에 클래스가 없어서 prototype을 사용해야 했다

  ```js
  function Dog(name) {
    this.name = name;
  }
  
  Dog.prototype.say = function() {
    console.log(this.name + ': 멍멍');
  }
  
  var dog = new Dog('백구');
  dog.say(); // 백수: 멍멍
  ```

  ES6부터는 class 사용 가능

  ```js
  class Dog {
    constructor(name) {
      this.name = name;
    }
    say() {
      console.log(this.name + ": 멍멍");
    }
  }
  
  const dog = new Dog('황구');
  dog.say(); // 황구: 멍멍
  ```

  

클래스형 컴포넌트에서는 render  함수가 꼭 있어야 하고, 

그 안에서 보여주어야 할 JSX를 반환해야 한다



함수 컴포넌트는

- 선언이 편하고

- 메모리를 덜 사용하고

- 빌드 후 배포할 때 결과물의 파일 크기가 더 작다(유의미한 차이는 아니지만)

  그러나,

-  state 사용 불가

- 라이프사이클 API 사용 불가

  v16.8 이후

- Hooks 기능을 도입해서 비슷한 작업 가능

  => 리액트 공식 메뉴얼은 컴포넌트를 새로 작성할 때 함수 컴포넌트와 Hooks를 사용하라고 권장한다

### 첫 컴포넌트

1. src에 `MyComponent.js` 생성

   ```react
   const MyComponent = () => {
       return <div>새로운 컴포넌트</div>;
   };
   
   export default MyComponent;
   ```

   - 💡화살표 함수(ES6)

     기존의 function 함수 선언을 완전히 대체할 수는 없음

     ```react
     function BlackDog() {
       this.name = 'white';
       return {
         name: 'black',
         bark: function() {
           console.log(this.name + ": woof woof");
         }
       }
     }
     
     const blackDog = new BlackDog();
     blackDog.bark(); // black: woof woof
     
     function WhiteDog() {
       this.name = 'white';
       return {
         name: 'black',
         bark: () => {
           console.log(this.name + ": woof woof");
         }
       }
     }
     
     const whiteDog = new WhiteDog();
     whiteDog.bark(); // white: woof woof
     ```

     function()은 black을 () =>는 white가 출력된다

     두 표현식이 다른 this를 가지는 것이다

     일반 함수는 자신이 종속된 객체를 t his르 가리키지만

     화살표 함수는 자신이 종속된 인스턴스를 가리킨다

     화살표 함수는 값을 연산하여 바로 반환해야 할 때 사용하면 가독성이 좋다

     `const triple = (value) => value * 3;`

   

   함수 컴포넌트를 선언할 때 function 키워드를 사용하는 것과 화살표 함수 문법을 사용하는 것에는 큰 차이가 없다

   이 책에서는 간결한 표현을 위해 화살표 함수를 쓰겟다

   - Reactjs Code Snippet 확장 프로그램 설치했다면 `rsc`를 치면 기본 템플릿이..!

     `rcc`는 클래스형 컴포넌트

2. 모듈 내보내기 및 불러오기

   MyComponent에서는

   `export default MyComponent;`

   App에서는

   ```react
   import MyComponent from './MyComponent';
   
   function App() {
     return (
       <>
         <div>
           APP입니다
         </div>
         <MyComponent />
       </>
     );
   }
   
   export default App;
   ```

   이렇게 하면 App입니다 div 밑에 MyComponent의 내용이 표시된다\

   

### props

컴포넌트 속성 설정

해당 컴포넌트를 불러와 사용하는 **부모 컴포넌트**에서 설정한다

- JSX 내부에서 props 렌더링

  ```react
  const MyComponent = props => {
    return <div>제 이름은 {props.name}입니다. </div>;
  }
  
  export default MyComponent;
  ```

- 컴포넌트 사용시 props 값 지정

  ```react
// App.js
  
import MyComponent from './MyComponent';
  const App = () => {
    return <MyComponent name="React" />;
  };
  ```
  
  - defaultProps 지정하기
  
    부모 컴포넌트에서 props 안 줘도 기본값 띄울 수 있다
  
    ```react
    const MyComponent = props => {
      return <div>제 이름은 {props.name}입니다. </div>;
    }
    
    MyComponent.defaultProps = {
      name: 'test123'
    };
    
    export default MyComponent;
    ```
  
- children

  태그 사이의 내용을 보여준다

  ```react
  // App.js
  
  import MyComponent from './MyComponent';
  const App = () => {
    return <MyComponent>리액트</MyComponent>;
  };
  ```

  ```react
  // MyComponent.js
  return (
  	{props.name}입니다 <br />
    children은 {props.children}입니다
  )
  ```

- props 내부 값 추출하기

  비구조화 할당 문법을 사용하여 props.name이 아니라  name을 쓸 수 있게

  ```react
  const MyComponent = props => {
    const {name, children} = props;
    return (
    	<div>
      	{name}입니다 <br />
    		children은 {children}입니다
      </div>
    )
  }
  ```

  이처럼 객체에서 값을 추출하는 문법을 비구조화 할당(destructuring assignment)이라 한다. 구조 분해 문법이라고도 불리며 함수의 파라미터 부분에서도 사용 가능하다

  ```react
  const MyComponent = ({ name, children }) => {
    return (
    	<div>
      	{name}입니다 <br />
    		children은 {children}입니다
      </div>
    )
  }
  ```

- propTypes

  컴포넌트의 필수 props를 지정하거나 props의 타입을 지정할 때 사용한다

  우선 import를 해 줘야 한다

  ```react
  import PropTypes from 'prop-types';
  
  const MyComponent = ({name, children}) => {
      return <div>
          저는 {name}입니다 <br />
          {children && `children은 ${children}입니다`}
      </div>;
  };
  
  MyComponent.propTypes = {
      name: PropTypes.string
  };
  ```

  스트링이 아닌 name을 받으면 콘솔창에 경고가 뜬다

  - isRequired

    ```react
    MyComponent.propTypes = {
        name: PropTypes.string,
        favNum: PropTypes.number.isRequired
    };
    ```

    이렇게 뒤에 `.isRequired`를 붙인다

    favNum이 없으면 콘솔창에 경고가 뜬다

  - array

  - arrayOf(다른 PropType): 다른 PropType으로 이루어진 배열

  - bool

  - func

  - number

  - object

  - string

  - symbol

  - node: 렌더링할 수 있는 모든 것(children도 node PropType)

  - instanceOf(클래스)

  - oneOf(['a', 'b']): 주어진 배열 요소 값 중 하나

  - oneOfType(['React.PropTypes.string, PropTypes.number'])

  - objectOf(React.PropTypes.number): 객체의 모든 키 값이 인자로 주어진 PropTyPe인 객체

  - shape({ name: PropTypes.string, num: PropTypes.number }): 주어진 스키마를 가진 객체

  - any: 아무 종류

- 클래스형 컴포넌트에서 props 사용하기

  render 함수에서  this.props 조회

  defaultProps와 propTypes는 같은 방식으로 설정

  ```react
  import React, { Component } from 'react';
  import PropTypes from 'prop-types';
  
  class MyComponent extends Component {
    render() {
      const {name, favNum, children} = this.props;
      return {
        <div>
        	이름: {name} <br />
          children: {children} <br />
          좋아하는 숫자: {favNum}
        </div>
      };
    }
  }
  ```

  그런데 클래스형 컴포넌트의 defaultProps와 propTypes를 class 내부에서 지정할 수도 있다

  ```js
  class MyComponent extends Component {
    static defaultProps = {
      name: 'test123'
    };
  	static propTypes = {
      name: PropTypes.string,
      favNum: PropTypes.number.isRequired
    };
    render() {
      const {name, favNum, children} = this.props;
      return {
        <div>
        	이름: {name} <br />
          children: {children} <br />
          좋아하는 숫자: {favNum}
        </div>
      };
    }
  }
  ```

  

### state

컴포넌트 내부에서 바뀔 수 있는 값

props는 부모가 설정하는 값이라 컴포넌트 자신은 읽기 전용으로만 사용 가능하다

state는 클래스형 컴포넌트의 것과 함수 컴포넌트의 것, 두 종류가 있다

- 클래스형 컴포넌트

  Counter.js

  ```react
  import React, { Component } from 'react';
  
  class Counter extends Component {
  	constructor(props) {
  		super(props);
  		this.state = { // 초깃값 설정.
  			number: 0
  		};
  	}
  	render() {
  		const { number } = this.state;
  		return (
  			<div>
  				<h1>{number}</h1>
  				<button
  					onClick={() => {
  						this.setState({number: number + 1});
  					}}
  				>
  					+1
  				</button>
  			</div>
  		);
  	}
  }
  
  export default Counter;
  ```

  - 컴포넌트에 state를 설정할 때는 constructor 메서드를 설정해야 한다

    컴포넌트의 생성자 메서드로

    클래스형 컴포넌트에서 constructor를 작성할 때는

    반드시 super(props)를 호출해야 한다

    이 함수가 호출되면 현재 클래스형 컴포넌트가 상속받고 있는 리액트의 Component 클래스가 지닌 생성자 함수를 호출한다

  - this.state에 초깃값 설정

    컴포넌트의 state는 객체 형식

  - onClick시 `this.setState` 함수를 사용하여 state 값을 바꿈

  - state 객체 안에 여러 값이 있을 수도 있다

    ```js
    this.state = {
    	number: 0,
    	fixedNumber: 0
    };
    ```

  - constructor 없이 state 초깃값 설정하기

    ```react
    class Counter extends Component {
    	this.state = {
    		number: 0,
        fixedNumber: 0
    	};
    	// render는 똑같음
    	render() {.. 
    ```

  - this.setState

    this.setState는 상태가 비동기적으로 업데이트 된다

    만약 onClick 함수 내부에서 this.setState를 두 번 호출한다면?

    ```js
    onClick={() => {
      this.setState({number: number + 1});
      this.setState({number: this.state.number + 1});
    }}
    ```

    그래도 숫자는 1씩 올라간다

    this.setState를 사용한다고 state 값이 바로 바뀌는 것이 아니기 때문이다

    이를 해결하려면 this.setState에 객체 대신 함수를 인자로 넣어주면 된다

    ```js
    this.setState((prevState, props) => {
      return {
        // 업데이트
      }
    })
    ```

    ```react
    this.setState(prevState => {
      return {
        number: prevState.number + 1
      }
    })
    
    // 똑같이 동작하지만 아래는 함수가 바로 객체 반환
    this.setState(prevState => ({
      number: prevState.number + 1
    }))
    ```

    화살표 함수에서 값을 바로 반환하고 싶다면 코드 블록 {}를 생략하면 된다

    `const sum = (a, b) => a + b;`

    두 번째 setState는 바로 반환하려고 {}를 ()로 감쌌다

    그래서 이렇게 두 함수를 모두 onClick에 넣어주면 값이 2씩 오른다

  - setState가 끝난 후 특정 작업 실행하기

    setState의 두 번째 파라미터로 콜백 함수 등록

    ```js
    this.setState(
      {number: number + 1},
      () => {
        console.log("setState 호출");
        console.log(this.state);
      }
    );
    ```

- 함수 컴포넌트

  리액트 16.8 이후 useState 함수를 사용하여 함수 컴포넌트에서  state 사용 가능

  Hooks를 사용해야 한다

  - 배열 비구조화 할당

    객체 비구조화 할당과 비슷하다

    배열 안에 있는 값을 쉽게 추출할 수 있게 해 주는 문법이다

    ```js
    const array = [1, 2];
    const [one, two] = array;
    ```

  - useState

    Say.js 파일 생성

    ```react
    import React, {useState} from 'react';
    
    const Say = () => {
      const [message, setMessage] = useState('');
      const onClickEnter = () => setMessage('안녕하세요');
      const onClickLeave = () => setMessage('안녕히 가세요');
      return (
        <div>
          <button onClick={onClickEnter}>입장</button>
          <button onClick={onClickLeave}>퇴장</button>
          <h1>{message}</h1>
        </div>
      );
    };
    
    export default Say;
    ```

    useState 함수의 인자에는 상태의 초깃값.

    클래스형 컴포넌트에서의  state 초깃값은 객체여야 했지만

    useState에서는 반드시 객체가 아니어도 된다

    

    함수 호출시 배열이 반환된다

    배열의 첫 번째 원소는 현재 상태, 두 번째 원소는 상태를 바꾸는 세터 함수

    이름은 알아서 자유롭게..

    

    useState는 한 컴포넌트에서 여러 번 사용해도 괜찮다

    ```react
    const Say = () => {
      const [message, setMessage] = useState('');
      const onClickEnter = () => setMessage('안녕하세요');
      const onClickLeave = () => setMessage('안녕히 가세요');
      const [color, setColor] = useState('black');
      return (
        <div>
          <button onClick={onClickEnter}>입장</button>
          <button onClick={onClickLeave}>퇴장</button>
          <h1 style={{color}}>{message}</h1>
          <button style={{color: 'red'}} onClick={() => setColor('red')}>
            RED
          </button>
          <button style={{color: 'green'}} onClick={() => setColor('green')}>
            GREEN
          </button>
        </div>
      );
    };
    ```

    

- state 주의사항

  - state 값을 바꿀 때는 setState / useState를 통해 전달받은 세터 함수를 사용해야 한다.

    ```js
    // 클래스
    this.state.number = this.state.number + 1;
    this.state.array = this.array.push(2);
    this.state.object.vslue = 5;
    
    // 함수
    const [object, setObject] = useState({a: 1, b: 1});
    object.b = 2;
    ```

    위 코드는 다 잘못됐다

    배열/객체 업데이트를 해야할 때는 사본을 만들어 값을 업데이트한 후

    그 사본의 상태를 setState / 세터 함수를 통해 업데이트한다

    ```js
    // 객체
    const object = {a: 1, b: 2, c: 3};
    const nextObject = { ... object, b: 2};
    
    // 배열
    const array = [
      { id; 1, value: true},
      { id; 2, value: true},
      { id; 3, value: false}
    ];
    let nextArray = array.concat({ id: 4 }); // 추가
    nextArray.filter(item => item.id !== 2); // 제거
    nextArray.map(item => item.id === 1 ? { ...item, value: false }: item)); // 변형
    
    ```

    



## 이벤트 핸들링

이벤트: 사용자가 웹 브라우저에서 DOM 요소들과 상호 작용하는 것

- 주의 사항

  1. 이벤트 이름은 카멜 표기법

     onclick이 아니라 onClick

  2. 함수 형태의 값 전달

     HTML은 자바스크립트 코드를 넣었지만 리액트는 함수 형태의 객체를 전달해야 한다

     함수를 바로 만들어서 전달하거나

     렌더링 부분 외부에 미리 만들어서 전달

  3. DOM요소에만 이벤트를 설정할 수 있다

     직접 만든 컴포넌트에는 이벤트 설정 불가

     `<MyComponent onClick={doSomething}>`

     이건 그냥 onClick이라는 props를 컴포넌트에 전달하는 것일 뿐이다

     하지만 전달받은 props를 컴포넌트 내부의 돔 이벤트로 설정할 수는 있다

     `<div onClick={this.props.onClick}>`

- 리액트가 지원하는 이벤트 종류

  - clipboard
  - composition
  - keyboard
  - focus
  - form
  - mouse
  - selection
  - touch
  - UI
  - wheel
  - media
  - image
  - animation
  - transition

- https://reactjs.org/docs/events.html 참고

- 실습

  - EventPractice.js

    ```react
    render() {
      return (
        <div>
          <h1>practice event</h1>
          <input
            type="text"
            name="message"
            placeholder="여기에 입력해주세요"
            onChange={
              (e) => {
                console.log(e.target.value);
              }
            }
          />
          </div>
        );
      }
    ```

    e는 SyntheticEvent로 웹 브라우저의 네이티브 이벤트를 감싸는 객체다

    네이티브 이벤트와 인터페이스가 같으므로 순수 JS에서 HTML 이벤트를 다룰 때와 똑같이 사용하면 된다

    SyntheticEvent는 네이티브 이벤트와 달리 이벤트가 끝나고 나면 초기화되므로 정보를 참조할 수 없다

    비동기적으로 이벤트 객체를 참조해야 한다면 `e.persist()`를 호출해야 한다

    

    - state에 인풋 값 담기

      ```react
      state = {
          message: ''
        }
        render() {
          return (
            <div>
              <h1>practice event</h1>
              <input
                type="text"
                name="message"
                placeholder="여기에 입력해주세요"
                value={this.state.message}
                onChange={
                  (e) => {
                    this.setState({
                      message: e.target.value
                    })
                  }
                }
              />
            </div>
          );
        }
      ```

    

    - 버튼 누르면 comment 값을 공백으로

      ```react
      <button onClick={
          () => {
            this.setState({
              message: ''
            })
          }
      }>
      ```

    

    - 임의 메서드를 만드는 방법으로 바꿔보기

      함수 형태의 값을 전달할 때, 함수를 미리 준비해서 전달하는 방법

      성능상으로 차이는 거의 없지만 가독성이 좋다

      ```react
      class EventPractice extends Component {
        state = {
          message: ''
        }
      
        constructor(props) {
          super(props);
          this.handleChange = this.handleChange.bind(this);
          this.handleClick = this.handleClick.bind(this);
        }
      
        handleChange(e) {
          this.setState({
            message: e.target.value
          });
        }
      
        handleClick() {
          this.setState({
            message: ''
          })
        }
      
        render() {
          return (
            <div>
              <h1>practice event</h1>
              <input
                type="text"
                name="message"
                placeholder="여기에 입력해주세요"
                value={this.state.message}
                onChange={this.handleChange}
              />
              <button onClick={this.handleClick}>
                확인
              </button>
            </div>
          );
        }
      }
      ```

      this는 함수 호출부에 따라 결정되므로 this가 컴포넌트 자신을 가리키게 하기 위해 메서드를 this와 바인딩한다(바인딩하지 않으면 this가 undefined)

      메서드 바인딩을 바벨의 transform-class-properties 문법을 사용하여 화살표 함수 형태로 정의하면 더 간단하게 할 수도 있다

      ```react
      class EventPractice extends Component {
        state = {
          message: ''
        }
      
        handleChange = (e) => {
          this.setState({
            message: e.target.value
          });
        }
      
        handleClick = () => {
          this.setState({
            message: ''
          })
        }
      
        render() {
          return (
            <div>
              <h1>practice event</h1>
              <input
                type="text"
                name="message"
                placeholder="여기에 입력해주세요"
                value={this.state.message}
                onChange={this.handleChange}
              />
              <button onClick={this.handleClick}>
                확인
              </button>
            </div>
          );
        }
      }
      ```

      

    - input이 여러 개라면?

      event 객체 활용하기

      `e.target.name`

      name을 쓰면 된다!

      ```react
      class EventPractice extends Component {
        state = {
          username: '',
          message: ''
        }
      
        handleChange = (e) => {
          this.setState({
            [e.target.name]: e.target.value
          });
        }
      
        handleClick = () => {
          this.setState({
            username: '',
            message: ''
          })
        }
      
        render() {
          return (
            <div>
              <h1>practice event</h1>
              <input
                type="text"
                name="username"
                placeholder="사용자명"
                value={this.state.username}
                onChange={this.handleChange}
              />
              <input
                type="text"
                name="message"
                placeholder="여기에 입력해주세요"
                value={this.state.message}
                onChange={this.handleChange}
              />
              <button onClick={this.handleClick}>
                확인
              </button>
            </div>
          );
        }
      }
      ```

      `this.setState({ [e.target.name]: e.target.value });`

      이렇게 객체 안에서 key를 []로 감싸면 그 안에 넣은 **레퍼런스가 가리키는 실제 값**이  key 값으로 사용된다

    - onKeyPress

      ```react
      handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          this.handleClick();
        }
      }
      render() {
        <input
          type="text"
          name="message"
          placeholder="여기에 입력해주세요"
          value={this.state.message}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
      }
      ```

      인풋에서 엔터키를 치면 버튼을 누른 것과 같은 효과!

    

  - 함수 컴포넌트로 구현해보기

    ```react
    import React, {useState} from 'react';
    
    const EventPractice = () => {
      const [username, setUsername] = useState('');
      const [message, setMessage] = useState('');
      const onChangeUsername = e => setUsername(e.target.value);
      const onChangeMessage = e => setMessage(e.target.value);
      const onClick = () => {
        setUsername('');
        setMessage('');
      };
      const onKeyPress = e => {
        if (e.key === 'Enter') {
          onClick();
        }
      };
      return (
        <div>
          <h1>practice event</h1>
          <input
            type="text"
            name="username"
            placeholder="사용자명"
            value={username}
            onChange={onChangeUsername}
          />
          <input
            type="text"
            name="message"
            placeholder="여기에 입력해주세요"
            value={message}
            onChange={onChangeMessage}
            onKeyPress={onKeyPress}
          />
          <button onClick={onClick}>
            확인
          </button>
        </div>
      );
    };
    
    export default EventPractice;
    ```

    인풋이 두 개밖에 없다면 위처럼 onChange 함수를 두 개 만들어도 되겠찌만

    여러개라면..? 여기서도 e.target.name 활용하기

    ```react
    import React, {useState} from 'react';
    
    const EventPractice = () => {
      const [form, setForm] = useState({
        username: '',
        message: ''
      });
      const {username, message} = form;
      const onChange = e => {
        const nextForm = {
          ...form, // 기존의 form내용 복사
          [e.target.name]: e.target.value // 원하는 값 덮어 씌우기
        };
        setForm(nextForm);
      };
    
      const onClick = () => {
        setForm({
          username: '',
          message: ''
        })
      };
      const onKeyPress = e => {
        if (e.key === 'Enter') {
          onClick();
        }
      };
      return (
        <div>
          <h1>practice event</h1>
          <input
            type="text"
            name="username"
            placeholder="사용자명"
            value={username}
            onChange={onChange}
          />
          <input
            type="text"
            name="message"
            placeholder="여기에 입력해주세요"
            value={message}
            onChange={onChange}
            onKeyPress={onKeyPress}
          />
          <button onClick={onClick}>
            확인
          </button>
        </div>
      );
    };
    
    export default EventPractice;
    ```

    

## ref: DOM에 이름달기

HTML에서 돔 요소에 이름을 달 때 id를 사용하는 것처럼

리액트에서 돔에 이름을 다는 방법이 바로 ref(reference)

물론 리액트에서도 id를 사용할 수는 있지만

같은 컴포넌트를 여러 번 사용한다면 중복 id가 생기는 것이니

컴포넌트 내부에서만 작동하는 ref를 쓰는 것이 좋다

다른 라이브러리 / 프레임워크와 함께 id를 사용해야 하는 상황이라면

컴포넌트를 만들 때마다 id 뒷부분에 추가 텍스트를 붙여야 한다

(btn01, btn02...)



### ref를 사용하는 상황

ref는 <u>돔을 꼭 직접적으로 건드려야 할 때</u> 사용한다



App 컴포넌트에서  ref를 사용하려면 클래스형 컴포넌트로 작성..



state를 사용해서 돔을 조정할 수도 있지만

- 특정 input에 포커스 주기
- 스크롤 박스 조작하기
- canvas 요소에 그림 그리기 등

state만으로 해결할 수 없는 기능들이 있다

이럴 때 돔에 직접적으로 접근하는 ref를 사용한다



### ref 사용

1. 콜백 함수

   ref를 달고자 하는 요소에 ref라는 콜백 함수를 props로 전달해 준다

   이 콜백 함수는  ref 값을 파라미터로 전달받아 컴포넌트의 멤버 변수로 설정한다

   `<input ref={(ref) => {this.input=ref}} />`

   위 상황에서 this.input은 인풋 요소의 돔을 가리킨다

   ref의 이름은 마음대로 지정할 수 있다

   돔 타입과 관계없이 `this.super = ref`도 가능

   

   버튼 클릭시 해당 버튼이 아니라 input에 포커스가 가게 만들기

   ```react
   handleButtonClick = () => {
     this.setState({
       clicked: true,
       validated: this.state.password === '0000'
     });
     this.input.focus();
   }
   
   <input
     ...
     ref={(ref) => this.input=ref}
   />
   ```

   

2. createRef

   createRef()는 리액트 내장 함수로 v16.3부터 도입되었다

   ```react
   class CreateRef extends Component {
     input = React.createRef();
   
     handleFocus = () => {
       this.input.current.focus();
     }
   
     render() {
       return (
         <div>
           <input ref={this.input} />
         </div>
       );
     }
   }
   ```

   우선 컴포넌트 내부에서 멤버 변수로  React.createRef()를 담는다

   해당 멤버 변수를  ref를 달고자 하는 요소에  ref props로 넣어 주면 설정 완료.

   나중에 ref를 설정한 돔에 접근하려면 `this.input.current`를 조회한다

   뒤에 `.current`를 넣어줘야 한다!

   

### 컴포넌트에 ref 달기

컴포넌트에  ref를 다는 것은 주로 컴포넌트 내부에 있는 돔을 컴포넌트 외부에서 사용할 때 쓴다

방법은 돔에  ref를 다는 방법과 같다

`<MyComponent ref={(ref) => {this.myComponent=ref}} />`

이렇게 하면 MyComponent 내부의 메서드 및 멤버 변수에도 접근할 수 있다

즉, 내부의  ref에도 접근할 수 있게 된다

(`myComponent.handleClick`같은 식으로)



- 스크롤 박스가 있는 컴포넌트의 스크롤바를 아래로 내리는 작업을 부모에서 실행하기

  - 스크롤 박스 컴포넌트 만들기

    ```react
    class ScrollBox extends Component {
      render() {
        const style = {
          border: '1px solid black',
          height: '300px',
          width: '300px',
          overflow: 'auto',
          position: 'relative'
        };
    
        const innerStyle = {
          width: '100%',
          height: '650px',
          background: 'linear-gradient(white, black)'
        }
    
        return (
          <div
            style={style}
            ref={(ref) => {this.box=ref}}
          >
            <div style={innerStyle} />
          </div>
        );
      }
    }
    ```

    

  - 컴포넌트에 ref 달기

    - 💡스크롤바 내릴 때 DOM 노드 값

      scrollTop: 세로 스크롤바 위치(0~350)

      scrollHeight: 스크롤 있는 박스 안의  div 높이(650)

      clientHeight: 스크롤이 있는 박스의 높이(300)

      괄호 안의 값은 우리가 설정한 값

      스크롤바를 맨 아래쪽으로 내리려면  `scrollHeight - clientHeight`

    - ```react
      scrollToBottom = () => {
          const {scrollHeight, clientHeight} = this.box;
          this.box.scrollTop = scrollHeight - clientHeight;
        }
      ```

      이 메서드를 ScrollBox.js에 추가

      

  - ref를 이용해서 컴포넌트 내부 메서드 호출하기

    ```react
    class App extends Component {
      render() {
        return (
          <div className="pad30">
            <ScrollBox ref={(ref) => this.scrollBox=ref} />
            <button onClick={() => this.scrollBox.scrollToBottom()}>
              Bottom
            </button>
          </div>
        );
      }
    }
    ```

    `onClick = {this.scrollBox.scrollToBottom}`도 틀린 문법은 아니다

    하지만 컴포넌트가 처음 렌더링될 때는  this.scrollBox 값이 undefind라서 오류가 발생할 수 있다

    화살표 함수 문법을 사용하면 아예 새로운 함수를 만들고

    그 내부에서 this.scrollBox.scrollToBottom 메서드를 실행하면,

    버튼을 누를 때(이미 렌더링을 해서  this.scrollBox를 설정한 시점)

    this.scrollBox.scrollToBottom 값을 읽어 오므로 오류가 나지 않는다



서로 다른 컴포넌트끼리 데이터를 교류할 때 ref르 사용한다면 잘못된 것이다

리액트 사상에 어긋나는 방법(하려면 할 수는 있겠지만)

컴포넌트끼리 데이터를 교류할 때는 언제나 부모 자식간에 교류해야 한다



## 컴포넌트 반복

ul 내부의 li처럼 반복되는 형태의 코드를 작성해야 할 때가 있다

이렇게 반복적인 내용을 효율적으로 보여주고 관리하는 방법은 무엇일까?



### JS 배열의 map()

JS 배열 객체의 내장 함수인 map()을 사용하여 반복되는 컴포넌트를 렌더링할 수 있다

map함수는 파라미터로 전달된 함수를 사용해서

배열 내 각 요소를 원하는 규칙에 따라 변환한 후 그 결과로 새로운 배열을 생성한다

- `arr.map(callback, [thisArg])`

  - callback:  새로운 배열의 요소를 생성하는 함수
    - currentValue: 현재 처리 요소
    - index
    - array:  현재 처리하고 있는 원본 배열
  - thisArg(선택): 콜백 함수 내부에서 사용할 this reference

- ``` js
  var numbers = [1, 2, 3, 4, 5];
  var processed = numbers.map(function(num) {
    return num * num;
  });
  
  console.log(processed);// [1, 4, 9, 16, 25]
  ```

  이걸 ES6문법으로(const, 화살표 함수)

  ```js
  const numbers = [1, 2, 3, 4, 5];
  const result = numbers.map(num => num * num);
  console.log(result);
  ```



### 데이터 배열 => 컴포넌트 배열

리액트에서 key는 컴포넌트 배열을 렌더링했을 때 어떤 원소에 변동이 있었는지 알아내기 위해 사용한다

key값을 설정할 때는 map 함수의 인자로 전달되는 함수 내부에서 컴포넌트 props를 설정하듯이 설정하면 된다

key값은 언제나 유일해야 하므로 데이터가 가진 고윳값으로 설정해야 한다

고유한  id 등이 없다면 인덱스로 설정해도 된다

그러나 인덱스를 키로 사용하면 배열이 변경될 때 비효율적인 리렌더링이 이루어진다

```react
const IterationSample = () => {
  const names = ['a', 'b', 'c', 'd'];
  const nameList = names.map((name, index) => <li key={index}>{name}</li>);

  return (
    <div>
      <ul>{nameList}</ul>
    </div>
  );
};
```



### 동적인 배열 리렌더링

고정된 배열이 아닌 동적인 배열.

인덱스 값을 키로 사용하면 비효율적이므로 고윳값을 만드는 방법도 배워보자

1. 초기 상태 설정하기

   useState를 사용하여

   데이터 배열 상태, 

   텍스트를 입력할 수 있는  input 상태, 

   새로운 항목 추가할 때 사용할 고유 id를 위한 상태

   이 세 가지를 설정한다

   객체 형태로 이루어진 배열을 만들어 문자열과 고유 id 값을 가지고 있다

2. 데이터 추가 기능 구현하기

   ```react
   import React, { useState } from 'react';
   
   const IterationSample = () => {
     const [names, setNames] = useState([
       { id: 1, text: 'a'},
       { id: 2, text: 'aa'},
       { id: 3, text: 'aaa'},
       { id: 4, text: 'aaaa'},
     ]);
     const [inputText, setInputText] = useState('');
     const [nextId, setNextId] = useState(5); // 새로운 항목을 추가할 때 사용할 id
   
     const onChange = e => setInputText(e.target.value);
   
     const onClick = () => {
       const nextNames = names.concat({
         id: nextId,
         text: inputText
       });
       setNextId(nextId + 1); // nextId 값에 1을 더해준다
       setNames(nextNames); // names 값을 업데이트한다
       setInputText(''); // inputText를 비운다
     }
     const namesList = names.map(name => <li key={name.id}>{name.text}</li>);
   
     return (
       <>
         <input value={inputText} onChange={onChange} />
         <button onClick={onClick}>추가</button>
         <ul>{namesList}</ul>
       </>
     );
   };
   
   export default IterationSample;
   ```

   새 항목 추가할 때 배열의 push함수를 사용하지 않고 concat을 사용했다

   push는 기존 배열 자체를 변경해 주지만

   concat은 새로운 배열을 만들어 준다

   

   리액트에서 상태를 업데이트할 때는 기존 상태를 그대로 두면서 새로운 값을 상태로 설정해야 한다(불변성 유지)

   불변성 유지를 해 줘야 리액트 컴포넌트의 성능 최적화할 수 있다

3. 데이터 제거 기능 구현하기

   불변성을 유지하면서 배열의 특정 항목을 지울 때는 배열의 내장 함수  filter를 사용한다

   ```js
   const numbers = [1, 2, 3, 4, 5, 6];
   const biggerThanThree = numbers.filter(number => number > 3);
   // [4, 5, 6]
   ```

   filter 함수의 인자에 분류하고 싶은 조건을 반환하는 함수를 넣어 준다

   

   항목을 더블클릭하면 해당 항목이 화면에서 사라지는 기능을 구현한다

   ```react
   import React, { useState } from 'react';
   
   const IterationSample = () => {
     const [names, setNames] = useState([
       { id: 1, text: 'a'},
       { id: 2, text: 'aa'},
       { id: 3, text: 'aaa'},
       { id: 4, text: 'aaaa'},
     ]);
     const [inputText, setInputText] = useState('');
     const [nextId, setNextId] = useState(5); // 새로운 항목을 추가할 때 사용할 id
   
     const onChange = e => setInputText(e.target.value);
   
     const onClick = () => {
       const nextNames = names.concat({
         id: nextId,
         text: inputText
       });
       setNextId(nextId + 1); // nextId 값에 1을 더해준다
       setNames(nextNames); // names 값을 업데이트한다
       setInputText(''); // inputText를 비운다
     };
   
     const onRemove = id => {
       const nextNames = names.filter(name => name.id !== id);
       setNames(nextNames);
     }
   
     const namesList = names.map(name => (
       <li key={name.id} onDoubleClick={() => onRemove(name.id)}>
         {name.text}
       </li>
     ));
   
     return (
       <>
         <input value={inputText} onChange={onChange} />
         <button onClick={onClick}>추가</button>
         <ul>{namesList}</ul>
       </>
     );
   };
   
   export default IterationSample;
   ```



상태 안에서 배열을 변형할 때는 배열에 직접 접근하여 수정하는 것이 아니라

concat, filter 등의 배열 내장 함수를 사용해서 새로운 배열을 만든 후 이를 새로운 상태로 설정하자



## 컴포넌트의 라이프사이클 메서드

모든 리액트 컴포넌트에는 수명 주기(라이프사이클)이 존재한다

컴포넌트의 수명은 페이지에 렌더링되기 전인 준비 과정에서 시작하여 페이지에서 사라질 때 끝난다

라이프사이클 메서드는 **클래스형 컴포넌트**에서만 사용할 수 있다

함수 컴포넌트에서는 이것 대신  Hooks 기능을 사용해서 비슷한 작업을 한다



## 라이프사이클 메서드

아홉 종류

- Will 접두사: 어떤 작업을 작동하기 전에 실행되는 메서드
- Did 접두사: 어떤 작업을 작동한 후에 실행되는 메서드



라이프사이클의 카테고리

- 마운트: 페이지에 컴포넌트가 나타난다
- 업데이트: 리렌더링으로 컴포넌트 정보를 업데이트한다
- 언마운트: 페이지에서 컴포넌트가 사라진다



### 마운트

DOM이 생성되고 웹 브라우저상에 나타나는 것

이 때 호출하는 메서드

- 컴포넌트 만들기
- constructor: 컴포넌트를 새로 만들 때마다 호출되는 클래스 생성자 메서드
- getDerivedStateFromProps: props에 있는 값을 state에 넣을 때 사용하는 메서드
- render: UI 렌더링 메서드
- componentDidMount: 컴포넌트가 웹 브라우저상에 나타난 후 호출하는 메서드



### 업데이트

컴포넌트가 없데이트 되는 네 가지 경우

- props가 바뀔 때
- state가 바뀔 때: setState
- 부모 컴포넌트가 리렌더링될 때
- this.forceUpdate로 강제로 렌더링을 트리거할 때



업데이트를 할 때 호출하는 메서드

- 업데이트 요인

- getDerivedStateFromProps: 마운트 중에도 호출되고 업데이트 시작 전에도 호출. props의 변화에 따라 state 값에도 변화를 주고 싶을 때 사용한다

- shouldComponentUpdate

  true면 render 호출

  false면 작업(리렌더링) 취소

  컴포넌트가 리렌더링을 해야 할지 말아야 할지 결정

  만약 특정 함수에서 `this.forceUpdate()`를 호출한다면 이 과정을 생략하고 바로 render 함수 호출

- render <= forceUpdate

- getSnapshotBeforeUpdate: 컴포넌트 변화를 돔에 반영하기 바로 직전

- 웹 브라우저상의 실제 돔 변화

- componentDidUpdate: 컴포넌트의 업데이트 작업 끝난 후



### 언마운트

마운트의 반대 과정

컴포넌트를 돔에서 제거하는 것

componentWillUnmount만 호출된다

이 메서드는 컴포넌트가 웹 브라우저상에서 사라지기 전에 호출된다



### 라이프 사이클 메서드 살펴보기

1. render()

   컴포넌트 모양새를 정의한다

   라이프 사이클 메서드 중 유일한 필수 메서드

   this.props와 this.state에 접근 가능

   (리액트 요소-div등 태그나 선언한 컴포넌트- 반환
   아무것도 보여주고 싶지 않다면 null이나 false값 반환)

   이 메서드 안에서는 이벤트 설정이 아닌 곳에서 setState를 사용하면 안 되며

   브라우저의 돔에 접근해서도 안 된다

   돔 정보를 가져오거나 state에 변화를 줄 때는 componentDidMount

2. constructor

   `constructor(props) {}`

   컴포넌트의 생성자 메서드

   컴포넌트를 만들 때 처음으로 실해오딘다

   초기 state를 정한다

3. getDerivedStateFromProps

   v16.3 이후

   props로 받아온 값을  state에 동기화시키는 용도

   컴포넌트가 마운트될 때와 업데이트될 때 호출됨

   ```react
   static getDerivedStateFromProps(nextProps, prevState) {
     if(nextProps.value !== prevState.value) {
       return { value: nextProps.value };
     }
     return null; // state 변경할 필요가 없을 때
   }
   ```

4. componentDidMount

   컴포넌트를 만들고 첫 렌더링을 다 마친 후 실행

   다른 JS 라이브러리 또는 프레임워크의 함수 호출, 이벤트 등록, setTimeout, setInterval, 네트워크 요청 등 비동기 작업 처리

5. sholudComponentUpdate

   `shouldComponentUpdate(nextProps, nextState) {}`

   props / state 변경시, 리렌더링을 시작할지 여부 지정

   true / false를 반드시 반환해야 한다

   이 메서드를 컴포넌트를 만들 때 따로 생성하지 않으면 기본적으로 true 반환

   false를 반환하면 업데이트가 여기서 중지된다

   현재 props / state는 this.props / this.state로 접근하고

   새로 설정될 props / state는 nextProps / nextState로 접근

6. getSnapshotBeforeUpdate

   v16.3

   render에서 만들어진 결과물이 브라우저에 실제로 반영되기 직전에 호출

   반환하는 값은 componentDidUpdate의 세 번재 파라미터인 snapshot 값으로 전달받을 수 있다

   ```js
   getSnapshotBeforeUpdate(prevProps, prevState) {//스크롤바 위치 유지
     if(prevState.array !== this.state.array) {
       const { scrollTop, scrollHeight } = this.list
       return { scrollTop, scrollHeight };
     }
   }
   ```

7. componentDidUpdate

   `componentDidUpdate(prevProps, prevState, snapshot) {}`

   리렌더링 완료 후 실행

   업데이트가 끝난 직후이므로, 돔 관련 처리를 해도 된다

   prevProps, prevState를 사용하여 컴포넌트가 이전에 가졌던 데이터에 접근 가능

   getSnapshotBeforeUpdate에서 반환한 값이 있다면 여기서 snapshot값을 전달받음

8. componentWillUnmount

   컴포넌트를 돔에서 제거할 때 실행

   componentDidMount에서 등록한 이벤트, 타이머, 직접 생성한 돔이 있다면 여기서 제거

9. componentDidCatch

   v16

   컴포넌트 렌더링 도중에 에러가 발생했을 때,

   애플리케이션이 먹통이 되지 않고 오류 UI를 보여 줄 수 있게 해 준다

   ```react
   componentDidCatch(error, info) {
     this.setState({
       error: true
     });
     console.log({ error, info });
   }
   ```

   error는 어떤 에러가 발생했는지

   info는 어디에 있는 코드에서 오류가 발생했는지

   이 메서드를 사용할 때는 컴포넌트 자신에게 발생하는 에러를 잡아낼 수 없고

   자신의 this.props.children으로 전달되는 컴포넌트에서 발생하는 에러만 잡아낼 수 있다

```react
import React, { Component } from 'react';

class LifeCycleSample extends Component {
  state = {
    number: 0,
    color: null
  }

  myRef = null;

  constructor(props) {
    super(props);
    console.log('constructor');
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps');
    if(nextProps.color !== prevState.color) {
      return { color: nextProps.color};
    }
    return null;
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('sholudComponentUpdate', nextProps, nextState);
    // 숫자의 마지막 자리가 4면 리렌더링 x
    return nextState.number % 10 !== 4;
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  handleClick = () => {
    this.setState({
      number: this.state.number + 1
    });
  }

  getSnapshotBeforeUpdate(prevProps, prevState, snapshot) {
    console.log('getSnapshotBeforeUpdate');
    if (prevProps.color !== this.props.color) {
      return this.myRef.style.color;
    }
    return null;
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate', prevProps, prevState);
    if(snapshot) {
      console.log('업데이트 전', snapshot);
    }
  }

  render() {
    console.log('render');

    const style = {
      color: this.props.color
    };
    
    return (
      <div>
        <h1 style={style} ref={ref => this.myRef=ref}>
          {this.state.number}
        </h1>
        <p>color: {this.state.color}</p>
        <button onClick={this.handleClick}>
          더하기
        </button>
      </div>
    );
  }
}

export default LifeCycleSample;
```

```react
import LifeCycleSample from "./LifeCycleSample.js";
import './App.css';
import React, { Component } from 'react';

function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

class App extends Component {
  state = {
    color: "#000000"
  }

  handleClick = () => {
    this.setState({
      color: getRandomColor()
    });
  }
  render() {
    return (
      <>
        <div className="pad30">
          <button onClick={this.handleClick}>
            랜덤 색상
          </button>
          <LifeCycleSample color={this.state.color}/>
        </div>
      </>
    );
  }
}

export default App;

```



💡React.StrictMode

이게 적용되어 있으면 일부 라이프 사이클이 두 번씩 호출된다

개발 환경에서만 두 번씩 호출되고 프로덕션 환경에서는 정상 호출!

index.js의 React.StrictMode를 제거하면 1번만 나올 것



에러를 한 번 만들어보겠다

LifeCycleSample.js의 render()에서 리턴하는 코드에

`{this.props.missing.value}`라는 존재하지 않는 prop를 넣으면 에러가 난다

그러면 그냥 흰 페이지만 보이는데

이게 에러가 난 거라는 것을 사용자에게 알려주는 컴포넌트를 만들어본다

```react
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = {
    error: false
  };
  componentDidCatch(error, info) {
    this.setState({
      error: true
    });
    console.log({error, info});
  }
  render() {
    if (this.state.error) return <div>에러 발생!</div>;
    return this.props.children;
  }
}

export default ErrorBoundary;
```

```react
<ErrorBoundary>
  <LifeCycleSample color={this.state.color}/>
</ErrorBoundary>
```

App.js에서 이렇게 에러 바운더리 컴포넌트로 에러를 캐치할 컴포넌트를 감싼다



## Hooks

### useState

기본적인 Hook

함수 컴포넌트에서도 가변적인 상태를 지니게 한다

```react
import React, {useState} from 'react';

const UseState = () => {
  const [value, setValue] = useState(0);
  return (
    <div>
      <p>
        카운터는 <b>{value}</b>
      </p>
      <button onClick={() => setValue(value + 1)}> + 1</button>
      <button onClick={() => setValue(value - 1)}> - 1</button>
    </div>
  );
};

export default UseState;
```

useState()는 배열을 반환한다

배열의 첫 번째 원소는 상태 값, 두 번째 원소는 상태를 설정하는 함수.

이 함수에 파라미터를 넣어서 호출하면 전달받은 파라미터로 값이 바뀌고 컴포넌트 리렌더링



하나의 useState는 하나의 상태 값만 관리하므로

컴포넌트에서 관리해야 할 상태가 여러 개라면 useState를 여러 개 사용해야 한다

```react
const [name, SetName] = useState('');
const [nickname, SetNickname] = useState('');
const [value, setValue] = useState(0);

const onChangeName = e => {
  SetName(e.target.value);
}

const onChangeNickname = e => {
  SetNickname(e.target.value);
}

return (
  <div>
    <input value={name} onChange={onChangeName} />
    <input value={nickname} onChange={onChangeNickname} />
    <p>이름: {name}</p>
    <p>닉네임: {nickname}</p>
    <p>
      카운터는 <b>{value}</b>
    </p>
    ...
```



### useEffect

리액트 컴포넌트가 렌더링될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hook

클래스형 컴포넌트의 componentDidMount와 componentDidUpdate를 합친 형태

```react
import React, {useState, useEffect} from 'react';

const UseState = () => {
  const [name, SetName] = useState('');
  const [nickname, SetNickname] = useState('');
  const [value, setValue] = useState(0);

  useEffect(() => {
    console.log('rendering complete');
    console.log({
      name, nickname
    })
  })
  ...
```

- 마운트될 때만 실행하고 싶다면?

  업데이트 때는 실행하지 않고 싶다면 함수의 두 번째 파라미터로 빈 배열을 넣어 주면 된다

  ```react
  useEffect(() => {
    console.log('mount complete');
  }, []);
  ```

- 특정 값 업데이트될 때만 실행하고 싶다면?

  이게 클래스형 컴포넌트라면

  ```react
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.vlaue !== this.props.value) {
      doSomething();
    }
  }
  ```

  useEffect 사용: 두 번째 파라미터로 전달되는 배열 안에 검사하고 싶은 값을 넣는다

  ```react
  useEffect(() => {
    console.log(name);
  }, [name]);
  
  ```

useEffect는 기본적으로 렌더링 직후마다 실행되며

두 번째 파라미터 배열에 무엇을 넣는지에 따라 실행 조건이 달라진다

컴포넌트가 언마운트되기 전이나 업데이트되기 직전에 작업을 수행하고 싶다면

useEffect에서 뒷정리(cleanup) 함수를 반환해야 한다

```react
useEffect(() => {
  console.log('effect');
  console.log(name);
  return () => {
    console.log('cleanup');
    console.log(name);
  };
}, [name]);
```

- 언마운트될 때만 뒷정리 함수 호출?

  ```react
  useEffect(() => {
    console.log('effect');
    return () => {
      console.log('cleanup');
    };
  }, []);
  ```

  

- App 컴포넌트에서 자식 컴포넌트의 가시성 바꾸기

  ```react
  import React, {useState} from 'react';
  import UseState from "./UseState.js";
  import './App.css';
  
  function App() {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <div className="pad30">
          <button onClick={() => {
            setVisible(!visible);
          }}>
            {visible ? 'hide' : 'show'}
          </button>
          <hr />
        {visible && <UseState />}
        </div>
      </>
    );
  }
  
  export default App;
  
  ```

  

### useReducer

useState보다 다양한 컴포넌트 상황에서 다양한 상태를 다른 값으로 업데이트하고 싶을 때.

리듀서라는 개념은 리덕스를 배울 때...

리듀서: 현재 상태, 그리고 업데이트를 위해 필요한 정보를 담은 액션 값을 전달받아 새로운 상태를 반환하는 함수. 새로운 상태를 만들 때는 반드시 불변성 유지!

액션 값은  `{type: 'INCREMENT'}`같은 형식으로 다른 값은 추가로 들어갈 수 있다

리덕스의 액션 객체에서는 type 필드가 필수지만 

useReducer에서는 꼭 필요한 건 아니다 또한 객체가 아니라 문자열/숫자도 가능

```react
import React, {useReducer} from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {value: state.value + 1};
    case 'DECREMENT':
      return {value: state.value - 1};
    default:
      return state;
  }
}
const UseReducer = () => {
  const [state, dispatch] = useReducer(reducer, {value: 0});
  return (
    <div>
      <p>counter: {state.value}</p>
      <button onClick={() => dispatch({type: 'INCREMENT'})}> + 1</button>
      <button onClick={() => dispatch({type: 'DECREMENT'})}> + 1</button>
    </div>
  );
};

export default UseReducer;
```

useReducer의 첫 번째 파라미터에는 리듀서 함수를 넣고, 두 번째 파라미터에는 해당 리듀서의 기본값을 넣어줍니다

이 훅을 사용하면 state값과 dispatch함수를 받게 된다

state는 현재 가리키고 있는 상태, 

dispatch는 액션을 발생시키는 함수다

`dispatch(action)`과 같은 형태로 함수 안에 파라미터로 액션 값을 넣어부면 리듀서 함수가 호출된다

- 여러개라면?

  ```react
  import React, {useReducer} from 'react';
  
  function reducer(state, action) {
    return {
      ...state,
      [action.name]: action.value
    }
  }
  const UseReducer = () => {
    const [state, dispatch] = useReducer(reducer, {
      name: '',
      nickname: ''
    });
    const {name, nickname} = state;
    const onChange = e => {
      dispatch(e.target);
    }
    return (
      <div>
        <input name="name" value={name} onChange={onChange} />
        <input name="nickname" value={nickname} onChange={onChange} />
        <p>name: {name}</p>
        <p>nickname: {nickname}</p>
      </div>
    );
  };
  
  export default UseReducer;
  ```

  useReducer에서의 액션은 어떤 값이든 가능해서

  이벤트 객체의 e.target값을 액션 값으로 사용 가능

  

### useMemo

함수 컴포넌트 내부에서 발생하는 연산 최적화 가능

📌 추후!!!

### useCallback

### useRef

함수 컴포넌트에서  ref 사용 가능

- insert 버튼 클릭시 인풋으로 포커스 옮기기

  ```react
  import React, {useState, useCallback, useRef} from 'react';
  
  const UseRef = () => {
    const [list, setList] = useState([]);
    const [number, setNumber] = useState('');
    const inputEl = useRef(null);
  
    const onChange = useCallback(e => {
      setNumber(e.target.value);
    }, []);
    const onInsert = useCallback(() => {
      const nextList = list.concat(parseInt(number));
      setList(nextList);
      setNumber('');
      inputEl.current.focus();
    }, [number, list]);
  
    return (
      <div>
        <input value={number} onChange={onChange} ref={inputEl} />
        <button onClick={onInsert}>insert</button>
        <ul>
          {list.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default UseRef;
  ```

  useRef를 사용하여 ref를 설정하면 useRef를 통해 만든 객체 안의 current 값이 실제 엘리먼트를 가리킨다

- 로컬 변수 사용하기

  로컬 변수: 렌더링과 상관없이 바꿀 수 있는 값

  클래스 컴포넌트라면

  ```react
  import React, { Component } from 'react';
  
  class MyComonent extends Component {
    id = 1
  	setId = (n) => {
      this.id = n;
    }
    printId = () => {
      console.log(this.id);
    }
    render() {
      return (
      	<div>
        	MyComponent
        </div>
      )
    }
  }
  ```

  useRef 사용

  ```react
  import React, {useState, useCallback, useRef} from 'react';
  
  const UseRef = () => {
    const [list, setList] = useState([]);
    const [number, setNumber] = useState('');
    const inputEl = useRef(null);
    const id = useRef(1);
  
    const onChange = useCallback(e => {
      setNumber(e.target.value);
    }, []);
    const onInsert = useCallback(() => {
      const nextList = list.concat(parseInt(number));
      setList(nextList);
      setNumber('');
      inputEl.current.focus();
    }, [number, list]);
    const setId = () => {
      id.current += 1;
    }
    const printId = () => {
      console.log(id.current);
    }
  
    return (
      <div>
        <input value={number} onChange={onChange} ref={inputEl} />
        <button onClick={onInsert}>insert</button>
        <ul>
          {list.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
        <button onClick={setId}>+1</button>
        <button onClick={printId}>console</button>
      </div>
    );
  };
  
  export default UseRef;
  ```

  ref 안의 값이 바뀌어도 컴포넌트가 렌더링되지는 않는다

  

### 커스텀 Hooks

📌 추후 

### 다른 Hooks

## 컴포넌트 스타일링

### CSS

### SASS

### CSS module

### styled-components

## 일정 관리 웹 애플리케이션

## 컴포넌트 성능 최적화

## immer를 사용한 불변성 유지

## 리액트 라우터로 SPA 개발하기

### 라우팅

라우팅은 사용자가 요청한 URL에 따라 알맞은 페이지를 보여주는 것

### SPA

### 리액트 라우터

### URL 파라미터와 쿼리스트링

### 라우트 중첩

### 부가 기능



## 외부 API 연동해서 뉴스 뷰어 만들기

## Context API

## 리덕스 라이브러리

## 리덕스를 사용해서 리액트 애플리케이션 상태 관리하기

## 리덕스 미들웨어를 통한 비동기 작업 관리

## 코드 스플리팅

## 서버 사이드 렌더링

## 백엔드 프로그래밍

Node.js의 Koa 프레임워크

## 몽구스를 이용한 MongoDB 연동 실습

## JWT를 통한 회원 인증 시스템 구현하기

## 프런트엔드 프로젝트

### 시작 및 회원 인증 

### 글쓰기 기능

### 포스트 조회 기능

### 수정/삭제 기능

### 그 다음은?