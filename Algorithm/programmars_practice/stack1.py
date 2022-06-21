def solutionMine(progresses, speeds):
    answer = []
    while progresses:
        for i in range(len(progresses)):
            if progresses[i] >= 100: continue
            progresses[i] += speeds[i]
        if progresses[0] >= 100:
            temp = 1
            if len(progresses) == 1: 
                answer.append(temp)
                return answer
            for i in range(len(progresses) - 1):
                if progresses[i + 1] < 100:
                    answer.append(temp)
                    progresses = progresses[i+1:]
                    speeds = speeds[i+1:]
                    break
                else:
                    temp += 1
                    if temp == len(progresses):
                        answer.append(temp)
                        return answer
    return answer



def solution(progresses, speeds):
    answer = []
    time, count = 0, 0
    while progresses:
        if (progresses[0] + time*speeds[0]) >= 100:
            progresses.pop(0)
            speeds.pop(0)
            count += 1
        else:
            if count > 0:
                answer.append(count)
                count = 0
            time += 1
    answer.append(count)
    return answer
progresses = [95, 90, 99, 99, 80, 99]
speeds = [1, 1, 1, 1, 1, 1]
print(solution(progresses, speeds))