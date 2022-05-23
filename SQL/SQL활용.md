## 서브 쿼리

1. 서브 쿼리는 메인 쿼리의 칼럼을 활용할 수 있다.(반대는 불가)
   메인 쿼리에서 서브 쿼리의 칼럼을 쓰고 싶다면 `조인`, `스칼라 서브 쿼리` 

2. 메인 쿼리의 결과가 서브 쿼리로 제공될 수도 있고,
   서브 쿼리의 결과가 메인 쿼리로 제공될 수도 있다.

3. 조인은 집합간의 곱(product)의 관계다

   - 1 : 1관계 테이블 조인 => 1레벨(1*1) 집합
   - 1 : M관계 테이블 조인 => M레벨(1*M) 집합
   - M : N관계 테이블 조인 => MN레벨(M*N) 집합
   - 그러나 서브 쿼리는 서브 쿼리의 레벨과 무관하게 항상 **메인 쿼리 레벨로 결과 집합**이 생성된다.

4. 서브 쿼리는 ()로 감싼다

5. 서브 쿼리에서 비교 연산자 사용 가능

6. 중첩 / 스칼라 서브 쿼리는 order by 사용 불가

7. 서브 쿼리의 분류

   - 동작하는 방식
     - 비연관: 서브 쿼리가 메인 쿼리 칼럼을 가지지 않음. 주로 메인에 값 제공
     - 연관
   - 반환하는 데이터 형태
     - 단일행 서브 쿼리: 서브 쿼리 실행 결과가 1건 이하. 
       단일행 비교 연산자와 함께 사용한다.(`=, <, <=, >, >=, <>`)
     - 다중행 서브 쿼리: 실행 결과가 여러 건. 
       다중행 비교 연산자 사용(`IN, ALL, ANY, SOME, EXISTS`)
     - 다중 칼럼 서브 쿼리: 실행 결과가 여러 칼럼.
       메인 쿼리 조건절에 여러 칼럼 동시 비교 가능
       서브 쿼리와 메인 쿼리에서 비교하고자 하는 칼럼 개수와 위치가 동일해야 한다

8. 단일행 서브 쿼리

   결과가 반드시 1건 이하. 2건 이상이면 런타임 오류

   단일행 비교 연산자와 함께 사용한다: `=, <, <=, >, >=, <>`

   다중행 비교 연산자를 사용 할 수 있다.(다중행 서브 쿼리는 단일행 비교 연산자 사용 불가)

   ```sql
   WHERE TEAM.ID = (SELECT TEAM.ID FROM PLAYER WHERE NAME='가나다');
   
   WHERE HEIGHT >= (SELECT AVG(HEIGHT) FROM PLAYER);
   ```

9. 다중행 서브 쿼리

   결과가 두 건 이상이면 반드시 다중행 비교 연산자 사용(아니면 에러가 난다)

   - IN: multiple OR
     IN / NOT IN은 메인 쿼리 각 행에 대해 서브 쿼리가 반환하는 모든 값과 비교해서 하나라도 일치하면  T / F
     그러나 NOT IN을 쓸 때, 서브 쿼리 반환 결과 집합에 NULL이 있으면 일치여부를 알 수 없다(공집합 반환)
   - ALL: 서브 쿼리 결과의 모든 값을 만족한다. (>라면 최댓값보다 큰 것)
   - ANY: 서브 쿼리 결과 중 어느 하나라도 만족한다. 
     SOME과 유사 (>라면 최솟값보다 큰 것)
   - EXISTS: 만족하는 값의 존재 여부. 여러 건이 만족하더라도 한 건만 찾으면 중지한다
     EXISTS는 메인 쿼리 각 행에 대해 조인 성공 데이터가 있으면 T
     NOT EXISTS는 메인 쿼리 각 행에 대해 조인 성공 데이터가 있으면 F

   1. ```sql
      WHERE C1 NOT IN(1, NULL)
      => NOT (C1 = 1 OR C1 = NULL)
      => C1 <> 1 AND C1 <> NULL
      => C1 <> 1 AND NULL
      => NULL
      ```

      모든 조건이  NULL이므로 WHERE절을 만족하는 C1은 없다

   2. ```sql
      SELECT A, B FROM T1
      	EXCEPT
      SELECT A, B FROM T2;
      ```

      EXCEPT는 NOT IN / NOT EXISTS로 대체 가능

      ```sql
      SELECT T1.A, T2.B FROM T1
      WHERE (T1.A, T1.B) NOT IN (SELECT T2.A, T2.B FROM T2);
      
      /* 위와 아래는 결과가 다르다 */
      
      SELECT T1.A, T2.B FROM T1
      WHERE T1.A NOT IN (SELECT T2.A FROM T2)
      	AND T1.B NOT IN (SELECT T2.B FROM T2);
      ```

      T1 - (a, 1), (a, 2)

      T2 - (b, 1), (a, 3)

      이런 상황이면 a는 이미 T1.A NOT IN 조건절에 걸려서 공집합이 된다.

      하나씩 떼서 비교하지 말고 한 쌍으로 묶어서 비교하기!

      

      ```sql
      SELECT T1.A, T2.B FROM T1
      WHERE NOT EXISTS (SELECT 'X' FROM T2
                       	WHERE T1.A = T2.A
                       		AND T1.B = T2.B);
      ```

   3. 이용된 적 있는 서비스 추출하기

      서비스 : 서비스 이용 = 1: M

      - ```sql
        SELECT * FROM (SELECT 서비스ID FROM 서비스
                      		INTERSECT
                       SELECT 서비스 ID FROM 서비스이용) A, 서비스 B
        WHERE A.서비스ID = B.서비스ID;
        ```

      - 서비스, 서비스 이용을 서비스ID로 이너 조인하고 GROUP BY까지!
        그룹 바이를 안 하면 1:M관계라서 서비스이용건수만큼 결과가 나온다

      - ```sql
        SELECT * FROM 서비스 X
        WHERE NOT EXISTS 
        	(SELECT 1 FROM 
           	(SELECT 서비스ID FROM 서비스
            	MINUS
             SELECT 서비스ID FROM 서비스이용) Y
           WHERE X.서비스ID = Y.서비스ID);
        ```

        서브 쿼리에서 전체 서비스에서 이용된 적 있는 서비스를 빼서 이용된 적 없는 서비스만 남긴다

        그리고 전체에서 이 이용된 적 없는 서비스를 빼서 이용된 적 있는 서비스를 추출하는 것

      - ```sql
        SELECT * FROM 서비스 A
        	LEFT OUTER JOIN 서비스이용 B
        		ON (A.서비스ID = B.서비스ID)
        WHERE B.서비스ID IS NOT NULL
        GROUP BY B.서비스ID, A.서비스명, A.서비스URL;
        ```

        WHERE절에서 IS NULL 조건을 썼으면 사용된 적 없는 서비스를 추출한다

   4. 현재 부양하는 가족들이 없는 사원들의 이름을 구하라
      가족의 부양사번 = 사원의 사번

      - ```sql
        SELECT * FROM 사원
        WHERE NOT EXISTS 
        (SELECT * FROM 가족 
         WHERE 사번 = 부양사번);
        ```

      - ```sql
        SELECT * FROM 사원
        WHERE 사번 NOT IN (SELECT 부양사번 FROM 가족);
        ```

      - ```sql
        SELECT * FROM 사원
        	LEFT OUTER JOIN 가족
        		ON (사번 = 부양사번)
        WHERE 부양사번 IS NULL;
        ```

   5. ```sql
      SELECT A.ID, A.NAME, A.이메일 FROM 회원 A
      WHERE EXISTS(SELECT 'X' FROM 이벤트 B, 이메일발송 C
                   WHERE B.시작일자 >= '2014.10.01'
                   	AND B.이벤트ID = C.이벤트ID
                   	AND A.회원ID = C.회원ID
                   HAVING COUNG(*) < 
                     (SELECT COUNT(*)
                      FROM 이벤트
                        WHERE 시작일자 >= '2014.10.01'));
      ```

      해빙 절 전까지의 서브쿼리는 회원별로 2014/10/01 이후 이벤트에 대해 발송된 메일을 구한다.

      해빙 절은 2014/10/01 이후의 이벤트 수보다 2014/10/01 이후 발송된 이메일 수가 적은 회원을 구한다.

   6. `SELECT 1`이나 `SELECT 'X'` 같은 경우에는 WHERE절에만 집중하면 된다

      WHERE절이  TRUE일 때만 본다

      TA의 C1칼럼에 1, 2, 3이 있고

      TB의 C1칼럼에 1, 2가 있다.

      ```sql
      SELECT COUNT(*) FROM TA A
      WHERE EXISTS (SELECT 1 FROM TB X
                    WHERE X.C1 = C1);
      ```

       상관 서브 쿼리 칼럼이 한정되어 있지 않다면 서브 쿼리 테이블의 칼럼을 우선 검색한다

      그래서 이 경우엔 `X.C1 = X.C1` 조건이 되는 것

      이는 항상 참이므로 TA의 전체 행을 반환한다.

      답은 3이다

   7. | **AND**  | **T** | **F** | **Null** |
      | :------: | :---: | :---: | :------: |
      |  **T**   |   T   |   F   |    N     |
      |  **F**   |   F   |   F   |    F     |
      | **Null** |   N   |   F   |    N     |

      |  **OR**  | **T** | **F** | **Null** |
      | :------: | :---: | :---: | :------: |
      |  **T**   |   T   |   T   |    T     |
      |  **F**   |   T   |   F   |    N     |
      | **Null** |   T   |   N   |    N     |

      |         | **T** | **F** | **Null** |
      | :-----: | :---: | :---: | :------: |
      | **NOT** |   F   |   T   |    N     |

      |         | **=** | **<>** | **>** | **>=** | **<** | **<=** | **AND** | **OR** |
      | ------- | :---: | :----: | :---: | :----: | :---: | :----: | :-----: | :----: |
      | **NOT** |  <>   |   =    |  <=   |   <    |  >=   |   >    |   OR    |  AND   |

10. 다중 칼럼 서브 쿼리

    여러 개의 칼럼을 반환한다

    SQL 서버는 지원하지 않는다

    ```sql
    WHERE (ID, HEIGHT) IN (SELECT ID, MIN(HEIGHT)
                          		FROM PLAYER GROUP BY ID)
    ```

