### [阮一峰 ES6/promise](http://es6.ruanyifeng.com/#docs/promise)

# Promise 的含义

Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了`Promise`对象。

`Promise`对象有以下两个特点。

（1）对象的状态不受外界影响。`Promise`对象代表一个异步操作，有三种状态：`pending`（进行中）、`fulfilled`（已成功）和`rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。

（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。`Promise`对象的状态改变，只有两种可能：从`pending`变为`fulfilled`和从`pending`变为`rejected`。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对`Promise`对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

# 基本用法

``` javascript
// resolve, reject 由 js 引擎部署
const p = new Promise((resolve, reject) => {
    console.log('yo.')
    // some code
 
    // 是当前的 Promise 对象的状态从 'pending' 变为 'resolved' 成功
    // 并且不再改变
    resolve('hello resovle'）
    // reject 让状态从 'pending' 变为 'reject' 失败
	// reject(err)
})
// Promise 内部的代码，会在 new 的时候立即执行

// Promise 状态为 resolve 时，执行 then()
p.then((value) => {
    // resolve 会把他的参数传给 then()
    console.log(value) // 'hello resolve'
})
.catch((err) => {
    // 在 Promise 状态为 reject 时执行
    // 或 前面的 then() 发生错误时执行
    console.log(err)
})
```

# 方法精讲

Promise 的常用 API 如下：

- Promise.resolve(value)

> 类方法，该方法返回一个以 value 值解析后的 Promise 对象 1、如果这个值是个 thenable（即带有 then 方法），返回的 Promise 对象会“跟随”这个 thenable 的对象，采用它的最终状态（指 resolved/rejected/pending/settled）
>  2、如果传入的 value 本身就是 Promise 对象，则该对象作为 Promise.resolve 方法的返回值返回。
>  3、其他情况以该值为成功状态返回一个 Promise 对象。

上面是 resolve 方法的解释，传入不同类型的 value 值，返回结果也有区别。这个 API 比较重要，建议大家通过练习一些小例子，并且配合上面的解释来熟悉它。如下几个小例子：

```
//如果传入的 value 本身就是 Promise 对象，则该对象作为 Promise.resolve 方法的返回值返回。  
function fn(resolve){
    setTimeout(function(){
        resolve(123);
    },3000);
}
let p0 = new Promise(fn);
let p1 = Promise.resolve(p0);
// 返回为true，返回的 Promise 即是 入参的 Promise 对象。
console.log(p0 === p1);
复制代码
```

传入 thenable 对象，返回 Promise 对象跟随 thenable 对象的最终状态。

> ES6 Promises 里提到了 Thenable 这个概念，简单来说它就是一个非常类似 Promise 的东西。最简单的例子就是 jQuery.ajax，它的返回值就是 thenable 对象。但是要谨记，并不是只要实现了 then 方法就一定能作为 Promise 对象来使用。

```
//如果传入的 value 本身就是 thenable 对象，返回的 promise 对象会跟随 thenable 对象的状态。
let promise = Promise.resolve($.ajax('/test/test.json'));// => promise对象
promise.then(function(value){
   console.log(value);
});
复制代码
```

返回一个状态已变成 resolved 的 Promise 对象。

```
let p1 = Promise.resolve(123); 
//打印p1 可以看到p1是一个状态置为resolved的Promise对象
console.log(p1)
复制代码
```

- Promise.reject

> 类方法，且与 resolve 唯一的不同是，返回的 promise 对象的状态为 rejected。

- Promise.prototype.then

> 实例方法，为 Promise 注册回调函数，函数形式：fn(vlaue){}，value 是上一个任务的返回结果，then 中的函数一定要 return 一个结果或者一个新的 Promise 对象，才可以让之后的then 回调接收。

- Promise.prototype.catch

> 实例方法，捕获异常，函数形式：fn(err){}, err 是 catch 注册 之前的回调抛出的异常信息。

- Promise.race

> 类方法，多个 Promise 任务同时执行，返回最先执行结束的 Promise 任务的结果，不管这个 Promise 结果是成功还是失败。 。

- Promise.all

> 类方法，多个 Promise 任务同时执行。
>  如果全部成功执行，则以数组的方式返回所有 Promise 任务的执行结果。  如果有一个 Promise 任务 rejected，则只返回 rejected 任务的结果。

# 方法详解

## Promise.prototype.then()

Promise 实例具有`then`方法，也就是说，`then`方法是定义在原型对象`Promise.prototype`上的。它的作用是为 Promise 实例添加状态改变时的回调函数。前面说过，`then`方法的第一个参数是`resolved`状态的回调函数，第二个参数（可选）是`rejected`状态的回调函数。`then`方法返回的是一个新的`Promise`实例（注意，不是原来那个`Promise`实例）。因此可以采用链式写法，即`then`方法后面再调用另一个`then`方法。

``` javascript
p.then(val => {
    return val
    // return val 会让 val 作为 下一个 then() 的参数
}).then(val => {
    console.log(val)
}).then(...)
```

## Promise.prototype.catch()

`Promise.prototype.catch`方法是`.then(null, rejection)`或`.then(undefined, rejection)`的别名，用于指定发生错误时的回调函数。

```javascript
p(val).then(() => {
  // ...
}).catch((err) => {
  // 处理 p(val) 和 前一个回调函数运行时发生的错误
  console.log('发生错误！', err)
})
```

## Promise.prototype.finally()

`finally`方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。

```javascript
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
```

上面代码中，不管`promise`最后的状态，在执行完`then`或`catch`指定的回调函数以后，都会执行`finally`方法指定的回调函数。

## Promise.all()

`Promise.all`方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

```javascript
const p = Promise.all([p1, p2, p3]);
```

上面代码中，`Promise.all`方法接受一个数组作为参数，`p1`、`p2`、`p3`都是 Promise 实例，如果不是，就会先调用下面讲到的`Promise.resolve`方法，将参数转为 Promise 实例，再进一步处理。（`Promise.all`方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。）

`p`的状态由`p1`、`p2`、`p3`决定，分成两种情况。

（1）只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`，此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数。

（2）只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。

## Promise.race()

类似 Promise.all(), 区别在于 下面代码中，只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。

```javascript
const p = Promise.race([p1, p2, p3]);
```

