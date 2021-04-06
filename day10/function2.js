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
    
    // 함수 선언문
    function add(x, y) {
        return x + y;
    }

    // 함수 출력
    console.dir(add);

    // 함수 호출
    console.log(add(2, 5)); // 7

    // 함수 선언문은 함수 이름을 생략할 수 없다.
    //function (x,y) {}   // Uncaught SyntaxError: Function statements require a function name

}

if (exec[2]) {
    
    // 기명 함수 리터럴을 단독으로 사용하면 함수 선언문으로 해석된다.
    // 함수 선언문에서는 함수 이름을 생략할 수 없다.
    function foo() { console.log('foo'); }
    foo();  // foo (자바스크립트가 암묵적으로 생성한 식별자다.)

    // 함수 리터럴을 피연산자로 사용하면 함수 선언문이 아니라 함수 리터럴 표현식으로 해석된다.
    // 함수 리터럴에서는 함수 이름을 생략할 수 있다.
    (function bar() { console.log('bar'); });
    //bar();  // Uncaught ReferenceError: bar is not defined
    
}

if (exec[3]) {

    //function add (x,y) {    return x + y;   }
    // 이 코드는 암묵적으로
    var add = function add(x, y) { return x + y};
    // 이런 식으로 해석된다.
    // 함수 객체를 가리키는 식별자(var add)가 암묵적으로 생성된다.

    console.log(add(3, 5)); // 8
}

if (exec[4]) {
    
    // 함수 표현식
    // 함수명은 생략할 수 있다. (익명 함수라고 한다.)
    let add2 = function (x, y) {
        return x + y;  
    };

    // 변수가 식별자이므로 변수명으로 호출한다.
    console.log(add2(2, 5)); // 7

    // 물론 함수명을 구지 써줄 수는 있다. (기명 함수라고 한다.)
    let add3 = function foo (x, y) {
        return x + y;
    };

    // 하지만 변수가 식별자이므로 변수명으로 호출한다.
    console.log(add3(2, 5)); // 7
    // 변수라는 식별자가 있으므로 별도로 함수 식별자를 만들지 않는다.
    console.log(foo(3, 5)); // undefined

}

if (exec[5]) {
    
    // 함수 참조
    console.dir(add);   // ƒ add(x, y)  함수 호이스팅 발생
    //console.dir(sub);   // Uncaught ReferenceError: Cannot access 'sub' before initialization

    // 함수 호출
    console.log(add(2, 5)); // 7    함수 호이스팅 발생
    console.log(sub(2, 5)); // Uncaught ReferenceError: Cannot access 'sub' before initialization

    // 함수 선언문
    function add(x, y) {
        return x + y;
    }

    // 함수 표현식
    let sub = function (x, y) {
        return x + y;
    };

    // 함수 선언문과 함수 표현식의 함수 생성 시점이 다르다.
    // 선언문은 런타임(Runtime) 이전에 자바스크립트 엔진에 의해 먼저 생성된다.
    // undefined로 초기화 되는 변수와는 달리 함수는 객체로 초기화 된다.

}