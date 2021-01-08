//4.1 제어문의 기초

//4.1.1 while 루프
/*
let funds = 50;

while(funds > 1 && funds < 100){

    //돈을 겁니다.

    //주사위를 굴립니다.

    //그림을 맞췄으면 돈을 가져옵니다.

}
*/

//4.1.2 블록문
{  
    console.log("statement 1");
    console.log("statement 2");
}

console.log("statement 3");

let funds = 50;

while(funds > 1 && funds < 100){

    funds = funds + 2;//2보 전진
    funds = funds - 1;//1보 후퇴

}

//4.1.3 공백
//줄바꿈이 없습니다.
while(funds > 1 && funds < 100) funds = funds + 2;

//줄바꿈 없이 코드 하나를 블록안 안에 썼습니다.
while(funds > 1 && funds < 100) { funds = funds + 2;}  

//ERROR 이런식으로 쓰면 안됨
while(funds > 1 && funds < 100)
funds = funds + 2;//while 루프 바디
funds = funds - 1;//while 루프 끝난후 실행

//4.1.4 보조 함수
//m 이상 n 이하의 무작위 정수를 반환합니다.
function rand(m,n){

    return m + Math.floor((n - m + 1)*Math.random());

}

//크라운 앤 앵커 게임의 여섯 가지 도형 중 하나를 무작위 반환합니다.
function randFace(){
    return ["crown","anchor","heart","spade","club","diamond"]
    [rand(0,5)];
}

//4.1.5 if...else문
const bets = { crown: 0, anchor: 0, heart: 0, spade: 0, club: 0, diamond: 0 };
let totalBet = rand(1, funds);
if(total === 7){
    totalBet = funds;
    bets.heart = totalBet;
}else {
    //그 판에 걸 돈을 분배합니다.
}
funds -= totalBet;

//4.1.6 do...while 루프
let remaining = totalBet;
do{

    let bet = rand(1, remaining);
    let face = randFace();
    bets[face] = bets[face] + bet;
    remaining = remaining - bet;

}while(remaining > 0);

//4.1.7 for루프
const hand = [];
for(let roll = 0; roll < 3; roll++){

    hand.push(randFace());

}

//4.1.8 if문
let winnings = 0;
for(let die = 0; die < hand.length; die++){

    let face = hand[die];
    if(bets[face] > 0) winnings += bets[face];

}
funds += winnings;

//4.1.9 하나로 합치기
//m 이상 n이하의 무작위 정수를 반환합니다.
function rand(m,n){

    return m + Math.floor((n - m + 1)*Math.random());

}

//크라운 앤 앵커 게임의 여섯 그림 중 하나에 해당하는 문자열을 무작위로 반환합니다.
function randFace(){

    return ["crown","anchor","heart","spade","club","diamond"]
        [rand(0,5)];

}

let funds = 50;     //시작 조건
let round = 0;

while(funds > 1 && funds < 100){

    round++;
    console.log(`round ${round}:`);
    console.log(`\tstarting funds: ${funds}p`);
    //돈을 겁니다.
    let bets = {crown: 0, anchor: 0, heart: 0, spade: 0, club: 0, diamond: 0};
    let totalBet = rand(1,funds);
    if(totalBet === 7){

        totalBet = funds;
        bets.heart = totalBet;

    }else {

        //판돈을 나눕니다.
        let remaining = totalBet;
        do{

            let bet = rand(1, remaining);
            let face = randFace();
            bets[face] = bets[face] + bet;
            remaining = remaining - bet;

        }while(remaining > 0)

    }



funds -= totalBet;
console.log('\tbets: ' + 
Object.keys(bets).map(face => `${face}:${bets[face]} pence`).join(', ') + ` (total: ${totalBet} pence)`);

//주사위를 굴립니다.
const hand = [];
for(let roll = 0; roll < 3; roll++){
    hand.push(randFace());
}

console.log(`\thand: ${hand.join(', ')}`);

//딴 돈을 가져옵니다.
let winnings = 0;

for(let die = 0; die < hand.length; die++){
    let face = hand[die];
    if(bets[face] > 0) winnings = winnings + bets[face];
}
funds = funds + winnings;
console.log(`\twinnings: ${winnings}`);
}

console.log(`\tending funds: ${funds}`);

//4.2 자바스크립트 제어문

//4.2.1 제어문의 예외

break //루프 중간에 빠져나간다.

continue //루프에서 다음 단계로 바로 건너뜁니다.

return //제어문을 무시하고 현재 함수를 즉시 빠져나갑니다. 6장을 보십시오.

throw //예외 핸들러에서 반드시 처리해야 할 예외exception를 일으킵니다. 예외 핸들러는 현재 제어문 바깥에 있어도 상관 없습니다. 11장을 보십시오


