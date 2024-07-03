## 类型断言

类型断言（Type Assertion）可以用来手动指定一个值的类型。

在使用 `TypeScript` 的过程中，你可能会遇到这种情况：你比 `TypeScript` 更加清楚某个值的类型。 比如你从异步请求中拿到一个类型为`any`的值，但你清楚的知道这个值就是`string`类型，这个时候你可以通过**类型断言**方式告诉编译器：这就是一个string类型。类型断言有点类似于其他语言的类型转换，注意只是类似，它没有运行时的影响，**类型断言只是在编译阶段起作用**。

### 语法

```typescript
值 as 类型
或者
<类型>值 
```

```typescript
let someValue: any = "this is a string";
let strLength1: number = (<string>someValue).length;
// 如果要写断言，建议用as，因为上面的形式在react中会有歧义。尖括号语法与JSX的标签语法相冲突
let strLength2: number = (someValue as string).length;
```

注意在 `tsx` 语法中使用 `值 as 类型`。

### 用途

#### **联合类型断言：**

```typescript
type MyType = string | number | boolean;

function getLength(type: MyType) {
  console.log((type as string).length)
}

getLength("Hello World");

type Student = { name: string, score: number };
type Teacher = { name: string, age: number, subject: string };
type Person = Student | Teacher;

function print(person: Person) {
  console.log(person.name);
  console.log((person as Student).score)
}

print({ name: "John", score: 100});
```

其实从上面的代码中可以很明显的看出来，类型断言是有很明显的类型安全隐患的。所以我们一般在使用的时候，需要自己明确的知道确实可以进行断言，再进行操作。

#### 父类型断言为子类型

```typescript
class Animal { 
  eat() {
    console.log('animal eat')
  }
}

class Dog extends Animal {
  eat() {
    console.log('dog eat')
  }
  bark() {
    console.log('dog bark')
  }
}

class Cat extends Animal {
  eat() {
    console.log('cat eat')
  }
  meow() {
    console.log('cat meow')
  }
}

function feed(animal: Animal) {
  (animal as Cat).meow();
}
```



还记得我们之前的`instanceof`吗？

```typescript
class Animal { 
  eat() {
    console.log('animal eat')
  }
}

class Dog extends Animal {
  eat() {
    console.log('dog eat')
  }
  bark() {
    console.log('dog bark')
  }
}

class Cat extends Animal {
  eat() {
    console.log('cat eat')
  }
  meow() {
    console.log('cat meow')
  }
}

function feedAnimal(animal: Animal) {
  if (animal instanceof Dog) {
    animal.bark(); // Dog
  }
  else if (animal instanceof Cat) {
    animal.meow(); // Cat
  }
  else {
    animal.eat(); // Animal
  }
}
```

其实类型安全的做法就是应该使用类型守卫，但是有时候可能使用起来不那么方便，或者说其实类型我们很确定，那就可以直接使用类型推断，比如常见的DOM事件操作

```typescript
const inputDom = document.querySelector("input");
inputDom!.addEventListener("change", e => { 
  console.log((e.target as HTMLInputElement).value);
})
```

#### 将任何一个类型断言为 `any`

(某些情况下可以被断言为`unknown`)

有时候，当我们引用一个在此类型上不存在的属性或方法时，就会报错：

```ts
const obj = {
  name: 'jack',
  age: 18
}
console.log(obj.sex) // 类型“{ name: string; age: number; }”上不存在属性“sex”
```

对象`obj`上没有`sex`这样的一个属性，当然TS就会提示错误。

但有的时候，我们非常确定这段代码不会出错，比如：

```ts
window.foo = 1; // 类型“Window & typeof globalThis”上不存在属性“foo”
```

往全局对象`window`上添加新的属性，这可能是我们经常会做的操作，但是`window`对象类型上没有我们`foo`这个属性，当然同样也会报错。

此时我们可以使用 `as any` 临时将 `window` 断言为 `any` 类型：

```typescript
(window as any).foo = 1;
```

> 当然，上面的这个例子我们也可以通过扩展 `Window` 的类型来解决这个问题:
>
> ```typescript
> export {}
> declare global { 
> interface Window {
>  foo: number;
> }
> }
> 
> window.foo = 1;
> ```
>
> 不过如果只是临时的增加 `foo` 属性，`as any` 会更加方便。
>
> 我的意思是，我们不能滥用 `as any`，但是也不要完全否定它的作用，我们需要在**类型的严格性和开发的便利性之间掌握平衡**。才能发挥出 TypeScript 最大的价值。

#### 将 `any/unknown` 断言为一个具体的类型

