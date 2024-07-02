/* 字面量类型检查(可辩识联合类型) */

// type UserTextEvent = { value: string, target: HTMLInputElement };
// type UserMouseEvent = { value: number, target: HTMLButtonElement };

// type UserEvent = UserTextEvent | UserMouseEvent;

// 分析 UserEvent 联合类型, 当通过if进入控制流分析时, UserEvent的属性类型
// type UserEvent = {
//     value: string | number;
//     target: HTMLInputElement | HTMLButtonElement;
// };
// value: string --> target: HTMLInputElement | HTMLButtonElement;
// value: number --> target: HTMLInputElement | HTMLButtonElement;

// function handle(event: UserEvent) {
//     if (typeof event.value === 'string') {
//         console.log(event.value);
//         // 发现此时的event.target任然是HTMLInputElement | HTMLButtonElement
//         console.log(event.target);
//     } else {
//         console.log(event.value);
//         // 发现此时的event.target任然是HTMLInputElement | HTMLButtonElement
//         console.log(event.target);
//     }
// }

// 通过增加type属性, 可以让控制流分析更加精确
type UserTextEvent = { type: "TextEvent", value: string, target: HTMLInputElement };
type UserMouseEvent = { type: "MouseEvent", value: number, target: HTMLButtonElement };

type UserEvent = UserTextEvent | UserMouseEvent;

function handle(event: UserEvent) {
    if (event.type === 'TextEvent') {
        console.log(event.value);
        // 现在的event.target则是 HTMLInputElement
        console.log(event.target);
    } else {
        console.log(event.value);
        // 现在的event.target则是 HTMLButtonElement
        console.log(event.target);
    }
}

handle({ type: "MouseEvent", value: 1, target: document.createElement('button') })

// 比如要顶一个类型别名 Shape, 如果有circle, 就应该有radius属性, 如果有rect, 就应该有width和height属性
type Circle = {
    kind: "circle",
    radius: number
}

type Rect = {
    kind: "rect",
    width: number,
    height: number
}

type Shape = Circle | Rect;

// 可辨识联合类型: 通过kind字面量类型来区分不同的类型, 目的就是方便做类型收窄及控制流分析
function area(shape: Shape) {
    if (shape.kind === 'circle') {
        return Math.PI * shape.radius ** 2;
    } else {
        return shape.width * shape.height
    }
}