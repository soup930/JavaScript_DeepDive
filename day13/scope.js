let exec = {
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true
};

if (exec[1]) {

    let add = function(x, y) {
        // 매개변수는 함수 몸체 내부에서만 참조할 수 있다.
        // 즉, 매개변수의 스코프(유효범위)는 함수 몸체 내부다.
        console.log(x, y);  // 2 5
        return x + y;
    };

    add(2, 5);

    // 매개변수는 함수 몸체 내부에서만 참조할 수 있다.
    // console.log(x, y);  // Uncaught ReferenceError: x is not defined
}


if (exec[2]) {

    // var 변수의 스코프
    var var1 = 1;   // 코드의 가장 바깥 영역에서 선언한 변수

    if (true) {
        var var2 = 2;   // 코드 블록 내에서 선언한 변수
        if (true) {
            var var3 = 3;   // 중첩된 코드 블록 내에서 선언한 변수
        }
    }

    function foo() {
        var var4 = 4;   // 함수 내에서 선언한 변수

        function bar() {
            var var5 = 5;   // 중첩된 함수 내에서 선언한 변수
        }
    }

    console.log(var1);  // 1
    console.log(var2);  // 2
    console.log(var3);  // 3
    // console.log(var4);  // Uncaught ReferenceError: var4 is not defined
    // console.log(var5);  // Uncaught ReferenceError: var5 is not defined

}


if (exec[3]) {

    let x = 'global';

    function foo() {
        let x = 'local';
        console.log(x);
    }

    foo();          // local

    console.log(x); // global
    
}


if (exec[4]) {

    // 전역 함수
    function foo() {
        console.log('global function foo');
    }

    function bar() {
        // 중첩 함수
        function foo() {
            console.log('local function foo');
        }

        foo();
    }

    bar();  // local function foo

}


if (exec[5]) {
    
    var x = 1;

    if (true) {
        // var 키워드로 선언된 변수는 함수의 코드 블록(함수 몸체)만을 지역 스코프로 인정한다.
        // 함수 밖에서 var 키워드로 선언된 변수는 코드 블록 내에서 선언되었다 할지라도 모두 전역 변수다.
        // 따라서 x는 전역 변수다. 이미 선언된 전역 변수 x가 있으므로 x 변수는 중복 선언된다.
        // 이는 의도치 않게 변수 값이 변경되는 부작용을 발생시킨다.
        var x = 10;
    }

    console.log(x);     // 10

}


if (exec[6]) {

    var x = 1;

    function foo() {
        var x = 10;
        bar();
    }

    function bar() {
        console.log(x);
    }

    foo();  // 1
    bar();  // 1

}