'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ROOT_API: '"http://127.0.01:80"',
  DATA_API: '"http://127.0.01:80"',
  WEB_URL: '"http://127.0.01:80"',
  GOOGLE_API_KEY: '"++GOOGLE_API_KEY++"'
})
