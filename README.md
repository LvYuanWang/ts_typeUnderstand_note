## 类型拓宽

类型拓宽（type widening）是理解TS类型推导机制的关键。

> 一般来说，TS在推导类型的时候会放宽要求，故意推导出一个更宽泛的类型，而不限定为每个具体的类型。

声明变量时如果运行以后修改变量的值（例如使用`let`和`var`声明），变量类型将拓宽，从字面值放大到包含该字面量的基础类型

```javascript
let a = 'x';  // string
let b = 123;  // number
let c = true; //boolean
```

然而，使用`const`声明不可变的变量时，情况不同，会自动的把**类型缩窄**：

```javascript
const a = 'x'  // 'x'
const b = 123  // 123
const c = true // true
```

我们当然可以显示的标注类型防止类型拓宽

```javascript
let a:'x' = 'x';   // 'x'
let b:123 = 123;   // 123
let c:true = true; // true
```

不过使用**`const`声明的对象，并不会缩窄推导的类型**

```typescript
const obj = {
  b: 123  // b是number类型
}
```

因为Javascript对象是可变的，所以在Typescript看来，创建对象之后你可能会更新对象