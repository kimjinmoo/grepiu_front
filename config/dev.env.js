'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ROOT_API : '"https://conf.grepiu.com"',
  DATA_API : '"https://data.grepiu.com"'
})
