/* 自定义守卫 */

// 当需要收窄一个联合类型或者对这个联合类型进行控制流分析时, 可以使用if语句中的typeof或instanceof来创建自定义守卫
// function foo(input: string | number) {
//     if (typeof input === 'string') {
//         console.log(input);
//     } else {
//         console.log(input);
//     }
// }

// 虽然上面的方法可以很好的处理string和number类型, 但是当联合类型中包含多个类型时, 这种方法就不太适用了, 所以可以使用函数来创建自定义守卫
// function isString(input: any) {
//     return typeof input === 'string';
// }

// function isNumber(input: any) {
//     return typeof input === 'number';
// }

// function foo(input: string | number) {
//     // 但是这种方法无效, 在if里面的类型任然是联合类型
//     if (isString(input)) {
//         console.log(input); // input: string | number
//     } else {
//         console.log(input); // input: string | number
//     }
// }

// 我们就可以在函数中使用 is 关键字来创建自定义守卫
function isString(input: any): input is string {
    return typeof input === 'string';
}

function isNumber(input: any): input is number {
    return typeof input === 'number';
}

function foo(input: string | number) {
    if (isString(input)) {
        console.log(input); // input: string
    } else {
        console.log(input); // input: number
    }
}

// 自定义类型守卫在我做一些比较复杂类型判断的时候比较有用
type Box = {
    _v_isBox: boolean,
    value: any
}

function isBox(box: any): box is Box {
    return box && box._v_isBox === true;
}

function unWrapBox(box: Box) {
    return isBox(box) ? box.value : box;
}

let box = {
    _v_isBox: true,
    value: 'hello world'
}

let value = unWrapBox(box);