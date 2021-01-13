//객체와 객체지향 프로그래밍
//배열과 마찬가지로 자바스크립트 객체 역시 컨테이너지만, 크게 보면 다음 두 가지 측면에서 배열과 다릅니다.

//-배열은 값을 가지며 각 값에는 숫자형 인덱스가 있습니다. 객체는 프로퍼티를 가지며 각 프로퍼티에는
//문자열이나 심볼 인덱스가 있습니다.
//-배열에는 순서가 있습니다. 즉, arr[0]은 항상 arr[1]보다 앞에 있습니다. 반면 객체에는 그런 순서가 보장 되지 않습니다. obj.a가 obj.b보다 앞에 있다고 말할 수는 없습니다.

//프로퍼티는 키(문자열 또는 심볼)과 값으로 구성됩니다. 객체의 진짜 특징은 키를 통해 프로퍼티에 접근할 수 있다는 점입니다.

//9.1 프로퍼티 나열
//프로퍼티 나열에서 기억해야 할 것은 순서가 보장되지 않는다는 점입니다. 여러 번 테스트를 해 봤는데도 프로퍼티가 입력한 순서대로 나열될 수도 있습니다.
//따라서 입증 할 수 없는 테스트를 근거로 확실하다는 착각에 빠지지 마십시오. 객체 프로퍼티에는 순서가 없습니다.


//9.1.1 for...in

//문자열 프로퍼티가 몇개 있고 심볼 프로퍼티가 하나 있는 객체가 있다고 합시다.

const SYM = Symbol();
const o = {a:1, b:2, c:3, [SYM]:4};
for(let prop in o){
    if(!o.hasOwnProperty(prop)) continue;
    console.log(`${prop}:${o[prop]}`);
}
//상당히 단순해 보입니다만, hasOwnProperty가 무슨 의미인지 궁금한 독자도 있을 겁니다.
//hasOwnProperty는 이 장 후반에 알게 될 상속된 프로퍼티가 for...in에 나타날 위험을 제거하기 위해 사용합니다. 이 예제에서는 생략하더라도 아무 차이도 없습니다.
//하지만 다른 타입의 객체, 특히 다른 사람이 만든 객체의 프로퍼티를 나열하다 보면 예상치 못한 상황이 생길 수 있을므로 hasOwnProperty를 쓰는 습관을 들이길 권합니다.
//hasOwnProperty가 왜 중요한지 생략해도 안전할 때는 언제인지는 곧 알게됩니다.
//for..in 루프에는 키가 심볼인 프로퍼티는 포함되지 않습니다.
//CAUTION for...in을 배열에 사용할 수도 있겠지만, 그리 좋은 생각은 아닙니다. 배열에는 일반적인 for 루프나 forEach를 사용하십시오.


//9.1.2 object.keys
//object.keys는 객체에서 나열 가능한 문자열 프로퍼티를 배열로 반환합니다.

const SYM = Symbol();
const o = {a:1, b:2, c:3, [SYM]:4};
Object.keys(o).forEach(prop => console.log(`${prop}:${o[prop]}`));

//이 예제는 for...in 루프를 썼을 때와 같은 결과이고 hasOwnProperty를 체크할 필요는 없습니다.
//객체의 프로퍼티 키를 배열로 가져와야 하 때는 Object.keys가 편리합니다. 예를 들어 객체에서 x로 시작하는 프로퍼티를 모두 가져온다면 다음과 같이 할 수 있습니다.

const o = {apple:1, xochitl:2, balloon:3, guitar: 4, xylophone: 5,};
Object.keys(o).filter(prop => prop.match(/^x/)).forEach(prop => console.log(`${prop}: ${o[prop]}`));


//9.2 객체지향 프로그래밍
//객체는 데이터와 기능을 논리적으로 묶어 놓은 겁니다. 
//시작전 OPP의 기본 용어에 대해 알아봅시다.
//클래스 => '어떤 자동차' 와 같은 추상적이고 범용적인 개념
//인스턴스 => '특정 자동차' 와 같이 구체적이고 한정적인 것
//메서드 => 클래스에 속하지만 특정 인스턴스에 묶이지 않는 기능을 클래스 메서드라고 합니다. 

