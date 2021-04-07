let exec = {
      1 : true
    , 2 : true
    , 3 : true
    , 4 : true
    , 5 : true
    , 6 : true
    , 7 : true
};



if (exec[1]) {

    // 함수 선언문. 매개변수 x, y를 지정한다.
    function add (x, y) {
        return x + y;
    }

    // 함수 호출
    // 인수 1과 2가 매개 변수 x와 y에 순서대로 할당되고 함수 몸체의 문들이 실행된다.
    var result = add(1, 2);
    console.log(result);    // 3

    
    // 함수 표현식
    let ex1 = function (x, y) {
        console.log(x, y);
    };

    // 함수 호출
    ex1(3, 5);  // 3 5

    // 매개 변수가 할당되지 않아도 그대로 실행된다.
    // 매개 변수는 함수가 호출될 때 undefined로 초기화 된다.
    ex1(3);     // 3 undefined 

    // 할당되지 않는 매개변수가 들어올 경우 무시한다.
    // 하지만 초과 된 인수들은 모두 암묵적으로 arguments 객체의 프로퍼티에 보관된다.
    ex1(3, 5, 7, 8, 9, 10);     // 3 5

}


if (exec[2]) {

    // 인수의 타입 체크
    let add = function (x, y) {
        if (typeof x !== 'number' || typeof y !== 'number') {
            // 매개변수를 통해 전달된 인수가 타입이 부적절할 경우 예외 처리한다.
            throw new TypeError('인수는 모두 숫자 값이어야 합니다.');
        }

        return x + y;
    };

    
    // console.log(add(2));            // Uncaught TypeError: 인수는 모두 숫자 값이어야 합니다.
    // console.log(add('a', 'b'));     // Uncaught TypeError: 인수는 모두 숫자 값이어야 합니다.

    
    // 단축평가를 이용한 인수의 기본값 부여
    let add2 = function (a, b, c) {
        // 매개변수가 들어오지 않았을 때(undefined) 기본값 부여.
        a = a || 0;
        b = b || 0;
        c = c || 0;
        return a + b + c;
    };

    console.log(add2(1, 2, 3));     // 6
    console.log(add2(1, 2));        // 3
    console.log(add2());            // 5


    // ES6에서 도입된 매개변수 기본값 사용
    // 초기값을 직접 할당할 수 있다.
    let add3 = function (a = 0, b = 0, c = 0) {
        return a + b + c;
    };

    console.log(add3(1, 2, 3));     // 6
    console.log(add3(1, 2));        // 3
    console.log(add3());            // 5

}


if (exec[3]) {

    function multiply(x, y) {
        return x * y; // 반환문
        // 반환문 이후에 존재하는 소스는 실행되지 않고 무시된다.
        console.log('무시 갥!');
    }

    // 함수 호출은 반환값으로 평가된다.
    let result = multiply(3, 5);
    console.log(result);    // 15


    // 반환문을 별도로 할당하지 않으면 undefined가 반환된다.
    let foo = function() {
        return;
    };

    console.log(foo());     // undefined

    // 반환문을 생략하면 암묵적으로 undefined가 반환된다.
    let foo2 = function() {
        
    };

    console.log(foo2());    // undefined

    // 함수 외부에서 쓰면 문법 에러 발생.
    return; // Uncaught SyntaxError: Illegal return statement

}