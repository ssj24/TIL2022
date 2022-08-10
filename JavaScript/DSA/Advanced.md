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
  
}
```





### Longest Common Substring

### Knapsack

1. a recursive solution
2. a dynamic programming solution

## Greedy Algorithms

### the Coin-Changing Problem

### the Knapsack Problem

## Exercises