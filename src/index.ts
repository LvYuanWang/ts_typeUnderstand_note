/* symbol */

let a = Symbol('a');
let b: symbol = Symbol('a');

console.log(a === b); // false

let obj = {
    name: 'Symbol',
    [a]: 'jack',
    [b]: function () {
        console.log('ts')
    }
}

console.log(obj); // { name: 'Symbol', [Symbol(a)]: 'jack', [Symbol(a)]: [Function] }

for (let key in obj) {
    console.log("---Key:", key); // name
}


/* Symbol.for(key) */
let id1 = Symbol.for('id');

const user = {
    [id1]: 12345
}

console.log(user[id1]); // 12345
console.log(id1); // Symbol(id)

let id2 = Symbol.for('id');

console.log(user[id2]); // 12345
console.log(id2); // Symbol(id)

console.log(id1 === id2); // true


/* unique symbol */
let c = Symbol('c');
let d = Symbol('d');

console.log(c === d); // false

const e = Symbol('e');  // unique symbol
const f: unique symbol = Symbol('f');

// c = e; // 不会报错

// console.log(e === f); // 此处会报错，因为unique symbol是唯一的
// let g: unique symbol = Symbol('g'); // unique symbol类型的变量必须是const定义的