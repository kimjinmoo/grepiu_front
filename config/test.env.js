'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  ROOT_API : '"https://conf.grepiu.com"',
  DATA_API : '"https://data.grepiu.com"'
})
