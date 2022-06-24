# https://programmers.co.kr/learn/courses/30/lessons/60059
# 자물쇠 영역에서 열쇠의 돌기와 자물쇠 홈이 정확히 일치(돌기 둘이 만나선 안 됨
# 자물쇠의 홈을 모두 채워야 열림

def rotate_a_matrix_by_90_degree(a):
    n = len(a)
    m = len(a[0])
    result = [[0] * n for _ in range(m)]
    for i in range(n):
        for j in range(m):
            result[j][n-i-1] = a[i][j]
    return result

# 자물쇠의 중간 부분이 모두 1인지 확인
def check(new_lock):
    lock_length = len(new_lock) // 3
    for i in range(lock_length, lock_length * 2):
        for j in range(lock_length, lock_length * 2):
            if new_lock[i][j] != 1:
                return False
    return True

def solution(key, lock):
    n = len(lock)
    m = len(key)
    # 자물쇠 크기를 3배로
    new_lock = [[0] * (n*3) for _ in range(n*3)]
    # 새로운 자물쇠의 중앙에 기존의 자물쇠 삽입
    for i in range(n):
        for j in range(n):
            new_lock[i + n][j + n] = lock[i][j]
    # 네 방향
    for rotation in range(4):
        # 열쇠 회전
        key = rotate_a_matrix_by_90_degree(key)
        for x in range(n * 2):
            for y in range(n * 2):
                # 자물쇠에 열쇠 끼우기
                for i in range(m):
                    for j in range(m):
                        new_lock[x + i][y + j] += key[i][j]
                # 새로운 자물쇠에 열쇠가 맞는지
                if check(new_lock) == True:
                    return True
                # 자물쇠에서 열쇠 빼기
                for i in range(m):
                    for j in range(m):
                        new_lock[x + i][y + j] -= key[i][j]
    return False

k = [
    [0, 0, 0],
    [1, 0, 0],
    [0, 1, 1]
]
l = [
    [1, 1, 1],
    [1, 1, 0],
    [1, 0, 1]
]
print(solution(k, l))
