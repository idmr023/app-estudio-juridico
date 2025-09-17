```markdown
# Proyecto Abogado - Frontend

Esta carpeta contiene el código fuente de la aplicación de cliente para el "Proyecto Abogado". Es una Single-Page Application (SPA) construida con React y Vite, diseñada para ofrecer una experiencia de usuario rápida, moderna y responsiva.

## Funcionalidades Clave

- **Autenticación de Usuarios:** Registro e inicio de sesión seguros gestionados a través del SDK de Firebase Authentication.
- **Catálogo de Servicios:** Visualización dinámica de los servicios legales, obtenidos en tiempo real desde Firestore.
- **Portal de Cliente:** Un área privada y segura (`/cuenta`) donde los usuarios pueden:
  - Ver una lista de todos sus casos legales.
  - Acceder a una página de **detalle de caso** con actualizaciones en tiempo real (timeline, documentos, mensajes).
- **Asistente Virtual:** Un widget de chat flotante que se conecta al backend de IA para resolver preguntas frecuentes.
- **Formulario de Contacto Serverless:** Envía solicitudes de correo escribiendo en una colección de Firestore, que activa una Cloud Function.

## Stack Tecnológico

- **Framework:** React.js
- **Build Tool:** Vite
- **Estilos:** Tailwind CSS
- **Routing:** React Router
- **Cliente de Firebase:** Firebase Client SDK (para Firestore, Auth, Storage)
- **Peticiones HTTP:** Axios (utilizado principalmente para el endpoint del chatbot)

---

## Configuración y Puesta en Marcha Local

Sigue estos pasos para ejecutar el frontend en tu máquina local.

### 1. Navega a la carpeta del frontend
```bash
cd front-end
```

### 2. Instala las dependencias
```bash
npm install
```

### 3. Configura las Variables de Entorno
Crea un archivo llamado `.env` en la raíz de la carpeta `front-end`. Este archivo **no** debe ser subido a Git.

Copia el contenido de `.env.example` (si existe) o usa la siguiente plantilla:

**`.env`**
```
# La URL donde se está ejecutando tu servidor de backend
REACT_APP_API_URL=http://localhost:3001

# También puedes poner tus credenciales de Firebase aquí si prefieres,
# aunque es más común tenerlas en un archivo de configuración de JS.
```

### 4. Ejecuta el Servidor de Desarrollo
```bash
npm start
```
La aplicación se abrirá automáticamente en `http://localhost:3000` (o el puerto que tengas configurado).

### Scripts Disponibles

- `npm start`: Inicia el servidor de desarrollo.
- `npm run build`: Compila la aplicación para producción en la carpeta `build`.
- `npm test`: Ejecuta las pruebas.

```

---

### 2. README para el Backend

Este archivo debe ir en la raíz de tu carpeta `back-end`.

**Ruta:** `back-end/README.md`

```markdown
# Proyecto Abogado - Backend

Esta carpeta contiene el servidor de Node.js/Express y las Cloud Functions que dan servicio a la aplicación "Proyecto Abogado". Su principal responsabilidad es actuar como una API segura, gestionar la lógica de negocio y comunicarse con servicios externos como Firebase y OpenAI.

## Arquitectura y Responsabilidades

El backend sigue una arquitectura modular para una fácil mantenibilidad y escalabilidad:

- **/config:** Centraliza la configuración de la base de datos (Firebase Admin SDK).
- **/controllers:** Contiene la lógica de negocio para cada entidad (autenticación, casos, etc.).
- **/routes:** Define los endpoints de la API y los conecta con sus respectivos controladores.
- **/functions:** Código para las funciones serverless desplegadas en Firebase (ej. envío de correos).
- **/database:** Incluye los scripts para la estructura (`migrations`) y los datos iniciales (`seeds`) de la base de datos.
- **server.js:** El punto de entrada que inicializa el servidor de Express y une todos los módulos.

## Stack Tecnológico

- **Framework:** Node.js, Express.js
- **Base de Datos:** Cloud Firestore (NoSQL)
- **Autenticación:** Firebase Admin SDK
- **Funciones Serverless:** Firebase Cloud Functions
- **Inteligencia Artificial:** LangChain.js con la API de OpenAI (RAG)
- **Envío de Correos:** Nodemailer (a través de una Cloud Function)

---

## Configuración y Puesta en Marcha Local

Sigue estos pasos para ejecutar el backend en tu máquina local.

### 1. Navega a la carpeta del backend
```bash
cd back-end
```

### 2. Instala las dependencias
```bash
npm install
```

### 3. Configura las Variables de Entorno
Crea un archivo llamado `.env` en la raíz de la carpeta `back-end`. Este archivo **es crucial y no debe ser subido a Git**.

**`.env`**
```
# Credenciales de tu base de datos (si usaras una externa)
# DB_HOST=...

# Clave de API de OpenAI para el Asistente Virtual
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx

# Credenciales de correo para Nodemailer (usado por la Cloud Function)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu.correo@gmail.com
SMTP_PASSWORD=tu_contraseña_de_aplicacion
```

### 4. Configura la Clave de Servicio de Firebase
1.  Ve a la Consola de Firebase > Configuración del proyecto > Cuentas de servicio.
2.  Genera una nueva clave privada. Se descargará un archivo `.json`.
3.  Renombra este archivo a `serviceAccountKey.json` y muévelo a la carpeta `back-end/config`.
4.  **¡IMPORTANTE!** Asegúrate de que tu archivo `back-end/.gitignore` contiene la línea `config/serviceAccountKey.json` para evitar subir esta clave secreta.

### 5. Configura la Base de Datos
Para levantar la base de datos por primera vez con datos de prueba, ejecuta el script de sembrado:
```bash
node database/seed.js
```

### 6. Ejecuta el Servidor de Desarrollo
Usa `nodemon` para que el servidor se reinicie automáticamente con cada cambio.
```bash
npm run dev
```
El servidor se iniciará en `http://localhost:3001` (o el puerto definido en tus variables de entorno).

```
