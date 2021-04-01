# 함수

드디어 올 것이 왔다. JS의 핵심 중의 핵심이라 할 수 있는 함수다.   
함수란 뭐다? 하나의 실행 과정이다. 데이터(매개변수)를 받아서 내부에서 처리한 뒤, 처리한 값을 뱉어내는 거다.   
데이터(매개변수)를 안 받는 경우도 있고, 뱉어내는 값 없이 내부에서 처리만 하는 경우도 있다.
중요한 건 내부에 처리 과정을 갖춘 하나의 실행 과정이라는 것이다.

```javascript
    function exFunction(x, y) {
        
        // 매개변수 x와 y를 받아서 기능을 처리한다.
        let result = x + y;

        // 해당 함수는 처리한 기능을 반환한다.
        return result;
    }

    // 반환 된 값이 출력된다.
    console.log(    exFunction(12, 5)   );     // 17
    // 함수의 장점은 코드를 몇 번이고 재사용 할 수 있다는 것이다.
    console.log(    exFunction(11, 2)   );      // 13
    console.log(    exFunction(13, 13)  );      // 26
    console.log(    exFunction(1,6)     );      // 7



    function exFunction2(x, y) {
        
        console.log(x + y);

        //반환값이 없는 함수다.
    }

    // 함수의 블록 내부에 작성된 코드가 그대로 실행된다.
    exFunction2(13, 5);         // 18
```

## 함수 리터럴

함수도 리터럴로 생성할 수 있다. 이게 무슨 뜻이냐고? 함수가 객체라는 뜻이다. 함수는 객체다. 세번 말한다. 함수는 객체다.

```javascript

    // 함수는 객체다.
    // 고로 함수는 변수에 참조값을 할당 할 수있다.
    let func1 = function (x, y) {
        return x + y;
    };

    // 디렉토리를 출력해보면 함수는 prototype 등과 같은 기본 프로퍼티들을 갖고 있다.
    // prototype이 뭔지는 나중 얘기고, 프로퍼티들로 구성되어 있다는 것으로 객체임을 확인할 수 있다.
    console.dir(func1);

```

## 함수를 정의하는 방법들

함수를 정의하는 방법은 4가지가 있다. 소스를 보자.

```javascript
    
    // 함수 선언문
    function func1(x, y) {
        return x + y;
    }

    // 함수 표현식(리터럴)
    let func2 = function(x,y) {
        return x + y;
    };

    // 생성자 만들기
    let func3 = new Function('x', 'y', 'return x + y');

    // 화살표 함수(ES6)
    let func4 = (x,y) => x + y;
    
```