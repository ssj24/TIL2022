# 알파벳 대문자와 숫자로만 구성된 문자열
# 알파벳을 오름차순 정렬으로 이어서 출력한 뒤
# 모든 숫자를 더한 값을 이어서 출력
# K1KA5CB7 => ABCKK13
# s = 'K1KA5CB7' # ABCKK13
s = 'AJKDLSI412K4JSJ9D' # ADDIJJJKKLSS20
strs = ''
nums = 0
for i in s:
    if i.isalpha(): strs += i
    else: nums += int(i)
result = ''.join(sorted(strs))
result += str(nums)
print(result)