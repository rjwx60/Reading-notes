/**
 * 函数类型
 */

//  写法1: 定义函数元素类型
function A(name: string): string{
	return `Hi ${name}`;
}

// 写法2: 定义函数元素类型 + 函数本身类型
var B: (name: string) => string;

B = function(name:string):string{
	return `Hi ${name}`;
}

// 写法3: 将写法2综合
var C: (name: string) => string = function(name: string): string{
	return `Hi ${name}`;	
}



/** 
 * 函数参数 - 可选、默认、剩余
 */
function D(arg1: number, arg2 ? : number, arg3 = 4, ...arg4: Array<number>){
	console.log("args1", arg1);
	console.log("args2", arg2);
	console.log("args3", arg3);
	console.log("args4", arg4);
}

D(1,null,null,2,3,4);
// args1 1
// args2 null
// args3 null
// args4 [ 2, 3, 4 ]

D(1,undefined,undefined,2,3,4);
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
  * 泛型函数
  * 旨在减少各类型的信息重复 - 暂不明
  */

class User {
	name: string;
	age: number;
}

class Order{
	id: number;
	total: number;
	items: any[];
}

function getThings<T> (tag: number, cb: (list: T[]) => void ): void{

	// 仅作约束类型使用，不能赋予真值
	var data: T[];

	if(tag == 1){
		cb(data)
	}else if(tag == 2){
		cb(data)
	}
}

getThings<User>(1, function(userList: User[] = [{name: 'alex', age: 22}]){
	for(let i = 0; i < userList.length; i++){
		console.log("user" + userList[i])
	}
})

getThings<Order>(2, function(orderList: Order[] = [{id: 11, total: 100, items: []}]){
	for(let i = 0; i < orderList.length; i++){
		console.log("order" + orderList[i])
	}
})


/** 
 * tag 函数和标签模板 - 暂不明
*/