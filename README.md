### 对象字面量

按照我们之前基础类型的惯性思维，在Typescript使用类型描述对象应该是下面这个样子：

```javascript
let a: object = {
  b:'hello'
}
```

但是访问b的时候就会发生错误

```javascript
console.log(a.b); //error 类型object上不存在属性"b"
```

为什么把一个变量声明成object类型，却做不了任何操作呢？

**其实object类型对值并不了解，就只能表示该值是一个JavaScript对象，仅此而已**。因此，当我们输入

```javascript
a. 
```

Typescript不会有任何提示。

如果我们不显示注解，直接让Typescript推导

```javascript
let a = {
  b:'hello'
}
console.log(a.b);
```

![image-20231206112616176](./assets/image-20231206112616176.png)

这其实就是**对象字面量**的语法，当然除了让Typescript推导出对象的解构，我们可以自己进行明确的描述

```javascript
const a: {b: string} = {
  b:'hello'
}
console.log(a.b);

const user: {
  name: string
  age: number
} = {
  name: 'jack',
  age: 18
}
console.log(user.name)
```

> 与前面讲的基本类型不同，使用**const声明对象不会导致Typescript把推导的类型缩窄**。这是因为JavaScript对象是可变的，所以在JavaScript看来，创建对象之后你可能会更新对象的字段

### 可选符号`?`

默认情况下，Typescript对对象的属性要求十分的严格，如果声明对象有个类型为string的属性name和类型为number的属性age，Typescript将预期对象有这么两个属性。而且有且仅有这两个属性，如果缺少name和age属性，或者多了其他属性，Typescript将报错

```javascript
// 类型 "{ name: string; }" 中缺少属性 "age"，但类型 "{ name: string; age: number; }" 中需要该属性
let user: {
  name: string
  age: number
} = {
  name: 'jack',
  // age: 18
}

// error "类型“{ name: string; age: number; }”上不存在属性“sex”
user.sex = "男";
```

我们可以通过可选符号修饰符`?`告诉Typescript某个属性是可选的

```javascript
let user: {
  name: string
  age?: number
  sex?: string
} = {
  name: 'jack'
}
```

> 注意：如果标注为**可选**属性，那么这个属性的类型其实是：`类型 | undefined`，也就是说，`age?:number`，其实真正的应该是`age?:number | undefined`

### readonly

除了修饰符可选符号(`?`)之外，还可以使用`readonly`修饰符把字段标记为只读

```javascript
let user: {
  readonly name: string
  age: number
} = {
  name: 'jack',
  age: 18
}
user.age = 19;
user.name = 'tom'; //error 无法为 "name" 赋值，因为它是只读属性
```

> readonly不仅仅可以修饰对象的属性，数组，元祖和类中都可以使用readonly

### 