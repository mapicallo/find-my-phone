# Build the store ZIP for Chrome Web Store and Microsoft Edge Add-ons (MV3).
# Version comes from manifest.json. Run from project root (find-my-phone).

$ErrorActionPreference = 'Stop'
$Root = $PSScriptRoot
Set-Location $Root

$manifestPath = Join-Path $Root 'manifest.json'
if (-not (Test-Path $manifestPath)) {
  Write-Error "manifest.json not found at $manifestPath"
}

$manifest = Get-Content -Raw -LiteralPath $manifestPath -Encoding UTF8 | ConvertFrom-Json
$version = $manifest.version
if (-not $version) {
  Write-Error 'manifest.json is missing a version field.'
}

$items = @(
  'manifest.json',
  'background.js',
  'brand',
  'panel.html',
  'panel.css',
  'panel.js',
  'icons'
)

$destName = "find-my-phone-v$version-store.zip"
$dest = Join-Path $Root $destName
if (Test-Path $dest) { Remove-Item -LiteralPath $dest -Force }

Compress-Archive -Path $items -DestinationPath $dest -Force
Write-Host "Created store package (Chrome + Edge): $dest"
Write-Host "Version in manifest: $version"
