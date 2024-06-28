/* 结构化类型 */

type Person = {
    name: string,
    age: number
}

type Animal = {
    name: string,
    age: number
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