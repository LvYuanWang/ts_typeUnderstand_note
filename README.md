## 枚举

### 为什么使用枚举？

在讲解具体使用枚举之前，首先要理解为什么要使用枚举

其实枚举在其他语言中它都是老朋友了，比如`java`，`c#`。

比如我们现在要定义春夏秋冬，颜色，月份，星期，方向等等有序列或者比较固定离散值（可以被清晰区分并计数的值）的情况，在javascript中，我们会想到用const定义一系列常量，在Typescript我们会想到用字面量的联合类型来处理

```typescript
type Gender = "男" | "女";
type Color = "red" | "blue" | "green";
type Direction = "up" | "down" | "left" | "right";
type Status = "success" | "error" | "warning";
type Weekday = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" ;

function fn1(color: Color) { 
  switch (color) { 
    case "red":
      console.log(color);
      // todo...
      break;
    case "blue":
      console.log(color);
      // todo...
      break;
    case "green":
      console.log(color);
      // todo...
      break;
  }
}
```

但是这么写，其实也会遇到`java`，`c#`语言在处理上的一些问题，也就是**逻辑含义和真实的值产生了混淆，会导致当修改真实值的时候，产生大量的修改**

简单来说，就是上面的`"red" | "blue" | "green"`颜色如果想要修改为其他的颜色，比如中文的`"红"|"蓝"|"绿"`，不单单声明要改，整个判断也需要修改。所以无论是像`java`，`c#`这样的类型语言，或者是像Typescript才有了枚举这样的类型。

Typescript声明枚举非常简单

```typescript
enum Color {
  Red,
  Blue,
  Green
}

function fn2(color: Color) { 
  switch (color) { 
    case Color.Red:
      console.log(color);
      break;
    case Color.Blue:
      console.log(color);
      break;
    case Color.Green:
      console.log(color);
      break;
  }
}
fn2(Color.Red);
```

> 按约定，枚举名称最好为首字母大写的单数形式。枚举中的键也为首字母大写

Typescript枚举大体分为两种：字符串到字符串之间的映射，字符串到数字之间的映射。

Typescript可以自动为枚举中的各个成员推导对应的数字。默认从0开始，依次往下，你也可以自己手动设置

```typescript
enum Color {
  Red = 0,
  Blue = 1,
  Green = 2
}
```

甚至如果手动设置一个开头，Typescript会自动的往下为你推导下一个枚举对应的数值

```typescript
enum Color {
  Red = 100,
  Blue, //101
  Green = 100 + 200, //甚至可以得到计算之后的值
  Yellow, //301
}
```

当然也可以定义字符串到字符串的映射

```typescript
enum Color {
  Red = 'red',
  Blue = 'blue',
  Green = '#008000',
  Yellow = '#FFFF00'
}
```

当然，前面为什么说大体分为两种，因为其实还可以数值和字符串混合，这种一般称为**异构枚举**，不过这种就不推荐了

```typescript
enum Color {
  Red = 100,
  Blue = "blue",
  Green = 100 + 200,
  Yellow = "yellow"
}
```



再来一个例子，大家理解一下上面这句话的意思

写一个函数处理参数传递的各种不同的状态，比如`"success","notfound","error"`

```typescript
type StatusType = "success" | "notfound" | "error";

function checkStatus(status: StatusType) { 
  if (status === "success") {
    console.log(status);
    // todo...
  }
  else if (status === "notfound") {
    console.log(status);
    // todo...
  }
  else if (status === "error") {
    console.log(status);
    // todo...
  }
}
```

上面的代码虽然通过类型字面量的联合类型进行了判断，但是某一天要修改类型了，改成中文 `"成功"|"未找到"|"失败"`，或者直接改成数字，`200 | 404 | 500`，那么下面所有的判断都需要改。但是如果一开始就使用的是枚举，事情就简单了。就算要修改，把枚举对应的值，修改了就行了。

```typescript
enum Status { 
  Success = 200,
  NotFound = 404,
  Error = 500
}

function checkStatus(status: Status) { 
  if (status === Status.Success) {
    console.log(status);
    // todo...
  }
  else if (status === Status.NotFound) {
    console.log(status);
    // todo...
  }
  else if (status === Status.Error) {
    console.log(status);
    // todo...
  }
}
```



### 双向映射

枚举和对象的差异还在于，**对象是单向映射的**，我们只能从键映射到键值。而**枚举是双向映射的**，即你可以从枚举成员映射到枚举值，也可以从枚举值映射到枚举成员：

