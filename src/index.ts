/* void */

// 显示声明函数是指在函数定义中明确指定了返回类型
function fn1() { }   // void: 显示声明函数没有返回值

// 隐式声明函数，因为它没有指定返回类型。在 TypeScript 中，如果函数没有指定返回类型，它将被隐式声明为 void 类型，表示函数没有返回值
function fn2() {
    return;   // void: 隐式声明函数没有返回值
}

// 当开启了 strictNullChecks: true 的情况下, 其返回值类型为 undefined, 如果没有开启 strict 模式, 或者关闭了 strictNullChecks, 则返回值类型为 any
function fn3(): void {
    return undefined;
}

// 总的来说当 strictNullChecks: false 时这里就不会报错, 因为当它为false时, undefined 和 null 是所有类型的子类型, 也就是说可以将 undefined 和 null 赋值给任意类型
// function fn4(): void {
//     return null;    // 严格模式下会报错
// }

let m1 = fn1();
let m2 = fn2();
let m3 = fn3();

console.log(m1, m2, m3);   // undefined undefined undefined

let v1: void = undefined;
// let v2: void = null;    // 严格模式下会报错