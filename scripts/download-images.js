#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const { images } = require('../src/utils/images');

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

function downloadImage(url, filePath) {
  // Skip if it's not a valid URL (local file path)
  if (!isValidUrl(url)) {
    console.log(`Skipping local file: ${url}`);
    return Promise.resolve();
  }

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
          console.log(`Downloaded: ${url} -> ${filePath}`);
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

  // Only download images that are URLs, skip local files
  function processImageSet(images, targetDir) {
    Object.entries(images).forEach(([key, url]) => {
      if (isValidUrl(url)) {
        const ext = path.extname(url) || '.jpg'; // Default to .jpg if no extension
        const filePath = path.join(__dirname, '..', 'public', targetDir, `${key}${ext}`);
        downloadTasks.push(downloadImage(url, filePath));
      }
    });
  }

  // Process each image category
  if (images.properties) {
    processImageSet(images.properties, 'assets/images/properties');
  }

  if (images.neighborhoods) {
    processImageSet(images.neighborhoods, 'assets/images/neighborhoods');
  }

  if (images.agents) {
    processImageSet(images.agents, 'assets/images/agents');
  }

  try {
    await Promise.all(downloadTasks);
    console.log('All remote images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading images:', error);
    // Don't exit with error code, as local files are expected
    console.log('Continuing build process...');
  }
}

downloadAllImages(); 