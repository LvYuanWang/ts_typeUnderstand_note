/* 类型别名与接口 */

// 类型别名: 用来给一个类型起一个新的名字
type Age = number;

type Person = {
    name: string,
    age: Age,
    tel?: string
}

let user1: Person = {
    name: 'Tom',
    age: 20
}

let user2: Person = {
    name: 'Jerry',
    age: 22,
    tel: '123456'
}

// 类型别名其实就和变量差不多, 名字都不能重复, 都有作用域等...
type Color = 'red';
// type Color = 'blue'; // error: 标识符“Color”重复

if (true) {
    type Color = 'blue'; // 不会报错: 作用域不同
    let color: Color = 'blue';
}

let color: Color = 'red';


type Address = {
    province: string,
    city: string
}

type User = {
    name: string,
    readonly age: number,
    readonly address: Address
}

let user3: User = {
    name: 'Anil',
    age: 19,
    address: {
        province: 'Guangdong',
        city: 'DongGuan'
    }
}

let user4: User = {
    name: 'Lily',
    age: 20,
    address: {
        province: 'Guangdong',
        city: 'GuangZhou'
    }
}

function getUser(): User {
    return {
        name: 'Jack',
        age: 21,
        address: {
            province: 'Guangdong',
            city: 'FoShan'
        }
    } as User
}


// 接口: 用来定义一个类的结构, 也可以当做类型声明来使用
interface Computer {
    brand: string,
    price: number
}

interface Customer {
    name: string,
    readonly gender: "男" | "女",
    readonly computer: Computer
}

let customer1: Customer = {
    name: "Anna",
    gender: "女",
    computer: {
        brand: "MacBook Pro",
        price: 10000
    }
}

let customer2: Customer = {
    name: "Bob",
    gender: "男",
    computer: {
        brand: "intel i7",
        price: 8000
    }
}

// 它还可以和类型别名结合使用
interface Client {
    user: User,
    computer: Computer
}

let client1: Client = {
    user: {
        name: 'Lisa',
        age: 20,
        address: {
            province: '美国',
            city: '华盛顿'
        }
    },
    computer: {
        brand: 'MacBook Pro',
        price: 10000
    }
}


// 当编译成js文件时, 接口会被删除, 类型别名会被保留