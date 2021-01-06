function sayHello(){
    console.log("Hello world!");
}

sayHello();     //콘솔에 함수가 출력됩니다.

//6.1 반환 값
function getGreeting(){
    return "Hello world!";
}

getGreeting();  //"Hello, World!"

//6.2 호출과 참조

getGreeting();  //"Hello, World!"
getGreeting;    //function getGreeting()


const f = getGreeting;
f();            //"Hello, World!"

//함수를 객체 프로퍼티에 할당할 수도 있습니다.
const o = {};
o.f = getGreeting;
o.f();          //"Hello, World!"

//배열 요소로 할당할 수도 있습니다.
const arr = [1,2,3];
arr[1] = getGreeting;       //arr은 이제 [1, function getGreeting(), 2]입니다. 
arr[1]();                   //"Hello World"

//6.3 함수와 매개변수
function avg(a,b){
    return (a + b)/2;
}

avg(5,10);                  //7.5

const a = 5, b = 10;
avg(a,b);
//

function f(x){

    console.log(`f 내부: x=${x}`);
    x=5;
    console.log(`f 내부: x=${x} (할당 후)`);

}

let x = 3;
console.log(`f를 호출하기 전: x=${x}`);
f(x);
console.log(`f를 호출한 다음: x=${x}`);
//결과
//f를 호출하기 전: x=3
//f 내부: x=3
//f 내부: x=5 (할당 후)
//f를 호출한 다음: x=3

//

function f(o){
    o.message = `f 안에서 수정함 (이전 값: '${o.message}')`;
}
let o = {
    message: "초기 값"
};
console.log(`f를 호출하기 전: o.message = "${o.message}"`);
f(o);
console.log(`f를 호출한 다음: o.message = "${o.message}"`);
//결과
//f를 호출하기 전: o.message="초기 값"
//f를 호출한 다음: o.message="f 안에서 수정함 (이전 값: '초기 값')"

//
function f(o){
    o.message = "f에서 수정함";
    o = {
        message: "새로운 객체!"
    };
    console.log(`f 내부: "${o.message}" (할당 후)`);
}

let o = {
    message: '초기 값'
};

console.log(`f를 호출하기 전:"${o.message}"`);
f(o);
console.log(`f를 호출한 다음: "${o.message}"`);
//결과
//f를 호출하기 전: o.message="초기 값"
//f 내부: o.message="새로운 객체!" (할당 후)
//f를 호출한 다음: o.message="f에서 수정함"

//6.3.1 매개변수가 함수를 결정하는가?

function f(x){

    return `in f: x=${x}`;

}
f();        //"in f: x=undefined"

//6.3.2 매개변수 해체
function getSentence({subject, verb, object}){

    return `${subject} ${verb} ${object}`;

}

const o = {

subject:"I",
verb:"love",
object: "Javascript",

};

getSentence(o);         //"I love JavaScript"

//

function getSentence({subject, verb, object}){

    return `${subject} ${verb} ${object}`;

}

const arr = ["I","love","JavaScript"];
getSentence(arr);           //"I love JavaScript"

//확산 연산자를 사용한 매개변수
function addPrefix(prefix, ...words){
    //나중에 더 좋은 방법을 배웁니다.
    const prefixedWords = [];
    for(let i=0; i<words.length; i++){
        prefixedWords[i] = prefix + words[i];
    }
    return prefixedWords;
}
addPrefix("con","verse","vex");     //["converse","convex"]

//6.3.3 매개변수 기본값
function f(a,b = "default", c=3){
    return `${a} - ${b} - ${c}`;
}

f(5,6,7);   //"5-6-7"
f(5,6);     //"5-6-3"
f(5);       //"5-default-3"
f();        //"undefined-default-3"

//6.4 객체의 프로퍼티인 함수
const o = {
    name: 'Wallace',                        //원시 값 프로퍼티
    bark: function() {return 'Woof!';},     //함수 프로퍼티(메서드)
}

//아래와 위 동일

const o = {
    name: 'Wallace',                        //원시 값 프로퍼티
    bark() {return 'Woof!';},               //함수 프로퍼티(메서드)
}

//6.5 this 키워드
const o = {
    name: 'Wallace',
    speak() {return `My name is ${this.name}!`;},
}

o.speak();      //"My name is Wallace!"

//같은 함수에 변수를 할당해보겠다
const speak = o.speak;
speak === o.speak;          //true; 두 변수는 같은 함수를 가리킵니다.
speak();                    //"My name is undefined!"


//이 예제는 메서드 안에 보조 함수가 있습니다.
const o = {
    name:'Julie',
    greetBackwards: function(){
        function getReverseName(){
            let nameBackwards = '';
            for(let i = this.name.length - 1; i>=0; i--){
                nameBackwards += this.name[i];
            }
            return nameBackwards;
        }
        return `${getReverseName()} si eman ym, olleH`;
    },
};
o.greetBackwards();
//o.greetBackwards()를 호출 하는 시점에서 자바스크립트는 this를 의도한대로 o에 연결하지만, greetBackWards 안에서 getReverseName을 호출하면 this는 o가 아닌 다른 것에 묶입니다. 이런 문제를 해결하기 위해 널리 사용하는 방법은 다른 변수에 this를 할당하는 겁니다.


