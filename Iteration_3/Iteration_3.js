//const объявляются только переменные,
//которые не будут меняться в течение всего кода 
const DAY_BEGINS_INTERNSHIP = '09.02.2026';

//let для всех других переменных, у неё блочная видимость так же как у const, 
//т.е. такая переменная видна только после её инициализации и 
//только внутри финкции или циклов, в которых она объявлена
let message = 'The internship began on ' + DAY_BEGINS_INTERNSHIP;
console.log(message);

//var - устаревший тип переменных, похож на let, но можно использовать
//не только в пределах функции или цикла, в котором она объявлена
//+условный оператор
if (new Date().getDate() > DAY_BEGINS_INTERNSHIP[0]+DAY_BEGINS_INTERNSHIP[1]){
    var difference = new Date().getDate()-(DAY_BEGINS_INTERNSHIP[0]+DAY_BEGINS_INTERNSHIP[1]);
} else {
    var difference = null;
}
console.log("The training has already started! It's already been " + difference + " day.");

//примитивные типы данных, т.е. те что хранятся по значению
let number = 123;
let bigint = 314159265358979323846n ;
let string = "str";
let boolean = true;
let primNull = null;
let primUndefined = undefined;
let primSymbol = Symbol("id");

console.log("Number:", number, typeof number);
console.log("Bigint:", bigint, typeof bigint);
console.log("String:", string, typeof string);
console.log("Boolean:", boolean, typeof boolean);
console.log("Null:", primNull, typeof primNull); // в JS null отображается как object
console.log("Undefined:", primUndefined, typeof primUndefined);
console.log("Symbol:", primSymbol, typeof primSymbol);

//ссылочные типы данных, т.е. переменная содержит не сами данные,
//а ссылку на то место, где лежат данные
let object = { 
    name: "Mari", 
    age: 20 
};
let array = [123, 'link', 456, 7];
function today() {
    return new Date().getDate();
};
let date = new Date();

console.log("Object", object, typeof object);
console.log("Function:", today, typeof today);
//в JS при использовании оператора typeof Array и Date отображаются
//как Object, поэтому используем для проверки оператор instanceof
console.log("Array:", array, array instanceof Array);
console.log("Date:", date, date instanceof Date);

// цикл for
let arr = ['this', 'is', 'an', 'array'];
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}

// цикл while
let count = 0;
while (count < 5) {
    count++;
    console.log('counter: ' + count);
} 

// цикл do ... while
// почти тоже самое что и while, но содержимое цикла выполняется до проверки условия,
//что гарантирует выполнение хотяябы 1 ра
let count2 = 0;
do {
    console.log(arr[count2]);
    count2++;

} while (count2 < arr.length);

//тернарный оператор позволяет получить тот же результат,
//что и условный оператор только более коротким способом
let diff = (new Date().getDate() > DAY_BEGINS_INTERNSHIP[0]+DAY_BEGINS_INTERNSHIP[1]) ? (new Date().getDate()-(DAY_BEGINS_INTERNSHIP[0]+DAY_BEGINS_INTERNSHIP[1])) : null;
console.log("diff: " + diff);
