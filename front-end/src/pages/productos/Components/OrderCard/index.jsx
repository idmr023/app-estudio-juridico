import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const OrderCard = ({ id, title, images, price, handleDelete }) => {
    return (
        <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
                <figure className="w-20 h-20">
                    <img className="w-full h-full rounded-lg object-cover" src={images} alt={title} />
                </figure>
                <p className="text-sm font-light break-all">{title}</p>
            </div>
            <div className="flex items-center gap-2">
                <p className="text-lg font-medium">S/ {price}</p>
                {handleDelete && (
                    <FontAwesomeIcon
                        icon={faXmark}
                        onClick={() => handleDelete(id)}
                        className="h-6 w-6 text-black cursor-pointer"
                    />
                )}
            </div>
        </div>
    );
};

export default OrderCard;