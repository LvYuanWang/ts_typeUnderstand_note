## 数组

数组类型有两种声明方式：

```typescript
类型[]
或者
Array<类型>
```



```typescript
let a = [1, 2, 3];
var b = ["a", "b"];
const c: boolean[] = [true, false];
const d: string[] = ["a", "b"];

let e = [1, "a"];
const f: (number | string)[] = [2, "b"];

a.push(4);
// a.push("a"); //error
d.unshift("c");

f.push(3);
// f.push(true); //error
```

**一般情况下，数组应该保持同质。**

也就是说，不要在同一个数组中存储不同类型的值，存数值的，就是存数值的数组，存字符串的，就是存字符串的数组。设计程序时要规划好，保持数组中的每个元素都具有相同的类型。

虽然这样让数组变得不灵活了，不过这就是类型语言和javascript这种灵活语言的区别。如果不这么做，我们需要做一些额外的工作，让typescript相信我们执行的操作是安全的。

比如上面的`e`或者`f`，如果我们想映射这个数组，把字母变成大写，把数字变成乘以2：

```javascript
let g = [1, "a"];
g.map(item => { 
  if(typeof item === 'number') {
    return item * 2
  }
  return item.toUpperCase();
})
```

为此，必须使用typeof检查每个元素的类型，判断元素是数字还是字符串，然后再做相应的操作

**对象字面量当然也能和数组一起使用**

```typescript
const users: {
  name: string;
  age: number;
}[] = [
  {
    name: "John",
    age: 30,
  },
  {
    name: "Jane",
    age: 25,
  },
];
```

当然写成类型别名或者接口肯定可读性更高一些

```typescript
type User = {
  name: string;
  age: number;
};

const users: Array<User> = [
  {
    name: "John",
    age: 30,
  },
  {
    name: "Jane",
    age: 25,
  },
];
```

**一般情况下，初始化一个空数组，数组的类型为`any`**

> **注意：**如果**启用**了 `strictNullChecks` 配置，同时**禁用**了 `noImplicitAny`，声明一个空数组，那么这个未标明类型的数组会被推导为 `never[]` 类型

```javascript
const arr = []; // any[]
arr.push(1);
arr.push("a");
```

**注意：**当这样的数组离开定义时所在的作用域后，TypeScript将最终确定一个类型，不再扩展。

在实际工作中，可以很好的利用这一特性

```javascript
function fn() { 
  const arr = []; // any[]
  arr.push(1);
  arr.push("a");
  return arr; // (string | number)[]
}

const myArr = fn();
// myArr.push(true); // error
```

`readonly`修饰符也可以用来修饰数组，用于创建不可变的数组，只读数组和常规数组没有多大差别，只是不能就地更改。如果想创建只读数组，需要显示的注解类型。

```javascript
const arr: readonly number[] = [1, 2, 3];
const myArr1 = arr.concat(4);
console.log(myArr1);

const myArr2 = arr.filter(item => item % 2 === 0);
console.log(myArr2)

const myArr3 = arr.slice(0, 2);
console.log(myArr3);

// arr[3] = 4;  // error 类型“readonly number[]”中的索引签名仅允许读取。
// arr.push(4); // error 类型“readonly number[]”上不存在属性“push”
// arr.splice(0,2) // error 属性splice在类型readonly number[]上不存在，你是否指的是slice
```

在只读数组中，只能使用非变型方法，例如`concat`和`slice`，不能使用可变形方法，比如`push`和`splice`

> **注意：**只读数组不可变的特性能让代码更易于理解，不过其背后提供支持的任然是常规的Javascript数组。这就意味着，即便只是对数组做很小的改动，也要复制整个原数组。
>
> 对于小型数组来说，没什么影响，但是对于大型数组，可能会造成极大的影响。
>
> 如果打算大量使用不可变的数组，建议使用[immutable](https://www.npmjs.com/package/immutable)包

**使用并集数组的细节**

使用并集数组类型，我们一般有两种的声明方式，两种方式大体上一样，但是有一些细节上的区别

```typescript
// 可以是number数组，可以是string，也可以是number和string类型混合的数组
type ArrType1 = (number | string)[]; 
// 要么是number类型，要么是string类型
type ArrType2 = number[] | string[];

const arr1: ArrType1 = ["a", "b", "c"];
const arr2: ArrType2 = [1, 2, 3];
// const arr3: ArrType2 = [1, "a", 3]; // error
const arr4: ArrType1 = [1, "a", 3];
```



## 元组

**元祖类型是数组的子类型**，是定义数组的一种特殊方式。

长度固定，各索引位置上的值具有固定的已知类型。在某些固定的场合，使用元祖类型更加方便，严谨性也更好

**声明元组必须显式注解类型**，因为声明元组与数组的声明相同，都是使用方括号`[]`，因此默认推导出来的都是数组类型

比如，在Javascript中，我们经常使用数组来表示一个坐标点。这种做法在TS中也没有任何问题，但是如果我们使用元祖类型，那么无论是提示还是代码严谨性，就更加的好

```typescript
const pointer1: number[] = [10, 20];
const pointer2: [number, number] = [20, 30];
```

在typescript4.0中，甚至加入了`具名元祖`，让元祖类型的可读性更高

```typescript
const pointer3: [x:number, y:number] = [20, 30];
const user:[name:string, age:number, gender:"男"|"女"] = ["jack",20,"男"]
```

很明显，元祖结构进一步提升了**数组结构的严谨性**

不过元祖类型还是有一个问题，虽然名义上限定了有几个值，并且如果像下面这样写，会报错

```typescript
pointer3[2] = 40; // error 不能将类型40分配给类型undefined
```

但是却可以使用`push`方法往里面加入新的值

```typescript
pointer3.push(40);
console.log(pointer3)
```

因此，我们可以将元祖类型限制为可读`readonly`元祖

```typescript
const pointer3: readonly [x:number, y:number] = [20, 30];
```

