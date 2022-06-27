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

## ref: DOM에 이름달기

## 컴포넌트 반복

## 컴포넌트의 라이프사이클 메서드

## Hooks

## 컴포넌트 스타일링

## 일정 관리 웹 애플리케이션

## 컴포넌트 성능 최적화

## immer를 사용한 불변성 유지

## 리액트 라우터로 SPA 개발하기

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