11. 연관 서브 쿼리

    서브 쿼리 내에 메인 쿼리 칼럼이 사용된다

    EXISTS는 항상 연관 서브 쿼리

    ```sql
    WHERE EXISTS (SELECT 1 FROM SCHEDULE X
                 	WHERE X.ID = A.ID
                 		AND X.DATE BETWEEN '20220101' AND '20220401')
    ```

    ​	위 쿼리에서 A는 메인 쿼리의 FROM에 쓰이는 테이블이다

    ​	20220101~20220401에 경기가 있는 경기장을 조회하는 쿼리로

    ​	EXISTS는 만족하는 1건만 찾으면 추가 검색을 진행하지 않는다

    연관 서브 쿼리는 WHERE 절에서 활용한다(인라인 뷰에서는 활용x)

12. 그 밖의 위치에서 사용하는 서브 쿼리

    - SELECT절

      스칼라 서브 쿼리 사용

      - 스칼라 서브 쿼리: 
        한 행, 한 칼럼만을 반환하는 서브 쿼리로 두 건 이상 반환시 오류가 생긴다. 
        조인으로 변경 가능한다
        칼럼을 쓸 수 있는 대부분의 곳에서 사용 가능하다

      ``` sql
      SELECT ROUND((SELECT AVG(X.HEIGHT) FROM PLAYER X
                   	WHERE X.ID = A.ID), 3) AS 평균키, A.NAME
      	FROM PLAYER A;
      ```

      SELECT절의 스칼라 서브 쿼리 결과 건이 0건이더라도 메인 집합 건수와는 무관하다

      - 이미 WHERE절로 필터링은 끝났고 출력할 칼럼만 스칼라 서브 쿼리로 보여주는 것

      - ```sql
        SELECT TA.A1, (SELECT SUM(TB.B3) FROM TB
                       WHERE TB.B2 = TA.A1)
        	FROM TA
        WHERE TA.A1 IN(3, 4);
        ```

        WHERE절을 만족하는 A1은 3과 4다.

        그런데 서브 쿼리의 WHERE절의 B2에는 4가 없다.

        서브 쿼리의 WHERE절 결과가 (A1 - B2 - B3순)

        (3, 3, 5000), (3, 3, 9000), (4, NULL, NULL) 세 개라서

        결국 서브 쿼리는 A1이 3일 때 14000, A1이 4일 때 NULL을 반환한다.

      스칼라 서브 쿼리를 두 번 이상 쓰면 테이블 조회를 여러번 하게 되므로 인라인 뷰로 변경하는 것이 좋다.

      - 메인 쿼리를 기준으로 인라인 뷰를 아우터 조인해야 스칼라 서브 쿼리를 쓸 때와 동일한 결과를 낸다

      - 다만, 메인 쿼리 테이블과 서브 쿼리 테이블이 필수 관계라 모든 행이 조인시 한 건 이상 성공한다면 이너 조인도 같은 결과를 낸다

      - ```sql
        SELECT 
        	A.DEPTNO, 
        	A.DNAME, 
        	(SELECT MAX(X.SAL) FROM EMP X
           WHERE X.DEPTNO = A.DEPTNO),
          (SELECT MAX(X.COMM) FROM EMP X
           WHERE X.DEPTNO = A.DEPTNO)
        FROM DEPT A;
        ```

      - 이를 인라인 뷰로 바꾸면!

        ```sql
        SELECT A.DEPTNO, A.DNAME, B.SAL, B.COMM
        	FROM DEPT A,
        		(SELECT DEPTNO, MAX(SAL) AS SAL, MAX(COMM) AS COMM
            	FROM EMP
             GROUP BY DEPTNO) B
        WHERE B.DEPTNO(+) = A.DEPTNO;
        ```

        

    - FROM절

      인라인 뷰 / 다이나믹 뷰

      뷰와 달리 쿼리 내에서 즉시 처리한다

      서브 쿼리의 결과를 테이블처럼 사용할 수 있다

      ORDER BY 사용 가능

    - HAVING절

      ```sql
      GROUP BY A.TEAM_ID, B.TEAM_NAME
      	HAVING AVG(A.HEIGHT) < 
      		(SELECT AVG(X.HEIGHT) FROM PLAYER X
      			WHERE X.TEAM_ID IN (SELECT TEAM_ID FROM TEAM
                               	WHERE TEAM_NAME = '삼성'));
      ```

13. 뷰(VIEW)

    테이블과 달리 뷰는 실제 데이터를 갖고 있지 않다
    (실제 데이터를 저장하고 있는 뷰를 생성할 수 있는 DBMS도 있다)

    뷰 정의만 가진다

    쿼리에서 뷰가 사용되면 뷰 정의를 참조해서 DBMS 내부적으로 질의를 재작성해 수행한다.

    - 장점
      - 독립성: 테이블 구조 변경 != 뷰를 사용하는 응용 프로그램 변경
      - 편리성: 복잡한 질의가 뷰를 활용하면 단순하게 작성할 수 있다. 재사용성.
      - 보안성: 뷰 생성시 보안 컬럼을 빼고 생성해서 정보를 감출 수 있다.

    `CREATE VIEW V_TEAM AS SELECT A.NAME, B.ID;`

    FROM에서 다른 뷰를 참조할 수도 있다.

    `CREATE VIEW V_TEST AS SELECT * FROM V_TEAM;`

    뷰 삭제는 DROP으로!

    `DROP VIEW V_TEST;`

    

## 집합 연산자

1. 조인을 쓰지 않고 두 개 이상의 테이블에서 연관 데이터 조회하는 방법

   조인은 테이블의 행과 행을 연결하지만,

   집합 연산자는 결과 집합 간의 연산을 통해 결합한다

2. 서로 다른 테이블 혹은 동일 테이블 내에서 서로 다른 쿼리 수행 결과를 합치는 것

3. 필요조건(충족 안 되면 오류)

   1. SELECT절의 칼럼 수 동일
   2. SELECT절의 동일 위치에 존재하는 칼럼의 데이터 타입 동일

4. ```sql
   SELECT ... FROM ... [WHERE / GROUP BY / HAVING]
   집합연산자
   SELECT ... FROM ... [WHERE / GROUP BY / HAVING]
   [ORDER BY];
   ```

   order by는 한 번만!

   필요조건만 충족한다면 어떤 형태의 셀렉트 문이든 무관하다

5. 집합 연산자 종류

   - UNION: 합집합. 중복된 행은 하나로 =  SELECT DISTINCT

   - UNION ALL: 합집합. 중복된 행 그대로

     UNION ALL 사용했는데 두 집합의 칼럼 ALIAS가 다르면 첫번째 것 기준으로 표시

   - INTERSECT: 교집합. 중복된 행 하나로 = DISTINCT + EXISTS 서브 쿼리

   - EXCEPT: 차집합. 중복된 행 하나로. 오라클은 MINUS = DISTINCT + NOT EXISTS / NOT IN 서브 쿼리

## 그룹 함수

1. 데이터 분석을 위한 ANSI/ISO SQL 표준의 세가지 함수

   - Aggregate Function

     그룹 함수의 일부라고 분류할 수도 있음

     COUNT, SUM, AVG, MAX, MIN 등 집계 함수

   - Group Function

     집계 함수를 제외하면 ROLLUP, CUBE, GROUPING SETS

   - Window function

     분석 함수나 순위 함수라고 불리기도 함

     데이터 웨어하우스에서 발전했다

