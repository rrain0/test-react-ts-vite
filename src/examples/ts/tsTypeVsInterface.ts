


/*
 Types in TypeScript are more flexible and
 can define primitive, intersection, union, tuple, or different types of data,
 while interfaces are used to describe the shape of an object.
 
 Types use the 'type' keyword for creating a new type,
 while interfaces use the 'interface' keyword for declaring an interface.
 
 Interfaces can use declaration merging, Types can't.
*/



type TPrimitive = 'ok' | 200

// CAN'T define primitive values
// interface IPrimitive { 'ok' | 200 }

// CAN'T extend Type of primitives
// TS2312: An interface can only extend an object type or intersection of object types with statically known members.
//interface IPrimitive extends TPrimitive { }




// CAN define Type
type TPerson = {
  name: string
  surname: string
  get fullName(): string
  age: number
  getInterests(): string[]
  getPreferredFood: (timesOfDay: string) => string[]
}
// CAN define Interface
interface IPerson {
  name: string
  surname: string
  get fullName(): string
  age: number
  getInterests(): string[]
  getPreferredFood: (timesOfDay: string) => string[]
}



// CAN extend Type
type TEmployee = TPerson & {
  getIsWorking(time: Date): boolean
  // CAN define constructor
  new (): object
  // CAN invoke as function
  (): string
}

// CAN extend Interface
interface IEmployee extends IPerson {
  getIsWorking(time: Date): boolean
  new (): object
  (): string
}

// CAN extend Interface
type TEmployee2 = IPerson & {
  getIsWorking(time: Date): boolean
  new (): object
  (): string
}

// CAN extend Type
interface IEmployee2 extends TPerson {
  getIsWorking(time: Date): boolean
  new (): object
  (): string
}


// CAN implement Type
class Person implements TPerson {
  name = ''
  surname = ''
  get fullName() { return '' }
  age = 0
  getInterests() { return [] }
  getPreferredFood = (timesOfDay: string) => []
  
  // CAN add additional property
  get hairColor() { return '' }
}
// CAN implement Interface
class Person2 implements IPerson {
  name = ''
  surname = ''
  get fullName() { return '' }
  age = 0
  getInterests() { return [] }
  getPreferredFood = (timesOfDay: string) => []
  
  // CAN add additional property
  get hairColor() { return '' }
}



// instantiating an object of Type
const personT: TPerson = {
  name: '',
  surname: '',
  get fullName() { return '' },
  age: 0,
  // CAN'T expand the type
  //age: 0 as number | string,
  getInterests() { return [] },
  getPreferredFood: (timesOfDay: string) => [],
  // CAN'T add additional property
  //get hairColor() { return '' },
}
// instantiating an object of Interface
const personI: IPerson = {
  name: '',
  surname: '',
  get fullName() { return '' },
  age: 0,
  // CAN'T expand the type
  //age: 0 as number | string,
  getInterests() { return [] },
  getPreferredFood: (timesOfDay: string) => [],
  // CAN'T add additional property
  //get hairColor() { return '' },
}




type TNumberCarrier = {
  value: number
}
interface INumberCarrier {
  value: number
}


// CAN assign an object with more properties
const numberCarrierT: TNumberCarrier = function(){
  return {
    value: 9,
    prevValue: 10,
  }
}()
// CAN assign an object with more properties
const numberCarrierI: INumberCarrier = function(){
  return {
    value: 9,
    prevValue: 10,
  }
}()



// Declaration merging - ONLY for Interfaces
// CAN use declaration merging
interface IPoint { x: number }
interface IPoint { y: number }
const point: IPoint = { x: 1, y: 2 }

// CAN'T use declaration merging
// TS2300: Duplicate identifier TPoint
//type TPoint = { x: number }
//type TPoint = { y: number }



// Function declaration overloads.
// Maybe this can be treated as Interfaces...
function transformValue(value: number, precision: number): string
function transformValue(value: string): string
function transformValue(...args: any[]) {
  return '0'
}

transformValue(0, 0)
transformValue('0')

