export const BotonSbt = ({children}) => {
    return (
        <button className="bg-black disabled:bg-black/40 text-white w-full rounded-lg py-3 mt-4 mb-2">
            {children}
        </button>
    )
}
    
export const BotonSbt2 = ({children}) => {
    return (
        <button className='border border-black disabled:text-black/40  w-full disabled:border-black/40 rounded-lg mt-6 py-3'>
            {children}
        </button>
    )
}