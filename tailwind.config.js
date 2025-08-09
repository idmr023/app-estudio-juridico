module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- COLORES SEMÁNTICOS PARA EL TEMA ---

        // Fondos
        'theme-background': 'var(--color-background)', // Para el fondo principal de la página
        'theme-surface': 'var(--color-surface)',       // Para el fondo de tarjetas, formularios, etc.

        // Texto
        'theme-text-primary': 'var(--color-text-primary)',   // Para títulos y texto importante
        'theme-text-secondary': 'var(--color-text-secondary)', // Para labels y texto menos importante

        // Acciones y bordes
        'theme-primary': 'var(--color-primary)',             // Color principal para botones y acentos
        'theme-primary-hover': 'var(--color-primary-hover)', // Hover para el botón principal
        'theme-border': 'var(--color-border)',               // Para los bordes de inputs y tarjetas

        // Colores de estado
        'theme-success': 'var(--color-success)',             // Para mensajes de éxito
        'theme-error': 'var(--color-error)',                 // Para mensajes de error
      },
    },
  },
  plugins: [],
}