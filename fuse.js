
const {
	FuseBox,
	LESSPlugin,
	PostCSSPlugin,
	CSSPlugin,
	CSSResourcePlugin
} = require("fuse-box");
const path = require("path");


let fuse = FuseBox.init({

	homeDir: 'src/',

	output: `dist/$name.js`,

	useTypescriptCompiler : true,

	target: 'browser@es5',

	hash: false,
	cache: true,

	sourceMaps: false,

	log: true,
	debug: true,


	plugins: [
		[
			LESSPlugin({
				ieCompat: false,
				paths: [
					path.resolve( __dirname )
				]
			}),

			PostCSSPlugin([
				require('autoprefixer')({
					browsers: [
						`last 4 versions`,
						`ie >= 11`,
						`iOS >= 7`
					]
				}),

				require('postcss-clean')({
					format: 'beautify',
					advanced: true
				})
			]),

			CSSResourcePlugin({}),

			CSSPlugin({})
		]
	]
});

fuse.bundle('mainApp').instructions(`!> [index.ts]`);

fuse.dev();

fuse.run();