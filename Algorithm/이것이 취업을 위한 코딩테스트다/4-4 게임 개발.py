# n, m = map(int, input().split())
# x, y, d = map(int, input().split())
# graph = []
# for _ in range(n):
#     graph.append(list(map(int, input().split())))
n, m = 4, 4
x, y, d = 1, 1, 0
graph = [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 0, 1],
    [1, 1, 1, 1]
]
visit = [[0] * m for _ in range(n)]
visit[x][y] = 1
# U R D L => L U R D
dx = [-1, 0, 1, 0]
dy = [0, 1, 0, -1]
count = 1 # [x][y] has visited
turn = 0 # to check all 4 directions 

def turn_left():
    global d
    d -= 1
    if d == -1: d = 3

while True:
    turn_left()
    tx = x + dx[d]
    ty = y + dy[d]
    if visit[tx][ty] == 0 and graph[tx][ty] == 0:
        visit[tx][ty] = 1
        x, y = tx, ty
        count += 1
        turn = 0
        continue
    else:
        turn += 1
    if turn == 4:
        tx = x - dx[d]
        ty = y - dy[d]
        if graph[tx][ty] == 0:
            x, y = tx, ty
        else: break
        turn = 0

print(count)

