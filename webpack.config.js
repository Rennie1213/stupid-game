var path = require("path");

let resolve = {
    alias: {
        client: path.resolve(__dirname, "client"),
        shared: path.resolve(__dirname, "shared"),
        server: path.resolve(__dirname, "server")
    },
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
};


module.exports = [{
    entry: "./client/index.ts",
    output: {
        path: path.join(__dirname, "build"),
        filename: "client.js"
    },
    resolve: resolve,
    module: {
        loaders: [
            { test: /\.ts$/, loader: "ts-loader" },
            { test: /\.png$/, loader: "url-loader?limit=10000" }
        ]
    }
}, {
    target: 'node', 
    entry: "./server/index.ts",
    output: {
        path: path.join(__dirname, "build"),
        filename: "server.js"
    },
    resolve: resolve,
    module: {
        loaders: [
            { test: /\.ts$/, loader: "ts-loader" },
            { test: /\.png$/, loader: "url-loader?limit=10000" }
        ]
    }
}];
