// 使用两个in
type RequiredKey = 'a' | 'b'
type OptionalKey = 'c'

// 不允许
// type R = {
//   [p in RequiredKey]: string;
//   [p in OptionalKey]?: string;
// }

type R = {
  [p in RequiredKey]: string;
} & {
  [p in OptionalKey]?: string;
}