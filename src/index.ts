/* 联合(并集)类型   |  */

type Width = string | number;
let width: Width = 100;
width = '100%';

type Color = 'red' | 'green' | 'blue';
let color1: Color = 'red';
let color2: Color = 'green';
let color3: Color = 'blue';

type Student = {
    name: string,
    score: number
}

type Teacher = {
    name: string,
    age: number,
    subject: string
}

type Person = Student | Teacher;

const person1: Person = { name: 'John', score: 80 };
const person2: Person = { name: 'Jane', age: 35, subject: 'Math' };
const person3: Person = { name: 'Tom', age: 24, subject: 'English', score: 90 };    // 不会报错: Person类型中包含了Student和Teacher的所有属性
// const person4: Person = { name: "Kari" };   // 报错: 缺少必要属性

console.log(person3.name);
console.log((person3 as Teacher).age);
console.log((person3 as Student).score);

type CatColor = '黑色' | '白色' | '红色' | '蓝色' | '绿色';
type Breed = '英短' | '美短' | '暹罗' | '波斯' | '布偶';

type Cat = {
    name: string,
    age: number,
    color?: CatColor,
    breed?: Breed,
    gender: '公' | '母'
}

const cat: Cat = {
    name: 'Tom',
    age: 2,
    color: '黑色',
    breed: '英短',
    gender: '公'
}
cat.breed = '美短';

function getCat() {
    if (Math.random() > 0.5) {
        return cat;
    } else if (Math.random() > 0.8) {
        return {
            name: 'Jerry',
            age: 3,
            gender: '母'
        }
    }
}