在日常的开发中，我们不可避免的需要处理 `any` 或者`unknown`类型的变量，它们可能是由于第三方库未能定义好自己的类型，也有可能是历史遗留问题，还可能是受到 TypeScript 类型系统的限制而无法精确定义类型的场景。

遇到 `any` 或者`unknown`类型的变量时，我们可以通过类型断言把 `any` 或者`unknown`断言为精确的类型。

```typescript
// 第三方API或者历史遗留函数
function getData(id: number): any {
  // 模拟：根据id获取的对象数据
  // ......
  return {id:1, name: 'jack', age: 18};
}

interface User{
  id: number;
  name: string;
  age: number;
}

const user = (getData(1) as User)
console.log(user.name)
```

### 限制

并不是任何一个类型都可以被断言为任何另一个类型。

```typescript
let str = "123";
let n = str as number; // error
```

两个完全没有关联的类型进行断言，这当然会报错，相信大家也能想的通，因此，什么情况下能断言，就很好理解了。

具体来说，若 `A` 兼容 `B`，那么 `A` 能够被断言为 `B`，`B` 也能被断言为 `A`。

```typescript
let str1:"hello" = "hello";
let str2 = "hello";
str2 = str1; // 可以直接赋值
// str2 = str1 as string; 
str1 = str2 as "hello"; // 可以使用类型断言
```

对象类型也一样

```typescript
let a: Animal = new Animal();
let b: Dog = new Dog();

// a = b; // 可以直接赋值
b = a as Dog; // 可以使用类型断言, 但是不安全Animal没有bark方法
b.eat();
// b.bark(); // error
```

### 非空断言

当你确信某个值不是`null`或`undefined`时，可以使用非空断言

**语法:** `值!`，比如`someValue!`

```typescript
let maybeString: string | null = "hello";
let definitelyString = maybeString!;
```

```typescript
function getRandom(length?: number) { 
  if (!length) {
    return undefined;
  }
  
  return Math.random().toString(36).slice(-length);
}
let s = getRandom(6);
// 可以使用类型断言
(s as string).charAt(0);
// 由于就是字符串和非空的处理，可以使用非空断言
s!.charAt(0);
```

```typescript
type Box = {
  id: number
  name: string
}

function getBox(): Box | undefined {
  if (Math.random() > 0.5) {
    return {
      id: 1,
      name: "box1",
    }
  }
  return undefined;
}

function createProduction(box:Box) { 
  // todos...
}

createProduction(getBox() as Box);
// 非空断言
createProduction(getBox()!);
```

### 双重断言

既然：

- 任何类型都可以被断言为 `any`(某些情况下可以被断言为`unknown`)
- `any`或`unknown`可以被断言为任何类型

那么就可以使用双重断言 `as any as 类型` 来将任何一个类型断言为任何另一个类型

```typescript
let str = "123Hello";
let n = str as unknown as number; 
console.log(typeof n);
```

这样写很明显有类型安全的问题，类型断言并不等于类型转换，编译之后是没有类型的，所以通过tsc编译之后你会发现，其实就是把变量`str`赋值给了变量`n`

```typescript
let str = "123Hello";
let n = str;
console.log(typeof n); // string
```

### as const断言

**`as const`断言** 用于指示 TypeScript 将一个变量视为常量，并据此推断出最具体的类型。并且，使用 `as const` 时，TypeScript 会将**数组视为只读元组**，**对象的属性也会被视为只读属性**，且对象或数组中的值会被推断为字面量类型，而不是更一般的类型（如 `string`、`number` 等）

```typescript
// a 的类型是 'Hello'
let a = 'Hello' as const;

// arr 的类型是 readonly [1, 2, 3]
let arr = [1, 2, 3] as const;

// obj 的类型是 { readonly x: 10; readonly y: 20; }
let obj = { x: 10, y: 20 } as const;

// 对于更复杂的嵌套一样起作用
const user = {
  id:1,
  name:"jack",
  address:{
    city:"成都",
    province:"四川"
  }
} as const

/*
user的类型是: {
    readonly id: 1;
    readonly name: "jack";
    readonly address: {
        readonly city: "成都";
        readonly province: "四川";
    };
}
*/
```

as const结合着方括号运算符，有时候可以非常方便的处理一些看起来比较复杂的问题。

比如，需要将数组中的内容转换为联合类型

```typescript
const roles = ["角色列表", "用户删除", "用户查询", "权限详情"] as const
type Role = typeof roles[number]; //"角色列表" | "用户删除" | "用户查询" | "权限详情"
```