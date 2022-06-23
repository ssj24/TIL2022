# 0과 1로 이루어진 문자열
# 연속된 하나 이상의 숫자를 뒤집어 문자열 내 모두 같은 숫자로
# 최소 횟수
s = '0001100' # 1

count = 1
for i in range(1, len(s)):
    if s[i] == s[i-1]:
        continue
    count += 1
print(count // 2)