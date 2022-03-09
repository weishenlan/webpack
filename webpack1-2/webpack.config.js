const path = require('path')

module.exports = {
    entry: './a.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, ''),
    },
    // Module是模块的意思，因此用这个名字可以表示这个配置项是用来解析与处理模块的。
    module: {
        // rules: 定义loader的处理法则。
        // Rules是一个数组，数组每一项是一个JS对象，该对象有两个关键属性test和use。
        rules: [{
            // Test是一个正则表达式或正则表达式数组，模块文件名与正则匹配的会被use里的loader处理。
            test: /\.css$/,
            // Use可以是字符串，对象或数组，表示要使用的loader。
            // 如果该loader额外配置参数，那么可以取对象，额外参数放在options里（有部分loader放query里），例如 use: {loader: 'babel-loader', options: {…}}。
            // 如果使用多个loader进行链式处理，那么可以取数组，数组每一项可以是字符串或对象，字符串或对象的使用同上。
            use: ['style-loader', 'css-loader'],
        }, {
            use: ['style-loader', 'css-loader'],
            // Resource的中文意思是资源，issuer中文意思是发行人。在Webpack中被加载的模块我们称之为resource，而实施加载的模块我们称之为issuer。
            // 例如，我们在一个JS模块里引入了CSS模块，那么JS模块就是issuer，CSS模块就是resource（import './src/reset.css'）。
            // 等价于 test: /\.css$/（一下为默认resource）,
            resource: {
                test: /\.css$/,
                exclude: /node_modules/
            },
            // 只有src下的js文件里引用的css才可以被相应的loader处理
            issuer: {
                test: /\.js$/,
                include: /src/
            }
        },{
            test: /\.js$/,
            use: ['babel-loader'],
            // 除了node_modules文件夹，对所有的以js为后缀名的文件模块使用babel-loader处理。
            exclude: /node_modules/,
            // 只对src目录下以js为后缀名的文件模块使用babel-loader处理。
            include: /src/,
        }, {
            test: /\.js$/,
            use: ['eslint-loader'],
            // 对同一类后缀名类型的文件，我们可以使用多个loader处理，例如处理CSS时使用['style-loader', 'css-loader']，loader的处理顺序是数组项从后向前
            // enforce项有两个，'pre'和'post'
            // pre: 代表此loader会在所有loader之前执行
            // post: 代表此loader会在所有loader之后执行
            enforce: 'pre',
            exclude: /node_modules/,
        }]
    },
    mode: 'none'
}