//8.1 배열의 기초

//배열 리터럴
const arr1 = [1,2,3];                       //숫자로 구성된 배열
const arr2 = ["one",2,"three"];             //비균질적 배열
const arr3 = [[1,2,3],["one",2,"three"]];   //배열을 포함한 배열
const arr4 = [
    {name:"Fred",type:"object",luckyNumbers = [5,7,13]},
    [
        {name:"Susan",type:"object"},
        {name:"Anthony",type:"object"},
    ],
    1,
    function() {
        return "arrays can contain functions too";
    },
];

//배열 요소에 접근하기
arr1[0];                    //1
arr1[2];                    //3
arr3[1];                    //["one",2,"three"]
arr4[1][0];                 //{name:"Susan",type:"object"}

//배열 길이
arr1.length;                //3
arr4.length;                //5
arr4[1].length;             //2

//배열 길이 늘리기
arr1[4] = 5;
arr1;                       //[1,2,3,undefined, 5]
arr1.length;                //5

//배열의 현재 길이보다 큰 인덱스에 접근하는 것만으로 배열의 길이가 늘어나지는 않습니다.
arr2[10];                   //undefined
arr2.length;                //3

//Array 생성자(거의 사용하지 않습니다.)
const arr5 = new Array();           //빈 배열
const arr6 = new Array(1,2,3);      //[1,2,3]
const arr7 = new Array(2);          //길이가 2인 배열, 요소는 모두 undefined입니다.
const arr8 = new Array("2");        //["2"]

//8.2~8.3은 생략하겠다
//8.4 map과 filter
//map은 배열 요소를 변형합니다. 무엇으로 변형하냐고요? 뭐든 가능합니다.
const cart = [ { name: "Widget", price: 9.95},{name:"Gadget",price:22.95}];
const names = cart.map(x => x.name);            //["Widget","Gadget"]
const prices = cart.map(x => x.price);          //[9.95, 22.95]
const discountPrices = prices.map(x => x*0.8);  //[7.96, 18.36]

//콜백 함수는 각 요소에서 호출될 때 요소 자체와 요소 인덱스, 배열 전체를 매개변수로 받습니다.(배열 매개변수는 그다지 유용하지 않습니다.) 다음 예제는 두 배열에 상품과 가격이 따로 저장되어 있는데, 이 둘을 객체로 결합해 봅시다.
const items = ["Widget","Gadget"];
const prices = [9.95, 22.95];
const cart = items.map((x,1) => ({name:x, price: prices[i]}));
//cart: [{name:"Widget",price:9.95},{name:"Gadget",price:22.95}]
//인덱스(i)를 쓴 까닭은 items의 요소와 prices의 요소를 인덱스에 따라 결합하기 위해서입니다. 여기서 map은 다른 배열에서 정보를 가져와서 문자열로 이루어진 배열을 객체 배열로 변형했습니다. 
//객체를 괄호로 감싼 이유는, 이렇게 하지 않으면 화살표 표기법에서 객체 리터럴의 중괄호를 블록으로 판단하기 때문입니다.

//filter는 이름을 암시하듯 배열에서 필요한 것들만 남길 목적으로 만들어졌습니다. filter는 map과 마찬가지로 사본을 반환하며 새 배열에는 필요한 요소만 남습니다. 어떤 요소를 남길지는 마음대로입니다.
//어떤 요소를 남길지 판단할 함수를 넘길 것 같다고요? 정답입니다. 예제를 봅시다.

//카드 덱을 만듭니다.
const cards = [];
for(let suit of ['H','C','D','S'])      //하트, 클로버, 다이아몬드, 스페이드
    for(let value = 1; value <= 13; value++)
        cards.push({suit, value});

//value 가 2인 카드
cards.filter(c => c.value === 2);           //[
                                            //      {suit: 'H', value:2},
                                            //      {suit: 'C', value:2},
                                            //      {suit: 'D', value:2},
                                            //      {suit: 'S', value:2}
                                            //]
//여기서 부터는 지면을 생각해서 반환된 배열의 길이만 적습니다.

//다이아몬드
cards.filter(c => c.suit == 'D');           //length: 13

//킹, 퀸, 주니어
cards.filter(c => c.value > 10);            //length: 12

//하트의 킹, 퀸, 주니어
cards.filter(c => c.value > 10 && c.suit === 'H');  //length: 3

//map과 fliter를 결합하면 정말 다양한 일을 할 수 있습니다. 예를 들어 앞에서 만든 카드 덱을 짧은 문자열로 표현하고 싶다고 합시다. 카드 그림(하트, 클로버, 다이아몬드, 스페이드)
//에는 유니코드 코드포인트를 쓰고 에이스와 킹, 퀸, 주니어는 숫자 대신 각각 A,K,Q,J를 쓰겠습니다. 여기에 필요한 함수는 조금 길어지므로 익명 함수를 쓰지 않고 따로 만들겠습니다.
function cardToString(c){
    const suits = {'H':'\u2665','C':'\u2663','D':'\u2666','S':'\u2660'};
    const values = {1:'A',11:'J',12:'Q',13:'K'};
    //cardToString을 호출할 때마다 매번 값을 만드는 건 그리 효율적인 방법은 아닙니다.
    //더 효율적인 방법은 독자의 연습문제로 남기겠습니다.
    for(let i=2; i<=10; i++) values[i] = i;
    return values[c.value] + suits[c.suit];
}

