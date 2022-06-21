from xml.etree.ElementTree import tostring


result = []
def DFS(graph, v, visited):
    # 현재 노드 방문
    visited[v] = True
    result.append(v)
    for i in graph[v]: # 현재 노드와 연결된 다른 노드를 재귀적으로 방문
        if not visited[i]:
            DFS(graph, i, visited)

# 인접 리스트로 표현한 것
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
DFS(graph, 1, visited)
# join은 문자열 아이템들로 이루어진 리스트여야 동작하기 때문
print(' '.join(str(i) for i in result))