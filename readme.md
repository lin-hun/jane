## jane
![cover](./cover.jpg)
+ scss、less、async、await、api的promise化处理

## 安装
lib install
```
npm install --save @linhun/jane
```
## 功能
+ .scss -> .wxss 
+ es6 -> es5, support #sourcemap
+ async、await
+ support build -w, scss dependence chk

## 快速开始
cli install
```
sudo npm install -g @linhun/jane-cli
```
init project
``` sh
jane new project
```
build project
``` sh
jane build // on production
jane build -w // watch build on develop
```
config file
```javascript
module.exports = {
  dest:'build',
  tpl:{
    page:'' // must be directory
  },
  css: {
    ext:'.scss',
    compiler: require('jane-sass'),
    // ref:https://github.com/sass/node-sass
    config:{}
  },
  js: {
    ext:'.js',
    compiler: 'babel',
    // https://babeljs.io/docs/usage/api/
    config: {
      presets:['env'],
      plugins: ["transform-node-env-inline"]
    }
  },

  ignore:['node_modules','dist','.DB_store','.DS_Store']
}
```
## 插件
+ [jane-async](https://github.com/lin-hun/jane-async)
+ [jane-sass](https://www.npmjs.com/package/jane-sass)
+ [jane-less](https://www.npmjs.com/package/jane-less)
+ [jane-stylus](https://www.npmjs.com/package/jane-stylus)
## 环境判断
+ 安装
```
  npm i --save babel-plugin-transform-node-env-inline
```
+ 引入
```
js: {
    ext:'.js',
    compiler: 'babel',
    // https://babeljs.io/docs/usage/api/
    config: {
      presets:['env'],
      plugins: ["transform-node-env-inline"]
    }
  }
```
+ 使用
```
  NODE_ENV=production jane build
```
+ 代码中
```
  console.log(process.env.NODE_ENV)
```
## 更多用法
jane --help
```
  Usage: jane [options] [command]
  
  Options:

    -v, --version  显示版本号
    -w, --watch    监视目录改动
    -h, --help     output usage information


  Commands:

    clean          清空build目录
    build          编译项目
    new <project>  新建项目
    page <page>    新建页面
    upgrade        更新

```
## Todo 
+ image minify


## 谁在用
+ 掌上链家
+ 贝壳
+ 贝壳估价
+ 链家新房

## License
MIT


