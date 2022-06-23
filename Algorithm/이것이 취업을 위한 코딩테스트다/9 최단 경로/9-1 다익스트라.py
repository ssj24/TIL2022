import sys
input = sys.stdin.readline
INF = int(1e9) # 무한 대신 10억

# N, M = map(int, input().split())
# start = int(input())
# graph = [[] for i in range(N + 1)]
# for _ in range(M):
#     a, b, c = map(int, input().split()) # a => b 비용이 c
#     graph[a].append((b, c))

N, M = 6, 11
start = 1
graph = [
    [],
    [(2, 2), (3, 5), (4, 1)],
    [(3, 3), (4, 2)],
    [(2, 3), (6, 5)],
    [(3, 3), (5, 1)],
    [(3, 1), (6, 2)],
    []
]

visited = [False] * (N + 1)
distance = [INF] * (N + 1)


def get_smallest_node():
    min_value = INF
    index = 0 # 가장 최단 거리가 짧은 노드
    for i in range(1, N + 1):
        if distance[i] < min_value and not visited[i]:
            min_value = distance[i]
            index = i
    return index

def dijkstra(start):
    distance[start] = 0 # 시작 노드 초기화
    visited[start] = True
    for j in graph[start]:
        distance[j[0]] = j[1]
    for i in range(N - 1): # 시작 노드 제외
        now = get_smallest_node()
        visited[now] = True
        for j in graph[now]: # 현재 노드와 연결된 다른 노드 확인
            cost = distance[now] + j[1]
            if cost < distance[j[0]]: # 현재 노드 거쳐서 가는 게 최단경로라면
                distance[j[0]] = cost

dijkstra(start)

# 최단 거리 출력
for i in range(1, N + 1):
    # 도달할 수 없다면 INFINITY
    if distance[i] == INF:
        print("INFINITY")
    else:
        print(distance[i])
