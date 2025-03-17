#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const { images } = require('../src/utils/images');

function downloadImage(url, filePath) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filePath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve();
        });
      } else {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function downloadAllImages() {
  const downloadTasks = [];

  // Download properties images
  Object.entries(images.properties).forEach(([key, url]) => {
    const filePath = path.join(__dirname, '../public/assets/images/properties', `${key}.jpg`);
    downloadTasks.push(downloadImage(url, filePath));
  });

  // Download neighborhoods images
  Object.entries(images.neighborhoods).forEach(([key, url]) => {
    const filePath = path.join(__dirname, '../public/assets/images/neighborhoods', `${key}.jpg`);
    downloadTasks.push(downloadImage(url, filePath));
  });

  // Download agents images
  Object.entries(images.agents).forEach(([key, url]) => {
    const filePath = path.join(__dirname, '../public/assets/images/agents', `${key}.jpg`);
    downloadTasks.push(downloadImage(url, filePath));
  });

  try {
    await Promise.all(downloadTasks);
    console.log('All images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading images:', error);
    process.exit(1);
  }
}

downloadAllImages(); 