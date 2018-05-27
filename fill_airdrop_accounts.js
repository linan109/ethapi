const accounts = require(__dirname + '/accounts');
const moment = require('moment');
const BigNumber = require('bignumber.js');
const Web3 = require('web3');
const fs = require("fs");
const config = require(__dirname + '/config');
const utils = require(__dirname + '/utils');

const eth_limit = 0.1;  // 0.1 eth
const token_limit = 10000;   // 10000 CST token
const eth_amount = 0.1;   // 0.1 eth
const token_amount = 10000;   // 10000 CST token

const data = fs.readFileSync(__dirname + '/token.abi');
var sleep_time = 90 * 1000;


var main = async function(){
  while(true){
    console.log(moment().format());
    var sent = false;
    accounts.forEach(function(account, index){
      contract.methods.balanceOf(account['address']).call((err, balance) => {
        console.log(account['address'], 'cnn', balance / 10 ** 18);
        if (balance / 10 ** 18 < token_limit && !sent){
          // 转Token
          sent = true;
          console.log(account['address'], "start fill cnn");
          contract.methods.transfer(account['address'], new BigNumber(token_amount * 10 ** 18)).send({from: '0x0B333270875bcE086BF1D1CeE699AA043bDdd302', gas:config.gas_amount, gasPrice: (config.gas_price * (10 ** 9)).toString()}, (err, resp) => {console.log(account['address'], err, resp);});
        }
      });
      web3.eth.getBalance(account['address'], (err, balance) => {
        console.log(account['address'], 'eth', balance / 10 ** 18);
        if (balance / 10 ** 18 < eth_limit && !sent){
          // 转eth
          sent = true;
          console.log(account['address'], "start fill eth");
          web3.eth.sendTransaction({from: '0x0B333270875bcE086BF1D1CeE699AA043bDdd302', to: account['address'], value: new BigNumber(eth_amount * 10 ** 18)), gas:config.gas_amount, gasPrice: (config.gas_price * (10 ** 9)).toString()}, (err, resp) => {console.log(account['address'], err, resp);})
        }
      });
    });
    await sleep(sleep_time);
  }
}

main();
