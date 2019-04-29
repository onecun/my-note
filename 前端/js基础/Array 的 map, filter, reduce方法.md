# map, filter, reduce

map, filter, reduce 各自有什么作用？

## map

`map` 作用**遍历**原数组，将每个元素拿出来做一些变换然后放入到新的数组中, 然后返回这个新数组。

```js
[1, 2, 3].map((v) => {
    return v + 1
}) 
// [2, 3, 4]
```

另外 `map` 的回调函数接受三个参数，分别是当前***元素*，*索引*，*原数组***

```js
['a','b','c'].map((ele, index, arr) => {
    console.log(ele, index, arr)
})
// a 0 (3) ["a", "b", "c"]
// b 1 (3) ["a", "b", "c"]
// c 2 (3) ["a", "b", "c"]
```

## filter

`filter` 的作用也是生成一个新数组，在**遍历**数组的时候将**返回值**为 `true` 的元素放入新数组，我们可以利用这个函数删除一些不需要的元素

```js
let arr = [1, 2, 4, 5, 6, 7]
let newArray = arr.filter((v) => {
    return v % 2 === 0
})
console.log(newArray) // [2, 4, 6]
```

和 `map` 一样，`filter` 的回调函数也接受三个参数，用处也相同。***元素*，*索引*，*原数组***

## reduce(累计)

`reduce` 可以将数组中的元素通过回调函数最终转换为一个值。如果我们想实现一个功能将函数里的元素全部相加得到一个值，可能会这样写代码

```js
const arr = [1, 2, 3]
let total = 0
for (let i = 0; i < arr.length; i++) {
  total += arr[i]
}
console.log(total) //6 
```

使用 `reduce` 来写

```js
const arr = [1, 2, 3]
const sum = arr.reduce((acc, current) => {
    acc + current
}, 0)
console.log(sum)
```

对于 `reduce` 来说，它接受两个参数，分别是**回调函数和初始值**，接下来我们来分解上述代码中 `reduce` 的过程

- 首先初始值为 `0`，该值会在执行第一次回调函数时作为第一个参数传入
- 回调函数接受四个参数，分别为累计值、当前元素、当前索引、原数组，后三者想必大家都可以明白作用，这里着重分析第一个参数
- 在一次执行回调函数时，当前值和初始值相加得出结果 `1`，该结果会在第二次执行回调函数时当做第一个参数传入
- 所以在第二次执行回调函数时，相加的值就分别是 `1` 和 `2`，以此类推，循环结束后得到结果 `6`

想必通过以上的解析大家应该明白 `reduce` 是如何通过回调函数将所有元素最终转换为一个值的，当然 `reduce` 还可以实现很多功能，接下来我们就通过 `reduce` 来实现 `map` 函数

```
const arr = [1, 2, 3]
const mapArray = arr.map(value => value * 2)
const reduceArray = arr.reduce((acc, current) => {
  acc.push(current * 2)
  return acc
}, [])
console.log(mapArray, reduceArray) // [2, 4, 6]
```