const accounts = require(__dirname + '/accounts');
const moment = require('moment');
const BigNumber = require('bignumber.js');
const fs = require("fs");
const config = require(__dirname + '/config');
const utils = require(__dirname + '/utils');
const sendSync = require(__dirname + 'transfer');

config.connection.connect();

// TODO 只是写了个执行框架，需要对细节做一些处理，进行测试
var main_loop = async function(){
  while (true) {
    # 读取未完成的tx信息
    let tx_sql = "SELECT tx, airdrop_address from airdrop_list where status = 'pending'";
    let tx_results = await connection.query(tx_sql);
    results.foreach(function(result){
      config.web3.eth.getTransaction(result.tx).then(function(resp){
          // 返回值不为none，即表示发送被确认
          // 这里的sql调用需要调试，以及返回的错误处理
          if (resp){
            connection.query("update airdrop_list set status = 'success', trancation_time = " + moment().format() + " where tx = '" + result.tx + "'");
            connection.query("update airdrop_account_list set status = 'idle' where airdrop_address = '" + result.airdrop_address + "'")
          }
      });
    })
    });
    await utils.sleep(1 * 1000);

    # 读取idle的空头账户
    let addr_sql = "SELECT airdrop_address from airdrop_account_list where status = 'idle'";
    let addr_results = await connection.query(addr_sql);
    }

    # 读取需要空投的记录
    let airdrop_sql = "select id, address, amount from airdrop_list where status = 'ready' limit " + len(addr_results);
    let airdrop_results = await connection.query(addr_sql);

    # 处理空投
    for (let i=0; i<len(airdrop_results), i++){
      let {err, tx} = await sendSync(airdrop_results[i].address, airdrop_results[i].amount, addr_results[i].airdrop_address);
      if (err == null){
         connection.query("update airdrop_list set status = 'pending', tx = '" + tx + " where id = '" + airdrop_results[i].id + "'");
         connection.query("update airdrop_account_list set status = 'pending' where airdrop_address = '" + addr_results[i].airdrop_address + "'");
      }
    }


    await utils.sleep(60 * 1000);
  }
}

main_loop();
