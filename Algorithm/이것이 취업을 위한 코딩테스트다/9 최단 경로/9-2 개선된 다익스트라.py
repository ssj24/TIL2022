import sys
import heapq
import sys
input = sys.stdin.readline
INF = int(1e9)
# N, M = map(int, input().split())
N, M = 6, 11
# graph = [[] for i in range(N + 1)]
distance = [INF] * (N + 1)
# start = int(input())
start = 1
# for _ in range(M):
#     a, b, c = map(int, input().split()) # a => b 비용이 c
#     graph[a].append((b, c))
graph = [
    [],
    [(2, 2), (3, 5), (4, 1)],
    [(3, 3), (4, 2)],
    [(2, 3), (6, 5)],
    [(3, 3), (5, 1)],
    [(3, 1), (6, 2)],
    []
]

def dijkstra(start):
    q = []
    # 시작 노드로 가기 위한 최단 경로를 0으로 설정하여 큐에 삽입
    heapq.heappush(q, (0, start))
    distance[start] = 0
    while q:
        # 가장 최단 거리가 짧은 노드
        dist, now = heapq.heappop(q)
        if distance[now] < dist: # 이미 처리된 적이 있는 노드라면 무시(이래서 더 빠름)
            continue
        for i in graph[now]: # 현재 노드와 인접한 노드 확인
            cost = dist + i[1]
            if cost < distance[i[0]]: # 현재 노드를 거칠 때 더 빠르다면
                distance[i[0]] = cost
                heapq.heappush(q, (cost, i[0]))

dijkstra(start)

for i in range(1, N + 1):
    if distance[i] == INF: # 도달할 수 없다면
        print("INFINITY")
    else:
        print(distance[i])
