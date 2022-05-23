## 관계형 데이터베이스

### 데이터베이스

파일 시스템은 하나의 파일에 여러 사용자가 동시에 입력/수정/삭제가 불가능해서

동시 사용하려면 데이터 파일을 복사해야 한다.

데이터가 복사되면 데이터의 정합성을 보장하기가 힘들다

물론, 단일 사용자/단일 애플리케이션이라면 DB보다 파일 시스템이 효율적이다

DB가 커지면서 

- 효율적 관리
- 손상 예방
- 데이터 복구가 필요해졌다

그래서 나온 것이 DBMS(DataBase Management System).

- 보안 기능 제공(인증된 사용자)
- 제약조건 설정 => 데이터 무결성(Integrity)
- 갑작스런 장애로부터 데이터 보호 및 복구

RDBMS는 정규화, 동시성 관리, 병행 제어 등의 기능을 제공한다

메타 데이터를 총괄 관리할 수 있고

체계화, 표준화하는데 유용하다

### SQL

Structured Query Language

관계 데이터베이스에서 데이터 정의/조작/제어하는 언어

독립된 하나의 개발 언어

데이터를 집합처럼 취급한다

- DML 조작: select(retrieve), insert, update, delete 
  데이터 조회/변형
- DDL 정의: create, alter, drop, rename 
  스키마, 도메인, 뷰, 인덱스, 테이블 정의 생성/변경/삭제
- DCL 제어: grant, revoke
  DB 접근 및 사용 권한 관련 명령
- TCL 트랜잭션 제어: commit, rollback
  작업 단위 별로 제어

호스트 프로그램 속에 삽입되어 사용되는 DML은 데이터 부속어(Data Sub Language)

- AS-IS: DML은 비절차적 데이터 조작어로
  사용자가 무슨 데이터 원하는지만 명세 **WHAT**
- TO-BE: PL/SQL(오라클), T-SQL(SQL 서버)같은 절차적 데이터 언어는
  어떻게 데이터에 접근해야하는지 명세 **HOW**

### 데이터 유형

칼럼을 정의할 때 지정하는 데이터의 유형과 크기

1. Character(s): CHAR

   고정 길이 문자열

   할당된 값이 s보다 작으면 남은 공간을 공백으로 채운다

   기본 길이는 2byte

2. Varchar(s): VARCHAR

   가변 길이 문자열

   일종의 limit 개념으로 할당된 값의 바이트만큼만 차지한다

   최소 길이는 1byte

   ex) a='ㄱㄴㄷ', b='ㄱㄴㄷ '(b에는 공백이 있음)

   ​		char이면 뒤의 공백을 채워서 비교하므로 a = b

   ​		varchar이면 공백도 b의 문자이므로 a != b

3. Numeric: NUMBER

   정수, 실수 등 숫자 정보

   오라클은 NUMBER  타입만 있지만

   SQL 서버는 10개 이상 있다

   NUMBER(8, 2): 전체 자리수는 8자리, 정수 부분은 6자리, 소수점 부분은 2자리 

4. DATETIME

   날짜와 시각 정보

   오라클은 1초 단위: DATE

   SQL 서버는 3.33ms 단위:  DATETIME

- NUMBER(4)인 컬럼에 1234.5를 넣으려고 하면 반올림해서 1235

- NUMBER(5, 2)의 범위는 -999.99~999.99

  0.0001도 이 범위에 속한다

- NUMBER(2, 5)의 범위는 -0.00099~0.00099

- SELECT '1000'||(40-NULL)||'0' - 100 as NUM;

  '1000'||(40-NULL)||'0'

  = '1000'||NULL||'0'

  = '10000'

  '10000' - 100

  = 10000 - 100 = 9900



## SELECT문

### SELECT

- SELECT [ALL / DISTINCT] 칼럼명, 칼럼명, ... FROM 테이블명;

  ALL은 기본값으로 중복 데이터도 다 출력한다

  DISTINCT는 중복 데이터는 1건만 출력한다(GROUP BY를 써도 중복 제거 효과)

- SELECT * FROM 테이블명;

  테이블의 전체 데이터 조회

- SELECT PLAYER_NAME [AS] 선수명 FROM PLAYER;

  AS는 생략 가능하다

  공백, 특수문자, 대소문자 등을 포함하면 ""를 사용한다

  칼럼 별칭이 다른 칼럼명과 동일하다면 별칭에 우선순위가 간다

- 테이블 별칭을 지정했으면(칼럼 별칭처럼 AS 생략 가능) SELECT, WHERE에서는 별칭을 사용해야만 한다(안 쓰면 에러가 난다)

- 오라클의 경우, SELECT 문장에 Select절과 From 절 두 개가 필수

  테이블이 필요하지 않은 연산을 할 경우('I want to know a length'의 길이를 구하고 싶을 때!) DUAL 테이블을 활용한다

  SELECT LENGTH('I want to know a length') FROM DUAL;

- DUAL 테이블

  사용자 SYS의 소유. 모든 사용자가 접근 가능

  일종의 dummy 테이블로 형식적으로 테이블이 필요할 때 사용한다

  DUMMY라는 문자열 칼럼에 'x'값이 있는 행 1건이 포함되어 있다

### 산술 연산자와 합성 연산자

- 산술 연산자

  NUMBER, DATE 자료형에 적용

  사칙연산과 동일함

  괄호로 우선순위를 지정할 수 있다

  (), *, /, +, -

  SELECT HEIGHT - WEIGHT AS '키 - 몸무게', PLAYER_NAME FROM PLAYER;