//OOP는 클래스를 계층적으로 분류 할 수 도 있다. 예를들어 '자동차'보다 더 범용적인 '운송 수단' 클래스가 있다고 합시다.
//운송 수단 클래스에는 자동차와 마찬가지로 급유나 충전 없이 이동할 수 있는 거리인 범위 프로퍼티가 있겠지만, 자동차와 달리 바퀴는 없을 수 도 있습니다. 
//보트는 바퀴가 없는 운송수단 잆니다. 이때 운송 수단을 자동차의 슈퍼클래스라 부르고, 자동차, 보트를 운송 수단의 서브 클래스라 합니다.

//9.2.1 클래스와 인스턴스 생성
class Car{
    constructor(){

    }
}
//앞의 코드는 새 클래스 Car를 만듭니다. 아직 인스턴스(특정 자동차)는 만들어지지 않았지만 언제든 만들 수 있습니다. 인스턴스를 만들 때는 new키워드를 사용합니다.

const car1 = new Car();
const car2 = new Car();
//이제 Car클래스의 인스턴스가 두 개 생겻다. Car 클래스를 더 수정하기 전에, 객체가 클래스의 인스턴스인지 확인하는 instanceof연산자에 대해 알아봅시다.
car1 instanceof Car     //true
car1 instanceof Array   //false

//이 예제를 보면 car1은 Car의 인스턴스이고 Array의 인스턴스는 아님을 알 수 있습니다.
//Car 클래스를 조금 더 흥미롭게 만들어 봅시다. 제조사와 모델 데이터, 변속 기능을 추가할 겁니다.
class Car{
    constructor(make, model){
        this.make = make;
        this.model = model;
        this.userGears = ['P','R','N','D'];
        this.userGear = this.userGears[0];
    }
    shift(gear){
        if(this.userGears.indexOf(gear) < 0)
            throw new Error(`Invalid gear:${gear}`);
            this.userGear = gear;
    }
}
//여기서 this키워드는 의도한 목적, 즉 메서드를 호출한 인스턴스를 가리키는 목적으로 쓰였습니다. this를 일종의 플레이스홀더로 생각해도 좋습니다. 클래스를 만들 때 사용한 thisㅋ 키워드는 나중에 만들 인스턴스 플레이스 홀 입니다.
//shift 메서드는 기어 변속에 사용됩니다. 이제 실제로 사용해 봅시다.
const car1 = new Car("Tesla","model S");
const car2 = new Car("Mazda","3i");
car1.shift('D');
car2.shift('R');

//이 예제에서 car1.shift('D')를 호출하면 this는 car1에 묶입니다. 마찬가지로 car2, shift('R')를 호출하면 this는 car2에 묶입니다. 
//다음과 같이 car1이 주행중이고 car2는 후진중임을 알 수 있다.
car1.userGear //"D"
car2.userGear //"R"


//Car클래스에 shift 메서드를 사용하면 잘못된 기어를 선택하는 실수를 방지할 수 있을 것 처럼 보입니다. 
//하지만 완벽하게 보호되는건 아닙니다. 직접 car1.userGear = 'X'라고 설정한다면 막을 수 없습니다.
//Car클래스를 다음과 같이 수정하면 실수로 기어 프로퍼티를 고치지 않도록 어느 정도 막을 수 있습니다.
class Car{
    constructor(make, model){
        this.make = make;
        this.model = model;
        this._userGears = ['P','R','N','D'];
        this._userGear = this.userGears[0];
    }

    get userGear() {return this._userGear; }
    set userGear(value){
        if(this._userGears.indexOf(gear) < 0)
            throw new Error(`Invalid gear:${value}`);
            this.userGear = value;
    }
    shift(gear){this.userGear = gear;}

}
//이 예제는 외부에서 접근하면 안 되는 프로퍼티 이름 앞에 밑줄을 붙이는, 소위 '가짜 접근 제한'을 사용했습니다. 진정한 제한이라기보다는 "아, 밑줄이 붙은 프로퍼티에 접근 하려고 하네? 이건 실수로군." 하면서 빨리 찾을 수 있도록 하는 방편 이라고 봐야합니다.
//프롶퍼티를 꼭 보호해야 한다면 스코프를 이용해 보호하는 WeakMap 인스턴스를 사용할 수 있습니다. Car클래스를 다음과 같이 고치면 기어 프로퍼티를 완벽하게 보호할 수 있습니다.
const Car = (function() {
    
    const carProps = new WeakMap();
    
    class Car{

    constructor(make, model){
        this.make = make;
        this.model = model;
        this._userGears = ['P','R','N','D'];
        this._userGear = this.userGears[0];
    }

    get userGear() {return carProps.get(this).userGear; }
    set userGear(value){
        if(this._userGears.indexOf(gear) < 0)
            throw new Error(`Invalid gear:${value}`);
            this.userGear = value;
    }
    shift(gear){this.userGear = gear;}

}
    return Car;
})();

