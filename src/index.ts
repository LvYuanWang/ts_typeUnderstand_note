/* 装箱与拆箱类型 */

let obj1 = {};
let obj2: {} = { name: 'Tom', age: 20 };
let obj3: {} = 123;  // 不会报错: 123是number类型的字面量，number是object的子类型
let obj4: {} = 'hello';

let obj5: object = { name: 'Kane', age: 21 };
let obj6: object = [1, 2, 3];   // 不会报错: 数组是对象的子类型
// let obj7: object = 'hello';  // 报错: 不能将类型“"string"”分配给类型“object”

const temp1: Object = { name: "kevin" };
const temp2: Object = () => { };  // 不会报错: 函数是对象的子类型
const temp3: Object = [];  // 不会报错: 数组是对象的子类型
const temp4: Object = 123; // 不会报错: 数字是对象的子类型
const temp5: Object = 'hello';  // 不会报错: 字符串是对象的子类型
const temp6: Object = true;  // 不会报错: 布尔值是对象的子类型
const temp7: Object = Symbol("a"); // 不会报错: Symbol是对象的子类型
const temp8: Object = 123n;  // 不会报错: BigInt是对象的子类型
const temp9: Object = new String("hello");  // 不会报错: String是对象的子类型

// 关闭structNullChecks, 下面也成立
const temp10: Object = undefined;
const temp11: Object = null;
const temp12: Object = void 0;

let str1: string = 'hello';
let str2: String = 'hello';
let str3: String = new String('hello');
// let str4: string = new String('hello');  // Error: 不能将类型“String”分配给类型“string”

str2 = str1;    // 不会报错: string是String的子类型
// str1 = str2;   // Error: 不能将类型“String”分配给类型“string”

// 类型字面量 一样也会有这样的兼容性
let str4: 'hello' = 'hello';
str2 = str4;    // 不会报错: 'hello'是String的子类型
str1 = str4;    // 不会报错: 'hello'是string的子类型

// str4 = str1;    // Error: 不能将类型“string”分配给类型“"hello"”