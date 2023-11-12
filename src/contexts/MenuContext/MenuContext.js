import React from 'react'
import { createContext } from "react";
import Home from "../../pages/home";
import { Productos } from "../../pages/productos";
import {Login} from "../../pages/registrarse/Login";
import {SingUp} from "../../pages/registrarse/SingUp";
import { Contacto } from "../../pages/contacto";
import Page404 from "../../pages/404";
import { PagAyuda } from "../../pages/ayuda";
import { useLocation} from 'react-router-dom';
import { Chatbot } from '../../componentes/ChatBot';
import { HomeProduct } from '../../pages/productos/Pages/Home';
import { MyOrders } from '../../pages/productos/Pages/MyOrders';
import { MyOrder } from '../../pages/productos/Pages/MyOrder';

const MenuContext = createContext();

function MenuProvider({ children }) {

    const createRoute = (key, path, element, nombre) => ({
        key,
        path,
        element,
        nombre,
    });

    const rutasData = [
        { key: 1, path: "/", element: <Home /> },
        { key: 2, path: "/carrito", element: <Productos />, nombre: "Productos" },
        { key: 3, path: "/login", element: <Login />, nombre: "Login" },
        { key: 6, path: "/contacto", element: <Contacto />, nombre: "Contacto" },
        { key: 8, path: "/ayuda", element: <PagAyuda />, nombre: "Ayuda" },
        { key: 10, path: '/carrito/novela', element: <Productos />, nombre: "Novela"  },
        { key: 11, path: '/carrito/fantasía', element: <Productos />, nombre: "Fantasía"  },
        { key: 12, path: '/carrito/aventuras', element: <Productos />, nombre: "Aventuras"  },
        { key: 13, path: '/carrito/others', element: <Productos />, nombre: "Otros"  },
        { key: 15, path: '/carrito/my-order', element: <MyOrders />},
        { key: 16, path: '/carrito/my-orders', element: <MyOrders />},
        { key: 17, path: '/carrito/my-orders/last', element: <MyOrder />},
        { key: 18, path: '/carrito/my-orders/:id', element: <MyOrder />},
        { key: 19, path: "*", element: <Page404 /> },
        { key: 4, path: "/registrarse", element: <SingUp />},
    ]

    const rutas = rutasData.map((rutaData) => createRoute(rutaData.key, rutaData.path, rutaData.element, rutaData.nombre));

    const location = useLocation();

    return (
        <>
            <MenuContext.Provider value={{
                rutas,
                }}>{children}
            </MenuContext.Provider>
            <div>
                { location.pathname === "/" && <Chatbot/> }
            </div>
        </>
    );
}

export { MenuContext, MenuProvider };