//value가 2인 카드
cards.filter(c => c.value === 2).map(cardToString); //["2하트","2클로버","2 ","2스페이드"]

//하트의 킹, 퀸, 주니어
cards.filter(c => c.value > 10 && c.suit === 'H').map(cardToString); //["J하트","Q하트","K하트"]


//8.5 배열의 마법 reduce
//map이 배열의 각 요소를 변형한다면 reduce는 배열 자체를 변형합니다. reduce라는 이름은 이 메서드가 보통 배열을 값 하나로 줄이는 데 쓰이기 때문에 붙었습니다.
//예를 들어 배열에 들어있는 숫자를 더하거나 평균을 구하는 것은 배열을 값 하나로 줄이는 동작입니다. 하지만 reduce가 반환하는 값 하나는 객체일 수도 있고, 다른 배열일 수도 있습니다.
//사실 reduce는 map과 filter를 비롯해 여태까지 설명한 배열 메서드의 동작을 대부분 대신할 수 있습니다.
const arr = [5,7,2,4];
const sum = arr.reduce((a,x) => a += x,0);
//1. 첫 번째 배열 요소 5에서(익명) 함수를 호출합니다. a의 초깃값은 0이고 x의 값은 5입니다. 함수는 a와 x(5)의 합을 반환합니다. 이 값은 다음 단계에서 a의 값이 됩니다.
//2. 두 번째 배열 요소 7에서 함수 를 호출합니다. a의 초깃값은 이전 단계에서 전달한 5이고, x의 값은 7입니다.
//   함수는 a와 x의 함 12를 반환합니다. 이 값은 다음 단계에서 a의 값이 됩니다.
//3. 세 번째 배열 요소 2에서 함수를 호출합니다. 이 단계에서 a는 12이고 x는 2입니다. 함수는 a와 x의 합인 14를 반환합니다.
//4. 네 번째이자 마지막 배열 요소인 4에서 함수를 호출합니다. a는 14이고 x는 4입니다. 함수는 a와 x의 합인 18을 반환하며 이 값은 reduce의 값이고 sum에 할당되는 값입니다.

//예민한 독자라면 a에 값을 할당할 필요도 없다는 것을 눈치챘을 겁니다. 화살표 함수에서 명시 적인 return문이 필요하지 않았던 것 처럼, 함수에서 중요한 건 무엇을 반환하는가 이므로 그냥 a + x를 반환해도 됐을 겁니다. 하지만  reduce를 더 잘 활용하려면 누적값이 어떻게 변하는지 생각하는 습관을 기르는 게 좋스니다.

//더 흥미로운 예제를 보기 전에, 누적값이 undefined로 시작한다면 어떻게 될지 생각해 봅시다. 누적값이 제공되지 않으면 reduce는 첫 번째 배열 요소를 초깃값으로 보고 두 번쨰 요소에서부터 함수를 호출합니다.
//앞 예제에서 초깃값을 생략하고 다시 생각해 봅시다.
const arr = [5,7,2,4];
const sum = arr.reduce((a,x) => a += x,0);
//1. 두번째 배열 요소 7에서 함수가 호출됩니다. a의 초깃값은 첫 번쨰 배열 요소인 5이고 x의 값은 7입니다. 함수는 a와 x의 합인 12를 반환하고 이 값이 다음 단계에서 a의 값입니다.
//2. 세 번째 배열 요소 2에서 함수를 호출합니다. a의 초깃값은 12이고 x의 값은 2 입니다. 함수는 a와 x의 합인 14를 반환합니다.
//3. 네 번째이자 마지막 배열 요소인 4에서 함수를 호출합니다. a는 14이고 x는 4입니다. 함수는 a와 x의 합인 18을 반환하며 이 값은 reduce의 앖이고 sum에 할당되는 값입니다

//단계는 하나 줄었지만 결과는 같습니다. 이 예제를 포함해, 배열의 첫 번쨰 요소가 그대로 초깃 값이 될 수 있을 때는 초깃값을 생략해도 됩니다.


//8.6 삭제되거나 정의되지 않은 요소들
//Array 메서드는 삭제되거나 정의되지 않은 요소들을 다룰 때 좀 당혹스럽게 동작하곤 합니다.
//map과 filter, reduce는 삭제되거나 정의되지 않은 요소들에서 콜백 함수를 호출하지 않습니다. 예를 들어 ES5에서 배열을 초기화할 때 다음과 같은 방법을 시도해 보고 실망했던 독자도 있을 겁니다.
const arr = Array(10).map(function(x) {
    return 5
});

//arr의 요소는 전부 undefined입니다. 이와 비슷하게, 배열 중간의 요소를 삭제하고 map을 호출하면 배열 가운데 '구멍'이 생깁니다.
const arr = [1,2,3,4,5];
delete arr[2];
arr.map(x => 0);        //[0,0,undefined, 0,0]

//8.7 문자열 병합
const arr = [1,null,"hello","world",true,undefined];
delete arr[3];
arr.join();     //"1,,hello,,true,"
arr.join('');   //"1hellotrue"
arr.join(' -- ');   //"1 -- -- hello -- -- true --"

