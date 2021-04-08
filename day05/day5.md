# 타입 변환

앞서 말했듯이 js 변수는 데이터 타입이 따로 명시되지 않는다.
그만큼 유연한 언어이며 언뜻 똑똑해 보일 수 있는 언어이지만 언제나 그렇듯 유도리는 양날의 검과 같다.   

개발자가 변수의 데이터 타입을 통제하지 못하는 사상 유래 없는 막장 코딩을 하게 될 수도 있다.

# 암묵적 타입 변환

JS 엔진은 값을 처리할 때 처리된 결과 값의 타입을 적절하게 변환한다. 이를 암묵적 타입 변환(implict corecion)
또는 타입 강제 변환(type coercion)이라 한다.   
말 그대로 JS 엔진이 알아서 처리하는 것이기 떄문에 개발자의 의도와는 무관하게 타입을 변환한다.
그러므로 어떤 경우에 어떤 타입을 내뱉는지 알아둘 필요가 있다.

```javascript
    let x = 10;

    // 암묵적 타입 변환
    // 문자열을 연결 연산자는 숫자 타입 x의 값을 바탕으로 새로운 문자열을 생성한다.

    let str = x + '';
    console.log(typeof str, str);   // string 10

    // x 변수의 값이 변경된 것은 아니다.
    // 타입 변환이란 기존의 원시 값을 사용해 다른 타입의 새로운 원시 값을 생성하는 것이다.
    console.log(typeof x, x);   // number 10
```

## 문자열 타입으로 변환되는 경우

처리한 값이 문자열 타입으로 변환되는 경우다. 쉽게 생각해서 문맥상 문자열로 처리되어야 할 때에 문자열로 변환된다.

```javascript
    // 문자열로 암묵적 타입 캐스팅.
    // 문맥상 모든 피연산자가 문자열이어야 하는 경우에 이뤄진다.
    
    // 숫자 에서 문자열로
    console.log(    0 + ''      );  // -> "0"
    console.log(    -0 + ''     );  // -> "0"
    console.log(    1 + ''      );  // -> "1"
    console.log(    -1 + ''     );  // -> "-1"
    console.log(    NaN + ''    );  // -> "NaN"
    console.log(    Infinity + ''); // -> "Infinity"
    console.log(    -Infinity + '');// -> "-Infinity"
    
    // 0, 1, NaN, Infinity 등은 숫자로 표현할 수 있지만 문자열로도 표현이 가능하다.
    // 하지만 공백('')은 숫자로 표현이 불가능하다.
    // 고로 두 값이 합쳐질 때, JS 엔진은 결과값을 문자열로 변환한다.

    // 불리언 타입에서 문자열로
    console.log(    true + ''   );  // -> "true"
    console.log(    false + ''  );  // -> "false"

    // 마찬가지로 true, false는 불리언 타입뿐만 아니라 문자열로 표현이 가능하다.
    // 하지만 공백('')은 역시 불리언으로 표현이 불가능하다.
    // 고로 두 값이 합쳐질 때, JS 엔진은 결과값을 문자열로 변환한다.

    // null 타입
    console.log(    null + ''   );  // -> "null"

    // undefined 타입
    console.log(    undefined + ''  ); // -> "undefined"

    // 심벌 타입
    // console.log(    (Symbol()) + '' ); // TypeError: Cannot convert a Symbol value to a string
    // 심벌타입은 다른 타입으로 캐스팅 될 수 없다.

    // 객체 타입
    console.log(    ({}) + ''   );  // -> "[object Object]"
    console.log(    Math + ''   );  // -> "[object Math]"
    console.log(    [] + ''     );  // -> ""
    console.log(    [10, 20] + ''); // -> "10,20"
    console.log(    (function(){}) + '' );  // -> "function(){}"
    console.log(    Array + ''  );  // -> "function Array() { [native code] }"

    // 템플릿 리터럴
    console.log(    `1 + 1 = ${1 + 1}`  );  // "1 + 1 = 2"
    // 처리된 결과 값을 문자열로 바꾼다.
```

## 숫자 타입으로 변환되는 경우

