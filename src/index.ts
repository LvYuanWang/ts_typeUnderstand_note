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