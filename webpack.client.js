var config = require('./webpack.shared');
var path = require("path");

module.exports = config({
    entry: "./client/index.ts",
    output: {
        path: path.join(__dirname, "build"),
        filename: "client.js"
    }
});