# Arrays

- 프로그래밍에서 가장 흔히 사용되는 게 바로 array다

- 대부분의 언어에 array가 내장되어있다

- array란 a linear collection of elements, where the elements can be accessed via **indices**.

- JS의 array는 JS 오브젝트의 특별한 유형이다

  오브젝트인데 각 속성의 이름을 인덱스(integer)로 표현한 오브젝트로

  이 때의 인티저는 오브젝트의 요건을 충족하기 위해 string으로 변환된다

  이처럼 오브젝트의 일종이라서 JS의 array는 다른 언어의 array만큼 효율적이지는 않다

- 대부분의 스크립트 언어와 마찬가지로 JS array의 요소들은 같은 타입일 필요가 없다

  var example = [1, 'Joe', true null]; 처럼 만들 수 있다

[toc]

## array 만들기

1. `var numbers = [];`

   이 때 length = 0 (numbers.length로 조회)

   var numbers = [1, 2, 3, 4, 5];처럼 요소들을 넣어서 만들 수도 있다

   두 가지 방법 중 이게 좀 더 효율적이다

2. `var numbers = new Array();`

   the Array constructor

   이 때도 length = 0

   var numbers = new Array(1, 2, 3, 4, 5);로 만들 수도 있다

   그런데, var numbers = new Array(10);처럼 인자를 하나만 넣으면

   해당 인자가 array의 길이가 된다

   그래서 이 때 JS의 length는 10이다

`Array.isArray(식별자);` : 식별자가 array인지 알려준다(boolean)

```js
var numbers = 3;
var arr = [7, 4];
print(Array.isArray(number)); // false
print(Array.isArray(arr)); // true
```



## array 요소 access & write

```js
var nums = [];
nums[0] = 'write';
nums[1] = 'elements';
print(nums); // write, elements

nums[1] = 'modify';
print(nums); // write, modify
```

- for 반복문은 숫자 그대로 쓰기보다는 length를 이용하는 게 더 좋다

  array의 모든 요소를 활용한다는 게 보장되기 때문이다

  ```JS
  var numbers = [1, 2, 3, 4, 5];
  var sum = 0;
  for (var i=0; i<numbers.length; ++i) {
    sum += numbers[i];
  }
  print(sum); // 15
  ```

  for 반복문 헤더에는 `++i`나 `i++` 둘 다 써도 된다. for 반복문에는 큰 영향을 안 줌



## string에서 array 만들기

string에 `split()`을 쓰면 array가 만들어진다

```JS
var sentence = "Hi, This is JavaScript";
var wordsComma = sentence.split(","); 
// ,를 기준으로 나눈다
// ["Hi", "This is JavaScript"]
var wordsBlank = sentence.split(" "); 
// 띄어쓰기를 기준으로 나눈다
// ["Hi", "This", "is", "JavaScript"]
```



## 집계 작업(aggregate operations)

1. array를 다른 array에 할당할 수 있다

   ```JS
   var nums = [1, 2, 3, 4, 5];
   var meToo = nums;
   
   nums[5] = 'here';
   print(nums); // 1, 2, 3, 4, 5, here
   print(meToo); // 1, 2, 3, 4, 5, here
   ```

   이 때, meToo는 nums를 **참조**하고 있다

   그래서 meToo에 nums가 할당된 이후에 nums에 생긴 변화는

   meToo에도 영향을 미친다

   nums의 여섯번째 인덱스에만 'here'이 생긴 게 아니라

   meToo의 여섯번째 인덱스에도 'here'이 생긴 것을 보면 알 수 있다

   이를 shallow copy, 얕은 복사라고 한다

   

   이에 상대되는 개념이 deep copy, 깊은 복사다

   깊은 복사를 하면 할당 이후에 원 array의 변화는 복사된 array에 영향을 끼치지 못한다

   더 이상 참조하는 게 아니라 진짜 복사가 된 것이기 때문이다

   ```JS
   function copy(arr1, arr2) {
     for (var i=0; i<arr1.length; ++i) {
       arr2[i] = arr1[i];
     }
   }
   var nums = [1, 2, 3, 4, 5];
   var deepCopy = [];
   copy(nums, deepCopy);
   
   nums[5] = 'there';
   print(nums); // 1, 2, 3, 4, 5, here
   print(deepCopy); // 1, 2, 3, 4, 5
   ```

