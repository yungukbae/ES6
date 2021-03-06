//10 맵과 셋

//ES6 이전 새로 도입한 데이터 구조인 맵과 셋은 매우 반가운 소식입니다. 맵은 키와 값을 연결한다는 점에서 객체와 비슷하고, 셋은 중복을 허용하지 않는다는 점만
//제와하면 배열과 비슷합니다.

//10.1 맵
//ES6 이전에는 키와 값을 연결하려면 객체를 사용해야 했습니다. 하지만 객체를 이런 목적으로 사용하면 여러가지 단점이 생깁니다.
//-프로토타입 체인 때문에 의도하지 않은 연결이 생길 수 있습니다.
//-객체 안에 연결된 키와 값이 몇 개나 되는지 쉽게 알아낼 수 있는 방법이 없습니다.
//-키는 반드시 문자열이나 심볼이어야 하므로 객체를 키로 써서 값과 연결할 수 없습니다.
//-객체는 프로퍼티 순서를 전혀 보장하지 않습니다.

//Map 객체는 이들 결함을 모두 해결했고, 키와 값을 연결할 목적이라면 (문자열만 키로 쓴다 해도) 객체보다 나은 선택입니다.
//예를 들어 사용자 객체가 여럿 있고 이들에게 각각 역할을 부여한다고 합시다.

const u1 = {name: 'Cynthia'};
const u2 = {name: 'Jackson'};
const u3 = {name: 'Olive'};
const u4 = {name: 'James'};
//먼저 맵을 만듭니다.

const userRoles = new Map();
//다음에는 맵의 set() 메서드를 써서 사용자 역할을 할당합니다.

userRoles.set(u1, 'User');
userRoles.set(u2, 'User');
userRoles.set(u3, 'Admin');
//애석하지만 제임스에게는 역할이 없습니다.
//set() 메서드는 체인으로 연결할 수 있어서 타이핑하는 수고를 덜어 줍니다.

userRoles.set(u1, 'User').set(u2,'User').set(u3,'Admin');
//생성자에 배열의 배열을 넘기는 형태로 써도 됩니다.

const userRoles = new Map([
    [u1, 'User'],
    [u2, 'User'],
    [u3, 'Admin'],
]);
//이제 u2의 역할을 알압볼 때는 get() 메서드를 쓰면 됩니다.

userRoles.get(u2);      //"User"
//맵에 존재하지 않는 키에 get을 호출하면 undefined를 반환합니다. 맵에 키가 존재하는지 확인하는 has() 메서드도 있습니다.

userRoles.has(u1);      //true
userRoles.get(u1);      //"User"
userRoles.has(u4);      //false
userRoles.get(u4);      //undefined
//맵에 이미 존재하는 키에 set()을 호출하면 값이 교체됩니다.

userRoles.get(u1);      //'User'
userRoles.set(u1, 'Admin');
userRoles.get(u1);      //'Admin'
//size 프로퍼티는 맵의 요소 숫자를 반환합니다.

userRoles.size;         //3
//keys() 메서드는 맵의 키를, values() 메서드는 값을, entries() 메서드는 첫 번째 요소가 키이고 두 번째 요소가 값인 배열을 각각 반환합니다.
//이들 메서드가 반환하는 것은 모두 이터러블 객체이므로 for...of 루프를 쓸 수 있습니다.

for(let u of userRoles.keys())
    console.log(u.name);

for(let r of userRoles.values())
    console.log(`${ur[0].name}:${ur[1]}`);

//맵도 분해 할 수 있습니다.
//분해하면 좀 더 자연스러운 코드가 됩니다.
for(let [u,r] of userRoles.entries())
    console.log(`${u.name}:${r}`);

//entries() 메서드는 맵의 기본 이터레이터입니다.
//위 코드는 다음과 같이 단축해서 쓸 수 있습니다.
for(let [u,r] of userRoles)
    console.log(`${u.name}: ${r}`);

//이터러블 객체보다 배열이 필요하다면 확산 연산자를 쓰면 됩니다.
[...userRoles.values()];         //["User","User","Admin"]

//맵의 요소를 지울 때는 delete() 메서드를 사용합니다.

userRoles.delete(u2);
userRoles.size;             //2
//맵의 요소를 모두 지울 때는 clear() 메서드를 사용합니다.

userRoles.clear();
userRoles.size;             //0




//10.2 위크맵
//WeakMap은 다음 차이점을 제외하면 Map과 완전히 같습니다.
//-키는 반드시 객체여야 합니다.
//-WeakMap의 키는 가비지 콜렉션에 포함될 수 있습니다.
//-Weakmap은 이터러블이 아니며 clear() 메서드도 없습니다.

