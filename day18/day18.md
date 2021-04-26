# 함수와 일급 객체
지난 시간동안 함수가 일급 객체임은 여러번 강조했던 내용이다. 
그리고 또 한번 강조하자면 함수는 일급 객체다.
   
## 일급 객체
다음과 같은 조건을 만족하는 객체를 일급 객체라 한다.
   
```
    1. 무명의 리터럴로 생성할 수 있다. 즉, 런타임에 생성이 가능하다.
    2. 변수나 자료구조(객체, 배열 등)에 저장할 수 있다.
    3. 함수의 매개변수에 전달할 수 있다.
    4. 함수의 반환값으로 사용할 수 있다.
```
   
JS의 함수는 다음 사항들을 모두 만족하므로 일급 객체다.
   
```javascript
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
```
   
함수는 값을 사용할 수 있는 곳이라면 어디서든지 리터럴로 정의할 수 있으며 런타임에 함수 객체로 평가된다. 
특히 일반 객체와 같이 함수의 매개변수나 반환값으로 사용할 수도 있다는 점이 함수형 프로그래밍을 가능케 하는 요소다.
   
그리고 함수 객체는 일반 객체에는 없는 함수 고유의 프로퍼티를 소유한다.
   
## 함수 객체의 프로퍼티
함수의 모든 프로퍼티의 프로퍼티 어트리뷰트를 확인해 보면 다음과 같다.
   
```javascript
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
```
      
__proto__를 제외한 여러 프로퍼티들을 가지고 있는 것을 확인할 수 있다. 이제 함수 객체의 프로퍼티에 대해 하나씩 살펴보자.
   
## arguments 프로퍼티
arguments 객체를 값으로 하는 arguments 프로퍼티는 함수 호출 시 전달된 인수(argument)들의 
정보를 담고 있는 유사 배열 객체다.
   
중요한 점은 arguments는 함수 내부에서 지역 변수처럼 사용된다는 점이다. 즉 함수 외부에서는 참조할 수 없다. 
함수 객체의 arguments 프로퍼티는 ES3 이후 표준에서 제외되었다.
   
```javascript
    function multiply(x, y) {
        console.log(arguments);
        return x * y;
    }

    console.log(multiply());        // NaN
    console.log(multiply(1));       // NaN
    console.log(multiply(1, 2));    // 2
    console.log(multiply(1, 2, 3)); // 2
```

JS는 기본적으로 매개변수의 개수를 체크하지 않는다. 하지만 argumets 프로퍼티를 통해 전달된 인수들을 확인해보면, 
전달되지 않은 매개변수는 확인되지 않지만 undefined로 초기화 된 채 렉시컬 환경에 보관되어 있다. 
초과된 인수는 실제로 쓰이지는 않지만 argumets에 보관되어 있다.
   
arguments 객체는 인수를 프로퍼티 값으로 소유하며 키는 인수의 순서를 나타낸다. 
arguments 객체는 매개변수 개수를 확정할 수 없는 가변 인자 함수를 구현할 때 유용하다.
   
```javascript
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
```
   
다시 말하지만 arguments는 실제 배열이 아니라 유사 배열 객체다. 그래서 for문으로 순회가 가능하다. 
유사 배열 객체는 배열이 아니므로, 배열 메서드를 상용할 경우 에러가 발생한다. 
그래서 간접 호출 등의 방법이 있지만 ES6에서는 이러한 문제를 해결하기 위해 
아예 arguments 대용으로 사용 가능한 Rest 파라미터를 도입했다.
   
```javascript
    // ES6 Rest parameter
    function sum(...args) {
        return args.reduce((pre, cur) => pre + cur, 0);
    }

    console.log(sum(1, 2));                 // 3
    console.log(sum(1, 2, 3, 4, 5, 6, 7));  // 28
```
   
## caller 프로퍼티
함수 객체의 caller 프로퍼티는 함수 자신을 호출한 함수를 기리킨다. 
근데 ECMAScript 사양에 포함되지 않은 비표준 프로퍼티이고, 앞으로 표준화될 예정도 없으니 그냥 그렇다고만 알고 있자.
   
## length 프로퍼티
함수 객체의 length 프로퍼티는 **함수를 정의할 때** 선언한 매개변수의 개수를 가리킨다.
   
```javascript
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
```
   
arguments 객체의 length 프로퍼티와 함수 객체의 length 프로퍼티의 값은 다를 수 있으므로 주의해야 한다. 
arguments의 length는 모든 형태의 인자의 개수를 가리키고, 함수의 length는 매개변수의 개수를 가리킨다.
   
## name 프로퍼티
ES6에서야 표준이 된 프로퍼티인데 함수의 이름을 나타낸다.   
ES5에서는 함수명이 없을 경우 빈 값이지만, ES6부터는 함수 객체를 가리키는 식별자의 값을 갖는다.
   
```javascript
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
```
   
## __proto__ 접근자 프로퍼티 
모든 객체는 [[Prototype]]이라는 내부 슬롯을 갖는다. __proto__ 프로퍼티는 [[Prototype]] 
내부 슬롯이 가리키는 프로토타입 객체에 간접적으로 접근하기 위해 사용하는 접근자 프로퍼티다.
   
```javascript
    const obj = { a: 1 };

    // 객체 리터럴 방식으로 생성한 객체의 프로토타입 객체는 Object.prototype이다.
    console.log(obj.__proto__ === Object.prototype);    // true

    // 객체 리터럴 방식으로 생성한 객체는 프로토타입 객체인 Object.prototype의 프로퍼티를 상속받는다.
    // hasOwnProperty 메서드는 Object.prototype의 메서드다.
    console.log(obj.hasOwnProperty('a'));           // true
    console.log(obj.hasOwnProperty('__proto__'));   // false
```
   
## prototype 프로퍼티
함수에서 prototype 프로퍼티는 constructor, 즉 생성자 함수로 호출할 수 있는 함수 객체만 가지고 있다. 
prototype 프로퍼티는 생성자 함수가 호출될 때, 생성자 함수가 생성할 인스턴스의 프로토타입 객체를 가리킨다.