2. ROLLUP

   - 롤업에 지정된 그룹핑 칼럼 리스트는 subtotal 생성

   - 그룹핑 칼럼 수가 N이면 N+1레벨의 subtotal 생성

   - 롤업의 인수는 계층 구조 => 인수 순서가 바뀌면 수행 결과도 바뀐다

   - GROUP BY ROLLUP((C1, C2)) => (C1, C2), ()

     GROUP BY ROLLUP((C2, C1)) => (C2, C1), ()

     GROUP BY C1, ROLLUP(C2) => (C1, C2), (C1)

     GROUP BY C2, ROLLUP(C1) => (C2, C1), (C2)

   - ```sql
     SELECT B.DNAME, A.JOB, COUNT(*) AS EMP_CNT,
     				SUM(A.SAL) AS SAL_SUM
     	FROM EMP A, DEPT B
     WHERE B.DEPTNO = A.DEPTNO
     	GROUP BY ROLLUP(B.DNAME, A.JOB);
     ```

     group by 시행시 level 1: D1-3, D2-3, D3-3 9개

     rollup으로 생긴 추가 레벨 집계

     level 2: DNAME별 모든 JOB subtotal 3개

     levle 3: grand total 1개(맨 마지막)

     롤업은 계층간 집계는 레벨별 순서(L1 => L2 => L3) 정렬,

     계층 내 그룹 바이로 생성되는 표준 집계는 별도로 정렬하지 않는다.(order by 필요)

   - | **DNAME** | **JOB** | **EMP_ENT** | **SAL_SUM** |
     | :-------: | :-----: | :---------: | :---------: |
     |    D1     |    C    |      1      |     950     |
     |    D1     |    M    |      1      |    2850     |
     |    D1     |    S    |      4      |    5600     |
     |    D1     |         |      6      |    9400     |
     |    D2     |    A    |      2      |    6000     |
     |    D2     |    C    |      2      |    1900     |
     |    D2     |    M    |      1      |    2975     |
     |    D2     |         |      5      |    10875    |
     |    D3     |    C    |      1      |    1300     |
     |    D3     |    M    |      1      |    2450     |
     |    D3     |    P    |      1      |    5000     |
     |    D3     |         |      3      |    8750     |
     |           |         |     14      |    29025    |

     GROUPING

     `ROLLUP`, `CUBE`, `GROUPING SETS` 등의 그룹 함수를 위해 쓴다

     ROLLUP, CUBE에 의해 소계가 계산된 결과에는 GROUPING(EXPR) = 1이 표시된다. 그 외의 결과에는 0!

     CASE / DECODE를 이용해 소계 필드에 원하는 문자열 지정 가능

     ```sql
     SELECT B.DNAME D, GROUPING(B.DNAME) AS DNAME_GRP,
     				A.JOB, GROUPING(A.JOB) AS JOB_GRP,
     				COUNT(*) AS EMP_CNT, SUM(A.SAL) AS SAL_SUM
     FROM... WHERE...
     GROUP BY ROLLUP(B.DNAME, A.JOB)
     ORDER BY B.DNAME, A.JOB;
     ```

     | **D** | **DNAME_GRP** | **JOB** | **JOB_GRP** | **EMP_CNT** | **SAL_SUM** |
     | :---: | :-----------: | :-----: | :---------: | :---------: | :---------: |
     |   A   |       0       |    C    |      0      |      1      |    1300     |
     |   A   |       0       |    M    |      0      |      1      |    2450     |
     |   A   |       0       |    P    |      0      |      1      |    5000     |
     |   A   |       0       |         |      1      |      3      |    8750     |
     |   R   |       0       |    A    |      0      |      2      |    6000     |
     |   R   |       0       |    C    |      0      |      2      |    1900     |
     |   R   |       0       |    M    |      0      |      1      |    2975     |
     |   R   |       0       |         |      1      |      5      |    10875    |
     |   S   |       0       |    C    |      0      |      1      |     950     |
     |   S   |       0       |    M    |      0      |      1      |    2850     |
     |   S   |       0       |    S    |      0      |      4      |    5600     |
     |   S   |       0       |         |      1      |      6      |    9400     |
     |       |       1       |         |      1      |     14      |    29025    |

     이걸 CASE를 써서..

     ```sql
     SELECT 
     	CASE GROUPING(B.DNAME) 
     		WHEN 1 THEN 'ALL DEPARTMENTS' 
     		ELSE B.DNAME 
     	END AS DNAME, DNAME_GRP,
     	CASE GROUPING(A.JOB) 
     		WHEN 1 THEN 'ALL JOBS'
     		ELSE A.JOB
     	END AS JOB,
     	COUNT(*) AS EMP_CNT, 
     	SUM(A.SAL) AS SAL_SUM
     	FROM EMP A, DEPT B
     WHERE B.DEPTNO = A.DEPTNO
     	GROUP BY ROLLUP(B.DNAME, A.JOB);
     ```

     |      **D**      | **JOB**  | **EMP_CNT** | **SAL_SUM** |
     | :-------------: | :------: | :---------: | :---------: |
     |        A        |    C     |      1      |    1300     |
     |        A        |    M     |      1      |    2450     |
     |        A        |    P     |      1      |    5000     |
     |        A        | ALL JOBS |      3      |    8750     |
     |        R        |    A     |      2      |    6000     |
     |        R        |    C     |      2      |    1900     |
     |        R        |    M     |      1      |    2975     |
     |        R        | ALL JOBS |      5      |    10875    |
     |        S        |    C     |      1      |     950     |
     |        S        |    M     |      1      |    2850     |
     |        S        |    S     |      4      |    5600     |
     |        S        | ALL JOBS |      6      |    9400     |
     | ALL DEPARTMENTS | ALL JOBS |     14      |    29025    |

     GROUPING 함수는 표현식이 행 그룹에 포함되면 0, 아니면 1

     ```sql
     SELECT C1, C2, SUM(C3), GROUPING(C2) GP FROM T1
     	GROUP BY ROLLUP(C1, C2);
     ```

     | **C1** | **C2** | **C3** | **GP** |
     | :----: | :----: | :----: | :----: |
     |   A    |   a    |   1    |   0    |
     |   A    |   b    |   1    |   0    |
     |   A    |        |   2    |   1    |
     |   B    |   c    |   1    |   0    |
     |   B    |   d    |   1    |   0    |
     |   B    |        |   2    |   1    |
     |   C    |   e    |   1    |   0    |
     |   C    |   f    |   1    |   0    |
     |   C    |        |   2    |   1    |
     |        |        |   6    |   1    |

     GP열 1인 행을 보면 C1은 포함됐지만 C2는 포함되지 않았다.

   - ROLLUP 함수의 일부 사용

     `GROUP BY B.DNAME, ROLLUP(A.JOB)`

     DNAME은 집계는 안 되도 그룹 바이 순서는 1번

     맨 마지막 ALL DEPARTMENTS 행이 사라진다

     ROLLUP이 JOB 칼럼에만 사용되어서 DNAME 집계가 필요없기 때문

   - ROLLUP 함수의 결합 칼럼 사용

     `GROUP BY ROLLUP(B.DNAME, (A.JOB, A.MGR))`

     JOB과 MGR은 하나의 집합으로 간주하고 JOB & MGR에 대한 롤업 결과 출력

     JOB과 MGR 따로 집계를 구하지 않는다.

3. CUBE

   - 롤업은 가능한 subtotal만 출력하지만

     큐브는 **결합 가능한 모든 값에 대해**  다차원 집계

     롤업에 비해 시스템에 부담을 준다

   - 표시된 인수들에 대한 계층별 집계

     롤업과 달리 인수간 계층구조가 없는 평등한 관계

     인수 순서가 바뀌면 행간 정렬 순서는 바뀌어도 데이터 결과는 같다

   - 결과 정렬하려면 ORDER BY!

   - `GROUP BY CUBE(DNAME, JOB)`

     | **DNAME** | **JOB** | **EMP_CNT** | **SAL_SUM** |
     | :-------: | :-----: | :---------: | :---------: |
     |     A     |    C    |      1      |    1300     |
     |     A     |    M    |      1      |    2450     |
     |     A     |    P    |      1      |    5000     |
     |     A     |   ALL   |      3      |    8750     |
     |     R     |    A    |      2      |    6000     |
     |     R     |    C    |      2      |    1900     |
     |     R     |    M    |      1      |    2975     |
     |     R     |   ALL   |      5      |    10875    |
     |     S     |    C    |      1      |     950     |
     |     S     |    M    |      1      |    2850     |
     |     S     |    S    |      4      |    5600     |
     |     S     |   ALL   |      6      |    9400     |
     |    ALL    |    A    |      2      |    6000     |
     |    ALL    |    C    |      4      |    4150     |
     |    ALL    |    M    |      3      |    8275     |
     |    ALL    |    P    |      1      |    5000     |
     |    ALL    |    S    |      4      |    5600     |
     |    ALL    |   ALL   |     14      |    29025    |

   - GROUPING COLUMNS가  N개면 subtotal은 2<sup>n</sup>레벨

   - UNION ALL과 결과 데이터가 같다(행들의 정렬은 다를 수 있지만)

     UNION ALL을 쓰면 테이블을 반복 액세스해야 하는데

     큐브는 한 번만 액세스하면 되므로

     수행속도 및 자원 사용률이 개선되고 가독성이 상승한다.

     (이 개선 효과는 롤업도 동일하다)

4. GROUPING SETS

   - GROUP BY를 여러번 반복하지 않아도 된다

   - 인수들에 대한 개별 집계가 가능하다

     표시된 인수는 롤업과 달리 평등하다

     인수 순서가 바뀌어도 결과는 같다

   - 정렬은 ORDER BY!

   - ```sql
     SELECT 
     	CASE GROUPING(B.DNAME) 
     		WHEN 1 THEN 'ALL DEPARTMENTS' 
     		ELSE B.DNAME 
     	END AS DNAME, DNAME_GRP,
     	CASE GROUPING(A.JOB) 
     		WHEN 1 THEN 'ALL JOBS'
     		ELSE A.JOB
     	END AS JOB,
     	COUNT(*) AS EMP_CNT, 
     	SUM(A.SAL) AS SAL_SUM
     	FROM EMP A, DEPT B
     WHERE B.DEPTNO = A.DEPTNO
     	GROUP BY GROUPING SETS(B.DNAME, A.JOB)
     ORDER BY B.DNAME, A.JOB;
     ```

     | **DNAME** | **JOB** | **EMP_CNT** | **SAL_SUM** |
     | :-------: | :-----: | :---------: | :---------: |
     |     A     |   ALL   |      3      |    8750     |
     |     R     |   ALL   |      5      |    10875    |
     |     S     |   ALL   |      6      |    9400     |
     |    ALL    |    A    |      2      |    6000     |
     |    ALL    |    C    |      4      |    4150     |
     |    ALL    |    M    |      3      |    8275     |
     |    ALL    |    P    |      1      |    5000     |
     |    ALL    |    S    |      4      |    5600     |

     

   - GROUPING SETS는 UNION ALL과 같은 결과(정렬 순서는 다를 수 있음)

   - 괄호로 묶은 집합별로 집계를 구할 수 있다

   - 3개의 인수를 활용한 GROUPING SETS

     ```sql
     GROUP BY GROUPING SETS (
     	(B.DNAME, A.JOB, A.MGR),
       (B.DNAME, A.JOB),
       (A.JOB, A.MGR)
     )
     ```

   -  `GROUP BY GROUPING SETS (B.REG_ID, TO_CHAR(A.DATE, 'YYYY, MM'))`
     계층구조 없이 지역에 대한 합계와 월별 합계를 각자 생성한다



## 윈도우 함수

1. 윈도우 함수

   = 분석함수, 순위함수

   행과 행간의 관계를 쉽게 정의하기 위한 함수

   데이터 웨어하우스에서 발전

   GROUP BY랑 윈도우 함수 함께 사용 가능

   - 종류
     - 그룹 내 순위 관련 함수: RANK, DENSE_RANK, ROW_NUMBER
     - 그룹 내 집계 관련 함수: SUM, MAX, MIN, AVG, COUNT
     - 그룹 내 행 순서 관련 함수: FIRST_VALUE, LAST_VALUE, LAG, LEAD
     - 그룹 내 비율 관련 함수: CUME_DIST, PERCENT_RANK, NTILE, RATIO_TO_REPORT
     - 통계 분석 관련 함수: CORP, COVAR_POP, STDDEV, VARIANCE, REGR_SLOPE

   - OVER

     윈도우 함수의 필수 문구

     - `SELECT 윈도우함수(arguments) OVER ([PARTITION BY 칼럼] [ORDER BY] [WINDOWING]) FROM 테이블;`

     - partition by:

       - 소그룹으로 나누기
       - partition by를 생략하면 모든 데이터를 대상으로 한다

     - windowing

       - 함수 대상이 되는 행 기준의 범위를 강력하게 지정

       - SQL 서버는 미지원

       - 기본값: RANGE UNBOUNDED PRECEDING
         현재 행 기준으로 파티션 내의 첫번째 행까지를 범위로 지정한다

       - ROWS는 현재 행의 앞뒤 건수
         RANGE는 현재 행의 **데이터 값**을 기준으로 앞뒤 데이터 값의 범위

       - ```sql
         ROWS/RANGE UNBOUNDED PRECEDING/CURRENT_ROW/VALUE_EXPR PRECEDING
         
         ROWS/RANGE 
         BETWEEN UNBOUNDED PRECEDING/CURRENT_ROW/VALUE_EXPR PRECEDING/FOLLOWING
         AND
         UNBOUNDED FOLLOWING/CURRENT_ROW/VALUE_EXPR PRECEDING/FOLLOWING
         ```

