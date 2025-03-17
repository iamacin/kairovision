#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to convert filename to kebab-case
function toKebabCase(str) {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, '') // Remove special characters
    .replace(/-+/g, '-');     // Replace multiple hyphens with single hyphen
}

// Function to rename files in a directory
function renameFiles(directory) {
  if (!fs.existsSync(directory)) {
    console.log(`Directory not found: ${directory}`);
    return;
  }

  const files = fs.readdirSync(directory);
  
  files.forEach(file => {
    if (file === '.DS_Store') return; // Skip .DS_Store files
    
    const oldPath = path.join(directory, file);
    if (fs.statSync(oldPath).isDirectory()) {
      renameFiles(oldPath); // Recursively process subdirectories
      return;
    }

    const ext = path.extname(file);
    const nameWithoutExt = path.basename(file, ext);
    const newName = `${toKebabCase(nameWithoutExt)}${ext.toLowerCase()}`;
    
    if (file !== newName) {
      const newPath = path.join(directory, newName);
      fs.renameSync(oldPath, newPath);
      console.log(`Renamed: ${file} -> ${newName}`);
    }
  });
}

// Directories to process
const directories = [
  'public/assets/images',
  'public/assets/partners',
  'public/assets/icons'
];

// Rename files in all directories
directories.forEach(dir => {
  console.log(`\nProcessing directory: ${dir}`);
  renameFiles(dir);
});

// Update images.js configuration
const imagesConfigPath = 'src/utils/images.js';
let imagesConfig = fs.readFileSync(imagesConfigPath, 'utf8');

// Update partner paths
imagesConfig = imagesConfig.replace(
  /wave logo\.png/g, 
  'wave-logo.png'
);
imagesConfig = imagesConfig.replace(
  /Bicis\.webp/g, 
  'bicis.webp'
);

fs.writeFileSync(imagesConfigPath, imagesConfig);
console.log('\nUpdated images.js configuration'); 