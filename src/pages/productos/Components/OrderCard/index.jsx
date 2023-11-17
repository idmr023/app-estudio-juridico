// import PropTypes from 'prop-types'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { CloseIcon } from "../../../../Icons"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

const OrderCard = ({id, title, images, price, handleDelete }) => {
    let renderIcon
    
    if(handleDelete){
        renderIcon = <CloseIcon/>
    }

return (
        <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
                <figure className="w-20 h-20">
                <img className="w-full h-full rounded-lg object-cover" src={images} alt={title} />
                </figure>
                <p className="text-sm font-light">{title}</p>
            </div>
            <div className="flex items-center gap-2">
                <p className="text-lg font-medium">${price}</p>
                <FontAwesomeIcon className="cursor-pointer" onClick={() => handleDelete(id)} icon={faPlus} />
            </div>
        </div>
    )
}

export default OrderCard