const sleep = function(ms){
  return new Promise(resolve=>{
    setTimeout(resolve, ms);
  })
}

var utils = {
  sleep: sleep,
}

module.exports = utils;
