# 메모이제이션을 위한 리스트 초기화
d = [0] * 100

# top-down DP
def fibo(x):
    # 종료 조건
    if x == 1 or x == 2:
        return 1

    # 이미 계산한 적 있다면 그것을 반환
    if d[x] != 0:
        return d[x]

    d[x] = fibo(x - 1) + fibo(x - 2)
    return d[x]

print(fibo(99))