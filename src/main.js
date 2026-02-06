import count from "./js/count.js";
import sum from "./js/sum.js";
// 想要webpack打包资源，必须引入该资源
import "./css/iconfont.css";
import "./css/index.css";
import "./less/index.less";
import "./sass/index.sass";
import "./sass/index.scss";
import "./stylus/index.styl";

console.log(count(2, 1));
console.log(sum(1, 2, 3, 4));

document.getElementById("btn").onclick = function () {
    /* import 动态导入，会将动态导入的文件代码分割（拆分成单独模块），在需要使用的时候自动加载 */
    // eslint不能识别动态导入需要，需要额外追加配置 plugins: ["import"]
    import("./js/math.js").then(({ mul }) => {
        console.log(mul(2, 3));
    });
};

// css天然支持热更新，js不支持，需要判断
if (module.hot) {
    // 判断是否支持热模块替换功能
    module.hot.accept(); // 不传参默认匹配所有js文件
    // module.hot.accept("./js/count.js");
}
