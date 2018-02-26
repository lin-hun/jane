let cmd = require('child_process').execSync
let log = require('../utils/utils').log
let fs = require('fs-extra')
let Path = require('path')

module.exports = async (name) => {
  try {
    // copy tpl/project
    if (fs.existsSync(`src/pages/name`)) {
      log.error('创建失败，页面已存在')
      return
    }
    await fs.copy(Path.join(__dirname, '../tpl/page'), Path.resolve(`src/pages/${name}`))
    log.info(`创建页面成功`)
  }
  catch (err) {
    console.log(err)
    log.error('创建页面失败')
    return
  }
}