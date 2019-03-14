# 使用 parcel

## 安装

``` sh
npm install -g parcel-bundler
# 或
yarn global add parcel-bundler
```

## 使用

```sh
# 自动构建 并启动服务器
parcel index.html # -p <port number> 覆盖默认端口
# 自动构建， 不启动服务器
parcel watch index.html
```

parcel 会自动打包 index.html 和其中引入的文件

# 在 parcel 中使用 babel

## 安装 babel

``` sh
npm install babel-preset-env
```

接着，创建一个 `.babelrc`:

```js
{
  "presets": ["@babel/preset-env"]
}
```

