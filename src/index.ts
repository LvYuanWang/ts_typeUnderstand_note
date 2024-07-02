/* 数组与元组 */

/* 数组 */
let a = [1, 2, 3];
let b = ['a', 'b'];
const c: boolean[] = [true, false];
const d: Array<string> = ['a', 'b'];

let e = [1, "a"];
const f: (number | boolean)[] = [1, true, false];

a.push(4);
// a.push('a'); // error
d.unshift('c');

f.push(3);
// f.push("hello"); // error

let g = [1, "a"];
g.map(item => {
  if (typeof item === 'number') {
    return item * 2;
  }
  return item.toUpperCase();
})

// 配合类型别名组合使用
type User = { name: string, age: number };

const users: Array<User> = [
  { name: 'a', age: 19 },
  { name: 'b', age: 20 }
];

const arr = [];
arr.push(1);
arr.push('a');
arr.push(true);

// 如果 any 类型的数组在函数中有赋值了具体的类型, 那么出了函数作用域之后, 就不会被扩展为 any[] 类型
function fn() {
  const arr = [];
  arr.push(1);
  arr.push(true);
  return arr;
}

const arr2 = fn();  // (number | boolean)[]
// arr2.push('a'); // error


const arr3: readonly number[] = [1, 2, 3];
// arr3.push(4); // error
// arr3[3] = 4; // error
// arr3.splice(0, 2); // error

// 没有改变原来的数组, 但是可以通过赋值给新的变量来改变
const myArr1 = arr3.concat(4);
console.log(myArr1); // [1, 2, 3, 4]

const myArr2 = arr3.filter(item => item > 2);
console.log(myArr2); // [3]

const myArr3 = arr3.slice(0, 2);
console.log(myArr3); // [1, 2]

// 使用并集数组的声明方式
// 可以是number[] 或者 string[], 也可以是 number 和 string 混合的数组
type ArrType1 = (number | string)[];
// 要么是 number[] 要么是 string[], 但不能混合
type ArrType2 = number[] | string[];

const arr1: ArrType1 = ["a", "b", "c"];
// const arr4: ArrType2 = [1, 2, "hello"]; // error
const arr5: ArrType2 = [1, 2, 3];
const arr6: ArrType1 = [1, "hello", 3];


/* 元组 */
const pointer1: number[] = [1, 2, 3, 4, 5];
const pointer2: readonly [number, string, boolean] = [1, "hello", true];

// 具名元组(元组的每一项都有名字)
const pointer3: [x: number, y: number] = [20, 40];
const user: [name: string, age: number, gender: "男" | "女"] = ["Anna", 20, "女"];

// 元组存在的问题
// 虽然不能通过下标添加元素, 但是可以通过 push 方法添加元素, 我们可以将元组设置为只读 readonly元组
// pointer2.push(6);
// pointer2.push('world');