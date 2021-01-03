//3.1 변수와 상수 variable

let targetTempC; //let targetTempC = undefined; 와 같음
let targetTempC, room1 = "conference_room_a", room2 = "lobby";  //let문 하나에서 변수 여러개 선언 가능
// ^ let targetTempC = undefined; 

const ROOM_TEMP_C = 21.5, MAX_TEMP_C = 30;
//상수 이름에는 보통 대문자와 밑줄만 사용합니다. 이런 규칙을 따르면 코드에서 상수를 찾기 쉽고, 상수의 값을 바꾸려 하지도 않게 됩니다.

//3.2 변수와 상수중 어떤것을 써야할까?
//변수와 상수중 될수 있으면 상수를 사용하는게 좋다. 데이터의 값이 아무떄나 막 바뀌는 것보다는, 고정된 값이 이해하기 쉽기 때문이다.
//user 라는 변수의 값을 바꾸는 것 보다 user1, user2 상수를 선언하여 값을 나누는게 좋습니다.

// 3.3 식별자 이름
//변수와 상수, 함수 이름을 식별자(indentifier)라 부릅니다. 그리고 식별자에는 규칙이 있습니다.
//-식별자는 반드시 글자나 달러 기호($), 밑줄(_)로 시작해야 합니다.
//-식별자에는 글자와 숫자, 달러 기호, 밑줄만 쓸 수 있습니다.
//-유니코드 문자도 쓸 수 있습니다.
//-예약어는 식별자로 쓸 수 없습니다.(부록 A에 예약어를 정리했습니다.)

//카멜 케이스  camel case
// currentTempC, anIdentifierName등은 카멜 케이스에 따라 이름을 지은 겁니다. 카멜이라는 이름은 중간중간의 대문자가 낙타의 혹처럼 보인다고 해서 붙었습니다.

//스네이크 케이스 snake case
// current_temp_c, an_identifier_name 등은 스네이크 케이스에 따라 이름을 지은 겁니다. 스네이크 케이스는 카멜 케이스보다는 조금 덜 쓰입니다.

//-식별자는 대문자로 시작해서는 안 됩니다. 예외는 9장에서 배울 클래스뿐입니다.
//-밑줄 하 개 또는 두 개로 시작하는 식별자는 아주 특별한 상황, 또는 '내부' 변수에서만 사용합니다. 자신만의 특별한 변수 카테고리를 만들지 않는 한, 변수나 상수 이름을 밑줄로 시작하지 마십시오.
//-제이쿼리를 사용할 경우, 달러 기호로시작하는 식별자는 보통 제이쿼리 객체라는 의미입니다. 제이쿼리는 19장에서 설명합니다. 

// 3.4 리터럴 literal 

let room1 = "conference_room_a"; //"conference_room_a"(따옴표 안)은 리터럴입니다.

let currentRoom = room1;    //이제 currentRoom의 값은
                            //room1의 값 ("conference_room_a")과 같습니다.

currentRoom = conference_room_a;    //에러가 일어납니다.
                                    //conference_room_a란 식별자는 존재하지 않습니다.

// 3.5 원시 타입과 객체
//자바스크립트의 값은 원시 값primitive 또는 객체 object입니다. 문자열과 숫자 같은 원시 타입은 불변immutable입니다. 숫자 5는 항상 숫자 5입니다. 문자열 "alpha"도 항상 문자열 "alpha"입니다.
//원시 타입에는 여섯가지가 있습니다.
//숫자, 문자열, 불리언, null, undefined, 심볼Symbol
//다만 불변성이라는 말이 변수의 값이 바뀔 수 없다는 뜻은 아닙니다.

let str = "hello";
str = "world";
//여기서 바뀌는 것은 str이 가지고 있는 값 입니다.

//객체의 유연한 성질 때문에 커스텀 데이터 타입을 만들 떄 객체를 많이 사용합니다. 자바스크립트에는 다음과 같이 몇 가지 내장된 객체 타입이 있습니다.
//-Array, Date, RegExp, Map과 WeakMap, Set과 WeakSet

//3.6 숫자 

let count = 10;             //숫자 리터럴, count는 더블입니다.
const blue = 0x0000ff;      //16진수. 16진수 ff는 10진수 255와 같습니다.
const umask = 0o0022;       //8진수. 8진수 22는 십진수 18과 같습니다.
const rommTemp = 21.5;      //십진수
const c = 3.0e6;            //지수  (3.0 ㅌ 10^6 = 3,000,000)
const e = -1.6e-19;         //지수 (-1.6 x 10^-19 = 0.0000000000000016)
const inf = Infinity;
const ninf = -Infinity;
const nan = NaN;            //"숫자가 아님"

