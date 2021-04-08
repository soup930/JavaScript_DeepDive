변수의 자료형 1 (원시 타입 Primitive Type)
=======================
JS 변수는 자료형이 나눠져 있지는 않지만 변수에 저장된 값들은 명백히 타입이 나눠져서 해석된다.      
각 타입들의 특징을 모른다면 JS 소스를 단 한 줄도 제대로 작성하지 못할 것이다.

## 숫자(Number) 타입
1. 모든 숫자 타입은 실수 타입(64비트 부동소수점 형실)으로 해석된다.   
2. 모든 숫자 타입은 10진수로 해석된다.   
3. 산술 연산이 불가하다는 의미의 NaN 값이 있다.   

```javascript
    // JS 변수는 여러 형태의 숫자 타입을 자유롭게 저장 할 수 있다.
    // 왜냐하면 JS엔진은 정수를 위한 타입이 없고 모든 수를 실수로 처리하기 때문이다.
    let integer = 10;   // (정수 같은) 실수
    let double = 10.11;  // 실수
    let negative = -10; // 음의 (정수 같은) 실수

    // 값 뿐만 아니라 데이터 타입까지 같은 실수이다.
    console.log(10 === 10.00);  // true


    let binary = 0b01000001;        // 2진수
    let octal = 0o101;              // 8진수
    let hex = 0x41;                 // 16진수

    // JS 엔진은 2,8,16 진수를 표현 하는 데이터 타입을 제공하지 않는다.
    // 이들 값은 모두 10진수로 해석된다.
    console.log(binary);    // 65
    console.log(octal);     // 65
    console.log(hex);       // 65

    // 10진수 데이터 타입으로 해석되기 때문에 같은 데이터 타입으로 해석된다.
    console.log(binary === octal);   // true
    console.log(octal === hex);      // true
    

    // 숫자 타입의 특별한 값 세 가지
    // NaN의 경우는 타입 에러 발생 시 종종 볼 수 있는 값이다.
    console.log(10 / 0);    // Infinity
    console.log(10 / -0);   // -Infinity
    console.log(1 * 'String');  // NaN
```

## 문자열(String) 타입
1. UTF-16 방식으로 대부분의 언어와 문자를 표현 할 수 있다.   
2. 작은따옴표(''), 큰따옴표(""), ES6부터는 백틱(``)으로 표현 할 수 있다.   
3. 위의 방식으로 감싸진 부분만 문자열로 해석되며 다른 토큰들과 구별 할 수 있다.
4. + 연산자를 이용하여 문자열 값들을 연결 할 수 있다.   
5. 문자열 내부의 줄바꿈 등의 처리는 이스케이프 시퀀스를 사용한다.   

```javascript
    // 문자열 타입
    let string;
    string = '문자열';   // 작은 따옴표
    string = "문자열";   // 큰 따옴표
    string = `문자열`;   // 백틱(ES6)
    string = 12345 + '5' // 숫자 타입을 문자열 타입으로 변환

    string = '작은따옴표 안에 "큰따옴표"는 문자열로 인식된다.';
    string = "큰따옴표 안에 '작은따옴표'는 문자열로 인식된다.";


    // 문자열 타입과 이스케이프 시퀀스
    let qoat = "이건 탭 \t 이건 엔터 \n 이건 큰따옴표 \" 이건 작은따옴표\'";
    let backtic = `이건 탭  이건 엔터
    이건 큰따옴표 " 이건 작은따옴표 '`;

    console.log(qoat);
    console.log(backtic);


    // 문자열 타입의 삽입
    let module1 = '난 말이지';
    let module2 = '정말 피곤해.';

    // 따옴표 문자열의 연결
    console.log('오늘 진짜 ' + module1 + ' ' + module2);
    // 백틱 문자열의 연결 (ES6)
    console.log(`오늘 진짜 ${module1} ${module2}`);
```

## 그 이외의 타입
1. 메모리가 비어 있을 때(쓰레기 값을 참조할 때) JS 엔진에 의해 undefined가 초기화 된다.   
2. null 값도 있는데, 그냥 scope가 튀었다 싶으면 쓰는 거다.

```javascript
     // 논리적 참 거짓을 나타내는 boolean 타입
    let foo = true;
    console.log(foo);   // true

    foo = false;
    console.log(foo);   // false


    // JS 엔진이 할당 되지 않은 메모리에 초기화 한 값 undefined
    var foo2;
    console.log(foo2);   // undefined


    // 사용자가 값에 대한 참조를 명시적으로 제거하는 의미의 null
    let garbage = 'trash';
    console.log(garbage)    // trash

    garbage = null;
    console.log(garbage);   // null
```