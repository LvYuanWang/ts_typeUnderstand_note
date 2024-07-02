/* 方括号运算符 */

// 在JavaScript中用于获取数组或者对象的值
// const arr = ["a", "b", "c"];
// console.log(arr[1]);// b

// const a = "name";
// const obj = {
//   name: "Jack",
//   age: 19
// }
// console.log(obj[a]); // Jack

// 在TypeScript中，方括号运算符用于类型计算, 取出对象类型的键对应的值的类型
// 在对象中使用方括号运算符
type Person = {
  id: number;
  name: string;
  age: number;
  sex: "男" | "女";
}

type ObjValueType = Person['sex']; // "男" | "女"


// 在数组中使用方括号运算符
const arr: (string | number)[] = [9, "b", 7, "c"];

type ArrValueType = typeof arr[number]; // string | number


// 在对象数组中使用方括号运算符
type User = {
  name: Person['name'],
  age: number,
  gender: ObjValueType
}

const users: User[] = [
  { name: "Jack", age: 19, gender: "男" },
  { name: "Joker", age: 20, gender: "女" }
]

type ObjType = typeof users[number]; // User


// 在元组中使用方括号运算符
const p: [string, number, boolean] = ["Anna", 19, true];

type TupleType = typeof p[number]; // string | number | boolean


// 字面量类型中使用方括号运算符
const roles1: ["Admin", "User", "Guest"] = ["Admin", "User", "Guest"];

type LiterallyType = typeof roles1[number]; // "Admin" | "User" | "Guest"


// as const: 用于将数组或者对象的值转换为只读类型
const roles2 = ["Admin", "User", "Guest"];
type Role = typeof roles2[number]; // string

const roles3 = ["角色列表", "用户列表", "用户查询", "权限详情", "管理员列表"] as const;
type RoleType = typeof roles3[number]; // "角色列表" | "用户列表" | "用户查询" | "权限详情" | "管理员列表"