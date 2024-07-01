## 交叉(交集)类型`&`

交叉类型和符号的意思相似，就表示and的意思，把`&`相交的组合起来，值需要全部满足相交组合的类型

```javascript
type Student = { name: string, score: number };
type Teacher = { name: string, age: number, subject: string };
type User = Student & Teacher;
const user1: User = { name: "jack", age: 18, subject: "math"}; // error 缺少属性"score"
```

虽然有时候口头上经常会说交集类型，但是在教学的时候，我并不是太喜欢把`&`符号称为交集，叫做交叉应该更容易理解一些，不容易给大家造成思想误区。

就拿上面的类型来说，`A&B` ---->  一说交集应该是，`type C = {name:string}` 才对啊，最后得到的好像是我记忆中数学的联合类型啊？不用对你的记忆怀疑，你的记忆是对的，你可以把锅丢给翻译

为了便于理解，你可以这样想：**C既符合A也符合B，所以是A和B的“交叉”**，有了这样的理解，下面出现的一些情况，我们才能更好的理解

相比联合类型，交叉类型的范围就没有那么广泛了，因为你不可能把具体的值使用`&`组合，这样意义也就混乱了

```javascript
type Width = number & string; // never类型
```

> `number` 和 `string` 没有什么交集，因此根本无法给变量赋值，交叉类型始终交叉的是类型，类型字面量或者基础类型，在做类型交叉的时候没有任何意义，因此得到的结果是never。具体类型never类型的使用我们后面讲解

其实，对象字面量类型一样会有这样的效果

```typescript
type P = {
  name: string
  sex: string
}
type T = {
  name: string
  age:number
}
type PT = P & T

const a: PT = {
  name: 'jack',
  sex:'男',
  age:11
}
```

如果有同名属性，并且类型一样，就会直接合并，但是如果类型不一样呢？

```diff
type P = {
  name: string
  sex: string
}
type T = {
+  name: number
  age:number
}
type PT = P & T

const a: PT = {
+  name: 'jack', // error 不能将类型“string”分配给类型“never”
  sex:'男',
  age:11
}
```

不过我们可以使用交集类型的特性，达到一些我们需要的效果。

比如，我们可能有一个联合类型，在实际开发中，可能这个联合类型我们并不知道有哪些，或者可能这个联合类型直接赋值给另外一个类型的时候会报错，我们可以使用`&`运算符对其进行约束

```typescript
type params = string | number | boolean;
type pt = params & string;
```

当然我们现在代码很简单，只能简单模拟这个情况，讲到一些类型工具之后我们再来看一些复杂情况

比如，我们还能使用交叉类型来实现类似于继承的效果

```javascript
type Goods = {
  id: number
  name: string
  price: number
}

type Cart = Goods & {
  count: number
}

type Order = Goods & {
  count: number
  totalPrice: number
}

const goods: Goods = {
  id: 1,
  name: 'goods',
  price: 100
}

const cart: Cart = {
  id: 1,
  name: 'goods',
  price: 100,
  count: 1
}

const order: Order = {
  id: 1,
  name: 'goods',
  price: 100,
  count: 1,
  totalPrice: 100
}
```
