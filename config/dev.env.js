'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ROOT_API : '"http://192.168.0.8:8010"',
  DATA_API : '"http://192.168.0.8:8010"',
  GOOGLE_API_KEY : '"++GOOGLE_API_KEY++"'
})
