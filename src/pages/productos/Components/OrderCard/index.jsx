// import PropTypes from 'prop-types'
import { AddIcon, CloseIcon } from "../../../../Icons"

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
            <AddIcon onClick={() => handleDelete(id)}/>
        </div>
        </div>
    )
}

export default OrderCard