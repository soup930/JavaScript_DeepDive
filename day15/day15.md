# 프로퍼티 어트리뷰트(Property Attribute)

객체에 [key] : [value] 형식으로 지정되는 걸 프로퍼티(property)라고 한다. 
그리고, 이 각각의 프로퍼티에도 기본적인 속성(Attribute)이 있다는 것이다. 
오늘은 프로퍼티들이 가지고 있는 속성에 대해서 알아보도록 하자.
   
## 내부 슬롯과 내부 메서드

프로퍼티 어트리뷰트를 이해하기 위해 먼저 내부 슬롯(internal slot)과 내부 메서드(internal method)를 알아야 한다.
   
ECMAScript 사양에서 사용하는 의사 프로퍼티(pseudo proeprty)와 의사 메서드(pseudo method)의 일종인데, 
이중 대괄호([[..]])로 감싼 이름들을 뜻한다. 예를 들어 [[Prototype]] 같은 내부 슬롯말이다. 
사실 이런 것들에 직접 접근할 수는 없고 __proto__같은 접근 객체를 통해 간접적으로 접근한다.
   
지금부터 우리가 살펴 볼 것은 이러한 내부 슬롯과 내부 메서드들이다. 정확히는 프로퍼티의 내부 슬롯과 내부 메서드들이다.
   

## 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체

**자바스크립트 엔진은 프로퍼티를 생성할 때 프로퍼티의 상태를 나타내는 프로퍼티 어트리뷰트를 기본값으로 자동 정의한다.**
   
여기서 정의되는 프로퍼티 어트리뷰트(내부 슬롯)들은 프로퍼티의 값([[Value]]), 값의 갱신 가능 여부([[Writable]]), 
열거 가능 여부([[Enumerable]]), 재정의 가능 여부([[Configurable]])이다.
   
정의된 해당 어트리뷰트들은 Object.getOwnPropertyDescriptor 메서드를 사용하여 간접적으로 확인할 수 있다. 
이 메서드가 반환하는 것이 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터(PropertyDescriptor) 객체이다.
   

```javascript

    const person = {
        name : 'Kim'
    };

    // 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 반환한다.
    console.log(Object.getOwnPropertyDescriptor(person, 'name'));
    // {value: "Kim", writable: true, enumerable: true, configurable: true}

    // 프로퍼티 동적 생성
    person.age = 20;

    // 모든 프로퍼티의 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체들을 반환한다.
    console.log(Object.getOwnPropertyDescriptors(person));
    // age: {value: 20, writable: true, enumerable: true, configurable: true}
    // name: {value: "Kim", writable: true, enumerable: true, configurable: true}

```
   

## 데이터 프로퍼티와 접근자 프로퍼티

위의 예제에서 본 프로퍼티 name : 'Kim'은 키와 값으로 구성된 일반적인 프로퍼티다. 이런 프로퍼티를 데이터 프로퍼티(data property)라고 한다. 
물론 다른 형태의 프로퍼티도 있지만 일단 데이터 프로퍼티가 갖는 어트리뷰트들을 먼저 좀 살펴보자.
   
위에서도 언급했지만 데이터 프로퍼티는 만들어질 때 4개의 에트리뷰트를 기본적으로 정의한다.
   
**[[Value]]** : 프로퍼티 값에 접근하는 에트리뷰트다.   
**[[Writable]]** : 프로퍼티 값의 변경 가능 여부를 나타내며 불리언 값을 갖는다.   
**[[Enumerable]]** : 프로퍼티의 열거 가능 여부를 나타내며 불리언 값을 갖는다.   
**[[Configurable]]** : 프로퍼티의 재정의 가능 여부를 나타내며 불리언 값을 갖는다.   
   
이 4개의 에트리뷰트들은 별도로 값을 지정해주지 않는 한, [[Value]]는 프로퍼티 값으로, 나머지 3개는 true 값으로 초기화된다.
   
데이터 프로퍼티와는 달리 자체적으로 값을 갖지 않고 다른 데이터 프로퍼티의 값을 참조하거나 저장할 때 사용하는 접근자 함수(accessor function)가 있다. 
접근자 함수는 아래와 같은 에트리뷰트를 갖는다.
   
**[[Get]]** : 접근자 프로퍼티를 통해 프로퍼티의 값에 접근하는 접근자 함수다.   
**[[Set]]** : 접근자 프로퍼티를 통해 프로퍼티의 값을 저장하는 접근자 함수다.   
**[[Enumerable]]** : 데이터 프로퍼티의 Enumerable과 같다.   
**[[Configurable]]** : 데이터 프로퍼티의 Configurable과 같다.   
   
