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
import { MyOrders } from '../../pages/productos/Pages/MyOrders';
import { MyOrder } from '../../pages/productos/Pages/MyOrder';

const MenuContext = createContext();

function MenuProvider({ children }) {

    const rutasData = [
        { key: 1, path: "/", element: <Home /> },
        { key: 2, path: "/contacto", element: <Contacto />, nombre: "Contacto" },
        { key: 3, path: "/ayuda", element: <PagAyuda />, nombre: "Ayuda" },
        { key: 4, path: "*", element: <Page404 /> },
        { key: 5, path: "/carrito", element: <Productos />},
        { key: 6, path: "/login", element: <Login />, nombre: "Login" },
        { key: 7, path: "/registrarse", element: <SingUp />, nombre: "Registrarse" },
    ];
    
    const rutasProduc = [
        { key: 8, path: "/carrito", element: <Productos />, nombre: "Todos los productos"},
        { key: 9, path: '/carrito/novela', element: <Productos />, nombre: "Novela" },
        { key: 10, path: '/carrito/fantasía', element: <Productos />, nombre: "Fantasía" },
        { key: 11, path: '/carrito/aventuras', element: <Productos />, nombre: "Aventuras" },
        { key: 12, path: '/carrito/others', element: <Productos />, nombre: "Otros" },
        { key: 13, path: '/carrito/my-order', element: <MyOrders />},
        { key: 14, path: '/carrito/my-orders', element: <MyOrders />},
        { key: 15, path: '/carrito/my-orders/last', element: <MyOrder />},
        { key: 16, path: '/carrito/my-orders/:id', element: <MyOrder />},
    ];
    
    const rutasCombinadas = [...rutasData, ...rutasProduc];

    const location = useLocation();

    return (
        <>
            <MenuContext.Provider value={{
                rutasCombinadas,
                }}>{children}
            </MenuContext.Provider>
            <div>
                { location.pathname === "/" && <Chatbot/> }
            </div>
        </>
    );
}

export { MenuContext, MenuProvider };