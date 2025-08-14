import { useContext } from "react";
import { Navigate} from "react-router-dom";
import { Productos } from "pages/productos";
import { ShoppingCartContext } from "../../contexts/CarritoContext";

export function ProtectedRoute(){
    const context = useContext(ShoppingCartContext)
    // Account
    const account = localStorage.getItem('account')
    const parsedAccount = JSON.parse(account)
    // Sign Out
    const signOut = localStorage.getItem('sign-out')
    const parsedSignOut = JSON.parse(signOut)
    // Has an account
    const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
    const noAccountInLocalState = Object.keys(context.account).length === 0
    const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState
    const isUserSignOut = context.signOut || parsedSignOut

    return hasUserAnAccount && !isUserSignOut ? <Productos /> : <Navigate replace to={'/login'} />;
}