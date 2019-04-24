# js 中的原型和原型链
## 什么是原型？
无论什么时候，只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个 `prototype` 属性，这个属性指向函数的原型对象。在默认情况下，所有原型对象都会自动获得一个 `constructor`（构造函数）属性，这个属性包含一个指向`prototype` 属性所在函数的指针。举例：
```js
const Person = function(name) {
    this.name = name
}
console.log(Person.prototype.constructor === Person) // true
```
在上例中，`Person.prototype.constructor` 指向 `Person`。而通过这个构造函数，我们还可继续为原型对象添加其他属性和方法。
## 实例对象与构造函数的关系

```js
const person1 = new Person('小明')
console.log(person1) // Person {name: "小明"}
```
上面的 `person1` 就是实例对象，`Person` 就被我们叫做 `构造函数` 。

构造函数的 `prototype` 属性与它创建的实例对象的`[[prototype]]`属性指向的是同一个对象，即 `实例对象.__proto__ === 构造函数.prototype`，所以：

```js
console.log(person1.__proto__ === Person.prototype) // true
```

## 原型链

- 每个对象都拥有一个隐藏的属性`[[prototype]]`，指向它的原型对象，这个属性可以通过`Object.getPrototypeOf(obj)` 或 `obj.__proto__` 来访问。

- 原型对象同样也有一个隐藏的属性`[[prototype]]`，指向它的原型对象。
- 通过`__proto__` 属性将对象和原型连接起来，就组成了原型链。

### 原型链的作用

当试图访问一个对象的属性时，它不仅仅在该对象上搜寻，还会搜寻该对象的原型，以及该对象的原型的原型，依次层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾。

```js
// 让我们从一个自身拥有属性a和b的函数里创建一个对象o：
let f = function () {
   this.a = 1;
   this.b = 2;
}

let o = new f(); // o: {a: 1, b: 2}
// 在f函数的原型上定义属性
f.prototype.b = 3;
f.prototype.c = 4;

/* 
不要在f函数的原型上直接定义 f.prototype = {b:3,c:4};这样会直接打破原型链
o.[[Prototype]] 有属性 b 和 c   (其实就是o.__proto__或者o.constructor.prototype)
o.[[Prototype]].[[Prototype]] 是 Object.prototype.
最后o.[[Prototype]].[[Prototype]].[[Prototype]]是null
这就是原型链的末尾，即 null，
根据定义，null 没有[[Prototype]].
综上，整个原型链如下: 
{a:1, b:2} ---> {b:3, c:4} ---> Object.prototype---> null
*/
console.log(o.a); // 1
//a是o的自身属性吗？是的，该属性的值为1

console.log(o.b); // 2
// b是o的自身属性吗？是的，该属性的值为2
// 原型上也有一个'b'属性,但是它不会被访问到.这种情况称为"属性遮蔽 (property shadowing)"

console.log(o.c); // 4
// c是o的自身属性吗？不是，那看看原型上有没有
// c是o.[[Prototype]]的属性吗？是的，该属性的值为4

console.log(o.d); // undefined
// d是o的自身属性吗？不是,那看看原型上有没有
// d是o.[[Prototype]]的属性吗？不是，那看看它的原型上有没有
// o.[[Prototype]].[[Prototype]] 为 null，停止搜索
// 没有d属性，返回undefined
```

## 总结

- `Object` 是所有对象的爸爸，所有对象都可以通过 `__proto__` 找到它
- `Function` 是所有函数的爸爸，所有函数都可以通过 `__proto__` 找到它
- 函数的 `prototype` 是一个对象
- 对象的 `__proto__` 属性指向原型， `__proto__` 将对象和原型连接起来组成了原型链
- 对象里找不到的属性会到原型里去找

