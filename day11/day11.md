# 함수의 Input, Output

수학적으로 봤을 때, 함수에는 인자라고 불리는 값들이 외부에서 삽입된다.
그리고 함수에서 처리된 값이 함수 밖으로 나오게 된다.   

대표적으로 함수에 값을 삽입하는 방식으로 '매개변수'를 지정하는 방식이 있고,
처리된 값을 내보내는 방식으로 '반환값'을 지정하는 방식이 있다.

## 함수의 매개변수와 인수

함수를 실행할 때 필요한 값을 전달하는 방법은 이렇다.   

함수를 생성할 때 매개변수라는 것을 지정한다. 그리고 함수를 호출할 때 인수를 지정한다.
   
```javascript
    // 함수 선언문. 매개변수 x, y를 지정한다.
    function add (x, y) {
        return x + y;
    }

    // 함수 호출
    // 인수 1과 2가 매개 변수 x와 y에 순서대로 할당되고 함수 몸체의 문들이 실행된다.
    var result = add(1, 2);
    console.log(result);    // 3
```
   
위와 같은 방법으로 매개변수와 인수가 지정된다. 매개변수는 생성되는 시점이 여타 다른 변수와 비슷한데,
**함수가 생성될 때 같이 생성되며, 생성과 동시에 undefined로 초기화된다.**
   
그리고 사실 JS 함수는 매개변수, 인수에 그리 엄격하지 않다. 
어떤 형태의 타입이던 매개변수, 인수로 선언될 수 있으며 심지어 매개변수와 인수의 개수를 맞추지 않아도 된다.
   
```javascript
     // 함수 표현식
    let ex1 = function (x, y) {
        console.log(x, y);
    };

    // 함수 호출
    ex1(3, 5);  // 3 5

    // 매개 변수가 할당되지 않아도 그대로 실행된다.
    // 매개 변수는 함수가 호출될 때 undefined로 초기화 된다.
    ex1(3);     // 3 undefined 

    // 할당되지 않는 매개변수가 들어올 경우 무시한다.
    // 하지만 초과 된 인수들은 모두 암묵적으로 arguments 객체의 프로퍼티에 보관된다.
    ex1(3, 5, 7, 8, 9, 10);     // 3 5
```
   
문제는 이러한 융통성이 꼭 좋지만은 않다는 거다. 특정한 타입의 매개변수가 필요할 수도 있는 거고,
매개변수와 인수의 개수가 꼭 맞아야 하는 경우도 있을 수 있다. 혹은 매개변수의 초기 값이 undefined가 아닌 다른 값으로 초기화가 되어야 하는 경우도 있다.
   
```javascript
     // 인수의 타입 체크
    let add = function (x, y) {
        if (typeof x !== 'number' || typeof y !== 'number') {
            // 매개변수를 통해 전달된 인수가 타입이 부적절할 경우 예외 처리한다.
            throw new TypeError('인수는 모두 숫자 값이어야 합니다.');
        }

        return x + y;
    };

    
    // console.log(add(2));            // Uncaught TypeError: 인수는 모두 숫자 값이어야 합니다.
    // console.log(add('a', 'b'));     // Uncaught TypeError: 인수는 모두 숫자 값이어야 합니다.

    
    // 단축평가를 이용한 인수의 기본값 부여
    let add2 = function (a, b, c) {
        // 매개변수가 들어오지 않았을 때(undefined) 기본값 부여.
        a = a || 0;
        b = b || 0;
        c = c || 0;
        return a + b + c;
    };

    console.log(add2(1, 2, 3));     // 6
    console.log(add2(1, 2));        // 3
    console.log(add2());            // 5


    // ES6에서 도입된 매개변수 기본값 사용
    // 초기값을 직접 할당할 수 있다.
    let add3 = function (a = 0, b = 0, c = 0) {
        return a + b + c;
    };

    console.log(add3(1, 2, 3));     // 6
    console.log(add3(1, 2));        // 3
    console.log(add3());            // 5
```
   
참고로 매개변수는 최대한 적게 만드는 것이 좋다. 1함수 1기능이라는 함수의 규칙 때문이다.
매개변수가 많다는 것은 함수가 하는 기능이 많다는 것이다.
   

## 함수의 반환문

함수는 return 키워드를 통해 실행 결과를 함수 외부로 반환 할 수 있다.   
함수 호출 자체가 일단 표현식이다. 그렇다면 '값'이라는게 있다는 것이다. 그 '값'은 함수의 반환문으로 평가된다.
   
```javascript
     function multiply(x, y) {
        return x * y; // 반환문
        // 반환문 이후에 존재하는 소스는 실행되지 않고 무시된다.
        console.log('무시 갥!');
    }

    // 함수 호출은 반환값으로 평가된다.
    let result = multiply(3, 5);
    console.log(result);    // 15


    // 반환문을 별도로 할당하지 않으면 undefined가 반환된다.
    let foo = function() {
        return;
    };

    console.log(foo());     // undefined

    // 반환문을 생략하면 암묵적으로 undefined가 반환된다.
    let foo2 = function() {
        
    };

    console.log(foo2());    // undefined

    // 함수 외부에서 쓰면 문법 에러 발생.
    return; // Uncaught SyntaxError: Illegal return statement

```