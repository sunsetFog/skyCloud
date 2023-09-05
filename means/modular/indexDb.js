/*
study: indexDb缓存(本地数据库)
vue中indexDb缓存使用
https://blog.csdn.net/weixin_40457514/article/details/126056535

应用场景：数据量大，前后端请求一次耗时38s，无法接受，用indexDb缓存解决

IndexedDB 也是web存储的一种方式，和sessionStorage和localStorage效果是一样的，但功能更加强大。

IndexDB相当于浏览器提供的本地数据库。IndexedDB 允许储存大量数据，提供查找接口，还能建立索引。总结就是类似与后端数据库但是是阉割版，但是用于存放临时数据，减少请求，提高页面速度也是够用了

（1）键值对储存。数据以"键值对"的形式保存，每一个数据记录都有对应的主键，主键是独一无二的，不能有重复

（2）异步。 IndexedDB 操作时不会锁死浏览器，用户依然可以进行其他操作。异步设计是为了防止大量数据的读写，拖慢网页的表现。

（3）支持事务。 IndexedDB 支持事务（transaction），这意味着一系列操作步骤之中，只要有一步失败，整个事务就都取消，数据库回滚到事务发生之前的状态

（4）同源限制 IndexedDB 受到同源限制，每一个数据库对应创建它的域名。网页只能访问自身域名下的数据库，而不能访问跨域的数据库。

（5）储存空间大 IndexedDB 的储存空间比 LocalStorage 大得多，一般来说不少于 250MB，甚至没有上限。

（6）支持二进制储存。 IndexedDB 不仅可以储存字符串，还可以储存二进制数据
————————————————
原文链接：https://blog.csdn.net/paidaboluo/article/details/125918292


indexDb官网：https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API/Using_IndexedDB
*/
export default {
    // indexedDB兼容
    indexedDB: window.indexedDB || window.webkitindexedDB || window.msIndexedDB || window.mozIndexedDB,
    /**
     * 打开数据库
     * 新对象储存空间newStore参数：newStore.name、newStore.key
     * 新增对象存储空间要更改数据库版本
     * @param {数据库名称} dbname 
     * @param {版本} version 
     * @param {数据库} db 
     * @param {配置} newStore 
     * @param {回调函数} callback 
     */
    openDB(dbname, version, newStore, callback) {
    	let db
        version = version || 1;
        // 打开数据库   window.indexedDB.open()
        const request = this.indexedDB.open(dbname, version);
        // 打开失败
        request.onerror = function () {
            console.log('IndexedDB数据库打开错误');
        };
        // 打开成功
        request.onsuccess = function (event) {
            db = event.target.result;
            if (callback && (typeof callback === 'function')) {
                callback(db);
            }
        };
        // 第一次打开该数据库，或者数据库版本发生变化，会先触发upgradeneeded事件，然后触发success事件
        // onupgradeneeded，调用创建新的储存空间
        request.onupgradeneeded = function (event) {
            db = event.target.result;
            if (newStore) {
                if (!db.objectStoreNames.contains(newStore.name)) {
                    // 添加表
                    const objectStore = db.createObjectStore(newStore.name, {
                        keyPath: newStore.key,
                    });
                    newStore.index.forEach(item => {
                        objectStore.createIndex(item + '_index', item, {
                            unique: false
                        });
                    })
                }
            }
        };
        // 上一次的数据库连接还未关闭
        request.blocked = function (event) {
            console.log('上一次的数据库连接还未关闭');
        };
    },
    /**
     * 删除数据库
     * @param {*} dbname 
     * @param {*} callback 
     */
    deleteDb(dbname, callback) {
        const deleteQuest = this.indexedDB.deleteDatabase(dbname);
        deleteQuest.onerror = function () {
            console.log('删除数据库出错');
        };
        deleteQuest.onsuccess = function () {
            if (callback && (typeof callback === 'function')) {
                callback();
            }
        }
    },
    /**
     * 关闭数据库
     * @param {*} dbname 
     */
    closeDB(dbname) {
        dbname.close();
        console.log('数据库已关闭');
    },
    /**
     * 删除数据
     * @param {*} db 
     * @param {*} table_name 
     * @param {*} key 
     * @param {*} callback 
     */
    deleteData(db, table_name, key, callback) {
        const store = db.transaction(table_name, 'readwrite').objectStore(table_name);
        const request = store.delete(key);
        request.onsuccess = function () {
            if (callback && (typeof callback === 'function')) {
                callback('删除成功');
            }
        }
        request.onerror = function () {
            if (callback && (typeof callback === 'function')) {
                callback('删除失败');
            }
        }

    },
    /**
     * 清空数据
     * @param {*} db 
     * @param {*} table_name 
     * @param {*} callback 
     */
    clearData(db, table_name, callback) {
        const store = db.transaction(table_name, 'readwrite').objectStore(table_name);
        const request = store.clear();
        request.onsuccess = function () {
            if (callback && (typeof callback === 'function')) {
                callback('清空数据成功');
            }
        }
        request.onerror = function () {
            if (callback && (typeof callback === 'function')) {
                callback('清空数据失败');
            }
        }
    },
    /**
     * 添加数据
     * @param {*} db 
     * @param {*} table_name 
     * @param {*} obj 
     */
    addData(db, table_name, list) {
        // console.log("本地数据库-添加", list);
        // 新建事务 涉及对象 和 类型     链式调用选中表
        const store = db.transaction(table_name, 'readwrite').objectStore(table_name);
        list.forEach(ls => {
            // 添加数据
            const request = store.add(ls);
            request.onsuccess = function () {
                console.log('数据写入成功');
            };
            request.onerror = function () {
                console.log('数据写入失败');
            }
        });
    },
    /**
     * 更新数据
     * @param {*} db 
     * @param {*} table_name 
     * @param {*} obj 
     */
    updateData(db, table_name, list) {
        const store = db.transaction(table_name, 'readwrite').objectStore(table_name);
        list.forEach(ls => {
            // 修改数据
            const request = store.put(ls);
            request.onsuccess = function () {
                console.log('数据更新成功');
            };
            request.onerror = function () {
                console.log('数据更新失败');
            }
        })
    },
    /**
     * 根据主键获取数据
     * @param {*} db 
     * @param {*} table_name 
     * @param {*} key 
     * @returns 
     */
    getData(db, table_name, key){
        var objectStore = db.transaction(table_name).objectStore(table_name);
        var request = objectStore.get(key);
        request.onerror = function(event) {
            console.log('事务失败');
        };
        return new Promise((resolve, reject) => {
            request.onsuccess = function (e) {
                resolve(e.target.result)
            }
        })
    },
    /**
     * 根据索引获取数据
     * @param {*} db 
     * @param {*} table_name 
     * @param {*} field 
     * @param {*} val 
     */
    getDataByIndex(db, table_name, field, val) {
        const objectStore = db.transaction(table_name).objectStore(table_name);
        const index = objectStore.index(field + '_index');
        const request = index.get(val);
        return new Promise((resolve, reject) => {
            request.onsuccess = function (e) {
                resolve(e.target.result)
            }
        })
    },
    /**
     * 获取全部数据
     * @param {*} db 
     * @param {*} table_name 
     * @returns 
     */
    getAllData(db, table_name) {
        const objectStore = db.transaction(table_name).objectStore(table_name);
        const request = objectStore.openCursor();

        let data = [];
        return new Promise((resolve, reject) => {
            request.onsuccess = function (e) {
                var cursor = e.target.result;
                if (cursor) {
                    data.push(cursor.value);
                    cursor.continue();
                } else {
                    resolve(data)
                }
            }
        })
    },
    /**
     * 遍历全部数据，判断数据是否已存在于数据库
     * @param {*} allDbData
     * @param {*} list
     * @returns 
     */
     readAllData(allDbData, list){
        let flagIndex
        allDbData.then(res => { 
            flagIndex = res.findIndex(val=>{
                return (val.id == list[0].id)
            })
        })
        return flagIndex
     }
}
