## number与bigint

有了上面boolean类型的说明，其他的基本数据类型基本一致

> bigint是ES11(ES2020)新增的一种基本数据类型，在JS中，可以用 Number 表示的最大整数为 2^53 - 1，可以写为 Number.MAX_SAFE_INTEGER。如果超过了这个界限，那么就可以用 BigInt 来表示，它可以表示任意大的整数。
>
> 在一个整数字面量后面加 n 的方式定义一个 bigint，或者调用函数 BigInt()
>
> **注意这里强调的问题：ES11（ES2020），如果编译的时候没有指定tsconfig的target（指定代码编译成的版本）和lib（TSC假定运行代码的环境）为es2020以上的版本，或者执行tsc的时候，没有指定--target为es2020以上版本，将会编译报错**

```javascript
let a = 123;
let b = Infinity * 0.10;
const c = 567;
let d = a < b;
let e: number = 100;
let f: 26.218 = 26.218;
// let g: 26.218 = 10; // error 不能将类型10分配给类型26.218

let a1 = 1234n;
const b1 = BigInt(1234);
const b2 = 1234n;;
let d1 = a < a1;
// let e1 = 1234.5n; // error bigint字面量必须是整数
// let f1: bigint = 1234; // error 不能将类型number分配给类型bigint
let g1: bigint = 100n; 
let h1: 100n = 100n;
```

1. **可以让TS推导出值的类型为number/bigint（a，b，a1，b1）**
2. **可以明确的告诉TS，值的类型为number/bigint（e，f1）**
3. **可以明确的告诉TS，值为某个具体的number/bigint值（e，f，g，g1，h1）**
4. **可以让TS推导出(const)值为某个具体的number/bigint值（c，b2）**

## string

与boolean和number形式是一样的，而且string字符串形式同样有单引号`''`,双引号`""`和模板字符串``的形式

> 模板字符串还可以有其他的作用，这个在后期再给大家介绍

