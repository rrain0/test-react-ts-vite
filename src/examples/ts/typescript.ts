



function typeNoInfer(){
  {
    const createStreetLight = <C extends string>(colors: C[], defaultColor?: C)=>{}
    // C is "red" | "yellow" | "green" | "blue"
    createStreetLight(["red", "yellow", "green"], "blue")
  }
  {
    const createStreetLight = <C extends string>(colors: C[], defaultColor?: NoInfer<C>)=>{}
    // C is 'red' | 'yellow' | 'green' | undefined
    createStreetLight(
      ["red", "yellow", "green"],
      //"blue" // ERROR "blue" is not added to type C because of NoInfer
    )
  }
}