접근자 함수는 getter/setter 함수라고도 부른다. 소스를 살펴보자.
   

```javascript

     const person = {
        // 데이터 프로퍼티
        firstName : 'Ryang Kwon' ,
        lastName : 'Kim' ,

        // fullName은 접근자 함수로 구성된 접근자 프로퍼티다.
        // getter 함수
        get fullName() {
            return `${this.firstName} ${this.lastName}`;
        },

        //setter 함수
        set fullName(name) {
            // 배열 디스트럭처링 할당: "31.1 배열 디스트럭처링 할당" 참고
            [this.firstName, this.lastName] = name.split(' ');
        }
    };

    // 데이터 프로퍼티를 통한 프로퍼티 값의 참조.
    console.log(person.firstName + ' ' + person.lastName);  // Ryang Kwon Kim

    // 접근자 프로퍼티를 통한 프로퍼티 값의 저장
    // 접근자 프로퍼티 fullName에 값을 저장하면 setter 함수가 호출된다.
    person.fullName = 'RK K';
    console.log(person);    // {firstName: "KR", lastName: "K"}

    // 접근자 프로퍼티를 통한 프로퍼티 값의 참조
    // 접근자 프로퍼티 fullName에 접근하면 getter 함수가 호출된다.
    console.log(person.fullName);   // RK K

    // firstName은 데이터 프로퍼티다.
    // 데이터 프로퍼티는 [[Value]], [[Writable]], [[Enumerable]], [[Configurable]]
    // 프로퍼티 애트리뷰트를 갖는다.
    let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
    console.log(descriptor);
    // {value: "RK", writable: true, enumerable: true, configurable: true}

    // fullName은 접근자 프로퍼티다.
    // 접근자 프로퍼티는 [[Get]], [[Set]], [[Enumerable]], [[Configurable]]
    // 프로퍼티 에트리뷰트를 갖는다.
    descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
    console.log(descriptor);
    // {enumerable: true, configurable: true, get: ƒ, set: ƒ}

```
   

이러한 프로퍼티 어트리뷰트는 검색될 때 다음과 같은 순서를 가진다.

```
    1. 프로퍼티 키가 유효한지 확인한다. 프로퍼티 키는 문자열과 심벌만 유효하다.
    2. 프로토타입 체인에서 프로퍼티를 검색한다.
    3. 검색된 프로퍼티가 데이터 프로퍼티인지 접근자 프로퍼티인지 확인한다.
    4. 프로퍼티의 값, 혹은 참조하는 값을 반환한다.
```
   
데이터 프로퍼티와 접근자 프로퍼티를 구별하는 방법은 다음과 같다.
   

```javascript

    let descriptor;

    // 일반 객체의 __proto__는 접근자 프로퍼티다.
    descriptor = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');
    console.log(descriptor);
    // {enumerable: false, configurable: true, get: ƒ, set: ƒ}

    // 함수 객체의 prototype()은 데이터 프로퍼티다.
    descriptor = Object.getOwnPropertyDescriptor(function() {}, 'prototype');
    console.log(descriptor);
    // {value: {…}, writable: true, enumerable: false, configurable: false}

```
   

## 프로퍼티 정의

객체에 프로퍼티를 정의, 혹은 재정의 하는 방법은 여러가지가 있다. 
그 중에서 Object.defineProperty 메서드를 사용해서 프로퍼티를 정의, 재정의 할 수 있다. 
무엇보다 이 방법은 프로퍼티를 정의하는 과정에서 프로퍼티 어트리뷰트를 직접 정의할 수 있다.
   

