import { useState } from "react";

export function PagAyuda() {
  const qyaData = [
    {
      key: 0,
      pregunta: "¿En qué áreas del derecho brinda servicios?",
      respuesta: "Brindo asesoría y representación en derecho civil, penal, laboral, familiar, y comercial.",
      etiqueta: "Servicios"
    },
    {
      key: 1,
      pregunta: "¿Dónde se encuentra ubicado el despacho?",
      respuesta: "El despacho se ubica en Av. Arequipa 234, Cercado de Lima, Lima.",
      etiqueta: "Ubicación"
    },
    {
      key: 2,
      pregunta: "¿Cuáles son los horarios de atención?",
      respuesta: "De lunes a viernes de 9:00 AM a 6:00 PM. Se requiere cita previa.",
      etiqueta: "Horarios"
    },
    {
      key: 3,
      pregunta: "¿Ofrecen consultas virtuales?",
      respuesta: "Sí, se pueden agendar consultas vía videollamada o teléfono.",
      etiqueta: "Modalidad"
    },
    {
      key: 4,
      pregunta: "¿Cuál es el costo de una consulta?",
      respuesta: "El costo varía según el tipo de caso, pero se ofrece una primera orientación gratuita.",
      etiqueta: "Precio"
    },
    {
      key: 5,
      pregunta: "¿Qué documentos necesito para una consulta legal?",
      respuesta: "Depende del caso, pero generalmente se solicita una identificación y documentos relacionados con el conflicto legal.",
      etiqueta: "Documentos"
    },
    {
      key: 6,
      pregunta: "¿Cómo agendar una cita?",
      respuesta: "Puedes llamarnos al 947 924 204 o escribirnos al correo contacto.abogado@gmail.com.",
      etiqueta: "Citas"
    },
    {
      key: 7,
      pregunta: "¿Está colegiado o tiene especialización?",
      respuesta: "Sí, estoy colegiado y cuento con especializaciones en derecho penal y derecho de familia.",
      etiqueta: "Estudios"
    },
    {
      key: 8,
      pregunta: "¿Cuánto dura una consulta?",
      respuesta: "Una consulta suele durar entre 30 y 60 minutos, dependiendo del caso.",
      etiqueta: "Precio"
    },
    {
      key: 9,
      pregunta: "¿Brinda asesoría a empresas?",
      respuesta: "Sí, también ofrezco servicios legales para pequeñas y medianas empresas.",
      etiqueta: "Servicios"
    }
  ];

  const [filtro, setFiltro] = useState('Todos');
  const etiquetas = ['Todos', ...Array.from(new Set(qyaData.map(q => q.etiqueta)))];

  const preguntasFiltradas = filtro === 'Todos' ? qyaData : qyaData.filter(q => q.etiqueta === filtro);

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-6 text-gray-800 tracking-wide">
        Preguntas Frecuentes
      </h1>

      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {etiquetas.map((et, i) => (
          <button
            key={i}
            onClick={() => setFiltro(et)}
            className={`px-4 py-1 border rounded-full text-sm transition ${filtro === et ? 'bg-gray-800 text-white' : 'border-gray-400 text-gray-700 hover:bg-gray-100'}`}
          >
            {et}
          </button>
        ))}
      </div>

      <div className="space-y-0 border-t border-gray-300 divide-y divide-gray-300">
        {preguntasFiltradas.map((dato) => (
          <details
            key={dato.key}
            className="group open:shadow-sm transition-all px-6 py-5"
          >
            <summary className="cursor-pointer select-none text-base sm:text-lg text-gray-800 font-medium">
              {dato.pregunta}
            </summary>
            <div className="mt-2 text-gray-700 text-sm">
              {dato.respuesta}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}