export function Footer() {
    return (
        <footer className="block justify-between bg-slate-400 py-16 pb-7 w-full">
                <div className="border-b border-solid border-gray-300 justify-between flex flex-wrap text-center">
                    <div className="text-black m-0 mx-20">
                        <h4>Nosotros</h4>
                        <ul className="nosotros">
                            <li><a className = "sub" href="">Ayuda</a></li>
                            <li><a className = "sub" href="">Nosotros</a></li>
                        </ul>
                    </div>

                    <div className="content-foo">
                        <h4 className="border-b-3 border-slate-900 pb-1 mb-3">Email</h4>
                        <p>Bancoutp@utp.edu.pe</p>
                    </div>
                    
                    <div className="content-foo">
                        <h4 className="border-b-3 border-slate-900 pb-1 mb-3">Ubicanos</h4>
                        <p>Av. Arequipa</p>
                    </div>
                
                    <div className="content-foo">
                        <h4 className="border-b-3 border-slate-900 pb-1 mb-3">Numero de Contacto</h4>
                        <p>+54 945 875 635</p>
                    </div>
                </div>

                <h2 className="text-center text-2xl mt-20">&copy; | Banco Chanchito UTP </h2>
        
        </footer>
    )
}