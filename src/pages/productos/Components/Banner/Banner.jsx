import "../../css/estilos_nproductos.css";	
export function Banner () {
    return (
    <section className="home">
        <div className="home_cont">
            <div className="home_cont__celdas">
                <div className="home_cont__caja">
                    <h2>Biblioteca <span>Lectura</span></h2>
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