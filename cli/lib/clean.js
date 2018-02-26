let rm = require('rimraf')
let utils = require('../utils/utils')
let log = utils.log
let project = utils.getProjectConfig().dest
let path = `${project}/*`
rm(path, () => {
  log.info(`${project}已清空`)
})

