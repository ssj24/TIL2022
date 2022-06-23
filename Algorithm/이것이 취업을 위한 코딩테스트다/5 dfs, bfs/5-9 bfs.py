from collections import deque

result = []
def BFS(graph, start, visited):
    # 시작 노드를 유일한 원소로 가지고 있는 덱 자료형
    queue = deque([start])
    visited[start] = True
    while queue:
        v = queue.popleft()
        result.append(str(v))
        for i in graph[v]: # 인접 노드 중 미방문 코드를 큐에 삽입
            if not visited[i]:
                queue.append(i)
                visited[i] = True
graph = [
    [],
    [2, 3, 8],
    [1, 7],
    [1, 4, 5],
    [3, 5],
    [3, 4],
    [7],
    [2, 6, 8],
    [1, 7]
]

visited = [False] * len(graph)
BFS(graph, 1, visited)
print(' '.join(result))
