n = 5 # 11475
# n = int(input())
hour = n + 1
hourLeft = 0
count = 0
for h in range(n + 1):
    if '3' in str(h):
        hour -= 1
        hourLeft += 1
for m in range(60):
    for s in range(60):
        if '3' in str(m) + str(s): count += 1
count *= hour
count += (hourLeft * 60 * 60)
print(count)