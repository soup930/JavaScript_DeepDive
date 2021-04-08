let exec = {
     1 : true
}


if (exec[1]) {

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

}
