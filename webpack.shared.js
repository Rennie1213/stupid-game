var path = require("path");

module.exports = function (config) {
	let base = {

		devtool: 'eval-source-map',
        watch: true,

	    stats: {
	    	color: true,
	    	errorDetails: true
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
	        rules: [
	            { 
                    test: /\.js$/,
                    loader: "babel-loader",
                    exclude: /node_modules/
                },
	            { test: /\.png$/, loader: "file-loader" },
	            { test: /(\.md|\.html)$/, loader: "null-loader" },
	        ]
	    }
	};

	return Object.assign(config, base);
}
