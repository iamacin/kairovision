const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');

// Load environment variables from .env file
const env = dotenv.config().parsed || {};

// Convert env variables to strings
const stringifiedEnv = {
  'process.env': Object.keys(process.env).reduce((env, key) => {
    env[key] = JSON.stringify(process.env[key]);
    return env;
  }, {})
};

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
    clean: true,
    assetModuleFilename: 'assets/[name][ext]'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { 
                modules: false,
                useBuiltIns: 'usage',
                corejs: 3,
                targets: {
                  browsers: [
                    'last 2 Chrome versions',
                    'last 2 Firefox versions',
                    'last 2 Safari versions',
                    'last 2 Edge versions'
                  ]
                }
              }],
              '@babel/preset-react'
            ],
            plugins: [
              '@babel/plugin-transform-runtime',
              ['babel-plugin-styled-components', { 
                displayName: false,
                pure: true
              }]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', 
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: false
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 // 4kb
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@assets': path.resolve(__dirname, 'src/assets')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: true,
      minify: process.env.NODE_ENV === 'production' ? {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      } : false
    }),
    new PreloadWebpackPlugin({
      rel: 'preload',
      include: 'allAssets',
      fileBlacklist: [
        /\.map$/,
        /hot-update\.js$/,
        /\.woff$/,
        /vendor\.(.*?)\.js$/
      ],
      as(entry) {
        if (/\.css$/.test(entry)) return 'style';
        if (/\.woff2$/.test(entry)) return 'font';
        if (/\.(jpg|jpeg|png|webp)$/.test(entry)) return 'image';
        return 'script';
      }
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    new webpack.DefinePlugin(stringifiedEnv),
    new CopyPlugin({
      patterns: [
        { 
          from: 'public/assets/optimized',
          to: 'assets/optimized'
        },
        {
          from: 'public/_redirects',
          to: ''
        },
        {
          from: 'public/robots.txt',
          to: ''
        }
      ]
    }),
    new CompressionPlugin({
      test: /\.(js|css|html|svg)$/,
      algorithm: 'gzip',
      threshold: 10240,
      minRatio: 0.8
    }),
    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.sharpMinify,
        options: {
          encodeOptions: {
            webp: {
              quality: 50,
              effort: 6,
              reductionEffort: 6,
              nearLossless: false,
              alphaQuality: 70,
              smartSubsample: true,
              mixed: true,
              force: true
            }
          }
        }
      }
    })
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 3000,
    compress: true
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log'],
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        extractComments: false,
        parallel: true,
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
              minifyFontValues: { removeQuotes: false },
            },
          ],
        },
        parallel: true,
      }),
    ],
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 15000,
      maxSize: 100000,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // Get the package name
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            
            // Specifically optimize large packages
            if (
              packageName === 'react' || 
              packageName === 'react-dom' || 
              packageName === 'framer-motion' ||
              packageName === 'styled-components'
            ) {
              return `vendor.${packageName.replace('@', '')}`;
            }
            
            // Group other smaller packages by first letter to reduce request count
            return `vendor.${packageName.replace('@', '').split('.')[0][0]}`;
          },
          priority: -10
        },
        common: {
          name: 'common',
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      },
    },
    runtimeChunk: 'single',
    moduleIds: 'deterministic'
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
    hints: 'warning'
  }
}; 