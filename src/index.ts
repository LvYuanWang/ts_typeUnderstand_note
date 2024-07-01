/* typeof 与 控制流分析 */


/* 控制流分析 */
const str = 'hello';

type MyTypes = number | string | boolean | null | undefined;

function parse(value: MyTypes) {
    // value的类型会根据不同的条件分支进行缩小, 每流过一个if分支, value的联合类型就会减少一个
    if (typeof value === 'number') {
        return value * 2;
    } else if (typeof value === 'string') {
        return value.toUpperCase();
    } else if (typeof value === 'boolean') {
        return !value;
    } else {
        return value;
    }
}


/* typeof */
let temp1 = "hello";
const temp2 = "hello";
const temp3 = null;
const temp4 = (a: number, b: number) => a + b + "";

type Temp1 = typeof temp1; // string
type Temp2 = typeof temp2; // "hello"
type Temp3 = typeof temp3; // null
type Temp4 = typeof temp4; // (a: number, b: number) => string

const user = {
    name: 'Huobi',
    age: 18,
    address: {
        province: 'SiChuan',
        city: 'ChengDu'
    }
}

type User = typeof user;

const person: User = {
    name: 'Bob',
    age: 19,
    address: {
        province: 'Hunan',
        city: 'ChangSha'
    }
}