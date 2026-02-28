# Crea el ZIP para subir a Chrome Web Store
# Ejecutar desde la carpeta find-my-phone

$items = @(
    "manifest.json",
    "popup.html",
    "popup.css",
    "popup.js",
    "icons"
)

$dest = "find-my-phone-chrome.zip"
if (Test-Path $dest) { Remove-Item $dest }

Compress-Archive -Path $items -DestinationPath $dest -Force
Write-Host "Creado: $dest"
