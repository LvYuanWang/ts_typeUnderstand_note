## void

在JavaScript中，`void`有特殊的用法，比如

```javascript
<a href="javascript:void(0)">点击</a>
```

我们在界面经常这样写来表示阻止a标签的默认行为.

这里的 `void(0)` 等价于 `void 0`，即 `void expression` 的语法，我们可以使用它来执行一个立即执行函数（IIFE）

```javascript
void function(){
  alert(111);
}();
```

在Typescript中，`void`也表示一种类型，用于描述一个内部没有 `return` 语句，或者没有显式 `return` 一个值的函数的返回值，如：

```javascript
function fn1() {}
function fn2() {
  return;
}
function fn3() {
  return undefined;
}

let m1 = fn1();
let m2 = fn2();
let m3 = fn3();
console.log(m1, m2, m3);
```

`fn1` 与 `fn2` 的返回值类型都会被隐式推导为 `void`，只有显式返回了 `undefined` 值的 `fn3` 其返回值类型才被推导为了 `undefined`

> **注：**`fn3`只有在`tsconfig.json`中开启了`strictNullChecks:true`的情况下，其返回值类型才会被推导为`undefined`，如果没有开启`strict`模式，或者关闭了`strictNullChecks`，fn3函数的返回值类型会被默认推导为`any`

虽然 fn3 的返回值类型会被推导为 undefined，但仍然可以使用 void 类型进行标注

```javascript
function fn3():void {
  return undefined;
}
```

 `undefined` 能够被赋值给 `void` 类型的变量，就像在 JavaScript 中一个没有返回值的函数会默认返回一个 `undefined` ，其实主要还是为了兼容性。但是，在`strict`模式下，null 类型会报错，除非关闭`strictNullChecks`

```javascript
function fn3():void {
  return undefined;
}
function fn4():void {
  return null; // error 不能将类型null分配给类型void，关闭strictNullChecks不报错
}

let v1: void = undefined;
let v2: void = null; // error 不能将类型null分配给类型void，关闭strictNullChecks不报错
```

