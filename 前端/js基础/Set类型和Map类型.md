# set 类型(集合)

`Set` 在其他语言里面称为**集合**，是一种和 `Array 相似`的数据结构，不同之处在于, `Set` 中的元素都是不重复的
用法如下:

``` js
var s = new Set()

// add 方法添加元素, 和 push 一样
s.add(1) // Set(1) {1}
s.add(2) // Set(2) {1, 2}

// has 方法检查元素是否在 set 中
s.has(1) // true
s.has(3) // false

// size 属性相当于 length
s.size  // 2

// delete 方法删除一个元素
s.delete(1) // true
s.has(1) // false

s.size  // 1
```
`Set` 类型的主要作用是去重,  但 `js` 没有提供与集合相关的函数，需要我们自己实现。

## 实现集合的基本操作

### 并集 union

``` js
const union = function(thisSet, otherSet) {
    // 初始一个新集合， 用来表示并集
    const unionSet = new Set()
    // 利用 Set 去重的特点把两个集合合并
    const SetToNewSet = function(a, b) {
        b.forEach((e) => {
            a.add(e)
        })
    }
    // 开始合并
    SetToNewSet(unionSet, thisSet)
    SetToNewSet(unionSet, otherSet)
    
    return unionSet
}
```

### 交集 intersection

```js
const intersection = function(thisSet, otherSet) {
    // 初始一个新集合， 用来表示交集
    const intersectionSet = new Set()
    // thisSet 里的值 otherSet 也有， 那就加入 intersectionSet
    thisSet.forEach((e) => {
        if (otherSet.has(e)) {
            intersectionSet.add(e)
        }
    })
    
    return intersectionSet
}
```

### 差集 difference

```js
const difference = function(thisSet, otherSet) {
    // 初始一个新集合， 用来表示交集
    const differenceSet = new Set()
    // thisSet 里的值 otherSet 没有有， 那就加入 differenceSet
    thisSet.forEach((e) => {
        if (!otherSet.has(e)) {
            differenceSet.add(e)
        }
    })
    
    return differenceSet
}
```

# Map 类型(字典)

`Map` 和 `Object` 很相似，在其他语言中 通常会有 `dict` 和 `object` 两种数据结构
现在 `js` 也有独立的 `dict` 那就是 `Map` (其实没多好用)

用法如下:
``` js
var m = new Map()
// set 方法增加一个值
m.set('name', 'gua')
// get 属性得到一个值
m.get('name') // "gua“
// has 判断是否拥有某个属性
m.has('name') // true

// 看起来是比 Object 恶心多了.....
let o = {}
o.name = 'gua'
o.name
```