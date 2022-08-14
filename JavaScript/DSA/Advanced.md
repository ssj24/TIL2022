# Advanced Algorithms

다이나믹 프로그래밍은 재귀의 반대라고 여겨지는 기술이다

재귀가 top-down 방식으로 

top에서 시작해 작은 문제들로 쪼개서 문제를 해결할 때까지 작은 문제들을 해결해나가는 방식이라면

다이나믹 프로그래밍은 bottom-up 방식으로

bottom에서 시작해 작은 문제들을 해결한 뒤 그것들을 합쳐서 큰 문제의 해결방식을 알아내는 방식이다



그리디 알고리즘은 완벽한 해결책이 될 수 있는 좋은 해결책들을 찾는 알고리즘이다

좋은 해결책들이란 local optima라고도 불리는데

global optimum으로도 불리는 최적의 해결책을 찾는데 도움이 되는 것을 말한다



그리디라고 불리는 이유는 그때그때 적절하다고 생각된는 방법을 적용하기 때문이다

(시간/공간상) 완벽한 방법을 찾기 힘들어보일 때 그리디 알고리즘을 쓴다



## Dynamic Programming

재귀를 통한 문제 해결은 멋있지만 비효율적일 때가 많다

JS를 포함한 많은 언어가 재귀 코드를 효율적이게 기계 코드로 바꾸지 못한다

재귀가 나쁜 코드라는 것이 아니라 객체지향 및 imperative한 언어에서는

재귀에 높은 우선순위를 두지 않기 때문에 재귀를 실행에 어려움이 있다는 것이다



재귀적으로 해결할 수 있는 문제들 중에 많은 것들이 다이나믹 프로그래밍으로 풀 수 있다

다이나믹 프로그래밍은 어레이를 이용한 표를 만든다

이 표에는 큰 문제를 작게 쪼갠 작은 문제들의 해법을 기록한다

알고리즘이 완성되면 해답은 표 내부에서 찾을 수 있다



### Computing Fibonacci Numbers

피보나치 수열은 `0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...`과 같은 수열이다

이전의 두 숫자를 더한 것이 다음 숫자가 된다



재귀를 이용한 피보나치 수열은 간단하다

```javascript
function recurFib(n) {
  if (n < 2) {
    return n;
  } else {
    return recurFib(n-1) + recurFib(n-2);
  }
}

console.log(recurFib(10)) // 55
```

이 재귀함수의 문제는 극도로 비효율적이라는 것이다

재귀함수에 의해 똑같은 값을 계속 계산하게 되기 때문이다

만약 컴파일러가 이미 계산된 값을 알고 있다면 이런 점을 개선할 수 있다



그 방법이 바로 다이나믹 프로그래밍이다

다이나믹 프로그래밍 알고리즘은 가장 작은 하위 문제를 해결하는 것부터 시작한다

그 해답을 가지고 그보다 조금 더 복잡한 하위문제를 풀어 나가면서 본 문제를 해결하는 것이다

각 해답은 접근하기 쉽게 어레이에 저장한다



```javascript
function dynFib(n) {
  let val = [];
  for (let i=0; i<=n; ++i) {
    val[i] = 0;
  }
  if (n == 1 || n == 2) {
    return 1;
  } else {
    val[1] = 1;
    val[2] = 2;
    for (let i=3; 3<=n; ++i) {
      val[i] = val[i-1] + val[i-2];
    }
    return val(n-1);
  }
}
```



재귀와 DP를 이용한 피보나치 숫자를 구하는 방법에 걸리는 시간을 재보면

숫자가 작을 때는 별 차이 없지만

커질수록 재귀에 걸리는 시간이 훨씬 길다는 것을 확인할 수 있다



반복을 이용해서 피보나치 숫자를 구할 때 꼭 어레이를 사용할 필요는 없다

```javascript
function iterFib(n) {
  let last = 1;
  let nextLast = 1;
  let result = 1;
  for (let i=2; i<n; ++i) {
    result = last + nextLast;
    nextLast = last;
    last = result;
  }
  return result;
}
```

이 방법은 DP를 사용할 때와 비슷한 효율을 자랑한다



