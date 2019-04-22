# Object.defineProperty(obj, prop, descriptor)

`obj` 要在其上定义属性的对象。

`prop` 要定义或修改的属性的名称。

`descriptor` 将被定义或修改的属性描述符。

exp: 

```js
Object.defineProperty(obj, "key", {
  enumerable: false,
  configurable: false,
  writable: false,
  value: "static"
});
```

# Object.assign(target, ...sources)   [详细](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

**`Object.assign()`** 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。

`target`目标对象。 `sources`源对象

```js
var b = Object.assign({
    c: 2,
}, {
    a: 1,
})
console.log(b) // {c:2, a:1}
```

# MessageChannel() 消息通道 [详细](https://zhuanlan.zhihu.com/p/37589777)

从`MessageChannel`名称上我们就能对其含义知晓个大概。`消息通道`-的确，这个接口允许我们创建一个新的消息通道，并通过它的两个`messagePort`属性发送数据。

直白的说，这个api会创建一个管道，管道的两端分别代表一个`messagePort`，都能够通过`portMessage`向对方发送数据，通过`onmessage`来接受对方发送过来的数据。

![](https://pic1.zhimg.com/v2-b99c322a971f0d4e44049ce207acbb50_r.jpg)

```js
const ch = new MessageChannel()
const port1 = ch.port1
const port2 = ch.port2

port1.onmessage = function(d) {
    console.log(`port1接收的消息是：${d.data}`)
}

port2.onmessage = function(d) {
    console.log(`port2接收的消息是：${d.data}`)
}

// 发送消息
port1.portMessage('port1发送的消息')
port2.portMessage('port2发送的消息')
```