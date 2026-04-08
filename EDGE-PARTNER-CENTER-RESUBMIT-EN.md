# Edge Add-ons — resubmit after policy 1.1.2 (“value proposition not clear”)

**Workspace:** trabaja siempre en `C:\code\find-my-phone\` (repo `mapicallo/find-my-phone`). No mantener una copia paralela en otros monorepos para evitar versiones divergentes.

Microsoft wants the listing to state **who this is for**, **what exact problem it solves**, and **why this extension** (vs. only opening the sites manually). Use the blocks below in **Partner Center → Store listing → English** (and Spanish if you have a second listing).

---

## Short description / summary (if the form has a short field)

Use the first paragraph or this compressed line:

**English (recommended):**
```
Toolbar shortcut in Edge to open Google’s official Find My Device (Android) or Apple’s iCloud Find (iPhone) in one click—then you sign in there as usual to ring, locate, lock, or erase your phone. Remembers Android vs iPhone if you want; English/Spanish UI. No separate tracking service: only official Google and Apple pages open in your browser.
```

Shorter alternative (~one sentence):
```
One-click toolbar access to the official Google (Android) and Apple (iPhone) phone locators you already use—no bookmarks, no third-party location service, sign-in stays on Google/Apple.
```

---

## Full store description (English) — paste into “Description”

```
PROBLEM THIS SOLVES
You already use Google Find My Device or Apple Find My, but opening the right page means remembering URLs or bookmarks. Find my phone adds a simple toolbar button in Microsoft Edge that opens the official locator pages in one click so you can sign in and ring, locate, lock, or erase your device as you always do on Google or Apple.

WHO IT IS FOR
• Android users with Find My Device enabled on their Google account.
• iPhone users who use Apple’s Find My / iCloud Find.
• Anyone who wants faster access from Edge when the phone is misplaced nearby (home, office)—not a replacement for Google or Apple’s service.

WHAT YOU GET (DISTINCT VALUE)
• One click from the Edge toolbar to the correct official page: Google Find My Device or iCloud Find.
• Opens those pages in a compact popup-style flow; you complete sign-in and actions on Google or Apple.
• Optional “remember my platform” so the next time you can jump straight with one button (Android or iPhone you chose).
• Interface in English or Spanish (stored only on your device).

WHAT THIS IS NOT
• Not a third-party phone tracker and not a substitute for Google’s or Apple’s account security. The extension does not access your Google or Apple password or location data—it only opens the same public URLs you would open yourself.
• No publisher backend: it only stores language and optional platform preference locally in the browser.

PERMISSIONS
• storage — Save UI language and optional “remember platform” setting only.
• windows — Open and focus the floating panel window.

After installing, click the extension icon, pick Android or iPhone, and sign in on the official site if prompted.
```

---

## Spanish listing (if you submit ES)

**Breve:**
```
Acceso desde la barra de Edge a las páginas oficiales de Google (Find My Device, Android) o Apple (Buscar / iCloud) en un clic; inicias sesión allí como siempre para localizar, hacer sonar, bloquear o borrar. Puede recordar Android o iPhone; interfaz ES/EN. Sin servicio de rastreo de terceros.
```

**Larga:** Traduce el mismo esquema (Problema / Para quién / Valor / Qué no es / Permisos) que el bloque inglés, sin acortar las aclaraciones de confianza.

---

## Resubmission checklist

1. Replace **Description** (and any **short summary**) with the English text above.
2. Ensure **screenshots** show: the popup with Android / iPhone / language, and ideally the text that explains official Google/Apple (or add one screenshot with a short caption in the image—optional).
3. **Privacy policy URL** unchanged if still correct.
4. In **certification notes** (if available), one line: *“Listing updated to clarify distinct value: toolbar shortcut to official Google Find My Device and Apple iCloud Find URLs only; no third-party location service.”*
5. Increment **package version** in `manifest.json` if Partner Center requires a new submission build, then run `.\create-chrome-package.ps1` and upload the ZIP.

---

## `manifest.json` — campo `description` (obligatorio)

**Microsoft Edge** valida `description` con un **máximo de 132 caracteres** (si superas ese límite, el ZIP falla con error de esquema JSON).

Texto actual (131 caracteres) — mantener al cambiar el manifiesto:

```
Open Google Find My Device or Apple iCloud Find from Edge in one click. Sign in on Google/Apple. EN/ES. Remembers platform locally.
```

La descripción **larga** de la tienda (Partner Center) puede ser mucho más extensa; el límite de 132 aplica solo al **`description` del paquete**.

Tras editar `manifest.json`, ejecuta `.\create-chrome-package.ps1` y sube el nuevo ZIP.
