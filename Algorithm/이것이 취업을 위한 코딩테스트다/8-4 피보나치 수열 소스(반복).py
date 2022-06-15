# 계산 결과 저장하기 위해 DP 테이블 초기화
d = [0] * 100

# 첫 번째, 두 번째 피보나치 수 명시
d[1] = 1
d[2] = 1
n = 99

# bottom-up DP
for i in range(3, n + 1):
    d[i] = d[i - 1] + d[i -2]

print(d[n])