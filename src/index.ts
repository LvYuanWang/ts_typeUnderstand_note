/* 枚举 */
// 不使用枚举
type Gender = "男" | "女";
type Color = "red" | "blue" | "green";
type Direction = "up" | "down" | "right" | "left";
type Status = "success" | "error" | "warning";
type Weekday = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

function fn(color: Color) {
  switch (color) {
    case "red":
      console.log("red");
      break;
    case "blue":
      console.log("blue");
      break;
    case "green":
      console.log("green");
      break;
  }
}

// 但是这样当我每次想改Color中的值时，我还需要去fn函数中修改，这样不够灵活
fn("green");  // green


// 使用枚举
// 枚举创建好之后, 本身就有映射
// 字符串->数字   字符串->字符串
enum enumColor {
  Red = "red",
  Blue = "blue",
  Green = "green",
  Yellow = "yellow"
}

function enumColorFn(color: enumColor) {
  switch (color) {
    case enumColor.Red:
      console.log(color)
      break;
    case enumColor.Blue:
      console.log(color)
      break;
    case enumColor.Green:
      console.log(color)
      break;
    case enumColor.Yellow:
      console.log(color)
      break;
  }
}

enumColorFn(enumColor.Green);   // green

enum enumStatus {
  Success = 200,
  Error = 500,
  Warning = 300
}

function checkStatus(status: enumStatus) {
  switch (status) {
    case enumStatus.Success:
      console.log(status);
      // todo something...
      break;
    case enumStatus.Error:
      console.log(status);
      // todo something...
      break;
    case enumStatus.Warning:
      console.log(status);
      // todo something...
      break;
  }
}

checkStatus(enumStatus.Error);  // 500

// 双向映射
enum enumDirection {
  Up,
  Down,
  Right = "right",
  Left = "left"
}

const upValue = enumDirection.Up;
console.log(upValue);  // 0
const upKey = enumDirection[upValue];
console.log(upKey);  // Up


console.log(enumDirection[99]); // undefined: 不会报错

const n: number = 11;
const dir: enumDirection = n;  // 不报错

enum AttackType {
  // Decimal            // Binary
  None = 0,             // 0000
  Melee = 1,            // 0001
  Fire = 2,             // 0010
  Ice = 4,              // 0100
  Poison = 8            // 1000
}

// 攻击的位运算   属性: 近战 | 火 | 毒
const attack = AttackType.Melee | AttackType.Fire | AttackType.Poison;

// 根据传入的攻击方式, 进行相应的处理
const attackMethod = (attack: AttackType) => console.log(attack);

attackMethod(AttackType.Poison);  // 8
attackMethod(attack);  // 11
attackMethod(AttackType.Melee | AttackType.Fire);  // 3


// 常量枚举(编译时会被删除, 不会生成真实的对象, 也不会生成反向映射)
const enum Tools {
  Computer,
  Phone,
  Pad
}

console.log(Tools.Computer);  // 0
// console.log(Tools[0]); // 报错: 常量枚举不会生成反向映射