let exec = {
      1 : false
    , 2 : false
    , 3 : false
    , 4 : true
    , 5 : true
    , 6 : true
    , 7 : true
};

if (exec[1]) {

    // 논리합(||) 연산자
    // 두 값을 비교하여 하나의 값이라도 Truthy 값이면 true 반환
    console.log(    'Cat' || 'Dog'  );  // "Cat"    Truthy 값이 나오면 그 뒤에 나오는 값은 무시한다.
    console.log(    false || 'Dog'  );  // "Dog"
    console.log(    'Cat' || false  );  // "Cat"

    // 논리곱(&&) 연산자
    // 두 값을 비교하여 두 값 모두 Truthy 나와야 true 반환
    console.log(    'Cat' && 'Dog'  );  // "Dog"    두 값이 모두 Truthy 판정나는 시점의 값을 반환한다.
    console.log(    false && 'Dog'  );  // false
    console.log(    'Cat' && false  );  // false
    
}

if (exec[2]) {
    
    // 단축 평가로 if 문 대체하기

    let done = true;
    let message = '';

    // done이 true일 때
    if (done) message = '완료';
    console.log(message);   // 완료

    // done이 true일 때 (단축 평가)
    message = done && '완료';
    console.log(message);   // 완료


    done = false;
    
    // done이 false일 때
    if (!done) message = '미완료';
    console.log(message);   // 미완료

    // done이 false 일 때 (단축 평가)
    message = done || '미완료'
    console.log(message);

}

if (exec[3]) {
    
    // 또 다른 단축 평가 삼항 연산자.

    let done = true;
    let message = '';

    // if..else 문.
    if (done) { message = '완료';   }
    else      { message = '미완료'; }
    console.log(message);   // 완료

    // if..else 문 삼항 연산자로 대체하기.
    message = done ? '완료' : '미완료';
    console.log(message);   // 완료
    
}

if (exec[4]) {

    // 1. 객체 내의 프로퍼티가 없거나 혹은 undefined일 경우를 체크.

    let elem = null;
    //console.log(elem.value);    // TypeError : Cannot read property 'value' of null

    let value = elem && elem.val1;
    console.log(value); // null
    // elem이 null, undefined같은 Falsy 값이면 elem으로 식별.
    // elem이 Truthy 값이면 elem.value로 식별.


    // 2. 함수 매개변수에 기본값 설정.

    let getStringLength = function(str) {
        str = str || '';    // 매개변수가 입력되지 않았을 경우 기본값을 '' 로 설정.
        return console.log(str.length);
    };

    getStringLength();  // 0;
    getStringLength('hello')    // 5;

}

if (exec[5]) {

    let elem = null;

    // elem이 null 또는 undefined면 undefined를 반환하고, 그렇지 않으면 우항의 프로퍼티 참조를 이어간다.
    let value = elem?.value;
    console.log(value)  // undefined


    // && 연산자와 차이는?
    
    let str = '';

    // && 연산자로 문자열의 길이(length)를 참조한다.
    let length = str && str.length;
    // 공백('')은 Falsy 값으로 식별된다. 연산이 종료된다.
    console.log(length);    // ''

    // 옵셔널 체이닝으로 문자열 길이(length)를 참조한다.
    length = str?.length;
    // 변수값이 null, undefined가 아니라면 그대로 연산을 진행한다.
    console.log(length);    // 0

}

if (exec[6]) {
    
    // 좌항읜 피연산자가 null 또는 undefined이면 우항의 피연산자를 반환하고,
    // 그렇지 않으면 좌항의 피연산자를 반환한다.   
    // 보통은 변수에 기본값을 주기 위해 사용한다.
    let foo = null ?? 'default string';
    console.log(foo);   // default string

    // || 연산자와의 차이는?

    // || 연산자도 변수에 기본값을 주는 용도로 사용되고는 한다.
    // 근데 Falsy 값인 0이나 ''을 기본 값으로 주고자 한다면 문제가 발생한다.
    foo = '' || 'default string';
    console.log(foo);   // default string

    // null 병합 연산자는 null 또는 undefined가 아니라면 유효한 값으로 식별한다.
    foo = '' ?? 'default string';
    console.log(foo);

}