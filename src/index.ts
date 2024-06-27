/* 对象字面量 */

// let a: object = {
//     b: "hello"
// }

// console.log(a.b); // 类型“object”上不存在属性“b”

let a: {
    b: string
} = {
    b: "hello"
}

console.log(a.b); // hello

const user: {
    name: string,
    age: number,
    gender?: "男" | "女",
    readonly isVip: boolean
} = {
    name: "jack",
    age: 25,
    isVip: true
}

user.age = 19;
// user.isVip = false; // error: 因为isVip是只读属性
console.log(user); // { name: 'jack', age: 19, isVip: true }