주로 + 단항 연산자를 사용했을 때 결과값이 숫자 타입으로 변환된다. 결과값이 숫자 타입으로 변환될 수 없는 경우에는 NaN 값을 리턴한다.

```javascript
    // 숫자로 암묵적 캐스팅.
    // + 단항 연산자는 피연산자를 숫자 타입의 값으로 변환한다.
    // 숫자로 계산되지 않는 값은 NaN을 반환한다.

    // 문자열 타입
    console.log(    + ''    );  // -> 0
    console.log(    + '0'   );  // -> 0
    console.log(    + '1'   );  // -> 1
    console.log(    + 'string'  );  // -> NaN

    // 불리언 타입
    console.log(    + true  );  // -> 1
    console.log(    + false );  // -> 0

    // null 타입
    console.log(    + null  );  // -> 0

    // undefined 타입
    console.log(    + undefined );  // -> NaN

    // 심벌 타입
    //console.log(    + Symbol()  );  // TypeError: Cannot convert a Symbol value to a number
    // 심벌 타입은 다른 타입으로 변환되지 않는다.

    // 객체 타입
    console.log(    + {}    );  // -> NaN
    console.log(    + []    );  // -> 0
    console.log(    + [10, 20]  );  // -> NaN
    console.log(    + (function(){})    );  // -> NaN
```

그 외에도 Boolean 타입으로 변환 되는 경우도 있지만 이 경우는 방법이 복잡하고, 발생하는 빈도도 아주 낮기 떄문에 넘어간다.

# 명시적 타입 변환

이렇듯 여러가지 경우에 있어서 JS 엔진은 결과값의 타입을 바꿔 버린다.
하지만 그렇다고 해서 개발자가 JS 엔진이 바꿔주는 데로만 사용할 수는 없다.   

변수의 타입은 개발자가 임의로 변환 시킬 수 있으며 이를 명시적 타입 변환(explict coercion) 또는 타입 캐스팅(type casting)이라 한다.

```javascript
    let x = 10;

    // 명시적 타입 변환
    // 숫자를 문자열로 타입 캐스팅.
    let str = x.toString();
    console.log(typeof str, str);   // string 10

    // x 변수의 값이 변경된 것은 아니다.
    // 타입 변환이란 기존의 원시 값을 사용해 다른 타입의 새로운 원시 값을 생성하는 것이다.
    console.log(typeof x, x);   // number 10
```

## 문자열 타입으로 변환

문자열 타입이 아닌 값을 문자열 타입으로 변환하는 경우다. 3가지 방법이 있는데 소스를 살펴보자.

```javascript
    // 문자열 타입으로 명시적 캐스팅.
    
    // 1. String 생성자 함수 호출.

    // 숫자 타입
    console.log(    String(1)  );   // -> "1"
    console.log(    String(NaN) );  // -> "NaN"
    console.log(    String(Infinity)    );  // -> "Infinity"
    // 불리언 타입
    console.log(    String(true)    );  // -> "true"
    console.log(    String(false)   );  // -> "false"



    // 2. Object.prototype.toString 메서드 사용.

    // 숫자 타입
    console.log(    (1).toString()    );  // -> "1"
    console.log(    (NaN).toString()  );  // -> "NaN"
    console.log(    (Infinity).toString() );  // -> "Infinity"
    // 불리언 타입
    console.log(    (true).toString()   );  // -> "true"
    console.log(    (false).toString()  );  // -> "false"



    // 3. 암묵적 타입 변환을 이용.
    
    // 숫자 타입
    console.log(    1 + ''  );  // -> "1"
    // 불리언 타입
    console.log(    true + ''   );  // -> "true"
```

## 숫자 타입으로 변환

당연히 숫자 타입으로도 변경할 수 있어야 한다. 일단 대표적인 3가지 방법을 살펴보자.

