# Animated On Scroll library

깃허브 https://github.com/michalsnik/aos/tree/v2

## 특징

- css-driven

- viewport에 들어오면 적절한 클래스를 더해준다

- anchor

  다른 요소의 위치에 기반해서 해당 요소의 애니메이션 발동

- anchor placement

  스크린에서 해당 요소의 위치에 기반해서 애니메이션 발동

  해당 요소가 뷰포트에서 보일 때만 적용 가능한 게 아니라

  이 요소의 아랫 부분이 스크린의 중앙에 왔을 때같은 것 가능

- both way animations

  스크롤을 올리거나 내리거나 다 애니메이션 동작

  한 번만 동작하게 만들 수도 있음

- easy disabling

  모바일에서는 작동하지 않게 할 수도 있음

  모바일뿐 아니라 직접 만든 조건을 이용해서 특정 조건 하에서 작동하지 않게 가능

- async aware

  돔이 바뀌면 요소의 위치를 다시 계산한다

  Ajax 요청 등으로 인해 새로운 로딩이 되고 난 뒤에도 마찬가지

- no dependencies

  순수 JS로 쓰여져 있다



## how to

### setup

- install

```shell
yarn add aos
// 아니면
npm install aos --save
```

- CDN

```html
<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
```

- initialize AOS

```html
<script>
  AOS.init();
</script>
```



### usage

```css
[aos="fade"] {
  opacity: 0;
  transition-property: opacity;
}

[aos="fade"].aos-animate {
  opacity: 1;
}
```

transition-property의 기본값은 all이라서 원하는 특성을 좁혀주어야 효과가 눈에 띈다

.aos-animate에는 transition된 상태를 쓴다

duration, delay, easing같은 것은 애니메이션이 독자적으로 세팅한다

1. 기본

   ```html
   <div class="some-item" aos="fade">Example Element</div>
   <div class="some-item" aos="fade" aos-duration="500">Example Element</div>
   ```

   aos가 아니라 data-aos로 써서 html validation 통과하기!

   ```html
   <div class="item" data-aos="fade-up">1</div>
   <div class="item" data-aos="fade-down">2</div>
   <div class="item" data-aos="fade-right">3</div>
   <div class="item" data-aos="fade-left">4</div>
   
   <div class="item" data-aos="zoom-in">5</div>
   <div class="item" data-aos="zoom-out">6</div>
   
   <div class="item" data-aos="slide-up">7</div>
   
   <div class="item" data-aos="flip-up">8</div>
   <div class="item" data-aos="flip-down">9</div>
   <div class="item" data-aos="flip-right">10</div>
   <div class="item" data-aos="flip-left">11</div>
   ```

   ```javascript
   AOS.init({
     duration: 1200,
   })
   ```

   

2. anchor

   ```html
   <div class="item item--secondary"
        data-aos="fade-right"
        data-aos-anchor="#trigger-left"
        data-aos-anchor-placement="top-top">
     LEFT
     <span>when top of <strong>2</strong> hits top of window</span>
   </div>
   
   <div class="item item--primary"
        data-aos="fade-left"
        data-aos-anchor="#trigger-right"
        data-aos-anchor-placement="top-center">
     RIGHT
     <span>when top of <strong>5</strong> hits center of window</span>
   </div>
   
   <div class="item">1</div>
   <div class="item" id="trigger-left">
     2
     <span>trigger left</span>
   </div>
   <div class="item">3</div>
   <div class="item">4</div>
   <div class="item" id="trigger-right">
     5
     <span>trigger right</span>
   </div>
   <div class="item">6</div>
   <div class="item">7</div>
   <div class="item">8</div>
   <div class="item">9</div>
   <div class="item">10</div>
   <div class="item">11</div>
   <div class="item">12</div>
   ```

   ```scss
   @mixin center-v () {
     position: fixed;
     top: 0;
     bottom: 0;
     margin: auto;
   }
   
   body {
     overflow-x: hidden;
   }
   
   * {
     box-sizing: border-box;
   }
   
   .item {
     width: 200px;
     margin: 50px auto;
     max-height: 250px;
     padding: 75px 20px;
     background: #ccc;
     text-align: center;
     color: #FFF;
     font-size: 3em;
     
     span {
       display: block;
       font-size: 1rem;
     }
   
     &--primary {
       @include center-v;
       right: 20px;
       background: green;
     }
     
     &--secondary {
       @include center-v;
       left: 20px;
       background: red;
     }
   }
   ```

   ```javascript
   AOS.init({
     duration: 1200,
     easing: 'ease-in-out-back'
   });
   ```

   

