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
            use: ['style-loader', 'css-loader']
        }]
    },
    mode: 'none'
}