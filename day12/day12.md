## 여러가지 함수의 형태
지금까지 기본적인 함수의 구성과 특징에 대해 알아보았다.
오늘 알아볼 것은 함수는 특징으로 말미암아 여러가지 형태로 변할 수 있다는 것이다.
   
# 참조에 의한 전달과 외부 상태의 변경
함수에 값을 전달한다는 건 매개변수를 통해 함수에 값을 입력한다는 얘기이다.   
지금까지는 매개변수로 원시값만을 입력했다. 하지만 함수는 1급 객체다. 원시값 뿐만 아니라 참조값도 매개변수로 입력될 수 있다.
   

```javascript

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

```
   
   
하지만 여기서 문제가 발생한다. 원시값은 원래 값이 변경되지 않는 녀석이다. 그렇기 때문에 전달된 매개변수(원시값)가 함수 내부에서 어떻게 지지고 볶이던 간에 함수 외부에 있는 원본에는 영향을 주지 않는다.   
하지만 참조값은 변경이 가능한 값이다. 전달된 매개변수(참조값)가 함수 내부에서 값이 변경된다면 같은 메모리 주소를 참조하는 원본도 그대로 값이 바뀌게 된다.   
함수는 왠만하면 함수 외부에 영향을 줘서는 안됀다. 어지간하면 이런 형태의 코드는 작성하지 말자.
   

## 즉시 실행 함수
함수의 정의와 동시에 즉시 호출되는 함수를 즉시 실행함수 라고 한다. 즉시 실행 함수는 단 한번만 호출되며 다시 호출할 수 없다.
즉시 실행 함수는 익명 함수를 사용하는 것이 일반적인데, 이는 함수의 이름을 지어줘봤자 () 연산자 외부에서 식별자로 쓸 수 없기 때문이다.   
즉, 어차피 다시 호출할 수 없기 때문에 이름을 붙이지 않는다.
   

``` javascript

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

```
   

그 이유는 함수를 () 연산자로 묶게 되면 함수 리터럴로 평가되어 ()안의 값 = 해당 함수 객체로 즉시 식별된다.   
그렇기 때문에 함수를 리터럴로 만들 수 있는 방식이라면 무엇이든지 즉시 실행 함수로 쓸 수 있다.
   

``` javascript

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

```
   

## 재귀 함수

함수가 자기 자신을 호출하는 것을 재귀 호출이라 한다. 재귀 함수는 자기 자신을 호출하는 행위, 즉 재귀호출을 수행하는 함수를 말한다.   
그렇기 때문에 함수가 반복적으로 실행되어야 하는 상황에 적합한 함수다.
   

```javascript

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

```
   

재귀함수에서 주의해야 할 점은 반드시 탈출 조건을 만들어줘야 한다는 것이다. 그렇지 않는다면 무한 반복을 할 수도 있고
 그로 인해 스택 오버 플로우가 발생하게 된다. 재귀 함수는 반복문보다 재귀 호출이 더 직관적이고 이해하기 쉬울 때만 사용한다.
       

## 중첩 함수
함수 내부에 또 다른 함수가 있는 경우다. 밖에 있는 함수를 외부 함수. 안에 있는 함수를 내부 함수 혹은, 바로 중첩 함수라고 부른다.   
ES6 부터는 함수 내부의 블록문{ }에도 중첩 함수를 정의할 수 있게 됬는데, 혼란을 야기 할 수 있으므로 하지 말자.
   

```javascript

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

```
   

## 콜백 함수
함수가 복잡해지게 된 원인인 콜백 함수다. 하지만 그만큼 함수의 기능을 유연하게 만들어 준 녀석이기도 하다.   
콜백 함수는 다른 함수의 매개 변수로 입력되는 함수를 얘기한다.
   

```javascript

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

```
   

