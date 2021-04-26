let exec = {
    1 : false,
    2 : false,
    3 : false,
    4 : false,
    5 : false,
    6 : true,
    7 : true,
    8 : true,
    9 : true
};


if (exec[1]) {
    
    // 1. 함수는 무명의 리터럴로 생성할 수 있다.
    // 2. 함수는 변수에 저장할 수 있다.
    // 런타임(할당 단계)에 함수 리터럴이 평가되어 함수 객체가 생성되고 변수에 할당된다.
    const increase = function (num) {
        return ++num;
    };

    const decrease = function (num) {
        return --num;
    };

    // 2. 함수는 객체에 저장할 수 있다.
    const predicates = { increase, decrease };

    // 3. 함수의 매개변수에 전달할 수 있다.
    // 4. 함수의 반환값으로 사용할 수 있다.
    function makeCounter(predicate) {
        let num = 0;

        return function() {
            num = predicate(num);
            return num;
        };
    }

    // 3. 함수는 매개변수에게 함수를 전달할 수 있다.
    const increaser = makeCounter(predicates.increase);
    console.log(increaser());
    console.log(increaser());

    // 3. 함수는 매개변수에게 함수를 전달할 수 있다.
    const decreaser = makeCounter(predicates.decrease);
    console.log(decreaser());
    console.log(decreaser());

}


if (exec[2]) {

    function square(number) {
        return number * number;
    }

    console.log(Object.getOwnPropertyDescriptors(square));

    /*
    {
        length: {…}, name: {…}, arguments: {…}, caller: {…}, prototype: {…}}
        arguments: {value: null, writable: false, enumerable: false, configurable: false}
        caller: {value: null, writable: false, enumerable: false, configurable: false}
        length: {value: 1, writable: false, enumerable: false, configurable: true}
        name: {value: "square", writable: false, enumerable: false, configurable: true}
        prototype: {value: {…}, writable: true, enumerable: false, configurable: false}
        __proto__: Object
    }
    */

    // __proto__는 square 함수의 프로퍼티가 아니다.
    console.log(Object.getOwnPropertyDescriptor(square, '__proto__'));  // undefined

    // __proto__는 Object.prototype 객체의 접근자 프로퍼티다.
    // square 함수는 Object.prototype 객체로부터 __proto__ 접근자 프로퍼티를 상속받는다.
    console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));
    // {enumerable: false, configurable: true, get: ƒ, set: ƒ}

}


if (exec[3]) {

    function multiply(x, y) {
        console.log(arguments);
        return x * y;
    }

    console.log(multiply());        // NaN
    console.log(multiply(1));       // NaN
    console.log(multiply(1, 2));    // 2
    console.log(multiply(1, 2, 3)); // 2

}


if (exec[4]) {

    function sum() {
        let res = 0;

        // arguments 객체는 length 프로퍼티가 있는 유사 배열 객체이므로 for 문으로 순회할 수 있다.
        for (let i = 0; i < arguments.length; i++) {
            res += arguments[i];
        }

        return res;
    }

    console.log(sum());         // 0
    console.log(sum(1, 2));     // 3
    console.log(sum(1, 2, 3));  // 6

}


if (exec[5]) {

    // ES6 Rest parameter
    function sum(...args) {
        return args.reduce((pre, cur) => pre + cur, 0);
    }

    console.log(sum(1, 2));                 // 3
    console.log(sum(1, 2, 3, 4, 5, 6, 7));  // 28

}


if (exec[6]) {
    
    function foo() {}
    console.log(foo.length);    // 0

    function bar(x) {
        return x;
    }
    console.log(bar.length);    // 1

    function baz(x, y) {
        return x * y;
    }
    console.log(baz.length);    // 2

}


if (exec[7]) {
    
    // 기명 함수 표현식
    var nameFunc = function foo() {};
    console.log(nameFunc.name);     // foo

    // 익명 함수 표현식
    var anonymous = function() {};
    // ES5 : name 프로퍼티는 빈 문자열을 값으로 갖는다.
    // ES6 : name 프로퍼티는 함수 객체를 가리키는 변수 이름을 값으로 갖는다.
    console.log(anonymous.name);    // anonymous

    // 함수 선언문(Function declaration)
    function bar() {}
    console.log(bar.name);     // bar

}


if (exec[8]) {

    const obj = { a: 1 };

    // 객체 리터럴 방식으로 생성한 객체의 프로토타입 객체는 Object.prototype이다.
    console.log(obj.__proto__ === Object.prototype);    // true

    // 객체 리터럴 방식으로 생성한 객체는 프로토타입 객체인 Object.prototype의 프로퍼티를 상속받는다.
    // hasOwnProperty 메서드는 Object.prototype의 메서드다.
    console.log(obj.hasOwnProperty('a'));           // true
    console.log(obj.hasOwnProperty('__proto__'));   // false

}