// node mongodb 版本 v3.1.13 适用
const MongoClient = require('mongodb').MongoClient
const log = console.log.bind(console)


class Dao {
    /**
     * 构造函数
     * @param {string} url 
     * @param {string} dbname
     * @param {string} colname
     */
    constructor(url, dbname, colname) {
        this.url = url
        this.dbname = dbname
        this.colname = colname
    }

    /**
     * 连接数据库
     */
    _connect() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.url,{useNewUrlParser:true}, (err, client) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(client)
                }
            })
        })
    }

    /**
     * 插入文档
     * @param {arr || object} documents 
     * @param {boolean} insertMany 
     * 使用 insertMany(arr), 在 arr === [] 时，会报错
     */
    insert(documents, insertMany = false) {
        return new Promise((resolve, reject) => {
            this._connect().then((client) => {
                let col = client.db(this.dbname).collection(this.colname)
                if(insertMany) {
                    col.insertMany(documents).then((res) => {
                        resolve(res)
                    }).catch((err) => {
                        log(err)
                    })
                    client.close()
                } else {
                     col.insertOne(documents).then((res) => {
                        resolve(res)
                    }).catch((err) => {
                        log(err)
                    })
                    client.close()
                }
            }).catch((err) => {
                reject(err)
            })
        })
    }
    
    /**
     * 查询
     * @param {object} document 
     */
    query(document, pageConfig) {
        document = document || {}
        pageConfig = pageConfig || {}
        let page = pageConfig.page
        let amount = pageConfig.amount
        const resData = []

        return new Promise((resolve, reject) => {
            this._connect().then((client) => {
                let col = client.db(this.dbname).collection(this.colname)
                let cursor = col.find(document).limit(amount).skip((page - 1) * amount)
                cursor.each((err, data) => {
                    if(err) {
                        reject(err)
                        client.close()
                    } else if(data !== null) {
                        resData.push(data)
                    } else {
                        resolve(resData)
                        client.close()
                    }
                })
            }).catch((err) => {
                log(err)
            })

        })
    }

    /**
     * 删除集合中的数据
     * @param {object} query 
     * @param {boolean} deleteMany 
     */
    delete(query, deleteMany = false) {
        return new Promise((resolve, reject) => {
             this._connect().then((client) => {
                let col = client.db(this.dbname).collection(this.colname)
                if(deleteMany) {
                    col.deleteMany(query).then((res) => {
                        resolve(res)
                        client.close()
                    })
                } else {
                    col.deleteOne(query).then((res) => {
                        resolve(res)
                        client.close()
                    })
                }
             }).catch((err) => {
                 log(err)
             })
        })
    }

    /**
     * 更新
     * @param {obj} filter 
     * @param {obj} updater 
     */
    update(filter, updater) {
        let uptaterCpy = {$set: updater}

        return new Promise((resolve, reject) => {
            this._connect().then((client) => {
                let col = client.db(this.dbname).collection(this.colname)
                col.updateMany(filter, uptaterCpy).then((res) => {
                    resolve(res)
                    client.close()
                })
            }).catch((err) => {
                log(err)
            })
        })
    }
}

let url = 'mongodb://localhost:27017'
let dbname = 'test'
let colname = 'user'
let dao = new Dao(url, dbname, colname)

let arr = []
for (let i = 0; i < 20; i++) {
    arr.push({
        userid: '234',
        age: i
    })
}
