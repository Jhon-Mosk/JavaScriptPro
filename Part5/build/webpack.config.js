const path = require('path')
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
    mode: 'production',
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: './js/index.js'
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 600,
        poll: 1000
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "src/css", to: "./css" },
                // { from: "src/img", to: "./img" },
                { from: "src/index.html", to: "" },
            ],
        }),
    ],
}