- 합성 연산자(concatenation)

  문자와 문자를 연결하는 합성연산자

  오라클은 ||, SQL 서버는 +

  CONCAT 함수: CONCAT(S1, S2)

  칼럼과 문자 또는 칼럼과 칼럼도 가능

  새로운 칼럼을 생성한다

## 함수

### 내장 함수

함수 입력 값이 단일행이면 단일행 함수

아니면 다중행 함수: 집계 함수, 그룹 함수, 윈도우 함수..

- 단일행 함수(/이 있으면 앞은 오라클 뒤는 SQL 서버)

  - 문자형: 입력값 문자 => 출력값 문자/숫자

    lower, upper, ascii, concat, length/len, ltrim, trim...

  - 숫자형: 숫자 => 숫자

    abs, mod, sin, log, round...

  - 날짜형: Date 타입 연산

    sysdate/getdate, to_number(to_char(d, 'yyyy'|'MM'|'DD'))

  - 변환형: 문자/숫자/date 등의 타입 변환

    cast, to_number, to_char, to_date

  - NULL 관련

    NVL/ISNULL, NULLIF, COALESCE특징

    - select, where, order by절에 사용 가능
    - 각 행들에 대해 개별적으로 작용해 데이터 값 조작, 각 행에 대한 결과 리턴
    - 여러 인자여도(argument) 결과는 하나만 리턴
    - 함수의 인자로 상수/변수/표현식 사용 가능
    - 보통 함수의 중첩 가능(함수의 인자로 함수 사용): 특별한 예외 있음

### 문자형 함수

- 문자 => 문자/숫자

LOWER(s)

UPPER(s)

ASCII(s/n): 아스키 코드 번호 반환

CHR/CHAR(ASCII 번호): 해당 문자 반환

CONCAT(s1, s2): 오라클은 ||, SQL 서버는 +가 같은 역할

SUBSTR/SUBSTRING(s, m[, n]): 문자열의 m 위치에서 n개의 길이에 해당하는 문자 반환
	n이 생략되면 마지막까지!

LENGTH/LEN(s)

LTRIM(s[, 지정문자]): 문자열의 왼쪽부터 훑다가 지정문자가 나타나면 제거한다
	지정문자 생략시 공백이 제거되는데
	SQL 서버는 지정문자 사용이 불가능하다

RTRIM(s[, 지정문자])
	공백 제거와 chat-varchar 데이터 비교에 쓰인다

TRIM([leading|trailing|both] 지정문자 FROM s)
	머리말/꼬리말/양쪽의 지정문자 제거. SQL 서버는 [] 설정 불가.
	both가 기본값이라  SQL  서버도 both

- `LENGTH(C1) - 1` 이것을 위치로 한다면?

  만약 C1의 값이 'ABC'라면 B 자리

  마지막보다 하나 앞자리

- LENGTH(SUBSTR('ABCDEF', 2, 4))

  LENGTH(SUBSTR('GHI', 2, 4))

  2번째 자리부터 문자 4개 잘라서 반환해서 그 길이를 구한다

  BCDE => 4

  문자의 길이가 부족해서 4개를 못 자르면? 있는 만큼만 자른다

  HI 두 개만! => 2

- LENGTH(LTRIM('000120300', '0'))

  LENGTH(LTRIM('0760500', '0'))

  왼쪽부터 0을 제거하다가 다른 문자를 만나면 남는 것을 반환해서 그 길이를 구한다

  '120300' => 6

  '760500' => 6

- MIN('12400', '930', '4070', '2340')'

  '12400'

  숫자가 아니라 문자 비유임

  첫번째 문자가 1이라 제일 작아서
  
- LPAD(SAL, 4, '0') || 'ENAME'

  - SAL이 800이면 => 0800ENAME
  - SAL이 29756이면 => 2975ENAME

  왼쪽부터 4글자를 끊는다. 

  만약 주어진 문자가 4자리가 안 되면 0으로 빈자리를 **왼쪽부터** 채운다

### 숫자형 함수

- 숫자 => 숫자

ABS(-15) => 15: 절댓값

SIGN(-20) => -1: 음수/0/양수 => -1/0/1 

MOD(7, 3) => 1: 7을 3으로 나눈 나머지

CEIL/CEILING(38.123) => 39: 크거나 같은 최소 정수(-38.123이면 -38)

FLOOR(38.123) => 38: 작거나 같은 최대 정수

ROUND(38.5235, 1) => 38.5: 두 번째 인자자리로 반올림. 생략시 기본값은 0(정수)

TRUNC(38.5235, 3) => 38.523: 두 번째 인자자리로 내림. 생략시 기본값은 0. 
	SQL 서버는 없음
	TRUNC(15000/2000) => 7: 몫만 구한다

SIN, COS, TAN(n): 숫자의 삼각함수 값

EXP(2) => 7.3890561: 숫자의 지수 값. 즉 e의 숫자 제곱 값

POWER(2, 3) => 8: 2의 세제곱. 숫자의 거듭제곱 값. 

SQRT(4) => 2: 숫자의 제곱근 값

LOG(10, 100) => 2: 10이 밑수일 때 100의 로그 값
	SQL 서버는 lOG(100, 10)해야 같은 결과가 나온다

LN(7.3890561) => 2: 숫자의 자연 로그 값(LOGe숫자)
	SQL서버는 없음

### 날짜형 함수

SYSDATE / GETDATE(): 현재 날짜와 시각

EXTRACT('YEAR'|'MONTH'|'DAY' from d) 
/ DATEPART('YEAR'|'MONTH'|'DAY', d)
: 날짜 데이터에서 연/월/일 출력. 시/분/초도 가능

TO_NUMBER(TO_CHAR(d, 'YYYY')) / YEAR(d)