2. print()

   array의 요소들을 표시한다



## Accessor Functions

array 요소에 액세스하는 함수들

1. 값을 찾는 함수

   - indexOf()

     넘겨 받은 인자가 array에 존재하는지를 **앞에서부터** 훑는다

     존재한다면 해당 인덱스를 리턴하고

     (여러 개가 있어도 하나가 발견되면 검색 종료)

     존재하지 않으면 -1을 리턴한다

   - lastIndexOf()

     indexOf()와 동일한데 **뒤에서부터** 훑는다

   ```JS
   var order = ["Alpha", "Beta", "Gamma", "Beta"];
   print(order.indexOf("Beta")); // 1
   print(order.indexOf("Delta")); // -1
   print(order.lastIndexOf("Beta")); // 3
   ```

2. array => string

   array의 각 요소는 ,로 구분된다

   - join()

     ```JS
     var alphas = ["a", "b", "c", "and", "d"];
     print(alphas.join()); // a, b, c, and, d
     ```

   - toString()

     ```js
     print(alphas.toString()); // a, b, c, and, d
     
     print(alphas); // a, b, c, and, d
     ```

     print(Array)를 하면 자동으로 toString 함수를 부른다

3. 기존의 array에서 새로운 array를 만드는 함수

   - concat()

     두 개 이상의 array를 연결해서 새 array를 만든다

     `existingArray.concat(anotherExistingArray);`

     인자로 넘기는 array는 concat을 부른 JS의 마지막에 붙는다

     ```JS
     var nums = [1, 2, 3];
     var strs = ['a', 'b', 'c'];
     var concatArray = nums.concat(strs);
     print(concatArray); // 1, 2, 3, a, b, c
     ```

   - splice()

     기존 array의 부분 집합(subset)을 새로운 JS로 만든다

     `splice(start, deleteCount, item1, item2, .. itemN)`

     첫 번째 인자는 splice를 시작할 인덱스

     두 번째 인자는 start에서부터 몇 개를 없앨 것인지

     item들은 start부터 넣어줄 요소들로 이 기능은 뒤에서 상술한다

     ```JS
     var nums = [1, 2, 3, 4, 5];
     var subNum = nums.splice(2, 2);
     print(subNum); // 3, 4
     print(nums); // 1, 2, 5
     ```

     splice는 기존 array를 변형시킨다



##  Mutator Functions

<u>각 요소를 참조하지 않고</u> array를 변형할 수 있는 함수들

1. Add

   - push()

     array의 마지막에 더한다

     ```JS
     var nums = [1, 2, 3, 4, 5];
     nums[nums.length] = 'last'; // 마지막에 요소를 추가하는 또 다른 방법
     nums.push('realLast');
     print(nums); // 1, 2, 3, 4, 5, last, realLast
     ```

   - unshift()

     array의 처음에 더한다

     mutator 함수 없이 array의 처음에 요소를 더하려면 기존 요소들을 하나씩 뒤로 옮긴 뒤에 새로운 요소를 더해야 해서 어렵다

     ```JS
     var nums = [2, 3, 4, 5];
     var newNum = 1;
     nums.unshift(newNum);
     print(nums); // 1, 2, 3, 4, 5
     
     nums = [3, 4, 5];
     nums.unshift(1, 2); // 여러 개를 한 번에 더 할 수도 있다
     print(nums); // 1, 2, 3, 4, 5
     ```

