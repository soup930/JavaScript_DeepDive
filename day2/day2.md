[2일차] 변수(Variable)의 선언문.
===============================

   
## Day1에 알아본 var 키워드의 단점.

1. 선언과 동시에 undefined 값이 초기화 되어 변수 호이스팅이 발생.
2. 중복 선언 가능.
3. 함수 레벨 스코프.
   
## 또 다른 키워드 let

ES6에서 새롭게 도입된 변수 선언 키워드 let.   
기존의 var 키워드의 단점들을 커버하는 키워드이기에 var 보다는 let 키워드를 사용하는 것이 추천되고 있다.

```javascript
let foo;    // var의 대표적인 3가지 단점을 모두 커버하는 대단한 녀석이다.
```

### 1. 변수 호이스팅 방지

let 키워드는 선언 단계와 초기화 단계가 구분되어 있다. var 키워드와는 달리 선언만으로 undefined 값이 초기화 되지도, 실행 컨텍스트(execution context)에 등록되지도 않는다.
다만 런타임 시점에 변수가 생성되는 건 var과 같다.
```javascript
    console.log(foo); 
    // ReferenceError 발생. 변수에 값이 할당 되기 전까지 scope에 등록되지 않는다.
    // 변수가 이미 선언 되었지만 초기화는 되지 않은 이 구간을 일시적 사각지대(Temporal Dead Zone : TDZ) 라고 부른다.
    let foo;   
    // Runtime 시에 변수가 선언 된다.
    console.log(foo); 
    // undfined 변수 선언문에서 원시값 undefined가 초기화 되었다.
    
    foo = 123;
    // 임의의 값을 다시 할당한다.
    console.log(foo);
    // 123
```


### 2. 변수 중복 선언 방지

var 키워드의 경우 같은 변수명으로 중복 선언이 일어날 시, JS 엔진이 초기화문으로 변환해준다.
하지만 이는 JS 엔진의 유도리가 오히려 독이 된 케이스가 되었다.

let 키워드는 var 키워드의 이러한 단점을 개선하였다.

```javascript
    let foo = 123;

    let foo = 456;
    // SyntaxError 발생. let, const 키워드는 스코프 내의 중복 선언을 허용하지 않는다.

    foo = 456;
    // 선언문과 할당문이 확실히 구별된다.

    console.log(foo);
    // 456;
```


### 3. 블록 레벨 스코프(Block level scope)

scope란 간략하게 설명하자면 실행 컨텍스트에 등록될 때부터 사라지기 까지의 시점이다.
한 마디로 해당 변수(객체)를 참조할 수 있는, 해당 변수(객체)가 살아 있는 시간이라고 할 수 있다. 
var 키워드는 함수 블록 내에서만 별도의 scope를 가질 수 있다. (함수 레벨 스코프)
함수 블록 이외의 곳에서 선언되는 var 변수는 모두 전역 객체 window의 scope와 같은 scope를 갖는다. 즉 전역 변수가 되는 것이다.
var 키워드는 오직 함수(Function) 내에서만 지역 변수를 만들 수 있다.

반면 let 키워드는 모든 코드 블록에서 별도의 scope를 지원한다.
함수 뿐만 아니라 조건문, 반복문, 일반 객체 등 블록을 가지고 있는 모든 공간에서 지역 변수를 선언 할 수 있다.

```javascript
    let foo = 123;  // 전역 변수.

    {
        let foo = 456;  // 지역 변수.
        let bar = 789;  // 지역 변수.
        
        console.log(foo);   // 456
        console.log(bar);   // 789
    }

    console.log(foo);   // 123
    console.log(bar);   // ReferenceError
```

전역 변수와 같은 변수명이라도 지역 변수로 중복 선언될 수 있다. 서로 다른 scope를 사용하기 때문이다.
이런 특징 때문에 let 키워드나 var 키워드로 전역 변수를 선언 하는건 그리 바람직한 방법이 아니다.
그렇다면 전역 변수를 선언 할 때는 이 키워드를 쓰자.

---------------------------------------------

## 상수 키워드 const(Contraint)

