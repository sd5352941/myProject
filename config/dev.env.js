  'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://175.178.40.9:3001"',

  BASE_API: '"http://127.0.0.1:3001"',
})
