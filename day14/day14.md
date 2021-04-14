# 전역 변수의 문제점
전역 변수는 여러가지 문제점이 있기 때문에 꼭 사용할 이유가 없다면 사용하지 않는 것이 좋다.
   
오늘은 전역 변수의 문제점과 전역 변수의 사용을 억제할 수 있는 방법을 살펴보자.
   

## 변수의 생명 주기
지난 번에 스코프라는 걸 알아봤는데, 이 스코프와는 별개로 변수가 생성 되는 시점부터 소멸하는 시점까지를 생명 주기라고 한다.
변수는 자신이 선언된 위치에서 생성하고 소멸한다.
   

```javascript

    let foo = function() {
        var x = 'local';
        console.log(x);
        return x;
    }

    foo(); // local
    // console.log(x); // Uncaught ReferenceError: x is not defined

```
   
   
일단 지역 변수의 생명 주기부터 알아보자. 함수 안에 지역 변수가 생성되는 시점은 언제일까.
   
지역 변수는 함수가 호출 될 때 함수 몸채 내에 있는 어떤 코드들 보다 먼저 생성된다. 
다른 변수들이 그렇듯이 undefined로 먼저 생성되는 것이다. 중요한 건 함수가 호출될 때 생성된다는 점이다. 
그리고 지역 변수는 함수가 호출되어 실행되는 동안에만 유효하다. **즉, 지역 변수는 함수의 생명 주기와 일치한다.**
   

```javascript

    var x = 'global';

    let foo = function() {
        console.log(x);
        var x = 'local';
    }

    foo();  // undefined
    console.log(x); // global

```
   
반면 전역 변수는 어떨까. 지난번에 알아보았다시피, 전역 변수는 선언문이 어디에 있던 상관 없이 가장 먼저 생성된다. 
런타임 이전에 JS엔진에 의해 먼저 실행되는 것이다. 문제는 이 전역 변수가 전역 객체(globalThis)에 생성된다는 것이다. 
**즉, 전역 변수는 전역 객체의 생명 주기와 일치한다.**
   
이러한 특징들 때문에 전역 변수는 여러가지 문제점을 갖는다.
   

```
    1. 암묵적 결합. 모든 코드가 전역 변수를 참조하고 변경할 수 있다.
    2. 긴 생명 주기. 메모리 리소스 소비와 변수가 변경될 위험이 크다.
    3. 스코프 채인의 종점. 차이는 크지 않다지만 전역 변수의 검색 속도가 제일 느리다.
    4. 네임스페이스 오염. 하나의 전역 스코프를 공유하기에 식별자가 중복될 수 있다.
```
   

## 전역 변수의 사용을 억제하는 방법

전역 변수를 반드시 사용해야 할 이유를 찾지 못한다면 지역 변수를 사용해야 한다. 변수의 스코프는 좁을수록 좋다. 
전역 변수의 사용을 억제할 수 있는 몇 가지 방법을 살펴보자.
   

**1. 즉시 실행 함수**
   
모든 코드를 즉시 실행 함수로 감싸면 모든 변수는 즉시 실행 함수의 지역 변수가 된다.
```javascript

    (function () {
        var foo = 10;   // 즉시 실행 함수의 지역 변수
    }());

    // console.log(foo);   // Uncaught ReferenceError: foo is not defined

```
   
**2. 네임스페이스 객체**
   
전역에 네임스페이스 역활을 담당할 객체를 생성하고 전역 변수처럼 사용하고 싶은 변수를 프로퍼티로 추가하는 방법이다. 
```javascript

     let MYAPP = {};

    MYAPP.name = 'Lee';
    MYAPP.person = {
        name : 'Kim',
        address : 'Seoul'
    };

    console.log(MYAPP.name);        // Lee
    console.log(MYAPP.person.name); // Kim

```
   
네임스페이스 안에 또 다른 네임스페이스 객체를 프로퍼티로 추가해서 네임스페이스를 계층적으로 구성할 수 있다.
   

**3. 모듈 패턴**
   
클래스를 모방해서 변수와 함수들을 모아 즉시 실행 함수로 감싼 형태다. 클로저 기능으로 작동하기 때문에 나중에 자세히 살펴볼 내용이다. 
일단 이런게 있다는 정도로만 봐두자.
```javascript
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
```
   
위의 예제는 객체를 반환한다. 이 객체에 외부에 노출하고 싶은 변수나 함수들을 담아 반환하는 것이다. 
여러모로 java의 class 방식과 비슷하다.