/* 交叉(交集)类型   &  */

type Student = { name: string, score: number };
type Teacher = { name: string, age: number, subject: string };

type User = Student & Teacher;

const user: User = {
    name: 'John',
    score: 100,
    age: 30,
    subject: 'Math'
}

// 交叉类型不能使用简单字面量类型和基础类型, 得到的是never类型
type width = number & string; // never: 交叉类型的属性类型不一致，所以是never

type Color = 'red' & 'green' & 'blue';  // never: 交叉类型的属性值不一致，所以是never


type P = { name: string, sex: "男" | "女" };
type T = { name: string, age: number };
type PT = P & T;

const pt: PT = {
    name: 'Kate',
    sex: '男',
    age: 20
}

// 另一种情况, 当交叉对象中出现同一个属性名时, 属性类型则必须一致, 否则得到的是never类型
// type A = { name: string, sex: string };
// type B = { name: number, age: number };
// type AB = A & B;

// const ab: AB = {
//     name: "Anna",   // never: 交叉类型的属性类型不一致，所以是never
//     sex: "男",
//     age: 20
// }

// 交叉类型和联合类型一起使用
type Params = string | number | boolean;
type A = Params & string; // string: 交叉类型的属性类型一致，所以是string

// 使用交叉类型实现继承的效果
type Goods = {
    id: number,
    name: string,
    price: number
}

type Cart = Goods & { count: number }
type Order = Cart & { address: string }

let goods: Goods = {
    id: 1,
    name: 'apple',
    price: 5
}

let cart: Cart = {
    id: 2,
    name: 'banana',
    price: 5,
    count: 3
}

let order: Order = {
    id: 3,
    name: 'orange',
    price: 5,
    count: 2,
    address: 'New York'
}