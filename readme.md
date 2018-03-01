## jane
![cover](./cover.jpg)
+ scss、less、async、await、api的promise化处理

## Install
```
sudo npm install -g @linhun/jane
```

## Features
+ .scss -> .wxss 
+ es6 -> es5
+ async、await

## Quickstart
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
  dest:'build', // build dir
  tpl:{ // custom page dir
    page:'' // must be directory
  },
  css: {
    ext:'.scss', // css ext
    compiler: 'scss', // define css compiler
    config:{} // css compile by node-sass. option is same as:https://github.com/sass/node-sass
  },
  js: {
    ext:'.js',
    compiler: 'babel',
    // https://babeljs.io/docs/usage/api/
    config: {
      presets:['env'],
      plugins:["transform-async-to-generator"] // babel-plugins 
    }
  },
  ignore:['node_modules','dist','.DB_store','.DS_Store'] // these files could be ignored by compiler
}
```
## More usage
```
jane --help
```
## Todo 
+ api promisify (todo) 
+ demo
+ doc

## License
MIT


