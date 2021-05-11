// Get Return Type
type returntype = ReturnType<() => number>
type MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

// Omit 从对象中omit
interface Todo {
  title: string
  description: string
  completed: boolean
}
type omit = Omit<Todo, 'completed'>
type MyOmit<T, K> = {
  [P in keyof T as Exclude<P,K>]: T[P]
}

type omit1 = MyOmit<Todo, 'completed'>


// ReadOnly
type todo_ReadOnly = Readonly<todo>
type MyReadOnly<T> = {
  readonly [k in keyof T]: T[k];
}

// Deep ReadOnly
type DeepReadOnly<T> = {
  readonly [k in keyof T]: Readonly<T[k]>;
}