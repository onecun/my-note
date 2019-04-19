### Object.defineProperty(obj, prop, descriptor)

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



### Object.assign(target, ...sources)   [详细](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

**`Object.assign()`** 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。

`target`目标对象。 `sources`源对象

