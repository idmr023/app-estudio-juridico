import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

function Contacto() {
  const [formData, setFormData] = useState({ nombre: "", dni: "", email: "", mensaje: "" });
  const [errors, setErrors] = useState({});
  const [captcha, setCaptcha] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [exito, setExito] = useState(false);

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
    <section className="min-h-screen py-12 px-6 md:px-16 bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-6 text-gray-800 tracking-wide">Contáctanos</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-2xl p-8 rounded-xl shadow-lg border border-gray-200"
      >
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700">Nombre completo</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.nombre && <p className="text-sm text-red-600">{errors.nombre}</p>}
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700">DNI</label>
          <input
            type="text"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.dni && <p className="text-sm text-red-600">{errors.dni}</p>}
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700">Mensaje</label>
          <textarea
            name="mensaje"
            rows={4}
            value={formData.mensaje}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          {errors.mensaje && <p className="text-sm text-red-600">{errors.mensaje}</p>}
        </div>

        <div className="mb-5">
          <ReCAPTCHA
            sitekey="TU_CLAVE_PUBLICA"
            onChange={() => setCaptcha(true)}
          />
          {errors.captcha && <p className="text-sm text-red-600">{errors.captcha}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-4 bg-blue-800 text-white rounded-md hover:bg-blue-900 transition"
          disabled={enviando}
        >
          {enviando ? "Enviando..." : "Enviar"}
        </button>

        {exito && <p className="mt-4 text-green-600 text-sm">¡Mensaje enviado con éxito!</p>}
      </form>
    </section>
  );
}

export { Contacto };