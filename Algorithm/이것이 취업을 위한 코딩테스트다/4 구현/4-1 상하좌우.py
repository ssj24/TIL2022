# n = int(input())
# moves = list(input().split())
n = 5
moves = ['R', 'R', 'R', 'U', 'D', 'D'] # answer: 3 4
x, y = 1, 1

# LRUD
dx = [0, 0, -1, 1]
dy = [-1, 1, 0, 0]
movements = ['L', 'R', 'U', 'D']

for move in moves:
    for i in range(len(movements)):
        if move == movements[i]:
            tx = x + dx[i]
            ty = y + dy[i]
    if tx < 1 or ty < 1 or tx > n or ty > n:
        continue
    x, y = tx, ty
print(x, y)