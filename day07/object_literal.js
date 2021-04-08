let exec = {
     1 : true
    ,2 : true
    ,3 : true
    ,4 : true
    ,5 : true
    ,6 : true
    ,7 : true
};

if (exec[1]) {
    
    // 아래와 같이 중괄호 안에, key : value 형식으로 저장되는 내용을 프로퍼티(property) 라고 한다.
    // 0개 이상의 프로퍼티를 가지고 있으면 객체로 분류된다.
    // 함수 등도 프로퍼티로 등록할 수 있지만 권장하지 않는다.
    let person = {
        name : 'Lee',
        sayHello : function () {    // 함수 값을 가지고 있는 프로퍼티는 메서드(method)라는 별도의 명칭을 쓴다.
            console.log(`Hello! My name is ${this.name}.`);
        }
    };

    console.log(typeof person); // object
    console.log(person);    // {name : "Lee", sayHello: f}

    // 만약 중괄호 안에 프로퍼티를 정의하지 않으면 빈 객체가 생성된다.
    let empty = {}; // 빈 객체
    console.log(typeof empty);  // object

}

if (exec[2]) {

    let person = {
        // 프로퍼티 키는 name, 프로퍼티 값은 'Lee'
        name : 'Lee',
        // 프로퍼티 키는 age, 프로퍼티 값은 20
        age : 20
    };

    // 프로퍼티 키 값은 공백을 제외한 모든 형태로 입력이 가능하다.
    // 하지만 보통은 키 값으로 문자열을 쓰게된다.
    // 그러므로 네이밍 규칙을 따르지 않는 이름에는 어지간하면 따옴표를 쓰자.
    let myName = {
          firstName : 'Ryang-Kwon'  // 식별자 네이밍 규칙을 준수하는 프로퍼티 키
        , 'last-name' : 'Kim'       // 식별자 네이밍 규칙을 준수하지 않는 프로퍼티 키
    }

    console.log(myName);    // {firstName : "Ryang-Kwon", last-name: "Kim"}

    // 따옴표를 사용 안 했을 때 벌어질 수 있는 문제.
    let myName2 = {
          firstName : 'Ryant-Kwon'
        //, last-name : 'Kim'     // Uncaught SyntaxError: Unexpected token '-', 연산자 마이너스(-)로 인식한다.
    };

}

if (exec[3]) {

    let obj = {};
    let key = 'hello';

    // ES5: 프로퍼티 키 동적 생성
    obj[key] = 'world';
    // ES6: 계산된 프로퍼티 이름
    //obj = { [key]: 'world' };

    console.log(obj);   // {hello : "world"}

    let foo = {
        '': ''  // 빈 문자열도 프로퍼티 키로 사용할 수 있다.
    };

    console.log(foo);   //  {"" : ""}

    // 프로퍼티의 키(key)는 문자열이던 숫자던 뭐든지 쓸 수 있지만...
    // 심벌을 제외한 키 값들은 내부적으로 문자열로 변환된다.
    let foo2 = {
        0 : 1,
        1 : 2,
        2 : 3
    };

    console.log(foo2);  // {0: 1, 1: 2, 2: 3}
    // 언뜻 보기엔 숫자로 저장된 것 같지만 키 값은 문자열로 바뀐 상태다.

    // 이미 존재하는 프로퍼티를 중복 선언하면 덮어쓰기가 된다.
    // 에러가 발생하지 않기 때문에 조심해야 한다.
    let foo3 = {
        name : 'Lee',
        name : 'Kim'
    };

    console.log(foo3); // {name: "Kim"}

}

if (exec[4]) {

    let person = {
        name : 'Kim'
    };

    // 마침표 표기법에 의한 프로퍼티 접근
    console.log(person.name);   // Kim

    // 대괄호 표기법에 의한 프로퍼티 접근
    console.log(person['name']);    // Kim

    // 대괄호 표기법에 접근 시 키 값은 반드시 따옴표로 감싼 문자열이어야 한다.
    // 따옴표가 없으면 식별자로 구분된다.
    console.log(person[name]);      // undefined

    // 객체에 존재하지 않는 프로퍼티는 undeined를 반환한다.
    console.log(person.age);        // undefined

}

if (exec[5]) {

    // 프로퍼티 값 갱신.

    let person = {
        name : 'Lee'
    };

    // person 객체에 name 프로퍼티가 존재하므로 name 프로퍼티의 값이 갱신된다.
    person.name = 'Kim';

    console.log(person);    // {name : "Kim"}


    // 프로퍼티 동적 생성.
    
    // person 객체에는 age 프로퍼티가 존재하지 않는다.
    // 그러므로 age 프로퍼티가 동적으로 생성되고 값이 할당 된다.
    person.age = 20;

    console.log(person);    // {name: "Kim", age: 20}

    // 프로퍼티 삭제

    // delete 연산자로 삭제한다.
    delete person.age;

    // 존재하지 않는 프로퍼티를 삭제하는 소스는 그냥 무시된다.
    delete person.joker;

    console.log(person);    // {name: "Kim"}

}

if (exec[6]) {

    // ES6에서는 변수 이름과 프로퍼티 키가 동일할 경우 프로퍼티 키를 생략 할 수 있다.
    let x = 1, y = 2;
    const obj = { x, y };

    console.log(obj);   // {x: 1, y: 2}

    // ES6에서는 객체를 선언하는 과정에서 대괄호를 이용해서 프로퍼티 키 값을 연산 값으로 설정할 수 있다.
    const prefix = 'prop';
    let i = 0;

    const obj2 = {
        [`${prefix}-${++i}`] : i,
        [`${prefix}-${++i}`] : i,
        [`${prefix}-${++i}`] : i
    };

    console.log(obj2);

    // ES6에서는 프로퍼티에 메서드(method)를 정의할 때 function 키워드 등을 축약 할 수 있다.
    const obj3 = {
        name : 'Kim',
        /* sayHi :  function() {
            console.log('Hi! ' + this.name);
        } */
        sayHi() {
            console.log('Hi! ' + this.name);
        }
    }

}