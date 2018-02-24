// search on npm
let fetch = require('node-fetch')
let localV = require('../package').version
let child_process = require('child_process');

(async function(){
  let res = await fetch('https://registry.npmjs.com/@linhun%2Fjane').then(res => res.json())
  let onlineV = res['dist-tags'].latest
  if(localV = onlineV){
    console.log(`线上最新为${onlineV},升级中...`)
    console.log(`请输入密码，赋予读写权限`)
    child_process.execSync("sudo npm install @vue/cli -g",{stdio:[0,1,2]});
  }
  else{
    console.log('已是最新版')
  }
})()
