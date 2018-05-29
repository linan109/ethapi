const BigNumber = require('bignumber.js');
const sendSync = require(__dirname + '/transfer');
const config = require(__dirname + '/config');
const utils = require(__dirname + '/utils');
const fs = require('fs');

const getTransactionSync = function(tx){
  return new Promise((resolve,reject)=>{
    config.web3.eth.getTransaction(tx).then(function(resp){
        resolve(resp);
    });
  })
}
from_account = {
  address: '0x0B333270875bcE086BF1D1CeE699AA043bDdd302',
  privateKey: '0xcd16a8025fc18bbfa0d9a18536cb34eb3535b5989d6a84311249a8e6767ebce0'
}

config.web3.eth.accounts.wallet.add(from_account);
let contract = config.contract;

let to_accounts = [
//   {
//   address: '0x20F8Df6086dF911FF810d21839bDc862d0b3216D',
//   amount: 1
// },
]

const send_list = fs.readFileSync(__dirname + '/send_list.txt', 'utf-8');
let accounts = send_list.split('\n');
for(let i=0; i<accounts.length; i++){
  if (accounts[i] != ''){
    let rows = accounts[i].split('\t');
    console.log(i, rows[0], parseInt(rows[1]));
    to_accounts.push({
      address: rows[0],
      amount: parseInt(rows[1])
    });
  }
}

var main = async function(){
  for(let i=0; i<to_accounts.length; i++){
    while(true){
      var gas_price = await utils.getGasPriceSync();
      console.log(gas_price);
      if (gas_price <= config.gas_price * (10 ** 9)){
        break;
      } else {
        console.log("gas_price is too high, wait");
        await utils.sleep(10 * 1000);
      }
    }

    var tx;
    var tx_pending = true;
    let {err, result} = await sendSync(to_accounts[i]['address'], to_accounts[i]["amount"], from_account['address'], gas_price);
    if (!err){
      console.log(to_accounts[i]['address'], err, result);
      tx = result;
    }
    else {
      console.log(to_accounts[i]['address'], "send error occurred");
      console.log("err", err);
      console.log("result", result);
      process.exit();
    }
    while(tx_pending){
      await utils.sleep(20 * 1000);
      console.log("sleep 20s. tx=" + tx);

      let resp = await getTransactionSync(tx);
      if (resp){
        if (resp["blockNumber"] != null){
          tx_pending = false;
          console.log("tx:" + tx + "  verified." );
          console.log(resp);
        }
      }

      console.log("continue waiting");
    }
    console.log("next");
  }
}

main();
