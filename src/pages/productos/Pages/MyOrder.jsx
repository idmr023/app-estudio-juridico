import { useContext } from "react"
import {ShoppingCartContext} from "../../../contexts/CarritoContext"
import Layout from "../Components/Layout"
import OrderCard from "../Components/OrderCard"
import OrdersCard from "../Components/OrdersCard"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"

export function MyOrder() {
    const context = useContext(ShoppingCartContext)
    const currentPath = window.location.pathname
    let index = currentPath.substring(currentPath.lastIndexOf('/')+1)
    if (index === 'last') index = context.order?.length - 1 

    return (
        <Layout>
            
            <div className="flex items-center justify-center relative w-80 mb-6">
                <h1>MyOrder</h1>
                <Link to="/carrito/delivery" className="absolute right-0">
                    <FontAwesomeIcon icon={faChevronRight} />
                </Link>
            </div>

            <div className="flex flex-col w-80">
                {context.order?.[index]?.libros.map(libro => (
                    <OrderCard 
                        key={libro.lbr_isbn}
                        id={libro.lbr_isbn}
                        title={libro.lbr_titulo}
                        images={libro.lbr_portada}
                        price={libro.lbr_precio}
                    />
                ))}
            </div>
            { context.order.map((order, index) => {
                    <Link key={index} to={`/carrito/my-orders/${order.id}`}>
                        <OrdersCard
                            totalPrice={order.totalPrice}
                            totalProducts={order.totalProducts}
                        />
                    </Link>
                })
            }
        </Layout>
    )
}