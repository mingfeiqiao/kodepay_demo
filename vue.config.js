const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const packageName = "KodePay Demo" // 定义项目打包后文件名

// 复制文件夹到指定目录
const copyFiles = [
	{
		from: path.resolve("src/manifest.json"),
		to: `${path.resolve(packageName)}/manifest.json`
	},
	{
		from: path.resolve("src/assets"),
		to: path.resolve(packageName)
	},
	{
		from: path.resolve("src/_locales"),
		to: path.resolve(packageName + "/_locales")
	}
];
// 复制插件
const plugins = [
	new CopyWebpackPlugin({
		patterns: copyFiles
	})
];

module.exports = {
	pages: {
		popup: {
			entry: `src/popup/main.js`,
			template: `src/popup/index.html`,
			filename: `popup.html`
		}
	},
	productionSourceMap: false,
	pluginOptions: {
		browserExtension: {
			componentOptions: {
				background: {
					entry: 'src/background/main.js'
				}
			}
		}
	},
	// 根目录  如果不写 默认是dist
	outputDir: __dirname + '/' + packageName,
	configureWebpack: {
		watch: true,
		entry: {
			background: "./src/background/main.js"
		},
		output: {
			filename: "js/[name].js"
		},
		plugins,
    optimization:{
      splitChunks: false
    },
		// 打包文件大小配置
    performance: {
			maxEntrypointSize: 10000000,
			maxAssetSize: 30000000
		}
	},
	css: {
		extract: {
			filename: "css/[name].css"
		}
	},
	chainWebpack: config => {
		if (process.env.NODE_ENV === 'production') {
			config.output.filename('js/[name].js').end()
			config.output.chunkFilename('js/[name].js').end()
		}
	}
}