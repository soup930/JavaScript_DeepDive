let exec = {
    1 : false ,
    2 : false ,
    3 : false ,
    4 : false ,
    5 : false ,
    6 : false ,
    7 : true
};


if (exec[1]) {
    
    // 함수는 객체다.
    function foo() {}
    
    // 함수는 객체이므로 프로퍼티를 소유할 수 있다.
    foo.prop = 10;

    // 함수는 객체이므로 메서드를 소유할 수 있다.
    foo.method = function () {
        console.log(this.prop);
    };

    foo.method();   // 10

}


if (exec[2]) {

    // 일반적인 함수로서 호출 : [[Call]]이 호출된다.
    // 모든 함수 객체는 [[Call]]이 구현되어 있다.
    foo();

    // 생성자 함수로서 호출 : [[Construct]]가 호출된다.
    // 이때 [[Contruct]]를 갖지 않는다면 에러가 발생한다.
    new foo();

}


if (exec[3]) {

    // 일반 함수 정의: 함수 선언문, 함수 표현식
    function foo() {}
    const bar = function () {};

    // 프로퍼티 x의 값으로 할당된 것은 일반 함수로 정의된 함수다. 이는 메서드로 인정하지 않는다.
    const baz = {
        x : function () {}
    };

    // 일반 함수로 정의된 함수만이 constructor다.
    new foo();
    new bar();
    new baz.x();

    // 화살표 함수 정의
    const arrow = () => {};

    // new arrow();    // Uncaught TypeError: arrow is not a constructor

    // 메서드 정의: ES6의 메서드 축약 표현만 메서드로 인정한다.
    const obj = {
        x() {}
    };

    // new obj.x();    // Uncaught TypeError: obj.x is not a constructor

}


if (exec[4]) {

    // 생성자 함수로서 정의하지 않은 일반 함수
    function add(x, y) {
        return x + y;
    }

    // 생성자 함수로서 정의하지 않은 일반 함수를 new 연산자와 함깨 호출
    let inst = new add();

    // 함수가 객체를 반환하지 않았으므로 반환문이 무시된다. 따라서 빈 객체가 생성되어 반환된다.
    console.log(inst);  // add {}

    // 객체를 반환하는 일반 함수
    function createUser(name, role) {
        return { name, role };
    }

    // 일반 함수를 new 연산자와 함께 호출
    inst = new createUser('Kim', 'admin');

    // 함수가 생성한 객체를 반환한다.
    console.log(inst);  // {name: "Kim", role: "admin"}

    // 생성자 함수
    function Circle(radius) {
        this.radius = radius;
        this.getDiameter = function () {
            return 2 * this.radius;
        };
    }

    // new 연산자 없이 생성자 함수 호출하면 일반 함수로서 호출된다.
    const circle = Circle(5);

    console.log(circle);    // undefined

    // 일반 함수 내부의 this는 전역 객체 window를 가리킨다.
    console.log(radius);    // 5
    console.log(getDiameter()); // 10

    // circle.getDiameter();   // Uncaught TypeError: Cannot read property 'getDiameter' of undefined

}


if (exec[5]) {

    // 생성자 함수 
    function Circle(radius) {
        // 이 함수가 new 연산자와 함께 호출되지 않았다면 new.target은 undefined다.
        if (!new.target) {
            // new 연산자와 함께 생성자 함수를 재귀 호출하여 생성된 인스턴스를 반환한다.
            return new Circle(radius);
        }

        this.radius = radius;
        this.getDiameter = function () {
            return 2 * this.radius;
        };
    }

    // new 연산자 없이 생성자 함수를 호출하여도 new.target을 통해 생성자 함수로서 호출된다.
    const circle = Circle(5);
    console.log(circle.getDiameter());  // 10

}


if (exec[6]) {

    // Scope-Safe Contructor Pattern
    function Circle(radius) {
        // 생성자 함수가 new 연산자와 함께 호출되면 함수의 선두에서 빈 객체를 생성하고
        // this에 바인딩한다. 이때 this와 Circle은 프로토타입에 의해 연결된다.

        // 이 함수가 new 연산자와 함께 호출되지 않았다면 이 시점의 this는 전역 객체 window를 가리킨다.
        // 즉, this와 Circle은 프로토타입에 의해 연결되지 않는다.
        if (!(this instanceof Circle)) {
            // new 연산자와 함께 호출하여 생성된 인스턴스를 반환한다.
            return new Circle(radius);
        }

        this.radius = radius;
        this.getDiameter = function () {
            return 2 * this.radius;
        };
    }

    const circle = Circle(5);
    console.log(circle.getDiameter());  // 10

}


if (exec[7]) {

    let obj = new Object();
    console.log(obj);   // {}

    obj = Object();
    console.log(obj);   // {}

    let f = new Function('x', 'return x ** x');
    console.log(f);     // ƒ anonymous

    f = Function('x', 'return x ** x');
    console.log(f);     // ƒ anonymous

    const str = String(123);
    console.log(str, typeof str);   // 123 string

    const num = Number('123');
    console.log(num, typeof num);   // 123 "number"

    const bool = Boolean('true');
    console.log(bool, typeof bool); // true "boolean"

}