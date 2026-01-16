// 配置项补全提示
/**
 * @type {import('webpack').Configuration}
 */

const path = require("path"); // nodejs核心模块，专门用来处理路径问题的

module.exports = {
    // 入口
    entry: "./src/main.js",
    // 输出
    output: {
        // 所有文件输出路径
        // __dirname nodejs变量，代表当前文件的文件夹目录
        path: path.resolve(__dirname, "dist"), // 绝对路径
        // 入口文件打包输出文件名和路径
        filename: "js/main.js",
    },
    // 加载器
    module: {
        rules: [
            // loader的配置
            /* 样式 */
            {
                test: /\.css$/, // 只检测.css文件
                use: [
                    // 执行顺序是从右往左（从下往上）
                    "style-loader", // 将js中css通过创建style标签添加到html文件中并生效
                    "css-loader", // 将css资源编译成commonjs的模块到js中
                ]
            },
            {
                test: /\.less$/,
                // loader: "xxx", // 一个loader用‘loader’
                use: [
                    // 多个loader用‘use’
                    "style-loader",
                    "css-loader",
                    "less-loader", // 将less文件编译成less文件
                ]
            },
            {
                test: /\.s[ac]ss$/, // 同时处理sass和scss文件
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader", // 将sass文件编译成less文件
                ]
            },
            {
                test: /\.styl$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "stylus-loader", // 将sass文件编译成less文件
                ]
            },
            /* 图片 */
            {
                test: /\.(png|jpe?g|gif|webp|svg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        // 小于 10kb 的图片转 base64
                        /* 
                           优点：减少请求数量
                           缺点：体积会更大
                        */
                        maxSize: 10 * 1024
                    }
                },
                generator: {
                    // 输出图片名称和路径
                    filename: "static/images/[hash:10][ext][query]" // [hash:10]代表取前十位的hash值
                }
            }
        ],
    },
    // 插件
    plugins: [
        // plugin的配置
    ],
    // 模式
    mode: "development",
};
