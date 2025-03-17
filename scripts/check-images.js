#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { images } = require('../src/utils/images');

// Function to check if file exists
function checkFile(filepath) {
  const fullPath = path.join(__dirname, '..', 'public', filepath);
  return fs.existsSync(fullPath);
}

// Function to format file path for display
function formatPath(filepath) {
  return `public${filepath}`;
}

console.log('\n🔍 Checking required images...\n');

// Check main images
const mainImages = {
  'Logo': images.logo,
  'Hero image': images.hero,
  'Mockup': images.mockup
};

console.log('Main images:');
Object.entries(mainImages).forEach(([name, path]) => {
  const exists = checkFile(path);
  console.log(`${exists ? '✅' : '❌'} ${name}: ${formatPath(path)}`);
});

// Check partner logos
console.log('\nPartner logos:');
Object.entries(images.partners).forEach(([name, path]) => {
  const exists = checkFile(path);
  console.log(`${exists ? '✅' : '❌'} ${name}: ${formatPath(path)}`);
});

// Check property images
console.log('\nProperty images:');
Object.entries(images.properties).forEach(([name, path]) => {
  const exists = checkFile(path);
  console.log(`${exists ? '✅' : '❌'} ${name}: ${formatPath(path)}`);
});

// Check neighborhood images
console.log('\nNeighborhood images:');
Object.entries(images.neighborhoods).forEach(([name, path]) => {
  const exists = checkFile(path);
  console.log(`${exists ? '✅' : '❌'} ${name}: ${formatPath(path)}`);
});

// Check agent images
console.log('\nAgent images:');
Object.entries(images.agents).forEach(([name, path]) => {
  const exists = checkFile(path);
  console.log(`${exists ? '✅' : '❌'} ${name}: ${formatPath(path)}`);
});

console.log('\n✨ Check complete!'); 