# Publicar en GitHub

El proyecto está listo para subir. Sigue estos pasos:

## 1. Crear el repositorio en GitHub

1. Ve a [github.com/new](https://github.com/new)
2. **Repository name:** `find-my-phone` (o el nombre que prefieras)
3. **Description:** Extensión de navegador para localizar tu teléfono con un clic
4. Elige **Público**
5. **No** marques "Add a README" (ya tenemos uno)
6. Haz clic en **Create repository**

## 2. Conectar y subir

En la terminal, desde la carpeta del proyecto:

```powershell
cd c:\code\find-my-phone

# Añade el remoto (reemplaza TU_USUARIO por tu usuario de GitHub)
git remote add origin https://github.com/TU_USUARIO/find-my-phone.git

# Sube el código
git branch -M main
git push -u origin main
```

Si usas SSH:

```powershell
git remote add origin git@github.com:TU_USUARIO/find-my-phone.git
git branch -M main
git push -u origin main
```

## Alternativa: GitHub CLI

Si instalas [GitHub CLI](https://cli.github.com/):

```powershell
cd c:\code\find-my-phone
gh repo create find-my-phone --public --source=. --push
```
