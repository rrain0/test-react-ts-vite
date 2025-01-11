

// https://www.typescriptlang.org/docs/handbook/2/conditional-types.html

interface Animal { live(): void }
interface Dog extends Animal { woof(): void }

type Example1 = Dog extends Animal ? number : string;
// Example1 is: type Example1 = number
type Example2 = RegExp extends Animal ? number : string;
// Example2 is: type Example2 = string



interface IdLabel { id: number /* some fields */ }
interface NameLabel { name: string /* other fields */ }

// function overload
// объявления перегруженной функции
function createLabel(id: number): IdLabel
function createLabel(name: string): NameLabel
// сама функция: параметры могут быть any или ...args: any[]
function createLabel(nameOrId: any): IdLabel | NameLabel { throw "unimplemented" }
{
  const n = createLabel(777)
  const s = createLabel('string')
}

// объявления можно сократить до:
type NameOrId<T extends number | string> = T extends number ? IdLabel : NameLabel;
function createLabel2<T extends string | number>(nameOrId: T): NameOrId<T> { throw "unimplemented";}


// function type
type UserGenerator0 = (username: string, email?: string) => string;
// function type overloading
type UserGenerator1 = {
  (username: string): string;
  (username: string, email?: string): string;
};




// Infer type from context
// если Type это массив, то Item становится типом элементов этого массива
type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;
// Получить тип возвращаемого значения функции (если Fun это функция)
type GetReturnType<Fun> = Fun extends (...args: never[]) => infer Return ? Return : never

type Num = GetReturnType<() => number>; // number
type Str = GetReturnType<(x: string) => string>; // string
type Bools = GetReturnType<(a: boolean, b: boolean) => boolean[]>; // boolean[]

// when typeof overloading function, it gets LAST overload declaration
type T1 = ReturnType<typeof createLabel> // IdLabel | NameLabel



// Distributive Conditional Types
type ToArray<Type> = Type extends any ? Type[] : never;
type StrArrOrNumArr = ToArray<string | number>; // string[] | number[]

type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;
type StrArrOrNumArrNotDist = ToArrayNonDist<string | number>; // type StrArrOrNumArr = (string | number)[]




{
  // ts4.7 extends Constraints on infer Type Variables
  
  // Вернуть тип строки первого элемента, если это строка, иначе never:
  {
    type FirstIfString<T> = T extends [infer S, ...unknown[]]
      ? S extends string ? S : never
      : never
  }
  {
    type FirstIfString<T> = T extends [string, ...unknown[]]
      ? T[0]
      : never
  }
  {
    type FirstIfString<T> = T extends [infer S extends string, ...unknown[]]
      ? S
      : never
    
    type A = FirstIfString<[string, number, number]> // A is string
    type B = FirstIfString<['hello', number, number]> // B is 'hello'
    type C = FirstIfString<['hello' | 'world', boolean]> // C is 'hello' | 'world'
    type D = FirstIfString<[boolean, string, string]> // D is never
    type E = FirstIfString<[number | string, ...string[]]> // E is never
  }
}

