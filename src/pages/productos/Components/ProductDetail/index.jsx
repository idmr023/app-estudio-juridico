import { useContext } from "react"
import { ShoppingCartContext } from "../../../../contexts/CarritoContext"
import { CloseIcon } from "../../../../Icons" 

const ProductDetail = () => {
    const context = useContext(ShoppingCartContext)
    return (
        
        <aside 
            //Para cerrar es tan sencillo como poner una función opuesta y estilos embebidos que definan la clase (o tambien con un operador AND tal como en está en HOME)
            className="flex-col fixed right-0 border bg-white border-black rounded-lg overflow-y-scroll w-[360px] h-[calc(100vh-80px)]">
            <div className="flex justify-between item-center p-6">
                <h2 className="font-medium text-xl">Detail</h2>
                <div onClick={() => context.closeProductDetail()}><CloseIcon/></div>
            </div>
            <figure className="px-6">
                {/* width y high del padre */}
                <img 
                    className="w-full h-full rounded-lg" 
                    src={context.productToShow.images} 
                    alt={context.productToShow.title} />
            </figure>
            <p className="flex flex-col p-6">
                <span className="font-medium text-2xl mb-2">${context.productToShow.price}</span>
                <span className="font-medium text-md">${context.productToShow.title}</span>
                <span className="font-light text-sm">${context.productToShow.description}</span>
            </p>
        </aside>
    )
}

export default ProductDetail