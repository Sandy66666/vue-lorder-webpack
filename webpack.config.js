/**
 * Author: ds
 * Date: 2019/8/17
 * Description:
 */
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const isDev = process.env.NODE_ENV === 'development'; // 判断isDev是否为true，也就是判断是否为开发环境

const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
            // 处理jsx的文件
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
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
                    {
                        loader: 'postcss-loader',
                        options: {
                            // stylus-loader可以处理styl文件成sourceMAp，postcss也可以，sourceMap为true代表postcss可以直接处理解析好的sourceMap
                            sourceMap:true,
                        }
                    },
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
                            limit: 2080,//判断图片文件大小，如果小于1024就把图片代码写到js中
                            name: '[name]-aaa.[ext]',//采用图片原名字
                            outputPath: 'dist/img/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // 请确保引入这个插件！
        new VueLoaderPlugin(),
        new HtmlPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                //必须加双引号，vue开发版本中包含很多错误信息的应用，开发版本中的很多功能在正式环境中没必要去用，
                // 会加大文件大小，也会影响运行效率
                NODE_ENV: isDev ? '"development"':'"production'
            }
        })
    ]
}

//需要用在正式环境和开发环境,配置根据不同的环境去判断
//cross-env
if(isDev) {
    //帮助在页面上调试代码，而且都是es6的代码，使用sourcemap完整映射编译前后的代码
    config.devtool = '#cheap-module-eval-source-map',
     config.devServer = {
        proxy: {
           "/api": {
               target: "http://192.168.1.9:8080",
               changeOrigin:true,
               pathRewrite: {"^/api": ""} //后面可以使重写的新路径，一般不做更改
           }
        },
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
} else {
    config.output.filename = '[name].[chunkhash:8].js';
    config.module.rules.push(
        //css预处理器，使用模块化的方式写css代码
        //stylus-loader专门用来处理stylus文件，处理完成后变成css文件，交给css-loader.webpack的loader就是这样一级一级向上传递，每一层loader只处理自己关心的部分
        {
            test: /\.styl/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        // you can specify a publicPath here
                        // by default it uses publicPath in webpackOptions.output
                        publicPath: './',
                        hmr: process.env.NODE_ENV === 'development',
                    },
                },
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {sourceMap: true}
                },
                'stylus-loader'
            ]
        },
    );
    config.plugins.push(
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: 'styles.[chunkhash].[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        })
    );
}
module.exports = config;
