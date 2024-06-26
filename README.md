## symbol

symbol 符号是ES6新增的一种基本数据类型。

> **注意：**如果编译的时候没有指定tsconfig的target和lib为es6（ES2015）以上的版本，或者执行tsc的时候，没有指定--target为es2015以上版本，将会编译报错

symbol经常用于代替对象和映射的字符串键，确保使用正确的键，以防键被意外设置。

```javascript
let a = Symbol('a');
let b: symbol = Symbol('a');

console.log(a === b);  // false

let obj = {
  name: 'Symbol',
  [a]: 'jack',
  [b]: function () {
    console.log('ts')
  }
}
console.log(obj);

for (let key in obj) {
  console.log("---", key);
}
```

>  Symbol('a')使用指定的名称新建了一个符号，这个符号是唯一的，不与其他任何符号相等，即便再使用相同的名称创建一个符号也是如此。
>
>  symbol 属性不参与 `for..in` 循环。`Object.keys()`也会忽略他们

当然 symbol也能进行全局注册：

```typescript
let id1 = Symbol.for('id')

const user = {
  [id1]: 123
}

console.log(user[id1]) // 123
console.log(id1)      // Symbol(id)

let id2 = Symbol.for('id')

console.log(id1 === id2) // true
console.log(user[id2]) // 123
console.log(id2)      // Symbol(id)
```

`Symbol.for()` 方法创建前，会首先搜索 **全局符号注册表** ，看看是否存在一个键值为 `id` 的 **符号值** 。如果存在就会返回已存在的 **符号值** ；否则创建一个新的 **符号值** 

但是，如果使用const声明的symbol将会是`unique symbol`类型

```javascript
const c = Symbol('a'); // typeof c
const d: unique symbol = Symbol('a'); // typeof d
//let e: unique symbol = Symbol('a'); // error unique symbol的变量必须为const

console.log(c === c);
console.log(c === d); // error 此比较没有意义，类型typeof c和typeof d没有重叠
```

`unique symbol`类型与其他字面量类型其实是一样的，比如`1`，`true`，`"hello"`，创建的是表示特定符号的类型