2. Remove

   - pop()

     array의 마지막 요소를 삭제한다

     ```JS
     var nums = [1, 2, 3, 4, 5];
     nums.pop();
     print(nums); // 1, 2, 3, 4
     ```

   - shift()

     array의 첫 번째 요소를 삭제한다

     ```JS
     var nums = [1, 2, 3, 4, 5];
     nums.shift();
     print(nums); // 2, 3, 4, 5
     
     nums = [1, 2, 3, 4, 5];
     var first = nums.shift();
     var last = nums.pop();
     print(first); // 1
     print(nums); // 2, 3, 4
     print(last); // 5
     ```

     pop과 shift 모두 삭제한 값을 리턴한다

3. Add & Remove

   splice()는 array의 중간에 요소를 더하거나 삭제할 수 있다(양 끝도 당연히 가능)

   `splice(start, deleteCount, item1, item2, ..., itemN)`

   start: 시작 인덱스

   deleteCount: 0을 쓰면 아무것도 안 지움. n개를 쓰면 start부터 n개 삭제

   item: start 인덱스부터 더해줄 요소

   ```JS
   var nums = [1, 2, 3, 7, 8, 9];
   nums.splice(3, 0, 4, 5, 6);
   // 아무것도 지우지 않고 세번째 인덱스부터 4, 5, 6을 더하겠다
   print(nums); // 1, 2, 3, 4, 5, 6, 7, 8, 9
   var newEls = [2, 3, 3];
   nums.splice(2, 0, newEls); // 이렇게 array를 더할 수도 있다
   print(nums); // 1, 2, 2, 3, 3, 3, 4, 5, 6, 7, 8, 9 
   ```

4. Order

   - reverse()

     array의 요소를 반대로 정렬한다

     ```JS
     var nums = [1, 2, 3, 4, 5];
     num.reverse();
     print(nums); // 5, 4, 3, 2, 1
     ```

   - sort()

     array를 정렬한다

     ```js
     var alphas = ['d', 'e', 'a', 'c', 'b'];
     alphas.sort();
     print(alphas); // a, b, c, d, e
     
     var nums = [100, 4, 3, 1, 2, 200];
     nums.sort();
     print(nums); // 1, 100, 2, 200, 3, 4
     ```

     숫자는 sort()로 정렬이 잘 안 된다

     왜냐면 sort()는 각 요소를 string으로 만들어서 비교를 하기 때문이다

     이를 해결하려면 첫번째 인자로 정렬 함수를 넘겨야 한다

     숫자 정렬은 빼기를 통해 간단하게 가능하다

     ```JS
     function compare(num1, num2) {
       return num1 - num2;
     }
     var nums = [100, 4, 3, 1, 2, 200];
     nums.sort(compare);
     print(nums); // 1, 2, 3, 4, 100, 200
     ```

## Iterator Functions

array의 각 요소를 돌면서 a value, a set of values, or a new array를 리턴한다

1. array를 만들지 않는 함수

   새로운 array를 만들지 않고, 

   각 요소에 조작을 가하거나 하나의 값을 리턴한다

   - forEach()

     함수를 인자로 받고 해당 함수를 array의 각 요소에 적용한다

     ```JS
     function square(num) {
       print(num*num);
     }
     var nums = [1, 2, 3];
     nums.forEach(square);
     // 1
     // 4
     // 9
     ```

     `nums.forEach(square);`를 하면 nums의 각 요소가 square()의 인자가 된다

     이 때, nums가 [1, 4, 9]가 된 것이 아니라 print만 된 것이고

     nums는 여전히 [1, 2, 3]이다

   - every()

     **Boolean** 함수를 받아서

     array의 모든 요소가 boolean 함수에 대해 true라면 true를 리턴한다

     ```JS
     function isEven(num) {
       return num % 2 == 0;
     }
     var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
     var even = nums.every(isEven);
     print(even); // false
     ```

   - some()

     **Boolean** 함수를 받아서

     array의 요소 중 하나라도 boolean 함수에 대해 true라면 true를 리턴한다

     ```JS
     var someEven = nums.some(isEven);
     print(someEven); // true
     ```

   - reduce()

     인자로 받은 함수를 각 요소에 적용한 뒤

     값을 축적하여 마지막에 하나의 값을 생성한다

     ```JS
     function add(runningTotal, currentValue) {
       return runningTotal + currentValue;
     }
     var nums = [1, 2, 3, 4, 5];
     var sum = nums.reduce(add);
     print(sum); // 15
     ```

     string에 적용해서 string들을 연결할 수도 있다

   - reduceRight()

     reduce는 왼쪽에서 오른쪽으로(0에서 n으로)

     reduceRight는 오른쪽에서 왼쪽으로(n에서 0으로)

     ```JS
     function concat(accumulatedString, item) {
       return accumulatedString + item;
     }
     var words = ["first ", "second ", "third"];
     var ltr = words.reduce(concat);
     var rtl = words.reduceRight(concat);
     print(ltr); // first second third
     print(rtl); // thirdsecond first 
     ```

