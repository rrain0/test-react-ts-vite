




interface ClockMethods {
  tick(): void
}


class DigitalClock implements ClockMethods {
  constructor(h: number, m: number) { }
  tick() { console.log("beep beep") }
}
class AnalogClock implements ClockMethods {
  constructor(h: number, m: number) { }
  tick() { console.log("tick tock") }
}



// GET CONSTRUCTOR
{
  type StringMapConstructor = typeof Map<string, string>
}



// DEFINE CONSTRUCTOR
// Class CAN'T implement constructor interface !!!
// Тип / интерфейс, определяющий конструктор для того, кто его реализовывет.
// Любой объект, у которого парметры конструктора такие - подходит под этот интерфейс.
// Нельзя просто реализовать этот интерфейс, т.к. constructor находится в статической составляющей класса,
// а не в экземпляре класса, и он не включён в проверку
// Объект класса потом уже имеет конструктор.
{
  // Constructor definition Variant 1
  type StringMapConstructor = new () => Map<string, string>
  const stringMapConstructor: StringMapConstructor = Map<string, string>
  const stringMap = new stringMapConstructor()
  
  type ClockConstructor = new (hour: number, minute: number) => DigitalClock
  const digitalClockConstructor: ClockConstructor = DigitalClock
  const digitalClock = new digitalClockConstructor(10, 0)
  
  function createClock(constructr: ClockConstructor, hour: number, minute: number): ClockMethods {
    return new constructr(hour, minute)
  }
  const digitalClock2: DigitalClock = createClock(DigitalClock, 6, 43)
  const analogClock2: AnalogClock = createClock(AnalogClock, 6, 43)
}
{
  // Constructor definition Variant 2
  interface StringMapConstructor {
    new (): Map<string, string>
  }
  const stringMapConstructor: StringMapConstructor = Map<string, string>
  const stringMap = new stringMapConstructor()
  
  interface ClockConstructor {
    new (hour: number, minute: number): DigitalClock
  }
  const digitalClockConstructor: ClockConstructor = DigitalClock
  const digitalClock = new digitalClockConstructor(10, 0)
  
  function createClock(constructr: ClockConstructor, hour: number, minute: number): ClockMethods {
    return new constructr(hour, minute)
  }
  const digitalClock2: DigitalClock = createClock(DigitalClock, 6, 43)
  const analogClock2: AnalogClock = createClock(AnalogClock, 6, 43)
}


