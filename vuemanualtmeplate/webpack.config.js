const path = require('path')
const VueLoader = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			}
		]
	},
	plugins: [
		new VueLoader(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			inject: true
		})
	],
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.js'
		}
	},
	devServer: {
		contentBase: 'dist',
		stats: {colors: true},
		historyApiFallback: true,
		inline: true
	}
}