const small = Number.EPSILON;           //1에 더했을 때 1과 구분되는 결과를 만들 수 있는 가장 작은 값입니다. 근사치는 2.2e-16입니다.
const bigInt = Number.MAX_SAFE_INTEGER; //표현할 수 있는 가장 큰 정수
const max = Number.MAX_VALUE;           //표현할 수 있는 가장 큰 숫자
const minInt = Number.MIN_SAFE_INTEGER; //표현할 수 있는 가장 작은 정수
const min = Number.MIN_VALUE;           //표현할 수 있는 가장 작은 숫자
const nInt = Number.NEGATIVE_INFINITY;  //-Infinity 
const nan = Number.NaN;                 //NaN
const inf = Number.POSITIVE_INFINITY;   //Infinity

//3.7 문자열

//3.7.1 이스케이프

//아래 예제는 이스케이프 문자가 필요하지 않다.
const dialog = 'Sam looked up, and said "hello, old friend!", as Max walked in.';
const imperative = "Don't do that!";

//에러가 일어난다.
//const dialog = "Sam looked up, and said "hello, old friend!", as Max walked in.";

//이스케이프 사용법
const dialog1 = "He looked up and said \"dont't do that!\" to Max.";
const dialog2 = 'He looked up and said "don\'t do that!" to Max.';

//역슬레시 이스케이프
const s = "In JavaScript, use \\ as an escape character in strings.";

//3.8 특수문자

/*
\n 줄바꿈문자

\r 캐리지 리턴(Carriage return)

\t 탭

\' 작은따옴표

\" 큰따옴표

\` 백틱

\$ 달러기호

\\ 역슬래시

\uXXXX 임의의 유니코드 코드 포인트, 여기서 XXXX는 16진수 코드 포인트입니다.

\xXXX 라틴-1 문자. 여기서 XX는 16진수 라틴-1 코드 포인트입니다.

\0 NULL문자

\v 세로 탭 vartical tab

\b 백스페이스

\f 폼 피드

*/

//3.8.1 템플릿 문자열

let currentTemp = 19.5;
//00b0는 온도를 나타내는 유니코드 코드 포인트입니다.
const message = "The current temperature is" + currentTemp + "\u00b0C";

let currentTemp = 19.5;
const message = `The current temperature is ${currentTemp}\u00b0C`;

//3.8.2 여러 줄 문자열

const multiline = "line1\n\
line2";   //가독성이 떨어짐

const multiline = "line1\n" + "line2\n" + "line3";  //가독성 좋음

const multiline = 'Current temperature:\n' + `\t${currentTemp}\u00b0C\n` + "Don't worry ... the heat is on!";

//3.8.3 숫자와 문자열

const result1 = 3 + '30'; //3이 문자열로 바뀝니다. 결과는 문자열 '330'입니다.
const resutl2 = 3 * '30'; //'30'이 숫자로 바뀝니다. 결과는 숫자 90입니다.

//3.9 불리언

let heating = true;
let cooling = false;

//3.10

const RED = Symbol("The color of a sunsset!");
const ORANGE = Symbol("The color of a sunset!");
RED === ORANGE // false: 심볼은 모두 서로 다릅니다.

//3.11 null과 undefined

let currentTemp;            //암시적으로 undefined입니다.
const targetTemp = null;    //대상 온도는 null, 즉 "아직 모르는" 값입니다.
currentTemp = 19.5;         //currentTemp에는 이제 값이 있습니다.   
currentTemp = undefined;    //currentTemp는 초기화되지 않은 듯합니다. 권장하지 않습니다.

//3.12 객체

//빈 객체로 시작

const obj = {};

//obj에 color 프로퍼티를 추가
obj.color = "yellow";

//프로퍼티 이름이 유효한 식별자여도 대괄호로 접근할 수 있습니다.
obj["not an identifier"] = 3;
obj["not an identifier"];   //3
obj["color"]                //"yellow"

//심볼 프로퍼티에 접근할 때도 대괄호를 사용합니다.
const SIZE = Symbol();
obj[SIZE] = 8;
obj[SIZE];


//obj는 빈 객체로 만들었지만 객체 리터럴 문법에서는 객체를 만든느 동시에 프로퍼티를 만들 수 있습니다. 중괄호 안에서 각 프로퍼티를 쉼표로 구분하고, 프로퍼티 이름과 값은 콜론으로 구분합니다.
const sam1 = {

    name: 'Sam',
    age:4,

};