```javascript
      // 숫자 타입으로 명시적 변환.

    // 1. Number 생성자 함수 호출.
    
    // 문자열 타입
    console.log(    Number('0')     );  // -> 0
    console.log(    Number('-1')    );  // -> -1
    console.log(    Number('abc')   );  // -> NaN
    // 불리언 타입
    console.log(    Number(true)    );  // -> 1
    console.log(    Number(false)   );  // -> 0



    // 2. parseInt, parseFloat 함수 사용. (문자열만 변환 가능)
    
    // 문자열 타입
    console.log(    parseInt('0')   );  // -> 0
    console.log(    parseInt('-1')  );  // -> -1
    console.log(    parseFloat('11.11') );  // -> 11.11
    


    // 3. 암묵적 타입 변환을 이용.

    // + 단항 산술자 이용
    console.log(    + '0'   );  // -> 0
    console.log(    + 'true'    );  // -> 1

    // * 산술 연산자 이용
    console.log(    '0' * 1     );  // -> 0
    console.log(    '-1' * 2    );  // -> 2
    console.log(    true * 1    );  // -> 1
    console.log(    false * 1   );  // -> 0

```

## 불리언 타입으로 변환

조건문이나 변수 체크 등에서 사용하기에 적합한 기능이다.

```javascript
     // 불리언 타입으로 명시적 변환.

    // 1. Boolean 생성자 함수 호출.

    // 문자열 타입
    console.log(    Boolean('x')    );  // -> true
    console.log(    Boolean('')     );  // -> false
    console.log(    Boolean('false'));  // -> true
    // 문자열 값이 있으면 true 반환, 값이 없으면 false 반환.
    // 변수에 문자열 값이 있는지 체크하는 용도로 사용 할 수 있을 듯하다.

    // 숫자 타입
    console.log(    Boolean(0)      );  // -> false
    console.log(    Boolean(1)      );  // -> true
    console.log(    Boolean(NaN)    );  // -> false
    console.log(    Boolean(Infinity)); // -> true
    // 0은 false, 1은 true로 반환, 유효하지 않은 값은 false, 유효한 값은 true 반환.

    // 그 이외의 타입
    console.log(    Boolean(null)   );  // -> false
    console.log(    Boolean(undefined));// -> false

    

    // 2. 부정 논리 연산자(!)를 두 번 사용.

    // 문자열 타입
    console.log(    !!'x'       );  // -> true
    console.log(    !!''        );  // -> false
    console.log(    !!'false'   );  // -> true
    // 문자열 값이 있으면 true 반환, 값이 없으면 false 반환.

    // 숫자 타입
    console.log(    !!0         ); // -> false
    console.log(    !!1         ); // -> true
    console.log(    !!NaN       ); // -> false
    console.log(    !!Infinity  ); // -> true

    // 그 이외의 타입
    console.log(    !!null      ); // -> false
    console.log(    !!undefined ); // -> false
```

## 조금 이상한 불리언 타입으로 변환

JS 문법 중에는 불리언 타입으로만 해석되는 어문도 있다. 조건문이나 제어문 등에 들어가는 조건식(true, false 구별하는 부분)이 그렇다.   
어떤 값을 넣어도 true, false 문으로만 해석되며 이 때 true로 해석되는 값을 Truthy 값, false로 해석되는 값을 Falsy 값이라 한다.

```javascript
    // 제어문이나 삼항 연산자 등에 들어가는 조건식은 무조건 불리언 값으로 해석된다.
    
    if ('')     {   console.log('false')    } 
    if (true)   {   console.log('true')    }   // true
    if (0)      {   console.log('false')    }  
    if ('str')  {   console.log('true')    }   // true
    if (null)   {   console.log('false')    }  

    // JS 엔진은 불리언 타입이 아닌 값을 Truthy (참으로 평가) 혹은 Falsy (거짓으로 평가)로 나눈다.
    // 아래의 값들은 false로 평가되는 Falsy 값이다.

    if (!false)     {   console.log(`false는 Falsy 값이다.`)    }
    if (!undefined) {   console.log('undefined는 Falsy 값이다.')    }
    if (!null)      {   console.log(`null은 Falsy 값이다.`)     }
    if (!0)         {   console.log(`0은 Falsy 값이다.`)        }
    if (!NaN)       {   console.log(`NaN은 Falsy 값이다.`)}

    // 이 외의 값들은 모두 Truthy 값이다.
    
```