//일반적으로 자바스크립트 코드 어딘가에서 객체를 참조하는 한 그 객체를 메모리에 계속 유지합니다.
// 예를들어 Map의 키인 객체 o가 있다면, 자바스크립트는 Map이 존재하는 한 o를 메모리에 계속 유지합니다. WeakMap에서는 그렇지 않습니다. 
//따라서 WeakMap은 이터러블이 될 수 없습니다. 가비지 콜렉션 중인 객체를 노출할 위험이 너무 크기 때문입니다.

//WeakMap의 이런 특징은 객체 인스턴스의 전용 키를 저장하기에 알맞습니다.
const SecretHolder = (function() {
    const secrets = new WeakMap();
    return class{
        setSecret(secret){
            secrets.set(this, secret);
        }
        getSecret(){
            return secrets.get(this);
        }
    }
})();
//앞의 예제에서는 WeakMap과 그 위크맵을 사용하는 클래스를 함께 IIFE에 넣었습니다. IIFE외부에서는 그 인스턴스에 비밀스런 내용을 저장할 수 있는 SecretHolder 클래스를
//얻게 됩니다. 비밀을 저장할 때는 setSecret메서드를 써야만 하고, 보려 할 때는 getSecret 메서드를 써야만 합니다.

const a = new SecretHolder();
const b = new SecretHolder();

a.setSecret('secret A');
b.setSecret('secret B');

a.getSecret();      //"secret A"
b.getSecret();      //"secret B"
//일반적인 Map을 써도 되지만, 그렇게 하면 SecretHolder 인스턴스에 저장한 내용은 가비지 콜렉션에 포함되지 않습니다.




//10.3 셋
//셋은 중복을 허용하지 않는 데이터 집합입니다. 이전 예제를 재활용합시다. 그런데 이번에는 한 사용자에게 여러 역할을 할당하고 싶다고 합시다. 예를 들어 "User"역할은 모든 사용자에게
//할당되지만, 관리자는 "User" 역할과 "Admin" 역할을 동시에 가질 수 있습니다. 하지만 같은 사용자에게 같은 역할을 여러 번 부여한다는 건 상식적이지 않습니다.
//셋은 이런 경우에 이상적인 데이터 구조입니다.

//먼저 Set 인스턴스를 만듭니다.

const roles = new Set();
//이제 사용자 역할을 추가할 떄는 add() 메서드를 사용합니다.

roles.add("User");      //Set["User"]
//이 사용자에게 관리자 역할을 추가하려면 add()를 다시 호출합니다.

roles.add("Admin");     //Set["User","Admin"]
//Map과 마찬가지로 Set에도 size프로퍼티가 있습니다.

roles.size;             //2
//셋의 장점은 아주 단순합니다. 추가하려는 것이 셋에 이미 있는지 확인할 필요가 없습니다. 이미 있다면 아무 일도 일어나지 않습니다.

roles.add("User");      //Set["User","Admin"]
roles.size;             //2
//역할을 제거할 떄는 delete()를 호출합니다. 제거에 성공했다면, 즉 그런 역할이 셋에 존재했다면 true를 반환하고, 그렇지 않다면 false를 반환합니다.

roles.delete("Admin");      //true
roles;                      //Set["User"]
roles.delete("Admin");      //false





//10.4 위크셋
//위크셋은 객체만 포함할 수 있으며, 이 객체들은 가비지 콜렉션의 대상이 됩니다. WeakMap과 마찬가지로 WeakSet도 이터러블이 아니므로 위크셋의 용도는 매우 적습니다.
//위크셋의 실제 용도는 주어진 객체가 셋 안에 존재하는지 아닌지를 알아보는 것뿐이라고 해도 과언이 아닙니다.

//예를 들어 산타 클로스가 naughty라는 WeakSet을 가지고 어떤 아이가 우는 아이인지 확인해서 선물 대신 석탄을 놓고 온다고 합시다.
const naughty = new WeakSet();

const children = [
    {name: "Suzy"},
    {name: "Derek"},
];

naughty.add(children[1]);

for(let child of children){
    if(naughty.has(child))
        console.log(`Coal for ${child.name}!`);
    else 
        console.log(`Presents for ${child.name}!`);
}


//10.5 요약 
//당신이 자바스크립트 프로그래밍 경험이 많고 ES6는 처음이라면 키와 값을 연결해야 할 때 반사적으로 객체를 선택할 때가 많을 겁니다. 그리고 틀림없이 객체를 맵 대신
//사용할 때 주의해야 할 함정들에 대해서도 숙지하고 있을 겁니다. 하지만 이제 진짜 맵이 생겼으니, 당연히 맵을 써야 합니다. 마찬가지로, 셋 대신 불리언 값만 들어있는 객체를
//써왔다면 그것 역시 더는 필요 없습니다. 객체를 만들려 할 때마다 잠시 멈추고, 이 객체를 맵 대신 쓰려 하는 건지 생각해 보십시오. 만약 그렇다면, Map을 대신 쓰는 걸 고려해 보십시오.












