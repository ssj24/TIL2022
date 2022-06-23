# 주어진 문자열(숫자) 순서대로 사이에 x, +등을 넣어 가장 큰 수를 만들기
# x, +도 순서대로 연산함
s1 = '02984' # 576
s2 = '567' # 210
def solution(s):
    result = 0
    for i in s:
        i = int(i)
        # if result == 0 or result == 1 or i == 0 or i == 1:
        if result <= 1 or i <= 1:
            result += i
        else: 
            result *= i
    return result
print(solution(s1))
print(solution(s2))
