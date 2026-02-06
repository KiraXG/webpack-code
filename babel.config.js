module.exports = {
    // 智能预设，能够编译ES6语法
    presets: [
        [
            "@babel/preset-env",
            {
                useBuiltIns: "usage", // 按需加载自动引入，如果没有自动生成兼容性文件，将package.json里的browserslist去掉
                corejs: 3,
            },
        ],
    ],
};
