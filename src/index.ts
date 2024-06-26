/* number 与 bigint */
let a = 123;
let b = Infinity * 0.10;
const c = 567;
let d = a < b;
let e: number = 100;
let f: 26.218 = 26.218;
// let g: 26.218 = 10;   // error 不能将类型“10”分配给类型“26.218”

let a1 = 1234n;
const b1 = BigInt(1234);
const b2 = 1234n;
let d1 = a < a1;
// let e1 = 1234.5n;   // error bigint字面量必须是整数
// let f1: bigint = 1234;  // error 不能将类型number分配给类型bigint
let g1: bigint = 100n;
let h1: 100n = 100n;


/* string */
// perttier eslint 注意单引号和双引号格式规范的问题
let s1 = "hello";
const s2 = "hello";
const s3 = 'hello';
const s4 = `hello`;

let s5: "world" = "world";