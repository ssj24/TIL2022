# 공포도가 x이면 반드시 x명 이상으로 구성된 그룹을 구성해야 함
# 여행을 떠날 수 있는 그룹 수의 최댓값
# 다 그룹을 구성하지 않아도 됨!
n = 5
people = [2, 3, 1, 2, 2]
# answer = 2
# n = 6
# people = [5, 4, 3, 2, 5, 5]

result = 0
count = 0
people.sort()
for i in people:
    count += 1
    if count >= i: # 포함된 모험가의 수가 현재의 공포도 이상이라면
        result += 1
        count = 0
print(result)

