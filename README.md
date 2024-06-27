## 结构化类型

Typescript的对象类型表示**对象的结构**。这是一种设计选择，JavaScript采用的是**结构化类型**，Typescript直接沿用，没有采取名义化类型

> 在**结构化类型**中，类型的兼容性是根据其结构或成员来确定的，而不是依赖于类型的名称或标识符。换句话说，如果两个对象具有相同的结构，即它们具有相同的属性和方法，那么它们可以被认为是相同类型或兼容的类型，即使它们的名称不同。在某些语言中也叫做**鸭子类型(鸭子辨型)**（意思是不以貌取人）
>
> 相比之下，**名义化类型**的兼容性是根据类型的名称或标识符来确定的。在名义化类型系统中，即使两个对象具有相同的结构，如果它们的名称或标识符不同，它们被认为是不同的类型。
>
> 结构化类型通常用于动态类型语言，如JavaScript，而名义化类型通常用于静态类型语言，如Java或C++。

```typescript
type Person = {
  name: string;
  age: number;
}

type Animal = {
  name: string;
  age: number;
}

const person: Person = {
  name: 'John',
  age: 10
}

const animal: Animal = person

function greet(person: Person) {
  console.log(`Hello, ${person.name}`)
}

greet(animal)
```

Person类型能够赋值给Animal类型，如果是Java等后端程序员会觉得这样做不可思议，但是其实将类型去掉，看看编译之后的结果，就能理解了，无非就是简单的对象传值，名字并不是最重要的。

```javascript
"use strict";
const person = {
    name: 'John',
    age: 10
};
const animal = person;
function greet(person) {
    console.log(`Hello, ${person.name}`);
}
greet(animal);
```

同样的，就算是class类，一样是结构化类型

```javascript
class User { 
  constructor(
  	public firstName: string,  // public 是this.firstName=firstName的简写形式
    public lastName: string, 
    public age:number) { 
  }
}

class Person { 
  constructor(public firstName: string, public lastName: string, public age:number) { 
  }
}

let a = new Person('lily','smith',20);
let b = new User('john','matt',21);
a = b;
```
