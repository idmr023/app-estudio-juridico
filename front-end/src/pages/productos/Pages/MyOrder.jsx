import { useContext } from "react";
import { ShoppingCartContext } from "../../../contexts/CarritoContext";
import OrderCard from "../Components/OrderCard";
import OrdersCard from "../Components/OrdersCard";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { dateTime } from "../../../utils/index";

export function MyOrder() {
    const context = useContext(ShoppingCartContext);
    const currentPath = window.location.pathname;
    let index = currentPath.substring(currentPath.lastIndexOf("/") + 1);
    if (index === "last") index = context.order?.length - 1;

    const Layout = ({ children }) => {
        return (
            <div className="relative flex flex-col items-center mt-20">
                {children}
            </div>
        );
    };

    return (
        <Layout>
            <div className="flex items-center justify-center relative w-80 mb-6">
                <h1>MyOrder</h1>
                <Link to="/carrito/delivery" className="absolute right-0">
                    <FontAwesomeIcon icon={faChevronRight} />
                </Link>
            </div>

            <div className="flex flex-col w-80">
                {context.order?.[index]?.servicios.map(serv => (
                    <OrderCard
                        key={serv.srv_id}
                        id={serv.srv_id}
                        title={serv.srv_nombre}
                        images={serv.srv_imagen}
                        price={serv.srv_precio}
                    />
                ))}
            </div>

            {context.order.map((order, i) => (
                <Link key={i} to={`/carrito/my-orders/${order.id}`}>
                    <OrdersCard
                        id={order.id}
                        totalPrice={order.totalPrice}
                        totalProducts={order.totalProducts}
                        dateTime={order.dateTime}
                    />
                </Link>
            ))}
        </Layout>
    );
}