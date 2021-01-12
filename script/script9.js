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
