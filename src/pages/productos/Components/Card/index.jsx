import { useContext, useEffect, useState } from "react"
import { ShoppingCartContext } from "../../../../contexts/CarritoContext"
import { AddIcon, CheckIcon } from "../../../../Icons"

const AddItemButton = ({ isInCart, onItemAdded }) => {
  if ( isInCart ) {
    return (
      <div className="absolute top-0 right-0 flex justify-center items-center bg-black w-6 h-6 rounded-full m-2 p-1">
        <CheckIcon className="w-6 h-6 text-white" />
      </div>
    )
  }

  return (
    <div
      className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1"
      onClick={onItemAdded}
    >
      <AddIcon className="w-6 h-6 text-black" />
    </div>
  )
}

export default function Card({ data }) {
  const context = useContext(ShoppingCartContext) 
  
  const showProduct = () => {
    context.openProductDetail()
    context.setProductToShow(data)
    context.closeCheckoutSideMenu()
  }

  const addToCart = (e) => {
    e.stopPropagation();
    console.log('Add to cart clicked');
  
    const existingProduct = context.cartProducts.find((libro) => libro.lbr_isbn === data.lbr_isbn);
  
    if (existingProduct) {
      // Product is already in the cart, update quantity and price
      const updatedCartProducts = context.cartProducts.map((libro) =>
        libro.lbr_isbn === data.lbr_isbn
          ? { ...libro, quantity: libro.quantity + 1, totalPrice: libro.totalPrice + data.price }
          : libro
      );
  
      context.setCartProducts(updatedCartProducts);
    } else {
      // Product is not in the cart, add it
      const newCartProduct = {
        ...data,
        quantity: 1,
        totalPrice: data.price,
      };
  
      const newCartProducts = [...context.cartProducts, newCartProduct];
      context.setCartProducts(newCartProducts);
    }
  
    context.setCount(context.count + 1);
    context.openCheckoutSideMenu();
    context.closeProductDetail();
  };  

  const isInCart = !!context.cartProducts.find(libros => libros.lbr_isbn === data.id)
  
  //Para llamar directamente a los valores desde fuera de Context se usa data.[titulo,isbn]
  const titleProduct = () => {
    if (data.lbr_titulo && data.lbr_titulo.length > 40) {
      return data.lbr_titulo.slice(0, 40) + ' ... ';
    } else {
      return data.lbr_titulo || 'Untitled';
    }
  }

  return (
      <div 
        className="productos_contProd text-center" 
        onClick={showProduct}
      >
        <div className="flex flex-wrap" key={data.lbr_isbn}>
          <figure className="relative mb-2 w-full h-4/5" key={data.lbr_isbn}>
          <span className="absolute bottom-0 left-0 bg-white/60 rounded-full text-black text-xs px-3 py-1 m-2">
            { data.lbr_genero }
          </span>
          <img className="w-full h-full object-cover rounded-lg" src={data.lbr_portada} alt={data.lbr_titulo} />

          <AddItemButton 
            isInCart={isInCart}
            onItemAdded={addToCart}
          />
          </figure>
          <div className="break-all">
              <h2>{ titleProduct() }</h2>
              <p>{data.lbr_autor}</p>
              <span className="absolute bottom-0 left-0 bg-white/60 rounded-full text-black text-xs px-3 py-1 m-2">
                { data.lbr_genero }
              </span>
              <p>S/ { data.lbr_precio }</p>
          </div>
        </div>
    </div>
  )
}
