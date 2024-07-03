/* 类型操作符  satisfies */
// satisfies --> TS4.9 新增的类型操作符
// 和类型断言 as 功能类似, 但是比类似断言更加安全也更加智能, 因为它能在满足类似安全的前提下, 自动帮助我们做类型收窄和类型提示

interface IConfig {
  a: string | number;
}

// const legacy: IConfig = {}
// console.log(legacy.a)

// const legacy: IConfig = {} as IConfig;
// console.log(legacy.a);  // undefined: 不会报错

// 如果类型不安全, 通过 satisfies 转换会提示错误
// const current: IConfig = {} satisfies IConfig;
// console.log(current.a);

// const currentWithValue: IConfig = { a: 2 };
// currentWithValue.a.toFixed(2);  // error: 类型 string | number 不存在toFixed

// const currentWithValue = { a: 2 } as IConfig;
// currentWithValue.a.toFixed(2);  // error: 类型 string | number 不存在toFixed

const currentWithValue = { a: 2 } satisfies IConfig;
currentWithValue.a.toFixed(2);  // ok: 类型收窄为 number


type MyElement = {
  tagName: string;
  src: string;
  [key: string]: any;
}
/*
[key: string]: any: 任意属性签名, 用于接收任意属性
  在 TypeScript 中，[key: string]: any; 是一个索引签名。
  它的意思是，除了已经明确声明的属性（在这个例子中是 tagName 和 src）之外，这个类型的对象可以有任意数量的其他属性，只要这些属性的键是字符串类型。这些额外的属性的值可以是任何类型，这里用 any 表示。

  具体到这个 MyElement 类型的定义：
  type MyElement = {
    tagName: string;
    src: string;
    [key: string]: any;
  }

  tagName 和 src 是必须的属性，分别是字符串类型。
  除了 tagName 和 src，MyElement 类型的对象可以有任意多的其他属性，这些属性的键必须是字符串，值可以是任意类型。

  例如，以下都是有效的 MyElement 对象：
  const element1: MyElement = {
    tagName: 'img',
    src: 'image.png'
  };

  const element2: MyElement = {
    tagName: 'input',
    src: 'icon.png',
    type: 'text', // 额外的属性
    placeholder: 'Enter your name' // 额外的属性
  };
  在 element2 的例子中，type 和 placeholder 是根据索引签名 [key: string]: any; 添加的额外属性。
  这种方式提供了类型定义的灵活性，允许对象拥有除了已定义属性之外的任意数量的其他属性。
*/

// const element = {
//   tagName: 'img',
//   src: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
//   alt: '百度logo'
// } as MyElement;
// console.log(element.alt); // 没有类型提示

const element = {
  tagName: 'img',
  src: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
  alt: '百度logo',
} satisfies MyElement;
console.log(element.alt); // 有类型提示