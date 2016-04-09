var Path = require('path');
var Webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyPlugin = require('copy-webpack-plugin');

var webpackDirs = {
    contextDir: Path.resolve(__dirname, './src/scripts'),
    sassDir: Path.resolve(__dirname, './src/scss'),
    pathDir: Path.join(Path.resolve(__dirname, './dist/')),
    nodeDir: Path.join(Path.resolve(__dirname, './node_modules')),
    logsDir: Path.join(Path.resolve(__dirname, './logs')),
    excludeDir: [/(node_modules|tests|logs)/]
};

module.exports = {
    conf: {
        excludeDir: webpackDirs.excludeDir
    },

    context: webpackDirs.contextDir,

    entry: {
        menudependencies: ['./vendor'],
        menu: ['./app']
    },

    output: {
        path: webpackDirs.pathDir,
        filename: 'js/[name].js',
        publicPath: '../'
    },


    plugins: [
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.NoErrorsPlugin(),

        //Chunk script
        new Webpack.optimize.CommonsChunkPlugin('menudependencies', 'js/menudependencies.js', Infinity),

        //Chunk css
        new ExtractTextPlugin('css/[name].css', {
            allChunks: true
        }),

        //Copy assets
        new CopyPlugin([
            // File
        ]),


        new Webpack.BannerPlugin("*************************************\n   Solar Content Management System/ Menu Manager \n*************************************\n")
    ],

    module: {
        loaders: [
            //SCRIPTS
            {
                test: /\.js$/,
                exclude: webpackDirs.excludeDir,
                loaders: ['babel']
            },

            //SCSS
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!sass')
                //loader: 'style!css!sass'
            },
            // IMAGES
            {
                test: /\.png($|\?)|\.jpg($|\?)|\.gif($|\?)|\.bmp($|\?)|\.svg($|\?)/,
                loader: 'file-loader?name=images/[name].[ext]'
                //loader: "file?name=[path][name].[ext]?[hash]!./dir/file.png"
            },

            // FONTS
            {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            }
        ]
    },
    sassLoader: {
        includePaths: webpackDirs.sassDir
    },

    resolve: {
        root: [webpackDirs.pathDir],
        alias: {},
        extensions: ['', '.js', '.scss', '.css', '.html']
    }
};
