import { useContext } from "react"
import { Link } from "react-router-dom"
import { ShoppingCartContext } from "../../../../contexts/CarritoContext"
import { CloseIcon } from "../../../../Icons" 
import { totalPrice } from "../../../../utils"
import OrderCard from "../OrderCard"

const CheckoutSideMenu = () => {
    const context = useContext(ShoppingCartContext)

    const handleDelete = (id) => {
        const filteredProducts = context.cartProducts.filter(libros => libros.lbr_isbn !== id)
        context.setCartProducts(filteredProducts)
        context.setCounter(context.counter - 1)
    }

    const handleCheckout = () => {
        const libros = context.cartProducts
        const orderToAdd = {
            date: '01.02.23',
            libros: libros,
            totalProducts: libros.length,
            totalPrice: totalPrice(libros)
        }

        context.setOrder([...context.order, orderToAdd])
        context.setCartProducts([])
        context.setCount(0);
        context.closeCheckoutSideMenu()
    }

    return (
        
        <aside 
            className=" absolute top-0 right-0 bg-white border-black rounded-lg  w-[360px] h-[calc(100vh-80px)]>">
            <div className="">
                <h2 className="">My Order</h2>
                <div onClick={() => context.closeCheckoutSideMenu()}>
                    <CloseIcon/>
                </div>
            </div>
            <div className="">
            {
                context.cartProducts.map((libro, index) => (
                    <OrderCard
                        key={index}
                        title={libro.lbr_titulo}
                        images={libro.lbr_portada}
                        price={libro.lbr_precio}
                        handleDelete={handleDelete}
                    />
                ))
            }
            </div>
            <div className="px-6 mb-6">
                <p className='flex justify-between items-center mb-2'> 
                    <span className="font-light">Total:</span>
                    <span className="font-medium text-2xl">S/{totalPrice(context.cartProducts)}</span>
                </p>
                <Link to='/carrito/my-orders/last'>
                    <button className="bg-black py-3 text-white w-full rounded-lg" onClick={() => handleCheckout()}>Checkout</button>
                </Link>
            </div>
        </aside>
    )
}

export default CheckoutSideMenu