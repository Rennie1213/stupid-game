var config = require('./webpack.shared');
var path = require("path");

module.exports = config({
    entry: "./client/index.js",
    output: {
        path: path.join(__dirname, "build"),
        filename: "client.js"
    }
});
