# 현재 점수 N,자릿수 기준으로 점수 N을 반으로 나누어 
# 왼쪽 부분의 각 자릿수의 합과 오른쪽 부분의 각 자릿수의 합을 더한 값이 동일한 상황이면
# LUCKY 아니면 READY
# 10 <= 99999999. N의 자릿수는 항상 짝수

# n = '123402' # LUCKY
n = '7755' # READY
halfN = len(n)//2
leftN = n[:halfN]
rightN = n[halfN:]
l, r = 0, 0
for i in range(halfN):
    l += int(leftN[i])
    r += int(rightN[i])
if l == r: print('LUCKY')
else: print("READY")