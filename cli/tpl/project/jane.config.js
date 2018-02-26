module.exports = {
  dest:'build',
  css: {
    ext:'scss',
    config:{}
  },
  js: {
    ext:'js',
    compiler: 'babel',
    config: {}
  },
  ignore:['node_modules','dist','.DB_store','.DS_Store']
}