'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  ROOT_API : '"http://localhost:8010"',
  DATA_API : '"http://localhost:8010"'
})
