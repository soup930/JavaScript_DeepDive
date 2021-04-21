let exec = {
    1 : false,
    2 : false,
    3 : false,
    4 : false,
    5 : false,
    6 : true,
    7 : true,
    8 : true,
    9 : true,
    10 : true,
    11 : true
};


if (exec[1]) {

    // 빈 객체의 생성
    const person = new Object();

    // 프로퍼티 추가
    person.name = 'Lee';
    person.sayHello = function () {
        console.log(`Hi My name is ${this.name}`);
    };

    console.log(person);    // {name: "Lee", sayHello: ƒ}
    person.sayHello();      // Hi My name is Lee

}

if (exec[2]) {

    // String 생성자 함수에 의한 String 객체 생성
    const strObj = new String('Lee');
    console.log(typeof strObj);     // object
    console.log(strObj);            // String {"Lee"}

    // Number 생성자 함수에 의한 Number 객체 생성
    const numObj = new Number(123);
    console.log(typeof numObj);     // object
    console.log(numObj);            // Number {123}

    // Boolean 생성자 함수에 의한 Boolean 객체 생성
    const boolObj = new Boolean(true);
    console.log(typeof boolObj);    // object
    console.log(boolObj);           // Boolean {true}

    // Function 생성자 함수에 의한 function 객체(함수) 생성
    const func = new Function('x', 'return x * x');
    console.log(typeof func);       // function
    console.log(func);              // ƒ anonymous(x) {return x * x}

    // Array 생성자 함수에 의한 Array 객체(배열) 생성
    const arr = new Array(1, 2, 3);
    console.log(typeof arr);        // object
    console.log(arr);               // (3) [1, 2, 3]

    // RegExp 생성자 함수에 의한 RegExp 객체(정규 표현식) 생성
    const regExp = new RegExp(/ab+c/i);
    console.log(typeof regExp);     // object
    console.log(regExp);            // /ab+c/i

    // Date 생성자 함수에 의한 Date 객체 생성
    const date = new Date();
    console.log(typeof date);       // object
    console.log(date);              // Tue Apr 20 2021 22:16:58 GMT+0900 (대한민국 표준시)

}


if (exec[3]) {

    const circle1 = {
        radius : 5,
        getDiameter() {
            return 2 * this.radius;
        }
    };

    console.log(circle1.getDiameter()); // 10

    const circle2 = {
        radius : 10,
        getDiameter() {
            return 2 * this.radius;
        }
    };

    console.log(circle2.getDiameter()); // 20

}


if (exec[4]) {

    // 생성자 함수
    function circle(radius) {
        // 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
        this.radius = radius;
        this.getDiameter = function() {
            return 2 * this.radius;
        };
    }

    // 인스턴스의 생성
    const circle1 = new circle(5);
    const circle2 = new circle(10);

    console.log(circle1.getDiameter()); // 10
    console.log(circle2.getDiameter()); // 20

}


if (exec[5]) {

   // new 연산자와 함께 호출하지 않으면 생성자 함수로 동작하지 않는다.
   // 즉, 일반 함수로서 호출된다.
   const circle3 = circle(15);

   // 일반 함수로서 호출된 Circle은 반환문이 없으므로 암묵적으로 undefined를 반환한다.
   console.log(circle3);    // undefined

   // 일반 함수로서 호출된 Circle 내의 this는 전역 객체를 가리킨다.
   console.log(radius);     // 15

}


if (exec[6]) {

    // 생성자 함수
    function Circle(radius) {
        // 인스턴스 초기화
        // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩 된다.
        console.log(this);  // Circle {}

        // 2. this에 바인딩 되어 있는 인스턴스를 초기화한다.
        this.radius = radius;
        this.getDiameter = function () {
            return 2 * this.radius;
        };

        // 3. 완성된 인스턴스가 바인딩됭 this가 암묵적으로 반환한다.
        // 명시적으로 객체를 반환하면 암묵적인 this 반환이 무시된다.
        // return {};
    }

    // 인스턴스 생성. Circle 생성자 함수는 암묵적으로 this를 반환한다.
    const circle1 = new Circle(5);  // 반지름이 5인 Circle 객체를 생성
    console.log(circle1);   // Circle {radius: 5, getDiameter: ƒ} || {}

}