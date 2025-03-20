const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;

async function optimizeImage(inputPath, outputPath, options = {}) {
  try {
    // Create optimized directory if it doesn't exist
    const dir = path.dirname(outputPath);
    await fs.mkdir(dir, { recursive: true });

    const pipeline = sharp(inputPath)
      .resize({
        width: options.width || 1920,
        height: options.height,
        fit: 'inside',
        withoutEnlargement: true
      });

    // Apply different optimization strategies based on image size
    if (options.width > 1000) {
      // For larger images like hero images, be very aggressive
      await pipeline
        .webp({ 
          quality: 50,
          effort: 6,
          reductionEffort: 6,
          nearLossless: false,
          alphaQuality: 70,
          smartSubsample: true,
          mixed: true,
          force: true
        })
        .toFile(outputPath);
    } else {
      // For smaller images like thumbnails, be moderately aggressive
      await pipeline
        .webp({ 
          quality: 65,
          effort: 6,
          reductionEffort: 6,
          nearLossless: true,
          alphaQuality: 80,
          force: true
        })
        .toFile(outputPath);
    }
    
    console.log(`Optimized: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error);
  }
}

async function main() {
  const images = [
    {
      input: 'public/images/Kairo AI 1.jpg',
      output: 'public/assets/optimized/kairo-ai-1.webp',
      options: { width: 800, quality: 50 }
    },
    {
      input: 'public/assets/home-hero.png',
      output: 'public/assets/optimized/home-hero.webp',
      options: { width: 1200, quality: 50 }
    },
    {
      input: 'public/assets/images/agents/agent2.jpg',
      output: 'public/assets/optimized/agent2.webp',
      options: { width: 400, quality: 65 }
    }
  ];

  for (const image of images) {
    await optimizeImage(image.input, image.output, image.options);
  }
}

main().catch(console.error); 