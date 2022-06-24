# https://programmers.co.kr/learn/courses/30/lessons/60057
s1 = 'aabbaccc' # 7
s2 = 'ababcdcdababcdcd'# 9
s3 = 'abcabcdede' # 8
s4 = 'abcabcabcabcdededededede' # 14
s5 = 'xababcdcdababcdcd' # 17

def solution(s):
    answer = len(s)
    for i in range(1, len(s) // 2 + 1): # 1개 단위부터 압축 단위 늘려가며 확인
        compressed = ''
        prev = s[0:i] # 앞에서부터 i만큼의 문자열 추출
        count = 1
        for j in range(i, len(s), i): # 단위 크기만큼(i만큼) 증가시키며 이전 문자열과 비교
            if prev == s[j:j + i]: # 이전 상태와 동일하다면 압축 횟수 증가
                count += 1
            else: # 다른 문자열이 나왔다면(더 이상 압축 불가)
                compressed += str(count) + prev if count >= 2 else prev
                # 초기화
                prev = s[j:j + i]
                count = 1
        # 남아 있는 문자열
        compressed += str(count) + prev if count >= 2 else prev

        answer = min(answer, len(compressed))
    return answer
print(solution(s1))
print(solution(s2))
print(solution(s3))
print(solution(s4))
print(solution(s5))
