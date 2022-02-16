// path是Node.js里的路径解析模块，
// 你可以将其看成是一个JS普通对象，该对象有一些方法可以供我们使用。
const path = require('path')

module.exports = {
    // context：基础目录
    // 含义：从工程根目录下src文件夹下的js文件夹里的a.js开始打包（绝对路径）
    // 一般我们不会去设置context，在我们没有设置context的时候，它是当前工程的根目录。
    // context: path.resolve(__dirname, './src'),

    // 入口
    // * 字符串形式（相对路径）
    entry: './a.js',
    // * 数组形式
    // 含义：数组最后一个文件是资源的入口文件，数组其余文件会预先构建到入口文件。本质上还是一个入口
    // entry: ['core-js/stable', 'regenerator-runtime/runtime', './a.js']
    // * 对象形式（多入口配置，打包后生成多个JS文件）
    // entry: {
    //  app1: './a.js',
    //  app2: './b.js',
    // },
    // * 函数形式(获取函数返回值)
    // entry: () => './a.js'

    // 输入
    output: {
        // 打包后生成的资源名称
        // * 字符串形式
        filename: 'bundle.js',
        // * 还可为相对地址 filename: './js/bundle.js'
        // * 支持类似变量的方式生成动态文件名,例如:
        // [hash].js
        // filename: '[hash].js'
        // [name].js([name]表示的是chunk的名称)
        // 字符串和数组形式的entry，[name]值都是main。
        // 对于entry是对象形式的多入口配置，[name]是对象的属性名，对应每一个入口文件。
        // filename: '[name].js'
        // [chunkhash].js、[contenthash].js

        // 表示打包后生成的文件名
        // (与filename的区别)打包过程中非入口文件的chunk名称，通常在使用异步模块的时候，会生成非入口文件的chunk。
        // chunkFilename: "",

        // path 表示资源打包后输出的位置，该位置地址要是绝对路径。如果你不设置它，webpack4默认为dist目录。
        // path输出路径表示的是在磁盘上构建生成的真实文件存放地址。
        // __dirname是Node.js的一个全局变量，表示当前文件的路径
        path: path.resolve(__dirname, ''),

        // 资源访问路径
        // 文件打包后存储path代表存放于磁盘中的位置，浏览器需要通过 publicPath来指定资源存放的磁盘路径 进行访问
        // publicPath: "",  // 资源的访问地址是https://www.apple.com/ipad/bundle.js
        // * 相对路径
        // 以“./”或“../”等开头，表示要访问的资源以当前页面url作为基础路径
        // publicPath: "../dist/"  // 资源的访问地址是https://www.apple.com/dist/bundle.js
        // publicPath: "./dist/"  // 资源的访问地址是https://www.apple.com/ipad/dist/bundle.js
        // 以“/”开头，表示要访问的资源以当前页面的服务器地址作为基础路径
        // publicPath: "/"  // 资源的访问地址是https://www.apple.com/bundle.js。
        // publicPath: "/dist/"  // 资源的访问地址是https://www.apple.com/dist/bundle.js。
        // * 绝对路径（以HTTP协议名称开始）
        // 一般在使用CDN的时候，因为CDN的域名与我们自己服务器的域名不一样，我们会采用这种方式。
        // publicPath: "https://cdn.apple.net/"  // 资源的访问地址是https://cdn.apple.net/bundle.js
        // publicPath: "http://cdn.apple.net/"  // 资源的访问地址是http://cdn.apple.net/bundle.js
        // publicPath: "//cdn.apple.net/dist/"  // （相对协议：浏览器会对前页面使用的协议名称与相对协议拼接 ）资源的访问地址是https://cdn.apple.net/dist/bundle.js
    },

    module: {
        // 处理规则
        rules: [{
            // 匹配以css结尾的文件
            test: /\.css$/,
            // loader就是帮助Webpack来处理各种类型文件的，执行顺讯是从后向前执行
            // css-loader: 解析css文件（包含import等），把解析后的文件以字符串的形式打包到Js文件中。但此时css样式并不会生效。
            // style-loader: 将js里的样式代码插入到html文件里（原理：通过JS动态生成的style标签插入到HTML的head标签里）。
            use: ['style-loader', 'css-loader']
        }]
    },

    // mode是Webpack的打包模式，默认是'production'，表示给生产环境打包的.
    // 生产压缩；‘none'不会压缩bundle.js里的代码
    mode: 'none'
}


// ps
// 以上为配置文件打包👆
// 还可以使用命令行进行打包👇：
// npx webpack a.js -o bundle.js