/**
 * Author: ds
 * Date: 2019/8/22
 * Description:
 */
const autoprefixer = require('autoprefixer');

/**
 * style文件处理成css文件后，postcss会进一步优化css文件
 * 优化的过程就是通过一系列组件去优化
 * 当前用到的组件是autoprefixer，将css文件优化成各个版本浏览器都能识别的版本，统一加前缀如-webkit-
 * @type {{plugins: postcss.Transformer[]}}
 */
module.exports = {
    plugins: [
        autoprefixer()
    ]
}