```javascript

     const person = {};

    // 데이터 프로퍼티 정의
    Object.defineProperty(person, 'firstName', {
        value : 'Ryang Kwon',
        writable : true,
        enumerable : true,
        configurable : true
    });

    Object.defineProperty(person, 'lastName', {
        value : 'Kim' 
    });

    let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
    console.log('firstName', descriptor);
    // firstName {value: "Ryang Kwon", writable: true, enumerable: true, configurable: true}

    // 디스크립터 객체의 프로퍼티를 누락시키면 undefined, false가 기본값이다.
    descriptor = Object.getOwnPropertyDescriptor(person, 'lastName');
    console.log('lastName', descriptor);
    // lastName {value: "Kim", writable: false, enumerable: false, configurable: false}

    // [[Enumerable]]의 값이 false인 경우
    // 해당 프로퍼티는 for... in 문이나 Object.keys 등으로 열거할 수 없다.
    // lastName 프로퍼티는 [[Writable]]의 값이 false 이므로 값을 변경할 수 없다.
    console.log(Object.keys(person));   // ["firstName"]

    // [[Writable]]의 값이 false인 경우 해당 프로퍼티의 [[Value]]의 값을 변경할 수 없다.
    // lastName 프로퍼티는 [[Configurable]]의 값이 false이므로 값을 변경할 수 없다.
    // 이때 값을 변경하면 에러는 발생하지 않고 무시된다.
    person.lastName = 'Lee';

    // [[Configurable]]의 값이 false인 경우 해당 프로퍼티를 재정의할 수 없다.
    // lastName 프로퍼티는 [[Configuration]]의 값이 false이므로 삭제할 수 없다.
    // 이때 프로퍼티를 삭제하면 에러는 발생하지 않고 무시된다.
    delete person.lastName;
    // Object.defineProperty(person, 'lastName', {enumerable : true});  
    // Uncaught TypeError: Cannot redefine property

    descriptor = Object.getOwnPropertyDescriptor(person, 'lastName');
    console.log('lastName', descriptor);
    // lastName {value: "Kim", writable: false, enumerable: false, configurable: false}

    // 접근자 프로퍼티 정의
    Object.defineProperty(person, 'fullName', {

        // getter 함수
        get() {
            return `${this.firstName} ${this.lastName}`;
        },

        // setter 함수
        set(name) {
            [this.firstName, this.lastName] = name.split(' ');
        },
        enumerable : true,
        configurable : true
    });

```
   

Object.defineProperty 메서드로 프로퍼티를 정의했을 때 프로퍼티 어트리뷰트를 정의하지 않는다면 어떻게 될까?
value, get, set과 같은 값을 참조하는 어트리뷰트는 undefined로, 
writable, enumerable, configurable과 같은 boolean 형 어트리뷰트는 false로 초기화된다.
   
한번에 여러개의 프로퍼티를 정의하고 싶다면 Object.defineProperties 메서드를 사용할 수 있다.
   

```javascript

    const person = {};

    Object.defineProperties(person, {
        // 데이터 프로퍼티들의 정의
        firstName : {
            value : 'Ryang Kwon' ,
            writable : true ,
            enumerable : true ,
            configurable : true
        },
        lastName : {
            value : 'Kim' ,
            writable : true ,
            enumerable : true ,
            configurable : true
        },

        // 접근자 프로퍼티들의 정의
        fullName : {
            // getter 함수
            get() {
                return `${this.firstName} ${this.lastName}`;
            },
            // setter 함수
            set(name) {
                [this.firstName, this.lastName] = name.split(' ');
            },
            enumerable : true ,
            configurable : true
        }
    });

    person.fullName = 'RyangKwon Kim';
    console.log(person);
    // {firstName: "RyangKwon", lastName: "Kim"}

```
  

## 객체 변경 방지

지금까지 프로퍼티를 추가하고 삭제하고 값을 읽고, 값을 쓰기도 했으며, 프로퍼티 어트리뷰트도 재정의 해봤다. 
이번엔 객체의 내용을 변경하는 걸 방지하는 법에 대해 알아보자.
   
3가지 방법이 있다. 객체 확장 금지, 객체 밀봉, 객체 동결. 각 방법들은 객체의 변경을 금지하는 강도가 다르다.
   

## 객체 확장 금지

Object.preventExtensions 메서드는 객체의 확장을 금지한다. 확장이 금지된 객체는 프로퍼티 추가가 금지된다. 
확장이 가능한 객체인지 여부는 Object.isExtensible 메서드로 확인할 수 있다.
   

```javascript

    const person = { name: 'Kim' };

    // person 객체는 확장이 금지된 객체가 아니다.
    console.log(Object.isExtensible(person));   // true

    // person 객체는 확장을 금지하여 프로퍼티 추가를 금지한다.
    Object.preventExtensions(person);

    // person 객체는 확장이 금지된 객체다.
    console.log(Object.isExtensible(person));   // false

    // 실제로 프로퍼티 추가가 안 된다.
    person.age = 20;    // 무시. strict mode에서는 에러
    console.log(person);    // {name: "Kim"}

    // 프로퍼티 추가는 금지되지만 삭제는 가능하다.
    delete person.name;
    console.log(person);    // {}

    // 프로퍼티 정의에 의한 프로퍼티 추가도 금지된다.
    // Object.defineProperty(person, 'age', { value : 20 });
    // Uncaught TypeError: Cannot define property age, object is not extensible

```
   

## 객체 밀봉

Object.seal 메서드는 객체를 밀봉한다. 밀봉된 객체는 읽기와 쓰기만 가능하다. 
밀봉된 객체인지 여부는 Object.isSealed 메서드로 확인할 수 있다.
   

