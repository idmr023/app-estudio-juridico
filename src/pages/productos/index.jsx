import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { GoUpContext } from "../../contexts/GoUp/GoUpContext";
import { ShoppingCartContext } from "../../contexts/CarritoContext";
import { Banner } from "./Components/Banner";
import CheckoutSideMenu from "./Components/CheckoutSideMenu"
import ProductDetail from "./Components/ProductDetail"
import Layout from "./Components/Layout";
import Card from "./Components/Card";

export const Productos = () => {
    
    const context = useContext(ShoppingCartContext)
    const { showButton, scrollToTop, } = useContext(GoUpContext)

    const renderView = () => {
        if (context.filteredItems?.length > 0) {
        return (
            context.filteredItems?.map(libros => (
                <Card key={libros.lbr_isbn} data={libros} />
            ))
        )
        } else {
        return (
            <div>We don't have anything :(</div>
        )
        }
    };
    
    const IconoSubir = ({showButton, scrollToTop}) => {
        return (
            <div className="productos_iconUp">
            {showButton && (
                <FontAwesomeIcon icon={faArrowUp} onClick={scrollToTop} />
            )}
        </div>
        )
    }
    
    return (
        <>
            <Banner />
            <Layout>
                <h2 className="font-bold text-2xl mb-10">Nuestros libros</h2>
                <input
                    type='text'
                    placeholder='Search a product'
                    className='rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none'
                    onChange={(event) => context.setSearchByTitle(event.target.value)}
                />
                <div  className='grid gap-5 grid-cols-5 w-full max-w-screen-lg my-5 mx-auto'>
                    {renderView()}
                </div>
                { context.isProductDetailOpen && <ProductDetail /> }
                <br/>
                { context.isCheckoutSideMenuOpen && <CheckoutSideMenu/> }
                <IconoSubir showButton={showButton}
                            scrollToTop={scrollToTop}
                />
            </Layout>
        </>
    );
    
};