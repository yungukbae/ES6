//7.1 스코프와 존재
//가시성 이라고도 불리는 스코프는 프로그램의 현재 실행 중인 부분, 즉 실행 컨텍스트 에서 현재 보이고 접근할 수 있는 식별자들을 말합니다. 
//반면 존재한다는 말은 그 식별자가 메모리가 할당된(예약된) 무언가를 가리키고 있다는 뜻입니다. '존재하지만 스코프 안에는 없는' 변수의 예를 곧 살펴보겠습니다.

//7.2 정적 스코프와 동적 스코프
function f1(){
    console.log('one');
}


function f2() {
    console.log('two');
}


f2();
f1();
f2();
//정적으로 보면 이 프로그램은 단순히 위에서 아래로 읽어내리는 문의 연속입니다. 하지만 이 프로그램을 실행하면 실행 흐름은 읽는 순서와 다릅니다. f1이 f2보다 먼저 정의됐지만, f2의 함수 바디가 실행된 다음 f1으로, 다시 f2로 넘어값니다.

//정적 스코프는 어떤 변수가 함수 스코프 안에 있는지 함수를 정의할 때 알 수 있다는 뜻입니다.
//호출할 때 알 수 있는 것은 아닙니다. 다음 예제를 보십시오.
const x = 3;

function f() {
    console.log(x);
    console.log(y);
}

{//new scope
    const y = 5;
    f();
}
//변수 x는 함수 f를 정의할 때 종재하지만, y는 그렇지 않습니다. y는 다른 스코프에 존재합니다. 다른 스코프에서y를 선언하고 그 스코프에서 f를 호출하더라도,
//f를 호출하면 x는 그 바디안의 스코프에 있지만 y는 그렇지 않습니다. 이것이 정적 스코프입니다. 함수 f는 자신이 정의 될 때 접근할 수 있었던 식별자에는 여전히 접근할 수 있지만, 호출할 때 스코프, 함수 스코프 에 적용됩니다.


//7.3 전역 스코프

let name = "Irena"  //전역
let age = 25;       //전역

function greet() {
    console.log(`Hello, ${name}`);
}

function getBirthYear() {
    return new Date().getFullYear() - age;
}

//이 방법의 문제는 함수가 호출하는 컨텍스트(스코프)에 대단히 의존적이라는 겁니다. 어떤 함수든, 프로그램 어디에서든 상관없이 name값을 (의도적으로든, 실수로든) 바꿀 수 있습니다
//또한 name과 age는 흔한 이름이므로 다른 곳에서 다른 이유로 사용할 가능성도 큽니다. greet와 getBirthYear는 전역 변수에 의존하므로, 프로그램의 다른 부분에서 name과 age를 정확히 사용한다고 가정하고 있는겁니다.

//사용자 정보를 단일 객체에 보관하는 방법이 더 낫습니다.

let user = {

    name = "Irena",
    age = 25,

}
function greet() {
    console.log(`Hello, ${user.name}`)
}
function getBirthYear() {
    return new Date().getFullYear() - user.age;
}

//이 예제에서는 name과 age를 없애고 대신 user를 써서 전역 스코프의 식별자 숫자를 겨우 하나 줄였을 뿐이지만, 사용자에 관한 정보를 10가지나 100가지 보관한다고 상상해 보십시오.

//하지만 개선의 여지는 더 남아있습니다. 함수 greet과 getBirthYear는 여전히 전역 user에 의존하며, 이 객체는 어디서든 수정할 수 있습니다. 이 함수들을 고쳐서 전역 스코프에 의존하지 않게 만들어 봅시다.
function greet(user) {
    console.log(`Hello, ${user.name}`);
}
function getBirthYear(user) {
    return new Date().getFullYear() - user.age;
}



//7.4 블록 스코프
//let과 const는 식별자를 블록 스코프에서 선언합니다. 5장에서 블록은 문을 중괄호로 묶은 것이라고 설명했습니다. 블록 스코프는 그 블록의 스코프에서만 보이는 식별자를 의미합니다.
console.log('before block');
{
    console.log('iniside block');
    const x = 3;
    console.log(x);                     //3
}
console.log(`outside block; x=${x}`);   //ReferenceError: x는 정의되지 않았습니다.
//앞의 예제에서는 독립 블록을 사용했습니다. 블록은 보통 if나 for같은 제어문의 일부분으로 쓰이지만, 블록 그 자체로도 유효한 문법입니다. x는 블록안에서 정의됐고, 블록을 나가는 즉시 x도 스코프 밖으로
//사라지므로 정의도지 않을 것으로 간주됩니다.


