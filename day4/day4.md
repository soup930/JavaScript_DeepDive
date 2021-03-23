# 변수 (보충)

JS를 포함한 프로그래밍 언어들은 변수에 저장된 값을 타입별로 나눈다. 예를 들면 숫자는 Number, 문자는 Character 등으로 말이다. 왜냐하면...   
   
1. 각 타입에 따라 확보해야 하는 메모리 공간의 크기가 다르다.   
2. 각 타입에 따라 값을 참조할 때 읽어야 하는 메모리 공간의 크기가 다르다.   
3. 각 타입에 따라 값을 읽어 들인 후 2진수로 해석하는 방법이 다르다.   
   
이와 같은 이유로 C나 자바 같은 애들은 변수를 선언 할 때 아예 타입을 명시 한다. 이를 명시적 타입 선언이라 한다. 
어떤 타입으로 해석할지 변수 앞에 미리 써놓고, 컴파일 할 때 그대로 해석한다.   
   
하지만 JS는 다르다. 능동적인 놈이다.  
JS는 변수 값을 할당 하는 시점에 타입을 추론(type interface)하는 놈이다.   
참조하는 값에 따라 변수의 타입은 마음껏 변할 수 있다.

```javascript
        let foo;
    console.log(typeof foo);    // undefined

    foo = 3;
    console.log(typeof foo);    // number

    foo = 'Hello';
    console.log(typeof foo);    // string

    foo = true;
    console.log(typeof foo);    // boolean

    foo = null;
    console.log(typeof foo);    // object

    foo = Symbol();
    console.log(typeof foo);    // symbol

    foo = {};   // 객체
    console.log(typeof foo);    // object

    foo = [];   // 배열
    console.log(typeof foo);    // object

    foo = function(){}; // 함수
    console.log(typeof foo);    // function

    // JS 변수는 선언이 아닌 할당에 의해 타입이 결정된다.
    // JS 변수는 언제든지 타입이 동적으로 변할 수 있다.
```