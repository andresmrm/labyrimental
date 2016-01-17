var webpack = require('webpack')

module.exports = {
    cache: true,
    resolve: { alias: {assets: __dirname + '/assets/'} },
    entry: {
        app: './src/index.js',
        vendor: ['./src/vendor.js'],
        // prephaser: ['./src/prephaser.js'],
    },
    output: {
        path: './dist/',
        publicPath: '/dist/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            // { test: /\.png$/, include: /assets/, loader: "file" },
            // { test: /\.png$/, include: /node_modules/, loader: "file" },
            // { test: /\.(png|otf|svg)$/, loader: "file" },
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.scss$/, include: /src/, loader: 'style!css!sass' },
            { test: /\.sass$/, include: /src/, loader: 'style!css!sass?indentedSyntax' },
            { test: /\.ttf$/, loader: "file-loader" },
            // { test: /\.html$/, include: /src/, loader: 'riotjs' },
            { test: /\.js$/,
              exclude: /\.es5\.js$/,
              // include: /src/,
              include: [ /configs/, /assets/, /output/, /src/ ],
              loader: 'babel',
              query: {
                  modules: 'common',
                  // loose: ['es6.classes'],
                  // loose: ['all'],
                  // optional: 'runtime',
              }
            }
            // ,{ test: /\.(png|otf|svg)$/, include: /assets/, loader: "url-loader?limit=100000" }
            // ,{ test: /cluster\.svg$/, include: /assets/, loader: "url-loader?limit=100000" }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            // PIXI: 'imports?this=>global!exports?global.PIXI!pixi',
            // Phaser: 'phaser',
            regeneratorRuntime: 'regeneratorRuntime'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor'],
            // names: ['prephaser', 'vendor'],
            minChunks: Infinity
        })
            // /* chunkName= */"vendor",
            // /* filename= */"vendor.js"),
        // new webpack.optimize.CommonsChunkPlugin(
        //     name="prephaser",
        //     filename="prephaser.js")
    ],
    devServer: {
        port: 5001
    },
    devtool: "source-map"
}
