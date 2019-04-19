## 引用

``` js
const session = require('koa-session')
```

## 使用

``` js
app.use(session({
    key: 'yo', // cookie 的名称
    maxAge: 7200000, // cookie 的过期时间， 默认 1 day
}, app))
```

## 保存 cookie 信息

``` js
ctx.session.user = {
    name: name,
    ...
}
```

## 验证

``` js
if (ctx.session.user) {
    ...
}
```



