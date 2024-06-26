/* any 与 unknown */

// any: 任何类型(不安全)(任何类型都可以赋值给它, 也可以赋值给任何类型, 属性和方法都可以随便访问)
// let a: any = 666;
// let b: any = ['danger'];

// let foo;    // any

// function func(foo: boolean, bar: string) { }

// console.log(true)

// const fs = require('fs');

// let str: string = "aaa";

// let anyVar: any = null;
// anyVar.foo.bar.fn();    // 运行时报错

// unknown: 未知类型(安全)(不能直接赋值给其他类型, 不能直接访问属性和方法, 但是可以通过类型断言或者类型保护来访问属性和方法, 可以赋值给任何类型)
// let a: unknown = 30;
// let b = a === 123;  // boolean

// let c: any = 30;
// let d: number = c + 10; // number

// let e: unknown = "string";
// e = 123;
// e = true;

// let f: string = e; // 报错
// let f = e + 20; // e 为 unknown 类型，不能直接进行运算

// let f: any = e; // any 类型可以赋值给任何类型

// if (typeof e === 'number') {
//     let g: number = e + 10;
// }

// let anyFn: any;
// let unknownFn: unknown;

// anyFn.foo.bar();
// unknownFn.foo.bar();    // error