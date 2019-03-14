# 创建数据库

``` shell
mongod:
	mongod --dbpath dir  # 打开或新建一个数据库
	# mongod --dbpath E:\mongodb\mydb
mongo:
	use dbname # 新建叫做 dbname 的数据库
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

``` shell
# 假设 C:\user\db\test.json 是 1000 条文档
mongoimport --db test --collection user --file C:\user\db\test.json
# 以上操作会把 test.json 里的文档全部导入到 数据库test -> 集合user 中

```

