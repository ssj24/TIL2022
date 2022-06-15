# N가지 종류의 화폐를 최소한의 개수를 이용해서 그 가치의 합이 M원이 되도록 한다. 몇 개라도 사용할 수 있다. 구성은 같은데 순서만 다른 것은 같은 것으로 간주. 
# 첫째 줄에 1<=N<=100, 1<=M<=10000 이후 N개의 줄에 각 화폐의 가치(10000보다 작거나 같은 자연수)
# 불가능할 때는 -1 출력

# N, M = map(int, input().split())
# values = []
# for i in range(N):
#     values.append(int(input()))

# N, M = 2, 15
# values = [2, 3]
# # 답은 5

N, M = 3, 4
values = [3, 5, 7]
# 답은 -1


d = [10001] * (M + 1) # 가진 화폐의 가치로는 만들 수 없다는 의미로 10001 할당
d[0] = 0
for i in range(N):
    for j in range(values[i], M + 1):
        if d[j - values[i]] != 10001:
            d[j] = min(d[j], d[j - values[i]] + 1)

if d[M] == 10001:
    print(-1)
else:
    print(d[M])