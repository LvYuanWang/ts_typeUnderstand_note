## 字面量类型检查(可辨识联合类型)

再结合着对象的联合类型来看一下问题：

```typescript
type UserTextEvent = { value: string, target: HTMLInputElement};
type UserMouseEvent = { value: number, target: HTMLButtonElement};
type UserEvent = UserTextEvent | UserMouseEvent;

function handle(event: UserEvent) { 
  if (typeof event.value === "string") {
    console.log(event.value)   // event.value类型为string
    console.log(event.target); // event.target类型为 HTMLInputElement | HTMLButtonElement
  } else {
    console.log(event.value)   // event.value类型为number
    console.log(event.target); // event.target类型为 HTMLInputElement | HTMLButtonElement
  }
}
```

`event.value`的类型可以顺利的细化，但是`event.target`却不可以，因为handle函数的参数是`UserEvent`。联合之后的`UserEvent`，其实类似于：

```typescript
type UserEvent = {
  value: string | number,
  target: HTMLInputElement | HTMLButtonElement
}
```

也就是当`value:string`的时候，`target`可以选择`HTMLInputElement | HTMLButtonElement`

也就是当`value:number`的时候，`target`也可以选择`HTMLInputElement | HTMLButtonElement`

因此，Typescript需要一种更可靠的方式，明确对象的并集类型的具体情况。

最常见的方式是，使用**字面量类型进行标记**，这样具体有值的情况下，就相当于在进行值的判断，这样Typescript就能很精确的推导出，具体的对象并集类型到底是哪个类型了

```typescript
type UserTextEvent = { type:"TextEvent", value: string, target: HTMLInputElement};
type UserMouseEvent = { type:"MouseEvent", value: number, target: HTMLButtonElement};
type UserEvent = UserTextEvent | UserMouseEvent;

function handle(event: UserEvent) { 
  if (event.type === "TextEvent") {
    console.log(event.value)   // event.value类型为string
    console.log(event.target); // event.target类型为 HTMLInputElement
  } else {
    console.log(event.value)   // event.value类型为number
    console.log(event.target); // event.target类型为 HTMLButtonElement
  }
}
handle({ type: "TextEvent", value: "hello", target: document.getElementsByTagName("input")[0] });
```

> 一般像这种多个类型的联合类型，并且多个类型含有一个公共可辨识的公共属性的联合类型，还有一个专门的称呼**"可辨识联合类型"**

**可辨识联合类型**对初学者有实际的指导作用，我们在创建类型的时候，就需要想着**最好创建带有可辨识的联合类型，而不是可选字段**

比如，有这样的情况，如果是`circle`的时候，有`radius`属性，如果是`rect`情况，有`width`和`height`属性。对于初学者，很有可能创建成下面的类型：

```typescript
type Shape = {
  kind: "circle" | "rect"
  radius?: number
  width?: number
  height?: number
}

function area(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2; // error shape.radius可能未定义
    case "rect":
      return shape.width * shape.height; // error shape.width，shape.height可能未定义
  }
}
```

上面这种方式kind字段没有与其他字段建立关系，因此，不能保证可选属性是否有值。所以报出了未定义的错误(当然在后面的学习中我们可以使用非空断言`!`处理)。

可辨识的联合类型是一种更好的处理方式：

```typescript
type Circle = { kind: "circle", radius: number }
type Rect = { kind: "rect", width: number, height: number }
type Shape = Circle | Rect;

function area(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rect":
      return shape.width * shape.height;
  }
}
```