//7.5 변수 숨기기
{
    //block 1
    const x = 'blue';
    console.log(x);         //"blue"
}
console.log(typeof x);      //"undefined"; x는 스코프 밖에 있습니다.
{
    //block 2
    const x = 3;
    console.log(x);         //"3"
}
console.log(typeof x);      //"undefined"; x는 스코프 밖에 없습니다.
//앞 예제의 x는 다른 스코프에 있는, 이름만 같은 두 개의 변수임을 이해하기 쉽습니다. 이제 스콯프가 중첩되는 경우르 살펴봅시다.

{

    //외부 블록
    let x = 'blue';
    console.log(x);         //"blue"

    {
        //내부 블록
        let x = 3;
        console.log(x);     //"3"
    }
    console.log(x);         //"blue"

}
console.log(typeof x);      //"undefined"; x는 스코프에 있지 않습니다.
//이 예제는 변수 숨김을 잘 보여줍니다. 내부 블록의 x는 외부 블록에서 정의한 x와는 이름만 같을 뿐 다른 변수이므로 외부 스코프의 x를 숨기는(가리는) 효과가 있습니다.

//여기서 이해해야 할 중요한 점은, 실행 흐름이 내부 블록에 들어가 새 변수 x를 정의하는 순간, 두 변수가 모두 스코프 안에 있다는 겁니다. 변수의 이름이 같으므로 외부 스코프에 있는 변수에 접근할 방법이
//없습니다.  x 하나가 스코프에 들어갔다가 나오고, 다른 x가 같은 행동을 반복한 이전 예제와 비교해 보십시오.

//다음 예제를 보면 더 자세히 알 수 있습니다.
{
    //외부 블록
    let x = {color: "blue"};
    let y = x;                      //y와 x는 같은 객체를 가르킵니다.
    let z = 3;
    {

        //내부 블록
        let x = 5;                  //이제 바깥의 x는 가려졌습니다.
        console.log(x);             //5
        console.log(y.color);       //"blue"; y가 가리키는, 외부 스코프의 x가 가리키는 객체는 스코프 안에 있습니다.
        y.color = "red";            
        console.log(z);             //3; z는 숩겨지지 않았습니다.

    }

    console.log(x.color);           //"red"; 객체는 내부 스코프에서 수정됐습니다.
    console.log(y.color);           //"red"; x와 y는 같은 객체를 가리킵니다.
    console.log(z);                 // 3

}
//이제 스코프가 계층적입을 이해했을 겁니다. 이저 스코프를 떠나지 않아도 새 스코프에 진입할 수 있습니다. 
//스코프의 계층적인 성격 때문에 어떤 변수가 스코프에 있는지 확인하는 스코프 체인이란 개념이 생겼습니다. 현재 스코프 체인에 있는 모든 변수는 스코프에 있는 것 이며,
//숨겨지지 않았다면 접근할 수 있습니다.


//7.6 함수, 클로저, 정적 스코프
//함수가 특정 스코프에 접근할 수 있도록 의도적으로 그 스코프에서 정의하는 경우가 많습니다. 이런 것을 보통 클로저 라고 부릅니다.
//스코프를 함수 주변으로 좁히는 것이라고 생각 해도 됩니다. 클로저 예제를 하나 살펴봅시다.
let globalFunc;             //정의되지 않은 전역 변수
{

    let blockVar = 'a';     //블록 스코프에 있는 변수
    globalFunc = function(){
        console.log(blockVar);
    }
}
globalFunc();               //"a"

//여기서는 스코프 안에서 함수를 정의헀고, 해당 함수는 스코프 밖에서도 참조할 수 있으므로 자바스크립트는 스코프를 계속 유지합니다.
//즉, 스코프 안에서 함수를 정의하면 해당 스코프는 더 오래 유지됩니다. 또한 일반적으로는 접근할 수 없는 것에 접근할 수 있는 효과도 있습니다. 다음 예제를 보십시오.
let f;
{

    let o = { note: 'Safe'};
    f = function() {
        return o;
    }
}
let oRef = f();
oRef.note = "Not so safe after all!";
//함수를 정의해 클로저를 만들면 접근할 수 없었던 것들에 접근할 방법이 생깁니다.


//7.7 즉시 호출하는 함수 표현식
(function() {
    //IIFE 바디
})();

//함수 표현식으로 익명 함수를 만들고 그 함수를 즉시 호풀합니다. IIFE의 장점은 내부에 있는 것들이 모두 자신만의 스코프를 가지지만, IIFE자체는 함수이므로 그 스코프 밖으로 무언가를 내보낼 수 있다는 겁니다.

const message = (function() {
    const secret = "I'm a secret!";
    return `The secret is ${secret.length} charecters long.`;
})();
console.log(message);
//변수 secret은 IIFE의 스코프 안에서 안전하게 보호되며 외부에서 접근할 수 없습니다. IIFE는 함수이므로 무엇이든 반환할 수 있습니다. IIFE에서 배열이나 객체, 함수를 반환하는 경우도 무척 많습니다.
//자신이 몇 번 호출됐는지 보고하는 함수를 생각해 봅시다. 이 함수가 몇번 호출됐는지 저장한 값을 외부에서는 절대 손댈 수 없습니다.

