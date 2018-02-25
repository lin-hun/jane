let fetch = require('node-fetch')
let utils = require('../utils/utils')
let localV = utils.getVer()
let log = utils.log
let child_process = require('child_process');

(async function () {
  // search on npm
  let res = await fetch('https://registry.npmjs.com/@linhun%2Fjane-cli').then(res => res.json())
  let onlineV = res['dist-tags'].latest
  // diff
  if (localV < onlineV) {
    log.info(`线上最新为${onlineV},升级中...`)
    log.info(`请输入密码，赋予读写权限`)
    child_process.execSync("sudo npm install @linhun/jane-cli -g", {stdio: [0, 1, 2]})
  }
  else {
    log.info('已是最新版')
  }
})()
