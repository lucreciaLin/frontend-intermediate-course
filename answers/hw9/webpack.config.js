var webpack = require('webpack');
var path = require("path");
let uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
module.exports = {
	entry:  __dirname + "/assets/js/index.js",
	output: {
		path: __dirname + "/dist/",
		filename: "bundle.js"
	},
	module: {
	  rules: [
	    {
	      test: /\.js$/,
	      exclude: /(node_modules|bower_components)/,
	      use: {
	        loader: 'babel-loader',
	        options: {
	          presets: ['env']
	        }
	      }
	    }
	  ]
	},
	 plugins: [
        new uglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};