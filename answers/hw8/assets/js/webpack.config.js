var path = require("path");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
module.exports = {
	entry: "./index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
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
    new UglifyJSPlugin()
  ]
};