### Finding the Longest Common Substring

'raven'과 'havoc'의 가장 긴 공통 문자를 고르면 'av'가 된다

이처럼 A와 B라는 문자열 사이에서 가장 긴 공통 문자를 찾는 방법으로

1. 브루트 포스
2. DP

가 있다



브루트 포스 방법은 다음과 같다

A의 첫 번째 문자부터 시작해서 B의 각 문자와 비교를 한다

비교하다가 맞지 않는 문자가 나오면 A의 두 번째 문자로 넘어간다(B는 첫 번째에서 다시 시작)



DP는 더 나은 해결방법을 제공한다

2차원 어레이에 비교값을 저장한다

어레이의 인덱스는 두 문자열의 인덱스와 동일하고

각 요소의 초기값은 0이다

같은 위치에서 동일한 값을 찾으면 해당 인덱스의 값을 1 더한다

```javascript
function lcs(word1, word2) {
  let max = 0;
  let index = 0;
  let lcsarr = new Array(word1.length + 1);
  for (let i=0; i<=word1.length+1; ++i) {
    lcsarr[i] = new Array(word2.length+1);
    for (let j=0; j<=word2.length+1; ++j) {
      lcsarr[i][j] = 0;
    }
  }
  for (let i=0; i<=word1.length; ++i) {
    for (let j=0; j<=word2.length; ++j) {
      if (i == 0 || j == 0) lcsarr[i][j] = 0;
      else {
        if (word1[i-1] == word2[j-1]) {
          lcsarr[i][j] = lcsarr[i-1][j-1] + 1;
        } else {
          lcsarr[i][j] = 0;
        }
      }
      if (max < lcsarr[i][j]) {
        max = lcsarr[i][j];
        index = i;
      }
    }
  }
  
  let str = "";
  if (max == 0) return "";
  else {
    for (let i=index-max; i<=max; ++i) {
      str += word2[i];
    }
    return str;
  }
}
```



### Knapsack

크기와 가치가 다른 다양한 보물이 있다

배낭에 보물을 챙겨 최대한 큰 가치를 가지고 가고 싶다고 할 때 어떻게 해야 할까?

배낭은 16의 용량을 지닌다

다섯 가지의 보물이 있고

각 3, 4, 7, 8, 9의 크기를 가졌으며

4, 5, 10, 11, 13의 가치를 지닌다고 하자

이 때 최대가치를 가지고 나가려면 3번과 5번 아이템을 골라야 한다

그러면 총용량은 16, 총가치는 23이 된다



1. a recursive solution

   ```javascript
   function max(a, b) {
     return (a > b) ? a : b;
   }
   
   function knapsack(capacity, size, value, n) {
     if (n == 0 || capacity == 0) {
       return 0;
     }
     if (size[n-1] > capacity) {
       return knapsack(capacity, size, value, n-1);
     } else {
       return max(value[n-1] + knapsack(capacity-size[n-1], size, value, n-1),
                  knapsack(capacity, size, value, n-1));
     }
   }
   
   const value = [4, 5, 10, 11, 13];
   const size = [3, 4, 7, 8, 9];
   const capacity = 16;
   const n = 5;
   console.log(knapsack(capacity, size, value, n));
   ```

   

2. a dynamic programming solution

   핵심은 각 아이템을 배낭의 한계까지 채워넣었을 때 최대 가치를 계산하는 것이다

   ```javascript
   function max(a, b) {
     return (a > b) ? a : b;
   }
   
   function dKnapsack(capacity, size, value, n) {
     let K = [];
     for (let i=0; i<=capacity+1; i++) {
       K[i] = [];
     }
     for (let i=0; i<=n; i++) {
       for (let w=0; w<=capacity; w++) {
         if (i == 0 || w == 0) K[i][w] = 0;
         else if (size[i-1] <= w) {
           K[i][w] = max(value[i-1] + K[i-1][w-size[i-1]], K[i-1][w]);
         } else {
           K[i][w] = K[i-1][w];
         }
         process.stdout.write(K[i][w] + " ");
       }
       console.log();
     }
     return K[n][capacity];
   }
   
   const value = [4, 5, 10, 11, 13];
   const size = [3, 4, 7, 8, 9];
   const capacity = 16;
   const n = 5;
   console.log(dKnapsack(capacity, size, value, n));
   ```

   

