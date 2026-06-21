# 🏆 laminas2026 - Gestor de Álbum Mundial

Aplicación web (PWA) diseñada para gestionar y controlar el progreso de tu colección de láminas del Álbum Mundial 2026. Optimizada para ser utilizada como una aplicación nativa en dispositivos Android e iOS.

## 📱 Características Principales

- **Gestión Completa:** Controla tus láminas obtenidas, faltantes y repetidas.
- **Modo PWA:** Instálala en tu móvil para acceder a ella desde la pantalla de inicio, sin barras de navegación y con soporte offline.
- **Sistema de Respaldo:** Exporta e importa tu progreso en archivos JSON para nunca perder tus datos al cambiar de dispositivo o limpiar el navegador.
- **Compartir:** Genera listas automáticas de tus repetidas y faltantes para compartir por WhatsApp de forma sencilla.
- **Optimizado para Móvil:** Interfaz rápida, ligera y con diseño adaptativo.

## 🚀 Instalación en Android (Como App)

1. Abre la URL de la aplicación en **Google Chrome**.
2. Espera a que aparezca el mensaje "Añadir a pantalla de inicio" o ve al menú de **tres puntos (⋮)**.
3. Selecciona **"Instalar aplicación"**.
4. ¡Listo! Ya aparecerá en tu menú de aplicaciones con su propio icono.

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React 18 + TypeScript
- **Bundler:** Vite 6
- **Estilos:** Vanilla CSS con soporte para modo oscuro.
- **PWA:** `vite-plugin-pwa` para Service Workers y Manifiesto.
- **Iconos:** Lucide React.

## 💻 Desarrollo Local

Si deseas ejecutar el proyecto en tu máquina:

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. Para construir la versión de producción:
   ```bash
   npm run build
   ```

## 📂 Estructura del Proyecto

- `src/components/`: Componentes reutilizables (Header, Secciones de Equipos, Backup).
- `src/data/`: Datos de los equipos y láminas del mundial.
- `src/hooks/`: Lógica personalizada para persistencia en `localStorage`.
- `src/styles/`: Estilos CSS globales y específicos.
- `public/`: Assets estáticos e iconos de la PWA.

---
*Desarrollado para coleccionistas de corazón. Mundial 2026.*
