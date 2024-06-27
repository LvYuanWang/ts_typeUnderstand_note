/* null 与 undefined */

const temp: undefined = undefined;
const temp2: null = null;

// 只有在 strictNullChecks 为false时，才能将null和undefined赋值给其他类型
// const temp3: string = undefined;
// const temp4: number = null;

// let temp5: string = null;

let temp6 = null;

// function getStr(): string {
//     if (Math.random() > 0.5) {
//         return "hello";
//     }
// }

type User = {
    name: string;
    age: number;
}

// function getUser(): User {
//     if (Math.random() > 0.5) {
//         return {
//             name: "xiaoming",
//             age: 18
//         }
//     }
// }