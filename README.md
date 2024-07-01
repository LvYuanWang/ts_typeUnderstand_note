## `instanceof`实例判断

`typeof`类型检查只能判断`"string"`/`"number"`/`"boolean"`/`"function"`/`"object"`等值。如果遇到了具体的对象类型判断就无能为力了，因此，可以使用`instanceof`关键字

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

feedAnimal(new Dog())
```

## `in`：属性检查

JavaScript 语言中，`in`运算符用来确定对象是否包含某个属性名

```typescript
const obj = { a: 123 };

if ('a' in obj) {
  console.log('有a属性');
}
```



在Typescript中，`in`**检查对象是否具有特定的属性，并使用该属性区分不同的类型**。**它通常返回一个布尔值，表示该属性是否存在于该对象中**。

```typescript
type Circle = {
  kind: 'circle';
  radius: number;
}

type Rectangle = {
  kind: 'rectangle';
  width: number;
  height: number;
}

type Triangle = {
  kind: 'triangle'
  base: number;
  height: number;
}

type Shape = Circle | Rectangle | Triangle;


function printArea(shape: Shape) {
  if ('radius' in shape) {
    console.log(Math.PI * shape.radius ** 2);
  }
  else if('width' in shape){
    console.log(shape.width * shape.height);
  }
  else {
    console.log(shape.base * shape.height / 2);
  }
}
```
