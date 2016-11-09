/**
 * 创建时间：2016年11月2日 11:09:14
 * 创建人：JaminHuang
 * 描述：主服务文件
 */
'use strict';
var open = require('open');
var webpack =require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
    publicPath:config.output.publicPath,
    hot:true,
    historyApiFallback: true,
    quiet: false,
    noInfo: false,
    filename: "index.js",
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    headers: {"X-Custom-Header": "yes"},
    stats: {colors: true}
});

server.listen(3009, function (err, result) {
    if (err)console.log(err);
    open('http://localhost:3009');
});