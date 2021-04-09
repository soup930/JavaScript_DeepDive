let exec = {
      1: false
    , 2: false
    , 3: false
    , 4: false
    , 5: false
    , 6: false
    , 7: true
    , 8: true
    , 9: true
    , 10: true
};


if (exec[1]) {

    // 매개변수 primitive는 원시 값을 전달받고, 매개변수 obj는 객체를 전달받는다.
    let changeVal = function (primitive, obj) {
        primitive += 100;
        obj.name = 'Kim';
    };

    // 외부 상태
    let num = 100;
    let person = {name : 'Lee'};

    console.log(num);       // 100
    console.log(person);    // {name: "Lee"}

    // 원시 값은 값 자체가 복사되어 전달되고 객체는 참조 값이 복사되어 전달된다.
    changeVal(num, person);

    // 원시 값은 변경되지 않는다.
    console.log(num);       // 100

    // 객체는 값이 변경된다.
    console.log(person);    // {name: "Kim"}

}


if (exec[2]) {

    // 즉시 실행 함수는 반드시 () 연산자로 감싼다.
    
    // 익명 즉시 실행 함수
    (function () {
        let a = 3;
        let b = 5;
        return a * b
    }());

    // 기명 즉시 실행 함수
    (function foo() {
        let a = 3;
        let b = 5;
        return a * b
    }());

    // 즉시 실행 함수도 인수를 전달 받고 값을 반환 할 수 있다.
    let res = (function(a, b) {
        return a * b;
    }(3, 5));

    console.log(res);   // 15

}


if (exec[3]) {

    
    // ()연산자 내부의 기명 함수는 함수 리터럴로 평가되며 즉시 실행 함수를 () 외부에서 다시 호출할 수 없다.
    // foo();  // Uncaught ReferenceError: foo is not defined

    // ()로 감싸지 않으면 익명일 경우 함수 선언문의 형식에 맞지 않아 에러가 발생한다.
    //function () {}();   // Uncaught SyntaxError: Function statements require a function name

    // ()로 감싸지 않으면 기명 함수의 경우에도 중괄호 뒤에 ; 가 암묵적으로 추가되기 때문에 에러가 발생한다.
    //function foo2() {}();   // Uncaught SyntaxError: Unexpected token ')'

    // 함수 리터럴로 평가되어 함수 객체가 생성되는 방법으로 즉시 실행 함수가 만들어 진다.
    // 즉시 실행 함수를 만드는 여러가지 방법
    (function () {

    }());

    (function () {

    })();

    !function() {

    }();

    +function() {

    }();

}


if (exec[4]) {

    let countdown = function(n) {
        if (n < 0) return;
        console.log(n);
        countdown(n - 1);   // 재귀 호출
    };

    countdown(10);


    // 팩토리얼은 1부터 n값까지 모든 양수의 곱이다.
    let factorial = function(n) {
        // 탈출 조건 : n이 1 이하일 때 재귀 호출을 멈춘다.
        if (n <= 1) return 1;
        // 재귀 호출
        return n * factorial(n - 1);
    };

    console.log(factorial(5));  // 120


    // 대부분의 재귀 함수는 반복문으로 실행하는 것이 일반적이다.
    let factorial2 = function(n) {
        // 재귀 함수는 스택 오버플로우를 방지하기 위해
        // 반드시 탈출 조건을 만들어 주어야 한다.
        if (n <= 1) return 1;

        let res = n;
        while (--n) res *= n;
        return res;
    };

    console.log(factorial2(5)); // 120

}


if (exec[5]) {

    // 외부함수
    let outer = function() {
        let x = 1;

        // 중첩함수(내부함수)
        function inner() {
            let y = 2;
            // 외부함수의 변수를 참조할 수 있다.
            console.log(x + y);
        }

        inner();
    }

    outer();    // 3

}


if (exec[6]) {

    // 외부에서 전달받은 f를 n만큼 반복 호출한다.
    let repeat = function(n, f) {
        for (let i = 0; i < n; i++) {
            f(i);   // i를 전달하면서 f를 호출

        }
    };

    let logAll = function(i) {
        console.log(i);
    };

    // 반복 호출할 함수를 인수로 전달한다.
    repeat(5, logAll);  // 0 1 2 3 4

    let logOdds = function(i) {
        if (i % 2) console.log(i);
    };

    // 반복 호출할 함수를 인수로 전달한다.
    repeat(5, logOdds); // 1 3

}


if (exec[7]) {

    let repeat = function(n, f) {
        for (let i = 0; i < n; i++) {
            f(i);   // i를 전달하면서 f를 호출

        }
    };

    // 익명 함수 리터럴을 콜백 함수로 고차 함수에 전달한다.
    // 익명 함수 리터럴은 repeat 함수를 호출할 때마다 평가되어 함수 객체를 생성한다.
    repeat(5, function (i) {
        if (i % 2) console.log(i);
    });  // 1 3

}

if (exec[8]) {
    
};