## 自定义守卫(谓语动词 is)

自定义守卫是指通过 `{形参} is {类型}` 的语法结构，来给**返回布尔值的条件函数**赋予类型守卫的能力

```typescript
function isString (input: any) {
  return typeof input === 'string';
}
function isNumber (input: any) {
  return typeof input === 'number';
}

function foo (input: string | number) {
  if (isString(input)) {
    console.log(input) // 依然是 string | number
  } 
  else if (isNumber(input)) {
    console.log(input) // 依然是 string | number
  }
}
```

**类型收窄只能在同一的函数中**，如果在不同的函数中就不起作用。

只要我们加上谓语动词：

```typescript
function isString (input: any): input is string {
  return typeof input === 'string';
}
function isNumber (input: any): input is number {
  return typeof input === 'number';
}

function foo (input: string | number) {
  if (isString(input)) {
    console.log(input) // string
  } 
  else if (isNumber(input)) {
    console.log(input) // number
  }
}
```

自定义类型守卫在我做一些比较复杂类型判断的时候比较有用

```typescript
type Box = {
  _v_isBox: boolean,
  value: any,
}

function isBox(box: any): box is Box { 
  return box && box._v_isBox === true;
}

function unWrapBox(box: Box) {
  return isBox(box) ? box.value : box;
}
```

上面的这个代码，其实就是简单模拟了一下Vue3中[isRef](https://github.com/vuejs/core/blob/main/packages/reactivity/src/ref.ts#L97)和[unRef](https://github.com/vuejs/core/blob/main/packages/reactivity/src/ref.ts#L234)的ts代码

```typescript
export function isRef(r: any): r is Ref {
  return !!(r && r.__v_isRef === true)
}

export function unref<T>(ref: MaybeRef<T> | ComputedRef<T>): T {
  return isRef(ref) ? ref.value : ref
}
```

其实前面讲的`字面量的类型检查`，`typeof`，`instanceof`，`in`以及`自定义守卫`在Typescript中有统一的称呼，都叫做**类型守卫**，其目的其实都是在控制流分析的时候，帮助typescript收紧类型，便于推断