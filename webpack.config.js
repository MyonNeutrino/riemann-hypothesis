const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.pug',
            inject: false
        }),
        new CopyWebpackPlugin([
            { from: 'public' },
        ]),
    ],
    module: {
        rules: [
            {
                test: /^[^:]*\.(s|)[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    'resolve-url-loader',
                    // Compiles Sass to CSS
                    'sass-loader'
                ],
            },
            {
                test: /^[^:]*\.(woff(2)?|ttf|otf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.pug$/i,
                use: [
                    "html-loader",
                    "pug-html-loader"
                ]
            },
            {
                test: /\.(x|)htm(|l)$/i,
                use: [
                    "html-loader"
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    "file-loader"
                ],
            }
        ]
    }
}