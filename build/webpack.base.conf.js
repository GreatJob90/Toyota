const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssUrlRelativePlugin = require('css-url-relative-plugin');

const PATHS = {
    src: path.join(__dirname, '../_source'),
    dist: path.join(__dirname, '../dist'),
    assets:'_assets/'
};

module.exports = {

    externals: {
       paths: PATHS 
    },
    entry: {
        app: PATHS.src
    },
    output: {
        filename: `${PATHS.assets}js/[name].js`,
        path: PATHS.dist,
        publicPath: '/'
    },
    module: {
       rules: [{
           test: /\.js$/,
           loader: 'babel-loader',
           exclude: '/node_modules/'
       }, {
           test: /\.(woff|woff2|eot|ttf|otf)$/,
           use: [
            {
               loader: 'file-loader',
               options: { name: '[name].[ext]' }
           }]
       }, {
           test: /\.(png|jpg|gif|svg)$/,
           use: [
               {
                loader: 'url-loader',
                options: { limit: 50, outputPath: 'img/content'},
             }, {
                loader: 'file-loader',
                options: { name: '[name].[ext]' }
            }] 
       }, {
           test: /\.scss$/,
           use: [
               'style-loader',
               MiniCssExtractPlugin.loader,
               {
                   loader: 'css-loader',
                   options: { sourceMap: true }
               }, {
                   loader: 'resolve-url-loader',
                   options: {
                       sourceMap: true,
                       debug: true,
                   }
               }, {
                   loader: 'postcss-loader',
                   options: {
                       sourceMap: true,
                       config: { path: `${PATHS.src}/js/postcss.config.js` }
                   }
               }, {
                   loader: 'sass-loader',
                       options: {sourceMap: true }
               } 
           ]
       }, {
            test: /\.css$/,
            use: [
                'style-loader',
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: { sourceMap: true }
                }, {
                    loader: 'resolve-url-loader',
                    options: {
                        sourceMap: true,
                        debug: true,
                    }
                }, {
                   loader: 'postcss-loader',
                   options: {
                       sourceMap: true,
                       config: { path: `${PATHS.src}/js/postcss.config.js` }
                   }
               }
            ]
        }] 
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].css`
        }),
        new CopyWebpackPlugin([
            { from: `${PATHS.src}/img/content`, to: `${PATHS.assets}img/content`},
            { from: `${PATHS.src}/favicon`, to: `${PATHS.assets}favicon`},
            { from: `${PATHS.src}/font`, to: `${PATHS.assets}font`}
        ]),
        new HtmlWebpackPlugin({
            hash: false,
            template: `${PATHS.src}/index.html`,
            filename: './index.html'
        }),
        new CssUrlRelativePlugin()
    ],
}