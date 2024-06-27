## null与undefined

在JavaScript中，`null`与`undefined`都表示缺少什么，Typescript也支持这两个值，并且都有各自的类型，类型名称就是null与undefined。

这两个类型比较特殊，在TS中，`undefined`类型只有`undefined`一个值，`null`类型也只有`null`一个值。

我们在写JavaScript的时候，这两个在语义上有细微的差别，`undefined`一般表示尚未定义，而`null`表示缺少值。

`null`与`undefined`在**没有开启`strictNullChecks`检查的情况下**（tsconfig.json中设置了`strict:true`默认开始，如果想关闭，可以设置`strictNullChecks:false`），**会被视为其他类型的子类型**，比如string类型会被认为包含了`null`与`undefined`

> `null`与`undefined`也是单独的类型是带有Javascript思维，在遇到复杂结构的时候经常会思考遗漏的问题。最重要的就是忽略类型兼容性的问题。

```typescript
const temp1:undefined = undefined;
const temp2: null = null;

const temp3: string = null; // 仅在关闭了strictNullChecks时才成立
const temp4: string = undefined; // 仅在关闭了strictNullChecks时才成立

let temp5 = undefined; // any
let temp6:string = null; // 仅在关闭了strictNullChecks时才成立

// 仅在关闭了strictNullChecks时才成立
function getStr(): string { 
  if(Math.random() > 0.5) {
    return null
  }
  return "hello";
}

type User = {
  name: string;
  age: number;
};

function getUser(): User {
  if (Math.random() > 0.5) { 
    return null;
  }
  return {
    name: "John",
    age: 30,
  }
}
```
