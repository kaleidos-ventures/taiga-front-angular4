const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const version = "v-" + Date.now();


const extractSass = new ExtractTextPlugin({
    filename: '[name].' + version + '.css',
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    entry: {
        app: "./app/main",
        vendor: ["immutable",
                 "@angular/forms",
                 "@angular/core",
                 "@angular/animations",
                 "@angular/common",
                 "@angular/compiler",
                 "@angular/router",
                 "@angular/http",
                 "@angular/platform-browser",
                 "@angular/platform-browser-dynamic",
                 "rxjs",
                 "lodash",
                 "moment",
                 "markdown-it",
                 "bluebird",
                 "medium-editor",
                 "dragula",
                 "messageformat",
                 "to-markdown",
                 "medium-editor-autolist",
                 "intro.js",
                 "pikaday",
                 "Flot",
                 "Flot/jquery.flot.time",
                 "jquery.flot.tooltip",
                 "flot-axislabels",
                 "l.js",
                 "zone.js",
                 "reflect-metadata",
                 "@ngrx/store",
                 "@ngrx/store-devtools",
                 "@ngrx/router-store",
                 "@ngrx/effects",
                 "@ngx-translate/core",
                 "@ngx-translate/http-loader",
                 "ngx-validators",
                 "ngx-infinite-scroll",
                 "prismjs",
                 "prismjs/plugins/custom-class/prism-custom-class",
        ],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: '[name].' + version + '.js'
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            moment: path.join(__dirname, "node_modules/moment/moment"),
            bluebird: path.join(__dirname, "node_modules/bluebird/js/release/bluebird")
        },
    },
    devtool: "source-map",
    module: {
        loaders: [
            { test: /\.ts$/,
              exclude: /\.spec\.ts$/,
              loader: 'awesome-typescript-loader',
              options: {
                  sourceMap: true,
              }
            },
            { test: /\.(pug|jade)$/,
              loader: [
                  {loader: 'raw-loader'},
                  {
                      loader: 'pug-html-loader', options: {
                          pretty: true,
                          doctype: 'html',
                          data: {
                              _version: version
                          }
                      }
                  },
              ]
            },
            { test: /\.css$/,
              loaders: [
                  { loader: "style-loader" },
                  { loader: "css-loader" }
              ]
            },
            { test: /\.scss$/,
              use: extractSass.extract({
                use: [
                  { loader: "css-loader",
                    options: {
                        sourceMap: true
                    }
                  },
                  { loader: "sass-loader",
                    options: {
                        includePaths: [
                            path.join(__dirname, "app", "styles"),
                            path.join(__dirname, "app", "styles", "extras"),
                            path.join(__dirname, "app", "themes", "taiga")
                        ],
                        sourceMap: true
                    }
                  }
                ],
                // use style-loader in development
                fallback: "style-loader"
              })
            },
            {
              test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
              use: [
                {
                  loader: 'url-loader',
                  options: {
                    limit: 10000,
                    mimetype: 'application/font-woff'
                  }
                }
              ]
            },
            {
              test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
              use: [
                { loader: 'file-loader' }
              ]
            },
            {
              test: /\.(png|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
              use: [
                { loader: 'file-loader' }
              ]
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'app/assets/', to: version },
            { from: 'node_modules/jquery/dist/jquery.min.js', to: version + "/js" },
            { from: 'app/locales', to: version + "/locales" },
            { from: 'node_modules/moment/locale/', to: version + "/locales/moment-locales/" },
        ]),
        new HtmlWebpackPlugin({
          version: version,
          template: 'app/index.pug'
        }),
        new webpack.optimize.CommonsChunkPlugin({name: "vendor", filename: 'vendor.' + version + '.js'}),
        extractSass,
    ],

    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 9001
    }
}

