# Find my phone

**Workspace local:** `C:\code\find-my-phone\` (repo autoritativo; no duplicar en otros árboles).

Browser extension to locate your phone with one click. Can't find your phone? Open Find My Device (Android) or Find My iPhone directly from the toolbar.

## Installation

### Chrome / Edge

1. Open `chrome://extensions` (or `edge://extensions`)
2. Enable **Developer mode** (top right)
3. Click **Load unpacked**
4. Select the `find-my-phone` folder

### Firefox

1. Open `about:debugging`
2. Click **This Firefox**
3. **Load Temporary Add-on** → select the `manifest.json` file in the folder

> **Note:** Firefox may require Manifest V2 adjustments. Chrome and Edge use Manifest V3.

## Usage

1. Click the extension icon
2. Choose **Android** or **iPhone** according to your device
3. Find My Device or iCloud Find will open in a popup window (900×700 px)
4. Sign in if required
5. Click **Play sound** to make your phone ring

## Customization

- **Remember platform:** Check the box to open your preferred option directly next time (stored locally in the browser).

## Icons

Icons are generated from the included SVG. To regenerate:

```bash
npm install
npm run generate-icons
```

## Requirements

- Android: Google account, Find My Device enabled on the phone
- iPhone: Apple ID, Find My iPhone enabled

## Privacy

[Privacy Policy](https://mapicallo.github.io/find-my-phone/privacy.html)
