## any

在TS中，编译时一切都要有类型，如果你和TS类型检查器无法确定类型是什么，默认为`any`。这是兜底的类型，是TS中所有类型的教父。

```javascript
let a: any = 666;
let b: any = ['danger'];
let c = a + b;
```

正常情况下，第三个语句应该在TS中报错才对（谁会去计算一个数字和一个数组之和呢？）

但是如果显示声明了any标注，就不会报错，其实这里的做法就和原生JS的处理一模一样了。

换句话说，如果要使用any，一定要显示标注，如果TS推导出值的类型为any（例如忘记注解函数的参数，或者引入没有类型的JavaScript模块），将抛出运行时异常。

```javascript
let foo; // any

function func(foo, bar) { } // error 参数"foo","bar"隐式具有“any”类型。
```

> 默认情况下，Typescript是宽容的，在推导出类型为any时其实不会报错，如果在`tsconfig.json`中启用了`noImplcitAny`标志，就会遇到隐式any类型时报错。
>
> `noImplcitAny`隶属于TSC的`strict`标志家族，如果已经在`tsconfig.json`中启用了`strict`，那就不需要专门设置`noImplcitAny`标志了，效果是一样的。

有时候我们可能确实需要一个表示任意类型的变量，特别是从javascript代码移植到typescript的时候。比较明显的比如`console.log()`方法就能接收任意类型的参数。

当然默认情况下，你看到的应该是这样的

```javascript
 log(...data: any[]): void;
```

我们现在能看到类型提示，这是由于VS Code编辑器结合着`lib.dom.d.ts`文件提供的TS支持。

如果已经安装了`@types/node`，可以得到nodejs对于`console.log`函数更加细致的提示：

```javascript
log(message?: any, ...optionalParams: any[]): void;
```

> 关于@types的内容，我们在快速入门中已经讲过。
>
> Node.js 的核心模块和某些第三方模块并不是天然支持Typescript的。这就意味着，如果在 TypeScript 项目中使用这些模块时，编译器无法得知这些模块的类型信息，从而无法提供类型检查和自动补全的功能。比如下面的代码会报错：
>
> ```typescript
> const fs = require('fs'); // error 找不到名称require,需要Nodejs类型定义
> ```
>
> 我们可以手动安装nodejs的TypeScript 社区[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) 提供的声明文件库。当使用 TypeScript 开发 Node.js 项目时，`@types/node` 库可以为 Node.js 的核心模块和常用的第三方模块提供类型定义，以便在开发过程中获得类型检查和自动补全的支持。
>
> ```javascript
> npm i @types/node -D
> ```
>
> 这样上面代码`const fs = require('fs');`也找到的对应的类型支持，在TS文件中不会再报错了。

总的来说，你可以在 any 类型变量上任意地进行操作，包括赋值、访问、方法调用等等，此时可以认为类型推导与检查是被完全禁用的：

```javascript
let anyVar: any = null;
anyVar.foo.bar.fn();
anyVar[0][1][2].prop;
```

正如我们一开始就强调的**【any兜底的类型，是TS中所有类型的教父】**

> **any能兼容所有类型，也能够被所有类型兼容**

这一作用其实也意味着类型世界给你开了一个外挂，无论什么时候，你都可以使用 any 类型跳过类型检查。当然，运行时出了问题就需要你自己负责了。

any 类型的万能性也导致我们经常滥用它，比如类型不兼容了就 any 一下，类型不想写了也 any 一下，不确定可能会是啥类型还是 any 一下。此时的 `TypeScript` 就变成了令人诟病的 `AnyScript`。



## unknown

> 少数情况下，如果确实无法预知一个值的类型，不要使用any，更合理的方式是使用 unknown

unknown也表示任何值，一个 unknown 类型的变量可以再次赋值为任意其它类型，但只能赋值给 any 与 unknown 类型的变量

```javascript
let a: unknown = 30;
let b = a === 30;

let c: any = 30;
let d:number = c + 10;

let e: unknown = "string";
e = 123;
let f: any = e;
// let f:string = e; // error 不能将类型unknown分配给类型string
//let f = e + 10; //error "e"的类型为"未知"
if(typeof e === "number") {
  let g = e + 10;
}
```

1. TS不会把任何值推导为`unknown`类型，必须显式注解
2. `unknown`类型的值可以比较
3. `unknown`类型的变量可以赋值给`any`或者`unknown`类型的其他变量
4. 但是执行操作时不能假定`unknown`类型的值为某种特定的类型（比如上面的运算，注意和any的区别），必须先向TS证明一个值确实是某个类型，可以使用typeof

简单的说，**any 放弃了所有的类型检查，而 unknown 并没有**。

```javascript
let anyFn:any;
let unknownFn: unknown;

anyFn.foo();
unknownFn.foo(); // error 对象的类型为"unknown"
```

**在类型未知的情况下，更推荐使用 unknown 标注。**这相当于你使用额外的心智负担保证了类型在各处的结构，后续重构为具体类型时也可以获得最初始的类型信息，同时还保证了类型检查的存在。当然，unknown 用起来很麻烦。

......如果本身就出现了不得不使用any或者unknown的情况，没必要太过于纠结使用any还是unknown，归根结底，用哪个完全取决于你自己，毕竟语言只是工具