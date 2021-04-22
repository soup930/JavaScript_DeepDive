# 내부 메서드 [[Call]]과 [[Construct]]
함수는 객체다. 함수는 일반 객체가 가지고 있는 내부 슬롯과 내부 메서드를 모두 가지고 있다. 
하지만 함수는 일반 객체와는 다르다. 일반 객체는 호출할 수 없지만 함수는 호출할 수 있다. 
   
함수는 일반 객체와는 달리 [[Call]]과 [[Contruct]]라는 내부 메서드를 추가로 가지고 있다. 
함수가 일반 함수로 호출되면 [[Call]]을 new 연산자와 함께 생성자 함수로서 호출되면 [[Contruct]]가 호출된다.
   
```javascript
    // 함수는 객체다.
    function foo() {}
    
    // 함수는 객체이므로 프로퍼티를 소유할 수 있다.
    foo.prop = 10;

    // 함수는 객체이므로 메서드를 소유할 수 있다.
    foo.method = function () {
        console.log(this.prop);
    };

    foo.method();   // 10

    // 일반적인 함수로서 호출 : [[Call]]이 호출된다.
    // 모든 함수 객체는 [[Call]]이 구현되어 있다.
    foo();

    // 생성자 함수로서 호출 : [[Construct]]가 호출된다.
    // 이때 [[Contruct]]를 갖지 않는다면 에러가 발생한다.
    new foo();
```
   
내부 메서드 [[Call]]를 갖는 함수 객체를 callable이라 하며, 내부 메서드 [[Contruct]]를 갖는 함수 객체를 contructor, 
[[Contruct]]를 갖지 않는 함수 객체를 non-constructor라고 부른다. 
   
callable은 호출할 수 있는 객체, 즉 함수를 말하며, constructor는 생성자 함수로서 호출할 수 있는 함수, 
non-constructor는 객체를 생성자 함수로서 호출할 수 없는 함수를 의미한다.
   
모든 함수는 callable 이지만 contructor일 수도 있고 non-constructor일 수도 있다.
   
## constructor와 non-constructor의 구분
JS 엔진은 함수의 객체가 생성될 때 어떤 방식으로 정의 되었느냐에 따라 constructor와 non-constructor로 구분한다.
   
```
constructor : 함수 선언문, 함수 표현식, 클래스
non-constuctor : 메서드(ES6 메서드 축약 표현), 화살표 함수
```
   
ECMAScript 사양에서 메서드로 인정하는 범위가 JAVA같은 객체지향 언어의 메서드보다 좁다.
   
```javascript
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
```
   
말했다시피 함수의 정의 방식에 따라 constructor와 non-constructor가 구분된다. 
또 한가지 주의할 점은 new 연산자의 유무에 따라 [[Construct]]가 호출된다는 것이다.
   
## new 연산자
일반 함수와 생성자 함수의 특별한 형식적인 차이는 없다. 다만 new 연산자에 따라 생성자 함수냐가 결정된다. 
new 연산자가 함께 사용된다면 생성자 함수로 결정된다. 단, new 연산자는 constructor 함수에 사용해야 한다.
   
```javascript
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
```
   
Circle 함수를 new와 함께 생성자 함수로 호출하면 함수 내부의 this는 Circle 생성자 함수가 생성할 인스턴스를 가리킨다. 
하지만 Circle 함수를 일반 함수로 호출하면 내부의 this는 전역 객체 window를 가리킨다.
   
이러한 구조적 차이가 있으므로 생성자 함수의 첫 문자를 대문자로 기술하는 파스칼 케이스로 구별하는 습관이 필요하다.
   
## new.target
생성자 함수에 파스칼 케이스 컨벤션을 사용한다 하더라도 그 위험성이 사라지는 것은 아니다. 
그래서 ES6에서는 new.target을 지원한다. 
   
함수 내부에서 new.target을 사용하면 new 연산자와 함께 생성자 함수로 호출되었는지 확인할 수 있다.
   
new 연산자와 함께 생성자 함수로서 호출되면 함수 내부의 new.target은 함수 자신을 가리킨다. 
new 연산자 없이 일반 함수로서 호출된 함수 내부의 new.target은 undefined다.
   
```javascript
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
```
   
하지만 new.target은 IE 같은 레거시 브라우저에서는 사용이 불가능하다. 
IE 환경까지 염두한다면 스코프 세이프 생성자 패턴을 사용할 수 있다.
   
```javascript
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
```
   
참고로 대부분의 빌트인 생성자 함수(Object, String, Number, Boolean, Function, Array, Date, RegExp, Promise) 등은  
new 연산자와 함께 호출되었는지를 확인한 후 적절한 값을 반환한다.
   
```javascript
     let obj = new Object();
    console.log(obj);   // {}

    obj = Object();
    console.log(obj);   // {}

    let f = new Function('x', 'return x ** x');
    console.log(f);     // ƒ anonymous

    f = Function('x', 'return x ** x');
    console.log(f);     // ƒ anonymous

    // String, Number, Boolean 생성자 함수는 new 연산자 없이 호출하면
    // 문자열, 숫자, 불리언 값을 반환한다.
    const str = String(123);
    console.log(str, typeof str);   // 123 string

    const num = Number('123');
    console.log(num, typeof num);   // 123 "number"

    const bool = Boolean('true');
    console.log(bool, typeof bool); // true "boolean"
```