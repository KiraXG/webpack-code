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

// css天然支持热更新，js不支持，需要判断
if (module.hot) {
    // 判断是否支持热模块替换功能
    module.hot.accept(); // 不传参默认匹配所有js文件
    // module.hot.accept("./js/count.js");
}