//4.2.2 if...else 문을 체인으로 연결하기
//if...else 문을 체인으로 연결하는 것은 사실 특별한 문법은 아닙니다. 단순히 if...else 문을 연달아 쓰고, 각 else 절이 다음 if...else 문을 포함할 뿐입니다.

if(new Date().getDay() === 3){          //new Date().getDay()는 현재 요일에 해당하는
    totalBet = 1;                       //숫자를 반환합니다. 0은 일요일입니다.
}else if(funds === 7){
    totalBet = funds;
}else {
    console.log("No superstition here!");
}

//4.2.3 메타 문법

//while 문
while(condition)
    statement

//condition이 참 같은 값이면 statement를 실행합니다.

//if...else 문
if(condition)
    statement1
[else
    statement2]

//condition이 참 같은 값이면 statement1을 실행하고, 그렇지 않고 else 부분이 있다면 statement2를 실행합니다.

//do...while 문
do
    statement
while(condition);

//statement는 최소한 한 번 실행하고, condition이 참 같은 값인 동안 반복해서 실행합니다.

//for 문
for([initialization]; [condition]; [final-expression])
    statement

//루프에 들어가기 전에 initialization을 실행합니다. condition이 true인 동안 statement를 실행하고, final-expression를 실행한 다음 condition을 다시 체크합니다.

//4.2.4 for 루프의 다른 패턴
//쉼표 연산자를 쓰면 초기화와 마지막 표현식에 여러 문을 결합할 수 있습니다. 예를 들어 다음 for 루프는 피보나치 수열의 숫자 중 처음 여덟 개를 출력합니다.
for(let temp, i=0, j=1; j<30; temp = i, i = j, j = i + temp)
    console.log(j);

//이 예제에서는 초기화를 하면서 변수 temp와 i,j를 동시에 선언했고, 마지막 표현식에서 세 변수를 동시에 조작했습니다. for루프의 제어부에 아무것도 쓰지 않으면 무한 루프가 만들어 집니다.

for(;;) console.log("I will repeat forever!");

//for루프에서 조건을 생략하면 항상 true로 평가되므로 루프를 빠져나갈 수 없습니다.

//for 루프는 보통 정수 인덱스를 늘이거나 줄이면서 반복하지만, 꼭 그래야 하는 건 아닙니다. 어떤 표현식이든 쓸 수 있습니다. 다음 예제를 보십시오.

let s = '3';                            //숫자가 들어있는 문자열
for(; s.length < 10; s = ' ' + s);      //문자열의 길이를 조건으로 썻습니다.
                                        //여기서 사용한 for루프 마지막에 세미콜론이 없으면 에러가 일어납니다.
for(let x = 0.2; x<3.0; x+=0.2)         //제어변수가 정수가 아니어도 괜찮습니다.
    console.log(x);

for(; !player.isBroke;)                 //조건에 객체 프로퍼티를 썼습니다.
    console.log("Still playing!");

//for 루프는 모두 while 루프로 고쳐 쓸 수 있습니다. 예를 들어 다음 코드를 보십시오.
for([initialization]; [condition]; [final-expression])
    statement

//앞에서 본 코드는 다음 코드와 똑같이 동작합니다.

[initialization]
while([condition]){
    statement
    [final-expression]
}

//4.2.5 switch문 
//if..else문은 두 가지 중 하나를 선택하지만, switch 문은 조건 하나로 여러 가지 중 하나를 선택할 수 있습니다. 따라서 참 같은 값/거짓 같은 값보다는 다양하게 나뉘는 조건을 사용합니다.
//switch문의 조건은 값으로 평가할 수 있는 표현식입니다. switch문의 문법은 다음과 같습니다.

switch(expression){
    case value1:
        //expression을 평가한 결과가 value1일 때 실행됩니다.
        [break;]
    case value2:
        //expression을 평가한 결과가 value2일 때 실행됩니다.
        [break;]
    case value3:
        //expression을 평가한 결과가 value3일 때 실행됩니다.
        [break;]
    case value4:
        //expression을 평가한 결과가 value4일 때 실행됩니다.
        [break;]
    default:
        //expression을 평가한 결과가 맞는 것이 없을떄 때 실행됩니다.
        [break;]
}

//break없는 case절을 사용하면 다음과 같이 쓸 수 있습니다.

switch(totalBet){
    case 7:
        totalBet = funds;
        break;
    case 11:
    case 13:
        totalBet = 0;
        break;
    case 21:
        totalBet = 21;
        break;
} 

//default는 특별한 경우입니다.  default 절은 일치하는 case절이 없을 때 실행됩니다.
//default 뒤에 case가 없으므로 break 문이 없어도 되지만, 항상 break문을 사용하는 게 좋은 습관입니다.
//언제든 break 문을 주석 처리할 수 있으므로, 설령 break 없는 case 절을 사용하더라도 항상 break문을 쓰는 습관을 들여야 합니다.
function adjustBet(totalBet, funds){
    switch(totalBet){
        case 7:
            return funds;
        case 13:
            return 0;
        default:
            return totalBet;
    }
}

