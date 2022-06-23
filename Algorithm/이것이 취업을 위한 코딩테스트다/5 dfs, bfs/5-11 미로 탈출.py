from collections import deque

# LRUD
dx = [0, 0, -1, 1]
dy = [1, -1, 0, 0]

def bfs(x, y):
    q = deque([(x, y)])
    while q:
        x, y = q.popleft()
        for i in range(4):
            tx = x + dx[i]
            ty = y + dy[i]
            if tx < 0 or ty < 0 or tx >= n or ty >= m:
                continue
            if graph[tx][ty] == 0: continue
            if graph[tx][ty] == 1:
                graph[tx][ty] = graph[x][y] + 1
                q.append((tx, ty))
    return graph[n-1][m-1]

n, m = 5, 6
graph = [
    [1, 0, 1, 0, 1, 0],
    [1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1]
]
print(bfs(0, 0))