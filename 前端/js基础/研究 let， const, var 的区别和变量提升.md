## 变量提升

对于这个问题，我们应该先来了解提升（hoisting）这个概念。

```js
console.log(a) // undefined
var a = 1
```

从上述代码中我们可以发现，虽然变量还没有被声明，但是我们却可以使用这个未被声明的变量，这种情况就叫做提升，并且提升的是**声明**。

上面的代码实际的运行顺序：

```js
var a
console.log(a) // undefined
a = 1
```

接下来我们再来看一个例子

```js
var a = 10
var a
console.log(a)
```

对于这个例子，如果你认为打印的值为 `undefined` 那么就错了，答案应该是 `10`，对于这种情况，我们这样来看代码

```js
var a
var a
a = 10
console.log(a)
```

到这里为止，我们已经了解了 `var` 声明的变量会发生提升的情况，其实不仅变量会提升，函数也会被提升。

```js
console.log(a) // ƒ a() {}
function a() {}
var a = 1
```

对于上述代码，打印结果会是 `ƒ a() {}`，即使变量声明在函数之后，这也说明了函数会被提升，并且优先于变量提升。

函数提升优先于变量提升，函数提升会把整个函数挪到作用域顶部，变量提升只会把声明挪到作用域顶部

## var 和  let , const 的区别

### 变量提升上的区别

- `var` 存在提升，我们能在声明之前使用。`let`、`const` 因为暂时性死区的原因，不能在声明前使用

  ```js
  console.log(a) // undefind
  var a = 1
  
  console.log(b) // 报错， b is not defined
  let b = 2
  ```

### 作用域上的区别

- `var` 在全局作用域下声明变量会导致变量挂载在 `window` 上，其他两者不会

``` js
var a = 1
console.log(a, window.a, ) // 1  1

let b = 2
const c = 3
console.log(b, c, window.b, window.c) // 2 3 undefined undefined
```

- `var` 以**函数**为单位限制作用域, `let` 和 `const` 以 大括号 `{}` 为单位限制作用域

```js
var foo = function() {
    if(true) {
        var foo1 = 1
        let foo2 = 2
    }
    console.log(foo1) // 能访问的， 1
    console.log(foo2) // 访问不到报错，foo2 is not defined
}

console.log(foo1) // 访问不到报错，foo1 is not defined
	
```

## function a() {} 与 const a = function() {}  

## function 和 箭头函数 () => {}