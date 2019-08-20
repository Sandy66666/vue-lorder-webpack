# 说明
 > 为了学习vue+pebpack+vue-loader，自制的一个todolist的小demo。
 
 > 因为vue-cli是一个广泛适用的模板,生成的项目没有办法直接投入到生产环境中，而不同的项目有不同的定制需求，故而学习自己搭建前端框架。
 
 > webpack 用于打包前端资源, 前端资源有很多不同的类型 js, css, img, font 通过http请求加载，开发webapp时都是一整个js加载到浏览器端之后再把所有的内容渲染出来，很多时候都可以以js文件作为入口。
 
 > webpack版本采用4.39.2
 ##项目运行
### 初始化项目
```sh
npm init 
```
### 安装依赖包
```sh
npm install webpack vue vue-loader
```
```sh
npm install css-loader vue-template-compiler
```
```sh
npm i style-loader url-loader file-loader
```
```sh
npm run build
```
```sh
webpack-dev-server cross-env
webpack-dev-server 是一个webpack的包 cross-env 在不同的环境上设置不同的环境变量不一样，cross-env解决了这个问题 安装

npm install webpack-dev-server
npm install cross-env
```
构建工具 webpack 现在的前端开发基本上很多框架都会配合webpack一起使用

vue 的 vue-loader 适用 .vue文件的开发模式
vue 和 react 的 babel-loader 适用 jsx语法
处理静态资源，加hash后缀，提供浏览器长缓存，合理更新浏览器缓存
文件打包，合并，压缩
强大的loader体系和plugin体系

vue 开发已经离不开webpack,前端开发不仅仅是业务开发,学习vue不仅仅是api,要学习整个vue生态环境， vue-router, vuex, 组件开发，webpack配置。

vue渲染过程，通过jsx可以更好的了解vue的渲染过程。每次调用render()方法，才能得到真正想要的结果。.vue文件的template部分最终是用vue-loader解析成render()方法，然后放到对象中，每次vue里面有数据更新时，都会重新去调用render()方法，生成新的HTML结构，插入到DOM结构中。