2. 그룹 내 순위 함수

   1. RANK

      ORDER BY를 포함한 쿼리에서 특정 항목(칼럼)에 대한 순위를 구하는 함수

      PARTITION으로 만든 특정 범위 내 혹은 전체 데이터에서 순위 구함

      **동일한 값은 동일 순위**

      ```sql
      SELECT JOB, ENAME, SAL,
      	RANK() OVER (ORDER BY SAL DESC) AS ALL_RK,
      	RANK() OVER (PARTITION BY JOB ORDER BY SAL DESC) AS JOB_RK
      FROM EMP;
      ```

      JOB_RK의 partition by와 ALL_RK의 order by가 충돌되어 JOB별로 정렬되지 않고 ALL_RK의 order by절대로 정렬된다

      만약 ALL_RK가 없었다면 JOB으로 소그룹을 나눈 뒤에 그 안에서 정렬된다 

      

      ```sql
      WHERE SAL = 
      (SELECT SAL FROM 
       	(SELECT SAL, RANK() OVER (ORDER BY SAL DESC) AS RK FROM EMP
         WHERE SAL < 1300)
       WHERE RK = 1);
      ```

      위 쿼리는 에러가 날 수 있다

      RANK 함수는 동일 순위를 허용하므로 다중행 반환이 가능하기 때문에

      1등이 여러명일 때 에러가 난다

   2. DENSE_RANK

      **동일한 순위를 하나의 건수**로 취급한다: 만약 2등이 공동으로 두 명이면 랭크와 덴스랭크 둘 다 두 명을 2등으로 표시한다 하지만 랭크는 그 다음 등수를 4등이라고 하고(`1 2 2 4`), 덴스랭크는 3등이라고 한다(`1 2 2 3`)

      RANK와 똑같은 문법

      DENSE_RANK는 중간 순위를 안 비우니까`1 1 2 3 4 4 4 5` 이런 식으로 나온다
      그러면 순위 <= 10이라고 해도 10명보다 더 나올 수 있다

   3. ROW_NUMBER

      **동일한 값에 고유한 순위**를 분여한다

      RANK와 같은 문법

      데이터베이스마다 독자적인 순위 지정법이 있다

      동일 값에 대한 순서 관리는 order by절로!
      `ROW_NUMBER() OVER (ORDER BY SAL DESC, ENAME)`일반 집계함수

3. 일반 집계함수

   1. SUM

      파티션별 윈도우의 합 구하기

      SUM 윈도우 함수는 인자로 지정한 칼럼 / 표현식의 합계 값을 반환한다. 

      `SUM(SAL) OVER (PARTITION BY MGR) AS SAL_SUM`

      over절에 order by를 기록하면 순서에 따라 각 행까지의 누적합을 집계하고 

      order by가 없으면 전체합을 집계한다

      SUM([DISTINCT|ALL] expr) over (...)

      윈도윙 절의 기본값은 RANGE UNBOUNDED PRECEDING: 현재 행 기준으로 파티션 내의 첫번째 행까지를 범위로 지정한다

      이렇게 하면 동일 값 동일 윈도우로 처리한다

      ![SUM WINDOW ROWS-RANGE](https://user-images.githubusercontent.com/52478972/163379563-fa765244-d004-4b38-a350-8e4507e5fc25.png)

   2. MAX

      파티션 별 최댓값

      인라인 뷰를 이용해서 파티션별 최댓값 가진 행만 추출할 수 있다

      ```sql
      SELECT MGR, ENAME, SAL
      FROM (SELECT MGR, ENAME, SAL,
           		MAX(SAL) OVER(PARTITION BY MGR) AS MAX_SAL
           	FROM EMP)
      	WHERE SAL = MAX_SAL;
      ```

      | **MGR** | **ENAME** | **SAL** |
      | :-----: | :-------: | :-----: |
      |  7566   |   FORD    |  3000   |
      |  7566   |   SCOTT   |  3000   |
      |  7698   |   ALLEN   |  1600   |
      |  7782   |  MILLER   |  1300   |

      FORD, SCOTT는 동일한 급여를 받아서 WHERE절을 둘 다 충족했다

      다만 위 쿼리는 성능이 저하되므로 순위 함수인 RANK를 사용하는 것이 더 좋다

      `FROM (SELECT ..., RANK() OVER(PARTITION BY MGR ORDER BY SAL DESC) AS SAL_RK FROM EMP) WHERE SAL_RK = 1;`

   3. MIN

   4. AVG

      AVG와 파티션별 ROWS 윈도우를 이용해 원하는 조건에 맞는 데이터 통곗값

      - 같은 매니저를 둔 사원들의 평균 SAL 구하기(자기 바로 앞뒤 사번!)

        ```sql
        SELECT
        	MGR, ENAME, HIREDATE, SAL,
        	ROUND(AVG(SAL) OVER (
            PARTITION BY MGR 
            ORDER BY HIREDATE 
            ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING)
          ) AS AVG_SAL
        FROM EMP;
        ```

        | **MGR** | **ENAME** | **HIREDATE** | **SAL** | **AVG_SAL** |
        | :-----: | :-------: | :----------: | :-----: | :---------: |
        |  7566   |     C     |  1981-12-11  |  1400   |     ...     |
        |  7698   |     A     |  1981-02-20  |  1600   |    1425     |
        |  7698   |     W     |  1981-02-22  |  1250   |    1450     |
        |  7698   |     T     |  1981-09-08  |  1500   |    1333     |
        |  7698   |     M     |  1981-09-28  |  1250   |    1233     |
        |  7698   |     J     |  1981-12-03  |   950   |    1100     |

        A행의 AVG_SAL이 1425인 이유는 7698 매니저 파티션 내에서 첫번째 데이터라서 앞의 데이터가 없고 본인 1600과 다음 1250을 2로 나누었기 때문이다. J행 역시 파티션의 마지막 데이터라서 1250과 950으로만 구한다

   5. COUNT

      COUNT는 개수를 세는 거니까 `HAVING COUNT(CASE WHEN ~ THEN 0 ELSE NULL END) >= 1`해도 에러가 아니다 0인 건 개수를 세고 아닌 건 NULL이라 개수를 안 세면 되니까!

      COUNT 윈도우 함수도 order by 기술시 순서에 따른 누적.

      - 급여 기준 정렬. 본인보다 급여가 50 이하로 적거나 150 이하로 많은 인원수

        ```sql
        SELECT 
        	ENAME, SAL,
        	COUNT(*) OVER (
            ORDER BY SAL
          	RANGE BETWEEN 50 PRECEDING
          		AND 150 FOLLOWING
          ) AS EMP_CNT
        FROM EMP;
        ```

        | **ENAME** | **SAL** | **EMP_CNT** |
        | :-------: | :-----: | :---------: |
        |     S     |   800   |      2      |
        |     T     |   950   |      2      |
        |     A     |  1100   |      3      |
        |     W     |  1250   |      3      |
        |     M     |  1250   |      3      |

        S는 750~950 사이의 급여를 받는 인원수

        A는 1050~1250 사이의 급여를 받는 인원수...

4. 그룹 내 행 순서 함수

   1. FIRST_VALUE

      파티션별 가장 먼저 나온 값

      SQL서버 미지원

      MIN과 같은 결과

      ```sql
      SELECT 
      	DEPTNO, ENAME, SAL,
      	FIRST_VALUE(ENAME) OVER (
        	PARTITION BY DEPTNO
        	ORDER BY SAL DESC
       		ROWS UNBOUNDED PRECEDING
        ) AS ENAME_FV
      FROM EMP;
      ```

      | **DEPTNO** | **ENAME** | **SAL** | **ENAME_FV** |
      | :--------: | :-------: | :-----: | :----------: |
      |     10     |     k     |  5000   |      k       |
      |     10     |     c     |  2450   |      k       |
      |     10     |     m     |  1300   |      k       |
      |     20     |     s     |  3000   |      s       |
      |     20     |     f     |  3000   |      s       |
      |     20     |     j     |  2975   |      s       |
      |     20     |     a     |  1100   |      s       |
      |     20     |     s     |   800   |      s       |
      |     30     |     b     |  2850   |      b       |

      범위는 현재행 기준 파티션 내 첫번째 행까지

      20 파티션 내에서 최고급여는 s와 f 둘인데, 둘 중 어떤 것이 첫번째로 나올 지는 알 수 없다 first_value는 공동 순위를 인정하지 않는다. 따라서 세부 정렬을 하고 싶으면 별도 정렬 조건을 넣은 `인라인 뷰`를 사용하거나 `order by`절에 정렬 조건 추가한다(ORDER BY SAL DESC, ENAME으로 하면 f가 최고 급여자로!)

      ```sql
      SELECT 
      	SAL, 
      	COMM, 
      	FIRST_VALUE(COMM IGNORE NULLS) OVER (ORDER BY SAL) AS C1, 
      	FIRST_VALUE(COMM) OVER (ORDER BY SAL) AS C2
      FROM EMP;
      ```

      | **SAL** | **COMM** | **C1** | **C2** |
      | :-----: | :------: | :----: | :----: |
      |   950   |    N     |   N    |   N    |
      |  1250   |   500    |  500   |   N    |
      |  1250   |   1400   |  500   |   N    |
      |  1500   |    0     |  500   |   N    |
      |  1600   |   300    |  500   |   N    |
      |  2850   |    N     |  500   |   N    |

      정렬순서상 첫 행에는 NULL 외 COMM이 없어서 C1은 NULL

   2. LAST_VALUE

      파티션별 가장 나중에 나온 값

      SQL서버는 미지원

      MAX와 같은 결과

      ```sql
      SELECT 
      	DEPTNO, ENAME, SAL,
      	LAST_VALUE(ENAME) OVER (
        	PARTITION BY DEPTNO
        	ORDER BY SAL DESC
       		ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING
        ) AS ENAME_LV
      FROM EMP;
      ```

      범위는 현재 행 포함, 파티션 내 마지막 행까지의 범위

   3. LAG

      파티션별 이전 몇 번째 행의 값

      SQL서버는 미지원

      인자는 3개까지 가능

      ```sql
      LAG(칼럼[, 몇 번째 앞의 행(기본값 = 1), NULL 대체값])
      
      SELECT LAG (SAL, 2, 0) OVER (ORDER BY HIREDATE);
      /* 두 행 앞의 값을 가져온다. 1, 2행은 NULL이므로 대체값인 0 출력 */
      ```

      본인보다 입사일자가 한 명 앞선 사원의 급여 구하기

      ```sql
      SELECT 
      	ENAME, HIREDATE, SAL, 
      	LAG(SAL) OVER (ORDER BY HIREDATE) AS LAG_SAL
      FROM EMP
      WHERE JOB = 'SALESMAN';
      ```

      | **ENAME** | **HIREDATE** | **SAL** | **LAG_SAL** |
      | :-------: | :----------: | :-----: | :---------: |
      |     A     |   20210220   |  1600   |      N      |
      |     W     |   20210222   |  1250   |    1600     |
      |     T     |   20210908   |  1500   |    1250     |
      |     M     |   20210928   |  1250   |    1500     |

   4. LEAD

      파티션별 이후 몇 번째의 값

      SQL서버 미지원

      인자 세 개까지 받음

5. 그룹 내 비율 함수

   1. RATIO_TO_REPORT

      파티션 내 전체 SUM(칼럼)값에 대한 행별 칼럼 값의 백분율을 소수점으로 나타낸다

      결과값은 0 < x <= 1

      개별 ratio 합 구하면 1

      SQL서버 미지원

      ```sql
      SELECT ENAME< SAL< ROUND(RATIO_TO_REPORT(SAL) OVER (), 2) AS PR
      FROM EMP
      WHERE JOB = 'SALESMAN';
      
      /* ALLEN 1500 0.29 1600/5600 */
      ```

   2. PERCENT_RANK

      파티션별 제일 먼저 나오는 것을 0, 제일 늦게 나오는 것을 1이라고 한다

      값이 아닌 행의 순서별 백분율

      SQL서버 미지원

      같은 부서 소속 사원들의 집합에서 본인의 급여가 순서상 몇 번째일까?

      ```sql
      SELECT 
      	DEPTNO, ENAME, SAL,
      	PERCENT_RANK() OVER(
        	PARTITION BY DEPTNO ORDER BY SAL DESC
        ) AS PR
       FROM EMP:
      ```

      | **DEPTNO** | **ENAME** | **SAL** | **PR** |
      | :--------: | :-------: | :-----: | :----: |
      |     10     |     K     |  5000   |  0.00  |
      |     10     |     C     |  2450   |  0.50  |
      |     10     |     M     |  1300   |  1.00  |
      |     20     |     S     |  3000   |  0.00  |
      |     20     |     F     |  3000   |  0.00  |
      |     20     |     J     |  2975   |  0.50  |
      |     20     |     A     |  1100   |  0.75  |
      |     20     |     S     |   800   |  1.00  |
      |     30     |     B     |  2850   |  0.00  |

      파티션 내 전체 건수가 세 건이라면 구간은 2개로 나뉜다 

      0과 1 사이를 두 구간으로 나누면 0, 0.5, 1이 된다.

      같은 값을 가지면 순서도 동일하다고 본다

      그러나 0.00이 두 개이면 다음은 0.25를 건너뛰고 0.50이 된다.

   3. CUME_DIST

      파티션별 윈도우의 전체 건수에서 현재 행보다 작거나 같은 건수를 누적 백분율로

      결과값은 0 < x <= 1

      SQL서버 미지원

      같은 부서 소속 사원 집합에서 본인 급여가 누적 순서상 몇 번째일까?

      ```sql
      SELECT
      	DEPTNO, ENAME, SAL,
      	CUME_DIST() OVER(
        	PARTITION BY DEPTNO ORDER BY SAL DESC
        ) AS CD
      FROM EMP;
      ```

      | **DEPTNO** | **ENAME** | **SAL** | **CD** |
      | :--------: | :-------: | :-----: | :----: |
      |     10     |     K     |  5000   |  .33   |
      |     10     |     C     |  2450   |  0.67  |
      |     10     |     M     |  1300   |  1.00  |
      |     20     |     S     |  3000   |  0.40  |
      |     20     |     F     |  3000   |  0.40  |
      |     20     |     J     |  2975   |  0.60  |

      전체 건수가 세 건이면 0.3333 간격

      전체 건수가 다섯 건이면 0.2 간격

      같은 값이면 동일 순위를 부여한다

      이 때, 다른 윈도우 함수는 앞 행의 결과값을 따르지만 CUME_DIST는 뒤 행의 결과값을 따른다. 그래서 S와 F가 0.20이 아니라 0.40을 가진다. 

   4. NTILE

      파티션별 전체 건수를 인수 값으로 N등분한 결과값

      SQL서버 **지원**

      ```sql
      SELECT ENAME, SAL, NTILE(4) OVER (ORDER BY SAL DESC) AS NT
      FROM EMP;
      ```

      | **ENAME** | **SAL** | **NT** |
      | :-------: | :-----: | :----: |
      |     K     |         |   1    |
      |     F     |         |   1    |
      |     S     |         |   1    |
      |     J     |         |   1    |
      |     B     |         |   2    |
      |     C     |         |   2    |
      |     A     |         |   2    |
      |     T     |         |   2    |
      |     M     |         |   3    |
      |     W     |         |   3    |
      |     M     |         |   3    |
      |     A     |         |   4    |
      |     J     |         |   4    |
      |     S     |         |   4    |

      SAL은 각 파티션별(NT의 숫자가 바뀌면 파티션도 바뀐 것) 내림차순

      전체 건수는 14건이었다.

      NTILE(4)이므로 14를 4로 나눈다

      몫은 3 나머지는 2

      그럼 4개로 나눈 파티션에 3씩 분배 후 나머지는 앞의 파티션부터 하나씩 준다

      그래서 파티션 1, 2는 네 명씩 3, 4는 세 명씩이다

## TOP N 쿼리

1. ROWNUM 슈도 칼럼

   오라클에서 사용

   SQL 처리 결과 집합의 각 행에 대해 임시로 부여되는 일련번호

   원하는 만큼의 행을 가져오고 싶을 때 WHERE절에서 이용한다

   ```sql
   SELECT NAME FROM PLAYER
   WHERE ROWNUM <= 1; /* 1건의 행 */
   WHERE ROWNUM < 2; /* 1건의 행 */
   WHERE ROWNUM = N; /* N건의 행 */
   WHERE ROWNUM < N + 1; /* N건의 행 */
   ```

   ORDER BY와 함께 쓴다고 순위 높은 것을 추출하는 것은 아니다

   (데이터 추출 후 정렬 작업이 이루어지기 때문)

   높은 순위를 추출하고 싶다면 **인라인 뷰에서 먼저 데이터를 정렬**한 후  ROWNUM을 사용

   ```sql
   SELECT ENAME, SAL
   FROM (SELECT ENAME, SAL
        	FROM EMP
        	ORDER BY SAL DESC)
   WHERE ROWNUM <= 3;
   ```

2. TOP절

   SQL서버에서 사용

   결과 집합으로 출력되는 행의 수를 제한한다

   `TOP (expression) [Percent] [with TIES]`

   - expression: 반환할 행 수

   - percent: 쿼리 결과 집합에서 처음 expression%의 행만 반환(10%처럼)

   - with ties: order by절을 지정했을 때만 가능하다

     ​				 TOP N의 **마지막 행과 같은 값**이 있으면 추가 출력한다

   ```sql
   SELECT TOP(2) WITH TIES ENAME, SAL
   FROM EMP
   ORDER BY SAL DESC;
   ```

   TOP절 마지막에 컴마가 없다는 것!!

3. ROW LIMITING절

   오라클 12.1~ / SQL서버 2012~

   ANSI 표준 SQL 문법

   TOP N 쿼리 작성시 사용(없어도 괜찮다)

   ORDER BY절 다음에 작성한다(order by절이 있어야 한다)

   row와 rows는 구분하지 않는다

   `OFFSET offset ROW/ROWS`

   `FETCH FIRST/NEXT [rowcount/percent PERCENT] ROW/ROWS `
   `ONLY/WITH TIES`

   - OFFSET offset 건너뛸 행의 갯수
   - FETCH 반환할 행의 갯수나 백분율
   - ONLY 지정된 행의 갯수나 백분율만큼 행 반환

   ```sql
   SELECT EMPNO, SAL
   FROM EMP
   ORDER BY SAL, EMPNO
   	FETCH FIRST 5 ROWS ONLY;
   ```

   월급 낮은 순 다섯명

   ```sql
   SELECT EMPNO, SAL
   FROM EMP
   ORDER BY SAL, EMPNO
   	OFFSET 5 ROWS;
   ```

   월급 낮은 순인데 상위 5명(제일 월급 낮은 다섯명) 건너뛰고 출력

## 계층형 질의와 셀프 조인

테이블에 계층형 데이터가 있으면 계층형 질의로 조회해야 한다

계층형 데이터란 계층적으로 상위-하위가 나뉘는 데이터 ex) 관리자와 사원

