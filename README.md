## 细化:类型的控制流分析

Typescript有非常强大的类型推导能力，不单单有之前我们提到的类型拓宽，还可以类型收缩，比如在类型拓宽中，我们就提到了const声明的变量会自动的转变为类型字面量。当然这仅仅是冰山一角，Typescript甚至可以随着你的代码逻辑，不断地尝试窄收窄，这一能力称之为**类型的控制流分析**（也可以简单的理解为就是类型推导）

> 有些人也把**类型的控制流分析**简称为**类型收缩(收窄)**，但是这种称呼容易和const声明类型的类型收窄引起混淆。
>
> 不过怎么称呼无所谓，在具体的语境中，能理解就行。

```javascript
function parse(value: number | string | boolean | null | undefined) {
  if (typeof value === "number") {
    return value * 2;       // number
  } else if (typeof value === "string") {
    return `hello ${value}`; // string
  } else if (typeof value === "boolean") {
    return !value;            // boolean
  } else {
    return value;             // null | undefined
  }
}
```

> 你可以把整个流程控制想象成一条河流，从上而下流过你的程序，随着代码的分支分出一条条支流，在最后重新合并为一条完整的河流。
>
> **在类型控制流分析下，每流过一个if分支，后续联合类型的分支就会少一个，因为这个类型已经在这个分支处理过了，不会进入下一个分支**

## `typeof`:类型查询

上面的代码中，我们使用了在JavaScript很常用的一个操作符`typeof`，在JavaScript中，我们常常用`typeof`来检查变量类型，通常会返回`"string"`/`"number"`/`"boolean"`/`"function"`/`"object"`等值。

在Typescript中给`typeof`操作符还赋予了新的功能：**类型查询（Type Query Operator）**

简单来说，可以通过`typeof`获取自动推导的类型，给`typeof`一个值，就可以帮你推导出这个值的类型

```javascript
let temp1 = "hello1";
const temp2 = "hello2";
const temp3 = null;
const temp4 = (a: string) => a.toUpperCase();

type Temp1 = typeof temp1; //string
type Temp2 = typeof temp2; //hello2
type Temp3 = typeof temp3; //null
type Temp4 = typeof temp4; // (a: string) => string
```

对象也是可以的

```javascript
const user = {
  name: 'jack',
  age: 18,
  address: {
    province: '四川',
    city: '成都'
  }
}

type User = typeof user;

const person: User = {
  name: 'jack',
  age: 18,
  address: {
    province: '四川',
    city: '成都'
  }
}
```
