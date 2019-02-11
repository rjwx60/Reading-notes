
/** 
 * TS 下的类
*/

class Person {
	public name: string;
	public surname: string;
	public age: number = 0;
	constructor(name: string, surname: string){
		this.name = name;
		this.surname = surname;
	}
	greet(){
		var msg = `Hi my name is ${ this.name }`;
		msg += `I'm ${ this.age }`;
	}
}

/** 
 * TS 编译为 JS 后的类

//  使用 IIFE 包装对象声明
var Person = (function () {

	// 同名函数，用以创建类实例
    function Person(name, surname) {
		// 普通变量通过构造函数继承，变为实例属性
        this.age = 0;
        this.name = name;
        this.surname = surname;
	}

	// 方法通过原型继承，变为类属性，所有实例共享
    Person.prototype.greet = function () {
        var msg = "Hi my name is " + this.name;
        msg += "I'm " + this.age;
    };
    return Person;
}());

*/




/** 
 * TS 下的类继承
*/
class SuperHero extends Person{
	public superpower: string;
	constructor(name: string, surname: string, superpower: string){
		super(name, surname);
		this.superpower = superpower;
	}
	useSuperPower(){
		return `my super power is ${ this.superpower }`;
	}
}


/** 
 * TS 编译为 JS 后的类继承

//  避免重复建立 __extends
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {

		extendStatics = 
						// 设置对象的新原型 (对象 或 null)
						// 其 polyfill 关键句为 obj.__proto__ = newObj;
						Object.setPrototypeOf ||

						// 前半句意义不明
						({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
						
						// 当 for - in 遍历对象实例时，迭代的是实例属性
						// 当 for - in 遍历对象时，迭代的是类属性，此处是拷贝类属性
						function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
						
        return extendStatics(d, b);
	};
	
    return function (d, b) {
		extendStatics(d, b);
		
		// 修正指向
        function __() { this.constructor = d; }
		d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		
		// 一步: d.__proto__ = b
		// 二步: function __() { this.constructor = d; }
		//		__.prototype = b.prototype
		//		d.prototype = new __()
    };
})();


var SuperHero = (function (_super) {

	__extends(SuperHero, _super);
	
    function SuperHero(name, surname, superpower) {

        var _this = _super.call(this, name, surname) || this;
        _this.superpower = superpower;
        return _this;
    }
    SuperHero.prototype.useSuperPower = function () {
        return "my super power is " + this.superpower;
	};
	
	return SuperHero;
	
}(Person));

*/




/** 
 * TS 下的类的私有、保护、公有变量
*/
class pppTest{
	private privateValue = 1;
	protected protectedValue = 2;
	public publicValue = 3;

	private privateWay(){
		return 'private';
	}
	protected protectedWay(){
		return 'protected';
	}
	public public(){
		return 'public';
	}
}




/** 
 * TS 编译为 JS 后的私有、保护、公有变量

//  由于性能原因，TS在运行时不会模拟私有变量
var pppTest = (function () {
    function pppTest() {
        this.privateValue = 1;
        this.protectedValue = 2;
        this.publicValue = 3;
    }
    pppTest.prototype.privateWay = function () {
        return 'private';
    };
    pppTest.prototype.protectedWay = function () {
        return 'protected';
    };
    pppTest.prototype.public = function () {
        return 'public';
    };
    return pppTest;
}());

*/
