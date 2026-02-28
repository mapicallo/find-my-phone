const URLS = {
  android: 'https://www.google.com/android/find/',
  iphone: 'https://www.icloud.com/find/'
};

const TRANSLATIONS = {
  es: {
    title: 'Localizar mi móvil',
    subtitle: '¿No encuentras tu teléfono? Hazlo sonar con un clic.',
    language: 'Idioma',
    locateNow: 'Localizar ahora',
    rememberPlatform: 'Recordar mi plataforma',
    note: 'Se abrirá en una ventana emergente. Inicia sesión si es necesario.'
  },
  en: {
    title: 'Find my phone',
    subtitle: "Can't find your phone? Make it ring with one click.",
    language: 'Language',
    locateNow: 'Locate now',
    rememberPlatform: 'Remember my platform',
    note: 'Will open in a popup window. Sign in if required.'
  }
};

const btnAndroid = document.getElementById('btn-android');
const btnIphone = document.getElementById('btn-iphone');
const btnQuick = document.getElementById('btn-quick');
const quickOpen = document.getElementById('quick-open');
const rememberCheckbox = document.getElementById('rememberPlatform');
const languageSelect = document.getElementById('languageSelect');

let currentLang = 'es';

function applyTranslations() {
  const t = TRANSLATIONS[currentLang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });
  document.documentElement.lang = currentLang === 'es' ? 'es' : 'en';
}

async function openPlatform(platform) {
  const url = URLS[platform];
  await chrome.windows.create({
    url,
    type: 'popup',
    width: 900,
    height: 700,
    left: 100,
    top: 50
  });

  if (rememberCheckbox.checked) {
    await chrome.storage.local.set({ 'find-my-phone-platform': platform });
    showQuickOpen(platform);
  }
}

function showQuickOpen(platform) {
  if (platform) {
    quickOpen.style.display = 'block';
    btnQuick.onclick = () => openPlatform(platform);
  }
}

async function changeLanguage(lang) {
  currentLang = lang;
  await chrome.storage.local.set({ 'find-my-phone-language': lang });
  applyTranslations();
}

async function init() {
  const { 'find-my-phone-language': lang, 'find-my-phone-platform': saved } = await chrome.storage.local.get(['find-my-phone-language', 'find-my-phone-platform']);
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