## Greedy Algorithms

그리디 알고리즘은 그 때 그 때 최적의 선택을 하는 알고리즘이다

이 선택이 나중에 만들 결과까지는 고려하지 않는다



### the Coin-Changing Problem

잔돈을 거슬러주는 문제는 그리디 알고리즘의 전형적인 예다

650원을 거슬러 받아야 할 때 동전의 수를 최소한으로 하려면 어떻게 해야 할까?

500원 하나, 100원 하나, 50원 하나 이렇게 세 개로 돌려줄 때가 최소가 된다



```javascript
function makeChange(origAmt, coins) {
  let remainAmt = 0;
  if (origAmt % 500 < origAmt) {
    coins[3] = parseInt(origAmt / 500);
    remainAmt = origAmt % 500;
    origAmt = remainAmt;
  }
  if (origAmt % 100 < origAmt) {
    coins[2] = parseInt(origAmt / 100);
    remainAmt = origAmt % 100;
    origAmt = remainAmt;
  }
  if (origAmt % 50 < origAmt) {
    coins[1] = parseInt(origAmt / 50);
    remainAmt = origAmt % 50;
    origAmt = remainAmt;
  }
  coins[0] = parseInt(origAmt / 10);
}

function showChange(coins) {
  if (coins[3] > 0) {
    console.log(`500원은 ${coins[3]}개 = ${coins[3] * 500}원`);
  }
  if (coins[2] > 0) {
    console.log(`100원은 ${coins[2]}개 = ${coins[2] * 100}원`);
  }
  if (coins[1] > 0) {
    console.log(`50원은 ${coins[1]}개 = ${coins[1] * 50}원`);
  }
  if (coins[0] > 0) {
    console.log(`10원은 ${coins[0]}개 = ${coins[0] * 10}원`);
  }
}

const origAmt = 6500;
let coins = [];
makeChange(origAmt, coins);
showChange(coins);
```

가장 큰 단위의 돈부터 계산한다



### the Knapsack Problem

DP로 풀었던 배낭 문제에서

보물의 종류가 금가루처럼 무게로 가치를 잰다고 가정하고 그리디 알고리즘으로 풀어보자

즉, 각 종류마다 무게당 가치가 다른 것이다

1. 배낭의 용량 W, 아이템의 가치는 V, 무게는 w다
2. v/w 비율로 아이템의 가치순위를 매긴다

| item  |  A   |  B   |  C   |  D   |
| :---: | :--: | :--: | :--: | :--: |
| value |  50  | 140  |  60  |  60  |
| size  |  5   |  20  |  10  |  12  |
| ratio |  10  |  7   |  6   |  5   |

배낭의 용량이 30일 때 가장 가치가 크게 챙길 수 있는 조합의 값은 220이다



```javascript
function ksack(values, weights, capacity) {
  let load = 0;
  let i = 0;
  let w = 0;
  while (load < capacity && i < 4) {
    if (weights[i] <= (capacity-load)) {
      w += values[i];
      load += weights[i];
    } else {
			let r = (capacity-load)/weights[i];
      w += r * values[i];
      load += weights[i];
    }
  ++i;
  }
  return w;
}

const items = ["A", "B", "C", "D"];
const values = [50, 140, 60, 60];
const weights = [5, 20, 10, 12];
const capacity = 30;
console.log(ksack(values, weights, capacity));
```



## Exercises

1. 브루트 포스 기법으로 두 문자열 사이 공통되는 가장 긴 문자열을 찾는 프로그램을 만들어라
2. 배낭 문제의 제약 조건을 사용자의 입력을 받아 바꿀 수 있는 프로그램을 만들어라(배낭의 용량이나 보물의 개수, 무게 등)
3. 그리디 알고리즘으로 잔돈 문제를 풀 때 50원 대신 30원을 넣고도 최적의 해를 찾을 수 있나?