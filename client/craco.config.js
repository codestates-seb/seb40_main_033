/* eslint @typescript-eslint/no-var-requires: 0 */
const { EsbuildPlugin } = require('esbuild-loader');

module.exports = {
	webpack: {
		configure: {
			optimization: {
				minimize: true,
				minimizer: [
					new EsbuildPlugin({
						minify: true,
						target: 'es2015',
						css: true,
					}),
				],
			},
			// 기존의 babel-loader 대신 esbuild-loader를 사용하도록 설정
			module: {
				rules: [
					{
						test: /\.[jt]sx?$/,
						loader: require.resolve('esbuild-loader'),
						options: {
							loader: 'tsx',
							target: 'es2015',
						},
					},
				],
			},
		},
	},
};
