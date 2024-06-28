/* 结构化类型 */

type Person = {
    name: string,
    age: number
}

type Animal = {
    name: string,
    age: number,
    hobby?: string
}

const person: Person = {
    name: 'John',
    age: 21
}

// const animal: Animal = {
//     name: 'dog',
//     age: 2
// }

const animal: Animal = person;
const animal2: Animal = {
    name: 'dog',
    age: 2,
    hobby: 'eat'
}

function greet(person: Person) {
    console.log(`Hello, ${person.name}`);
}

greet(animal2); // 不会报错


class User {
    firstName: string;
    lastName: string;
    age: number;

    constructor(firstName: string, lastName: string, age: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
}

class People {
    constructor(public firstName: string, public lastName: string, public age: number) { }
}

let a = new User('John', 'Doe', 21);
let b = new People('Straw', 'Berry', 20);

a = b; // 不会报错： People 类型的实例可以赋值给 User 类型的实例(因为 People 类型的实例包含了 User 类型的所有属性)