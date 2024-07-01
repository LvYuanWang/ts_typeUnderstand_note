/* instanceof 与 in */

class Animal {
    eat() {
        console.log('Animal eating');
    }
}

class Dog extends Animal {
    bark() {
        console.log('Dog barking');
    }
}

class Cat extends Animal {
    meow() {
        console.log('Cat meowing');
    }
}

// 控制流分析: 根据if分支通过 instanceof 判断类型, 将 animal 类型一点一点缩小
function feedAnimal(animal: Animal) {
    if (animal instanceof Dog) {
        animal.bark();  // animal: Dog
    } else if (animal instanceof Cat) {
        animal.meow(); // animal: Cat
    } else {
        animal.eat();  // animal: Animal
    }
}

feedAnimal(new Dog());

const obj = { a: 123 };

if ('a' in obj) {
    console.log('obj has property a');
}

type Circle = {
    kind: 'circle',
    radius: number
}

type Rectangle = {
    kind: 'rectangle',
    width: number,
    height: number
}

type Triangle = {
    kind: 'triangle',
    base: number,
    height: number
}

type Shape = Circle | Rectangle | Triangle;

// 控制流分析: 根据if分支通过 in 判断类型, 将 shape 类型一点一点缩小
function printArea(shape: Shape) {
    if ('radius' in shape) {
        console.log(Math.PI * shape.radius ** 2);
    } else if ('width' in shape) {
        console.log(shape.width * shape.height);
    } else {
        console.log(shape.base * shape.height / 2);
    }
}