export function Footer() {
    return (
        <footer className="bg-slate-800 text-white py-12 px-8 mt-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-600 pb-8">
                
                <div>
                    <h4 className="text-lg font-semibold mb-4">Sobre Nosotros</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:underline">Ayuda</a></li>
                        <li><a href="#" className="hover:underline">Nuestro Equipo</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-semibold mb-4">Correo</h4>
                    <p>abodaniel@yahoo.com</p>
                </div>

                <div>
                    <h4 className="text-lg font-semibold mb-4">Ubicación</h4>
                    <p>Av. Arequipa 234<br />Cercado de Lima, Perú</p>
                </div>

                <div>
                    <h4 className="text-lg font-semibold mb-4">Teléfono</h4>
                    <p>+51 947 924 204</p>
                </div>
            </div>

            <div className="mt-6 text-center text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} | IDMR
            </div>
        </footer>
    );
}