# Carousel

## 기초

https://medium.com/@claudiaconceic/infinite-plain-javascript-slider-click-and-touch-events-540c8bd174f2

1. html

   - slider 전체를 감싸는 컨테이너

   - wrapper 

   - slides 슬라이드를 감싸는 컨테이너

     its width is equal to the sum of all the sliders in a row

   - slide 각 슬라이드들

   ```html
   <div id="slider" class="slider">
     <div class="wrapper">
       <div id="slides" class="slides">
         <span class="slide">Slide 1</span>
         <span class="slide">Slide 2</span>
         <span class="slide">Slide 3</span>
         <span class="slide">Slide 4</span>
         <span class="slide">Slide 5</span>
       </div>
     </div>
     <a id="prev" class="control prev"></a>
     <a id="next" class="control next"></a>
   </div>
   ```

   

2. css

   slider는 각 슬라이드를 보여줄 프레임이 된다

   그래서 슬라이드의 width와 동일해야 한다

   

   slides의 width는 모든 슬라이드의 with의 합 이상이어야 한다

   display는  flex이기 때문에 모든 직접적 children은(slide들) 한 줄에 들어가게 된다

   그래서 wrapper의 overflow를 hidden으로 해야 한 슬라이드씩 볼 수 있다

   ```scss
   $slider-width: 400px;
   $slider-height: 300px;
   
   .slider {
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
     width: $slider-width;
     height: $slider-height;
     box-shadow: 3px 3px 10px rgba(0,0,0,.2);
   }
   
   .wrapper {
     overflow: hidden;
     position: relative;
     width: $slider-width;
     height: $slider-height;
     background: #222;
     z-index; 1;
   }
   
   .slides {
     display: flex;
     position: relative;
     top: 0;
     left: -$slider-width; /* 두 번째 아이템부터 보임 */
     width: 10000px;
   }
   
   .slides.shifting {
     transition: left .2s ease-out;
   }
   
   .slide {
     width: $slider-width;
     height: $slider-height;
     cursor: pointer;
     display: flex;
     flex-direction: column;
     justify-content: center;
     transition: all 1s;
     position: relative;
     background: #FFCF47;
     border-radius: 2px;
   }
   
   .slider.loaded {
     .slide:nth-child(2),
     .slide:nth-child(7) { background: #FFCF47 }
     .slide:nth-child(1),
     .slide:nth-child(6) { background: #7ADCEF }
     .slide:nth-child(3) { background: #3CFF96 }
     .slide:nth-child(4) { background: #a78df5 }
     .slide:nth-child(5) { background: #ff8686 }
   }
   
   .control {
     position: absolute;
     top: 50%;
     width: 50px;
     height: 50px;
     background: #fff;
     border-radius: 50px;
     margin-top: -20px;
     box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
     z-index: 2;
   }
   
   .prev,
   .next {
     background-size: 22px;
     background-position: center;
     background-repeat: no-repeat;
     cursor: pointer;
   }
   
   .prev {
     background-image: url(https://cdn0.iconfinder.com/data/icons/navigation-set-arrows-part-one/32/ChevronLeft-512.png);
     left: -20px;
   }
   
   .next {
     background-image: url(https://cdn0.iconfinder.com/data/icons/navigation-set-arrows-part-one/32/ChevronRight-512.png);
     right: -20px;
   }
   
   .prev:active,
   .next:active {
     transform: scale(.8);
   }
   ```

   

