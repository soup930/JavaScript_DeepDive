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

    let foo = function() {
        var x = 'local';
        console.log(x);
        return x;
    }

    foo(); // local
    // console.log(x); // Uncaught ReferenceError: x is not defined

}


if (exec[2]) {

    var x = 'global';

    let foo = function() {
        console.log(x);
        var x = 'local';
    }

    foo();  // undefined
    console.log(x); // global

}


if (exec[3]) {

    var x = 1;

    // var 키워드는 변수의 중복 선언이 가능하다.
    var x = 100;
    console.log(x);

}


if (exec[4]) {

    (function () {
        var foo = 10;   // 즉시 실행 함수의 지역 변수
    }());

    // console.log(foo);   // Uncaught ReferenceError: foo is not defined

}


if (exec[5]) {

    let MYAPP = {};

    MYAPP.name = 'Lee';
    MYAPP.person = {
        name : 'Kim',
        address : 'Seoul'
    };

    console.log(MYAPP.name);        // Lee
    console.log(MYAPP.person.name); // Kim

}


if (exec[6]) {

    let Counter = (function () {
        // private 변수
        let num = 0;

        // 외부로 공개할 데이터나 메서드를 프로퍼티로 추가한 객체를 반환.
        return {
            increase() {
                return ++num;
            },
            decrease() {
                return --num;
            },
        };
    }());

    // private 변수는 외부로 노출되지 않는다.
    console.log(Counter.num);   // undefined

    console.log(Counter.increase());    // 1
    console.log(Counter.increase());    // 2
    console.log(Counter.decrease());    // 1
    console.log(Counter.decrease());    // 0

}