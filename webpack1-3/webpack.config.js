const path = require('path')

module.exports = {
    entry: './a.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, ''),
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                // babel-loader这个loader主要作用是在Webpack打包的时候，用Babel将ES6的代码转换成ES5版本的
                // 对于Babel配置复杂的情况，我们可以在工程根目录单独建立一个Babel配置文件
                // 例如babel.config.js。presets和plugins等配置项就不写在babel-loader的options里了，而是放在babel.config.js，babel-loader会自动读取使用其默认配置文件的配置。
                loader: 'babel-loader',
                options: {
                    // 预处理
                    presets: ['@babel/preset-env'],
                    // 开启缓存，在初次打包后再次打包，如果JS文件未发生变化，可以直接使用初次打包后的缓存文件，避免了二次转码，有效提高打包速度.
                    cacheDirectory: true,
                }
            }
        }, {
            // file-loader在Webpack中的作用是，处理文件导入地址并替换成其访问地址，并把文件输出到相应位置。
            // 其中导入地址包括了JavaScript和CSS等导入语句的地址，例如JS的import和CSS的url()
            // use: 'file-loader',
            // test: /\.jpg$/,
        },{
            test: /\.(jpg|png)$/,
            use: {
                //  file-loader 的增强版，它支持file-loader的所有功能
                // 另外还有一个特殊的功能: 可以计算出文件的base64编码，在文件体积小于我们指定的值（单位 byte）的时候，可以返回一个base64编码的DataURL来代替访问地址。
                // 使用base64编码的好处是可以减少一次网络请求，提升页面加载速度。
                loader: 'url-loader',
                options: {
                    // 通过设置limit大小，当资源体积大于limit的时候，url-loader使用file-loader来处理多媒体资源，
                    // 当资源体积小于limit的时候，url-loader会计算出图片等多媒体资源的base64编码，直接打包到生成的JS或CSS文件里。
                    // 我们要合理设置limit的值，不使打包后的JS或CSS文件过大，也不要设置地过小，小于1KB的资源没必要再去单独请求一次网络资源。
                    // 通常会在3KB-20KB选择一个适合当前项目使用。
                    limit: 1024 * 50,
                    // name:原始名称， contenthash： 资源内容hash值， ext：后缀名
                    name: '[name]-[contenthash:8].[ext]',
                    // file-loader默认使用output.publicPath作为资源访问地址
                    // 也可单独设置地址，此地址会覆盖output.publicPath
                    publicPath: './dist/'
                }
            }
          }]
    },
    mode: 'none'
}