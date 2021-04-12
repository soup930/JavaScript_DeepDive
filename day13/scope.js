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

    foo();

    console.log(x);
    
}