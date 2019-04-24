# Javascript 面向对象编程（二）：构造函数的继承

## 组合继承

原理：使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。举例： 

```js
// 父类
const Person = function(name, age) {
    this.name = name
    this.age = age
}
Person.prototype.sayName = function() {
    console.log(this.name)
}
// 子类
const Male = function(name, age) {
    // 继承属性
    Person.call(this, name, age)
    this.gender = 'male'
}
// 继承方法
Male.prototype = new Person()
// 把新的原型中的 constructor 指回自身
Male.prototype.constructor = Male

// test
const p1 = new Male('whh', 23)
console.log(p1)
// Male {name: "whh", age: 23, gender: "male"}
```
![](<https://user-gold-cdn.xitu.io/2018/9/2/16598168ba89fb31?imageView2/0/w/1280/h/960/format/webp/ignore-error/1>)

### 弊端：调用了两次父类的构造函数，导致原型中产生了无效的属性。

## 寄生组合式继承

原理：通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。主要就是用一个空的构造函数，来当做桥梁，并且把其原型对象指向父构造函数的原型对象，并且实例化一个temp，temp会沿着这个原型链，去找到父构造函数的原型对象。举例：

```js
// 父类
const Person = function(name, age) {
    this.name = name
    this.age = age
}
Person.prototype.sayName = function() {
    console.log(this.name)
}
// 子类
const Male = function(name, age) {
    // 继承属性
    Person.call(this, name, age)
    this.gender = 'male'
}
// 寄生式组合继承
const extend = function(subType, superType) {
    const Temp = function() {}
    // 把Temp构造函数的原型对象指向superType的原型对象
	Temp.prototype = superType.prototype
    // 用构造函数Temp实例化一个实例temp
	let temp = new Temp()
    // 把子构造函数的原型对象指向temp
	subType.prototype = temp 
	// 把temp的constructor指向subType
	temp.constructor = subType
}
// 使用
extend(Male, Person)

// test
const p1 = new Male('whh', 23)
console.log(p1) 
// Male {name: "whh", age: 23, gender: "male"}
```

![](<https://user-gold-cdn.xitu.io/2018/9/2/165982b76386af89?imageView2/0/w/1280/h/960/format/webp/ignore-error/1>)

这个例子的高效率体现在它只调用了一次 `SuperType `构造函数，并且因此避免了在 `SubType.prototype `上面创建不必要的、多余的属性。与此同时，原型链还能保持不变；因此，还能够正常使用`instanceof `和 `isPrototypeOf()`。

### 目前程序猿认为解决继承问题最好的方案

## 其他继承方式(不完美的) 

参考： [掘金地址](<https://juejin.im/post/5b8a8724f265da435450c591#heading-24>)

#### 原型式继承

```
// 原型式继承
function createObjWithObj(obj){ // * 传入一个原型对象
    function Temp(){}
    Temp.prototype = obj
    let o = new Temp()
    return o
}

// * 把Person的原型对象当做temp的原型对象
let temp = createObjWithObj(Person.prototype)

// * 也可以使用Object.create实现
// * 把Person的原型对象当做temp2的原型对象
let temp2 = Object.create(Person.prototype)
```

#### 寄生式继承

```
// 寄生式继承
// 我们在原型式的基础上，希望给这个对象新增一些属性方法
// 那么我们在原型式的基础上扩展
function createNewObjWithObj(obj) {
    let o = createObjWithObj(obj)
    o.name = "whh"
    o.age = 23
    return o
}
```

#### 拷贝继承

```js
const extend2(Child, Parent) {
	let p = Parent.prototype
    let c = Child.prototype
    	for (var i in p) {
　　　　　　	c[i] = p[i]
        }
　　}
```

这个函数的作用，就是将父对象的prototype对象中的属性，一一拷贝给Child对象的prototype对象。使用的时候，这样写：

```js
extend2(Male, Person)
let p1 = new Male("whh", 23);
console.log(p1.age) // 23
```