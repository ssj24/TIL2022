# 만들 수 없는 양의 정수 금액 중 최솟값
n = 5
nums = [3, 2, 1, 1, 9]
nums.sort()
min = 1
for num in nums:
    if min < num:
        break
    min += num
print(min)