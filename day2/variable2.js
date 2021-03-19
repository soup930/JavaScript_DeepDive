
// 예제 실행기 (true : 실행, false : 실행 안 함)
let block = {
      1 : false
    , 2 : false
    , 3 : false
    , 4 : false
    , 5 : false
    , 6 : false
};


if (block[1]) {

    let foo;    // var의 대표적인 3가지 단점을 모두 커버하는 대단한 녀석이다.

}


if (block[2]) {
    
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

}


if (block[3]) {
    
    let foo = 123;

    // let foo = 456;
    // SyntaxError 발생. let, const 키워드는 스코프 내의 중복 선언을 허용하지 않는다.

    foo = 456;
    // 선언문과 할당문이 확실히 구별된다.

    console.log(foo);
    // 456;

}


if (block[4]) {

    let foo = 123;  // 전역 변수.

    {
        let foo = 456;  // 지역 변수.
        let bar = 789;  // 지역 변수.
        
        console.log(foo);   // 456
        console.log(bar);   // 789
    }

    console.log(foo);   // 123
    console.log(bar);   // ReferenceError

}


if (block[5]) {
    
    const FINAL_FOO = 123;
    // const 키워드는 상수를 선언할 때 사용한다.
    // const 키워드는 선언과 값의 초기화가 함께 이루어져야 한다.

    // FINAL_FOO = 456;    //Uncaught TypeError
    // const 키워드는 변수값의 재할당이 허락되지 않는다.

    {
        const FINAL_FOO = 456;
        // 하지만 블록 레벨 스코프를 가지기 때문에 지역 변수로 선언이 가능하다.
        console.log(FINAL_FOO);
        // 456
    }
}


if (block[6]) {

    const FINAL_OBJECT = {
        value : '123'
    };

    FINAL_OBJECT.value = '456';
    // 값이 위치한 메모리 위치가 변하는 것이 아닌, 메모리 내의 객체의 프로퍼티 값이 변한다.
    // 고로 값 재할당이 성립되지 않는다.

    console.log(FINAL_OBJECT.value);
    // 456
}