**순환 관계 데이터 모델이란?** 셀프 조인이나 계층형 질의로 조회해야 하는 데이터로 사원인데 관리자도 되는 테이블을 순환 관계 데이터 모델이라고 한다

1. 셀프 조인

   동일 테이블 사이에 조인을 하는 것

   식별하기 위해서 ALIAS를 반드시 사용하자

   FROM절에 동일 테이블이 두 번 이상 나온다

   - 매니저를 JONES로 두고 있는 부하 사원?

     ```sql
     SELECT B.EMPNO, B.ENAME, B.MGR
     FROM EMP A, EMP B
     WHERE A.ENAME = 'JONES'
     	AND B.MGR = A.EMPNO;
     ```

     반대로 JONES의 관리자를 조회하려면

     두 번째 조건을 B.EMPNO = A.MGR로 바꾸면 된다

   - JONES의 부하의 부하 사원?

     ```sql
     SELECT C.EMPNO, C.ENAME, C.MGR
     FROM EMP A, EMP B, EMP C
     WHERE A.ENAME = 'JONES'
     	AND B.MGR = A.EMPNO
     	AND C.MGR = B.EMPNO;
     ```

   깊은 레벨의 노드를 조회하려면 셀프 조인이 반복되어야 한다

   그래서 오라클, SQL 서버는 순환관계 데이터 조회를 하기 위한 계층형 질의를 제공한다

