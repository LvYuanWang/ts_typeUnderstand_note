function fn(color) {
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
fn("green"); // green
// 使用枚举
// 枚举创建好之后, 本身就有映射
// 字符串->数字   字符串->字符串
var enumColor;
(function (enumColor) {
    enumColor["Red"] = "red";
    enumColor["Blue"] = "blue";
    enumColor["Green"] = "green";
    enumColor["Yellow"] = "yellow";
})(enumColor || (enumColor = {}));
function enumColorFn(color) {
    switch (color) {
        case enumColor.Red:
            console.log(color);
            break;
        case enumColor.Blue:
            console.log(color);
            break;
        case enumColor.Green:
            console.log(color);
            break;
        case enumColor.Yellow:
            console.log(color);
            break;
    }
}
enumColorFn(enumColor.Green); // green
var enumStatus;
(function (enumStatus) {
    enumStatus[enumStatus["Success"] = 200] = "Success";
    enumStatus[enumStatus["Error"] = 500] = "Error";
    enumStatus[enumStatus["Warning"] = 300] = "Warning";
})(enumStatus || (enumStatus = {}));
function checkStatus(status) {
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
checkStatus(enumStatus.Error); // 500
// 双向映射
var enumDirection;
(function (enumDirection) {
    enumDirection[enumDirection["Up"] = 0] = "Up";
    enumDirection[enumDirection["Down"] = 1] = "Down";
    enumDirection["Right"] = "right";
    enumDirection["Left"] = "left";
})(enumDirection || (enumDirection = {}));
var upValue = enumDirection.Up;
console.log(upValue); // 0
var upKey = enumDirection[upValue];
console.log(upKey); // Up
console.log(enumDirection[99]); // undefined: 不会报错
var n = 11;
var dir = n; // 不报错
var AttackType;
(function (AttackType) {
    // Decimal            // Binary
    AttackType[AttackType["None"] = 0] = "None";
    AttackType[AttackType["Melee"] = 1] = "Melee";
    AttackType[AttackType["Fire"] = 2] = "Fire";
    AttackType[AttackType["Ice"] = 4] = "Ice";
    AttackType[AttackType["Poison"] = 8] = "Poison"; // 1000
})(AttackType || (AttackType = {}));
// 攻击的位运算   属性: 近战 | 火 | 毒
var attack = AttackType.Melee | AttackType.Fire | AttackType.Poison;
// 根据传入的攻击方式, 进行相应的处理
var attackMethod = function (attack) { return console.log(attack); };
attackMethod(AttackType.Poison); // 8
attackMethod(attack); // 11
attackMethod(AttackType.Melee | AttackType.Fire); // 3
console.log(0 /* Tools.Computer */); // 0
// console.log(Tools[0]); // 报错: 常量枚举不会生成反向映射
