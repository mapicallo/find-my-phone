const URLS = {
  android: 'https://www.google.com/android/find/',
  iphone: 'https://www.icloud.com/find/',
};

const TRANSLATIONS = {
  es: {
    title: 'Localizar mi móvil',
    subtitle: '¿No encuentras tu teléfono? Hazlo sonar con un clic.',
    language: 'Idioma',
    locateNow: 'Localizar ahora',
    rememberPlatform: 'Recordar mi plataforma',
    note: 'Se abrirá una pestaña en el navegador. Inicia sesión en el sitio si es necesario.',
    closeWindow: 'Cerrar',
    windowHint: 'Arrastra la barra de título para mover. Redimensiona desde cualquier borde.',
    footerVersion: 'Versión {v}',
    footerVersionTitle: 'Coincide con el paquete instalado (manifest.json).',
    brandFooterAria: 'AI4Context — abrir sitio web',
    brandByPrefix: 'por',
  },
  en: {
    title: 'Find my phone',
    subtitle: "Can't find your phone? Make it ring with one click.",
    language: 'Language',
    locateNow: 'Locate now',
    rememberPlatform: 'Remember my platform',
    note: 'Opens a tab in your browser. Sign in on the site if required.',
    closeWindow: 'Close',
    windowHint: 'Drag the title bar to move. Resize from any edge.',
    footerVersion: 'Version {v}',
    footerVersionTitle: 'Matches the installed package (manifest.json).',
    brandFooterAria: 'AI4Context — open website',
    brandByPrefix: 'by',
  },
};

const btnAndroid = document.getElementById('btn-android');
const btnIphone = document.getElementById('btn-iphone');
const btnQuick = document.getElementById('btn-quick');
const quickOpen = document.getElementById('quick-open');
const rememberCheckbox = document.getElementById('rememberPlatform');
const languageSelect = document.getElementById('languageSelect');
const btnClose = document.getElementById('btnClose');

let currentLang = 'es';

function applyTranslations() {
  const t = TRANSLATIONS[currentLang];
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });
  document.documentElement.lang = currentLang === 'es' ? 'es' : 'en';
  const brandFooter = document.getElementById('a4c-brand-footer');
  if (brandFooter) brandFooter.setAttribute('aria-label', t.brandFooterAria);
  const byPrefix = document.getElementById('a4c-brand-by-prefix');
  if (byPrefix) byPrefix.textContent = t.brandByPrefix;
  if (languageSelect) languageSelect.setAttribute('aria-label', t.language);
  setExtensionVersionLabel();
}

function setExtensionVersionLabel() {
  const verEl = document.getElementById('extensionVersion');
  if (!verEl || typeof chrome === 'undefined' || !chrome.runtime?.getManifest) return;
  const t = TRANSLATIONS[currentLang];
  try {
    const v = chrome.runtime.getManifest().version;
    if (v) {
      verEl.textContent = t.footerVersion.replace('{v}', v);
      verEl.title = t.footerVersionTitle;
    }
  } catch {
    verEl.textContent = '';
    verEl.removeAttribute('title');
  }
}

/**
 * Opens the provider URL in a background tab on the main browser window, then
 * refocuses this floating panel.
 */
async function openFindUrlInBackground(url) {
  const panelWin = await chrome.windows.getCurrent();

  let targetWindowId;
  try {
    const lastNormal = await chrome.windows.getLastFocused({ windowTypes: ['normal'] });
    if (lastNormal?.type === 'normal' && lastNormal.id !== panelWin.id) {
      targetWindowId = lastNormal.id;
    }
  } catch {
    /* ignore */
  }

  if (targetWindowId === undefined) {
    const normals = await chrome.windows.getAll({ windowTypes: ['normal'] });
    const other = normals.find((w) => w.id !== panelWin.id);
    if (other) targetWindowId = other.id;
  }

  if (targetWindowId !== undefined) {
    await chrome.tabs.create({ windowId: targetWindowId, url, active: false });
  } else {
    await chrome.tabs.create({ url, active: false });
  }

  await chrome.windows.update(panelWin.id, { focused: true });
}

async function openPlatform(platform) {
  const url = URLS[platform];
  await openFindUrlInBackground(url);

  if (rememberCheckbox.checked) {
    await chrome.storage.local.set({ 'find-my-phone-platform': platform });
    showQuickOpen(platform);
  }
}

function showQuickOpen(platform) {
  if (platform) {
    quickOpen.style.display = 'block';
    btnQuick.onclick = () => openFindUrlInBackground(URLS[platform]);
  }
}

async function changeLanguage(lang) {
  currentLang = lang;
  await chrome.storage.local.set({ 'find-my-phone-language': lang });
  applyTranslations();
}

async function init() {
  if (btnClose) {
    btnClose.addEventListener('click', () => window.close());
  }

  const { 'find-my-phone-language': lang, 'find-my-phone-platform': saved } =
    await chrome.storage.local.get(['find-my-phone-language', 'find-my-phone-platform']);
  if (lang && TRANSLATIONS[lang]) {
    currentLang = lang;
    languageSelect.value = lang;
  }
  applyTranslations();
  if (saved) {
    rememberCheckbox.checked = true;
    showQuickOpen(saved);
  }
}

languageSelect.addEventListener('change', (e) => changeLanguage(e.target.value));
btnAndroid.addEventListener('click', () => openPlatform('android'));
btnIphone.addEventListener('click', () => openPlatform('iphone'));

init();
