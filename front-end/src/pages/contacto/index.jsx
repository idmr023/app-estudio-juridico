import { useTheme } from "contexts/ThemeContext/ThemeContext";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

function Contacto() {
  const [formData, setFormData] = useState({ nombre: "", dni: "", email: "", mensaje: "" });
  const [errors, setErrors] = useState({});
  const [captcha, setCaptcha] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [exito, setExito] = useState(false);
  const { theme } = useTheme();

  const validate = () => {
    const newErrors = {};
    if (!/^[a-zA-Z\s]+$/.test(formData.nombre)) newErrors.nombre = "Solo letras";
    if (!/^\d{8}$/.test(formData.dni)) newErrors.dni = "Debe tener 8 dígitos";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Correo inválido";
    if (!formData.mensaje.trim()) newErrors.mensaje = "Mensaje requerido";
    if (!captcha) newErrors.captcha = "Captcha obligatorio";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setEnviando(true);
    setTimeout(() => {
      setEnviando(false);
      setExito(true);
    }, 1000);
  };

return (
    // Usa 'theme-background' para el fondo de la sección
    <section className="min-h-screen py-12 px-6 md:px-16 bg-theme-background flex flex-col items-center">
      {/* Usa 'theme-text-primary' para el título */}
      <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-6 text-theme-text-primary tracking-wide">Contáctanos</h1>
      <form
        onSubmit={handleSubmit}
        // Usa 'theme-surface' y 'theme-border' para el formulario
        className="bg-theme-surface w-full max-w-2xl p-8 rounded-xl shadow-lg border border-theme-border"
      >
        <div className="mb-5">
          {/* Usa 'theme-text-secondary' para los labels */}
          <label className="block text-sm font-medium text-theme-text-secondary">Nombre completo</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            // Los inputs ahora usan el fondo, texto y borde del tema. El focus ring usa el color primario.
            className="w-full mt-1 px-4 py-2 border border-theme-border bg-theme-surface text-theme-text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary"
          />
          {/* Usa 'theme-error' para los errores */}
          {errors.nombre && <p className="text-sm text-theme-error">{errors.nombre}</p>}
        </div>

        {/* Repite el mismo patrón para los demás inputs */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-theme-text-secondary">DNI</label>
          <input
            type="text" name="dni" value={formData.dni} onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border border-theme-border bg-theme-surface text-theme-text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary"
          />
          {errors.dni && <p className="text-sm text-theme-error">{errors.dni}</p>}
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-theme-text-secondary">Correo electrónico</label>
          <input
            type="email" name="email" value={formData.email} onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border border-theme-border bg-theme-surface text-theme-text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary"
          />
          {errors.email && <p className="text-sm text-theme-error">{errors.email}</p>}
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-theme-text-secondary">Mensaje</label>
          <textarea
            name="mensaje" rows={4} value={formData.mensaje} onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border border-theme-border bg-theme-surface text-theme-text-primary rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-theme-primary"
          ></textarea>
          {errors.mensaje && <p className="text-sm text-theme-error">{errors.mensaje}</p>}
        </div>

        <div className="mb-5">
          <ReCAPTCHA
            sitekey="TU_CLAVE_PUBLICA"
            onChange={() => setCaptcha(true)}
            // ¡Aquí le pasamos el tema al ReCAPTCHA!
            theme={theme} 
          />
          {errors.captcha && <p className="text-sm text-theme-error">{errors.captcha}</p>}
        </div>

        <button
          type="submit"
          // Usa 'theme-primary' y 'theme-primary-hover' para el botón
          className="w-full py-3 mt-4 bg-theme-primary text-white rounded-md hover:bg-theme-primary-hover transition"
          disabled={enviando}
        >
          {enviando ? "Enviando..." : "Enviar"}
        </button>
        
        {/* Usa 'theme-success' para el mensaje de éxito */}
        {exito && <p className="mt-4 text-theme-success text-sm">¡Mensaje enviado con éxito!</p>}
      </form>
    </section>
  );
}

export { Contacto };