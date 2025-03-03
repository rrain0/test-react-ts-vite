


// Workaround type
type ObjectUnionOptionalPropsFix<O1 extends object, O2 extends object> =
  | O1 & {
  [OptKeys in keyof Omit<O2, keyof O1>]: undefined
}
  | O2 & {
  [OptKeys in keyof Omit<O1, keyof O2>]: undefined
}



type Type = {
  type: 'type1' | 'type2'
}
type Category = {
  category: 'category1' | 'category2'
}
type TypeOrCategory = Type | Category



// React component
const RenderTypeOrCategory = (props: TypeOrCategory) => {
  // Without workaround❌: TS2339: Property type does not exist on type TypeOrCategory
  // Without workaround❌: TS2339: Property category does not exist on type TypeOrCategory
  // With workaround✅: type: 'type1' | 'type2' | undefined
  // With workaround✅: category: 'category1' | 'category2' | undefined
  const { type, category } = props as ObjectUnionOptionalPropsFix<Type, Category>
  
  
  if (type) return <>
    {/* Render type via type-consuming component */}
    {/* Correct✅: type: 'type1' | 'type2' */}
    {type}
  </>
  return <>
    {/* Render category via category-consuming component */}
    {/* Correct✅: category: 'category1' | 'category2' */}
    {category}
  </>
}




// https://github.com/microsoft/TypeScript/issues/36194#issuecomment-2693148868
interface SomeOptions {
  foo: boolean;
}

interface OtherOptions {
  bar: boolean;
  baz?: number;
}

function doSomething(options: ObjectUnionOptionalPropsFix<SomeOptions, OtherOptions>) {
  // Correct✅: options.baz?: number | undefined
  const baz1 = options.baz ?? 1;
}




// https://stackoverflow.com/a/79480114/14168271
type Obj1 = {
  message: string
}

type Obj2 = {
  text: string
}

const getText = (obj: ObjectUnionOptionalPropsFix<Obj1, Obj2>): string => {
  // Correct✅: obj.message: string | undefined
  // Compare with undefined to include obj.message === '' in this if branch
  if (obj.message !== undefined) {
    // Correct✅: obj.message: string
    return obj.message
  }
  
  // Correct✅: obj.text: string
  return obj.text
}