2. 계층형 질의

   DBMS에 따라 다르다

   1. 오라클

      - ```sql
        SELECT ... FROM ... WHERE ... AND ...
        START WITH ... AND ...
        CONNECT BY [NOCYCLE] ... AND FK = PRIOR PK
        [ORDER SIBLINGS BY 컬럼명, 컬럼명,...];
        ```

        **START WITH**: 계층 구조 전개의 시작 위치. 액세스할 루트 데이터 지정. 생략 가능 1번만 수행한다

        **CONNECT BY**: 다음에 전개될 자식 데이터. 자식은 이 절의 조건 만족(조인). 결과가 없을 때까지 반복 수행한다

        **PRIOR**: connect by절(prior는 connect by, select, where에 사용 가능하다). 현재 읽을 칼럼을 지정한다
        (FK) = PRIOR (PK) : 부모 데이터 -> 자식 데이터로 순방향
        (PK) = PRIOR (FK) : 역방향

        **NOCYCLE**: 이미 나타났던 동일한 데이터가 또 나타나는 게 CYCLE로 런타임 오류가 나는데 이 옵션을 추가하면 오류가 나지 않는 대신 사이클이 발생하면 데이터 전개를 하지 않는다

        **ORDER SIBLINGS BY**: 형제 노드(동일 레벨) 사이에서 정렬

        루트1 - 자식, 루트2 - 자식처럼 루트가 2개 이상일 때,
        order siblings by에 의해 루트1 - 루트2 순이 되면
        루트1 - 자식(얘네도 지들 사이에서 order siblings by)한 다음에 
        루트2 - 자식순으로!

        **WHERE**: **모든 전개 수행 후**에 지정 조건을 만족하는 데이터만 추출한다(필터링)

        계층 쿼리는 WHERE절 다음에 기술하지만, 실제 실행 순서는 WHERE절보다 앞선다

      - 오라클은 계층형 질의시 가상 칼럼(슈도 칼럼) 제공

        **LEVEL**: 루트 데이터는 1. 그 하위 데이터는 2. 리프(leaf, 마지막) 데이터까지 1씩 증가

        계층 쿼리의 level은 전개방향 따라 다르다
        루트를 start with에서 정하기 나름..
        1 - 2 - 3 - 4 - 5에서 3이 역방향 전개 UNION 순방향전개를 하면
        3은 LV 1, 2, 4는 LV2, 1, 5는 LV3이 된다

        **CONNECT_BY_ISLEAF**: 전개 과정에서 리프 데이터는 1 아니면 0

        **CONNECT_BY_ISCYCLE**: 전개 과정에서 자식을 가진다 해당 데이터가 조상으로서 존재하면 1, 아니면 0. CYCLE 옵션을 사용했을 때만 가능하다

        ```sql
        SELECT 
        	LEVEL, 
        	LPAD(' ', (LEVEL-1)*2) || EMPNO AS EMPNO, MGR,
          CONNECT_BY_ISLEAF AS ISLEAF
        FROM EMP
        START WITH MGR IS NULL
        CONNECT BY MGR = PRIOR EMPNO;
        /*
        7876에서 상위 관리자를 찾는 역방향 전개
        START WITH EMPNO = 7876
        CONNECT BY EMPNO = PRIOR MGR;
        */
        ```

        LPAD는 결과 들여쓰기를 위해 쓴 것

        | **LEVEL** | **EMPNO** | **MGR** | **ISLEAF** |
        | :-------: | :-------: | :-----: | :--------: |
        |     1     |   7839    |    N    |     0      |
        |     2     |   7566    |  7839   |     0      |
        |     3     |   7788    |  7566   |     0      |
        |     4     |   7876    |  7788   |     1      |
        |     3     |   7902    |  7566   |     0      |
        |     4     |   7369    |  7902   |     1      |

        7839 =>7566 => 7788 => 7876

        ​						=> 7902 => 7369

        이렇게 1 => 2 => 3 => 4단계로 관리자에서 사원 순으로 들어간다

      - 오라클은 계층형 질의 중 편의를 위한 함수를 제공

        **SYS_CONNECT_BY_PATH(칼럼, 경로 분리자)**: 루트 데이터부터 현재 전개할 데이터까지의 경로 표시

        **CONNECT_BY_ROOT 칼럼**: 현재 전개할 데이터의 루트 데이터를 표시한다. 
        단항 연산자

        ```sql
        SELECT CONNECT_BY_ROOT(EMPNO) AS ROOT,
        	SYS_CONNECT_BY_PATH(EMPNO, ', ') AS PATH,
        	EMPNO, MGR
        FROM EMP
        START WITH MGR IS NULL
        CONNECT BY MGR = PRIOR EMPNO;
        ```

        | **ROOT** |     **PATH**      | **EMPNO** | **MGR** |
        | :------: | :---------------: | :-------: | :-----: |
        |   7839   |      , 7839       |   7839    |    N    |
        |   7839   |   , 7839, 7566    |   7566    |  7836   |
        |   ...    |                   |           |         |
        |   7839   |    ,7839, 7698    |   7698    |  7839   |
        |   7839   | ,7839, 7698, 7499 |   7499    |  7698   |

   2. SQL서버

      2000 버전 이후부터 계층형 질의 문법을 지원한다

      CTE(common table expression)를 재귀 호출: 테이블 내 데이터의 최상위부터 하위로 계층 구조를 전개한다. 그러나 실제와 달라서 order by절을 추가해야 한다

      ```sql
      WITH EMPLOYEES_ANCHOR AS (
      	SELECT EMPLOYEEID, LASTNAME, FIRSTNAME, 
        			REPORTSTO, 0 AS LEVEL
        FROM EMPLOYEES
        WHERE REPORTSTO IS NULL /* 재귀 호출의 시작점 */
        
        UNION ALL
        
        SELECT R.EMPLOYEEID, R.LASTNAME, R.FIRSTNAME,
        			R.REPORTSTO, A.LEVEL + 1
        FROM EMPLOYEES_ANCHORE A, EMPLOYEES R
        WHERE R.REPORTSTO = A.EMPLOYEEID
      )
      SELECT LEVEL, EMPLOYEEID, LASTNAME, FIRSTNAME, REPORTSTO
      FROM EMPLOYEES_ANCHOR;
      ```

      | **LEVEL** | **EMPLOYEEID** | **LAST** | **FIRST** | **REPORT** |
      | :-------: | :------------: | :------: | :-------: | :--------: |
      |     0     |       2        |          |           |     N      |
      |     1     |       1        |          |           |     2      |
      |     1     |       3        |          |           |     2      |
      |     1     |       4        |          |           |     2      |
      |     1     |       5        |          |           |     2      |
      |     1     |       8        |          |           |     2      |
      |     2     |       6        |          |           |     5      |

      WITH절에서  CTE 쿼리를 보면 UNION ALL로 두 쿼리가 결합된다

      둘 중 위의 쿼리를 **앵커 멤버**, 아래 쿼리를 **재귀 멤버**라고 한다

      재귀적 쿼리 실행 순서

      1. CTE식을 앵커 멤버와 재귀 멤버로 분할
      2. 앵커 멤버 실행 => 결과 집합(T0) 생성
      3. Ti는 입력으로 사용하고 Ti+1은 출력으로 사용해 지귀 멤버 실행
      4. 빈 집합을 반환할 때까지 3번을 반복
      5. 결과 집합 반환(이게 T0 ~ Tn까지의 UNION ALL)

      앵커 멤버가 시작점이자 outer 집합이 되어 inner 집합인 재귀 멤버와 조인한다 조인한 결과가 다시 outer 집합이 되어 재귀 멤버와 조인을 반복한다 조인 결과가 비어 더 이상 조인할 수 없으면 만들어진 결과 집합을 모두 합해서 리턴한다

      - 실제 조직도와 같은 결과를 출력하려면 CTE에 sort를 정렬용 칼럼으로 추가하여 쿼리 마지막에 order by조건을 추가한다(앵커 멤버와 재귀 멤버 양쪽에서 convert함수 등으로 데이터 형식을 일치시켜야 한다)

        ```sql
        WITH T_EMP_ANCHOR AS (
        	SELECT EMPLOYEEID, MANAGERID, 0 AS LEVEL,
          			CONVERT(VARCHAR(1000), EMPLOYEEID) AS SORT
        	FROM T_EMP
          WHERE MANAGERID IS NULL
          
          UNION ALL
          
          SELECT R.EMPLOYEEID, R.MANAGERID, A.LEVEL + 1,
          			CONVERT(VARCHAR(1000), A.SORT+','+R.EMPLOYEEID)
        	FROM T_EMP_ANCHOR A, T_EMP R
          WHERE R.MANAGERID = A.EMPLOYEEID
        )
        SELECT 
        	LEVEL, 
        	REPLICATE(' ', LEVEL * 2) + EMPLOYEEID AS EMPLOYEEID,
        	MANAGERID, SORT
        FROM T_EMP_ANCHOR
        ORDER BY SORT;
        ```

        | **LEVEL** | **EMPLOYEEID** | **MANAGERID** |      **SORT**       |
        | :-------: | :------------: | :-----------: | :-----------------: |
        |     0     |      1000      |       N       |        1000         |
        |     1     |      1100      |     1000      |      1000,1100      |
        |     2     |      1110      |     1100      |   1000,1100,1110    |
        |     2     |      1120      |     1100      |   1000,1100,1120    |
        |     3     |      1121      |     1120      | 1000,1100,1120,1121 |
        |     3     |      1122      |     1120      | 1000,1100,1120,1122 |
        |     1     |      1200      |     1000      |      1000,1200      |
        |     2     |      1210      |     1200      |   1000,1200,1210    |

   

## PIVOT절과 UNPIVOT절

PIVOT: 회전시키다

