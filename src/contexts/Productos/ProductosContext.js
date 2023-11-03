import { createContext } from "react";


const ProductosContext = createContext();

function ProductosProvider({children}){
    const cursos = [
        { id:"programacion", link: "#", nombre_prod: "Java", categoria: "Programación" },
        { id:"programacion",  link: "#", nombre_prod: "PHP", categoria: "Programación" },
        { id:"programacion",  link: "#", nombre_prod: "Ruby on Rails", categoria: "Programación" },
        { id:"programacion",  link: "#", nombre_prod: ".NET", categoria: "Programación" },
        { id:"programacion",  link: "#", nombre_prod: "Pascal", categoria: "Programación" },
        { id:"programacion",  link: "#", nombre_prod: "Desarrollo Web", categoria: "Programación" },
        { id:"bd",  link: "#", nombre_prod: "MySQL", categoria: "Bases de Datos" },
        { id:"bd",  link: "#", nombre_prod: "Postegres", categoria: "Bases de Datos" },
    ];

    return (
        <ProductosContext.Provider value={{
            cursos
        }}>
        {children}
        </ProductosContext.Provider>
    );
}

export {ProductosContext, ProductosProvider};