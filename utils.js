const config = require(__dirname + '/config');

const sleep = function(ms){
  return new Promise(resolve=>{
    setTimeout(resolve, ms);
  })
}

const getGasPriceSync = function() {
  return new Promise((resolve, reject)=>{
    config.web3.eth.getGasPrice().then(function(resp){
      resolve(resp);
    });
  })
}

const getTransactionSync = function(tx){
  return new Promise((resolve,reject)=>{
    config.web3.eth.getTransaction(tx).then(function(resp){
        resolve(resp);
    });
  })
}

var utils = {
  sleep: sleep,
  getGasPriceSync: getGasPriceSync,
  getTransactionSync: getTransactionSync,
}

module.exports = utils;
