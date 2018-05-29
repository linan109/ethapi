const extend = require('extend');
const MongoClient = require('mongodb').MongoClient;
const mongodb = async (opt) => {
    let options = extend(true, {}, (opt||{}));
    let key = `${options.host}_${options.port}_${options.db}`;
    if (!global.mongodbPool) {
        global.mongodbPool = {};
    }
    if (global.mongodbPool[key]) {
        let db = global.mongodbPool[key].db;
        global.mongodbPool[key].number++;
        return db;
    }
    let url = `mongodb://${options.host}:${options.port}/${options.db}`;
    try{
        let client = await MongoClient.connect(url, {
            "poolSize": 200,
            "reconnectTries": 86400,
            "reconnectInterval": 1000,
        });
        global.mongodbPool[key] = {
            db: client.db(options.db),
            number: 1
        };
        return global.mongodbPool[key].db;
    }catch(e){
        console.log(e)
    }
}
module.exports = mongodb;
