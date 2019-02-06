/** 
 * 类特性
 * 1. 构造函数部分 —— 供实例化对象复制使用
 * 2. 构造函数外直接通过点语法添加部分 —— 实例对象无法访问
 * 3. 类的原型中 —— 通过原型链间接访问，供所有实例化对象使用
 */





// 一、类式继承
function Father(){
	this.faValue = 'father';
}
Father.prototype.getValue = function(){
	return this.faValue;
}

function Son(){
	this,soValue = 'son';
}
Son.prototype.getValue = function(){
	return this.soValue;
}

// 继承关键：
Son.prototype = new Father();

// 缺点：
// 1. 父类构造函数中引用类型值受多个实例影响；
// 2. 无法传参：子类继承通过其原型对父类的实例化实现，因而无法向父类传参，无法对父类构造函数内的属性初始化




// 二、构造函数继承
function Father1(id){
	this.cars = ['BMW'];
	this.id = id || '001';
}
Father1.prototype.getCars = function(){
	return this.cars;
}

function Son1(id){
	// 继承关键
	Father1.call(this, id);
}

// 优点：
// 1. 可传参，继承父类构造函数中的属性

// 缺点：
// 1. 父类原型方法没有被继承



// 三、组合继承
function Father2(name){
	this.cars = ['BMD'];
	this.name = name || 'Simoth';
}
Father2.prototype.getName = function(){
	return this.name;
}
function Son2(name){
	// 继承关键1
	Father2.call(this, name);
	this.time = new Date();
}
Son2.prototype.getTime = function(){
	return this.time;
}

// 继承关键2 
Son2.prototype = new Father2();

// 优点：
// 1. 可传参，继承父类构造函数中的属性
// 2. 继承父类原型，且父类构造函数中引用类型值相对独立





// 附加：原型继承
function inheritObject(o){
	// 中间对象
	function F(){}
	// 令中间对象原型继承父对象
	F.prototype = o;
	// 返回中间对象实例，此实例原型继承了父对象(或父对象原型，或父对象，看传参的值)
	return new F();
}

// 特点：
// 原型继承是对类式继承的封装，中间对象 相当于 类式继承中的子类，但又区别于类式：
// 返回的是中间对象的实例对象，与类式继承同样的缺点，但引入了一种思想


// 附加：寄生式继承
// 声明基类对象：
var book = {
	name: 'Alex',
	age: 24
};
function createBook(book){
	// 通过原型继承创建新对象
	var obj = inheritObject(book);
	// 拓展对象
	obj.getAge = function(){
		return this.age;
	}
	// 返回拓展后的新对象
	return obj;
}

// 特点：
// 寄生式继承是对原型继承的封装，这次封装中对继承的对象进行了拓展



// 四、寄生组合式继承
function inheritPrototype(sonClass, FatherClass){
	// 复制一份父类的原型副本
	var p = inheritObject(sonClass.prototype);
	// 修正因为重写子类原型导致的子类 constructor 属性被修改
	p.constructor = sonClass;
	// 设置子类原型
	sonClass.prototype = p;
}


function Fahter3(name){
	this.name = name;
	this.cas = ['BBT'];
}
Fahter3.prototype.getName = function(){
	return this.name;
}

function Son3(time){
	// 继承关键1
	Fahter3.call(this, name);
	this.time = time;
}
Father3.prototype.getTime = function(){
	return this.time;
}


// 继承关键2
inheritPrototype(Son3, Father3);