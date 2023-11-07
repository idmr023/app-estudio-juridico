import { Container } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import styled from 'styled-components';
export function PagAyuda() {
  
  const qyaData = [
    {
      key: 0,
      pregunta: "¿Cuál es la ubicación de la librería?",
      respuesta: "Nuestra librería se encuentra en el centro de la ciudad, en la calle principal, cerca de la plaza central.",
    },
    {
      key: 1,
      pregunta: "¿Cuáles son los horarios de atención?",
      respuesta: "Abrimos de lunes a viernes de 9:00 AM a 7:00 PM y los sábados de 10:00 AM a 4:00 PM. Cerramos los domingos.",
    },
    {
      key: 2,
      pregunta: "¿Qué tipos de libros ofrecen?",
      respuesta: "Ofrecemos una amplia variedad de libros, incluyendo novelas, libros de no ficción, poesía, libros infantiles, libros de referencia y mucho más.",
    },
    {
      key: 3,
      pregunta: "¿Ofrecen servicios de alquiler de libros?",
      respuesta: "Sí, contamos con un servicio de alquiler de libros. Los clientes pueden alquilar libros por un período determinado y luego devolverlos.",
    },
    {
      key: 4,
      pregunta: "¿Venden libros usados?",
      respuesta: "Sí, también vendemos libros usados a precios asequibles. Es una excelente opción para aquellos que buscan gangas literarias.",
    },
    {
      key: 5,
      pregunta: "¿Tienen libros para niños?",
      respuesta: "Sí, tenemos una sección especial dedicada a libros para niños de todas las edades. Desde cuentos ilustrados hasta libros educativos.",
    },
    {
      key: 6,
      pregunta: "¿Puedo hacer pedidos especiales?",
      respuesta: "Por supuesto, aceptamos pedidos especiales. Si estás buscando un libro en particular que no tenemos en stock, haremos nuestro mejor esfuerzo para conseguirlo para ti.",
    },
    {
      key: 7,
      pregunta: "¿Ofrecen descuentos para estudiantes?",
      respuesta: "Sí, ofrecemos descuentos especiales para estudiantes. Solo presenta tu identificación de estudiante al hacer una compra.",
    },
    {
      key: 8,
      pregunta: "¿Organizan eventos literarios?",
      respuesta: "Sí, organizamos eventos literarios como presentaciones de libros, charlas con autores y clubes de lectura. Mantente al tanto de nuestro calendario de eventos.",
    },
    {
      key: 9,
      pregunta: "¿Tienen una cafetería dentro de la librería?",
      respuesta: "Sí, contamos con una acogedora cafetería donde puedes disfrutar de café, té y aperitivos mientras lees o estudias en nuestra librería."
    },
  ];

  const ContainerStyled = styled(Container)`
    margin: 50px auto;
    text-align: center;
  `

  return (
    <>
      <ContainerStyled >
        <h1>Preguntas frecuentes</h1>
        <Accordion defaultActiveKey="0" flush>
        {qyaData.map((dato) => (
          <Accordion.Item eventKey={dato.key} key={dato.key}>
            <Accordion.Header>{dato.pregunta}</Accordion.Header>
            <Accordion.Body>{dato.respuesta}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </ContainerStyled>
    </>
  );
}