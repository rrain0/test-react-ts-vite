

{
  // Function type - variant 1
  type UserGenerator = (username: string, email?: string) => string;
}
{
  // Function type overloading - variant 1
  type UserGenerator = {
    (username: string): string;
    (username: string, email: string): string;
  };
}


{
  // Function type - variant 2
  function userGenerator(username: string, email?: string): string
  function userGenerator(username: string, email?: string) { return '' }
}
{
  // Function type overloading - variant 2
  function userGenerator(username: string): string
  function userGenerator(username: string, email: string): string
  function userGenerator(username: string, email?: string) { return '' }
}