//

const o = {
    name:'Julie',
    greetBackwards: function(){
        const self = this;
        function getReverseName(){
            let nameBackwards = '';
            for(let i = self.name.length - 1; i>=0; i--){
                nameBackwards += self.name[i];
            }
            return nameBackwards;
        }
        return `${getReverseName()} si eman ym, olleH`;
    },
};
o.greetBackwards();


//6.6 함수 표현식과 익명 함수
const f = function(){
    // ...
};

const g = function f(){
    // ...
}
//함수 안에서 자신을 호출할 때 (재귀 라고 합니다) 이런 방식이 필요할 수 있습니다. 다음 예제를 보십시오.

const g = function f(stop){

    if(stop) console.log('f stopped');
    f(true);

};
g(false);


//6.7 화살표 표기법
//function 을 생략해도 됩니다.
//함수에 매개변수가 단 하나 뿐이라면 괄호(())도 생략할 수 있습니다.
//함수 바디가 표현식 하나라면 중괄호와 return문도 생략할 수 있습니다.

const f1 = function() {return "hello!";}
//또는
const f1 = () => "hello!";

const f2 = function(name) {return `Hello, ${name}!`;}
//또는
const f2 = name => `Hello, ${name}!`;

const f3 = function(a,b) {return a+b;}
//또는
const f3 = (a,b) => a + b;

//

const o = {
    name:'Julie',
    greetBackwards: function(){
        const getReverseName() => { //function getReverseName(){...}
            let nameBackwards = '';
            for(let i = this.name.length - 1; i>=0; i--){
                nameBackwards += this.name[i];
            }
            return nameBackwards;
        }
        return `${getReverseName()} si eman ym, olleH`;
    },
};
o.greetBackwards();

//6.8 call과 apply, bind

//call 메서드는 모든 함수에서 사용할 수 있으며, this를 특정 값으로 지정할 수 있습니다.
const bruce = {name: "Bruce"};
const madeline = {name: "Madeline"};

//이 함수는 어떤 객체에도 연결되지 않았지만 this를 사용합니다.
function greet(){
    return `Hello, I'm ${this.name}!`;
}

greet();                //"Hello, I'm undefined" - this는 어디에도 묶이지 않았습니다.
greet.call(bruce);      //"Hello, I'm Bruce" - this는 bruce입니다.
greet.call(madeline);   //"Hello, I'm Madeline" - this는 madeline입니다.

//

function update(birthYear, occupation){
    this.birthYear = birthYear;
    this.occupation = occupation;
}

update.call(bruce, 1949, 'singer');
    //bruce는 이제{ name: "bruce", birthYear:1949, occupation:"singer"}입니다.

update.apply(bruce, 1949, 'singer');
    //bruce는 이제{ name: "bruce", birthYear:1949, occupation:"singer"}입니다.

//

const arr = [2,3,-5,15,7];
Math.min.apply(null,arr);
Math.max.apply(null,arr);
//this 값에 null을 쓴 이유는 Math.min과 Math.max의 this와 관계없이 동작하기 때문입니다. 즉, 무엇을 넘기든 관계없습니다.

//

//Math.min 과 Math.max는 this값이 무엇이든 관계없으므로 확산 연산자를 그대로 사용할 수 있습니다.
const newBruce = [1930, "martial artist"];
update.call(bruce, ...newBruce);     //apply(bruce,newBruce)와 동일하다
Math.min(...arr);                   //-5
Math.max(...arr);                   //-15 

//

//call이나 apply, 다른 bind와 함께 호출하더라도 this 값이 bruce가 되도록 하려면 bind를 사용합니다.

const updateBruce = update.bind(bruce);

updateBruce(1904, "actor");
//bruce는 이제 {name: "bruce", birthyear:1904, occupation: "actor"}입니다.

updateBruce(madeline, 1274, "king");
//bruce는 이제 {name: "bruce", birthyear:1274, occupation: "king"}입니다.
//madeline은 변하지 않았습니다.
//bind 함수의 동작을 영구적으로 바꾸므로 찾기 어려운 버그의 원인이 될 수 있습니다. bind는 매우 유용하지만 함수의this가 어디에 묶이는지 정확히 파악하고 사용해야합니다.


//
//bind에 매개변수를 넘기면 항상 그 매개변수를 받으면서 호출되는 새 함수를 만드는 효과가 있습니다. 예를 들어 bruce가 태어난 해를 항상 1949로 고정하지만, 직업은 자유롭게 바꿀 수 있는 업데이트 함수를 만들고 싶다면 다음과 같이 하면 됩니다.
const updateBruce1949 = update.bind(bruce, 1949);
updateBruce1949("singer, snowwriter");
    //bruce 는 이제 {name: "bruce", birthyear: 1949,occupation: "singer, songwriter"}이다.

