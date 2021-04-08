
// 1. 변수 선언
// 변수 선언 키워드 3가지 (var, let, const)
 


/**
 * 1-1. var (variable)의 단점.
 */


// 변수 호이스팅 발생.
//  - 선언 되는 시점에서 초기화(scope라 불리는 실행 컨텍스트의 렉시컬 환경에 등록이)가 자동으로 실행된다.
//  - 기본적으로 JS는 Interpreter 방식이므로 Runtime 과정에서 소스 내부의 변수들이 우선적으로 선언(메모리 할당)된다.
//  - 변수들이 선언 된 후 소스 코드가 실행된다.

console.log(variable_var); // undefined. 해당 변수에 원시값이 할당되어 있다. variable_var 변수를 참조하고 있다.
var variable_var; // Runtime 과정에 이미 선언 + 초기화까지 완료되기 때문에 위에 작성된 소스코드에서 참조가 가능하다.

variable_var = 'foo'; // 새로운 값을 할당(초기화) 한다.
console.log(variable_var); // foo. 임의로 할당 한 값이 출력된다.



// 변수 중복선언 가능.
//  - 같은 이름의 변수가 선언되더라도 JS 엔진에 의해 같은 위치에 초기화만 실행된다.
//  - 같은 이름의 변수가 선언 되었을 때 초기화문이 없으면 무시한다.

var variable_var = 'hello'; // JS 엔진에 의해 variable_var = 'hello' 로 해석된다.
console.log(variable_var); // hello.

var variable_var; // 초기화문 없이 중복선언된 변수는 무시한다.
console.log(variable_var); // hello.



// 함수 레벨 스코프
//  - 함수 내부에 선언 된 변수를 제외한 모든 var 변수는 전역 변수로 여겨진다.
//  - for문 등을 사용할 때 특히 위험하다.

var i = 0; // 전역변수 i 를 선언하고 값을 할당했다.

for (var i = 0; i < 10; i++) { // for 문에서 index로 사용 될 i 를 선언했다.
    console.log('for문에 선언 된 i 값 : ' + i); 
}

console.log('전역변수 i 값 : ' + i); // 10. 전역변수로 선언 된 i가 for문에서 중복으로 선언되어 사용되었다.


var x = 1; // 전역변수 x 를 선언하고 값을 할당했다.

if (true) {
    // if 문 내에서 선언된 x 는 전역변수로 간주되며, JS 엔진에 의해 x = 10 으로 해석된다.
    var x = 2;
}

console.log(x); // 2. 중복 선언이 되었다.


var y = 1; // 전역변수 y 를 선언하고 값을 할당했다.

function func() {
    var y = 2; // 함수 내의 지역 변수 y 를 선언하고 값을 할당했다.
    console.log(y); // 2. 지역 변수 y 가 별도로 선언되었다.
}

func(); // 지역 변수는 함수 스코프 내에서만 사용된다.
console.log(y); // 1. 전역 변수 y의 값은 바뀌지 않았다.
