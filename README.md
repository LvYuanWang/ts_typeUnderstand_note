## never

`never`类型根据其英文翻译，就表示`从来没有`，`绝不`。其实之前已经见到过这个类型

```typescript
type A = string & number; // never
```

我们之前不是讲过有`null`，`undefined`和`void`类型吗？这三个都是有具体意义的，也表示具体的类型，`undefined`表示尚未定义，`null`表示缺少值，甚至是`void`就表示一个空类型，就像没有返回值的函数使用 void 来作为返回值类型标注一样。

而 never 才是一个“什么都没有”的类型，它甚至不包括空的类型，严格来说，**never 类型不携带任何的类型信息**。

比如下面的联合声明：

```javascript
type Foo = string | number | boolean | undefined | null | void | never;
```

我们把常见的基础类型都放入到了联合声明中，但是将鼠标悬浮在类型别名之上，你会发现这里显示的类型是：`string | number | boolean | void | null | undefined`，`never`直接被无视掉了。

> 注意：这个特性在以后的类型编程条件判断中经常会被用到，使用never来填充数据

在typescript的类型系统中，`never` 类型被称为 **Bottom Type**，是**整个类型系统层级中最底层的类型**

如果说`any`，`unknown`是其他每个类型的父类型，那么`never`就是其他每个类型的子类型。

这意味着，**never类型可以赋值给其他任何类型，但是反过来，却行不通**

通常我们不会显式地声明一个 `never` 类型，这是没有任何意义的，它主要被类型检查所使用。

不过在实际工作中，特别是在团队开发中，我们可以利用never的特性与类型的控制流分析，让typescript做出更合理的处理

```typescript
type Method = "GET" | "POST";

function request(url: string, method: Method) {
  if (method === "GET") {
    console.log(method); // GET
    // todos...
  }
  else if (method === "POST") {
    console.log(method); // POST
    // todos...
  }
  else {
    console.log(method) // never
  }
}
```

上面的代码没有什么问题，但是如果某一天，`Method`类型加入了新的联合类型，比如`type Method = "GET" | "POST" | "PUT" | "DELETE";`，特别是在团队开发中，这个时候，request函数是没有任何感知的。

```typescript
type Method = "GET" | "POST" | "PUT" | "DELETE";

function request(url: string, method: Method) {
  if (method === "GET") {
    console.log(method); // GET
    // todos...
  }
  else if (method === "POST") {
    console.log(method); // POST
    // todos...
  }
  else {
    const _neverCheck: never = method;
    throw new Error(`不知道的类型: ${_neverCheck}`);
  }
}
```

将代码修改为现在的这个样子，虽然现在有报错了，**`method`根据类型流分析，还剩下`"PUT" | "DELETE"`类型，所以不能赋值给`never`类型**。但是将错误扼杀在摇篮中，才是在团队项目中想要的结果，而不是等运行了，才去一个个排查，特别是这种隐藏的bug，在团队的成千上万行代码与模块中，去找到这个问题，是非常痛苦的问题。

> 这种方式也叫做**穷举式检查**，积极的对不期望的情况进行错误处理，在编译时就捕获未处理的情况。而不是默默地忽略它们

比如，前面的代码，我们也可以进行修改：

```typescript
type Circle = { kind: "circle", radius: number }
type Rect = { kind: "rect", width: number, height: number }
type Shape = Circle | Rect;

function area(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rect":
      return shape.width * shape.height;
    default:
      const _neverCheck: never = shape; 
      throw new Error("Invalid shape type");
  }
}
```

如果新加一个类型`const _neverCheck: never = shape;` 这行代码就会报错，因为控制流分析并没有完全结束

```diff
type Circle = { kind: "circle", radius: number }
type Rect = { kind: "rect", width: number, height: number }
+type Triangle = { kind: "triangle", base: number, height: number }
type Shape = Circle | Rect | Triangle;

function area(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rect":
      return shape.width * shape.height;
+    case "triangle":
+      return shape.base * shape.height / 2;
    default:
      const _neverCheck: never = shape; 
      throw new Error("Invalid shape type");
  }
}
```

还有在某些情况下使用 never 确实是符合逻辑的，比如一个只负责抛出错误的函数：

```typescript
function fn():never { 
  throw new Error("error");
}
```

在类型流的分析中，一旦一个返回值类型为 `never` 的函数被调用，那么下方的代码都会被视为无效的代码：

```typescript
function fn():never { 
  throw new Error("error");
}

function foo(n: number) { 
  if (n > 10) { 
    fn();
    let name = "jack"; // 检测到无法访问的代码。ts(7027)
    console.log("hello")
  }
}
```

`never`类型在我们后面讲解的条件类型中也可以做出很有意思的处理