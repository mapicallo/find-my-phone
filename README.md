# Localizar mi móvil

Extensión de navegador para localizar tu teléfono con un clic. ¿No encuentras tu móvil en casa? Abre Find My Device (Android) o Find My iPhone directamente desde la barra de herramientas.

## Instalación

### Chrome / Edge

1. Abre `chrome://extensions` (o `edge://extensions`)
2. Activa **"Modo desarrollador"** (esquina superior derecha)
3. Haz clic en **"Cargar descomprimida"**
4. Selecciona la carpeta `find-my-phone`

### Firefox

1. Abre `about:debugging`
2. Haz clic en **"This Firefox"**
3. **"Load Temporary Add-on"** → selecciona el archivo `manifest.json` dentro de la carpeta

> **Nota:** En Firefox puede que necesites ajustar el manifest (Manifest V2). Chrome y Edge usan Manifest V3.

## Uso

1. Haz clic en el icono de la extensión
2. Elige **Android** o **iPhone** según tu dispositivo
3. Se abrirá Find My Device o iCloud Find en una ventana emergente (900×700 px)
4. Inicia sesión si es necesario
5. Pulsa **Reproducir sonido** para hacer sonar tu teléfono

## Personalización

- **Recordar plataforma:** Marca la casilla para que la próxima vez se abra directamente la opción que uses (se guarda localmente en el navegador).

## Iconos

Los iconos se generan desde el SVG incluido. Para regenerarlos:

```bash
npm install
npm run generate-icons
```

## Requisitos

- Android: cuenta de Google, Find My Device activado en el teléfono
- iPhone: Apple ID, Find My iPhone activado
