# node 中的文件路径

 `__dirname`, `__filename`, `process.cwd()`, `./` 或者 `../`，

前三个都是绝对路径，为了便于比较，`./` 和 `../` 我们通过 `path.resolve('./')`来转换为绝对路径。

先看一个简单的栗子：

假如我们有这样的文件结构：

```sh
app/
    -lib/
        -common.js
    -model
        -task.js
        -test.js
```

在 task.js 里编写如下的代码：

```sh
var path = require('path');

console.log(__dirname);
console.log(__filename);
console.log(process.cwd());
console.log(path.resolve('./'));
```

在 `model` 目录下运行 `node task.js` 得到的输出是：

```sh
/Users/guo/Sites/learn/app/model
/Users/guo/Sites/learn/app/model/task.js
/Users/guo/Sites/learn/app/model
/Users/guo/Sites/learn/app/model
```

然后在 `app` 目录下运行 `node model/task.js`，得到的输出是：

```js
/Users/guo/Sites/learn/app/model
/Users/guo/Sites/learn/app/model/task.js
/Users/guo/Sites/learn/app
/Users/guo/Sites/learn/app
```

那么，不好意思不是问题来了~T_T,我们可以得出一些**肤浅的结论**了：

- __dirname: 总是返回被执行的 js 所在文件夹的绝对路径
- __filename: 总是返回被执行的 js 的绝对路径
- process.cwd(): 总是返回运行 node 命令时所在的文件夹的绝对路径
- ./: 跟 process.cwd() 一样、一样、一样的吗？

那么关于 `./` 正确的结论是：

在 `require()` 中使用是跟 `__dirname` 的效果相同，不会因为启动脚本的目录不一样而改变，在其他情况下跟 `process.cwd()` 效果相同，是相对于启动脚本所在目录的路径。

### 总结：

只有在 `require()` 时才使用相对路径(./, ../) 的写法，其他地方一律使用绝对路径，如下：

```javascript
// 当前目录下
path.dirname(__filename) + '/test.js';
// 相邻目录下
path.resolve(__dirname, '../lib/common.js');
```