TO_NUMBER(TO_CHAR(d, 'MM')) / MONTH(d)

TO_NUMBER(TO_CHAR(d, 'DD')) / DAY(d)

:날짜 데이터에서 연/월/일 출력
TO_NUMBER로 감싸주지 않으면 문자형으로 출력

- DB는 날짜를 숫자로 저장하기 때문에 덧셈/뺄셈이 가능하다
  - 날짜 + 숫자 = 날짜: day를 더함
  - 날짜 - 숫자 = 날짜
  - 날짜1 - 날짜2 = 날짜1에서 날짜2를 뺀 일수
  - 날짜 + 숫자/24 = 날짜: 날짜에 시간을 더한다(숫자는 기본적으로 day인데 그것에 24를 나눴으니까 시간을 더한 것)
    - 1/24/60: 1분
    - 1/24/(60/10): 10분
    - 1/24/60/60: 1초

- ADD_MONTHS(TRUNC(2020-06-16 14:30:30, 'MM'), -1*12)

  TRUNC 결과: 월(MM) 밑으로는 내림 => 2020-06-01 00:00:00 

  여기에 -12개월을 더한다 = 1년을 뺀다

  => 2019-06-01 00:00:00

### 변환형 함수

- 명시적 데이터 유형 변환

  암시적 데이터 유형 변환: 성능 저하 및 에러 가능

TO_NUMBER(s) / CAST(표현식 AS 데이터타입[(길이)])
: 숫자로 변환 가능한 문자열을 숫자로 변환한다 / 표현식을 목표 타입으로 변환한다

TO_CHAR(n/d [, FORMAT]) / CONVERT(타입 [(길이)], 표현식 [, style])
: 주어진 format 형태 문자열로 / 주어진 스타일 형태의 목표 데이터 타입으로

TO_DATE(s [, FORMAT]) / CONVERT(타입 [(길이)], 표현식 [, style])

- TO_CHAR(SYSDATE, 'YYYY/MM/DD') => 2019/09/28
- TO_CHAR(SYSDATE, 'YYYY.MON,DAY') => 2019.9월, 토요일
- CONVERT(VARCHAR(10), GETDATE(), 111) =>  2019-09-28(이게 111스타일 형태)
- 숫자형, 날짜형의 포맷은 벤더별로 다양하다

### CASE 표현

if-then-else처럼 비교 연산이 가능하다

```sql
IF SAL > 2000
	THEN REVISED_SAL = SAL
	ELSE REVISED_SAL = 2000
END IF
```

```sql
CASE
	WHEN SAL > 2000 THEN SAL
	ELSE 2000
END AS REVISED_SAL
```

위의 두 표현은 같은 결과를 만든다

- ```sql
  CASE
  	조건 (WHEN A = B / WHEN A > B THEN C)
    [ELSE 기본값]
  END
  ```

  ELSE 구문 생략시 기본값은  NULL

- CASE 표현식에는 searched_case 표현식이 있고 simple_case 표현식이 있다

  ```sql
  /* searched_case */
  
  CASE
  	WHEN LOC = 'NY' THEN 'EAST'
  	ELSE 'ETC'
  END AS AREA
  
  /* simple_case */
  
  CASE LOC
  	WHEN 'NY' THEN 'EAST'
  	ELSE 'ETC'
  END AS AREA
  ```

- 오라클은 WHEN A = B 조건만 사용 가능하고 DECODE 함수를 쓴다

  DECODE(표현식, 기준값1, 값1 [, 기준값2, 값2, ...] [, 기본값])

  표현식이 기준값1과 같다면 값1을 반환하고..

  모든 기준값이 일치하지 않다면 기본값을 반환한다(기본값이 없다면 NULL)

- 조건은 여러개 쓸 수 있다

  ```sql
  CASE LOC
  	WHEN 'NEWYORK' THEN 'EAST'
  	WHEN 'BOSTON'THEN 'EAST'
  	ELSE 'ETC'
  END AS AREA
  ```

- 중첩이 가능하다(함수니까)

  ```sql
  CASE
  	WHEN SAL >= 2000 THEN 1000
  	ELSE (CASE
         		WHEN SAL >= 1000 THEN 500
         		ELSE 0
         	END)
  END AS BONUS
  ```

### NULL 관련 함수

- NVL / IS NULL(표현식1, 표현식2)

  값이 NULL일 때 다른 값으로 출력하려고 할 때 유용

  표현식1이 NULL이면 표현식2의 값을 출력한다

  두 표현식의 결과 데이터 타입은 같아야 한다

  NVL함수를 다중행 함수의 인자로 사용하면 불필요한 부하가 발생한다
  (어차피 다중행함수는 NULL을 뺀 행에 대해 계산하기 때문)

- NULL과 공집합

  조건에 맞는 데이터가 한 건도 없는 경우가 공집합이다
  SELECT 1 FROM DUAL WHERE 1 = 2; 이게 공집합

  NVL/IS NULL은 공집합을 변환할 수는 없다

  스칼라 서브쿼리나 집계함수를 쓰면(MAX, AVG...) 공집합이 NULL처럼 표시된다
  그 때, NVL/IS NULL을 써서 변환하면 된다

- NULLIF(표현식1, 표현식2)

  표현식1 = 표현식2이면 NULL, 아니면 표현식1을 반환한다

  똑같은 데이터가 있으면 NULL을 표시하는 칼럼을 만들 때 쓴다

  SELECT NAME, MGR, NULLIF(MGR, 7098) AS NUIF FROM EMP;

