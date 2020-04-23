const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const WebpackDevServer = require("webpack-dev-server");
const HTMLWebpackPlugin = require('html-webpack-plugin');

function startTask() {
  const config = {
    entry: "./example/async/index.tsx",
    context: path.resolve(__dirname, '../'),
    output: {
      filename: "index.js",
      path: path.resolve(process.cwd(), "es")
    },
    mode: "development",
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_module/,
          use: [
            {
              loader: 'babel-loader',
            },
            {
              loader: 'ts-loader',
            }
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_module/,
          use: [
            {
              loader: 'babel-loader',
            }
          ]
        },
        {
          test: /\.css$/i,
          use: [
            "style-loader",
            "css-loader"
          ]
        },
      ]
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".json"]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HTMLWebpackPlugin({
        title: 'Test',
        filename: 'index.html',
        template: path.resolve(process.cwd(), 'example/index.html')
      }),
    ],
    optimization: {}
  };
  const devServerOptions = {
    compress: true, // gzip
    contentBase: "./es",
    hot: true, // HMR
    open: true, // open browser
    stats: {
      colors: true,
      chunks: false,
      modules: false, // hide module infomation
      children: false // hide child infomation
    },
    overlay: true // show compiler errors in the browser
  };
  WebpackDevServer.addDevServerEntrypoints(config, devServerOptions);
  const compiler = webpack(config);
  const server = new WebpackDevServer(compiler, devServerOptions);
  server.listen(8080, "127.0.0.1", () => {
    console.log("Starting server on http://location:8080");
  });
}

startTask();