const sam2 = {name: 'Sam', age:4};

const sam3 = {

    name:'Sam',
    classification:{

        kingdom:'Anamalia',
        phylum:'Chordata',
        class:'Mamalia',
        order:'Carnivoria',
        family: 'Felidae',
        subfamily: 'Felinae',

    },
};

//이 예제에서는 객체 리터럴 문법에 따라 세 가지 객체를 만들었습니다. sam1과 sam2의 프로퍼티는 똑같지만, 둘은 서로 다른 객체입니다. 원시 갑소가는 반대입니다(값이 숫자 3인 두 변수는 같은 원시 값을 가리킵니다). 
//sam3의 classification 프로퍼티는 그 자체가 객체입니다. sam3의 family에 접근하는 방법은 여러가지 입니다. 여기서 큰따옴표만 썼지만, 작은따옴표나 백틱을 써도 됩니다.
sam3.classification.family;         //"Felidae"
sam3["classification"].family;      //"Felidae"
sam3.classification["family"];      //"Felidae"
sam3["classification"]["family"];   //"Felidae"

//객체에 함수를 담을 수도 있습니다. 함수에 대해서는 6장에서 자세히 설명합니다. 지금은 함수가 일종의 부속 프로그램이라고 생각하면 됩니다. sam3에 함수를 추가할 때는 다음과 같이 합니다.
sam3.speak = function(){return "Meow!";};

//이제 함수 뒤에 괄호를 붙여 함수를 호출할 수 있습니다.
sam3.speak();   //"Meow!"

//마지막으로, 객체에서 프로퍼티를 제거할 때는 delete 연산자를 사용합니다.
delete sam3.classification; //classification 트리 전체가 삭제되었습니다.
delete sam3.speak;          //speak 함수가 삭제되었습니다.

//3.13 Number,String,Boolean 객체
const s = "hello";
s.toUpperCase();    //"HELLO"

s.rating = 3;   //에러가 없습니다. 성공일까요?
s.rating;       //undefined

//3.14 배열
//-배열 크기는 고정되지 않습니다. 언제든 요소를 추가하거나 제거할 수 있습니다.
//-요소의 데이터 타입을 가리지 않습니다. 즉, 문자열만 쓸 수 있는 배열이라던가 숫자만 쓸 수 있는 배열 같은 개념이 아예 없습니다.
//-배열 요소는 0으로 시작합니다.

//자바스크립트 배열 리터럴은 다음과 같이 대괄호 안에 배열 요소를 쉼표로 구분해서 씁니다.
const a1 = [1,2,3,4];                       //숫자로 구성된 배열
const a2 = [1,'two',3,null];                //여러 가지 타입으로 구성된 배열
const a3 = [                                //여러 줄로 정의한 배열
    "what the hammer? what the chain",
    "In what furnace was thy brain?",
    "what the anvil? what dread grasp",
    "Dare its deadly terrors clasp?",
];

const a4 = [                                //객체가 들어있는 배열
        { name: "Ruby", hardness: 9},
        { name: "Diamond", hardness: 10},
        {name: "Topaz", hardness: 8}, 
];

const a5 = [                                //배열이 들어있는 배열
    [1,3,5],
    [2,4,6],
];


//배열에는 요소 숫자를 반환하는 length 프로퍼티가 있습니다.
const arr = ['a','b','c'];
arr.length;                  //3

//배열 요소에 접근할 때는 대괄호 안에 요소의 인덱스 숫자를 씁니다.
const arr = ['a','b','c'];

//첫번째 요소를 가져옵니다.
arr[0];                     //'a'
//arr의 마지막 요소의 인덱스는 arr.length-1입니다.
arr[arr.length - 1];        //'c'
//배열 요소의 값을 덮어쓸 떄는 새 값을 할당하면 됩니다.
const arr = [1,2,'c',4,5];
arr[2] = 3;                 //arr은 이제 [1,2,3,4,5]입니다.

//3.15 객체와 배열 마지막의 쉽표
//마지막 쉼표를 부르는 말 trailing comma, dangling comma, terminal comma 등으로 부릅니다.
const arr = [
    "One",
    "Two",
    "Three",
];

const o = {
    one:1,
    two:2,
    three:3,
};

//3.16 날짜
//자바스크립트의 날짜와 시간은 내장된 Date 객체에서 담당합니다.

