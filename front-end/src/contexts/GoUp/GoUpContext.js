import React, { createContext, useEffect, useState } from "react";

const GoUpContext = createContext();

function GoUpProvider({children}){

    const [showButton, setShowButton] = useState(false);
        useEffect(() => {
            const handleScroll = () => {
            if (window.scrollY > 50) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <GoUpContext.Provider value={{
            showButton,
            scrollToTop,
        }}>
            {children}
        </GoUpContext.Provider>
    );
}

export { GoUpContext, GoUpProvider };