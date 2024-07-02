/* never */

// 示例 1
// type A = string & number;   // never

// type Foo = string | number | boolean | undefined | null | void | never; // 发现 never 会被排除掉

// type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

// function request(url: string, method: Method) {
//     if (method === 'GET') {
//         console.log(method, url);
//     } else if (method === 'POST') {
//         console.log(method, url);
//     } else {
//         // 通过 never 类型来检查是否有未知的类型, 如果有未知的类型, 就会报错
//         const _neverCheck: never = method;
//         console.log(method);
//         throw new Error(`不知道的类型: ${_neverCheck}`)
//     }
// }

// request('http://www.baidu.com', 'GET');


// 示例 2
type Circle = { kind: 'circle', radius: number };
type Rect = { kind: 'rect', width: number, height: number };
type Triangle = { kind: 'triangle', base: number, height: number };
type Shape = Circle | Rect | Triangle;

function area(shape: Shape) {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'rect':
      return shape.width * shape.height;
    case 'triangle':
      return shape.base * shape.height / 2;
    default:
      const _neverCheck: never = shape;
      throw new Error(`不知道的类型: ${_neverCheck}`);
  }
}


// 示例 3
function fn(): never {
  throw new Error('报错了');
}

function foo(n: number) {
  if (n > 10) {
    fn(); // 当 fn() 返回 never 类型时, 下面的代码就不会被执行, 显示的是无法访问的代码
    let name = 'foo'; // 这里的 name 会被认为是无法访问的代码
    // ...
  }
}


/*
在 TypeScript 中，`never` 类型通常用于表示永远不会发生的情况。它在以下几个方面经常被使用：

1. 异常处理：当一个函数抛出一个异常并且不会返回任何值时，可以将其返回类型标注为 `never`。这表示函数在抛出异常后不会继续执行，因此后续的代码也不会被执行。

2. 永远不会返回的函数：有些函数可能会陷入无限循环或者是无法正常结束，这种情况下可以将其返回类型标注为 `never`。这样做可以帮助编译器进行类型推断，并且确保在调用这些函数时不会出现类型错误。

3. 类型推断的辅助类型：当 TypeScript 编译器无法推断出一个表达式的类型时，可以使用 `never` 类型作为辅助类型来帮助编译器进行类型推断。通过将一个表达式的类型标注为 `never`，可以告诉编译器该表达式永远不会产生任何值。

总之，`never` 类型在 TypeScript 中用于表示不可能发生的情况，它可以帮助我们在编译时捕获潜在的错误，并提供更好的类型推断和类型安全性。
*/
