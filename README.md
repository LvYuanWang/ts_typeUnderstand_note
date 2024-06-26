## boolean与类型字面量

`number`,`boolean`,`string`,`symbol`,`bigint`这些js本身就支持的基础类型使用起来很简单，ts的书写几乎感觉不到和js的差别，而且支持很多种书写的方式，当然中间还隐藏着一些很重要的细节。拿boolean举例来说：

```javascript
let a = true;
var b = false;
const c = true;
let d: boolean = true;
let e: true = true;
let f: false = false;
//let g: true = false; // error 不能将类型false分配给类型true
```

1. **可以让TS推导出值的类型为boolean（a，b）**
2. **可以明确的告诉TS，值的类型为boolean（d）**
3. **可以明确的告诉TS，值为某个具体的boolean值（e，f和g）**
4. **可以让TS推导出(const)值为某个具体的布尔值（c）**

首先我们常见的写法是1-4（行），要么使用TS自己的类型推导，要么我们自己定义好boolean类型，这是我们开始就介绍的方式。但是，5-7（行）的写法是什么意思？

其实写法也很直观，我们大概也能猜到，**变量e和f不是普通的boolean类型，而是值只为true和false的boolean类型**

> 把类型设为某个值，就限制了e和f在所有布尔值中只能取指定的那个值。这个特性称为类型字面量（type literal）
>
> **类型字面量：仅仅表示一个值的类型**

由于类型字面已经限定了具体的类型true或者false，因此上面代码第7行的错误就可以理解了：

```javascript
let g: true = false; // error 不能将类型false分配给类型true
```

特别注意一下第三行的代码：`const c = true;`，这里的变量c的类型是类型字面量true。

> 因为const声明的基本类型的值，赋值之后便无法修改，因此TS推导出的是范围最窄的类型

