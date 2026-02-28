const URLS = {
  android: 'https://findmydevice.google.com/',
  iphone: 'https://www.icloud.com/find/'
};

const btnAndroid = document.getElementById('btn-android');
const btnIphone = document.getElementById('btn-iphone');
const btnQuick = document.getElementById('btn-quick');
const quickOpen = document.getElementById('quick-open');
const rememberCheckbox = document.getElementById('rememberPlatform');

async function openPlatform(platform) {
  const url = URLS[platform];
  await chrome.tabs.create({ url });

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

async function init() {
  const { 'find-my-phone-platform': saved } = await chrome.storage.local.get('find-my-phone-platform');
  if (saved) {
    rememberCheckbox.checked = true;
    showQuickOpen(saved);
  }
}

btnAndroid.addEventListener('click', () => openPlatform('android'));
btnIphone.addEventListener('click', () => openPlatform('iphone'));

init();
