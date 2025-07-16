const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputPath = path.join(__dirname, '../public/images/communities/jmusiclt.jpg');
const outputPath = path.join(__dirname, '../public/images/communities/jmusiclt.png');

// Check if the file exists
if (!fs.existsSync(inputPath)) {
  console.error(`Error: File not found at ${inputPath}`);
  process.exit(1);
}

// Convert the image
sharp(inputPath)
  .toFormat('png')
  .toFile(outputPath)
  .then(() => {
    console.log(`Successfully converted ${inputPath} to ${outputPath}`);
  })
  .catch(err => {
    console.error('Error converting image:', err);
    process.exit(1);
  });