**이런 식으로 외부에서 콜백 함수를 전달 받는 함수를 고차 함수라고 한다.**   
위의 소스를 살펴보면 콜백 함수를 전달받는 repeat은 고차 함수, 매개변 수로 전달되는 logAll, logOdds를 콜백 함수로 정의할 수 있다.   
   

```
    **고차,콜백 함수의 특징**
    1. 매개 변수를 통해 전달받은 콜백 함수의 호출 시점을 결정해서 호출한다.
    2. 콜백 함수는 고차함수에 의해 호출된다.
    3. 고차 함수는 필요에 따라 콜백 함수에 인수를 전달할 수 있다.
    4. 고차 함수는 콜백 함수를 자신의 일부분으로 합성한다.
```
   

콜백 함수가 고차 함수 내부에만 호출된다면 콜백 함수를 익명 함수 리터럴로 정의해서 곧바로 고차 함수에 전달하는 것이 일반적인 방법이다.   
정의된 함수를 콜백 함수로 쓰게 될 경우 고차 함수가 호출될 때마다 콜백 함수가 생성되기 때문이다.
   
   
```javascript

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

```
   

콜백 함수는 함수형 프로그래밍 패러다임뿐만 아니라 비동기 처리에 활용되는 중요한 패턴이다.
   

```javascript

<!DOCTYPE html>
<html>
    <head></head>
    <body>
        <input type="button" id="myButton" value="push Me!"/>
    </body>
    <script src="function4.js"></script>
    <script>
        // 콜백 함수를 사용한 이벤트 처리
        // myButton 버튼을 클릭하면 콜백 함수를 실행한다.
        document.getElementById('myButton').addEventListener('click', function() {
            console.log('button clicked!');
        });

        // 콜백 함수를 사용한 비동기 처리
        // 1초 후에 메시지를 출력한다.
        setTimeout(function() {
            console.log('1초 경과');
        }, 1000)
    </script>
</html>

```
   

함수는 배열 고차 함수에서도 사용될 수 있다. 아래 예제는 그냥 참고만 하자.
   

```javascript

     // 콜백 함수를 사용하는 고차 함수 map
    let res = [1, 2, 3].map(function (item) {
        return item * 2;
    });

    console.log(res);   // [2 4 6]

    // 콜백 함수를 사용하는 고차 함수 filter
    res = [1, 2, 3].filter(function (item) {
        return item % 2;
    });

    console.log(res);   // [1 3]

    // 콜백 함수를 사용하는 고차 함수 reduce
    res = [1, 2, 3].reduce(function (acc, cur) {
        return acc + cur;
    }, 0);

    console.log(res);   // 6

```
   

## 순수 함수와 비순수 함수
순수 함수는 고독하고 독립적인 녀석이다. 함수 외부 상태에 의존하지도 않으며, 함수 외부에 영향을 끼치지도 않는다.
   

```javascript
    let count = 0;  // 현재 카운트를 나타내는 상태

    // 순수 함수 increase는 동일한 인수가 전달되면 언제나 동일한 값을 반환한다.
    function increase(n) {
        return ++n;
    }

    // 순수 함수가 반환한 결과값을 변수에 재할당해서 상태를 변경
    increase(count);
    console.log(increase(count));   // 1
    console.log(count); // 0

    increase(count);
    console.log(increase(count));   // 1
    console.log(count); // 0
```
   


비순수 함수는 순수 함수와는 반대로 외부 상태에 따라 반환값이 변경되기도 하며, 함수 내부에서 실행한 로직이 함수 외부에까지 영향을 주는 녀석이다.
   

```javascript
     let count = 0; // 현재 카운트를 나타내는 상태 : increase 함수에 의해 변화한다.

    // 비순수 함수
    function increase() {
        return ++count; // 외부 상태에 의존하며 외부 상태를 변경한다.
    }

    // 비순수 함수는 외부 상태(count)를 변경하므로 상태 변화를 추적하기 어려워진다.
    increase();
    console.log(count);     // 1

    increase();
    console.log(count);     // 2
```