3. custom

   ```html
   <div class="item" data-aos="example-anim1">1</div>
   <div class="item" data-aos="example-anim2">2</div>
   <div class="item" data-aos="example-anim3">3</div>
   <div class="item" data-aos="example-anim1">4</div>
   <div class="item" data-aos="example-anim2">5</div>
   <div class="item" data-aos="example-anim3">6</div>
   <div class="item" data-aos="example-anim1">7</div>
   <div class="item" data-aos="example-anim2">8</div>
   <div class="item" data-aos="example-anim3">9</div>
   ```

   ```scss
   * {
     box-sizing: border-box;
   }
   
   .item {
     width: 200px;
     height: 200px;
     margin: 50px auto;
     padding-top: 75px;
     background: #ccc;
     text-align: center;
     color: #FFF;
     font-size: 3em;
   }
   
   /* Animations */
   
   [data-aos="example-anim1"] {
     transform: skewX(45deg);
     opacity: 0;
     transition-property: transform, opacity;
     &.aos-animate {
       transform: skewX(0);
       opacity: 1;
     }
   }
   
   [data-aos="example-anim2"] {
     background: red;
     transition-property: background;
     &.aos-animate {
       background: green;
     }
   }
   
   [data-aos="example-anim3"] {
     transform: rotate(360deg);
     opacity: 0;
     transition-property: transform, opacity;
     &.aos-animate {
       transform: rotate(0);
       opacity: 1;
     }
   }
   ```

   ```javascript
   AOS.init({
    duration: 1200
   });
   ```

   

## 추가 세팅

1. data-aos-**offset**
   px(단위) - 120(기본값)

2. data-aos-duration

   ms - 400

   범위는 50 ~ 3000(50씩)

   이 범위를 벗어나고 싶다면 아래와 같이 css를 써주세요

   ```css
   body[data-aos-duration='4000'] [data-aos], [data-aos][data-aos][data-aos-duration='4000']{
       transition-duration: 4000ms;
     }
   ```

3. data-aos-**easing**

   timing 함수를 고른다

   기본값은 ease

4. data-aos-**delay**

   ms - 0

5. data-aos-**anchor**

   anchor 엘리먼트를 id 선택자로..

   기본값은 null

   원하는 엘리먼트 아이디를 `#id` 형식으로 넣는다

6. data-aos-**anchor-placement**

   엘리먼트의 특정 위치가 스크린의 특정 위치에 닿을 때

   top - bottom: 엘리먼트의 top이 윈도우의 bottom에 닿을 때!

7. data-aos-**once**

   애니메이션이 한 번만 실행될지 아닐지 boolean

   기본값은 false



### API

AOS는 전역 변수!

1. init: initialize
2. refresh: **윈도우 resize**에 따라 모든 요소의 위치와 오프셋 재계산
3. refreshHard: **aos 엘리먼트와 연관된 돔이 바뀔 때**. aos 엘리먼트를 reinit하고 refresh를 동작시킴
   만약 IE처럼 MutationObserver를 지원하지 않는 브라우저라면 직접 `AOS.refreshHard()` 해주자

### 전역 세팅

엘리먼트 하나하나가 아니라 한 번에 세팅도 가능

옵션을 init()에 넘겨주세요

```javascript
AOS.init({
  offset: 200,
  duration: 600,
  easing: 'ease-in-sine',
  delay: 100,
});
```

초기화할 때만 세팅 가능한 옵션

1. **disable**

   기본값은 false.

   mobile처럼 AOS가 비활성화되는 조건

   ```javascript
   AOS.init({
     disable: 'mobile'
   });
   ```

   기기 종류는 `mobile(phone and tablet)`, `phone`, `tablet`

   조건 만드는 것도 가능

   ```js
   disable: window.innerWidth < 1024
   
   disable: function () {
       var maxWidth = 1024;
       return window.innerWidth < maxWidth;
     }
   ```

   

2. **startEvent**

   AOS가 initialized되는 이벤트 이름

   기본값은 DOMContentLoaded

   그런데 DOMContentLoaded될 때 AOS를 initialize하고 싶지 않다면..

   document 엘리먼트의 이벤트를 넘겨주세요

   ```javascript
   AOS.init({
     startEvent: 'someCoolEvent'
   });
   ```

   startEvent: 'load' 이렇게 하면 document가 아니라 window에 이벤트 리스너를 더하게 되니까 주의할 것



### animations

- Fade animations:
  - fade
  - fade-up
  - fade-down
  - fade-left
  - fade-right
  - fade-up-right
  - fade-up-left
  - fade-down-right
  - fade-down-left
- Flip animations:
  - flip-up
  - flip-down
  - flip-left
  - flip-right
- Slide animations:
  - slide-up
  - slide-down
  - slide-left
  - slide-right
- Zoom animations:
  - zoom-in
  - zoom-in-up
  - zoom-in-down
  - zoom-in-left
  - zoom-in-right
  - zoom-out
  - zoom-out-up
  - zoom-out-down
  - zoom-out-left
  - zoom-out-right

- Anchor placement:
  - top-bottom
  - top-center
  - top-top
  - center-bottom
  - center-center
  - center-top
  - bottom-bottom
  - bottom-center
  - bottom-top

- Easing functions:

  You can choose one of these timing function to animate elements nicely:

  - linear
  - ease
  - ease-in
  - ease-out
  - ease-in-out
  - ease-in-back
  - ease-out-back
  - ease-in-out-back
  - ease-in-sine
  - ease-out-sine
  - ease-in-out-sine
  - ease-in-quad
  - ease-out-quad
  - ease-in-out-quad
  - ease-in-cubic
  - ease-out-cubic
  - ease-in-out-cubic
  - ease-in-quart
  - ease-out-quart
  - ease-in-out-quart