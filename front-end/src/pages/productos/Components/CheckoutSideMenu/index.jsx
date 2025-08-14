import { useContext } from "react"
import { Link } from "react-router-dom"
import { ShoppingCartContext } from "../../../../contexts/CarritoContext"
import { totalPrice } from "../../../../utils"
import OrderCard from "../OrderCard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

const CheckoutSideMenu = () => {
    const context = useContext(ShoppingCartContext)

    const handleDelete = (id) => {
        const filteredProducts = context.cartProducts.filter(serv => serv.srv_id !== id)
        context.setCartProducts(filteredProducts)
    }

    const handleCheckout = () => {
        const servicios = context.cartProducts
        const orderToAdd = {
            date: new Date().toLocaleDateString(),
            servicios: servicios,
            totalProducts: servicios.length,
            totalPrice: totalPrice(servicios)
        }

        context.setOrder([...context.order, orderToAdd])
        context.setCartProducts([])
        context.setCount(0)
        context.closeCheckoutSideMenu()
    }

    return (
        <aside className="absolute top-0 right-0 bg-white border-black rounded-lg w-[360px] h-[calc(50vh-80px)]">
            <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-medium">My Order</h2>
                <div onClick={() => context.closeCheckoutSideMenu()}>
                    <FontAwesomeIcon icon={faXmark} className="cursor-pointer" />
                </div>
            </div>

            <div className="p-4 overflow-y-auto h-[70%]">
                {context.cartProducts.map((serv, index) => (
                    <OrderCard
                        key={index}
                        id={serv.srv_id}
                        title={serv.srv_nombre}
                        images={serv.srv_imagen}
                        price={serv.srv_precio}
                        handleDelete={handleDelete}
                    />
                ))}
            </div>

            <div className="px-6 mb-6">
                <p className="flex justify-between items-center mb-2"> 
                    <span className="font-light">Total:</span>
                    <span className="font-medium text-2xl">S/ {totalPrice(context.cartProducts)}</span>
                </p>
                <Link to='/carrito/my-orders/last'>
                    <button
                        className="bg-black py-3 text-white w-full rounded-lg"
                        onClick={handleCheckout}
                    >
                        Checkout
                    </button>
                </Link>
            </div>
        </aside>
    )
}

export default CheckoutSideMenu