const f = (function() {
    let count = 0;
    return function() {
        return `I have been called ${++count} time(s).`;
    }
})();
f();    //"I have called 1 time(s)"
f();    //"I have called 2 time(s)"
//...
//변수 count는 IIFE안에 안전하게 보관되어 있으므로 손댈 방법이 없습니다. f는 자신이 몇번 호출됐는지 항상 정확히 알고 있습니다.


//7.8 함수 스코프와 호이스팅
//let으로 변수를 선언하면, 그 변수는 선언하기 전에는 존재하지 않습니다. var로 선언한 변수는 현재 스코프 안이라면 어디서든 사용할 수 있으며,
//심지어 선언하기도 전에 사용할 수 있습니다. 예제를 보기전에, 아직 선언되지 않은 변수와 값이 undefined인 변수는 다르다는 점을 상기해 봅시다.
//아직 선언되지 않은 변수는 에러를 일으키지만, 존재하되 값이 undefined인 변수는 에러를 일으키지 않습니다
let var1;
let var2 = undefined;
var1;                   //undefined
var2;                   //undefined
undefinedVar;           //ReferenceError: notDefined는 정의도지 않았습니다.

//let을 쓰면, 변수를 선언하기 전 사용하려 할 때 에러가 일어납니다

x;
let x = 3;

//반면 var로 변수를 선언하면 선언하기 전에도 사용할 수 있습니다.
x;                      //undefined
var x = 3;
x;                      //3

//var로 선언한 변수는 끌어올린다는 뜻의 호이스팅이라는 메커니즘을 따릅니다. 자바스크립트는 함수나 전역 스코프 전체를 살펴보고 var로 선언한 변수를 맨 위로 끌어올립니다.
//자바스크립트는 함수나 전역 스코프 전체를 살펴보고 var로 선언한 변수를 맨 위로 끌어올립니다. 여기서 중요한 것은 선언만 끌어올려진다는 것이며, 할당은 끌어올려지지 않는 다는 겁니다.
//자바스크립트는 이전 예제를 다음과 같이 해석합니다.

var x;  //선언(할당은 아닌)이 끌어올려집니다.
x;      //undefined
x=3;
x;      //3


//이번엔 좀더 복잡한 코드를 1:1로 비교해보도록 하겠습니다.

//원래코드
if(x !== 3){

    console.log(y);
    var y = 5;
    if( y === 5 ){
        var x = 3;
    }
    console.log(y);
}
if(x === 3){
    console.log(y);
}


//자바스크립트가 해석한 코드
var x;
var y;
if(x !== 3){
    console.log(y);
    y = 5;
    if( y === 5){
        x = 3;
    }
    console.log(y);
}
if(x===3){
    console.log(y);
}

//var을 이용해 변수를 선언하면 자바스크립트는 같은 변수를 여러 번 정의하더라도 무시합니다.

//7.9 함수 호이스팅
//var로 선언된 변수와 마찬가지로, 함수 선언도 스코프 맨 위로 끌어올려집니다. 따라서 함수를 선언하기 전에 호출할 수 있습니다.
f();        //'f'
function f() {
    console.log('f');
}
//변수에 할당한 함수 표현식은 끌어올려지지 않습니다. 이들은 변수의 스코프 규칙을 그대로 따릅니다. 다음 예제를 보십시오

f();                        //ReferenceError: f는 정의되지 않았습니다.
let f = function() {
    console.log('f');
}


//7.10 사각지대
//사각지대란, let으로 선언하는 변수는 선언하기 전까지 존재하지 않는다는 직관적인 개념을 잘 나타내는 표현입니다.
//스코프 안에서 변수의 사각지대는 변수가 선언되기 전의 코드입니다.

//typeof 연산자는 변수가 선언됐는지 알아볼 때 널리 쓰이고, 존재를 확인하는 안전한 방법으로 알려져 있습니다.
//즉, let키워드가 도입되고 변수의 사각지대가 생기기 전에는 다음과 같은 코드는 항상 안전하며 에러가 발생하지도 않았습니다.
if(typeof x === "undefined"){
    console.log("x doesn't exist or is undefined");
}else{
    //x를 사용해도 안전한 코드
}

//하지만 이 코드를 let으로 변수 선언하면 안전하지 않습니다. 다음 코드에서는 에러가 발생합니다.
if(typeof x === "undefined"){
    console.log("x doesn't exist or is undefined");
}else{
    //x를 사용해도 안전한 코드
}
let x = 5;


//7.11 스트릭트 모드
(function() {
    'use strict';
    //코드를 전부 이 안에 작성합니다.
    //이 코드는 스트릭트 모드로 동작하지만,
    //이 코드와 함께 동작하는 다른 스크립트는
    //스크릭트 모드에 영향받지 않습니다.
})();