//현재 날짜와 시간을 나타내는 객체를 만들 때는 new Date()를 사용합니다.

const now = new Date();
now; //Fri Dec 16 2016 09:20 GMT+0900 (KST)

//특정 날짜에 해당하는 객체를 만들 때는 다음과 같이 합니다.
const halloween = new Date(2016, 9, 31);//월은 0에서 시작합니다. 즉
                                        //9는 10월입니다.

//특정 날짜와 시간에 해당하는 객체를 만들 때는 다음과 같이 합니다
const halloweenParty = new Date(2016, 9, 31, 19, 0);    //19:00 = 7:00 pm

//날짜 객체를 만들면 다음과 같이 각 부분을 가져올 수 있습니다.

halloweenParty.getFullYear();       //2016
halloweenParty.getMonth();          //9
halloweenParty.getDate();           //31
halloweenParty.getDay();            //1 (월요일입니다. 0은 일요일입니다.)
halloweenParty.getHours();          //19
halloweenParty.getMinutes();        //0
halloweenParty.getSeconds();        //0
halloweenParty.getMilliseconds();   //0

//3.17 정규표현식
//이건뭐... 궁금하면 인터넷 쳐보도록...

//3.18 맵과 셋
//ES6에서는 새로운 데이터 타입 Map과 Set, 그리고 그들의 '약한' 짝인 WeakMap과 WeakSet을 도입했습니다. 맵은 객체와 마찬가디로 키와 값을 연결하지만, 특정 상황에서 객체보다 유리한 부분이 있습니다.
//맵과 셋은 10장에서 설명합니다.

//3.19 데이터 타입 변환
//데이터 타입을 다른 타입으로 바꾸는 일은 매우 자주하는 작업입니다.

//3.19.1 숫자로 바꾸기
//문자열을 숫자로 바꿔야 할 경우가 많습니다. 사용자에게 받은 입력은 보통 문자열로, 자바스크립트에는 문자열을 숫자로 바꾸는 방법이 몇 가지 있습니다.

//Number 객체 생성자를 사용하여 문자열을 숫자로 바꾸기
const numStr = "33.3";
const num = Number(numStr); //이 행은 숫자 값을 만듭니다.
                            //Number 객체의 인스턴스가 아닙니다.
//숫자로 바꿀 수 없는 문자열에서는 NaN이 반환됩니다.

//parseInt나 parseFloat 함수를 사용하는 방법입니다.
const a = parseInt("16 Volts",10);      //" volts"는 무시됩니다. 10진수 16입니다.

const b = parseInt("3a",16);            //16진수 3a를 10진수로 바꿉니다. 결과는 58입니다.

const c = parseFloat("15.5 kph");       //"kph"는 무시됩니다. parseFloat는 항상 기수가 10이라고 가정합니다.


//Date 객체를 숫자로 바꿀 때는 valueOf() 메서드를 사용합니다. 이 숫자는 UTC 1970년 1월 1일 자정으로부터 몇 밀리초가 지났는지 나타내는 숫자입니다.
const d = new Date();                   //현재 날짜
const ts = d.valueOf();                 //UTC 1970년 1월 1일 자정으로부터 몇 밀리초가 지났는지 나타내는 숫자

//불리언 값을 1(true)이나 0(false)으로 바꿔야 할 때도 있습니다. 이렇게 변환할 때는 조건 연산자를 사용합니다. 조건 연산자는 5장에서 설명합니다.
const b = true;
const n = b ? 1 : 0;

//3.19.2 문자열로 변환
//toString() 메서드를 활용한 변환
const n = 33.5;
n;              //33.5 - 숫자
const s = n.toString();
s;              //"33.5" - 문자열

const arr = [1,true,"hello"];
arr.toString(); //"1,true,hello"

//3.19.3 불리언으로 변환

const n = 0;            //거짓 같은 값
const b1 = !!n;         //false
const b2 = Boolean(n);  //false

//3.20 요약
//-자바스크립트에는 문자열, 숫자, 불리언, null, undefined, 심볼의 여섯 가지 원시 타입과 객체 타입이 있습니다.
//-자바스크립트의 모든 숫자는 배정도 부동소수점 숫자(더블)입니다.
//-배열은 특수한 객체이며, 객체와 마찬가지로 매우 강력하고 유연한 데이터 타입입니다.
//-날짜, 맵, 셋, 정규표현식 등 자주 사용할 다른 데이터 타입들은 특수한 객체 타입입니다.



