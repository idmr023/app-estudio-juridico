export function Banner () {
    return (
    <section className="w-full bg-slate-600 mb-10">
        <div className="max-w-screen-xl mx-auto overflow-hidden py-20 px-0 sm:px-6 lg:px-8">
            <div className="flex justify-evenly flex-wrap">
                <div className="text-white text-left w-2/4">
                    <h2>Biblioteca <span>Lectura</span></h2>
                    <p className="my-10 mb-40 leading-8 text-base">Aquí encontrará una variedad de productos Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum debitis magni voluptatum delectus voluptate 
                        ipsam. Praesentium perferendis repudiandae mollitia adipisci ea in qui quas incidunt quis, inventore harum numquam quos..
                        Ofrecemos una amplia gama de tarjetas de crédito con diferentes beneficios y recompensas.</p>
                </div>
                <img src="https://cdn-icons-png.flaticon.com/512/1170/1170679.png" alt="Imagen" className="w-80"/>
            </div>
        </div>
    </section>
    )
}