1. PIVOT절

   행을 열로 회전시킨다(전환)

   ```sql
   PIVOT [XML](
   	집계함수(표현식) [[AS] alias][, 집계함수...] /* 집계할 열 지정 */
   	FOR (컬럼명[, 컬럼명...]) /* 피봇할 열 지정 */
   	IN (표현식[, 표현식...] [[AS] alias] 
         | 서브쿼리
         | ANY[, ANY...]) /* 피봇할 열 값 지정 */
   )
   ```

   - 피봇절은 집계함수와 for절에 지정되지 않은 열을 기준으로 집계된다

     인라인 뷰로 사용할 열을 지정해야 한다

     ```sql
     SELECT *
     FROM (
     	SELECT JOB, DEPTNO, SAL
       FROM EMP
     )
     PIVOT (
       SUM(SAL)
     	FOR DEPTNO IN (10, 20, 30)
     )
     ORDER BY 1;
     ```

     | **JOB** | **10** | **20** | **30** |
     | :-----: | :----: | :----: | :----: |
     |    A    |   N    |  6000  |   N    |
     |    C    |  1300  |  1900  |  950   |
     |    M    |  2450  |  2975  |  2850  |
     |    D    |  5000  |   N    |   N    |
     |    S    |   N    |   N    |  5600  |

     `SUM(SAL) AS SAL FOR DEPTNO IN (10 AS D10, 20 AS D20, 30 AS D30)`  이렇게 하면 칼럼명이 D10_SAL(IN의 별칭_집계함수의 별칭), D20_SAL, D30_SAL로 바뀐다

     `SUM(SAL) AS SAL FOR DEPTNO IN (10, 20, 30)`으로만 바꾸면 10_SAL로..

     `SELECT D20_SAL` 이렇게 필요한 열만 조회하는 것도 가능하다

   - 다수의 집계함수가 지원된다

     ```sql
     SELECT *
     FROM (
     	SELECT JOB, DEPTNO, SAL
       FROM EMP
     )
     PIVOT (
       SUM(SAL) AS SAL, COUNT(*) AS CNT
     	FOR DEPTNO IN (10 AS D10, 20 AS D20)
     )
     ORDER BY 1;
     ```

     | **JOB** | **D10_SAL** | **D10_CNT** | **D20_SAL** | **D20_CNT** |
     | :-----: | :---------: | :---------: | :---------: | :---------: |
     |    A    |      N      |      0      |    6000     |      2      |
     |    C    |    1300     |      1      |    1900     |      2      |
     |    M    |    2450     |      1      |    2975     |      1      |
     |    D    |    5000     |      1      |      N      |      0      |
     |    S    |      N      |      0      |      N      |      0      |

   - FOR절에 다수의 열 기술 가능(IN절에 다중 열 사용)

     ```sql
     SELECT *
     FROM (
     	SELECT TO_CHAR(HIREDATE, 'YYYY') AS YYYY, JOB, DEPTNO, SAL
       FROM EMP
     )
     PIVOT (
       SUM(SAL) AS SAL, COUNT(*) AS CNT
     	FOR (DEPTNO, JOB) 
       IN ((10, 'A') AS D10A, (10, 'C') AS D10C, 
           (20, 'A') AS D20A, (20, 'C') AS D20C)
     )
     ORDER BY 1;
     ```

     | **YYYY** | **D10A_SAL** | **D10A_CNT** | **D10C_SAL** | **...** | **D20C_CNT** |
     | :------: | :----------: | :----------: | :----------: | :-----: | :----------: |
     |   1980   |      N       |      0       |      N       |         |      1       |
     |   1981   |      N       |      0       |      N       |         |      0       |
     |   1982   |      N       |      0       |     1300     |         |      0       |
     |   1987   |      N       |      0       |      N       |         |      1       |

   - 피봇절을 사용할 수 없으면 집계함수와  CASE 표현식으로!

     ```sql
     SELECT 
     	JOB, 
     	SUM(CASE DEPTNO WHEN 10 THEN SAL END) AS D10_SAL,
     	SUM(CASE DEPTNO WHEN 20 THEN SAL END) AS D20_SAL,
     	SUM(CASE DEPTNO WHEN 30 THEN SAL END) AS D30_SAL
     FROM EMP
     GROUP BY JOB
     ORDER BY JOB;
     ```

     | **JOB** | **D10_SAL** | **D20_SAL** | **D30_SAL** |
     | :-----: | :---------: | :---------: | :---------: |
     |    A    |      N      |    6000     |      N      |
     |    C    |    1300     |    1900     |     950     |
     |    M    |    2450     |    2975     |    2850     |
     |    D    |    5000     |      N      |      N      |
     |    S    |      N      |      N      |    5600     |

2. UNPIVOT절

   열이 행으로 전환된다

   ```sql
   UNPIVOT [{INCLUDE|EXCLUDE} NULLS](
   	(컬럼명[, 컬럼명...]) /* 언피봇된 값이 들어갈 열 */
   	FOR (컬럼명[, 컬럼명...]) /* 언피봇된 값을 설명할 값이 들어갈 열 */
   	IN (표현식[, 표현식...]) /* 언피봇할 열과 설명할 값의 리터럴 값 */
   )
   ```

   T1 테이블은 다음과 같다

   | **JOB** | **D10_SAL** | **D20_SAL** | **D10_CNT** | **D20_CNT** |
   | :-----: | :---------: | :---------: | :---------: | :---------: |
   |    A    |      N      |    6000     |      0      |      2      |
   |    C    |    1300     |    1900     |      1      |      2      |

   - ```sql
     SELECT JOB, DEPTNO, SAL
     FROM T1
     UNPIVOT INCLUDE NULLS (
     	SAL
       FOR DEPTNO
       IN (D10_SAL AS 10, D20_SAL AS 20)
     )
     ORDER BY 1, 2;
     ```

     | **JOB** | **DEPTNO** | **SAL** |
     | :-----: | :--------: | :-----: |
     |    A    |     10     |    N    |
     |    A    |     20     |   600   |
     |    C    |     10     |  1300   |
     |    C    |     20     |  1900   |

     EXCLUDE NULLS면 첫번째 행이 안 나오게 된다

   - ```sql
     SELECT *
     FROM T1
     UNPIVOT (
     	(SAL, CNT)
       FOR DEPTNO
       IN ((D10_SAL, D10_CNT) AS 10, (D20_SAL, D20_CNT) AS 20)
     )
     ORDER BY 1, 2;
     ```

     | **JOB** | **DEPTNO** | **SAL** | **CNT** |
     | :-----: | :--------: | :-----: | :-----: |
     |    A    |     10     |    N    |    0    |
     |    A    |     20     |   600   |    2    |
     |    C    |     10     |  1300   |    1    |
     |    C    |     20     |  1900   |    2    |

   - ```sql
     SELECT *
     FROM T1
     UNPIVOT(
     	(SAL, CNT)
       FOR (DEPTNO, DNAME)
       IN ((D10_SAL, D10_CNT) AS (10, 'Ac'), 
           (D20_SAL, D20_CNT) AS (20, 'Re')
     )
     ORDER BY 1, 2;
     ```

     | **JOB** | **DEPTNO** | **DNAME** | **SAL** | **CNT** |
     | :-----: | :--------: | :-------: | :-----: | :-----: |
     |    A    |     10     |    Ac     |    N    |    0    |
     |    A    |     20     |    Re     |  6000   |    2    |
     |    C    |     10     |    Ac     |  1300   |    1    |
     |    C    |     20     |    Re     |  1900   |    2    |

   - 언피봇절을 사용할 수 없으면 카티션 곱을 사용한다.

     언피봇할 열의 개수만큼 행을 복제하고 CASE로 언피봇할 열을 선택한다

     ```sql
     SELECT A.JOB,
     	CASE B.LV WHEN 1 THEN 10 WHEN 2 THEN 20 END AS DEPTNO,
     	CASE B.LV WHEN 1 THEN A.D10_SAL 
     						WHEN 2 THEN A.D20_SAL END AS SAL,
     	CASE B.LV WHEN 1 THEN A.D10_CNT 
     						WHEN 2 THEN A.D20_CNT END AS CNT
     FROM T1 A,
     		 (SELECT LEVEL AS LV FROM DUAL CONNET BY LEVEL <= 2) B
     ORDER BY 1, 2;
     ```

     | **JOB** | **DEPTNO** | **SAL** | **CNT** |
     | :-----: | :--------: | :-----: | :-----: |
     |    A    |     10     |    N    |    0    |
     |    A    |     20     |   600   |    2    |
     |    C    |     10     |  1300   |    1    |
     |    C    |     20     |  1900   |    2    |

   - ```sql
     UNPIVOT(
     	(SAL, CNT)
       FOR (DEPTNO, DNAME)
       IN ((D10_SAL, D10_CNT) AS (10, 'Ac'), 
           (D20_SAL, D20_CNT) AS (20, 'Re')...
       WHERE JOB = 'CLERK'
     )
     ```

     | **JOB** | **DEPTNO** | **DNAME** | **SAL** | **CNT** |
     | :-----: | :--------: | :-------: | :-----: | :-----: |
     |    C    |     10     |    Ac     |  1300   |    1    |
     |    C    |     20     |    Da     |  1900   |    2    |
     |    C    |     30     |    Ch     |   950   |    1    |

     ```sql
     UNPIVOT(
     	(SAL, CNT)
       FOR DEPTNO
       IN ((D10_SAL, D10_CNT) AS 10, 
           (D20_SAL, D20_CNT) AS 20...
       WHERE JOB = 'CLERK'
     )
     ```

     | **JOB** | **DEPTNO** | **SAL** | **CNT** |
     | :-----: | :--------: | :-----: | :-----: |
     |    C    |     10     |  1300   |    1    |
     |    C    |     20     |  1900   |    2    |
     |    C    |     30     |   950   |    1    |

     언피봇 컬럼 개수와 IN절의 컬럼 개수를 맞추고

     FOR절의 컬럼 개수와 IN절의  AS의 개수를 맞춘다

## 정규 표현식

문자열의 규칙을 표현하는 검색 패턴으로

문자열 검색 및 치환에 사용된다

