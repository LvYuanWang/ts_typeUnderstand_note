/* 类型断言 */

let someValue: any = "this is a string";

let stringLength: number = (<string>someValue).length;
// 如果要写断言, 建议用 as, 因为上面的形式在react中会有歧义。尖括号语法与 JSX 的标签语法相冲突
let stringLength2: number = (someValue as string).length;


// 联合类型断言
type MyType = string | number | boolean;

function getLength(type: MyType) {
  console.log((type as string).length);
}
getLength('hello world');


type Student = { name: string, score: number };
type Teacher = { name: string, age: number, subject: string };
type Person = Student | Teacher;

function print(person: Person) {
  console.log(person.name);
  console.log((person as Student).score);   // 默认情况下, 不能直接访问到score属性, 需要断言(不安全)
}


class Animal {
  eat() {
    console.log('animal eat food');
  }
}

class Dog extends Animal {
  bark() {
    console.log('dog bark');
  }
}

class Cat extends Animal {
  jump() {
    console.log('cat jump');
  }
}

function feed(animal: Animal) {
  (animal as Dog).bark();
}

// 建议使用控制流分析来替代类型断言
function feedAnimal(animal: Animal) {
  if (animal instanceof Dog) {
    animal.bark();
  } else if (animal instanceof Cat) {
    animal.jump();
  } else {
    animal.eat();
  }
}

// const inputDom = document.querySelector('input') as HTMLInputElement;
// inputDom.addEventListener('input', e => {
//   console.log((e.target as HTMLInputElement).value);
// })


const obj = {
  name: 'joker',
  age: 18
};
(obj as any).age = 20;
(obj as any).sex = "男";

console.log(obj);

// (window as any).foo = 1;

// 为了解决全局变量的问题, 可以在模块中声明全局变量
// export { }
// declare global {
//   interface Window {
//     foo: number
//   }
// }
// window.foo = 1;


// 将 any/unknown 断言为一个具体类型
// 第三方 API 或者历史遗留问题, any 或者 unknown 类型的存在
function getData(id: number): any {
  return {
    id: 1,
    name: "Joker",
    age: 18
  }
}

interface User {
  id: number,
  name: string,
  age: number
}

const user = getData(8) as User;
console.log(user.name);


// 限制: 若A兼容B, 那么A能够被断言为B, B也能被断言为A
let str = '123';
// let n = str as number;  // error

let str1: "hello" = "hello";
let str2 = "world";
str2 = str1;
// str2 = str1 as string;

str1 = str2 as 'hello';

let a: Animal = new Animal();
let d: Dog = new Dog();

a = d;
d = a as Dog;
d.eat();
// d.bark(); // 不会报错, 但是非常不安全, 因为d的类型是Animal, 但是bark方法是Dog的方法


// 非空断言
let maybeString: string | null = "hello";
let definitelyString = maybeString!;

function getRandom(length?: number) {
  if (!length) {
    return undefined;
  }

  return Math.random().toString(36).slice(-length);
}
let s = getRandom(6);
// 可以使用类型断言
(s as string).charAt(0);
// 由于就是字符串和非空的处理, 可以使用非空断言
s!.charAt(0);
// 当然也可以使用可选链操作符
s?.charAt(0);

type Box = {
  id: number,
  name: string
}


function getBox(): Box | undefined {
  if (Math.random() > 0.5) {
    return {
      id: 1,
      name: "box1"
    }
  }
  return undefined;
}

function createProduction(box: Box) {
  // todo...
}

createProduction(getBox() as Box);
// 进行非空断言
createProduction(getBox()!);


// 双重断言
let str3 = 'hello';
let n = str3 as unknown as number;
console.log(n);


// as const 断言
let strConst = 'hello' as const;
// strConst = 'world';   // error

let arr = [1, 2, 3] as const;

let objConst = { x: 10, y: 20 } as const;
// objConst.x = 30;  // error
// objConst.z = 20;  // error

const person = {
  id: 1,
  name: 'Joker',
  address: {
    city: 'ChengDu',
    province: 'SiChuan'
  }
} as const;
// person.id = 2;  // error

const roles = ['角色列表', '用户列表', '权限管理', '用户删除'] as const;

type Role = typeof roles[number]; // "角色列表" | "用户列表" | "权限管理" | "用户删除"