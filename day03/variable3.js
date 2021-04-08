let exec = {
     1 : false
    ,2 : false
    ,3 : true
};



if (exec[1]) {
    
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

}


if (exec[2]) {

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

}


if (exec[3]) {

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

}