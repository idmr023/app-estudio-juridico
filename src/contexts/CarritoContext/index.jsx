import axios from 'axios';
import { useState , useEffect, createContext } from 'react'

export const ShoppingCartContext = createContext()

export function ShoppingCartProvider ({children}){
    const [filteredItems, setFilteredItems] = useState(null)
        
    useEffect(() => {
        axios.get('http://localhost:3001/api/list_vent_lbrs')
        .then(response => response.data)
        .then(data => 
            setLibros(data)
        )
    }, [filteredItems]);

    //Shopping Cart - Increment quantity
    const [count, setCount] = useState(0)

    // Product Detail - Open/Close
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false) //Para cerrar y abrir es tan sencillo como poner una función o puesto y estilos embebidos que definan la clase
    const openProductDetail = () => setIsProductDetailOpen(true)
    const closeProductDetail = () => setIsProductDetailOpen(false)    
    
    // Product Detail - Open/Close
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false) //Para cerrar y abrir es tan sencillo como poner una función o puesto y estilos embebidos que definan la clase
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true)
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)

    // Product Detail - Show product
    const [productToShow, setProductToShow] = useState(false)

    //Shopping Cart - Add producs to cart
    const [cartProducts, setCartProducts] = useState([]);
	
    //Shopping Cart - Order
    const [order, setOrder] = useState([]);

    // //Get products
    const [libros, setLibros] = useState([]);
    
    // Get products by title
    const [searchByTitle, setSearchByTitle] = useState(null)

    // Get products by category
    const [searchByCategory, setSearchByCategory] = useState(null)

    const filteredItemsByTitle = (libros, searchByTitle) => {
        return libros?.filter(libro => libro.lbr_titulo.toLowerCase().includes(searchByTitle.toLowerCase()))
    }
    
    const filteredItemsByCategory = (libros, searchByCategory) => {
        return libros?.filter(libro => libro.lbr_genero.toLowerCase().includes(searchByCategory.toLowerCase()))
    }
    
    const filterBy = (searchType, libros, searchByTitle, searchByCategory) => {
        if (searchType === 'BY_TITLE') {
            return filteredItemsByTitle(libros, searchByTitle)
        }
    
        if (searchType === 'BY_CATEGORY') {
            return filteredItemsByCategory(libros, searchByCategory)
        }
    
        if (searchType === 'BY_TITLE_AND_CATEGORY') {
            return filteredItemsByCategory(libros, searchByCategory).filter(libro => libro.lbr_titulo.toLowerCase().includes(searchByTitle.toLowerCase()))
        }
    
        if (!searchType) {
            return libros
        }
    }
    
    useEffect(() => {
        if (searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', libros, searchByTitle, searchByCategory))
        if (searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE', libros, searchByTitle, searchByCategory))
        if (!searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY', libros, searchByTitle, searchByCategory))
        if (!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null, libros, searchByTitle, searchByCategory))
    }, [libros, searchByTitle, searchByCategory])
    

    return (
        <ShoppingCartContext.Provider value={{
            count, 
            setCount,
            openProductDetail,
            closeProductDetail,
            isProductDetailOpen,
            productToShow,
            setProductToShow,
            cartProducts,
            setCartProducts,
            isCheckoutSideMenuOpen,
            openCheckoutSideMenu,
            closeCheckoutSideMenu,
            order,
            setOrder,
            libros,
            setLibros,
            searchByTitle,
            setSearchByTitle,
            filteredItems,
            searchByCategory,
            setSearchByCategory
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}