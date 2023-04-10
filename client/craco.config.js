const CracoEsbuildPlugin = require('craco-esbuild');
const webpack = require('webpack');

module.exports = {
	plugins: [
		{
			plugin: CracoEsbuildPlugin,
			options: {
				esbuildMinimizerOptions: {
					target: 'es2015',
					css: true, //  OptimizeCssAssetsWebpackPlugin being replaced by esbuild.
				},
			},
		},
	],
	webpack: {
		plugins: {
			add: [
				new webpack.DefinePlugin({
					process: { env: {}, browser: {} },
				}),
			],
		},
		configure: {
			resolve: {
				fallback: {
					fs: false,
					tls: false,
					net: false,
					path: false,
					zlib: false,
					http: false,
					https: false,
					stream: false,
					crypto: false,
					buffer: false,
				},
			},
		},
	},
};
