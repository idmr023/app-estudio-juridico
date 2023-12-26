export const FormContainer = ({children}) =>{
    return (
        <div className="max-w-sm w-full mt-20 inline-flex items-center mx-auto sm:block">
            {children}
        </div>
    )
}

export const Formulario = ({children}) =>{
    return (
        <form className="text-white w-full bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-[rgba(0,0,0,0.8)] shadow-2xl px-20 py-20 rounded-2xl mb-20">
            {children}
        </form>
    )
}

export const FrmInput = ({children}) =>{
    return (
        <input className="h-10 bg-transparent border-b border-white border-solid border-t-0 border-r-0 border-l-0 text-white text-lg leading-6 tracking-wider mt-15 outline-none">
            {children}
        </input>
    )
}