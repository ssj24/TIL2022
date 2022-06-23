# 서로 무게가 다른 두 볼링공
# n은 볼링공 갯수, m은 최대 무게(1<=m<=10)
# 번호가 다른 건 무게가 같아도 다른 걸로 침
# 13232에서 35는 못 고르지만 23과 25는 다른 거라는 뜨스
# 두 순서의 조합 갯수
n, m = 5, 3
balls = [1, 3, 2, 3, 2] #8
# n, m = 8, 5
# balls = 1, 5, 4, 3, 2, 4, 5, 2 # 25

arr = [0] * 11 # m이 10까지니까
for ball in balls:
    arr[ball] += 1
result = 0
for i in range(1, m + 1):
    n -= arr[i] # A가 선택할 수 있는 갯수 제외
    result += arr[i] * n # B가 선택하는 경우의 수와 곱하기
print(result)