# 正确判断 this

参考： 掘金小册

## 在普通函数中判断

``` js
const foo = function() {
    console.log(this.a)
}
var a = 1
foo()

const obj = {
    a: 2,
    foo: foo,
}
obj.foo()

const c = new foo()

```

- 对于直接调用 `foo` 来说，不管 `foo` 函数被放在了什么地方，`this` 一定是 `window`
- 对于 `obj.foo()` 来说，我们只需要记住，谁调用了函数，谁就是 `this`，所以在这个场景下 `foo` 函数中的 `this` 就是 `obj` 对象
- 对于 `new` 的方式来说，`this` 被永远绑定在了 实例对象上面(就是上面的`c`)，不会被任何方式改变 `this`

## 在箭头函数中判断

箭头函数其实是没有 `this` 的，箭头函数中的 `this` 只取决包裹箭头函数的第一个普通函数的 `this`。举例：

``` js
const a = function() {
    return function() {
        return {
            b: () => {
                console.log(this.c)
            },
            c: 2,
        }
    }
}
var c = 1

a()().b() // 结果： 1
```

上例中，因为包裹箭头函数的第一个普通函数是`a`，所以此时的 `this` 是 `window`。如果把 箭头改为普通函数，结果变为 `2`，此时规则变为普通函数的 `obj.b()`规则。另外对箭头函数使用 `bind` 这类函数是无效的

## bind, call, apply 函数改变 this

对于这些函数来说，`this`取决于第一个参数，如果第一个参数为空，那么就是 `Window`

对函数进行多次 `bind` 操作，函数的 `this` 永远由第一次的 `bind` 决定。举例：

``` js
let a = {}
let fn = function () { console.log(this) }
fn.bind().bind(a)() // 结果： Window
```

## 优先级

以上就是 `this` 的规则了，但是可能会发生多个规则同时出现的情况，这时候不同的规则之间会根据优先级最高的来决定 `this` 最终指向哪里。

首先，`new` 的方式优先级最高，接下来是 `bind` 这些函数，然后是 `obj.foo()`这种调用方式，最后是 `foo` 这种调用方式，同时，箭头函数的 `this` 一旦被绑定，就不会再被任何方式所改变。

一图胜千言![判断this](C:\Users\Apsd\Desktop\练习\我的笔记\前端\js基础\img\判断this.jpg)