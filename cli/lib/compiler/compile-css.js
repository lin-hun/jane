let compiler = require('node-sass')
let fs = require('fs')
let utils = require('../../utils/utils')
let config = utils.getProjectConfig().css.config
let log = utils.log
let projectConfig = utils.getProjectConfig()

// option:https://github.com/sass/node-sass
module.exports = (path) => {
  let option = Object.assign({file: path}, config)
  compiler.render(option, (err, result) => {
    if (err) {
      log.error(err)
      return
    }
    // compile to .wxss
    path = utils.getOutputFile(path.replace(projectConfig.css.ext, '.wxss'))
    // write in
    utils.write(path, result.css).then(v => {
      log.tag('写入css',`${utils.getOutputFile(path)}`)
    }).catch((err) => {
      log.error(err)
    })
  })
}
