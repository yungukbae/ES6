//5.1 연산자
//연산자를 표현식의 '명사'에 대한 '동사'라고 생각해도 좋습니다. 표현식이 값이 되는 것이라면 연산자는 값을 만드는 행동이라는 뜻입니다.

//5.2 산술 연산자

const x = 5;
const y = 3 - - x; // y 는 8입니다.

const s = "5";
const y = 3 + +s;   // y는 8dlqslek. 단항 플러스를 사용하지 않았다면
                    // 문자열 병합이 일어나서 결과는 "35"가 됩니다.

//여기서는 굳이 단항 플러스가 필요하지 않지만 줄을 잘 맞출 수 있습니다.
const x1 = 0, x2 = 3, x3 = -1.5, x4 = -6.33;
const p1 = -x1*1;
const p2 = +x2*2;
const p3 = +x3*3;
const p3 = -x4*4;

//5.3 연산자 우선순위

let x = 3,y;
x += y = 6 * 5 / 2;
//이 표현식을 우선순위에 따라 다음에 일어날 행동에 괄호를 치겠습니다.
//
//곱셈과 나눗셈. 우선순위 14, 왼쪽에서 오른쪽으로
//  x += y = (6 * 5) / 2
//  x += y = (30/2)
//  x += y = 15
// 할당. 우선순위 3, 오른쪽에서 왼쪽으로
//  x += (y=15)
//  x += 15         y는 15입니다.
//  18              x는 18입니다.


//5.4 비교연산자

const n = 5;
const s = "5";
n === s;            //false -- 타입이 다릅니다.
n !== s;            //true
n === Number(s);    //true -- 문자열 "5"를 숫자 5로 변환했습니다.
n !== Number(s);    //false
n == s;             //true; 권장하지 않습니다.
n != s;             //false; 권장하지 않습니다.

const a = {name: "an object"};
const b = {name: "an object"};
a === b;            //false -- 객체는 항상 다릅니다.
a !== b;            //true
a == b;             //false; 권장하지 않습니다.
a != b;             //true;  권장하지 않습니다.

3 > 5;  //false
3 >= 5; //false
3 < 5;  //true
3 <= 5; //true

5 > 5;  //false
5 >= 5; //true
5 < 5;  //false
5 <= 5; //true


//5.5 숫자 비교
let n = 0;
while(true){
    n += 0.1;
    if(n === 0.3) break;
}
console.log(`Stopped at ${n}`);

//이 결과는 0.1이 더블 형식으로 정확히 나타내 수 없는 값이기 때문입니다. 0.1은 이진 표현으로 나타낼 수 있는 숫자들 사이에 걸쳐 있습니다. 따라서 이 루프를 세 번째 반복할 때 n의 값은 0.300000000000000000000004이므로
//테스트는 false이고, 유일한 종료 조건이 실패하게 됩니다.

//Number.EPSILON과 관계 연산자를 사용해서 '느슨하게' 비교하고 성공적으로 루프를 빠져나갈 수 있습니다.

let n = 0;
while(true){

    n += 0.1;
    if(Math.abs(n - 0.3) < Number.EPSILON) break;
}
console.log(`Stopped at ${n}`);


//5.6 문자열 병합

3 + 5 + "8"  //문자열 88이 됩니다.
"3" + 5 + 8  //문자열 "358"이 됩니다.


//5.7 논리 연산자

//5.7.1 참 같은 값과 거짓 같은 값

//undefined 
//null
//false
//0
//NaN
//' '(빈 문자열)

//-모든 객체, valueOf() 메서드를 호출했을 때 false를 반환하는 객체도 참 같은 값에 속합니다.
//-배열, 빈 배열도 참 같은 값에 속합니다.
//-공백만 있는 문자열(" " 등)
//-문자열 "false"



//5.8 AND, OR, NOT
//AND(&&)  conjunction
//OR(||)   disjunction
//NOT(!)   negation

//NOT(!)연산의 진위표
// X                    !x
// False                true
// True                 false



//5.8.1 단축평가

const skipIt = true;
let x = 0;
const result = skipIt || x++; //result => true;

const doIt = false;
let x = 0;
const result = doIt && x++; //result => false;

const doIt = true;
let x = 0;
const result = doIt && x++; //result => 0;


//5.8.2 피연산자가 불리언이 아닐 때 논리 연산자가 동작하는 방법

//x             y           x && y
//거짓같은값      거짓같은값      x(거짓같은값)
//거짓같은값      참같은값       x(거짓같은값)
//참같은값       거짓같은값      y(거짓같은값)
//참같은값       참같은값        y(참같은값)

