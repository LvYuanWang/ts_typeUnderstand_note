/* 类型拓宽 */
// 类型拓宽: 通过赋值操作，TS会自动推断出变量的类型

let a = 'hello';    // string
let b = 123;    // number
let c = true;   // boolean

const d = "hello";    // "hello"
const e = 123;    // 123
const f = true;   // true

let g: "hello" = "hello";    // "hello"
let h: 123 = 123;    // 123
let i: true = true;   // true

const obj = {
    b: 123
}