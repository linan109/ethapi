const config = require(__dirname + '/config');
const accounts = require(__dirname + '/accounts');
const utls = require(__dirname + '/utils');

// 转Token
function send(address, amount, from_address, callback){
  try{
    config.contract.methods.transfer(address, amount).send({from: from_address, gas:1000000, gasPrice: (config.gas_price * (10 ** 9)).toString()}, callback);
  } catch (e){
    callback(e, null);
  }
}
function sendSync(address, amount, from_address){
  return new Promise(resolve=>{
    const cb = function(err, result){
      resolve({
        "err" : err,
        "result" : result
      });
    }
    try{
      send(address, amount, from_address, cb);
    } catch (e){
      cb(e, null);
  }});
}
module.exports = sendSync;