1. 기본 문법

   1. POSIX 연산자

      - . [dot]: 모든 문자와 일치한다(new line 제외)

      - | [or]: 대체 문자를 구분한다

      - \ [backslash]: \의 다음 문자를 일반 문자로 취급한다

        ```sql
        SELECT REGEXP_SUBSTR('aab', 'a.b'),
        			 REGEXP_SUBSTR('adc', 'a.b')
        FROM DUAL;
        ```

        REGEXP_SUBSTR은 문자열에서 일치하는 패턴을 반환한다(없으면 NULL)

        상기 쿼리는 `aab, NULL`

        REGEXP_SUBSTR('a', 'a|b') => a

        REGEXP_SUBSTR('cd', 'ab|cd') => cd

        REGEXP_SUBSTR('a|b', 'a\\|b') => a|b(|가 문자로 처리된 것)

        REGEXP_SUBSTR('a|b', 'a|b') => a

      - ^ [캐럿]: 문자열의 시작

      - $: 문자열의 끝

        REGEXP_SUBSTR('ab'||'CHR(10)'||'cd', '^.', 1, 1) => a
        chr(10)은 개행 문자 반환
        전체 문자열의 첫번째 시작문자

        REGEXP_SUBSTR('ab'||'CHR(10)'||'cd', '^.', 1, 2) => null
        전체 문자열의 두번째 시작문자

        REGEXP_SUBSTR('ab'||'CHR(10)'||'cd', '.$', 1, 1) => d

        REGEXP_SUBSTR('ab'||'CHR(10)'||'cd', '.$', 1, 2) => null

      - 수량사

        선행 표현식의 일치 횟수를 지정한다

        패턴을 최대로 일치시키는 **GREEDY** 방식

        - ? : 0회/1회
        - \* : 0회 이상
        - \+ : 1회 이상
        - {m} : m회 일치
        - {m, } : 최소 m회 일치
        - {, m} : 최대 m회 일치
        - {m, n}: 최소 m회 최대 n회 일치

        REGEXP_SUBSTR('ac', 'ab?c') => ac (ac, abc 가능)

        REGEXP_SUBSTR('abc', 'ab?c') => abc

        REGEXP_SUBSTR('abbc', 'ab?c') => null

        REGEXP_SUBSTR('abc', 'ab?c') => abc

        REGEXP_SUBSTR('ac', 'ab*c') => ac

        REGEXP_SUBSTR('abc', 'ab*c') => abc

        REGEXP_SUBSTR('abbc', 'ab*c') => abbc(ac, abc, abbc, abbbc)

        REGEXP_SUBSTR('ac', 'ab+c') => null

        REGEXP_SUBSTR('abc', 'ab+c') => abc

        REGEXP_SUBSTR('abbc', 'ab+c') => abbc(abc, abbc, abbbc, abbbbc..)

        REGEXP_SUBSTR('ab', 'a{2}') => null

        REGEXP_SUBSTR('aab', 'a{2}') => aa

        REGEXP_SUBSTR('aab', 'a{3,}') => null

        REGEXP_SUBSTR('aaab', 'a{3,}') => aaa (aaa, aaaa...)

        REGEXP_SUBSTR('aaab', 'a{4, 5}') => null

        REGEXP_SUBSTR('aaaab', 'a{4, 5}') => aaaa(aaaa, aaaaa)

      - (expr) : 검색 패턴의 시작과 끝 지정. 괄호 안을 하나의 단위로 취급한다

        REGEXP_SUBSTR('ababc', '(ab)+c') => ababc(abc, ababc..) 

        REGEXP_SUBSTR('ababc', 'ab+c') => abc(abc, abbc..)

        REGEXP_SUBSTR('abd, 'a(b|c)d') => abc(abc, acd)

        REGEXP_SUBSTR('abd', 'ab|cd') => ab(ab, cd)

      - \n : n번째 서브 표현식과 일치하는 식

        n은 1~9 사이의 정수

        역 참조. 일치한 서브 표현식을 재참조 가능하게 한다.

        반복 패턴 검색 및 서브 표현식 위치 변경에 활용

        REGEXP_SUBSTR('abxbc', '(ab|cd)x\1') => abxab(abxab, cdxcd)

        REGEXP_SUBSTR('abxef', '(ab|cd)x\1') => null

        REGEXP_SUBSTR('ababab', '(.*)\1+') => ababab

        REGEXP_SUBSTR('abcabc', '(.*)\1+') => abcabc

        REGEXP_SUBSTR('abcabd', '(.*)\1+') => null

      - 문자리스트

        문자를 대괄호로 묶은 표현식

        리스트 중 한 문자만 일치하면 일치하는 것

        [] 내부의 하이픈(-)은 범위 연산자로 작동한다

        - [char] : 문자 리스트 중 한 문자와 일치

        - [^char] : 문자 리스트에 포함되지 않은 한 문자와 일치

          [ab]c => ac, bc

          [^ab]c => ac, bc가 아닌 문자열

          \[0-9][a-z] => 숫자 + 영소문자로 두 자리

          \[^0-9]\[^a-z] => 문자 + (영소문자 아닌 것)으로 두 자리

        - [:digit:] = [0-9]

        - [:lower:] = [a-z]

        - [:upper:] = [A-Z]

        - [:alpha:] = [a-zA-Z] 영문자

        - [:alnum:] = [0-9a-zA-Z] 영문자와 숫자

        - [:xdigit:] = [0-9a-fA-F] 16진수

        - [:punct:] = \[^[:alnum:]\[:cntrl:]] 구두점 기호

        - [:blank:] : 공백 문자

        - [:space:] : 공간 문자(스페이스, 엔터, 탭)

   2. PERL 정규 표현식 연산자

      - \d : 숫자 [[:digit:]]

      - \D : 숫자 외 모든 문자 \[^[:digit:]]

      - \w : 숫자와 영문자(언더바 포함) [[:alnum:]_]

      - \W : 숫자와 영문자 외 모든 문자(언더바 제외) \[^[:alnum:]_]

      - \s : 공백 문자 [[:space:]]

      - \S : 공백 문자 외 모든 문자 \[^[:space:]]

        REGEXP_SUBSTR('(650)555-0100', `'^\(\d{3})\d{3}-\d{4}$'`) => (650)555-0100 (괄호 없으면 null)

        REGEXP_SUBSTR('b2b', '\w\d\D') => b2b

        REGEXP_SUBSTR('b22', '\w\d\D) => null

        REGEXP_SUBSTR(`'jdoe@company.co.uk'`, `'\w+@\w+(\.\w+)+'`) => `'jdoe@company.co.uk'`  (\.\w+)+는 `.숫자문자`가 1회 이상 반복된다는 뜻

        REGEXP_SUBSTR('to:bill', '\w+\W\s\w+') => to:bill

        REGEXP_SUBSTR('(a b )', `'\(\w\s\w\s\)'`) => (a b )  

        REGEXP_SUBSTR('(a,b.)', `'\(\w\S\w\S\)'`) => (a,b.)  

      - perl은 UNGREEDY 방식!(최소한만!)

        - ?? : 0회/1회 일치

        - *? : 0회 이상

        - +? : 1회 이상

        - {m}? : m회

        - {m,}? : 최소 m회

        - {, m}? : 최대 m회

        - {m, n}? : 최소 m회 최대 n회

          REGEXP_SUBSTR('aaaa', 'a??aa') => aa(nongreedy 패턴 최소로 일치)

          REGEXP_SUBSTR('aaaa', 'a?aa') => aaa(greedy 패턴 최대로 일치)

          REGEXP_SUBSTR('xaxbxc', '\w*?x\w') => xa

          REGEXP_SUBSTR('xaxbxc', '\w*x\w') => xaxbxc

          REGEXP_SUBSTR('abxcxd', '\w+?x\w') => abxc

          REGEXP_SUBSTR('abxcxd', '\w+x\w') => abxcxd

          REGEXP_SUBSTR('aaaa', 'a{2}?') => aa 

          REGEXP_SUBSTR('aaaa', 'a{2}') => aa

          REGEXP_SUBSTR('aaaaa ', 'a{2, }?') => aa

          REGEXP_SUBSTR('aaaaa ', 'a{2,}') => aaaaa

          REGEXP_SUBSTR('aaaaa ', 'a{2, 4}?') => aa

          REGEXP_SUBSTR('aaaaa ', 'a{2, 4}') => aaaa

   * WHERE C1 LIKE '1_\%%' ESCAPE `'\'`;

     escape 문자를 \로 지정한 것

     x1...%y: x는 아무 것도 없어야 하고 y는 있어도 되고 없어도 된다

2. 정규 표현식 조건과 함수

   1. REGEXP_LIKE(source_char, pattern[, match_param])

      source_char와 pattern이 일치하면 true, 아니면 false 반환

      source_char: 검색할 문자열

      pattern: 검색할 패턴

      match_param: 일치 옵션

      - c: 대소문자 구분. 기본값
      - i: 대소문자 무시
      - n: dot(.)를 개행 문자와 일치시킴
      - m: 다중 행 모드
      - x: 검색 패턴의 공백문자 무시
      - inmx처럼 다수옵션 선택 가능

      ```sql
      SELECT FIRST, LAST
      FROM EMPLOYEES
      WHERE REGEXP_LIKE(FIRST, '^Ste(v|ph)en$');
      ```

      Ste로 시작하고 v나 ph 다음에 en으로 끝나는 행 ex) Stephen, Steven

   2. REGEXP_REPLACE(source_char, pattern[, replace_str[, position[, occurrence[, match_param]]]])

      source_char에서 일치한 pattern을  replace_str로 **변경한 문자값** 반환

      position: 검색 시작 위치. 기본값은 1

      occurrence: 패턴 일치 횟수. 기본값은 1

      ```sql
      SELECT PHONE, REGEXP_REPLACE(
        PHONE, 
        '([[:digit:]]{3})\.([[:digit]]{3})\.([[:digit]]{4})', 
        '(\1) \2-\3'
      ) AS C1
      FROM EMPLOYEES;
      ```

      패턴은 `숫자 3자리.숫자 3자리.숫자 4자리`

      세번째 인자로 나온 것은 형식으로 `(첫 번째 일치) 두 번째 일치-세 번째 일치`

      | **PHONE**          |             **C1** |
      | :----------------- | -----------------: |
      | 650.121.2004       |     (650) 121-2004 |
      | 011.44.1344.429268 | 011.44.1344.429268 |

      두 번째 행은 패턴이 일치하지 않아 C1이 PHONE을 변형하지 않은 문자열 그대로 반환했다

      

      `SELECT REGEXP_REPLACE('1A2B3C4D', '\D')`

      1A2B3C4D에서 숫자를 제외한 모든 문자를 세번째 인자가 없으므로 제거하고

      (세번째 인자가 있었다면 세번째 인자로 바꿈.)

      남는 것을 반환한다 

      => 1234

   3. REGEXP_SUBSTR(source_char, pattern[, position[, occurrence[, match_param[, subexpr]]]])

      source_char에서 일치하는 pattern 반환

      subexpr: 서브 표현식(0은 전체, 1 이상은 서브 표현식. 기본값은 0. 1 이상이면 ()로 감싸진 것 중에 일치하는 n번째 표현식을 반환하라는 것)

      REGEXP_SUBSTR(`'http://www.example.com/products'`, `'http://([[:alnum:]]+\.?)'`) => `http://www.example.com/`

      REGEXP_SUBSTR('1234567890', '(123)(4(56)(78))', 1, 1, 'i', 1') => 123

      REGEXP_SUBSTR('1234567890', '(123)(4(56)(78))', 1, 1, 'i', 4') => 78

      ```sql
      SELECT REGEXP_SUBSTR('AABABCABCD', '(AB)C\1') FROM DUAL;
      ```

      => ABCAB

      역 참조(`\`)를 활용해 일치하는 서브 표현식의 재참조가 가능하다

      

      `SELECT REGEXP_SUBSTR('http://www.abc.com/efg', '([^:/]+)', 1, 2) AS C1 FROM DUAL;`

      `:`나 `/`를 포함하지 않는 문자 뭉탱이를 전체 문자열(http~efg)에서 찾는데,

      첫번째 문자부터(기본값이 1인데 여기서는 세번째 인자로 직접 지정해줌)

      두번째 일치한 것을(네번째 인자) 반환하라

      => 첫번째 일치한 `http` 건너뛰고

      `://` 건너뛰고

      두번째 일치한 `www.abc.com`반환한다

   4. REGEXP_INSTR(source_char, pattern[, position[, occurrence[, return_opt[, match_param[, subexpr]]]])

      source_char에서 일치한 pattern의 시작 위치를 정수로 반환

      return_opt: 반환 옵션. 0은 시작 위치로 기본값. 1은 다음 위치

      REGEXP_INSTR('1234567890', '(123)(4(56)(78))', 1, 1, 0, 'i', 1) => 1

      REGEXP_INSTR('1234567890', '(123)(4(56)(78))', 1, 1, 0, 'i', 2) => 4

      REGEXP_INSTR('1234567890', '(123)(4(56)(78))', 1, 1, 0, 'i', 4) => 7

   5. REGEXP_COUNT(source_char, pattern[, position[, match_param]])

      source_char에서 일치한 pattern의 횟수 반환

      REGEXP_COUNT('123123123123123', '123', 1) => 5

      REGEXP_COUNT('123123123123', '123', 3) => 3