# 함수의 정의 방법

지난 번에 함수를 정의하는 4가지 방법을 간단하게 적어봤다.   
오늘은 그 중 가장 보편적인 함수 선언문과 함수 표현식에 대해서 조금 딥하게 살펴보고자한다.   
언뜻 보면 같은 함수 정의 같지만 여러 부분이 다르므로 상황에 맞게 쓸 수 있도록 하자.

## 함수 선언문

함수 선언문을 사용해 함수를 정의하는 방식이다.
   
```javascript
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
```
   
함수 선언문의 특징을 얼추 살펴보자면 첫번째로 이름을 생략할 수 없다.   
왜냐하면 **함수 선언문은 식별자를 생성해야 하기 때문이다.**
   
```javascript
    //function add (x,y) {    return x + y;   }
    // 이 코드는 암묵적으로
    var add = function add(x, y) { return x + y};
    // 이런 식으로 해석된다. 물론 예시일 뿐이다.
    // 함수 객체를 가리키는 식별자(add)가 암묵적으로 생성된다.

    console.log(add(3, 5)); // 8

```
   
함수 선언문은 이름을 생략할 수 없다는 특징을 빼면 함수 리터럴 형태와 동일하다.
그렇기 때문에 간혹 이런 형태로 혼용이 벌어질 수 있다.
   
```javascript
    // 기명 함수 리터럴을 단독으로 사용하면 함수 선언문으로 해석된다.
    // 함수 선언문에서는 함수 이름을 생략할 수 없다.
    function foo() { console.log('foo'); }
    foo();  // foo (자바스크립트가 암묵적으로 생성한 식별자다.)

    // 함수 리터럴을 피연산자로 사용하면 함수 선언문이 아니라 함수 리터럴 표현식으로 해석된다.
    // 함수 리터럴에서는 함수 이름을 생략할 수 있다.
    (function bar() { console.log('bar'); });
    //bar();  // Uncaught ReferenceError: bar is not defined
```
   
피연산자 괄호()에 따라 선언문과 리터럴이 혼용될 수 있다. 이런 X같은 코드를 보여주는 이유는   
**선언문은 함수명으로 식별자를 자동으로 생성하고 함수 객체가 할당 된다는걸 보여주기 위해서다.**   
그리고 또 한가지. 함수는 함수 이름이 아니라 함수 객체를 가리키는 식별자로 호출한다.
      
## 함수 표현식

함수는. 일급 객체다. 함수는 일급 객체다!   
일급 객체라는 건 값의 성질을 가질 수 있는 객체를 일급 객체라고 한다.
그러한 특징을 살려서 변수에 함수 객체를 할당하는 방식을 함수 표현식이라고 한다.
   
```javascript
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
```
   
## 함수 생성 시점과 함수 호이스팅

함수 선언문과 함수 표현식은 함수가 생성되는 시점이 다르다.
   
```javascript
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
```
   
함수 선언문은 런타임 이전에 객체가 생성되고 초기화까지 되고 만다. 
작성된 선언문이 등장하기 전에 이미 함수 객체는 생성되어 있다.
그렇기 때문에 위의 코드와 같은 함수 호이스팅이 발생한다.   

하지만 함수 표현식은 함수 객체가 할당되는 변수와 같은 스코프(scope)를 갖는다.
함수는 일급 객체다. 변수 앞의 값에 불과하다. 함수 표현식으로 함수를 정의하면 함수 호이스팅이 아닌 변수 호이스팅이 발생힌다.