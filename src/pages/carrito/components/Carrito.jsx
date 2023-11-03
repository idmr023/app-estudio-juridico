import { AddToCartIcon } from "./Icon.jsx";
import "./Carrito.css";

export function Carrito ({products}){
    return (
        <main className="products">
            <ul>
                {products.slice(0, 10).map(product => {
                    <li key={product.id}>
                        <img 
                            src={product.thumbail}
                            alt={product.title}
                        />                 
                    
                        <div>
                            <strong>{product.title}</strong> - ${product.price}
                        </div>    
                            
                        <div>
                            <button>
                                <AddToCartIcon />
                            </button>
                        </div>
                    </li>  
            })}
            </ul>
        </main>    
    )
}