3. js

   마우스, 터치, 클릭으로 슬라이드 이동 가능

   이동 방향은 앞 뒤 모두

   - initialisation

     ```js
     const slider = document.getElementById('slider'),
           sliderItems = document.getElementById('slides'),
           prev = document.getElementById('prev'),
           next = document.getElementById('next');
     
     slide(slider, sliderItems, prev, next);
     ```

     

   - variables setting

     ```js
     function slide(wrapper, items, prev, next) {
       let posX1 = 0,
           posX2 = 0,
           posInitial,
           posFinal,
           index = 0,
           allowShift = true;
       const threshold = 100,
             slides = items.getElementByClassName('slide'),
             slidesLength = slides.length,
             slideSize = items.getElementsByClassName('slide')[0].offsetWidth,
             firstSlide = slides[0],
             lastSlide = slides[slidesLength - 1],
             cloneFirst = firstSlide.cloneNode(true),
             cloneLast = lastSlide.cloneNode(true);
       
       items.appendChild(cloneFirst);
       items.insertBefore(cloneLast, firstSlide);
     }
     ```

     

   - item cloning

     첫번째 슬라이드를 클론해서 slides의 마지막에 붙이고,

     마지막 슬라이드를 클론해서 slides의 첫번째에 붙인다

     이 작업을 통해서 infinite loop를 만들 수 있다

     첫번째 슬라이드 이전으로 넘기면 마지막 슬라이드가 보이고

     마지막 슬라이드 다음으로 넘기면 첫번재 슬라이드가 보인다

     

     이 클론 작업이 html과 css를 렌더링한 이후에 이루어지고

     css의 nth-child로 배경색을 지정했기 때문에

     언제 클론된 슬라이드를 포함한 모든 슬라이드가 렌더링되는지가 중요하다

     그래서 모든 슬라이드가 렌더링된 이후에

     wrapper에 class를 더해준다

     그러면 지정한 순서대로 배경색이 입혀진다

     `wrapper.classList.add('loaded');`

     (이걸 items.appendChild, items.insertBefore 바로 다음에 붙임)

   - events definition

     마우스, 터치, 클릭 이벤트

     언제 마우스/터치 액션이 시작하고 이루어지고 끝나는지도 설정해줘야 한다

     ```js
     items.onmousedown = dragStart;
     
     items.addEventListener('touchstart', dragStart);
     items.addEventListener('touchend', dragEnd);
     items.addEventListener('touchmove', dragAction);
     
     prev.addEventListener('click', () => {shiftSlide(-1)});
     next.addEventListener('click', () => {shiftSlide(1)});
     ```

     

     dragStart(): onmousedown, touchend

     슬라이드 슬라이딩/드래깅/무빙을 시작할 때 어디에서 시작하는지를 알아야 한다

     초기 위치는 현재 아이템의 `offset`

     이걸 알아내면 처음 x 위치를 알 수 있다

     ```js
     function dragStart(e) {
       e = e || window.event;
       e.preventDefault();
       posInitial = items.offsetLeft;
       
       if (e.type == 'touchstart') {
         posX1 = e.touches[0].clientX;
       } else {
         posX1 = e.clientX;
         document.onomouseup = dragEnd;
         document.onmousemove = dragAction;
       }
     }
     ```

     

     dragAction(): onmousemove, ontouchmove

     x축의 마지막 위치를 알아내고

     사용자의 터치/마우스 클릭의 정확한 위치를 알아내어 초기 위치를 세팅하고

     items div의 offset 마지막 위치를 빼서 슬라이드를 이동한다

     ```js
     function dragAction(e) {
       e = e || window.event;
       if (e.type == 'touchmove') {
         posX2 = posX1 - e.touches[0].clentX;
         posX1 = e.touches[0].clientX;
       } else {
         posX2 = posX1 - e.clientX;
         posX1 = e.clientX;
       }
       items.style.left = (items.offsetLeft - posX2) + 'px';
     }
     ```

     

     dragEnd: touchend, mouseup

     변수 threshold는 표시되고 있는 슬라이드가 바뀌기 위해 움직여야 하는 최소 거리를 나타낸다

     items div의 처음과 마지막 위치 차이를 threshold와 비교한다

     그래서 좌, 우로 움직여야 할 지 혹은 아예 움직이지 말아야 할 지를 알려준다

     그리고 유저의 움직임이 끝나면 onmouseup과 onmousemove를 리셋한다.

     ```js
     function dragEnd (e) {
         posFinal = items.offsetLeft;
         if (posFinal - posInitial < -threshold) {
           shiftSlide(1, 'drag');
         } else if (posFinal - posInitial > threshold) {
           shiftSlide(-1, 'drag');
         } else {
           items.style.left = (posInitial) + "px";
         }
     
         document.onmouseup = null;
         document.onmousemove = null;
       }
     ```

     

     shiftSlide

     css 트랜지션을 이용해서 슬라이드를 움직인다

     shifting이라는 클래스를 더해준다

     ```js
     function shiftSlide(dir, action) {
       items.classList.add('shifting');
     
       if (allowShift) {
         if (!action) { posInitial = items.offsetLeft; }
     
         if (dir == 1) {
           items.style.left = (posInitial - slideSize) + "px";
           index++;      
         } else if (dir == -1) {
           items.style.left = (posInitial + slideSize) + "px";
           index--;      
         }
       };
     
       allowShift = false;
     }
     ```

     

     checkIndex: transitionend

     infinite carousel의 핵심!

     ```js
     items.addEventListener('trnasitionend', checkIndex);
     
     function checkIndex (){
       items.classList.remove('shifting');
     
       if (index == -1) {
         items.style.left = -(slidesLength * slideSize) + "px";
         index = slidesLength - 1;
       }
     
       if (index == slidesLength) {
         items.style.left = -(1 * slideSize) + "px";
         index = 0;
       }
     
       allowShift = true;
     }
     ```

     무한 캐루젤을 위해서는 

     첫번째 슬라이드가 표시되고 있을 때 사용자가 이전으로 넘길 수 있고

     그 이전 슬라이드가 클론을 한 슬라이드다

     items container의 위치를 갱신해서 클론 슬라이드가 아니라 실제 슬라이드로 사용자가 알지 못하게 가는 것이 키포인트!

     - shifting 클래스를 없애서 css transition을 주지 않는다(그러면 유저는 알 수가 없지)
     - slides container를 보여줘야 하는 실제 슬라이드로 옮긴다
     - 인덱스를 갱신한다
     - `allowShift` 를 true로 해서 사용자가 다시 인풋을 줄 수 있게 해 준다

     checkIndex가 transitionend 이벤트일 때 호출되는 이유는 두 슬라이드 사이의 transition이 끝난 후에 동작하게 만들기 위해서다

## 웹 접근성