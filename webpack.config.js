var path = require("path");

module.exports = [{
    target: 'node',
    devtool: 'eval-source-map',
    watch: true,
    entry: {
        client: "./client/index.ts",
        server: "./server/index.ts"
    },
    output: {
        path: path.join(__dirname, "build"),
        filename: "[name].js"
    },
    resolve: {
        alias: {
            client: path.resolve(__dirname, "client"),
            shared: path.resolve(__dirname, "shared"),
            server: path.resolve(__dirname, "server")
        },
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: "ts-loader" },
            { test: /\.png$/, loader: "file-loader" }
        ]
    }
}];