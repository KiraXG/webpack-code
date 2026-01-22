// 配置项补全提示
/**
 * @type {import('webpack').Configuration}
 */

const path = require("path"); // nodejs核心模块，专门用来处理路径问题的
// const ESLintPlugin = require("eslint-webpack-plugin"); // eslint插件
const HtmlWebpackPlugin = require("html-webpack-plugin"); // html插件

module.exports = {
    // 入口
    entry: "./src/main.js",
    // 输出
    output: {
        // 所有文件输出路径
        // __dirname nodejs变量，代表当前文件的文件夹目录
        // path: path.resolve(__dirname, "../dist"), // 绝对路径
        // **开发模式没有输出**
        path: undefined,
        // 入口文件打包输出文件名和路径
        filename: "static/js/main.js",
        // 打包前自动清除上次的打包文件**开发模式没有输出**
        // clean: true,
    },
    // 加载器
    module: {
        rules: [
            {
                oneOf: [
                    // loader的配置
                    /* 样式 */
                    {
                        test: /\.css$/, // 只检测.css文件
                        use: [
                            // 执行顺序是从右往左（从下往上）
                            "style-loader", // 将js中css通过创建style标签添加到html文件中并生效
                            "css-loader", // 将css资源编译成commonjs的模块到js中
                        ],
                    },
                    {
                        test: /\.less$/,
                        // loader: "xxx", // 一个loader用‘loader’
                        use: [
                            // 多个loader用‘use’
                            "style-loader",
                            "css-loader",
                            "less-loader", // 将less文件编译成less文件
                        ],
                    },
                    {
                        test: /\.s[ac]ss$/, // 同时处理sass和scss文件
                        use: [
                            "style-loader",
                            "css-loader",
                            "sass-loader", // 将sass文件编译成less文件
                        ],
                    },
                    {
                        test: /\.styl$/,
                        use: [
                            "style-loader",
                            "css-loader",
                            "stylus-loader", // 将sass文件编译成less文件
                        ],
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
                                maxSize: 10 * 1024,
                            },
                        },
                        generator: {
                            // 输出图片名称和路径
                            filename: "static/images/[hash:10][ext][query]", // [hash:10]代表取前十位的hash值
                        },
                    },
                    /* 图标 */
                    {
                        test: /\.(ttf|woff2?|mp3|mp4)$/,
                        type: "asset/resource", // 原封不动的输出，不会转换乘base64的格式
                        generator: {
                            // 输出图标名称和路径
                            filename: "static/fonts/[hash:10][ext][query]", // [hash:10]代表取前十位的hash值
                        },
                    },
                    {
                        test: /\.m?js$/,
                        exclude: /node_modules/, // 排除node_modules中的js文件
                        use: {
                            loader: "babel-loader",
                            options: {
                                presets: ["@babel/preset-env"],
                            },
                        },
                    },
                ],
            },
        ],
    },
    // 插件
    plugins: [
        /* plugin的配置 */
        // eslint配置
        // new ESLintPlugin({
        //     context: path.resolve(__dirname, "../src"), // 只检查src目录下的文件
        // }),
        new HtmlWebpackPlugin({
            // 模板，以 public/index.html 文件创建新的html文件
            // 新的html文件特点：1. 结构和原来的一直 2. 自动引入打包的资源
            template: path.resolve(__dirname, "../public/index.html"),
        }),
    ],
    // 开发服务器
    devServer: {
        host: "localhost", // 启动服务器域名
        port: "3000", // 启动服务器端口号
        open: true, // 是否自动打开浏览器
        hot: true, // 启用HMR，默认为true
    },
    // 模式
    mode: "development",
    devtool: "cheap-module-source-map", // 优点：打包编译速度快，只包含行映射；缺点：没有列映射
};
