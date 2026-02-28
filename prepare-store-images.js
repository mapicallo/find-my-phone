/**
 * Prepara imágenes para Chrome Web Store a partir de tus capturas.
 * 
 * INSTRUCCIONES:
 * 1. Crea la carpeta store-assets/raw-screenshots/
 * 2. Coloca tus 2 capturas ahí con nombres: screenshot1.png y screenshot2.png
 *    - screenshot1: ventana con Google Localizador + popup de la extensión
 *    - screenshot2: solo el popup de la extensión (limpio)
 * 3. Ejecuta: node prepare-store-images.js
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const rawDir = path.join(__dirname, 'store-assets', 'raw-screenshots');
const outDir = path.join(__dirname, 'store-assets');

// Dimensiones Chrome Web Store
const SCREENSHOT_SIZE = { width: 1280, height: 800 };
const SMALL_TILE = { width: 440, height: 280 };
const LARGE_TILE = { width: 1400, height: 560 };

async function processImage(inputPath, outputPath, width, height, fit = 'cover') {
  await sharp(inputPath)
    .resize(width, height, { fit })
    .png()
    .toFile(outputPath);
  console.log(`  → ${path.basename(outputPath)}`);
}

async function main() {
  const s1 = path.join(rawDir, 'screenshot1.png');
  const s2 = path.join(rawDir, 'screenshot2.png');

  if (!fs.existsSync(rawDir)) {
    fs.mkdirSync(rawDir, { recursive: true });
    console.log('Carpeta creada: store-assets/raw-screenshots/');
    console.log('Coloca ahí screenshot1.png y screenshot2.png y vuelve a ejecutar.');
    return;
  }

  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // Screenshots para la tienda (1280x800)
  if (fs.existsSync(s1)) {
    await processImage(s1, path.join(outDir, 'screenshot-1-1280x800.png'), SCREENSHOT_SIZE.width, SCREENSHOT_SIZE.height);
  } else {
    console.log('No encontrado: screenshot1.png');
  }

  if (fs.existsSync(s2)) {
    await processImage(s2, path.join(outDir, 'screenshot-2-1280x800.png'), SCREENSHOT_SIZE.width, SCREENSHOT_SIZE.height);
    // Tiles promocionales a partir del popup (screenshot 2 es más limpio)
    await processImage(s2, path.join(outDir, 'promo-small-440x280.png'), SMALL_TILE.width, SMALL_TILE.height);
    await processImage(s2, path.join(outDir, 'promo-large-1400x560.png'), LARGE_TILE.width, LARGE_TILE.height);
  } else {
    console.log('No encontrado: screenshot2.png');
    // Si no hay screenshot2, generar tiles con el icono (fallback)
    const iconPath = path.join(__dirname, 'icons', 'icon128.png');
    if (fs.existsSync(iconPath)) {
      const icon = await sharp(iconPath).toBuffer();
      await sharp({
        create: { width: SMALL_TILE.width, height: SMALL_TILE.height, channels: 4, background: { r: 79, g: 70, b: 229, alpha: 1 } }
      }).png().composite([{ input: icon, top: 76, left: 156 }]).toFile(path.join(outDir, 'promo-small-440x280.png'));
      await sharp({
        create: { width: LARGE_TILE.width, height: LARGE_TILE.height, channels: 4, background: { r: 79, g: 70, b: 229, alpha: 1 } }
      }).png().composite([{ input: icon, top: 216, left: 636 }]).toFile(path.join(outDir, 'promo-large-1400x560.png'));
      console.log('  → promo-small-440x280.png (fallback con icono)');
      console.log('  → promo-large-1400x560.png (fallback con icono)');
    }
  }

  console.log('\nImágenes guardadas en store-assets/');
}

main().catch(console.error);
