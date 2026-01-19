# npm i webpack webpack-cli `基础依赖`
# npx webpack ./src/main.js --mode=development *指定文件入口并打包为`开发环境`*
# npx webpack ./src/main.js --mode=production  `生产环境`
# npx webpack `打包资源`
# npx webpack serve `启动开发服务器`
# npx webpack serve --config ./config/webpack.dev.js `启动开发服务器（指定文件）`
# npx webpack --config ./config/webpack.prod.js `打包资源（指定文件）`

# `浏览器兼容性`
# "browserslist": [
#    "last 2 version", `浏览器最近的两个版本`
#    "> 1%", `覆盖市面上99%的浏览器`
#    "not dead" `不需要已下架的浏览器`
#  ]