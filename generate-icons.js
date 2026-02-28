const fs = require('fs');
const path = require('path');

const sharp = require('sharp');

const svgPath = path.join(__dirname, 'icon.svg');
const iconsDir = path.join(__dirname, 'icons');
const sizes = [16, 32, 48, 128];

async function generate() {
  const svg = fs.readFileSync(svgPath);
  for (const size of sizes) {
    await sharp(svg)
      .resize(size, size)
      .png()
      .toFile(path.join(iconsDir, `icon${size}.png`));
    console.log(`Generated icon${size}.png`);
  }
  console.log('Done.');
}

generate().catch(console.error);
