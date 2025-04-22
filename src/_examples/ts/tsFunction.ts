

{
  // Variant 1 - Type of function
  // Cannot use generics
  type UserCreator = (username: string, email?: string) => string;
  {  const userCreator: UserCreator = (username: string, email?: string) => ''  }
  {  const userCreator: UserCreator = function(username: string, email?: string) { return '' }  }
}
{
  // Function type overloading - variant 1
  type UserCreator = {
    (username: string): string;
    (username: string, email: string): string;
  };
  {  const userCreator: UserCreator = (username: string, email?: string) => ''  }
  {  const userCreator: UserCreator = function(username: string, email?: string) { return '' }  }
}


{
  // Variant 2 - Function type
  // Can use generics
  // Can't use arrow function syntax
  function userCreator(username: string, email?: string): string
  function userCreator(username: string, email?: string) { return '' }
}
{
  // Function type overloading - variant 2
  // Can't use arrow function syntax
  function userCreator(username: string): string
  function userCreator(username: string, email: string): string
  function userCreator(username: string, email?: string) { return '' }
}
{
  // Смысл что если входной масси может быть undefined, то выходной тоже.
  // Но если входной массив не может быть undefined, То выходной тоже.
  function mapToIf<T, E = T>(arr: T[], mapper: (el: T, i: number, arr: T[]) => E): E[]
  function mapToIf<T, E = T>(
    arr: T[] | undefined, mapper: (el: T, i: number, arr: T[]) => E
  ): E[] | undefined
  function mapToIf<T, E = T>(
    arr: T[] | undefined,
    mapper: (el: T, i: number, arr: T[]) => E
  ): E[] | undefined {
    if (!arr) return undefined
    let changed = false
    let newArr = arr as unknown as E[]
    arr.forEach((el, i) => {
      const newEl = mapper(el, i, arr)
      if (newEl !== el as unknown as E) {
        if (!changed) {
          newArr = [...arr] as unknown as E[]
          changed = true
        }
        newArr[i] = newEl
      }
    })
    return newArr
  }
  
}


// Generator
{
  // Creates generator object with type: Generator<T, TReturn, TNext>
  function* createFromOneToTenGenerator(): Generator<number, 'end' | 'cancel', boolean> {
    let cnt: number = 0
    while (++cnt <= 10) {
      // <TNext = boolean> = yield <T = number>
      const cancel: boolean | undefined = yield cnt
      if (cancel) {
        // return <TReturn = 'end' | 'cancel'>
        return 'cancel' as const
      }
    }
    // return <TReturn = 'end' | 'cancel'>
    return 'end' as const
  }
  // Создали генератор, он пока не запущен вообще
  let generator = createFromOneToTenGenerator()
  // Запустили от начала функции до первого yield
  console.log(generator.next()) // => { value: 1, done: false }
  // Выполнили от первого yield до следующего yield
  console.log(generator.next()) // => { value: 2, done: false }
  console.log(generator.next(true /* TNext */)) // => { value: 'cancel', done: true }
  console.log(generator.next()) // => { value: undefined, done: true }
  console.log(generator.next()) // => { value: undefined, done: true }
  console.log(generator.return('end' /* TReturn */)) // => { value: 'end', done: true }
  console.log(generator.return('cancel'/* TReturn */)) // => { value: 'cancel', done: true }
  
  generator = createFromOneToTenGenerator()
  console.log(generator.next()) // => { value: 1, done: false }
  console.log(generator.return('cancel'/* TReturn */)) // => { value: 'cancel', done: true }
  console.log(generator.next()) // => { value: undefined, done: true }
}