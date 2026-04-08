# Chrome Web Store – Guía de envío

Material preparado para publicar **Localizar mi móvil** en la Chrome Web Store.

**Workspace:** `C:\code\find-my-phone\`. **Edge (política 1.1.2 — propuesta de valor):** [`EDGE-PARTNER-CENTER-RESUBMIT-EN.md`](EDGE-PARTNER-CENTER-RESUBMIT-EN.md).

---

## 1. Política de privacidad (URL requerida)

Debes alojar `privacy.html` en una URL pública. Opciones:

- **GitHub Pages:** Si el repo está en GitHub, activa Pages en Settings → Pages → Source: main branch, carpeta / (root). La URL será:  
  `https://TU_USUARIO.github.io/find-my-phone/privacy.html`
- **Otro hosting:** Sube `privacy.html` a tu dominio (ej. `https://tudominio.com/find-my-phone-privacy`)

---

## 2. Descripciones para la tienda

### Descripción corta (máx. 132 caracteres)

**Español:**
```
Un clic para abrir Find My Device (Android) o Find My iPhone y hacer sonar tu teléfono cuando no lo encuentras.
```
(95 caracteres)

**English:**
```
One click to open Find My Device (Android) or Find My iPhone—locate, ring, lock, or erase your phone when you can't find it.
```
(107 caracteres)

### Descripción detallada (mín. 250 caracteres)

**Español:**
```
¿No encuentras tu teléfono en casa? Localizar mi móvil te permite abrir el localizador oficial de Google (Android) o Apple (iPhone) con un solo clic, sin buscar marcadores ni escribir URLs.

Características:
• Un clic para abrir Find My Device (Android) o iCloud Find (iPhone)
• Se abre en una ventana emergente, sin ocupar toda la pantalla
• Selector de idioma (Español / English)
• Opción de recordar tu plataforma preferida para acceso rápido
• Sin servidores propios: usa los servicios oficiales de Google y Apple

Requisitos:
• Android: cuenta de Google, Find My Device activado
• iPhone: Apple ID, Find My iPhone activado

La extensión no recopila datos. Solo guarda tu preferencia de idioma y plataforma en tu navegador.
```

**English:**
```
Can't find your phone? Whether at home, at the office, or anywhere else—Find my phone lets you open Google's (Android) or Apple's (iPhone) official locator with one click. No bookmarks or URLs to remember.

Use cases: locate a misplaced phone, make it ring when it's nearby, check its location, or quickly access remote lock and erase options.

Features:
• One click to open Find My Device (Android) or iCloud Find (iPhone)
• Opens in a popup window, without taking over your screen
• Language selector (Spanish / English)
• Option to remember your preferred platform for quick access
• No own servers: uses official Google and Apple services

Requirements:
• Android: Google account, Find My Device enabled
• iPhone: Apple ID, Find My iPhone enabled

The extension does not collect data. It only stores your language and platform preference in your browser.
```

---

## 3. Capturas de pantalla

**Dimensiones:** 1280×800 px (generadas automáticamente)

**Imágenes generadas** (en `store-assets/`):
- `screenshot-1-1280x800.png` — Vista completa: Google Localizador + popup de la extensión
- `screenshot-2-1280x800.png` — Popup de la extensión (interfaz limpia)

**Regenerar:** Ejecuta `node process-screenshots.js` desde la carpeta find-my-phone (con las capturas en assets/).

---

## 4. Tiles promocionales (opcionales)

| Tipo | Tamaño | Uso |
|------|--------|-----|
| Pequeño | 440×280 px | Aparece en listados |
| Grande | 1400×560 px | Destacado en la tienda |

Generadas por `node process-screenshots.js` (a partir de tus capturas):
- `promo-small-440x280.png` — Tile pequeño (popup centrado)
- `promo-large-1400x560.png` — Tile grande (popup centrado)

---

## 5. Categoría sugerida

**Productividad** o **Herramientas**

---

## 6. Checklist antes de subir

- [ ] ZIP del proyecto (sin `node_modules`, `.git`, `*.md`, `generate-*.js`, `icon.svg`, `package*.json`)
- [ ] URL de política de privacidad alojada y accesible
- [ ] Descripción corta y detallada copiadas
- [ ] Al menos 1 captura de pantalla (recomendado 2–3)
- [ ] Icono 128×128 (ya incluido en el paquete)

---

## 7. Crear el ZIP para subir

Incluir solo:
- `manifest.json`
- `popup.html`
- `popup.css`
- `popup.js`
- `icons/` (icon16.png, icon32.png, icon48.png, icon128.png)

Excluir: `node_modules`, `.git`, `*.md`, `privacy*.html`, `generate-*.js`, `icon.svg`, `package*.json`, `CHROME_WEB_STORE.md`, etc.

En PowerShell (desde la carpeta del proyecto):
```powershell
$exclude = @('node_modules','.git','*.md','privacy*.html','generate-*.js','icon.svg','package*.json','CHROME_WEB_STORE.md','PUBLICAR_GITHUB.md')
Compress-Archive -Path manifest.json,popup.html,popup.css,popup.js,icons -DestinationPath find-my-phone.zip -Force
```