2. 새로운 array를 리턴하는 함수

   - map()

     forEach()처럼 모든 요소에 함수를 적용한다

     함수 적용 결과가 리턴하는 array의 요소가 된다

     ```JS
     function curve(grade) {
       return grade += 5;
     }
     var grades = [70, 65, 80, 90, 85];
     var newgrades = grades.map(curve);
     print(newgrades); // 75, 70, 85, 95, 90
     
     function first(word) {
       return word[0];
     }
     var words = ["For", "Your", "Information"];
     var acronym = words.map(first);
     print(acronym.join("")); // 구분자 없이 합쳐서 FYI
     ```

   - filter()

     every()처럼 작용한다

     **Boolean 함수를 만족하는 요소들로만 구성된 새로운 array**를 리턴한다

     ```JS
     function isEven(num) {
       return num % 2 == 0;
     }
     function isOdd(num) {
       return num % 2 != 0;
     }
     var nums = [1, 2, 3, 4, 5];
     var evens = nums.filter(isEven);
     pritn(evens); // 2, 4
     var odds = nums.filter(isOdd);
     print(odds); // 1, 3, 5
     ```

     filter()를 스트링과 함께 쓰는 것도 가능

     ```JS
     function afterc(str) {
       if (str.indexOf("cie") > -1) {
         return true;
       }
       return false;
     }
     var words = ["recieve", "deceive", "percieve", "deceit", "concieve"];
     var misspelled = words.filter(afterc);
     print(misspelled); // recieve, percieve, concieve
     ```



## 2차원 이상의 array

array는 기본적으로 1차원이지만 다차원의 array를 만들 수 있다

1. 2차원 array 만들기

   array의 요소들을 array로 만들면 된다

   ```JS
   Array.matrix = function(numrows, numcols, initial) {
     var arr = [];
     for (var i=0; i<numrows; ++i) {
       var columns = [];
       for (var j=0; j<numcols; ++j) {
         columns[j] = initial;
       }
       arr[i] = columns;
     }
     return arr;
   }
   var nums = Array.matrix(3, 3, 0);
   ```

   nums는 아래처럼 만들어진다

   |  0   |  0   |  0   |
   | :--: | :--: | :--: |
   |  0   |  0   |  0   |
   |  0   |  0   |  0   |

   한 줄로 2차원 array를 만들 수도 있다

   `var grades=[[1, 2, 3], [4, 5, 6], [7, 8, 9]];`

   |  1   |  2   |  3   |
   | :--: | :--: | :--: |
   |  4   |  5   |  6   |
   |  7   |  8   |  9   |



## 2차원 array 요소 process

column이나 row를 통해 접근하는 두 가지 패턴이 있는데, 모두 **for 반복문을 중첩**한다

칼럼을 중시하는 패턴은 바깥 반복문이 각 로우 안에서 움직이고

안쪽 반복문이 각 칼럼을 처리한다

```JS
var grades = [[30, 30, 30], [60, 60, 60], [90, 90, 90]];
var total = 0;
var average = 0.0;
for (var row=0; row<grades.length; ++row) {
  for (var col=0; col<grades[row].length; ++col) {
    total += grades[row][col];
  }
  average = total / grades[row].length;
  print(row+1, '번째 학생의 평균은', average.toFixed(2));
  total = 0;
  average = 0.0;
}
// 1 번째 학생의 평균은 30.00
// 2 번째 학생의 평균은 60.00
// 3 번째 학생의 평균은 90.00
```

