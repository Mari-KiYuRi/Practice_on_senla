// примеры методов массивов
let arr=['second', 'third'];

arr.push('fourth'); // добавляет элемент в конец массива
console.log(arr);

arr.unshift('first'); // добавляет элемент в начало массива
console.log(arr);

let lastElem = arr.pop() // удаляет элемент из конца запоминая его 
console.log(arr);
console.log(lastElem);

let firstElem = arr.shift() // удаляет элемент из начала запоминая его 
console.log(arr);
console.log(firstElem);

// удаляет указанное количество элементов начиная с указанного индекса и
// добавляет вместо них новые элементы
arr.splice(1, 1, '3', '4', '5'); 
console.log(arr);

// возвращает новый массив из указаных элементов другого массива
console.log(arr.slice([1], [3]));


// примеры методов функций
function user(name) {
    return ('Welcome ' + name + '!');
}
console.log(user.call(null, 'Mari')); // вызов с указанием контекста и переменной
console.log(user.apply(null, ['Alex'])); // вызов с массивом аргументов
// создание новой функции с привязанным контекстом, т.е. такую функцию можно вызвать позже
const user2 = user.bind(null, 'Sergey');
console.log(user2()); 


// примеры методов объектов
let I = { 
    name: "Mari",
    surname: "Makarenko"
};

const keys = Object.keys(I); // записывает все ключи объекта в один массив
console.log(keys);

const values = Object.values(I); // записывает все значения объекта в один массив
console.log(values);

const entries = Object.entries(I); // создает массив все пар (ключ и значение) объекта
console.log(entries);

const I2 = Object.assign({age: 20}, I);// копирование или объединение объектов
console.log(I2);

// примеры методов коллекций
let seT = new Set([8, 9, 5, 3, 1, 2, 4]); // коллекция уникальных значений
let maP = new Map([['name', 'Mari'], ['surname', 'Makerenko']]); // коллекция ключ-значение

seT.add(6); // добавление уникального значения
console.log(seT);

maP.set('age', 20); // добавление ключ-значения в коллекцию
console.log(maP.get('surname')); // получение значения по ключу
console.log(maP.has('age')); // проверка на наличие указанного ключа
console.log(maP.size); // получение размера коллекции
// перебор каждой пары в коллекции
maP.forEach((value, key) => {
    console.log(`${key} : ${value}`);
});

// Отличие стрелочных функций и обычных (function)
// У стрелочной функции в отличии от обычной отсутствует контекст
let group = {
    title: 'IUK4',
    students: ['Mari', 'Egor', 'Nastia'],
    // здесь this копируется из внешней функции, т.к. у стрелочных нет своего this
    // если тут вместо стрелочной написать обычную функцию, то она потеряет контекст
    showList() {
        this.students.forEach( 
            student => console.log(this.title + ':' + student)
        );
    },

    // также стрелочные функции в отличии от обычных не имеют объекта arguments
    // поэтому вместо него используем пареметр (...args),
    // благодаря нему будет выводится массив параметров
    f1: function(){ console.log(arguments); },
    f2: ((...args) => { console.log(args); })
};
group.showList();

group.f1(1, 2, 3);
group.f2(4, 5, 6);

// Замыкание это способность функции запоминать лексическое окружение, в котором она была создана
const x = 1;
const logToConsole = function() {
    console.log(x)
}
logToConsole();

// При деструктуризации происходит присваевание массива или объекта сразу нескольким переменным
let [name, surname] = ['Mari', 'Makarenko'];
console.log(name);
console.log(surname);

// операторы spread и rest имеют одно обозначение, т.е. троеточие (...),
// но разные значения

// rest используется, если мы хотим присвоить несколько оставшихся значений одной переменной,
// но не уверены в их количестве
let [first, second, ...third] = [1, 2, 3, 4, 5];
console.log(third);

// spread используется для распаковки
console.log(...third);


// Классы разновидность функции, которая является шаблоном для создания новых объектов, содержащий базовые свойства
class Rectangle {
    constructor(height, width) { // медод описывающий, что при создании может принять наш класс
        this.height = height;
        this.width = width;
    }
    area(){ // методы класса
        return this.height * this.width;
    }
}
const square = new Rectangle(10, 10); // создание экземпляра класса
console.log(`Площадь: ${square.height}*${square.width} = ${square.area()}`);