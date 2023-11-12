import { useContext } from "react"
import { v4 as uuidv4 } from 'uuid';
import { Link } from "react-router-dom"
import { ShoppingCartContext } from "../../../../contexts/CarritoContext"
import { dateTime } from "../../../../utils";
import Layout from "../../Components/Layout"
import OrdersCard from "../../Components/OrdersCard"

export function MyOrders() {
    const context = useContext(ShoppingCartContext)
    return (
    <>
        <Layout>
        <div className="flex items-center justify-center relative w-80 ">
            <h1>MyOrders</h1>
        </div>
        {
            context.order.map((order, index) => (
                <Link key={index} to={`/my-orders/${index}`}>
                    <OrdersCard
                        id={uuidv4()}
                        totalPrice={order.totalPrice}
                        totalProducts={order.totalProducts}
                        dateTime={dateTime}
                    />
                </Link>
            ))
        }
        </Layout>
    </>
    )
}
