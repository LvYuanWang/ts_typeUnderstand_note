## 类型别名与接口

我们使用let，const，var为某个值声明变量名，也就是这个值的别名，那么类似的，在Typescript中，可以为类型声明别名

```javascript
type Age = number;
type Person = {
  name: string
  age: Age
}
```

Age就是一个number，因此可以让Person的解构定义更容易理解。**约定俗成的，一般类型别名的首字母大写**

不过**Typescript无法推导类型别名，因此必须显式注解**。

和使用let声明变量一样，**同一种类型不能声明两次**

```javascript
type Color = "red";
type Color = "blue"; // error 标识符Color重复
```

而且和let，const一样，**类型别名采用块级作用域**，每一块代码和每一个函数都有自己的作用域，作用域内部的类型别名将遮盖外部的类型别名

```javascript
type Color = "red";

if (true) { 
  type Color = "blue"; // 不报错
  let color: Color = "blue";
}
let color: Color = "red";
```

当然，类型别名现在对我们最有用的地方就是减少重复输入复杂的类型。

我们上面声明对象类型要么类型推导，要么使用对象字面量，但是使用类型字面量书写又难看，而且也不方便，如果有多个同样类型的对象，这太麻烦了，类型别名就很简单的解决了这个问题

```javascript
type User = {
  name: string
  age: number
}

let user1: User = {
  name: 'jack',
  age: 18
}

let user2: User = {
  name: 'tom',
  age: 19
}
```

当然类型别名还能嵌套

```javascript
type Address = {
  province: string
  city: string
}
type User = {
  name: string
  age: number
  address: Address
}

let user1: User = {
  name: 'jack',
  age: 18,
  address: {
    province: '四川',
    city: '成都'
  }
}

let user2: User = {
  name: 'tom',
  age: 19,
  address: {
    province: '云南',
    city: '昆明'
  }
}
```

类型别名并不能由TS自动的推导出来，必须手动声明，或者也能使用类型断言

```typescript
function getUser(): User{ 
  return {
    name: 'John',
    age: 30,
    address: {
      province: '四川',
      city: '成都'
    }
  } as User
}
```

**对于定义比较复杂结构，接口和类型别名基本的作用一致**，上面的类型别名的代码完全可以使用接口进行替换。而且就算是交叉使用也不存在问题

```typescript
type Address = {
  province: string
  city: string
}
interface User  {
  name: string
  age: number
  address: Address
}
```

这里只讲解接口的基本用法，接口其实是面向对象中的概念，我们放在后面的课程学习，而且接口和类型别名之间虽然80%的情况可以互换使用，但是还是有很重要的区别，放在后面一起讲解。