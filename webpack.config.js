var path = require('path')
var webpack = require('webpack')
var HtmlPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var ExtractCSS = new ExtractTextPlugin('style/vendor.css')
var ExtractLESS = new ExtractTextPlugin('style/app.css')

module.exports = {
    // 入口定义
    entry: {
        vendor: ['react', 'react-dom'],
        app: './src/scripts/app.js'
    },

    // 出口定义
    output: {
        path: __dirname + '/dev',
        filename: 'scripts/[name].js'
    },

    // 定义模块
    module: {
        rules: [
            // 解析jsx
            {
                test: /\.(js|jsx)$/,
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            },

            // 解析less, css
            {
                test: /\.less$/,
                loader: ExtractLESS.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            },
            {
                test: /\.css$/,
                loader: ExtractCSS.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            }
        ]
    },

    // 定义webserver
    devServer: {
        contentBase: './dev',
        host: 'localhost',
        port: 8000
    },

    plugins: [
        // 根据模板生成html
        new HtmlPlugin({
            template: './src/index.ejs',
            filename: 'index.html',
            title: 'webpack'
        }),

        // 抽离JS vender
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'jquery'],
            minChunks: Infinity
        }),

        // 抽离CSS vendor， less
        ExtractCSS,
        ExtractLESS
    ]
}