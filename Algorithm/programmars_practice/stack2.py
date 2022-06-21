from collections import deque
def solution(priorities, location):
    answer = 0
    q = deque(priorities)
    while q:
        cur = q.popleft()
        location -= 1
        if not q: 
            answer += 1
            return answer
        if max(q) > cur:
            if location < 0: location = len(q)
            q.append(cur)
        else:
            answer += 1
            if location == -1:
                return answer

    return answer

pri1 = [2, 1, 3, 2]
loc1 = 2
print(solution(pri1, loc1)) # 1
pri2 = [1, 1, 9, 1, 1, 1]
loc2 = 0
print(solution(pri2, loc2)) # 5