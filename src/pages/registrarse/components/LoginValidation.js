export function validation(values) {
    let errors = {};
    const regex_dni = /^\d{1,7}$/;
    const regex_pswd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;

    if (values.dni === "") {
        errors.dni = "El campo DNI no debe estar vacío";
    } else if (!regex_dni.test(values.dni)) {
        errors.dni = "El DNI no puede tener más de 8 dígitos";
    }

    // if (values.password === "") {
    //     errors.password = "El campo password no debe estar vacío";
    // } else if (!regex_pswd.test(values.password)) {
    //     errors.password = "La contraseña no cumple con los requisitos";
    // }

    return errors;
}