//여기서는 즉시 호출하는 함수 표현식을 써서 WeakMap을 클로저로 감싸고 바깥에서 접근할 수 없게 했습니다. WeakMap은 클래스 외부에서 접근하면 안 되는 프로퍼티를 안전하게 저장합니다.

//프로퍼티 이름에 심볼을 쓰는 방법도 있다. 이렇게 해도 어느 정도는 보호할 수 있지만, 클래스에 들어 있는 심볼 프로퍼티 역시 접근이 불가능한 것은 아니므로 이 방법에도 한계가 있다고 해야 합니다.


//9.2.2 클래스는 함수다.
//클래스는  사실 함수일 뿐입니다. ES5에서는 Car클래스를 다음과 같이 만들었을 겁니다.
function Car(make, model){
    this.make = make;
    this.model = model;
    this._userGear = ['P','R','N','D'];
    this._userGear = this.userGears[0];
}

//ES6에서도 똑같이 할 수 있습니다. 결과는 완전히 동일합니다. 다음 예제를 보십시오.
class Es6Car {} //생성자는 의도적으로 생략합니다.
function Es5Car {}
> typeof Es6Car     //"function"
> typeof Es5Car     //"funciton"

//ES6에서 클래스가 바뀐것은 아니다. 단지 새 문법이 생겼을 뿐이다.


//9.2.3 프로토타입
//최근에는 프로토타입 메서드를 #으로 표시하는 표기법이 쓰인다. 예를 들어 Car.prototype.shift를 Car#shift로 쓰는 겁니다.

//모든 함수에는 prototype이라는 특별한 프로퍼티가 있습니다. 일반적인 함수에서는 프로토타입을 사용할 일이 없지만, 객체 생성자로 동작하는 함수에서는 프로토타입이 대단히 중요합니다.
//객체 생성자, 즉 클래스는 Car처럼 항상 첫 글자를 대문자로 표현해야 합니다.
//인스턴스에서나 메서드나 프로퍼티를 정의하면 프로토타입에 있는 것을 가리는 효과가 있습니다. 자바스크립트는 먼저 인스턴스를 체크하고 거기에 없으면 프로토타입을 체크하기 때문입니다. 예제를 봅시다.
//Car 클래스는 이전에 만든, shift 메서드가 있는 클래스입니다.
const car1 = new Car();
const car2 = new Car();
car1.shift === Car.prototype.shift; //true
car1.shift('D');
car1.shift('d');                    //error
car1.userGear;                      //'D'
car1.shift === car2.shift           //true

car1.shift = function(gear) {this.userGear = gear.toUpperCase();}
car1.shift === Car.prototype.shift;     //false
car2.shift === car2.shift               //false
car1.shift('d');
car1.userGear;                          //'D'

//car1 객체에는 shift메서드가 없지만, car1.shift('D')를 호출하면 자바스크립트는 car1의 프로토타입 에서 그런 이름의 메서드를 검색합니다. car1에 shift메서드를 추가하면 
//car1과 프로토타입에 같은 이름의 메서드가 존재하게 됩니다. 이제 car1.shift('d')를 호출하면 car1의 메서드가 호출되고 프로토타입의 메서드는 호출되지 않습니다.

//프로토타입 체인과 동적 디스패치를 항상 숙지하고 있을 필요는 없지만, 가끔 문제가 발생할때 세부사항을 알고 있으면 도움이 됩니다.

//9.2.4 정적 메서드
//이 메서드는 특정 인스턴스에 적용되지 않습니다. 정적 메서드에서 this는 인스턴스가 아니라 클래스 자체에 묶입니다.
//하지만 일반적으로 정적 메서드에는 this 대신 클래스 이름을 사용하는 것이 좋은 습관입니다.
//정적 메서드는 클래스에 관련되지만 인스턴스와는 관련이 없는 범용적인 작업에 사용됩니다.
//예제로 자동차 식별 번호(VIN)을 붙이는 메서드를 생각해 봅시다. 개별 자동차가 자신만의 VIN을 생성한다는 것은 불가능합니다.
//다른 자동차에 같은 VIN이 이미 부여됐는지 자동차가 어떻게 알겠습니까? VIN을 할당한다는 것은 자동차 전체를 대상으로 하는 추상적인 개념이므로 정적 메서드로 사용하는 게 어울립니다.
//정적 메서드는 여러 인슨턴스를 대상으로 하는 작업에도 종종 쓰입니다. 예를 들어 두 자동차의 제조사와 모델이 모두 같으면 true를 반환하는 areSimilar 메서드, 두 자동차의 VIN이 같으면 true를 반환하는 areSame 메서드를
//만들어 봅시다.

