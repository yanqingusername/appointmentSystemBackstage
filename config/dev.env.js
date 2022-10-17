'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
  // BASE_API: '"http://xmr.coyotebio-lab.com/lis_classes"',
  //本地
  //BASE_API: '"http://182.92.117.128:8201"',
  // BASE_API: '"8.130.48.31"',
  //肖老师的服务器
   //BASE_API: '"http://xmr.coyotebio-lab.com:8301"',
  //自己的服务器
  //  BASE_API: '"http://prod.coyotebio-lab.com:8995"',
   BASE_API: '"http://182.92.117.128:8995"',
   

})
