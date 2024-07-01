## 装箱与拆箱类型

在写javascript的时候，如果暂时还不知道要给对象赋值什么属性，我们经常写成下面这个样子

```javascript
let obj = {};
```

在typescript中，`{}`也可以用来表示类型，一般叫做空对象字面量表示

```javascript
let obj:{}
```

可能我们也会这么想，仅仅就只是声明一个对象，后面再给这个对象赋值具体的属性。

但是，`{}`看似不起眼，实际上比之前的object作用范围还要大,object至少规定了需要的是一个对象，而`{}`连基础类型都能复制，`{}`其实和`Object`作用基本一样

```typescript
let obj1: {} = {name: 'John'};
let obj2: {} = 123;
let obj3: {} = "hello";
let obj4: object = {name: 'John'};
let obj5: object = 123; // Error
```

JavaScript 原型链折磨过的同学应该记得，原型链的顶端是 Object 以及 Function，这也就意味着所有的原始类型与对象类型最终都指向 Object，在 TypeScript 中就表现为 Object 包含了所有的类型

```javascript
const temp1: Object = { name: 'jack' };
const temp2: Object = () => {};
const temp3: Object = [];
const temp4: Object = new String("hello");
const temp5: Object = "world";
const temp6: Object = 123;
const temp7: Object = true;
const temp8: Object = Symbol("a");

// 关闭strictNullChecks，下面也成立
const temp9: Object = undefined;
const temp10: Object = null;
const temp11: Object = void 0;

// const tmp1: object = {};
// const tmp2: object = "world"; // error
// const tmp3: object = 123;     // error
```

和 Object 类似的还有 Boolean、Number、String、Symbol，这几个**装箱类型（Boxed Types）** 同样包含了一些超出预期的类型。以 String 为例，它同样包括 undefined、null、void，以及代表的 **拆箱类型（Unboxed Types）** string

```typescript
let str1: string = "Hello World";
let str2: String = "Hello World";

let str3: String = new String("Hello World");
// let str4: string = new String("Hello World"); // Error

str2 = str1;
// str1 = str2; // Error

// 之前的类型字面量一样有这样的父子类型兼容问题
let str5: "Hello World" = "Hello World";
str2 = str5;
// str5 = str2; // Error
```

> **在任何情况下，你都不应该使用这些装箱类型**

下图表示几种对象表示不同的值是否有效：

| 值                    | object | {}   | Object |
| --------------------- | ------ | ---- | ------ |
| `{}`                  | 是     | 是   | 是     |
| `[]`                  | 是     | 是   | 是     |
| `function(){}`        | 是     | 是   | 是     |
| `new String('hello')` | 是     | 是   | 是     |
| `'a'`                 | 否     | 是   | 是     |
| `123`                 | 否     | 是   | 是     |
| `Symbol('a')`         | 否     | 是   | 是     |
| `null`                | 否     | 否   | 否     |
| `undefined`           | 否     | 否   | 否     |