grades의 array의 한 행은 한 학생이 받은 점수들의 집합이라고 볼 수 있다

안쪽의 반복문은 `col < grades[row].length`에 의해 제한된다

각 로우가 array로 이루어져 있고, array는 length가 있으므로

해당 로우에 몇 개의 칼럼이 있는지는 length를 통해 파악할 수 있다

> 숫자.foFixed(n): 소숫점 몇 번째 자리까지 반올림할 지!



로우를 중시하는 측면의 게산을 하려면

바깥쪽 반복문은 칼럼을 돌고 안쪽 반복문은 로우를 돌면 된다

```JS
var grades = [[30, 30, 30], [60, 60, 60], [90, 90, 90]];
var total = 0;
var average = 0.0;
for (var col=0; col<grades.length; ++col) {
  for (var row=0; row<grades[col].length; ++row) {
    total += grades[row][col];
  }
  average = total / grades[col].length;
  print(col+1, '번째 시험의 평균은', average.toFixed(2));
  total = 0;
  average = 0.0;
}
// 1 번째 시험의 평균은 60
// 2 번째 시험의 평균은 60
// 3 번째 시험의 평균은 60
```

grades의 각 칼럼은 한 시험에서 나온 점수들의 집합



## Jagged Arrays

Jagged array는 array의 각 행이 각기 다른 요소를 가지고 있는 array다

length를 활용하면 되서 다른 언어와 달리 JS는 jagged array를 쉽게 다룰 수 있다

ex) [[10], [20, 20], [30, 30, 30]]



## 오브젝트로 이루어진 array

지금까지 예시로 든 array의 요소들은 원시 데이터 타입이었지만 

오브젝트를 요소로 가질 수도 있다(array의 함수/속성도 다 오브젝트에 적용 가능)



## 오브젝트 안의 array

오브젝트 내부에서 복잡한 데이터를 저장하기 위해 JS를 이용한다



```JS
function weekTemps() {
  this.dataStore = [];
  this.add = add;
  this.average = average;
}
function add(temp) {
  this.dataStore.push(temp);
}
function average() {
  var total = 0;
  for (var i=0; i<this.dataStore.length; ++i) {
    total += this.dataStore[i];
  }
  return total / this.dataStore.length;
}
var thisWeek = new weekTemps();

thisWeek.add(25);
thisWeek.add(25);
thisWeek.add(26);
thisWeek.add(27);
thisWeek.add(28);
thisWeek.add(29);
thisWeek.add(28);
print(thisWeek.average().toFixed(1)); // 26.1
```

weekTemps는 주간 온도를 저장하는 오브젝트를 만든다 

이 오브젝트는 새로운 온도를 더하는 함수와 

오브젝트에 저장된 온도의 평균을 계산하는 함수를 가지고 있다

> add 함수는 push 함수를 활용하지만 이름을 add()라고 지었다
>
> 오브젝트 함수를 정의할 때 좀 더 직관적인 이름을 써야 하기 때문이다



## Exercises

1. 학생의 점수를 저장하는 grades 오브젝트를 만들어라. grades는 점수를 더하는 함수와 학생의 점수 평균을 표시하는 함수를 가지고 있다

   ```js
   function grades() {
       this.gradesArray = [];
       this.add = add;
       this.average = average;
     }
     function add(grade) {
       this.gradesArray.push(grade);
     }
     function average() {
       var total = 0;
       for (var i=0; i<this.gradesArray.length; ++i) {
         total += this.gradesArray[i];
       }
       return total / this.gradesArray.length;
     }
     var james = new grades();
     
     james.add(1);
     james.add(2);
     james.add(3);
     james.add(4);
     james.add(5);
     console.log(james.average().toFixed(1)); // 3
   ```

   

