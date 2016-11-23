/**
 * 创建时间：2016年11月2日 11:11:02
 * 创建人：JaminHuang
 * 描述：配置文件
 */
'use strict';
var path = require('path');
var webpack = require('webpack');

var config = {
    devtool: 'source-map',
    entry: {
        app: ['webpack-dev-server/client?http://localhost:3009', 'webpack/hot/dev-server', './src/index']
    },
    output: {
        path: path.join(__dirname, 'public'),
        publicPath: '/public/',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {test: /\.css$/, loaders: ['style/useable', 'css']},
            {test: /\.(png|jpg|woff|woff2|gif)$/, loader: 'url-loader?limit=8192'},
            {test: /\.json$/, loader: "json"},
            {test: /\.js$/, loader: 'babel', include: path.join(__dirname, 'src')}
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'DEBUG': true
            }
        })
    ]
};
module.exports = config;