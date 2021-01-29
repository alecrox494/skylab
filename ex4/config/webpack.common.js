var path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack');
module.exports = {
    module: {
        rules: [{
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            }, {
                test: /\.s[ac]ss$/i,
                use: [
                // Creates `style` nodes from JS strings
                'style-loader',
                // Translates CSS into CommonJS
                'css-loader',
                // Compiles Sass to CSS
                'sass-loader',
                ],
            }, {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }, {
                test: /\.html$/i,
                loader: 'html-loader',
            }, {
                test: /\.(png|jpe?g|webp|git|svg|)$/i,
                use: [
                  {
                    loader: `img-optimize-loader`,
                    // options: {
                    //   compress: {
                    //     // This will transform your png/jpg into webp.
                    //     webp: true,
                    //     disableOnDevelopment: true
                    //   }
                    // },
                  },
                ],
            }, {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [
                    {
                     loader: 'file-loader?name=/fonts/[name].[ext]'
                    },
                ],
              },
        ]
    },
    entry: {
        index: path.resolve(__dirname, '../src/frontend/js/main.js')
    },
    output: {
        filename: "frontend/js/[name].bundle.js",
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'frontend/css/[name].bundle.css'
        }),
        new HtmlWebpackPlugin({
            template: 'src/frontend/index.html',
            inject: true,
            chunks: ['index'],
            filename: 'index.html'
        })
    ]
};