//x             y           x || y
//거짓같은값      거짓같은값      y(거짓같은값)
//거짓같은값      참같은값       y(참같은값)
//참같은값       거짓같은값      x(참같은값)
//참같은값       참같은값        x(참같은값)


//5.8.3 조건 연산자

const doIt =false;
const result = doIt ? "Did it!" : "Didn't do it."; //유일한 3항 연산자


//5.8.4 쉼표 연산자

let x = 0, y = 10, z;
z = (x++, y++);


//5.9 연산자 그룹

//5.9.1 비트 연산자

//연산자        설명            예제
//&           비트AND         0b1010 & 0b1100 // 결과: 0b1000
//|           비트OR          0b1010 | 0b1100 // 결과: 0b1110
//^           비트XOR         0b1010 ^ 0b1100 // 결과: 0b0110
//<<          왼쪽 시프트       0b1010 << 1      // 결과: 0b10100
//                           0b1010 << 2      // 결과: 0b101000
//>>          부호가 따라가는 오른쪽 시프트     아래 코드를 보십시오
//>>>         0으로 채우는 오른쪽 시프트       아래 코드를 보십시오

let n = 22 //32비트 바이너리
n >> 1;
n >>> 1;
n = ~n;    //1의 보수
n++;       //2의 보수
n >> 1;
n >>> 1



//5.9.2 typeof 연산자
//typeof의 반환값
//표현식                        반환값              참고
typeof undefined             "undefined"
typeof null                  "object"
typeof {}                    "object"
typeof true                  "boolean"
typeof 1                     "number"
typeof ""                    "string"
typeof Symbol()              "symbol"
typeof function() {}         "function"



//5.9.3 void 연산자
//void 연산자는 피연산자를 평가한 후 undefined를 반환합니다.
//쓸모없다



//5.9.4 할당 연산자
let v, v0;
v = v0 = 9.8;           //먼저 v0가 9.8이 되고, 그다음 v가 9.8이 됩니다.

//while 문의 조건에 있는 할당을 보십시오. 먼저 n이 nums[i]의 값을 받고,
//다음에는 표현식 전체가 그 값으로 평가되므로 숫자로 비교할 수 있습니다.
const nums = [3, 5, 15, 7, 5];
let n, i=0;
while((n = nums[i]) < 10 && i++ < nums.length){

    console.log(`Number less than 10: ${n}.`);

}
console.log(`Number greater than 10 found: ${n}.`);
console.log(`${nums.length - i - 1}numbers remain.`);


//5.10 해체 할당
//객체 선언
const obj = {b:2, c:3, d:4};

//해채 할당
const {a,b,c} = obj;
a;              //undefined: obj에는 "a"프로퍼티가 없습니다
b;
c;
d;              //ReferenceError: "d"는 정의되지 않았습니다.

//
const obj = {b:2, c:3, d:4};
let a,b,c;

//에러가 일어납니다.
{a,b,c} = obj;

//동작합니다.
({a,b,c} = obj);

//배열 선언
const arr = [1,2,3];

//배열 해체 할당
let [x,y] = arr;
x;
y;
z;              //ReferenceError: "z"는 정의되지 않았습니다.

//확산 연산자를 사용하면 남은 요소를 배열에 할당할 수 있습니다.
const arr = [1,2,3,4,5];

let [x,y, ...rest] = arr;
x;
y;
rest;           //[3,4,5]

//5.11 객체와 배열 연산자

//. 점 연산자
//[] 대괄호 연산자
//in 프로퍼티 존재 연산자
//new 객체 인스턴스화 연산자
//instanceof 프로토타입 체인 테스트 연산자
//... 확산 연산자
//delete 삭제 연산자


//5.12 템플릿 문자열과 표현식
const roomTempC = 21.5;
let currentTemp = 19.5;
const message = `The current temperature is ` + `${currentTempC-roomTempC}\u00b0C difference than room temperature`;
const fahrenheit = `The current temperature is ${currentTempC * 9/5 + 32}\u00b0F`;

//5.13 표현식과 흐름 제어 패턴

//5.13.1 if...else 문을 3항 연산자로 바꾸기

if(isPrime(n)){
    label = 'prime';
}else{
    label = 'non-prime';
}

//다음과 같이 변형 가능

label = isPrime(n) ? 'prime' : 'non-prime';

//5.13.2 if문을 단축 평가하는 OR표현식으로 바꾸기
if(options) options = {};

//다음과 같이 변형 가능

options = options || {};






















