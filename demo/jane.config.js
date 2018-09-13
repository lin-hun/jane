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