const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Ruta a assets (workspace code-rag-java o .cursor/projects)
const ASSETS_BASE = path.join(__dirname, '..', 'assets');
const ASSETS_CURSOR = 'C:\\Users\\mapic\\.cursor\\projects\\c-code-rag-java\\assets';
const base = fs.existsSync(ASSETS_BASE) ? ASSETS_BASE : ASSETS_CURSOR;
const IMG1 = path.join(base, 'c__Users_mapic_AppData_Roaming_Cursor_User_workspaceStorage_911f299a024078af3acf722cba70b660_images_image-4939299e-8b37-47f7-add2-8510bed3be55.png');
const IMG2 = path.join(base, 'c__Users_mapic_AppData_Roaming_Cursor_User_workspaceStorage_911f299a024078af3acf722cba70b660_images_image-172ce453-532f-4d1e-8bda-b8d46172ca08.png');

const outDir = path.join(__dirname, 'store-assets');

async function process() {
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const tasks = [];

  if (fs.existsSync(IMG1)) {
    tasks.push(
      sharp(IMG1).resize(1280, 800, { fit: 'cover' }).png().toFile(path.join(outDir, 'screenshot-1-1280x800.png')),
      sharp(IMG1).resize(440, 280, { fit: 'cover' }).png().toFile(path.join(outDir, 'promo-small-from-screenshot.png'))
    );
  }

  if (fs.existsSync(IMG2)) {
    tasks.push(
      sharp(IMG2).resize(1280, 800, { fit: 'contain', background: { r: 245, g: 245, b: 245, alpha: 1 } }).png().toFile(path.join(outDir, 'screenshot-2-1280x800.png')),
      sharp(IMG2).resize(440, 280, { fit: 'contain', background: { r: 245, g: 245, b: 245, alpha: 1 } }).png().toFile(path.join(outDir, 'promo-small-440x280.png')),
      sharp(IMG2).resize(1400, 560, { fit: 'contain', background: { r: 245, g: 245, b: 245, alpha: 1 } }).png().toFile(path.join(outDir, 'promo-large-1400x560.png'))
    );
  }

  if (tasks.length === 0) {
    console.log('No se encontraron las capturas. Usa las rutas en assets/');
    return;
  }

  await Promise.all(tasks);
  console.log('Imágenes generadas en store-assets/:');
  fs.readdirSync(outDir).forEach(f => console.log('  -', f));
}

process().catch(console.error);
