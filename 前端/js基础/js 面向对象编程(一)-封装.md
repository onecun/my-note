# Javascript 面向对象编程（一）：封装

参考：[阮一峰老师的博客](<http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_encapsulation.html>)

Javascript是一种基于对象（object-based）的语言，我们遇到的所有东西几乎都是对象。但是，它又不是一种真正的面向对象编程（OOP）语言，因为它的语法中没有`class`（类）的概念。那么，如果我们要把"属性"（property）和"方法"（method），封装成一个对象，甚至要从原型对象生成一个实例对象，我们应该怎么做呢？

## 1. 工厂模式(改进的原始模式)

这种模式抽象了创建具体对象的过程,用函数来封装以特定接口创建对象的细节:

```js
const creatPerson = function(name, age) {
    return {
        name: name,
        age: age,
        sayName: function() {
            console.log(this.name)
        },
    }
}
// 生成实例对象的过程其实就是调用这个函数
const xcmy = creatPerson('小明', 23)
const xchw = creatPerson('小花', 22)
xcmy.sayName() // 小明
console.log(xchw.age) // 22
```

### 弊端

工厂模式虽然解决了创建多个相似对象的问题，但却没有解决对象识别的问题（即怎样知道一个对象的类型），也不能反映实例之间的联系

---

## 构造函数模式(构造器模式)

为了解决从原型对象生成实例的问题，Javascript提供了一个构造函数（Constructor）模式。所谓"构造函数"，其实就是一个普通函数，但是内部使用了`this`变量。对构造函数使用`new`运算符，就能生成实例，并且`this`变量会绑定在实例对象上。重写 `Person`：

```js
const Person = function(name, age) {
    this.name = name
    this.age = age
    this.sayName = function() {
        console.log(this.name)
    }
}
// 生成实例就是 new Person,
// 现在的 Person 函数叫做构造函数
const xcmy = new Person('小明', 23)
const xchw = new Person('小花', 22)
xcmy.sayName() // 小明
console.log(xchw.age) // 22
```

这时`xcmy`和`xchw`会自动含有一个`constructor`属性，指向它们的构造函数。
``` js
console.log(xcmy.constructor == Person); //true
console.log(xchw.constructor == Person); //true
```
创建自定义的构造函数意味着将来可以将它的实例标识为一种特定的类型，而这正是构造函数模式胜过工厂模式的地方。
Javascript 还提供了一个`instanceof`运算符，验证原型对象与实例对象之间的关系。

```js
console.log(xcmy instanceof Person); //true
console.log(xchw instanceof Person); //true
```

### 使用 new 创建实例对象发生了什么？

要创建 Person 的新实例，必须使用 new 操作符。以这种方式调用构造函数实际上会经历以下 4个步骤：

1. 创建一个新对象；
2. 将构造函数的作用域赋给新对象（因此 this 就指向了这个新对象）；
3. 执行构造函数中的代码（为这个新对象添加属性）；
4. 返回新对象。

创建自定义的构造函数意味着将来可以将它的实例标识为一种特定的类型；而这正是构造函数模式胜过工厂模式的地方。

### 弊端

每个用 `new` 创建出来的实例对象都拥有同样的属性和方法，但是方法(method) 对于每个实例都是一模一样的内容，每次生成一个实例，都必须重复同样的内容，多占用一些内存。这样既不环保，也缺乏效率

## 原型模式(Prototype模式)

Javascript规定，每一个构造函数都有一个`prototype`属性，指向另一个对象。这个对象的所有属性和方法，都会被构造函数的实例继承。这意味着，我们可以把那些不变的属性和方法，直接定义在`prototype`对象上。

```js
const Person = function(name, age) {
    this.name = name
    this.age = age
}
Person.prototype.sayName = function() {
    console.log(this.name)
}
// 生成实例就是 new Person,
// 现在的 Person 函数叫做构造函数
const xcmy = new Person('小明', 23)
const xchw = new Person('小花', 22)
xcmy.sayName() // 小明
console.log(xchw.age) // 22
console.log(xcmy.sayName === xchw.sayName) // true
```

这时所有实例的`sayName()`方法，其实都是同一个内存地址，指向 `prototype` 对象，因此就提高了运行效率。

### Prototype模式的验证方法

为了配合 `prototype` 属性，`Javascript` 定义了一些辅助方法，帮助我们使用它。

#### isPrototypeOf()

这个方法用来判断，某个`proptotype`对象和某个实例之间的关系。
```js
console.log(Person.prototype.isPrototypeOf(xcmy)); //true
console.log(Person.prototype.isPrototypeOf(xchw)); //true
```
#### hasOwnProperty()

每个实例对象都有一个`hasOwnProperty()`方法，用来判断某一个属性到底是本地属性，还是继承自`prototype`对象的属性。

```js
console.log(xcmy.hasOwnProperty("name")) // true
console.log(xcmy.hasOwnProperty("sayName")) // false
```
#### in运算符
`in`运算符可以用来判断，某个实例是否含有某个属性，不管是不是本地属性。
```js
console.log("name" in xcmy); // true
console.log("sayName" in xcmy); // true
```
`in`运算符还可以用来遍历某个对象的所有属性。

```js
for(let prop in xcmy) { 
    console.log("xcmy[" + prop + "]=" + xcmy[prop])
}
```