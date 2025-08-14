// FormUI.jsx

export const FormContainer = ({ children }) => {
    return (
        <div className="max-w-md w-full mt-20 mx-auto px-4 sm:px-6 lg:px-8">
            {children}
        </div>
    );
};

export const Formulario = ({ children, onSubmit }) => {
    return (
        <form
            onSubmit={onSubmit}
            className="w-full bg-gray-800 text-gray-100 shadow-2xl px-8 py-10 sm:px-16 sm:py-14 rounded-2xl"
        >
            {children}
        </form>
    );
};

export const FrmInput = (props) => {
    return (
        <input
            {...props}
            className="w-full h-10 bg-transparent border-b border-gray-400 text-gray-100 text-lg tracking-wide outline-none focus:border-blue-400 transition-colors placeholder-gray-400"
        />
    );
};
