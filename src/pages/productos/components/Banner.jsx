import { useContext } from "react";
import "../css/estilos_nproductos.css";
import { ProductosContext } from "../../../contexts/Productos/ProductosContext";

export function Banner () {
    const {
        cursos,
    } = useContext(ProductosContext)

    return (
    <section className="producto-home">
        <div className="division">
            <div className="celdas-auto-ordenadas">
                <div className="caja-texto">
                    <h2>Productos <span>Proyecto</span></h2>
                    <p>Aquí encontrará una variedad de productos Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum debitis magni voluptatum delectus voluptate 
                        ipsam. Praesentium perferendis repudiandae mollitia adipisci ea in qui quas incidunt quis, inventore harum numquam quos..
                        Ofrecemos una amplia gama de tarjetas de crédito con diferentes beneficios y recompensas.</p>
                </div>
                <img src="https://cdn-icons-png.flaticon.com/512/1170/1170679.png" alt="Imagen"/>
            </div>
        </div>
    </section>
    )
}