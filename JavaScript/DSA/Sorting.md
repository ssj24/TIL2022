# Sorting Algorithms

컴퓨터에서 많이 하는 데이터 작업 두 가지가 정렬과 검색이다

여기서 소개할 알고리즘은 어레이만 사용하도록 한다



## An Array Test Bed

![](./examples/Sorting/Carray.png)



## Basic Sorting Algorithms

for 반복문을 중첩하여 데이터를 정렬한다

바깥의 for문은 각 아이템을 순회하고

안쪽의 for문은 이전 아이템과 비교를 한다



### Bubble Sort

버블 정렬은 굉장히 느린 정렬 알고리즘이지만 가장 적용이 쉽다

데이터를 정렬할 때 데이터들이 어레이 사이를 떠돌아다니는 거품같다고 붙여진 이름이다

`EADBH`를 오름차순으로 버블정렬하면

- AEDBH
- ADEBH
- ADBEH
- ABDEH

이런 과정을 거쳐서 정렬이 된다