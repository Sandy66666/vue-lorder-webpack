/**
 * Author: ds
 * Date: 2019/8/17
 * Description:
 */
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const isDev = process.env.NODE_ENV === 'development'; // 判断isDev是否为true，也就是判断是否为开发环境
const HTMLPlugin = require('html-webpack-plugin');

const webpack = require('webpack');

const config = {
    target: "web",//编译目标是web平台，跑在浏览器中的
    entry: path.join(__dirname,'src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname,'dist')
    },
    module: {
        rules: [
            // 处理以vue结尾的文件
            {
                test:/\.vue$/,
                loader: 'vue-loader'
            },
            // 处理css样式
            {
                test:/\.css$/,
                use: [
                    'vue-style-loader',//处理html中的样式
                    'css-loader'
                ] //loader: 'css-loader'处理css文件，项目运行时作为外部文件处理，或者把样式写到html内容里面作为style标签，作为不同的处理方式
            },
            //css预处理器
            {
                test: /\.styl/,
                use: [
                    'style-loader',
                    'css-loader',
                    'stylus-loader'//webpack处理过程一层一层向上仍，stylus处理成css文件交给css和style解析打包，每个loader只负责处理自己负责的一部分
                ]
            },
            // 处理图片
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {//loader可以用对象去写，因为loader需要配置一些选项，每一个loader都可以配置选项
                        loader: "url-loader",//可以把图片转化成base64代码直接写在js中而不用生成新的文件，从而来减少http请求
                        options: {//用options把参数传给loader来指定操作方式
                            limit: 1024,//判断图片文件大小，如果小于1024就把图片代码写到js中
                            name: 'dist/[name]-aaa.[ext]'//采用图片原名字
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // 请确保引入这个插件！
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                //必须加双引号，vue开发版本中包含很多错误信息的应用，开发版本中的很多功能在正式环境中没必要去用，
                // 会加大文件大小，也会影响运行效率
                NODE_ENV: isDev ? '"development"':'"production'
            }
        }),
        new HTMLPlugin()
    ]
}

//需要用在正式环境和开发环境,配置根据不同的环境去判断
//cross-env
if(isDev) {
    //帮助在页面上调试代码，而且都是es6的代码，使用sourcemap完整映射编译前后的代码
    config.devtool = '#cheap-module-eval-source-map',
     config.devServer = {
        port: '8000',
        host: '0.0.0.0',//可以通过localhost访问也可以通过本机内网ip访问，如果是localhost输入ip是访问不了的
        // 如果webpack有任何错误让它加载网页上
        overlay: {
            error: true,
        },
        open: true,
        // historyFallback: {
        //
        // }
        hot: true  //热加载
    },
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}
module.exports = config;
