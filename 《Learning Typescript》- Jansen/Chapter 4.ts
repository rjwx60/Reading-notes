/** 
 * SOLID - OOP开发原则
 * 
 * SRP - 单一职责原则
 * OCP - 开/闭原则
 * LSP - 里式替换原则
 * ISP - 接口隔离原则
 * DIP - 依赖反转原则
 */


// 例子1:
class Person{
	public name: string;
	public surname: string;
	public email: string;

	// 在用 new 关键字创建类实例时用到 constructor
	constructor(
		name: string,
		surname: string,
		email: string
	){
		this.name = name;
		this.surname = surname;
		this.email = email;
		// 不遵循SRP原则，增加了一个与 Person 类行为无关联的方法
		if(this.validateEmail()){
			this.email = email;
		}else{
			this.email = undefined;
			throw new Error("Invalid email");
		}
	}

	greet(){
		console.log("Hi");
	}
	// 不遵循SRP原则，增加了一个与 Person 类行为无关联的方法
	validateEmail(){
		return /\S+@\S+\.\S+/.test(this.email);
	}
}

// 在用 new 关键字创建类实例时用到 constructor
var me: Person = new Person('alex', 'aaa', "xxx@yyy.com");



// 例子1改进:
// 将 Email 验证单独抽离成块
class Email{
	private email: string;
	constructor(
		email: string
	){
		if(this.validateEmail(email)){
			this.email = email;
		}else{
			throw new Error("Invalid email");
		}
	}
	private validateEmail(email: string){
		return /\S+@\S+\.\S+/.test(email);
	}
	get(): string{
		return this.email;
	}
}

// 此后可作为工具类使用
class Person1{
	public name: string;
	public surname: string;
	public email: Email;
	constructor(
		name: string,
		surname: string,
		email: Email
	){
		this.name = name;
		this.surname = surname;
		this.email = email;
	}
	greet(){
		console.log("Hi");
	}
}

// 亦可单独使用
var email = new Email("xxx@yy.com");
console.log(email.get());
// xxx@yy.com






/** 
 * 接口 - 暂不明
*/






/** 
 * 类之间的关系: 关联、聚合、组合 - 暂不明
*/






/** 
 * 继承
 * 通过 extend 继承
 * 通过 super 引用父类构造函数
 * 避免过多层级继承，>4 将损害封装性并增加复杂度
*/
class Teacher extends Person1{
	public subjects: Array<string>;
	constructor(
		name: string,
		surname: string,
		email: Email,
		subjects: Array<string>
	){
		super(name, surname, email)
		this.subjects = subjects;
	}
	greet(){
		console.log("No Hi");
	}
	teach(){
		console.log("No Hi");
	}
}
var teacher: Teacher = new Teacher('roman', 'rrrr', new Email('zzz@www.com'), ['chinese','english']);
teacher.greet();
// No Hi


class SchoolPrincipal extends Teacher{
	manageTeacher(){
		console.log("No Hi Again");
	}
}
var principal: SchoolPrincipal = new SchoolPrincipal('rohal', 'hhh', new Email('kkk@jj.com'), []);
principal.greet();
// No Hi
principal.manageTeacher();
// No Hi Again






/** 
 * 混合
 * 通过 implements 混合
 * 限制一: 仅能继承一级方法和属性
 * 限制二: 多类中的同名方法，后者覆盖前者
*/
class Animail{
	eat(): string{
		return 'eating';
	}
}
class Mammal extends Animail{
	breathe(): string{
		return "mammal";
	}
	move(): string{
		return "mammal move";
	}
}
class WingedAnimal extends Animail{
	fly(): string{
		return "wingedanimal"
	}
	move(): string{
		return "wingedanimal move";
	}
}
class Bat implements Mammal, WingedAnimal{
	eat: () => string;
	fly: () => string;
	breathe: () => string;
	move: () => string;
}

// 将此函数传入以应用混合效果
function applyMixins(derivedCtor: any, baseCtors: any[]){
	baseCtors.forEach(baseCtor => {
		Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
			if(name !== 'constructor'){
				derivedCtor.prototype[name] = baseCtor.prototype[name];
			}
		})
	})
}

applyMixins(Bat, [Mammal, WingedAnimal]);
var bat: Bat = new Bat();

// console.log(bat.fly());
// wingedanimal

// console.log(bat.breathe());
// mammal

// console.log(bat.move());
// wingedanimal move

