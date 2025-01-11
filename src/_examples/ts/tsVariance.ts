




/*
 Type variance:
 ● <T> - no explicit variance - auto detection of variance
 ● <in T> - covariance - set T - T is input parameter.
    Parameter only for read from it (in = input parameter).
    You can use T or its parents (super-T).
 ● <out T> - contravariance - get T - T is output parameter.
    Parameter only for write into it (out = output parameter).
    You can use T or its children (sub-T).
 ● <in out T> - invariance - parameter for read & write
    You can use only T (not parents or children of type T).
    You shouldn't explicitly specify variance everywhere, it is automatically detected!!!
 */
interface Animal { animalStuff: any }
interface Dog extends Animal { dogStuff: any }

// Getter is covariant on T
type Getter<out T> = () => T // T is output parameter - write into T and out
// Setter is contravariant on T
type Setter<in T> = (value: T) => void // T is input parameter - in and read from T
// GetSet is invariant on T
interface GetSet<in out T> {
  get: () => T
  set: (value: T) => void
}

let getterAnimal: Getter<Animal> = function (this: Animal) { return this }
let getterDog: Getter<Dog> = function (this: Dog) { return this }
let setterAnimal: Setter<Animal> = function (this: Animal, animal: Animal) {  }
let setterDog: Setter<Dog> = function (this: Dog, dog: Dog) {  }

const ga: Getter<Animal> = getterDog
//const gd: Getter<Dog> = getterAnimal // error
//const sa: Setter<Animal> = setterDog // error
const sd: Setter<Dog> = setterAnimal

const state: { internalDog: Dog } & GetSet<Dog> = {
  internalDog: { animalStuff: 'as', dogStuff: 'ds' },
  get: () => ({ animalStuff: 'bbb', dogStuff: 'aaa' }),
  set(v) { this.internalDog = v },
}
const dog = state.get()


{
  // Circular dependencies (recursive types) need variance
  type Foo<in out T> = {
    x: T
    f: Bar<T>
  }
  
  type Bar<U> = (x: Baz<U[]>) => void
  
  type Baz<V> = {
    value: Foo<V[]>
  }
  
  let foo1: Foo<unknown> = {} as any
  let foo2: Foo<string> = {} as any
  
  //foo1 = foo2 // error // Without explicit variance error isn't detected ❌
  //foo2 = foo1 // error
}