//자바스크립트는 공백이 몇 칸이든 신경 쓰지 않으므로 break나 return문을 실행할 문과 같은 행에 넣으면 switch문을 더 간결하게 만들 수 있습니다.
switch(totalBet){
    case 7: totalBet = funds; break;
    case 11: totalBet = 0;    break;
    case 13: totalBet = 0;    break;
    case 21: totalBet = 21;   break;
}

//4.2.6 for...in루프
//for...in 루프는 객체의 프로퍼티에 루프를 실행하도록 설계된 루프입니다. 문법은 다음과 같습니다.

for(variable in Object)
    statement

//다음 예제를 보십시오.
const player = {name: 'Thomas', rank: 'Midshipman', age:25};
for(let prop in player){

    if(!player.hasOwnProperty(prop)) continue;
    console.log(prop + ': ' + player[prop]);

}

//4.2.7
for(variable of Object)
    statement

//for...of 루프는 배열은 물론 (9장에서 설명할) 이터러블iterable 객체에 모두 사용할 수 있는 범용적인 루프입니다. 다음 예제에서는 배열에 루프를 실행했습니다.
const hand = [randFace(), randFace(), randFace()];
for(let face of hand)
    console.log(`You rolled...${face}!`);

//for...of는 배열에 루프를 실행해야 하지만 각 요소의 인덱스를 알 필요는 없을 때 알맞습니다. 인덱스를 알아야 한다면 일반적인 for루프를 사용하십시오.
const hand = [randFace(), randFace(), randFace()];
for(let i=0; i<hand.length; i++)
    console.log(`Roll ${i+1}: ${hand[i]}`);

//4.3 유용한 제어문 패턴

//4.3.1 continue문을 사용하여 조건 중첩 줄이기
//특정 조건이 맞을 때만 루프 바디를 실행해야 할 때가 많습니다. 다시 말해 반복문 안에 조건문을 써야 하는 경우입니다. 다음 예제를 보십시오.
while(funds > 1 && funds < 100){

    let totalBet = rand(1,funds);
    if(totalBet === 13){
        console.log("Unlucky! Skip this round...");
    }else {
        //play...
    }

}

//이런 경우를 제어문 중첩 nested controlflow이라 부릅니다. while루프의 바디에서 할 일은 대부분 else절에 들어있고, if절이 하는 일은 console.log를 호출하는 것뿐입니다.
//continue문을 써서 이 구조를 간결하게 만들 수 있습니다.
while(funds > 1 && funds < 100){

    let totalBet = rand(1, funds);
    if(totalBet === 13){

        console.log("Unlucky! Skip this round....");
        continue;
    }
    //play...
}

//4.3.2 break나 return문 써서 불필요한 연산 줄이기
let firstPrime = null;
for(let n of bigArrayOfNumbers){
    if(isPrime(n) && firstPrime === null) firstPrime = n;
}

//아래 형태로 변환하여 for루프를 빠져나갈 수 있습니다.
let firstPrime = null;
for(let n of bigArrayOfNumbers){
    if(isPrime(n)){
        firstPrime = n;
        break;
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
}
//이 루프가 함수 안에 있었다면 break 대신 return문을 써도 됩니다.

//4.3.3 루프를 완료한 뒤 인덱스 값 사용하기
//break문을 써서 루프를 일찍 종료했을 때 인덱스 변수의 값이 필요할 때가 있습니다. for루프가 끝나도 인덱스 변수의 값은 그대로 유지된다는 점을 활용할 수 있습니다.
//이 패턴은 braek문을 써서 루프를 끝내도록 해야만 사용할 수 있습니다. 예를 들어 이 패턴을 써서 배열에 들어 있는 첫 번째 소수의 인덱스를 찾을 수 있습니다.
let i = 0;
for(; i< bigArrayOfNumbers.length; i++){
    if(isPrime(bigArrayOfNumbers[i])) break;
}

if(i === bigArrayOfNumbers.length) console.log('No prime numbers!');
else console.log(`First prime number found at position ${i}`);

//4.3.4 배열을 수정할 때 감소하는 인덱스 사용하기

for(let i = 0; i<bigArrayOfNumbers.length; i++){
    if(isPrime(bigArrayOfNumbers[i])) bigArrayOfNumbers.splice(i,1);
}
//인덱스는 점점 커지는데 우리는 요소를 제거하고 있으므로, 소수가 연달아 존재한다면 그중 일부를 제거하지 않고 넘어갈 가능성이 있습니다.
//감소하는 인덱스를 쓰면 이 문제는 간단히 해결됩니다.
for(let i = bigArrayOfNumbers.length-1;i>=0; i--){
    if(isPrime(bigArrayOfNumbers[i])) bigArrayOfNumbers.splice(i,1);
}
