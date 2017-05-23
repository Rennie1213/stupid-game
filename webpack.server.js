var config = require('./webpack.shared');
var path = require("path");

module.exports = config({
    target: 'node',
    entry: "./server/index.js",
    output: {
        path: path.join(__dirname, "build"),
        filename: "server.js"
    }
});