class Car{
    static getNextVin(){
        return Car.nextVin++;   //this.nextVin++ 라고 써도 되지만,
                                //Car를 앞에 쓰면 정적 메서드라는 점을
                                //상기하기 쉽습니다.
    }

    constructor(make, model){
        this.make = make;
        this.model = model;
        this.vin = Car.getNextVin();
    }
    static areSimilar(car1,car2){
        return car1.make === car2.make && car1.model === car2.model;
    }
    static areSame(car1,car2){

        return car1.vin === car2.vin;

    }
}
Car.nextVin = 0;

const car1 = new Car("Tesla","S");
const car2 = new Car("Mazda","3");
const car3 = new Car("Mazda","3");

car1.vin;       //0
car2.vin;       //1
car3.vin;       //2

Car.areSimilar(car1,car2);      //false
Car.areSimilar(car2,car3);      //true
Car.areSame(car2,car3);         //false
Car.areSame(car2,car2);         //true


//9.2.5 상속
//클래스의 인스턴스는 클래스의 기능을 모두 상속합니다. 상속은 한 단계로 끝나지 않습니다. 객체의 프로토타입에서 메서드를 찾지 못하면 자바스크립트는 프로토타입의 프로토타입을 검색합니다. 
//프로토타입 체인은 이런 식으로 만들어집니다. 자바스크립트는 조건에 맞는 프로토타입을 찾을 때까지 프로토타입 체인을 계속 거슬러 올라갑니다. 조건에 맞는 프로토타입을 찾지 못하면 에러를 일으킵니다.
//클래스의 계층 구조를 만들 때 프로토타입 체인을 염두에 두면 효율적인 구조를 만들 수 있습니다. 즉, 프로토타입 체인에서 가장 적절한 위치에 메서드를 정의하는 겁니다.
//자동차는 운송 수단의 일종입니다. 예를 들어 자동차에는 deployAirbags이란 메서드가 있을 수 있습니다.
//이 메서드를 운송 수단 클래스에 정의할 수도 있겠지만, 에어백이 달린 보트는 본 적이 없겠죠? 반면 운송 수단은 대부분 승객을 태울 수 있으므로, addPessenger 메서드는 운송 수단 클래스에 적당합니다.
//이런 시나리오를 자바스크립트로 만들어 봅시다.

class Vehicle{
    constructor(){
        this.passengers = [];
        console.log("Vehicle created");
    }
    addPassenger(p){
        this.passengers.push(p);
    }

}
class Car extends Vehicle{
    constructor(){
        super();
        console.log("Car created");
    }
    deployAirbags(){
        console.log("BWOOSH!");
    }
}

//처음 보는 키워드가 눈에 띕니다. extends 키워드는 Car를 Vehicle의 서브클래스로 만듭니다. super()도 처음 보는 것입니다. super()는 슈퍼클래스의 생성자를 호출하는 특별한 함수입니다.
//서브클래스에서 이 함수를 반드시 호출해야 합니다. 호출하지 않으면 에러가 일어납니다.

//예제를 봅시다.

const v = new Vehicle();
v.addPassenger("Frank");
v.addPassenger("Judy");
v.passengers;               //["Frank","Judy"]
const c = new Car();
c.addPassenger("Alice");
c.addPassenger("Cameron");
c.passengers;               //["Alice","Cameron"]
v.deployAirbags();          //error
c.deployAirbags();          //"BWOOSH!"

//c에서는 deployAirbags를 호출할 수 있지만, v에서는 불가능합니다. 달리 말하면, 상속은 (당연히) 단방향입니다. Car클래스의 인스턴스는 Vehicle 클래스의 모든 메서드에 접근할 수 있지만, 반대는 불가능합니다.


