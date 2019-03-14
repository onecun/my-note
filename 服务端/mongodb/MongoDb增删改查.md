# 创建数据库

``` shell
mongod:
	mongod --dbpath dir  # 打开或新建一个数据库
	# mongod --dbpath E:\mongodb\mydb
mongo:
	use dbname # 新建叫做 dbname 的数据库， 同时进入 dbname
```
# 初步操作 
``` shell
show dbs # 查看所有的数据库
show collections # 查看当前库下所有的 集合
	
# 在叫做 collectionName 的集合中插入一条文档，如果集合不存在，则新建该集合
db.collectionName.insert(obj)
# 查找名为 collectionName 集合的所有文档
db.collectionName.find()
	
```

# 导入数据

```  shell
# 假设 C:\user\db\test.json 是 1000 条文档
mongoimport --db test --collection user --drop --file C:\user\db\test.json
# 以上操作会把 test.json 里的文档全部导入到 数据库test -> 集合user 中
	--db 导入到哪个库
	--collection 导入到哪个集合
	--drop 清空集合中原有文档
	--file 要导入的文件路径
```

# 查找

假设集合名叫 `user`

``` shell
# 查询所有文档
db.user.find()
# 查询 k 的值为 v 的所有文档
db.user.find({k: v})
```

## and 操作

``` shell
# 查询 k1 的值为 v1 且 k2 的值为 v2 的所有文档
db.user.find({k1: v1, k2: v2})
```

## or 操作

``` shell
# 查询 k1 的值为 v1 或 k2 的值为 v2 的所有文档
db.user.find({$or: [{k1: v1}, {k2: v2}]})
```

## 比较(大于，小于)

``` shell
db.user.find({k: {$gt: v}}) # 查询 k 的值大于 v 的文档
db.user.find({k: {$lt: v}}) # 查询 k 的值小于 v 的文档
$gt 大于
$lt 小于
# 组合
db.user.find({k: {$gt: v1, $lt: v2}}) # 查询 k 的值大于 v1 同时小于 v2 的文档
```

# 更新

``` shell
db.user.update(
{k: v1},  # 查询条件
{
    $set: {k: v2} # 把查到的 k 改为 v2
}
)
```

## 更新详细语法

``` shell
db.user.update(
   <query>, # 查询条件
   <update>, # 更新方式，如 $set, $inc 等
   {
     multi: <boolean>, # (可选)默认为 false，只匹配找到的第一条， 如果为 true, 所有满足条件的都匹配
   }
)
```

#  删除

``` shell
db.dropDatabase() # 删除当前所在数据库
db.user.drop() # 删除名为 user 的集合
db.user.remove({k: v}) # 删除匹配到的所有 k 值为 v 的文档
db.user.remove({k: v}, {justOne: true}) # 删除第一个匹配到的所有 k 值为 v 的文档
db.user.remove({}) # 清空 user 集合
```

# 排序

``` shell
db.user.find({查询条件}).sort({k1: 1}, {k2: -1})
# 按照 k1 来排序， 如果 k1 的值相同，按照 k2 来排序
# 1 升序, -1 降序
```

