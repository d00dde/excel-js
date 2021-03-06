//########## МЕТОДЫ СТРОК #########################
const str = 'Hello world!';

str.toLowerCase(); // hello world!
str.toUpperCase(); // HELLO WORLD!
'norMalize'[3].toLowerCase(); // normalize

str.indexOf('ll') // 2
str.indexOf('o', 5) // 7
str.indexOf('42', 0) // -1
str.lastIndexOf('o', 0) // 7
if ( ~str.indexOf('42') ) // false

str.includes('ll', 0) // true
str.startsWith("Hel") // true
str.endsWith("orld!") // true

str.slice(start [, end]) // возврашает подстроку от start до end (или до конца строки),
												 // если значения отрицательные, то отсчитывается от конца строки
str.substring(start [, end]) // возврашает подстроку между start и end (или до конца строки),
														 // отрицательные интерпретирует как 0, можно start > end
str.substr(start [, length]) // возврашает подстроку от start длины length (или до конца строки),
														 // если start отрицательный, то отсчитывается от конца строки

str.split(delim [, [limit]) // возвращает массив, разделяя строку по delim, но не более limit

str.replace(regexp|substr, newSubStr|function) //Заменяет вхождения substr на newSubStr (или результат работы function)

string.charAt(0) // возвращает символ соответствующей позиции
"z".codePointAt(0) // 122
String.fromCodePoint(122) // z

//########## МЕТОДЫ МАССИВОВ #########################

//Добавление и удаление элементов
Array.prototype.push;
Array.prototype.pop; // возвращает удалённый элемент
Array.prototype.shift; // возвращает удалённый элемент
Array.prototype.unshift;

//Вторым aргументом можно передать this arr.map(function(item, index, array), this) не нужно при использовании ()=>
arr.forEach(function(item, index, array){...}) //работает на месте
arr.filter(function(item, index, array){...}) //возвращает новый массив
arr.map(function(item, index, array){...})	//возвращает новый массив
arr.reduce(function(previousValue, item, index, array) {
	return acc
}, [initial]); // возвращает конечное значение. Если initial не передан, то в первой итерации будет второй элемент
							 // а previousValue - первый.
arr.every(callback(item [, index[, array]])[, thisArg]) // true если все вернут true
arr.some(callback(item [, index[, array]])[, thisArg]) // true если хоть один вернёт true
//Изменить, получить часть, склеить
arr.splice(index[, deleteCount, elem1, ..., elemN]) //начинает с позиции index, удаляет deleteCount элементов и вставляет elem1, ..., elemN на их место.
																										// допускается использование отрицательного индекса. Он позволяет начать отсчёт элементов с конца
																										// Работает на месте. Возвращает массив из удалённых элементов.
arr.slice([start], [end]) // возвращает новый массив, в который копирует элементы, начиная с индекса start и до end (не включая end)
													//start и end могут быть отрицательными, в таком случае отсчёт будет осуществляться с конца массива.

arr.concat(arg1, arg2...) // получаем новый массив, включающий в себя элементы из arr, а также arg1, arg2 и так далее…
													// примитивы добавляются как есть, объекты добавляются преобразованием toString()
													// Но если объект имеет специальное свойство Symbol.isConcatSpreadable, то он
													// обрабатывается concat как массив: вместо него добавляются его числовые свойства.
													// Для корректной обработки в объекте должны быть числовые свойства и length.

//Производят "плоский" поиск по массиву, используют ===
arr.indexOf(item, from) //ищет item, начиная с индекса from, и возвращает индекс, на котором был найден искомый элемент, в противном случае -1.
arr.lastIndexOf(item, from) // – то же самое, но ищет справа налево.
arr.includes(item, from) // – ищет item, начиная с индекса from, и возвращает true, если поиск успешен


//Для глубокого поиска
let result = arr.find(function(item, index, array) {
  // если true - возвращается текущий элемент и перебор прерывается
  // если все итерации оказались ложными, возвращается undefined
});
let result = arr.findIndex(function(item, index, array) {
  // если true - возвращается индекс элемента и перебор прерывается
  // если все итерации оказались ложными, возвращается -1
});

//Сортировка
arr.sort((a, b) => { // При отсутствии функции сортирует как СТРОКИ
	// if (a > b) return 1; // если первое значение больше второго
  // if (a == b) return 0; // если равны
  // if (a < b) return -1; // если первое значение меньше второго
});

//Склейка в строку
arr.join(glue) // создаёт строку из элементов arr, вставляя glue между ними

//Проверка, является ли массивом
Array.isArray(value) // возвращает true, если value массив, и false, если нет.

Array.from(arrayLike[, mapFn[, thisArg]]) //создаёт массив из массивоподобных и итерируемых объектов
// опционально принимает map-функцию и значение this для неё.

//########## ПЕРЕБИРАЕМЫЕ ОБЪЕКТЫ #########################

//Перебирают только итерируемые свойства
for..of: for ( const value of iterable){...} //передаёт значения на каждой итерации
for..in: for ( const key in iterable){...} //передаёт ключи на каждой итерации
//Работают для объектов, у которых есть поле Symbol.iterator
//Когда цикл for..of запускается, он вызывает этот метод один раз (или выдаёт ошибку, если метод не найден).
//Этот метод должен вернуть итератор – объект с методом next. Дальше for..of работает только с этим
//возвращённым объектом. Когда for..of хочет получить следующее значение, он вызывает метод next() этого объекта.
//Результат вызова next() должен иметь вид {done: Boolean, value: any}, где done=true означает,
// что итерация закончена, в противном случае value содержит очередное значение.

//Изначально перебираемые объекты: массивы, строки,

//########## МЕТОДЫ ОБЪЕКТОВ #########################

// Преобразование объектов в примитивы
  // методы должны возвращать примитив любого типа, но примитив
obj[Symbol.toPrimitive] = function(hint) {
  // должен вернуть примитивное значение
  // hint равно чему-то одному из: "string", "number" или "default"
};
//Если нет метода Symbol.toPrimitive, движок JavaScript пытается найти эти методы и вызвать их следующим образом:
	//toString -> valueOf для хинта со значением «string».
	//valueOf -> toString – в ином случае.
obj.toString = () => {
  return `{name: "${this.name}"}`;
},
obj.valueOf = () => {
    return this.money;
}
//обычно достаточно реализовать toString, если не нужно какое-то особенное поведение

delete obj.field; //удаление свойства объекта

"key" in object //вернёт true, если key есть в объекте

//Перебор свойств объекта.

for (key in object) {
  if(object.hasOwnProperty(key)) {
    // тело цикла выполняется для каждого свойства объекта
    // нужно фильтровать свойства из прототипа с помошью hasOwnProperty
  }
}

Object.keys(obj) // возвращает массив ключей.
Object.values(obj) // возвращает массив значений.
Object.entries(obj) // возвращает массив пар [ключ, значение]
Object.fromEntries(array) // возвращает объект, сформированный из массива пар [ключ, значение]



Object.assign(dest, [src1, src2, src3...]) //добавляет свойства src1, src2 ... в dest. Возвращает dest. Плоское копирование (объекты внутри объекта копируются по ссылке)

const copy = JSON.parse(JSON.stringify(obj)) // глубокое копирование объекта

Object.freeze(obj) // "замораживает" объект, не позволяя изменять его свойства. Попытак изменения НЕ ВЫЗОВЕТ ОШИБКУ.
Object.seal(obj)   // не позволяет добавлять объекту новые свойства.

Object.is(obj1, obj2) // "плоско" сравнивает объекты, возвращая boolean значение


//TODO: ещё методы объектов

//########## THIS #########################

//есть глобальное свойство globalThis, которое в любом контексте указывает на глобальный объект

//Есть 4 способа вызвать функцию:
//вызов как функции,
//вызов как метода,
//вызов как конструктора,
//вызов при помощи call, apply, bind
//вызов как обработчик события DOM-элемента ( button.onclick = function () {...} )

//При вызове как функции this равен глобальному объекту (в "use strict" undefined)
//и не важно, где объявлена или вызвана функция, такой вызов называют вызовом без контекста.

//При вызове как метода ( obj.prop.fn(); this === obj.prop ) this указывает на близжайшего владельца
// при этом не важно, если функция была объявлена в другом месте, а потом присвоена значению ссылка на неё.
// Можно потерять контекст, если ПЕРЕДАТЬ МЕТОД, а потом ВЫЗВАТЬ его. Тогда связь с родительским объектом
// потреяется (при setTimeout или другом колбэке). Можно либо передать объект, а потом вызвать его метод
// в момент срабатывания, или привязать контекст с помощью bind.
//В цепочке прототипов this сохраняется, т.е. метод, найденный в прототипе, в качестве this получит исходный объект.

//При вызове как конструктора создаётся новый объект, ему в качестве прототипа присваивается prototype функции,
// этот объект является this внутри конструктора и возвращается по умолчанию. Можно явно вернуть
// любой другой объектб но при попытке вернуть не объект будет возвращён this

//При вызове при помощи call, apply, bind this передаётся явно. При попытке передать
//в качестве  this не object будет неявно преобразовано в объект с помощью
//внутреннего метода ToObject, что идентично new String, Number и т.п.

//При назначении функции обработчиком события DOM-элемента this будет указывать на этот элемент.

//Стрелочная функция ВСЕГДА имеет контекст из внешнего окружаения МЕСТА СОЗДАНИЯ (не поможет даже bind и т.п.)

function bind (fn, context, ...args) {
	return function (...moreArgs) {
		fn.call(context, ...args, ...moreArgs)
	}
}

function call () {

}

function bind () {

}

function apply () {

}


//########## GETTER & SETTER #########################
let obj = {
  get propName() {
    // геттер, срабатывает при чтении obj.propName
  },

  set propName(value) {
    // сеттер, срабатывает при записи obj.propName = value
  }
};

Object.defineProperty(user, 'fullName', {
  get() {
    return `${this.name} ${this.surname}`;
  },

  set(value) {
    [this.name, this.surname] = value.split(" ");
	}
}

//########## CLASSES #########################


//########## MAP, SET, WEEKMAP, WEEKSET #########################