//9.2.6 다형성
//다형성 이라는 단어는 객체지향 언어에서 여러 슈퍼클래스의 멤버인 인스턴스를 가리키는 말입니다. 대부분의 객체지향 언어에서 다형성은 특별한 경우에 속합니다.
//자바스크립트는 느슨한 타입을 사용하고 어디서든 객체를 쓸 수 있으므로 (정확한 결과가 보장되진 않지만). 어떤 면에서는 자바스크립트의 객체는 모두 다형성을 갖고 있다고 할 수 있습니다.

//자바스크립트 코드를 작성하다 보면 '이런 메서드가 있고 저런 메서드가 있으니 아마 그 클래스의 인스턴스일 것이다'처럼 짐작할 때가 많습니다. Car예제에 적용해 본다면, deployAirbags 메서드가 있는 객체는 Car의 인스턴스라고 생각할 수 있습니다.
//물론 아닐 수도 있지만, 그 같은 짐작이 근거 없는 추측은 절대 아닙니다.

//자바스크립트에는 객체 클래스의 인스턴스인지 확인하는 instanceof 연산자가 있습니다. 이 연산자를 속일 수도 있지만, prototype과 __proto__프로퍼티에 손대지 않았다면 정확한 결과를 기대할 수 있습니다.
class Motorcycle extends Vehicle{}
const c = new Car();
const m = new Motorcycle();
c instanceof Car;                       //true
c instanceof Vehicle;                   //true
m instanceof Car;                       //false
m instanceof Motorcycle;                //true
m instanceof Vehicle;                   //true

//자바스크립트의 모든 객체는 루트 클래스인 Object의 인스턴스입니다. 즉, 객체 o에서 o instanceof Object는 항상 true입니다.
//모든 객체가 Object의 인스턴스인 것은 toString 같은 중요한 메서드를 상속하기 위해서이며, 염두에 둘 만큼 중요한 영향은 없습니다.


//9.2.7 객체 프로퍼티 나열 다시 보기
//ES6 클래스를 설계 의도대로 사용한다면 데이터 프로퍼티는 항상 프로토타입 체인이 아니라 인스턴스에 정의해야 합니다. 하지만 프로퍼티를 프로토타입에 정의하지 못하도록 강제하는 장치는 없으므로 확실히 확인하려면 항상
//hasOwnProperty를 사용하는 편이 좋습니다. 예제를 보십시오.
class Super{
    constructor(){
        this.name = 'Super';
        this.isSuper = ture;
    }
}

// 유효하지만, 권장하지는 않습니다.
Super.prototype.sneaky = 'not recommended!';

class Sub extends Super{
    constructor(){
        super();
        this.name='Sub';
        this.isSub = true;
    }
}
const obj = new Sub();

for(let p in obj){
    console.log(`${p}:${obj[p]}` + (obj.hasOwnProperty(p) ? '': '(inherited)'));
}
//이 프로그램을 실행한 결과
name: Sub
isSuper: true
isSub: true
sneaky: not recommended! (inherited)
//
//name, isSuper, isSub 프로퍼티는 모두 프로토타입 체인이 아니라 인스턴스에 정의됐습니다.(슈퍼클래스 생성자에서 선언한 프로퍼티는 서브클래스 인스턴스에도 정의됩니다). 반면 sneaky 프로퍼티는 슈퍼클래스의 프로토타입에 직접 정의했습니다.
//Object.keys를 사용하면 프로토타입 체인에 정의된 프로퍼티를 나열하는 문제를 피할 수 있습니다.

//9.2.8 문자열 표현
//모든 객체는 Object를 상속하므로 Object의 메서드는 기본적으로 모든 객체에서 사용할 수 있습니다. 객체의 기본적인 문자열 표현을 제공하는 toString도 그런 메서드 중 하나입니다.
//toString의 기본동작은 "[object Object]"를반환하는 것인데, 이건 거의 쓸모가 없습니다.

//toString 메서드에서 객체에 관한 중요한 정보를 제공한다면 디버깅에 유용하고, 객체를 한눈에 파악할 수 있습니다. Car 클래스의 toString 메서드가 제조사, 모델, VIN을 반환하도록 고쳐봅시다.
class Car{
    toString(){
        return `${this.make} ${this.model}:${this.vin}`;
    }
}
//...

//이제 Car의 인스턴스에서 toString을 호출하면 객체 식별에 필요한 정보를 얻을 수 있습니다.


