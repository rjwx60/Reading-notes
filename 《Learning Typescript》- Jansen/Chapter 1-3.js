/**
 * 函数类型
 */
//  写法1: 定义函数元素类型
function A(name) {
    return "Hi " + name;
}
// 写法2: 定义函数元素类型 + 函数本身类型
var B;
B = function (name) {
    return "Hi " + name;
};
// 写法3: 将写法2综合
var C = function (name) {
    return "Hi " + name;
};
/**
 * 函数参数 - 可选、默认、剩余
 */
function D(arg1, arg2, arg3) {
    if (arg3 === void 0) { arg3 = 4; }
    var arg4 = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        arg4[_i - 3] = arguments[_i];
    }
    console.log("args1", arg1);
    console.log("args2", arg2);
    console.log("args3", arg3);
    console.log("args4", arg4);
}
D(1, null, null, 2, 3, 4);
// args1 1
// args2 null
// args3 null
// args4 [ 2, 3, 4 ]
D(1, undefined, undefined, 2, 3, 4);
// args1 1
// args2 undefined
// args3 4
// args4 [ 2, 3, 4 ]
/**
 * 函数重载 - 略
 */
/**
 * 函数作用域 - 略
 */
/**
 * 泛型
 */
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
var Order = /** @class */ (function () {
    function Order() {
    }
    return Order;
}());
function getThings(cb) {
    cb([]);
}
getThings(function (userList) {
    if (userList === void 0) { userList = [{ name: 'alex', age: 1 }]; }
    for (var i = 0; i < userList.length; i++) {
        console.log(userList[i]);
    }
});
getThings(function (orderList) {
    if (orderList === void 0) { orderList = [{ id: 422, total: 11, items: [] }]; }
    for (var i = 0; i < orderList.length; i++) {
        console.log(orderList[i]);
    }
});
