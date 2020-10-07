// Базовые типы TypeScript.
// boolean,
// number,
// string,
// null,
// undefined,
// void,
// any,
// never, // функция, которая никогда не вернёт результат ( возвращает Uncaught Error либо выполняется бесконечно)
// object,
// number[], // объявляет массив чисел
// Array<number>, // объявляет массив чисел
// [ number, string, number ] // объявляет массив, в котором должны быть число, строка, число в таком порядке

// Объявление переменных.

let isComplited: boolean = true; // объявление переменной определённого типа
let input: number | string; // объединение типов, переменная может иметь любой из заданны типов

// Функции.

function getAnswer(): number {
  return 42;
} // объявление типа для результата работы функции

const getTrue = (): boolean => {
  return true;
}; // тоже самое для стрелочной функции

const fn = (o: object | null = {}, s: string): void => {}; // первый аргумент типа объект или null, пустой объект по умолчанию

const fn_1 = (a: number, b?: string) => {}; // второй параметр не обязателен (но если передан, то должен быть string)

let fn_2: (a: string, b: Person) => number; // описание типа функции и её сигнатуры

// Классы

class User {
  public name: string; // модификатор доступа по умолчанию
  private age: number;
  protected nickName: string;
  readonly pass: number;

  constructor(name: string, age: number, nickName: string, pass: number) {
    this.name = name;
    this.age = age;
    this.nickName = nickName;
    this.pass = pass;
  }
  public getFullName(): string {
    return `${this.name} ${this.nickName}`;
  }
}

class UserShort {
  // короткая запись для присвоения значений полей из параметров
  constructor(
    public name: string,
    private age: number,
    protected nickName: string,
    readonly pass: number
  ) {}
}

abstract class Animal {
  // абстрактный класс
  constructor(private color: string, private voice: string) {}
  public abstract getVoice(): string;
}

// Alias

type Person = { name: string; age: number }; // определяет пользовательский тип данных, который можно использовать как обычный

// Enum

enum Dimensions { // является типом данных, можно использовать в описании
  Up, // 0
  Down = 5, // 5
  Left, // 6
  Right, // 7
}
Dimensions.Right; // 7
Dimensions[6]; // "Left"

const enum links {
  github = 'https://www.github.com',
} // в скомпилированном файле сработает как define.
