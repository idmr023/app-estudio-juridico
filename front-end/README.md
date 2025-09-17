<a name="readme-top"></a>

# Proyecto Abogado - Frontend (Cliente)

Este directorio contiene el código fuente de la aplicación de cliente para el **Proyecto Abogado**, desarrollada con React. Esta aplicación se encarga de toda la interfaz de usuario, la interacción con el cliente y la comunicación con los servicios de backend y Firebase.

Para la documentación general del proyecto y la arquitectura completa, por favor, consulte el [README principal del repositorio]( ../README.md).

## Tabla de Contenidos
1.  [Stack Tecnológico](#stack-tecnológico)
2.  [Estructura de Carpetas](#estructura-de-carpetas)
3.  [Funcionalidades Clave](#funcionalidades-clave)
4.  [Configuración del Entorno Local](#configuración-del-entorno-local)
5.  [Scripts Disponibles](#scripts-disponibles)
6.  [Variables de Entorno](#variables-de-entorno)

---

## Stack Tecnológico

*   **Framework Principal:** [React](https://reactjs.org/)
*   **Herramienta de Build:** [Vite](https://vitejs.dev/)
*   **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
*   **Enrutamiento:** [React Router DOM](https://reactrouter.com/)
*   **Cliente HTTP:** [Axios](https://axios-http.com/) (para la comunicación con la API del backend)
*   **Servicios de Backend:** [Firebase SDK](https://firebase.google.com/) (para Autenticación, Firestore y Storage)
*   **Gestión de Estado:** React Context API

## Estructura de Carpetas

La estructura del código fuente sigue un enfoque modular para facilitar la mantenibilidad y escalabilidad.
/front-end
|
|-- /public/ # Archivos estáticos y index.html
|
|-- /src/
| |-- /components/ # Componentes reutilizables (Botones, Cards, etc.)
| |-- /contexts/ # Proveedores de Contexto para el estado global
| |-- /pages/ # Componentes que representan páginas completas
| |-- App.jsx # Componente raíz y definición de rutas
| |-- index.jsx # Punto de entrada de la aplicación
| |-- firebase-config.js # Configuración de la conexión con Firebase
|
|-- .env # Archivo para variables de entorno (NO versionado)
|-- .gitignore
|-- package.json
code
Code
## Funcionalidades Clave

*   **Autenticación de Usuarios:** Registro e inicio de sesión gestionados por **Firebase Authentication**.
*   **Portal de Cliente:** Área privada para usuarios autenticados.
*   **Visualización de Casos:** Lista y vista de detalle de casos legales, con actualizaciones en **tiempo real** desde Cloud Firestore.
*   **Gestión de Documentos:** (Futuro) Interfaz para subir y descargar archivos asociados a un caso, utilizando **Firebase Storage**.
*   **Asistente Virtual:** Widget de chat interactivo que se comunica con la API de IA del backend.
*   **Carrito de Compras:** Lógica para seleccionar y gestionar servicios.

## Configuración del Entorno Local

Para ejecutar esta aplicación en tu máquina local, sigue estos pasos:

1.  **Navega a la carpeta del frontend:**
    ```sh
    cd front-end
    ```

2.  **Instala las dependencias:**
    ```sh
    npm install
    ```

3.  **Configura las variables de entorno:**
    - Crea un archivo llamado `.env` en la raíz de la carpeta `/front-end`.
    - Añade las siguientes variables (reemplaza los valores con tu configuración específica):
      ```
      # URL donde corre tu servidor de backend local
      REACT_APP_API_URL=http://localhost:3001

      # (Opcional si usas los emuladores de Firebase)
      # No necesitas poner las claves de Firebase aquí si la configuración
      # en firebase-config.js está completa.
      ```

4.  **Ejecuta la aplicación:**
    ```sh
    npm start
    ```
    La aplicación se abrirá automáticamente en [http://localhost:3000](http://localhost:3000).

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

*   `npm start`: Inicia la aplicación en modo de desarrollo.
*   `npm run build`: Construye la aplicación para producción en la carpeta `build`.
*   `npm test`: Ejecuta el corredor de pruebas en modo interactivo.
*   `npm run eject`: Expulsa la configuración de Create React App (acción irreversible).

## Variables de Entorno

Esta aplicación utiliza un archivo `.env` para gestionar las claves y URLs de configuración. Asegúrate de tenerlo configurado antes de iniciar la aplicación.

*   `REACT_APP_API_URL`: La URL base del servidor backend. Es crucial para que las llamadas a la API (como la del chatbot) funcionen.

<p align="right">(<a href="#readme-top">volver a arriba</a>)</p>
