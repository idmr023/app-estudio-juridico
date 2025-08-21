import { useState, useEffect, createContext } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { auth, db } from '../../firebaseConfig';
export const ShoppingCartContext = createContext();

export function ShoppingCartProvider({ children }) {
    // My account
    const [account, setAccount] = useState({});
    const [signOut, setSignOut] = useState(false);

    // Servicios
    const [servicios, setServicios] = useState([]);
    const [filteredItems, setFilteredItems] = useState(null);

    useEffect(() => {
        const getServiciosFromFirebase = async () => {
            try {
                const serviciosCollectionRef = collection(db, "servicios");
                const data = await getDocs(serviciosCollectionRef);
                const serviciosList = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setServicios(serviciosList);
            } catch (error) {
                console.error("Error al obtener servicios de Firebase:", error);
            }
        };
        getServiciosFromFirebase();
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDocRef = doc(db, "usuarios", user.uid);
                const docSnap = await getDoc(userDocRef);
                
                if (docSnap.exists()) {
                    setAccount(docSnap.data());
                } else {
                    setAccount({
                        usr_email: user.email,
                        usr_nom: user.displayName
                    });
                }
                setSignOut(false);
                localStorage.setItem('sign-out', 'false');
            } else {
                setAccount(null);
                setSignOut(true);
                localStorage.removeItem('account');
                localStorage.setItem('sign-out', 'true');
            }
        });

        return () => unsubscribe();
    }, []);

    // Carrito
    const [count, setCount] = useState(0);
    const [cartProducts, setCartProducts] = useState([]);
    const [order, setOrder] = useState([]);

    // Product Detail
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
    const openProductDetail = () => setIsProductDetailOpen(true);
    const closeProductDetail = () => setIsProductDetailOpen(false);
    const [productToShow, setProductToShow] = useState({});

    // Checkout Side Menu
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

    // Búsqueda
    const [searchByTitle, setSearchByTitle] = useState(null);
    const [searchByCategory, setSearchByCategory] = useState(null);

    const filteredItemsByTitle = (items, searchByTitle) => {
        return items?.filter(serv =>
            serv?.srv_nombre?.toLowerCase().includes(searchByTitle.toLowerCase())
        );
    };

    const filteredItemsByCategory = (items, searchByCategory) => {
        return items?.filter(serv =>
            serv?.srv_categoria?.toLowerCase().includes(searchByCategory.toLowerCase())
        );
    };


    const filterBy = (searchType, items, title, category) => {
        if (searchType === 'BY_TITLE') {
            return filteredItemsByTitle(items, title);
        }

        if (searchType === 'BY_CATEGORY') {
            return filteredItemsByCategory(items, category);
        }

        if (searchType === 'BY_TITLE_AND_CATEGORY') {
            return filteredItemsByCategory(items, category).filter(serv =>
                serv.srv_nombre.toLowerCase().includes(title.toLowerCase())
            );
        }

        return items;
    };

    useEffect(() => {
        if (searchByTitle && searchByCategory) {
            setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', servicios, searchByTitle, searchByCategory));
        } else if (searchByTitle) {
            setFilteredItems(filterBy('BY_TITLE', servicios, searchByTitle, searchByCategory));
        } else if (searchByCategory) {
            setFilteredItems(filterBy('BY_CATEGORY', servicios, searchByTitle, searchByCategory));
        } else {
            setFilteredItems(filterBy(null, servicios, searchByTitle, searchByCategory));
        }
    }, [servicios, searchByTitle, searchByCategory]);

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
            servicios,
            setServicios,
            searchByTitle,
            setSearchByTitle,
            searchByCategory,
            setSearchByCategory,
            filteredItems,
            account,
            setAccount,
            signOut,
            setSignOut
        }}>
            {children}
        </ShoppingCartContext.Provider>
    );
}