```typescript
enum Direction { 
  Up,
  Down,
  Left,
  Right
}
const upValue = Direction.Up;
console.log(upValue) // 0
const upKey = Direction[0];
console.log(upKey) // Up
```

为什么可以这样，我们看一下编译后的产物就知道了

```javascript
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
const upValue = Direction.Up;
console.log(upValue); // 0
const upKey = Direction[0];
console.log(upKey); // Up
```

`obj[k] = v` 的返回值即是 v，因此这里的 `obj[obj[k] = v] = k` 本质上就是进行了 `obj[k] = v` 与 `obj[v] = k` 这样两次赋值。

但需要注意的是，仅有值为数字的枚举成员才能够进行这样的双向枚举，**字符串枚举成员仍然只会进行单次映射**：

```typescript
enum Direction { 
  Up = 0,
  Down = 1,
  Left = "left",
  Right = "right"
}
```

**编译之后**

```javascript
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction["Left"] = "left";
    Direction["Right"] = "right";
})(Direction || (Direction = {}));
```

> 通过上面的代码，大家有没有发现，**枚举类型相当的特殊，既作为类型，也可以是值**。

### 枚举的一些问题

> 在Javascript中，是没有enum枚举类型的，虽然有相关的[enum提案](https://github.com/rbuckton/proposal-enum)，不过一直没有进展。所以对于枚举来说，实际上是有一些小坑在里面的。

比如，从上面的编译结果可以看出，枚举类型在实际运行环境中编译成了一个**立即执行函数（IIFE）**。如果是普通业务，这不是什么问题。但如果这是一个 ts 写 npm 第三方库，需要提供给别人调用，就会发现因为枚举类型变成了立即执行函数（`IIFE`），无法被 `tree shaking` 优化掉，因为这个 `IIFE` 有副作用。

当然了，一般枚举的内容也不会太多，其实影响有限，但是这确确实实是枚举存在的一个问题，特别是现在特别鼓吹ESM浏览器模块化的今天，这个问题可能会被放大。

还有一个问题是，由于**枚举是双向映射的**，那么，下面的代码注意观察

```typescript
enum Direction { 
  Up = 0,
  Down = 1,
  Left = 2,
  Right = 3
}
console.log(Direction[0]) // Up
console.log(Direction[99]) // 不报错，undefined
```

`Direction[99]`这样的写法，在Typescript中竟然没有报错...或者这样写

```typescript
const n: number = 11;
const dir: Direction = n;
```

这样写，竟然也不会报错，当然这样写是能够理解的，因为我们有时候会使用枚举实现一些更加灵活的场景处理，比如下面的代码

```typescript
enum AttackType {
  // Decimal    // Binary
  None = 0,     // 0000
  Melee = 1,    // 0001
  Fire = 2,     // 0010
  Ice = 4,      // 0100
  Poison = 8,   // 1000
}

// 一个攻击，位运算：属性 近战 | 火 | 毒
const MeleeAndFireAndPoison = AttackType.Melee | AttackType.Fire | AttackType.Poison

const attack = (attack: AttackType) => {console.log(attack)}
// 这里 `MeleeAndFireAndPoison` 可以分配给类型`AttackType`
// 但是不能直接传入字面量类型的数值11
attack(MeleeAndFireAndPoison)
// 直接传入AttackType.Melee，也可以传入枚举对应的0,1,2,4,8
attack(AttackType.Melee)
```

### 常量枚举

如果希望屏蔽不安全的访问操作，可以使用**常量枚举**

```typescript
const enum Direction { 
  Up = 0,
  Down = 1,
  Left = 2,
  Right = 3
}

// console.log(Direction[0]) // error 不能反向查找
console.log(Direction.Up) // 0
```

1. 常量枚举不允许反向查找
2. 常量枚举默认并不会生产任何Javascript代码，而是在用到枚举成员的时候直接插入对应的值

```typescript
console.log(0 /* Direction.Up */); // 0
```

上面的常量枚举代码，编译之后就只有这么一句

### isolatedModules

如果在工程中使用枚举类型，务必要设置tsconfig的属性`isolatedModules:true`，因为有些打包工具并没有依赖Typescript的`tsc`进行类型检查和类型转译，像 `esbuild` 和 `Babel`这样的工具会单独编译每个文件，因此它们无法判断导入的名称是类型还是值。所以有一些Typescript的特性是容易产生错误的，比如`const enum`。这个内容在[vite](https://cn.vitejs.dev/guide/features.html#isolatedmodules)和[esbuild](https://esbuild.github.io/content-types/#isolated-modules)中都有相关的说明