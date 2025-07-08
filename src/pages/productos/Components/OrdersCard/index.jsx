import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarDays, faDollarSign } from "@fortawesome/free-solid-svg-icons"

const OrdersCard = ({id, totalPrice, totalProducts, dateTime}) => {
return (
        <div className="text-lg text-white items-center text-center justify-center relative m-6 bg-black rounded-lg p-6 ">
            <div>
                <p className="text-xl m-4">Order ID: {id}</p>
            </div>
            <hr/>
            <div className="flex justify-between">
                <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCalendarDays} />
                    <p className="m-4">Fecha de compra: <br/> {dateTime}</p>
                </div>

                <div>
                    <p>Items : {totalProducts}</p>
                </div>

                <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faDollarSign} className="inline" /> 
                    <span className="m-4">Precio total: S/{totalPrice}</span>
                </div>
            </div>
        </div>
    )
}

export default OrdersCard