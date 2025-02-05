

{
  // Function type - variant 1
  type UserCreator = (username: string, email?: string) => string;
  const userCreator: UserCreator = (username: string, email?: string) => ''
  {
    const userCreator: UserCreator = function(username: string, email?: string) { return '' }
  }
}
{
  // Function type overloading - variant 1
  type UserCreator = {
    (username: string): string;
    (username: string, email: string): string;
  };
  const userCreator: UserCreator = (username: string, email?: string) => ''
  {
    const userCreator: UserCreator = function(username: string, email?: string) { return '' }
  }
}


{
  // Function type - variant 2
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
  
  let generator = createFromOneToTenGenerator()
  console.log(generator.next()) // => { value: 1, done: false }
  console.log(generator.next()) // => { value: 2, done: false }
  console.log(generator.next(true)) // => { value: 'cancel', done: true }
  console.log(generator.next()) // => { value: undefined, done: true }
  console.log(generator.next()) // => { value: undefined, done: true }
  console.log(generator.return('end')) // => { value: 'end', done: true }
  console.log(generator.return('cancel')) // => { value: 'cancel', done: true }
  
  generator = createFromOneToTenGenerator()
  console.log(generator.next()) // => { value: 1, done: false }
  console.log(generator.return('cancel')) // => { value: 'cancel', done: true }
  console.log(generator.next()) // => { value: undefined, done: true }
}