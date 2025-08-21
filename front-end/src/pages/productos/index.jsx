import React, { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { GoUpContext } from "../../contexts/GoUp/GoUpContext";
import { ShoppingCartContext } from "../../contexts/CarritoContext";
import CheckoutSideMenu from "./Components/CheckoutSideMenu";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

function Banner() {
    return (
        <section className="w-full bg-slate-600 mb-10">
            <div className="max-w-screen-xl mx-auto overflow-hidden py-20 px-0 sm:px-6 lg:px-8">
                <div className="flex justify-evenly flex-wrap">
                    <div className="text-white text-left w-2/4">
                        <h2>Biblioteca <span>Lectura</span></h2>
                        <p className="my-10 mb-40 leading-8 text-base">
                            Aquí encontrará una variedad de servicios profesionales que puede agregar a su pedido.
                        </p>
                    </div>
                    <img src="https://cdn-icons-png.flaticon.com/512/1170/1170679.png" alt="Imagen" className="w-80" />
                </div>
            </div>
        </section>
    );
}

// COMPONENTE: Layout
const Layout = ({ children }) => (
    <div className="relative flex flex-col items-center mt-20">{children}</div>
);

// COMPONENTE: Botón + / ✓
const AddItemButton = ({ isInCart, onToggle }) => (
    <div
        className={`absolute top-0 right-0 flex justify-center items-center ${
            isInCart ? "bg-black" : "bg-white"
        } w-6 h-6 rounded-full m-2 p-1`}
        onClick={(e) => {
            e.stopPropagation();
            onToggle();
        }}
    >
        <FontAwesomeIcon
            className={`w-4 h-4 ${isInCart ? "text-white" : "text-black"} cursor-pointer`}
            icon={isInCart ? faCheck : faPlus}
        />
    </div>
);

const Card = ({ data }) => {
    const context = useContext(ShoppingCartContext);

    // CAMBIO: Usamos 'id' de Firestore en lugar de 'srv_id' de MySQL.
    // Esto hace el código consistente con la nueva fuente de datos.
    const id = data.id; 
    const titulo = data.srv_nombre || "Sin nombre";
    const precio = data.srv_precio || 0;
    const imagen = data.srv_imagen;
    // CAMBIO: Firestore no tiene un campo 'srv_categoria', así que usamos 'srv_tipo'.
    const categoria = data.srv_tipo || "General";

    // CAMBIO: La lógica del carrito ahora usa 'id' en lugar de 'srv_id'.
    const isInCart = context.cartProducts.some(p => p.id === id);

    const toggleCart = () => {
        if (isInCart) {
            const updatedCart = context.cartProducts.filter(p => p.id !== id);
            context.setCartProducts(updatedCart);
            context.setCount(prev => prev - 1);
        } else {
            const newItem = {
                ...data,
                quantity: 1,
                totalPrice: precio
            };
            context.setCartProducts([...context.cartProducts, newItem]);
            context.setCount(prev => prev + 1);
        }
        context.openCheckoutSideMenu();
    };

    const showProduct = () => {
        context.openProductDetail();
        context.setProductToShow(data);
    };

    return (
        <div className="productos_contProd text-center" onClick={showProduct}>
            <div className="flex flex-wrap" key={id}>
                <figure className="relative mb-2 w-full h-4/5">
                    <span className="absolute bottom-0 left-0 bg-white/60 rounded-full text-black text-xs px-3 py-1 m-2">
                        {categoria}
                    </span>
                    <img className="w-full h-full object-cover rounded-lg" src={imagen} alt={titulo} />
                    <AddItemButton isInCart={isInCart} onToggle={toggleCart} />
                </figure>
                <div className="break-all">
                    <h2>{titulo.length > 40 ? titulo.slice(0, 40) + "..." : titulo}</h2>
                    <p>S/ {precio}</p>
                </div>
            </div>
        </div>
    );
};

// COMPONENTE: Botón subir
const IconoSubir = ({ showButton, scrollToTop }) => (
    <div className="productos_iconUp">
        {showButton && (
            <FontAwesomeIcon icon={faArrowUp} onClick={scrollToTop} />
        )}
    </div>
);

export const Productos = () => {
    const context = useContext(ShoppingCartContext);
    const { showButton, scrollToTop } = useContext(GoUpContext);

    // ===================================================================
    // CAMBIO PRINCIPAL: Se reemplaza la llamada de Axios por Firestore
    // ===================================================================
    useEffect(() => {
        // Se define una función asíncrona para poder usar 'await'
        const getServiciosFromFirebase = async () => {
            try {
                // 1. Obtenemos una referencia a la colección 'servicios' en Firestore.
                const serviciosCollectionRef = collection(db, "servicios");
                
                // 2. Ejecutamos la consulta para obtener todos los documentos.
                const data = await getDocs(serviciosCollectionRef);

                // 3. Mapeamos el resultado a un array de objetos que nuestro componente entiende.
                //    Añadimos el 'id' único de Firestore a cada objeto.
                const serviciosList = data.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                // 4. Actualizamos el estado global en nuestro contexto.
                context.setServicios(serviciosList);

            } catch (error) {
                console.error("Error al obtener servicios de Firebase:", error);
            }
        };

        // Llamamos a la función para que se ejecute al montar el componente.
        getServiciosFromFirebase();
    }, []); // El array vacío asegura que se ejecute solo una vez.

    const renderView = () => {
        if (context.filteredItems?.length > 0) {
            // CAMBIO: Ahora la 'key' debe ser 'servicio.id' para coincidir con Firestore.
            return context.filteredItems.map(servicio => (
                <Card key={servicio.id} data={servicio} />
            ));
        } else {
            return <div className="text-white">No hay servicios disponibles.</div>;
        }
    };

    return (
        <>
            <Banner />
            <Layout>
                <h2 className="font-bold text-2xl mb-10">Nuestros servicios</h2>
                <input
                    type='text'
                    placeholder='Busca un servicio'
                    className='rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none'
                    onChange={(event) => context.setSearchByTitle(event.target.value)}
                />

                <div className='grid gap-5 grid-cols-5 w-full max-w-screen-lg my-5 mx-auto'>
                    {renderView()}
                </div>
                
                {context.isCheckoutSideMenuOpen && <CheckoutSideMenu />}
            </Layout>
            <IconoSubir showButton={showButton} scrollToTop={scrollToTop} />
        </>
    );
};