module.exports = {
  dest:'build',
  css: {
    ext:'.scss',
    compiler: 'scss',
    // ref:https://github.com/sass/node-sass
    config:{}
  },
  js: {
    ext:'.js',
    compiler: 'babel',
    config: {}
  },
  ignore:['node_modules','dist','.DB_store','.DS_Store']
}