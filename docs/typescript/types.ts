interface FirstType {
  id: number;
  address: string;
}

interface SecondType {
  id: number;
  age: number
}

type a = Exclude<keyof FirstType, keyof SecondType>
type b = Extract<keyof FirstType, keyof SecondType>