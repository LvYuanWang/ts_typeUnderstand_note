## satisfies

`satisfies`是一个类型操作符，它是`TS4.9`的新功能。和类型断言`as`功能比较类似，但是比类型断言更加安全也更加智能，因为他能在满足类型安全的前提下，自动帮我们做类型收窄和类型提示。

```typescript
interface IConfig {
  a: string | number
}

// Error   类型 "{}" 中缺少属性 "a"，但类型 "IConfig" 中需要该属性。
const legacy: IConfig = {}
// 但是使用legacy.a竟然不会报错
console.log(legacy.a)

// 这样做并不安全，因为{}中并没有属性a
const legacyAs = {} as IConfig
// 直接调用竟然也不会报错
console.log(legacyAs.a)

// Error 类型 "{}" 中缺少属性 "a"，但类型 "IConfig" 中需要该属性。
const current = {} satisfies IConfig
// 调用也会报错
console.log(current.a)

//const currentWithValue:IConfig = { a: 2 } 
//currentWithValue.a.toFixed() //error 类型string|number上不存在属性toFixed

//const currentWithValue = { a: 2 } as IConfig
//currentWithValue.a.toFixed() //error 类型string|number上不存在属性toFixed

const currentWithValue = { a: 2 } satisfies IConfig
// 此时使用 a 的时候会自动推断我们声明的类型,不再是联合类型
// satisfies关键字可以帮助我们反向推导
currentWithValue.a.toFixed() 
```

再比如在某些映射类型中：

```typescript
type MyElement = {
  tagName: string;
  src: string;
  [key: string]: any;
};

const element:MyElement = {
  tagName: "img",
  src: "https://example.com/image.png",
  alt: "Example Image"
};

console.log(element.alt) // 没有类型提示
```

可以使用`satisfies`

```typescript
const element = {
  tagName: "img",
  src: "https://example.com/image.png",
  alt: "Example Image"
} satisfies MyElement;

console.log(element.alt)
```
