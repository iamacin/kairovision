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
    // Only include REACT_APP_ variables or other essential ones
    if (key.startsWith('REACT_APP_') || 
        key === 'NODE_ENV' || 
        key === 'PUBLIC_URL') {
      env[key] = JSON.stringify(process.env[key]);
    }
    return env;
  }, {})
};

// Ensure Supabase credentials are available
if (!process.env.REACT_APP_SUPABASE_URL || !process.env.REACT_APP_SUPABASE_ANON_KEY) {
  console.warn('Warning: Supabase credentials are missing in environment variables. App may not function correctly.');
  
  // Add these to the environment with placeholder values during dev/build
  if (process.env.NODE_ENV === 'development') {
    process.env.REACT_APP_SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
    process.env.REACT_APP_SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || 'your-anon-key';
  }
}

// Determine if we're in production mode
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProduction ? '[name].[contenthash].js' : 'bundle.js',
    publicPath: '/',
    clean: true // Clean the output directory before emit
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        type: 'asset/resource'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: isProduction ? {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      } : false
    }),
    // Add environment variables to the build
    new webpack.DefinePlugin(stringifiedEnv)
  ].concat(isProduction ? [
    // Production-only plugins
    new PreloadWebpackPlugin({
      rel: 'preload',
      include: 'asyncChunks'
    }),
    new CopyPlugin({
      patterns: [
        { 
          from: 'public', 
          to: '', 
          globOptions: {
            ignore: ['**/index.html'] // Don't copy index.html as HtmlWebpackPlugin handles it
          }
        }
      ]
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240, // Only compress assets bigger than 10kb
      minRatio: 0.8
    })
  ] : []),
  optimization: {
    minimize: isProduction,
    minimizer: isProduction ? [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
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
      }),
      new CssMinimizerPlugin()
    ] : [],
    splitChunks: isProduction ? {
      chunks: 'all',
      name: false,
    } : false
  },
  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true,
    compress: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    }
  },
  performance: {
    hints: isProduction ? 'warning' : false
  }
}; 