let compiler = require('babel-core')
let fs = require('fs')
let utils = require('../utils/utils')
let config = utils.getProjectConfig().js.config
let log = utils.log

// option:https://babeljs.io/docs/usage/api/
module.exports = (path) => {
  compiler.transformFile(path,config, (err, result) => {
    if (err) {
      log.error(err)
      return
    }
    // compile to .js
    path = utils.getOutputFile(path)
    // write in
    utils.write(path, result.code).then(v => {
      log.tag('写入',`${utils.getOutputFile(path)}`)
    }).catch((err) => {
      log.error(err)
    })
  })
}