2. 단어들로 이루어진 array를 앞 => 뒤와 뒤 => 앞 순서로 표시하라

   ```js
   var sentence = ['create', 'a', 'grades', 'object'];
   console.log(sentence); 
   // [ 'create', 'a', 'grades', 'object' ]
   console.log(sentence.reverse()); 
   // [ 'object', 'grades', 'a', 'create' ]
   ```

   

3. weekTemps를 수정해서 월 분량의 데이터를 2차원의 array에 저장할 수 있게 만들어라. 월간 평균과 특정한 주의 평균, 모든 주의 평균을 표시하는 함수를 만들어라

   ```js
   function monthTemps() {
     this.monthTemp = [];
     this.add = add;
     this.weeklyAverage = weeklyAverage;
     this.weeklyAverageAll = weeklyAverageAll;
     this.monthlyAverage = monthlyAverage;
   }
   function add(week, temp) {
     if (!this.monthTemp[week-1]) this.monthTemp.push([]);
     this.monthTemp[week-1].push(temp);
   
   }
   function weeklyAverage(num) {
     var total = 0;
     for (var i=0; i<this.monthTemp[num-1].length; ++i) {
       total += this.monthTemp[num-1][i];
     }
     return total / this.monthTemp[num-1].length;
   }
   function weeklyAverageAll() {
     var weeklyTemp = [];
     var total = 0;
     for (var week=0; week<this.monthTemp.length; ++week) {
       for (var temp=0; temp<this.monthTemp[week].length; ++temp) {
         total += this.monthTemp[week][temp];
       }
       weeklyTemp.push(total / this.monthTemp[week].length);
       total = 0;
     }
     return weeklyTemp;
   }
   function monthlyAverage() {
     var total = 0;
     var count = 0;
     for (var week=0; week<this.monthTemp.length; ++week) {
       for (var temp=0; temp<this.monthTemp[week].length; ++temp) {
         total += this.monthTemp[week][temp];
         count += 1;
       }
     }
     return total / count;
   }
   var thisMonth = new monthTemps();
   
   thisMonth.add(1, 10);
   thisMonth.add(1, 10);
   thisMonth.add(1, 10);
   thisMonth.add(1, 10);
   thisMonth.add(1, 10);
   thisMonth.add(1, 10);
   thisMonth.add(1, 10);
   
   thisMonth.add(2, 20);
   thisMonth.add(2, 20);
   thisMonth.add(2, 20);
   thisMonth.add(2, 20);
   thisMonth.add(2, 20);
   thisMonth.add(2, 20);
   thisMonth.add(2, 20);
   
   thisMonth.add(3, 30);
   thisMonth.add(3, 30);
   thisMonth.add(3, 30);
   thisMonth.add(3, 30);
   thisMonth.add(3, 30);
   thisMonth.add(3, 30);
   thisMonth.add(3, 30);
   
   thisMonth.add(4, 40);
   thisMonth.add(4, 40);
   thisMonth.add(4, 40);
   thisMonth.add(4, 40);
   thisMonth.add(4, 40);
   thisMonth.add(4, 40);
   thisMonth.add(4, 40);
   console.log(thisMonth.weeklyAverage(2)); // 20
   console.log(thisMonth.weeklyAverageAll()); // [10, 20, 30, 40]
   console.log(thisMonth.monthlyAverage()); // 25
   ```

   

4. array의 각 글자를 저장하는 오브젝트를 만들어라. 글자들을 하나의 단어로 표시하는 함수를 가지고 있어야 한다

   ```js
   function array2letters(arr) {
     this.letterArray = [];
     for (var i=0; i<arr.length; ++i) {
       for (var j=0; j<arr[i].length; ++j) {
         this.letterArray.push(arr[i][j]);
       }
     }
     this.word = word;
   }
   
   function word() {
     return this.letterArray.join("");
   }
   var strings = ['create', 'an', 'object', 'that', 'stores'];
   var strs = new array2letters(strings);
   console.log(strs.word());
   ```

   

