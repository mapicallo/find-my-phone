const PANEL_PATH = 'panel.html';

async function openOrFocusPanel() {
  const url = chrome.runtime.getURL(PANEL_PATH);
  const windows = await chrome.windows.getAll({ populate: true });

  for (const win of windows) {
    if (!win.tabs) continue;
    for (const tab of win.tabs) {
      if (tab.url === url) {
        await chrome.windows.update(win.id, { focused: true });
        if (tab.id !== undefined) {
          await chrome.tabs.update(tab.id, { active: true });
        }
        return;
      }
    }
  }

  await chrome.windows.create({
    url,
    type: 'popup',
    width: 360,
    height: 520,
    focused: true,
  });
}

chrome.action.onClicked.addListener(() => {
  openOrFocusPanel();
});