- COALESCE(표현식1, 표현식2,  ...)

  인수의 숫자는 제한되어 있지 않음

  표현식1부터 차례대로 훑어서 NULL이 아닌 최초의 표현식을 반환한다

  모두 널이면 널을 반환한다

  

- SELECT NVL(MAX(주문순번), 0) + 1 FROM 주문상세
  WHERE 주문번호 = V_주문번호;

  이 주문에서(WHERE로 같은 주문번호 제한을 뒀으니까) 이미 존재하는 주문순번 중 가장 큰 값에 1을 더하겠다

  이미 3건의 주문상세가 있다면 이번 주문상세는 4가 된다

  NVL은 맨 처음 주문상세는 기존 주문순번이 없으므로 그것을 대비함

  MAX(NVL(주문순번, 0)) + 1은 비효율적이다. 상기했듯이 다중행함수의 인자로 NVL을 쓰지 말자

## WHERE절

원하는 데이터 검색을 위해 where를 쓴다

FROM절 뒤에 위치한다(조회하려는 데이터에 조건을 다는 거라서)

where절에 조건이 없는 FTS(Full Table Sca) 문장은 SQL 튜닝의 1차 검토 대상이 된다. (무조건 나쁘다는 건 아니다!)

- 사용되는 연산자

  - 비교 연산자: =, >, >=, <, <=

    부정비교 연산자: !=, ^=, <>(IOS표준, 모든 OS 가능), 

    ​	NOT 칼럼명 = (~와 같지 않다), NOT 칼럼명 > (~보다 크지 않다)

  - SQL 연산자

    [NOT] BETWEEN a AND b: a와 b 사이(a, b 포함 - not이면 포함 안 함)

    [NOT] IN (list)

    LIKE '비교문자열'

    IS [NOT] NULL

  - 논리 연산자: AND, OR, NOT

  - 연산자 우선순위

    1. 괄호
    2. 비교 연산자, SQL 연산자
    3. NOT
    4. AND
    5. OR

- WHERE (year_date = '2014' AND month_date BETWEEN '11' AND '12') OR (year_date = '2015' AND month_date BETWEEN '01' AND '03')
  => 2014/11 ~ 2015/03

- 비교 연산자

  char, varchar같은 문자형 타입을 가진 칼럼을 특정 값과 비교하려면 특정값을 따옴표로 묶어야 한다.(숫자형은 불필요)

  두 char 타입을 비교하는 경우 길이가 다르면,
  짧은 쪽의 뒤에 공백을 추가해 길이를 같게 한 뒤 비교한다

  숫자유형 칼럼이 숫자로 변환 가능한 문자열(Alpha Numeric)과 비교되면 문자열을 숫자로 바꾼다
  where height >= '170': 문자형이지만 170으로 변환해서 비교한다