//9.3 다중 상속, 믹스인, 인터페이스
//자동차에 적용할 수 있는 보험가입 믹스인을 만듭시다. 이 믹스인은 단순하게 만들 겁니다.
//보험 가입 믹스인 외에도 InsurancePolicy 클래스를 만듭니다. 보험 가입 믹스인에는 addinsurancePolicy, getInsurancePolicy메서드가 필요하며, 편의를 위해 isInsured메서드도 추가하겠습니다.
//아래 예제를 봅시다
class InsurancePolicy{}
function makeInsurable(o){
    o.addInsurancePolicy = function(p) {this.InsurancePolicy = p;}
    o.getInsurancePolicy = function() {return this.InsurancePolicy;}
    o.isInsured = function() {return !!this.InsurancePolicy; }
}
//이제 우리는 어떤 객체든 보험에 가입할 수 있습니다. 그러면 Car로 돌아와서, 무엇을 보험에 가입해야 할까요? 가장 먼저 드는 생각은 이런 것이겠지요.
makeInsurable(Car);
//하지만 그렇게는 되지 않습니다.

const car1 = new Car();
car1.addInsurancePolicy(new InsurancePolicy());             //error

//"addInsurancePolicy가 프로토타입 체인에 존재하지 않으니 당연하지"라고 생각했다면, 애석 하지만 틀린 답입니다. 그렇게 해도 Car를 보험에 가입할 수는 없습니다
//그렇게 해도 Car를 보험에 가입할 수는 없습니다. 상식적이지도 않습니다. 자동차를 추상화한 개념을 보험에 가입할 수는 없죠. 보험에 가입하는 것은 개별 자동차 입니다.
//그러니 이렇게 해봅시다.
const car1 = new Car();
makeInsurable(car1);
car1.addInsurancePolicy(new InsurancePolicy());     //works
//아 방법은 동작하지만, 모든 자동차에서 makeInsurable을 호출해야 합니다. Car생성자에 추가할 수도 있지만, 그렇게 하면 이 기능을 모든 자동차에 복사하는 형국이 됩니다.
//다행히 해결책은 쉬운 편입니다.
makeInsurable(Car.prototype);
const car1 = new Car();
car1.addInsurancePolicy(new InsurancePolicy());     //works

//이제 보험 관련 메서드들은 모두 Car클래스에 저으이된 것처럼 동작합니다. 자바스크립트의 관점에서는 실제로 그렇습니다. 개발자의 관점에서는 중요한 두 클래스를 관리하기
//쉽게 만들었습니다. 자동차 회사에서 Car클래스의 개발과 관리를 담당하고, 보험 회사에서 InsurancePolicy 클래스와 makeInsurable 믹스인을 관리하게 됩니다. 
//두 회사의 업무가 충돌할 가능성을 완전히 없앤 건 아니지만, 모두가 거대한 Car클래스에 달라붙어 일하는 것보다는 낫습니다.

//물론 믹스인이 모든 문제를 해결해 주지는 않습니다. 보험 회사에서 shift 메서드를 만들게 된다면 Car클래스의 동작이 이상해질 겁니다. instanceof 연산자로
//보험에 가입할 수 있는 객체를 식별할 수도 없습니다.
//'addInsurancePolicy 메서드가 있다면 틀리없이 보험에 가입할 수 있다'는 식의 짐작만 가능할 뿐입니다.

//심볼을 사용하면 이런 문제 일부를 경감할 수 있습니다. 보험 회사에서 매우 범용적인 메서드 이름을 계속 사용해서, 우연히 Car클래스의 메서드와 충돌할까 봐 걱정된다고 가정합시다.
//그러면 보험 회사에 키를 모두 심볼로 사용해 달라고 요청할 수 있습니다. 보험사가 제공하는 믹스인은 다음과 같은 형태가 될 겁니다.

class InsurancePolicy{}
const ADD_POLICY = Symbol();
const GET_POLICY = Symbol();
const IS_INSURED = Symbol();
const _POLICY = Symbol();
function makeInsurable(o){
    o[ADD_POLICY] = function(p) {this[_POLICY] = p;}
    o[GET_POLICY] = function() {return this[_POLICY];}
    o[IS_INSURED] = function() {return !!this[_POLICY];}
}

//심볼은 항상 고유하므로 믹스인이 Car클래스의 기능과 충돌할 가능성은 없습니다. 쓰기가 조금 번거로울 수는 있겠지만, 훨씬 안전합니다.
//메서드 이름에는 일반적인 문자열을 쓰고 데이터 프로퍼티에는 _POLICY 같은 심볼을 쓰는 절충안을 생각할 수도 있습니다.





