const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const iconsDir = path.join(__dirname, 'icons');
const storeDir = path.join(__dirname, 'store-assets');

async function generateTiles() {
  if (!fs.existsSync(storeDir)) fs.mkdirSync(storeDir, { recursive: true });

  const icon128 = await sharp(path.join(iconsDir, 'icon128.png')).toBuffer();

  // Small tile: 440x280
  await sharp({
    create: { width: 440, height: 280, channels: 4, background: { r: 79, g: 70, b: 229, alpha: 1 } }
  })
    .png()
    .composite([{
      input: icon128,
      top: 76,
      left: 156
    }])
    .toFile(path.join(storeDir, 'promo-small-440x280.png'));
  console.log('Done: promo-small-440x280.png');

  // Large tile: 1400x560
  await sharp({
    create: { width: 1400, height: 560, channels: 4, background: { r: 79, g: 70, b: 229, alpha: 1 } }
  })
    .png()
    .composite([{
      input: icon128,
      top: 216,
      left: 636
    }])
    .toFile(path.join(storeDir, 'promo-large-1400x560.png'));
  console.log('Done: promo-large-1400x560.png');

  console.log('Store assets saved to store-assets/');
}

generateTiles().catch(console.error);
