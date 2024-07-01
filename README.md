## 联合(并集)类型`|`

有时候一个类型，可能会是string，也有可能是number，或者这个类型，并不仅仅就是一个类型字面量的值，我们希望可以限定是多个值，那这个时候我们应该怎么表示呢？

```javascript
type Width = number | string;
const width1: Width = 100;
const width2: Width = "100px";

type Color = "red" | "blue" | "green";
const color1: Color = "red";
const color2: Color = "blue";
const color3: Color = "green";
```

同样的，如果是对象类型，一样可以

```javascript
type Student = { name: string, score: number };
type Teacher = { name: string, age: number, subject: string };
type Person = Student | Teacher;

const person1: Person = { name: "jack", score: 100 };
const person2: Person = { name: "jack", age: 18, subject: "math" };
const person3: Person = { name: "jack", age: 18, subject: "math", score: 100 };
const person4: Person = { name: "jack" }; // error
```

由于是联合，从上面的代码中就可以看出，Person类型可以是Student类型的值，也可以是Teacher类型的值，甚至两者兼具结构合并之后的值也行。当然，你也不能两个都不是，所以person4报错

但是使用对象的联合类型很容易让我们产生疑惑。上面的person1和person2对象都好说，取的是联合，所以我们可以要么是Student，要么可以是Teacher。要么其实我们可以两个都是，所以person3这样赋值是没有问题的。

但是要取值的时候就会发生问题

```typescript
const person3: Person = { name: "jack", age: 18, subject: "math", score: 100 };

console.log(person3.name);
console.log(person3.age);   // error 类型Person上不存在属性age
console.log(person3.score); // error 类型Person上不存在属性score
```

虽然Student类型和Teacher类型的联合都能赋值给person3，但是实际在使用的时候Student有的属性，Teacher并不一定有，反过来也一样，因此只能调用两者共同的属性`name`。

> 如果联合不相交，那么值只能属于联合类型中的某个成员，不能同时属于每个成员。

联合类型我们非常常用，无论是在声明类型别名，对象字面量或者函数中都能用到

```javascript
type Color = "黑色" | "白色" | "褐色" | "花色"
type Breed = "英短" | "中华田园猫" | "暹罗猫" | "孟买猫"
type Cat = {
  name: string
  age: number
  gender: "公猫" | "母猫"
  color?: Color
  breed?:Breed
}

const cat: Cat = {
  name: "Tom",
  age: 11,
  gender: "公猫",
  color: "黑色"
}
cat.breed = "中华田园猫";
```
