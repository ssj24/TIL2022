# start = input()
start = 'a1'
x = ord(start[0]) - ord('a') + 1
y = int(start[1])
count = 0

# LLUURRDD
movements = [(-2, -1), (-2, 1), (-1, 2), (1, 2), (2, 1), (2, -1), (1, -2), (-1, -2)]
for move in movements:
    tx = x + move[0]
    ty = y + move[1]
    if tx < 1 or ty < 1 or tx > 8 or ty > 8: continue
    count += 1
print(count)