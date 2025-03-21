#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Set the NODE_ENV to development
process.env.NODE_ENV = 'development';

// Run webpack-dev-server with basic settings
const webpackProcess = spawn('npx', [
  'webpack', 'serve',
  '--mode', 'development',
  '--config', path.resolve(__dirname, 'webpack.config.js'),
  '--open',
  '--port', '3000'
], { 
  stdio: 'inherit',
  shell: true 
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('Stopping development server...');
  webpackProcess.kill('SIGINT');
  process.exit(0);
});

webpackProcess.on('close', (code) => {
  if (code !== 0) {
    console.error(`webpack-dev-server process exited with code ${code}`);
    process.exit(code);
  }
}); 