export const BotonSbt = ({ children, onClick, disabled, type }) => {
    return (
        <button 
        onClick={onClick}
        disabled={disabled}
        type={type}
        className="bg-blue-700 hover:bg-blue-800 text-white w-full rounded-lg py-3 mt-6 mb-4 px-4 transition">
            {children}
        </button>
    );
};

export const BotonSbt2 = ({ children, onClick, disabled, type }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            type={type} 
            className="border border-gray-600 text-gray-700 hover:bg-gray-100 disabled:text-gray-400 disabled:border-gray-400 w-full rounded-lg py-3 mt-6 mb-4 px-4 transition">
                {children}
        </button>
    );
};