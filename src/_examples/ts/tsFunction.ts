

{
  // Function type - variant 1
  type UserGenerator = (username: string, email?: string) => string;
  const userGenerator: UserGenerator = (username: string, email?: string) => ''
  {
    const userGenerator: UserGenerator = function(username: string, email?: string) { return '' }
  }
}
{
  // Function type overloading - variant 1
  type UserGenerator = {
    (username: string): string;
    (username: string, email: string): string;
  };
  const userGenerator: UserGenerator = (username: string, email?: string) => ''
  {
    const userGenerator: UserGenerator = function(username: string, email?: string) { return '' }
  }
}


{
  // Function type - variant 2
  // Can't use arrow function syntax
  function userGenerator(username: string, email?: string): string
  function userGenerator(username: string, email?: string) { return '' }
}
{
  // Function type overloading - variant 2
  // Can't use arrow function syntax
  function userGenerator(username: string): string
  function userGenerator(username: string, email: string): string
  function userGenerator(username: string, email?: string) { return '' }
}