```javascript

    const person = { name : 'Kim' };

    // person 객체는 밀봉(seal)된 객체가 아니다.
    console.log(Object.isSealed(person));   // false

    // person 객체를 밀봉(seal)하여 프로퍼티 추가, 삭제, 재정의를 금지한다.
    Object.seal(person);

    // person 객체는 밀봉(seal)된 객체다.
    console.log(Object.isSealed(person));   // true

    // 밀봉(seal)된 객체는 configuration이 false다.
    console.log(Object.getOwnPropertyDescriptors(person));
    // name: {value: "Kim", writable: true, enumerable: true, configurable: false}

    // 프로퍼티 추가가 금지된다.
    person.age = 20;    // 무시. strict mode에서는 에러
    console.log(person);    // {name: "Kim"}

    // 프로퍼티 삭제가 금지된다.
    delete person.name; // 무시. strict mode에서는 에러
    console.log(person);    // {name: "Kim"}

    // 프로퍼티 값 갱신은 가능하다.
    person.name = 'Lee';
    console.log(person);    // {name: "Lee"}

    // 프로퍼티 어트리뷰트 재정의가 금지된다.
    // Object.defineProperty(person, 'name', { configurable : true });
    // Uncaught TypeError: Cannot redefine property: name

```
   

## 객체 동결

Object.freeze 메서드는 객체를 동결한다. 동결된 객체는 읽기만 가능하다. 
동결된 객체인지 여부는 Object.isFrozen 메서드로 확인할 수 있다.
   

```javascript

     const person = { name : 'Kim' };

    // person 객체는 동결(freeze)된 객체가 아니다.
    console.log(Object.isFrozen(person));   // false

    // person 객체를 동결(freeze)하여 프로퍼티 추가, 삭제, 재정의, 쓰기를 금지한다.
    Object.freeze(person);

    // person 객체는 동결(freeze)된 객체다.
    console.log(Object.isFrozen(person));   // true

    // 동결(freeze)된 객체는 writable과 configurable이 false다.
    console.log(Object.getOwnPropertyDescriptors(person));
    // name: {value: "Kim", writable: false, enumerable: true, configurable: false}

    // 프로퍼티 추가가 금지된다.
    person.age = 29;        // 무시. strict mode에서는 에러
    console.log(person);    // {name: "Kim"}

    // 프로퍼티 삭제가 금지된다.
    delete person.name;     // 무시. strict mode에서는 에러
    console.log(person);    // {name: "Kim"}

    // 프로퍼티 값 갱신이 금지된다.
    person.name = 'Lee';    // 무시. strict mode에서는 에러
    console.log(person);    // {name: "Kim"}

    // 프로퍼티 애트리뷰트 재정의가 금지된다.
    // Object.defineProperty(person, 'name', { configurable : true });
    // Uncaught TypeError: Cannot redefine property

```
   

## 깊은 동결

프로퍼티 안에 프로퍼티가 있는 경우. 중첩 객체라고 한다. 이러한 경우 외부 프로퍼티에 동결을 걸어도 내부 프로퍼티는 동결되지 않는다. 
이런한 경우를 얕은 동결이라고 한다.
   
그렇다면 모든 계층의 프로퍼티를 동결 시키는 깊은 동결에 대해 알아보자.
   

```javascript

    const person = {
        name : 'Kim',
        address : { city: 'Seoul' }
    };

    // 얕은 객체 동결
    Object.freeze(person);

    // 직속 프로퍼티만 동결한다.
    console.log(Object.isFrozen(person));   // true
    // 중첩 객체까지 동결하지 못한다.
    console.log(Object.isFrozen(person.address));   // false

    person.address.city = 'Busan';
    console.log(person);    // {name: "Kim", address: {city: "Busan"}}


    let deepFreeze = function(target) {
        // 객체가 아니거나 동결된 객체는 무시하고 객체이고 동결되지 않은 객체만 동결한다.
        if (target && typeof target === 'object' && !Object.isFrozen(target)) {
            Object.freeze(target);
            
            // 모든 프로퍼티를 순회하며 재귀적으로 동결한다.
            Object.keys(target).forEach(key => deepFreeze(target[key]));

        }
        return target;

    }

    const person2 = {
        name : 'Kim',
        address : { city: 'Seoul' }
    };
    
    // 깊은 객체 동결
    deepFreeze(person2);

    console.log(Object.isFrozen(person2));   // true
    // 중첩 객체까지 동결한다.
    console.log(Object.isFrozen(person2.address));  // true

    person2.address.city = 'Busan';
    console.log(person2);   // {name: "Kim", address: {city: "Seoul"}}
    
```