let , var 키워드는 일단 변수가 선언되면 변수 값을 마음껏 바꿀 수 있다. 이를 변수 값의 재할당이라고 한다.
왜 변수 값의 변경이 아니라 재할당일까.

A라는 변수에 '1'이라는 값이 할당 되면 그 '1'은 메모리의 어딘가에 저장 된다. 그리고 A는 '1'이 저장된 메모리의 위치를 참조한다.
그런데 이후에 A = '2' 라는 할당문이 작성되었다고 해보자.

#### 그렇다면 '2'는 새로운 메모리 공간에 저장되고 A는 '2'가 저장된 메모리의 위치를 참조한다.
기존의 '1'이 메모리에서 지워지는 것이 아니다. 전혀 새로운 위치에 새로운 값을 저장한 뒤 새로운 위치를 참조할 뿐이다. (물론 더이상 쓰이지 않는 '1'은 추후 가비지 콜렉터가 지울 것이다.) 그렇기 때문에 변수 값 재할당이라고 불리는 것이다.
#### 그리고 const 키워드는 이러한 변수 값 재할당을 금지한다.

```javascript
    const FINAL_FOO = 123;
    // const 키워드는 상수를 선언할 때 사용한다.
    // const 키워드는 선언과 값의 초기화가 함께 이루어져야 한다.

    // FINAL_FOO = 456;    //Uncaught TypeError
    // const 키워드는 변수값의 재할당이 허락되지 않는다.

    {
        const FINAL_FOO = 456;
        // 하지만 블록 레벨 스코프를 가지기 때문에 지역 상수로 선언이 가능하다.
        console.log(FINAL_FOO);
        // 456
    }
```

JS는 변수 값으로 단순한 문자열이 아닌 객체를 할당 할 수 있다. 그리고 const 상수에 객체가 할당 될 경우 해당 객체의 프로퍼티 값은 변경이 가능하다.

```javascript
    const FINAL_OBJECT = {
        value : '123'
    };

    FINAL_OBJECT.value = '456';
    // 값이 위치한 메모리 위치가 변하는 것이 아닌, 메모리 내의 객체의 프로퍼티 값이 변한다.
    // 고로 값 재할당이 성립되지 않는다.

    console.log(FINAL_OBJECT.value);
    // 456
```

---------------------------------------------

## let, const 키워드의 호이스팅

let, const 키워드는 블록 레벨의 스코프를 갖는다. 하지만 이러한 특징 때문에 호이스팅이 발생하기도 한다.

```javascript
    let foo = 'let 전역';           // let 전역 변수
    var foo2 = 'var 전역';          // var 전역 변수
    const conVar = 'const 상수';    // 상수;

    {   // 블록1 start

        console.log(foo);   // let 전역
        console.log(foo2);  // var 전역
        console.log(conVar);// const 상수

    }   // 블록1 end

    {   // 블록2 start

        console.log(foo);   // ReferenceError, 전역 변수를 참조 하지 않는다.
        console.log(foo2);  // var 전역, 전역 변수를 참조 한다.
        console.log(conVar);// ReferenceError, 전역 변수를 참조 하지 않는다.

        let foo = 'let 지역';           // let 지역 변수
        var foo2 = 'var 지역';          // var 전역 변수에 재할당 한다.
        const conVar = 'const 지역';    // 지역 상수;

        console.log(foo);   // let 지역, 지역 변수를 참조 한다.
        console.log(foo2);  // var 지역, 전역 변수를 참조 한다.
        console.log(conVar);// const 지역, 지역 변수를 참조 한다.

    }   // 블록2 end
```

블록2에는 전역 변수와 같은 이름으로 지역 변수를 선언했다. 지역 변수가 선언되지 않은 블록1은 전역 변수를 참조한다.
let, const 키워드는 블록 내에서 선언 될 경우 블록 스코프를 생성한다. 블록 내에서는 블록 스코프가 전역 스코프보다 우선 순위가 높기 때문에 블록 스코프를 참조하게 된다.   
즉, 같은 이름으로 선언 된 let, const 지역 변수가 있는 경우 해당 블록은 먼저 선언 된 전역 변수를 참조하지 않는다.