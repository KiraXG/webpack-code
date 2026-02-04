// 配置项补全提示
/**
 * @type {import('webpack').Configuration}
 */

const os = require("os");
const path = require("path"); // nodejs核心模块，专门用来处理路径问题的
// const ESLintPlugin = require("eslint-webpack-plugin"); // eslint插件
const HtmlWebpackPlugin = require("html-webpack-plugin"); // html插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 提取css成单独文件
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // 压缩css代码
const TerserWebpackPlugin = require("terser-webpack-plugin");

const threads = os.cpus().length;

//
function getStyleLoader(pre) {
    return [
        // 执行顺序是从右往左（从下往上）
        MiniCssExtractPlugin.loader,
        "css-loader", // 将css资源编译成commonjs的模块到js中
        {
            // postcss-loader 要在css-loader的后面，又要在less/scss/stylus-loader的前面
            loader: "postcss-loader",
            options: {
                // 如果要给loader写配置option要写成对象的形式，不用的话直接写名字
                postcssOptions: {
                    plugins: ["postcss-preset-env"],
                },
            },
        },
        pre,
    ].filter(Boolean); // 过滤掉undefined和null
}

module.exports = {
    // 入口
    entry: "./src/main.js",
    // 输出
    output: {
        // 所有文件输出路径
        // __dirname nodejs变量，代表当前文件的文件夹目录
        path: path.resolve(__dirname, "../dist"), // 绝对路径
        // 入口文件打包输出文件名和路径
        filename: "js/main.js",
        // 打包前自动清除上次的打包文件
        clean: true,
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
                        use: getStyleLoader(),
                    },
                    {
                        test: /\.less$/,
                        // loader: "xxx", // 一个loader用‘loader’
                        use: getStyleLoader("less-loader"), // 将less文件编译成less文件
                    },
                    {
                        test: /\.s[ac]ss$/, // 同时处理sass和scss文件
                        use: [
                            ...getStyleLoader(),
                            "sass-loader", // 将sass文件编译成less文件
                        ],
                    },
                    {
                        test: /\.styl$/,
                        use: [
                            ...getStyleLoader(),
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
                        // include: path.resolve(__dirname, "../src"), // 只处理src目录下的文件
                        exclude: /node_modules/, // 排除node_modules中的js文件
                        use: [
                            {
                                loader: "thread-loader", // 开启多进程
                                options: {
                                    works: threads, // 进程数量
                                },
                            },
                            {
                                loader: "babel-loader",
                                options: {
                                    // presets: ["@babel/preset-env"],
                                    // cacheDirectory: true, // 开启babel缓存
                                    /* 缓存文件默认路径在"node_modules/.cache/babel-loader" */
                                    cacheDirectory: path.resolve(__dirname, "../node_modules/.cache/babel-cache"), // 开启babel缓存
                                    cacheCompression: false, // 关闭缓存文件压缩
                                    plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    },
    // 优化
    optimization: {
        minimizer: [
            // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
            // `...`,
            // 压缩css
            new CssMinimizerPlugin(),
            // 压缩js
            new TerserWebpackPlugin({
                parallel: threads, // 开启多进程和设置进程数量
            }),
        ],
    },
    // 插件
    plugins: [
        /* plugin的配置 */
        // eslint配置
        // new ESLintPlugin({
        //     context: path.resolve(__dirname, "../src"), // 只检查src目录下的文件
        //     exclude: "node_modules", // 默认值
        //     cache: true, // 开启缓存
        //     cacheLocation: path.resolve(__dirname, "../node_modules/.cache/eslint-cache"),
        //     threads, // 开启多进程和设置进程数量
        // }),
        new HtmlWebpackPlugin({
            // 模板，以 public/index.html 文件创建新的html文件
            // 新的html文件特点：1. 结构和原来的一直 2. 自动引入打包的资源
            template: path.resolve(__dirname, "../public/index.html"),
        }),
        new MiniCssExtractPlugin({
            filename: "static/css/main.css",
        }),
    ],
    // 开发服务器
    // devServer: {
    //     host: "localhost", // 启动服务器域名
    //     port: "3000", // 启动服务器端口号
    //     open: true // 是否自动打开浏览器
    // },
    // 模式
    mode: "production",
    devtool: "source-map", // 优点：包含行列映射；缺点：打包编译速度更慢
};
