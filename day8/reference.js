let exec ={
      1 : true
    , 2 : true
    , 3 : true
    , 4 : true
    , 5 : true
    , 6 : true
    , 7 : true
};

if (exec[1]) {

    let str = 'string';

    // 문자열은 유사 배열이므로 배열과 유사하게 인덱스를 사용해 각 문자에 접근할 수 있다.
    // 하지만 문자열은 원시 값이므로 변경할 수 없다. 이때 에러가 발생하지 않는다.

    str[0] = 'S';
    console.log(str);   // string

}

if (exec[2]) {
    
    let score = 80;
    let copy = score;

    console.log(score); // 80
    console.log(copy);  // 80
    console.log(score === copy);    // true

    // score 변수와 copy 변수는 다른 메모리 공간에 저장된 별개의 값이다.
    // 따라서 score 변수의 값을 변경해도 copy 변수의 값에는 어떠한 영향도 주지 않는다.

    score = 100;

    console.log(score); // 100
    console.log(copy);  // 80 
    console.log(score === copy);    // false

    // 중점은 변수에 변수를 할당했을 때 무엇이 전달되는가.
    // -> 값에 의한 전달.

}

if (exec[3]) {

    // 할당이 이뤄지는 시점에 객체 리터럴이 해석되고, 그 결과 객체가 생성된다.
    let person = {
        name : 'Lee'
    };

    // person 변수에 저장되어 있는 참조 값으로 실제 객체에 접근한다.
    console.log(person);    // {name: "Lee"}

    // 프로퍼티 값 갱신
    person.name = 'Kim';

    // 프로퍼티 동적 생성
    person.address = 'Seoul';

    console.log(person);    // {name: "Kim", address: "Seoul"}
    // 변수 person의 메모리 주소가 바뀌거나 메모리에 저장된 값이 바뀌지 않았다.

}

if (exec[4]) {

    let person = {
        name : 'Lee'
    };

    // 참조 값을 복사 (얕은 복사)
    let copy = person;

    // copy와 person은 동일한 객체를 참조한다.
    console.log(person === copy);   // true

    // copy를 통해 객체를 변경한다.
    copy.name = 'Kim';

    // person을 통해 객체를 변경한다.
    person.address = 'Seoul';

    // copy와 person은 동일한 메모리를 참조한다.
    // 따라서 어느 한 쪽에서 객체를 변경하면 서로 영향을 주고받는다.
    console.log(person);    // {name: "Kim", address: "Seoul"}
    console.log(copy);      // {name: "Kim", address: "Seoul"}

}