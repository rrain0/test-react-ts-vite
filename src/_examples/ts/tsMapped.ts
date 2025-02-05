
// MAPPED TYPES

// https://www.typescriptlang.org/docs/handbook/2/mapped-types.html

type StringOrNumberKeys = {
  [Prop: string | number]: any
}

// make any prop of object of type T optional (+? or simply ?) and readable (-readonly)
type Optional<T> = {
  -readonly [Prop in keyof T]+?: T[Prop]
}

// make any prop of object of type T require (-?) and readonly (+readonly or simply readonly)
type RequireReadonly<T> = {
  readonly [Prop in keyof T]-?: T[Prop]
}


// Remap property names via 'as'
// (with template literal type `get${Capitalize<string & Prop>}` and intrinsic type 'Capitalize')
type Getters<T> = {
  [Prop in keyof T as `get${Capitalize<string & Prop>}`]: () => T[Prop]
}
interface Person { name: string; age: number; location: string; }
type LazyPerson = Getters<Person>
/*
 LazyPerson is:
 type LazyPerson = {
   getName: () => string;
   getAge: () => number;
   getLocation: () => string;
 }
 */



// Filter keys
// Field 'kind' will be excluded because never is produced
type Exclude<T,U> = T extends U ? never : T // conditional type
// 'as' - saves original string name to make T[Prop]
type RemoveKindField<T> = {
  [Prop in keyof T as Exclude<Prop, 'kind'>]: T[Prop]
}


// add suffixes to all properties of object
type Suffix<O extends object, Suff extends string> =
  { [Prop in keyof O as Prop extends string ? `${Prop}${Suff}` : never]: O[Prop] }


interface Circle {
  kind: "circle";
  radius: number;
}
type KindlessCircle = RemoveKindField<Circle>;
/*
 KindlessCircle is:
 type KindlessCircle = {
   radius: number;
 }
 */



// You can map over arbitrary unions, not just unions of string | number | symbol, but unions of any type:
type EventConfig<Events extends { kind: string }> = {
  [E in Events as E["kind"]]: (event: E) => void;
}

type SquareEvent = { kind: "square", x: number, y: number };
type CircleEvent = { kind: "circle", radius: number };
type Config = EventConfig<SquareEvent | CircleEvent>
/*
 Config is:
   type Config = {
   square: (event: SquareEvent) => void;
   circle: (event: CircleEvent) => void;
 }
 */



// Conditional value type
type ExtractPII<Type> = {
  [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false;
};

type DBFields = {
  id: { format: "incrementing" };
  name: { type: string; pii: true };
};
type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;
/*
 ObjectsNeedingGDPRDeletion is:
 type ObjectsNeedingGDPRDeletion = {
   id: false;
   name: true;
 }
 */




