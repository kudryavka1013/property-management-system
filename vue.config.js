let apis = ['/owner', '/admin', '/community', '/building', '/household']
let proxy = {}
apis.forEach(group => {
  proxy[group] = {
    target: "http://anj.tivnan.cn",
    changeOrigin: true,
  }
})
console.log(proxy)

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy
  }
}