- SQL 연산자

  - IN 연산자의 다중 리스트

    MGR이면서 20번 부서이거나 CLERK이면서 30번 부서?

    WHERE (JOB, DEPTNO) IN (('MGR', 20), ('CLERK', 30));

    WHERE JOB IN ('MGR', 'CLERK') AND DEPTNO IN (20, 30);은 직업이 MGR이거나 CLERK이고 부서가 20이거나 30인 경우이므로 결과가 달라진다

  - LIKE

    WHERE A LIKE 'abc'; A의 값이 abc와 같을 때

    - 와일드카드: 문자를 대신해서 사용하는 특수문자

      **%** 0개 이상의 문자

      **_** 문자 1개

    WHERE NAME LIKE '장%'; 장씨 성을 가진 사람

    ![LIKE 예제](https://user-images.githubusercontent.com/52478972/159900995-62848820-facf-4ffe-9f1e-20b2a7c2e845.png)

  - IS NULL

    NULL은 값이 존재하지 않으므로 어떤 값보다 크거나 작지도 않고
    공백이나 0과 달리 비교도 불가능하다

    수치 연산은 NULL값을 리턴한다

    비교 연산은 FALSE를 리턴한다

    WHERE POSITION = NULL은 거짓을 리턴하므로 데이터를 찾을 수 없다

    WEHRE POSITION IS NULL을 해야 NULL값을 찾을 수 있다

## Group By, Having절

### 집계 함수

Aggregate function

- 여러 행들의 그룹이 모여 그룹당 하나의 결과를 돌려준다
- group by절은 행들을 소그룹화한다
- select, having, order by절에 사용 가능하다



- 집계함수명 ([DISTINCT|ALL] 칼럼/표현식)

  ALL은 기본값

  DISTINCT는 같은 값을 하나의 데이터로 간주한다

주로 숫자 유형에 사용되지만,
MAX, MIC, COUNT는 문자/날짜 유형에도 사용 가능하다
MIN(d) => 가장 빠른 날짜

- COUNT(*) NULL을 포함한 행의 수

  COUNT(표현식) 표현식 값이  NULL인 것을 제외한 행의 수

  COUNT(DISTINCT 표현식) UNIQUE한 표현식 값 행의 수

- SUM(표현식) NULL을 제외한 합계

- AVG

- MAX

- MIN

- STDDEV(표현식) 표현식의 표준 편차

- VARIANCE/VAR(표현식) 표현식의 분산



- **GROUP BY절에 있는 칼럼이 SELECT문으로 나올 수 있다**

  **GROUP BY절에 없는 칼럼이 SELECT문으로 나올 수 없다**

  **GROUP BY절에 없는 칼럼이 SELECT문으로 나오려면 집계함수를 사용해야 한다**

- 그룹함수가 중첩되면 최종 결과값은 1건이다

  SELECT ID, CODE, AVG(COUNT(*)) FROM TAB
  GROUP BY ID, CODE;

  오류가 난다 AVG(COUNT(*))는 1건이라서!

- SELECT POSITION, AVG(HEIGHT) AS 평균키 FROM PLAYER;

  오류가 난다 POSITION 칼럼과 AVG(HEIGHT)를 동시에 썼기 때문

  포지션 없이 AVG만 있으면 전체 평균키 출력

  (GROUP BY 없이 SELECT에서 집계함수 사용 가능)
  
- SELECT JOB, HIREDATE FROM EMP GROUP BY JOB;

  오류가 난다 hiredate가 group by 절에 없으므로 select에 쓰려면 집계 함수 적용

### Group By

FROM절과 WHERE절 뒤에 위치한다

데이터들을 소그룹화하여 각 그룹별 통계 정보를 얻을 때 사용한다

- 특성
  - GROUP BY절로 기준을 정하고  SELECT절에 집계함수를 사용한다
  - 집계함수의 통계 정보는 NULL값을 가진 행을 제외한다
  - ALIAS명을 사용할 수 없다
  - 집계함수는 WHERE절에 올 수 없다
  - WHER절은 데이터를 그룹으로 나누기 전에 행들을 미리 제거하고
    HAVING절은 GROUP BY절의 기준 항목이나 소그룹의 집계함수를 이용한 조건을 표시할 수 있다.

### Having

소그룹의 데이터 중 일부만 필요한 경우에 사용

GROUP BY절로 소그룹을 만들고 HAVING절로 제한 조건을 적용한다

HAVING절은 보통 GROUP BY절 뒤에 위치한다
(앞에 와도 상관은 없다. 단, SQL 서버는 앞에 오면 에러가 난다)

- 키가 180 이상인 사람들의 포지션별 평균키?

  ```sql
  SELECT POSITION, ROUND(AVG(HEIGHT), 2)
  	FROM PLAYER
  GROUP BY POSITION
  	HAVING AVG(HEIGHT) >= 180;
  ```

  having절을 where절로 만들어서 group by 위로 올린다면, where절에는 집계함수를 못 써서 에러가 난다

- 데이터 중 일부만 필요한 경우

  1. Where 조건으로 필요한 데이터를 추출한 후 Group By
  2. Group By 조건으로 소그룹을 만든 후 Having절로 필터링

  where 조건으로 필터링을 할 경우 group by의 계산 대상을 줄일 수 있다

  where절의 조건을 변경하면 대상 데이터 개수가 변경되고 결과값이 변경될 수 있다

  having절의 조건은 변경된다고 해도 결과가 변경되는 것이 아니다. 출력되는 레코드 수가 변경되는 것이다.

- **GROUP BY가 없어도 HAVING을 쓸 수 있다!!**

### CASE 표현을 활용한 월별 데이터 집계

부서별로 월별 입사자의 평균 급여 구하기

```sql
SELECT
	DEPTNO,
	AVG(CASE MONTH WHEN 1 THEN SAL END) AS M01,
	AVG(CASE MONTH WHEN 2 THEN SAL END) AS M02,
	AVG(CASE MONTH WHEN 3 THEN SAL END) AS M03,
	AVG(CASE MONTH WHEN 4 THEN SAL END) AS M04,
	AVG(CASE MONTH WHEN 5 THEN SAL END) AS M05,
	AVG(CASE MONTH WHEN 6 THEN SAL END) AS M06,
	AVG(CASE MONTH WHEN 7 THEN SAL END) AS M07,
	AVG(CASE MONTH WHEN 8 THEN SAL END) AS M08,
	AVG(CASE MONTH WHEN 9 THEN SAL END) AS M09,
	AVG(CASE MONTH WHEN 10 THEN SAL END) AS M10,
	AVG(CASE MONTH WHEN 11 THEN SAL END) AS M011,
	AVG(CASE MONTH WHEN 12 THEN SAL END) AS M012
FROM
   (SELECT ENAME, DEPTNO, EXTRACT(MONTH FROM HIREDATE) AS MONTH, SAL
     FROM EMP)
GROUP BY DEPTNO;
```

ELSE절 쓰려면

AVG(CASE MONTH WHEN 1 THEN SAL ELSE 0 END) 이렇게 쓴다

### 집계합수와 NULL

다중행함수는 자체적으로 NULL인 행을 제외하므로 NVL 쓸 필요가 없다

- SELECT AVG(COL3) FROM TABLE;

  이 때, COL3에 20과 NULL만 존재한다면

  20/1건이다(NULL은 건수에서도 제외된다)

CASE 표현에서 ELSE절 생략하면 기본값이 NULL 

- ELSE절에 0같은 상수를 지정한 CASE 표현에 집계함수를 사용하면 불필요한 연산을 하게 만든다
- DECODE 함수의(오라클) 4번째 인자를 지정하지 않으면 기본값이 NULL이 된다

SUM(NVL(SAL, 0)은 불필요한 연산을 하게 만든다

- NULL일 때 0을 출력하고 싶을 때는 전체 연산 결과에 쓰면 된다
- NVL(SUM(SAL), 0)

## Order by절

### 정렬

특정 칼럼을 기준으로 조회한 데이터를 정렬한다

칼럼을 나타낼 때는 `칼럼명`, `SELECT절의 ALIAS명`, `SELECT절의 칼럼 순서를 나타낸 정수` 세 개를 혼용할 수 있다

- SELECT C3, C1, C2 FROM TABLE
  ORDER BY 1 DESC, 2;

  테이블에는  C1, C2, C3순으로 들어가 있어도

  select절의 순서가 적용된다

  그래서 첫 번째 칼럼를 기준으로 내림차순 정렬한 뒤, 두 번째 칼럼을 기준으로 오름차순 정렬한다

  SELECT절의 첫 번째 칼럼인 C3 DESC => 두 번째 칼럼인 C1 ASC

기본값은 오름차순이다

- ASC 기본값. 오름차순
  DESC 내림차순

- 숫자형의 오름차순은 가장 작은 값부터

  날짜형의 오름차순은 가장 빠른 날짜부터(01-JAN-2012가 01-SEP-2012보다 앞에 오게 됨)

- 오라클은 NULL을 가장 큰 값으로 간주해서 오름차순시 가장 마지막에 온다

  SQL서버는 이와 반대로 간주한다

ORDER BY 칼럼명 [ASC/DESC];

SELECT절에 쓸 수 있는 항목이 올 수 있다

- 집계함수를 사용할 수 있다

- SELECT절에 없는 칼럼이어도 사용할 수 있다(대상 테이블 안에는 있어야 한다)

  - SELECT DISTINCT
  - GROUP BY
  - SELECT UNION

  위 세 가지 경우에는 SELECT절에 있는 칼럼만 ORDER BY에 올 수 있다

- group by절을 수행한 뒤 DB는 그룹핑 관련 칼럼들로 집합을 새로 만든다

  개별 데이터는 버리기 때문에,

  group by절을 수행한 이후 수행되는 select절이나 order by 절에서 개별 데이터를 사용하면 에러가 난다

  집계 칼럼을 사용하자(`order by sum(sal)`)

### SELECT문 실행 순서

```sql
SELECT 칼럼명 [[AS] ALIAS명]
		FROM 테이블명
	WHERE 조건식
	GROUP BY 칼럼/표현식
		HAVING 그룹조건식
	ORDER BY 칼럼/표현식;
```

1. **FROM** 발췌 대상 테이블을 참조하고
2. **WHERE** 발췌 대상이 아닌 데이터를 제거한 뒤
3. **GROUP BY** 데이터를 소그룹화한다
4. **HAVING** 그룹핑된 값 중 조건 맞는 것을 추출해서
5. **SELECT** 데이터를 출력한다
6. **ORDER BY** 출력된 데이터를 정렬한다.

물리적 순서가 아니라 논리적 순서!

옵티마이저가 SQL 문장 에러 점검하는 순서와 동일한다



- SELECT 지역, SUM(매출) AS 매출합계 
  FROM TABLE
  GROUP BY 지역
  ORDER BY 년 DESC;

  오류가 난다

  지역으로 그룹화했는데 년으로 정렬을 할 수 없기 때문



## 조인

### 개요

두 개 이상의 테이블을 연결해 데이터를 출력한다

정규화를 위해 필요

관계형 데이터베이스의 큰 장점

보통 PK, FK를 통해 조인을 하는데 아니어도 가능하다

FROM절에 여러 테이블이 나열되더라도 SQL은 두 개의 집합씩 조인을 처리한다

- A, B, C가 나열되면 특정 두 개 테이블을 먼저 조인하고
- 중간 데이터 집합과 남은 테이블을 조인한다
- 테이블 조인 순서는 DBMS가 결정한다

조인 조건을 쓸 때, 꼭 `테이블명.칼럼명` 이렇게 써야 되는 건 아닌데 쓰는 게 좋다

- SELECT절에서 칼럼명을 테이블명과 함께 기재하지 않았는데
  조인하는 테이블에 동일한 칼럼명이 있으면 에러가 난다

만약 테이블명에 ALIAS 적용했으면
WHERE절과  SELECT절에는 ALIAS를 써야만 한다(안 쓰면 에러)

### 등가 조인

Equi Join

두 테이블 간의 칼럼 값이 정확히 일치할 때!

대개 PK-FK 관계를 기반으로 한다(아니어도 가능)

JOIN의 조건은 WHERE절에 기술한다(`=` 이용)

- FROM PLAYER, TEAM
  WHERE TEAM.TEAM_ID = PLAYER.TEAM_ID;
- ON절에 기술하기도 한다(`=` 이용. ANSI/ISO SQL 표준)
- FROM PLAYER INNER JOIN TEAM
  ON TEAM.TEAM_ID = PLAYER.TEAM_ID;

INNER JOIN 대상 테이블이 N개일 때,
필요한 조인 조건은 N-1개 이상

- SELECT COUNT(*) FROM Ta, Tb
  	WHERE Tb.C1 = Ta.C1;

  | Ta   | C1   | C2   | Tb   | C1   | C2   |
  | ---- | ---- | ---- | ---- | ---- | ---- |
  |      | 1    | a    |      | 1    | 1    |
  |      | 2    | b    |      | 1    | 2    |
  |      | 3    | c    |      | 3    | 1    |
  |      |      |      |      | 3    | 2    |
  |      |      |      |      | 4    | 1    |

  4

  (1-a-1-1),(1-a-1-2),(3-c-3-1),(3-c-3-2)



### 비등가 조인

Non-Equi Join

두 테이블 간에 논리적인 연관 관계는 있으나 칼럼 값들이 일치하지 않을 때!

= 연산자가 아니라 `Between, >, >=, <, <=` 등을 사용한다

데이터 모델에 따라 비등가 조인이 불가능한 경우도 있다



사원의 급여가 어떤 급여등급에 속하는지 출력하시오

```sql
SELECT A.NAME 이름, A.SAL 급여, B.GRADE 급여등급
		FROM EMP A, SALGRADE B
	WHERE A.SAL BETWEEN B.LOSAL AND B.HISAL;
```

급여등급 테이블은 GRADE, LOSAL, HISAL로 구성되어 

급여가 LOSAL에서 HISAL 사이에 있다면 해당 등급을 가져온다

### 3개 이상의 테이블 조인하기

선수별 홈그라운드 경기장을 출력하시오

```sql
FROM PLAYER A, TEAM B, STADIUM C
WHERE B.TEAM_ID = A.TEAM_ID
	AND C.STADIUM_ID = B.STADIUM_ID;
```

선수, 팀, 운동장 테이블을 조인해야 하는데,

선수와 운동장 사이에 팀이 있어야만 연관 관계를 가진다

### 외부 조인

Outer Join

Inner join은(등가 조인, 비등가 조인) 조인 결과가 참인 행만 반환하는데

outer join은 조인 조건을 만족하지 않는 행들도 반환한다

- 테이블1의 모든 값에 대해 테이블2의 데이터가 존재한다는 보장이 없을 때,

  테이블1의 데이터는 전부 출력하고 테이블2는 조인 조건을 만족하는 데이터만 출력한다

  조인에 실패한(짝이 안 맞는) 칼럼 값은 NULL

  아래는 오라클의 outer join 예시이다

  ```sql
  WHERE 테이블2.조인칼럼명(+) = 테이블1.조인칼럼명;
  ```

  `(+)`를 테이블1.칼럼명 뒤에 붙이면 테이블2가 기준이 된다
  
- 오라클의 (+)를 ANSI문으로

  ```sql
  FROM A, B
  WHERE A.ID = B.ID(+)
  	AND B.DELETE(+) = 'N'
  	AND A.USAGE = 'Y';
  	
  /* ANSI */
  FROM A
  	LEFT OUTER JOIN B
  	ON (A.ID = B.ID
       AND B.DELETE = 'N')
  WHERE A.USAGE = 'Y';
  ```

  

## 표준 조인

### FROM절 조인 형태(ANSI/ISO)

1. inner join
2. natural join
3. using 조건걸
4. on 조건절
5. cross join
6. outer join

전통적인 방법은 where절을 사용하는 것이고

상기 6가지 방법은 ANSI/ISO SQL에서 규정한 것으로

둘 중 어느 것을 해도 무관하다

단, SQL서버는 ON 조건절만 지원하고 NATURAL JOIN, USING 조건절은 지원하지 않는다

### INNER JOIN

내부 조인

조건을 만족하는 행들만 반환한다

전통적으로 where절에 기술하던 조인을 from절에서 정의하는 것으로
`using절`이나 `on절`을 필수로 사용해야 한다

- SELECT * 

  FROM EMP A, DEPT B

  WHERE B.DEPTNO = A.DEPTNO;

- SELECT *

  FROM EMP A [INNER] JOIN DEPT B

  ON B.DEPTNO = A.DEPTNO;

위의 두 sql 문장은 같은 결과를 만든다

내부 조인이 조인의 기본값이라서 INNER 키워드를 생략할 수 있다

### NATURAL JOIN

두 테이블 간에 동일한 이름을 갖는 **모든** 칼럼들에 대해 등가 조인한다

내츄럴 조인은 USING, ON, WHERE로 조건을 정의할 수 없다

SQL서버는 지원하지 않는다

- FROM EMP A NATURAL [INNER] JOIN DEPT B;

  별도의 조인 조건을 지정하지 않는다

- SELECT A.EMPNO, B.DEPTNO, B.DNAME
  FROM EMP A NATURAL JOIN DEPT B;

  **내츄럴 조인에 사용된 열은(두 테이블간 동일한 칼럼, 기준 칼럼) 식별자를 가질 수 없다**

  select절에서 기준 칼럼을 출력할 때,	

  `테이블.기준칼럼` 이렇게 기재하면 에러가 난다

  DEPTNO가 A, B 사이에 동일한 칼럼이라서 내츄럴 조인에 사용된 열인데

  해당 칼럼을 ALIAS나 테이블명으로 제한하면 에러가 난다

- 조인이 되는 테이블의 데이터 성격과(도메인) 칼럼명 등이 동일해야 한다

- SELECT *로 하면 기준 칼럼이 먼저 출력되고 기준 칼럼은 한 번만 출력된다

  이너 조인은 기준 칼럼 두 개 다 출력

- 동일한 두 테이블이 있다

  각 테이블에는 ColA, ColB, ColC가 있는데

  ColA의 값을 몇 행 바꾼 뒤 내츄럴 조인을 하면 

  ColB, ColC 값은 여전히 두 테이블이 동일하더라도 ColA가 다르므로

  값이 바뀐 행들은 제외된다

  내츄럴 조인 결과는 ColA, ColB, ColC 세 개가 출력된다

  이는 세 칼럼 모두 기준 칼럼이 되었으므로

  중복 없이 하나씩만 출력된 것이다

  만약 이너 조인을 했다면(이너 조인을 하면 세 칼럼에 대한 조건절 명시 필요)

  ColA, ColB, ColC, ColA, ColB, ColC 이렇게 여섯 개가 출력된다
  
- SELECT SUM(C1) FROM Ta NATURAL JOIN Tb;

  | Ta   | C1   | C2   | Tb   | C1   | C3   |
  | ---- | ---- | ---- | ---- | ---- | ---- |
  |      | 1    | a    |      | 1    | a    |
  |      | 2    | b    |      | 1    | b    |
  |      | 3    | c    |      | 2    | b    |
  |      |      |      |      | 3    | c    |
  |      |      |      |      | 3    | a    |
  |      |      |      |      | 4    | b    |

  10(1 + 1 + 2 + 3 + 3)

### USING

같은 이름을 가진 칼럼들 중에서 원하는 칼럼에 대해서만 등가 조인하고 싶을 때

SQL서버는 지원하지 않는다

```sql
SELECT * FROM DEPT A JOIN A_TEMP B
	USING (DEPTNO);
```

기준칼럼은 한 번만 출력되고

select절에서 명시하지 않았다면 기준칼럼을 맨 앞에 둔다

`USING(ColA, ColB)`처럼 여러 개를 쓸 수 있다

내츄럴 조인처럼 기준 칼럼을 ALIAS 등으로 한정지어서는 안 된다

### ON

칼럼명이 달라도 조인을 할 수 있다 

```sql
SELECT * FROM EMP A JOIN DEPT B
	ON (B.DEPTNO = A.DEPARTMENT);
```

on절의 ()는 생략 가능

using절은 조인 칼럼에 alias나 테이블명을 쓰면 에러지만

on절은 alias, 테이블명을 써 주는 게 좋다(안 쓴다고 에러가 나는 건 아니지만)

on, where 혼용 가능

on절에 join 조건 외에도 데이터 검색 조건을 추가할 수 있다

- 검색은 where절에 쓰는 것이 권장된다

- 아우터 조인에서 조인 대상 제한 모적일 때는 on에 추가 조건 기술 가능

  ```sql
  FROM EMP A JOIN DEPT B
  	ON B.DEPTNO = A.DEPTNO
  		AND A.MGR = 7698;
  ```

  AND 뒤의 데이터 검색 조건은 where로 만드는 것이 좋다

다중 테이블 조인

```sql
SELECT * 
	FROM EMP A 
		JOIN DEPT B
			ON B.DEPTNO = A.DEPTNO
		JOIN A_TEMP C
			ON C.DEPTNO = B.DEPTNO;
```

### CROSS JOIN

일반 집합 연산자의 PRODUCT 개념으로
테이블간 조인 조건이 없을 때 생길 수 있는 모든 데이터의 조합

두 개의 테이블에 대한 카티시안 곱(CARTESIAN PRODUCT / CROSS PRODUCT)

결과는 양쪽 집합의 M * N

- FROM EMP A CROSS JOIN DEPT B;

  EMP의 행 14개 DEPT의 행 4개

  => 크로스 조인 결과 56건(14 * 4)
  
- SELECT COUNT(*) FROM Ta, Tb
  WHERE Ta.C1 >= 2
  AND Tb.C2 IN('b', 'c');

  | Ta   | C1   | C2   | Tb   | C1   | C2   |
  | ---- | ---- | ---- | ---- | ---- | ---- |
  |      | 1    | a    |      | 1    | a    |
  |      | 2    | b    |      | 1    | b    |
  |      | 3    | c    |      | 2    | a    |
  |      | 4    | d    |      | 3    | b    |
  |      |      |      |      | 3    | c    |
  |      |      |      |      | 4    | d    |

  9(Ta의 조건 만족 3행 * Tb의 조건 만족 3행)

where절에 조건을 추가할 수 있다. 이러면 이너 조인이랑 같아짐



### OUTER JOIN

조인 조건을 FROM에서 쓴다

outer join의 기준 테이블(아우터 집합)은 조인에 실패해도 최종 결과에 포함된다

USING/ON절 필수

#### LEFT [OUTER] JOIN

먼저 표기된 좌측 테이블 데이터를 읽은 후,
우측 테이블에서 조인 대상 데이터를 읽는다

조인 조건을 만족하는 값이 없을 경우 우측 테이블의 칼럼 값은 NULL이 된다

- SELECT SUM(B.PRICE) / COUNG(DISTINCT A.NUM)
  	FROM 고객 A, 주문 B
  WHERE B.CODE(+) = A.NUM
  	AND B.PRICE(+) > 10000;

  | 고객 | NUM  | NAME | 주문 | NUM  | CODE | PRICE |
  | ---- | ---- | ---- | ---- | ---- | ---- | ----- |
  |      | 1    | K    |      | 2001 | 1    | 40000 |
  |      | 2    | N    |      | 2002 | 2    | 15000 |
  |      | 3    | D    |      | 2003 | 2    | 7000  |
  |      | 4    | C    |      | 2004 | 2    | 8000  |
  |      |      |      |      | 2005 | 2    | 20000 |
  |      |      |      |      | 2006 | 3    | 5000  |
  |      |      |      |      | 2007 | 3    | 9000  |

  18750

  - 결과

    | NUM  | NAME | NUM  | CODE | PRICE |
    | ---- | ---- | ---- | ---- | ----- |
    | 1    |      |      |      | 40000 |
    | 2    |      |      |      | 15000 |
    | 2    |      |      |      | 20000 |
    | 4    |      | NULL | NULL | NULL  |
    | 5    |      | NULL | NULL | NULL  |

    (40000 + 15000 + 20000) / 4

  

#### RIGHT [OUTER] JOIN

#### FULL [OUTER] JOIN

좌측, 우측 테이블의 모든 데이터를 조인한다

조인에 성공한 행은 한 번만 표시한다

![full outer join](https://user-images.githubusercontent.com/52478972/161968831-a045a590-5e1e-49a2-816d-aa5128f3d545.png)

- OUTER JOIN의 예시(EMP-DEPT순서)

  | EMP  | A(PK) | B    | C(FK) | DEPT | C(PK) | D    | E    |
  | ---- | ----- | ---- | ----- | ---- | ----- | ---- | ---- |
  |      | 1     | b    | w     |      | w     | 1    | 10   |
  |      | 3     | d    | w     |      | z     | 4    | 11   |
  |      | 5     | y    | y     |      | v     | 2    | 12   |

  ![outer joins](https://user-images.githubusercontent.com/52478972/161974096-17170513-5fc1-4408-b31b-26151c3be146.png)