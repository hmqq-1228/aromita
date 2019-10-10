'use strict'
const target = process.env.npm_lifecycle_event;
let obj;

if (target == 'devtest') {
  //测试服
  obj = {
    NODE_ENV: '"production"',
    API_ROOT: '"https://aromita.panduo.com.cn"'
  }
} else {
  //正式服
  obj = {
    NODE_ENV: '"production"',
    API_ROOT: '"https://www.aromitajewelry.com"'
  }
}

module.exports = obj;