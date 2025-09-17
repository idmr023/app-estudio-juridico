<a name="readme-top"></a>

# Proyecto Abogado - Backend

Este directorio contiene todo el código fuente del lado del servidor para el **Proyecto Abogado**. Esto incluye la API REST de Express.js, la lógica de negocio, la conexión a la base de datos de Firebase y las funciones serverless (Cloud Functions).

Para la documentación general del proyecto y la arquitectura completa, por favor, consulte el [README principal del repositorio](../README.md).

## Tabla de Contenidos
1.  [Stack Tecnológico](#stack-tecnológico)
2.  [Arquitectura y Estructura de Carpetas](#arquitectura-y-estructura-de-carpetas)
3.  [Documentación de la API](#documentación-de-la-api)
4.  [Configuración del Entorno Local](#configuración-del-entorno-local)
5.  [Scripts Disponibles](#scripts-disponibles)
6.  [Variables de Entorno](#variables-de-entorno)

---

## Stack Tecnológico

*   **Framework Principal:** [Node.js](https://nodejs.org/) con [Express.js](https://expressjs.com/)
*   **Base de Datos:** [Google Cloud Firestore](https://firebase.google.com/docs/firestore) (NoSQL)
*   **SDK de Base de Datos:** [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
*   **Funciones Serverless:** [Firebase Cloud Functions](https://firebase.google.com/docs/functions)
*   **Inteligencia Artificial:** [LangChain.js](https://js.langchain.com/) con la API de [OpenAI](https://openai.com/)
*   **Envío de Correos:** [Nodemailer](https://nodemailer.com/) (gestionado a través de una Cloud Function)
*   **Seguridad:** [bcrypt](https://www.npmjs.com/package/bcrypt) (para el hasheo de contraseñas)

## Arquitectura y Estructura de Carpetas

El backend sigue un patrón de diseño modular, separando las responsabilidades en controladores, rutas y utilidades para una máxima organización y mantenibilidad.

*   **/config/** - Configuración de la conexión a servicios externos (ej. Firebase Admin).
*   **/controllers/** - Contiene la lógica de negocio principal para cada entidad (qué hacer con una petición).
*   **/database/** - Scripts para la gestión de la base de datos (`migrations` para la estructura, `seeds` para los datos iniciales).
*   **/functions/** - Código fuente para las funciones serverless que se despliegan en Firebase.
*   **/routes/** - Define los endpoints de la API y los conecta con sus funciones controladoras correspondientes.
*   **/utils/** - Funciones de ayuda reutilizables (ej. manejador de errores).
*   `server.js` - El punto de entrada del servidor. Configura, conecta e inicia la aplicación Express.
*   `conocimiento.md` - La base de conocimiento en texto plano que alimenta al asistente virtual de IA.

## Documentación de la API

La API sigue un patrón RESTful. Todas las rutas están prefijadas con `/api`.

### Autenticación (`/api/auth`)
*   `POST /signup`: Registra un nuevo usuario.
*   `POST /login`: Inicia sesión de un usuario y devuelve sus datos.
*   `GET /user/:dni`: Obtiene los datos públicos de un usuario por su DNI.

### Casos (`/api/casos`)
*   `GET /list/:dni`: Devuelve una lista de todos los casos asociados a un DNI de cliente.
*   `GET /:caso_id`: Devuelve toda la información detallada de un caso específico, incluyendo su timeline, documentos y mensajes.

### Servicios (`/api/servicios`)
*   `GET /`: Devuelve una lista de todos los servicios ofrecidos.

### Chat (`/api/chat`)
*   `POST /`: Recibe una pregunta y devuelve una respuesta generada por el asistente virtual de IA.

## Configuración del Entorno Local

1.  **Navega a la carpeta del backend:**
    ```sh
    cd back-end
    ```

2.  **Instala las dependencias:**
    ```sh
    npm install
    ```

3.  **Configura las variables de entorno:**
    - Crea un archivo llamado `.env` en la raíz de la carpeta `/back-end`.
    - Añade las siguientes variables con tus propias claves:
      ```
      # Clave de API para el chatbot
      OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx

      # (Opcional, para el servidor Express si es necesario)
      PORT=3001
      ```

4.  **Configura la Clave de Servicio de Firebase:**
    - Descarga tu archivo de credenciales `serviceAccountKey.json` desde la consola de Firebase.
    - Colócalo en la carpeta `/back-end/config/`.
    - **Importante:** Asegúrate de que este archivo esté listado en tu `.gitignore` para no subirlo al repositorio.

5.  **Ejecuta el servidor:**
    ```sh
    npm run dev
    ```
    El servidor se iniciará en el puerto especificado (por defecto 3001) y se reiniciará automáticamente con `nodemon`.

## Scripts Disponibles

*   `npm start`: Inicia el servidor en modo de producción usando `node`.
*   `npm run dev`: Inicia el servidor en modo de desarrollo usando `nodemon`.
*   `firebase deploy --only functions`: Despliega las Cloud Functions a Firebase.

## Variables de Entorno

*   `OPENAI_API_KEY`: Requerida para la inicialización y operación del chatbot de LangChain.
*   **Credenciales de Firebase:** El SDK de Admin las obtiene automáticamente del archivo `serviceAccountKey.json`.

<p align="right">(<a href="#readme-top">volver a arriba</a>)</p>
