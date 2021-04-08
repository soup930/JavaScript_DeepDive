let exec = {
      1 : true
    , 2 : true
    , 3 : true
    , 4 : true
    , 5 : true
    , 6 : true
    , 7 : true
};

if (exec[1]) {
    
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

}

if (exec[2]) {

    // 함수는 객체다.
    // 고로 함수는 변수에 참조값을 할당 할 수있다.
    let func1 = function (x, y) {
        return x + y;
    };

    console.dir(func1);

}

if (exec[3]) {

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
    
}