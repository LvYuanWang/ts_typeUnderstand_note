## 方括号运算符`[]`

数组当然需要使用`[]`，在Javascript中我们经常使用`[]`来获取数组的值，或者动态引用获取对象属性的值

```typescript
const arr = ["a", "b", "c", "d", "e"];
console.log(arr[1]); // b

const a = "name";
const obj = {
  id: 1,
  name:'jack'
}
console.log(obj[a]);  // jack
```

在Typescript中，方括号运算符`[]`用于类型计算，取出对象类型的键对应的值的类型，比如`类型[键名]`，简写为`T[K]`会返回`T`类型的属性`K`的类型。

```typescript
type Person = {
  age: number;
  name: string;
  sex: boolean;
};

type Age = Person['age']; // number类型
```

方括号的参数如果是联合类型，那么返回的也是联合类型。

```typescript
type AgeOrName = Person['age'|'name']; // string | number
```

甚至可以获取数组的具体类型，注意下面的写法：

```typescript
const arr = ["a", "b", "c", "d", "e"];
type ArrType = typeof arr[number]; // string
```

因为在Javascript中，数组其实就是`key:value`的键值对，而数组的键也就是下标都是number类型

同样，如果是一个对象字面量类型的数组，一样会得到数组中对象字面量类型：

```typescript
type User = {
  name: string;
  age: number;
};

const users: User[] = [
  { name: "John", age: 25 },
  { name: "Steve", age: 30 },
  { name: "Mike", age: 35 },
];

type ArrType2 = typeof users[number]; // { name: string; age: number;}
```

如果是一个元组，就可以得到元组类型中所有位置上类型的联合类型：

```typescript
const roles: ["Admin", "User", "Guest"] = ["Admin", "User", "Guest"];
type ArrType3 = typeof roles[number]; // "Admin" | "User" | "Guest"
```