// console.log(bat.eat());
// bat.eat is not a function





/** 
 * 范型类
 * 同范型函数，均为了避免重复代码
 */

class U1{
	public name: string;
	public password: string;
}
class B1{
	public title: string;
	public decription?: string;
	public language?: string;
	public price: string;
}
class NoGUR1{
	private user: U1[];
	constructor(url: U1[]){
		this.user = url;
	}
	public getSomething(){
		return function(user: U1[]){
			var item = <U1[]>this.user;
			console.log(item);
		}
	}
}
class NoGUR2{
	private book: B1[];
	constructor(book: B1[]){
		this.book = book;
	}
	public getSomething(){
		return function(book: B1[]){
			var item = <B1[]>this.book;
			console.log(item);
		}
	}
}
// 使用泛型
class GUR<T>{
	private target: T[];
	constructor(target: T[]){
		this.target = target;
	}
	public getSomething(){
		var item = <T[]>this.target;
		return function(){
			console.log(item);
		}
	}
}
var userA = new GUR<U1>([{name: 'alex', password: '123'}])
var bookA = new GUR<B1>([{title: '《Hole》', price: '49$'}])

userA.getSomething()();
bookA.getSomething()();






/** 
 * 范型约束(单个)
 * 约束范型类型
 * 通过 implements 声明范型约束
*/
interface ValidatableInterface{
	isValid(): boolean;
}
class U2 implements ValidatableInterface{
	public name: string;
	public password: string;
	public isValid(): boolean {
		return true;
	}
}
class B2 implements ValidatableInterface{
	public title: string;
	public decription?: string;
	public language?: string;
	public price: string;
	public isValid(): boolean {
		return true;
	}
}

// 使用泛型约束(单个)
class GUR2<T extends ValidatableInterface>{
	private target: T[];
	constructor(target: T[]){
		this.target = target;
	}
	public getSomething(){
		var item = <T[]>this.target;
		console.log(item[0].isValid());
		return function(){
			console.log(item[0].isValid());
		}
	}
}
var userB = new GUR2<U2>([{name: 'alex', password: '123',isValid: function(){return true}}])
var bookB = new GUR2<B2>([{title: '《Hole》', price: '49$', isValid: function(){return true}}])

userB.getSomething()();
bookB.getSomething()();






/** 
 * 范型约束(多个)
 * 约束范型类型
 * 通过 extends 构建超接口，即多个接口合并一个
*/
interface FirstInterface{
	doSomeThing(): string;
}
interface SecondInterface{
	doOtherThing(): string;
}
class U3 implements FirstInterface, SecondInterface{
	public name: string;
	public password: string;
	public doSomeThing(): string {
		return "U3 F doSomeThing";
	}
	public doOtherThing(): string {
		return "U3 F doOtherThing";
	}
}
class B3 implements FirstInterface, SecondInterface{
	public title: string;
	public decription?: string;
	public language?: string;
	public price: string;
	public doSomeThing(): string {
		return "B3 S doSomeThing";
	}
	public doOtherThing(): string {
		return "B3 S doOtherThing";
	}
}
// 要先合并为超接口
interface AllInterface extends FirstInterface, SecondInterface{}

// 使用泛型约束(多个)
class GUR3<T extends AllInterface>{
	private target: T[];
	constructor(target: T[]){
		this.target = target;
	}
	public getSomething(){
		var item = <T[]>this.target;
		return function(){
			console.log(item[0].doSomeThing());
			console.log(item[0].doOtherThing());
		}
	}
}
var userC = new GUR3<U3>([{name: 'alex', password: '123', doSomeThing: function(){return 's'}, doOtherThing: function(){return 'ss'}}])
var bookC = new GUR3<B3>([{title: '《Hole》', price: '49$', doSomeThing: function(){return 'a'}, doOtherThing: function(){return 'aa'}}])

userC.getSomething()();
bookC.getSomething()();





/** 
 * 范型中的 new 操作
 * 应使用 type: { new(): T } 来代替 type: T
 * 实践后报错
*/

// class MyClass{}

// function factory<T>(): T{
// 	// Error
// 	// return new T()   

// 	// Right
// 	var type: { new(): T ;};
// 	return new type();
// }
// var myClass: MyClass = factory<MyClass>();






/** 
 * 其他的原则 - 暂不明
*/





/** 
 * 命名空间和模块 - great = 待
 */