<a name="readme-top"></a>

<h3 align="center">Proyecto Abogado</h3>

  <p align="center">
    <a href="https://libreria-two.vercel.app">Vea una demostración</a>
    <br/>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Tabla de contenidos</summary>
  <ol>
    <li>
      <a href="#acerca-del-proyecto">Acerca del proyecto</a>
      <ul>
        <li><a href="#tecnologias-usadas">Tecnologías usadas</a></li>
      </ul>      
      <ul>
        <li><a href="#actualizaciones">Actualizaciones</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## Acerca del proyecto

![project-screenshot]

Este proyecto es una aplicación web moderna orientada a la venta y gestión de servicios relacionados con asesoría legal y empresarial, presentada bajo una interfaz limpia, accesible y responsiva.

La página busca ofrecer una experiencia intuitiva y rápida al usuario, integrando funcionalidades como:
- Catálogo de servicios legales con visualización detallada.
- Carrito de compras interactivo con suma automática del precio total.
- Sistema de órdenes con historial y vista por fecha.
- Integración de iconografía mediante Font Awesome.
- Diseño optimizado con TailwindCSS para una presentación moderna y responsive.
- Conexión con backend vía API para obtener servicios de forma dinámica.

La idea del proyecto es representar una librería o catálogo digital de servicios profesionales, accesible y clara para los usuarios. Además, se ha prestado especial atención a la experiencia de usuario (UX), incorporando detalles como botones flotantes para volver arriba, filtros por búsqueda de texto y visualización elegante de pedidos realizados.

Este proyecto combina conocimientos en React, gestión de estado con Context API, peticiones HTTP con Axios, y una estructura bien organizada en componentes.

### Tecnologías usadas

* [![Vite][Vite.js]][Vite-url]
* [![React][React.js]][React-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![Tailwind][Tailwind.css]][Tailwind-url]
* [![MYSQL][MYSQL.io]][MYSQL-url]

<!-- ROADMAP -->
## Actualizaciones

- Se adaptó todo el sistema de carrito para usar `servicios` en lugar de `libros`
- Se actualizó la función `totalPrice()` para recorrer `servicios` usando `srv_precio`
- Se mejoró la función `dateTime()` para retornar fecha local como `string`
- Se corrigió bug en `OrdersCard` donde `dateTime()` se usaba como función, causando `TypeError`
- Se rediseñó el botón `+` para añadir servicios y `✓` para eliminarlos del carrito
- Se eliminó el comportamiento de mostrar detalles extra al quitar servicios; ahora solo se actualiza la lista
- Se implementó `quantity` y `totalPrice` por cada servicio en el carrito
- Se limpió el código y se eliminaron referencias a libros (`lbr_*`)
- Se ajustaron las rutas y componentes (`MyOrder`, `OrderCard`, `OrdersCard`, etc.) para trabajar solo con `servicios`

<!-- LICENSE -->
## Licencia

Distribuido bajo una licencia MIT. Vea `LICENSE.txt` para mayor información.

<!-- CONTACT -->
## Contacto

Ivan Manrique - [![linkedin][linkedin-shield]][linkedin-url] - idmr_02@outlook.com

Link del proyecto: [https://github.com/idmr023/ProyectoAbogado](https://github.com/idmr023/ProyectoAbogado)

<p align="right">(<a href="#readme-top">Volver a arriba</a>)</p>

<!-- LINKS E IMÁGENES -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/ivan-daniel-manrique-roa-978a29187
[project-screenshot]: images/mockup.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vite.js]: https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev
[Tailwind.css]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com
[MYSQL.io]: https://img.shields.io/badge/-MySQL-4479A1?style=flat-square&logo=mysql&labelColor=4479A1&logoColor=FFF
[MYSQL-url]: https://www.mysql.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
