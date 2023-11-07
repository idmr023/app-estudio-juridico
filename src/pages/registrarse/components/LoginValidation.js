export function validation(values) {
    let errors = {};
    const regex_dni = 8;
    const regex_pswd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;

    if (values.dni === "") {
        errors.dni = "El campo DNI no debe estar vacío";
    } else if (values.dni.length > 8) {
        errors.dni = "El DNI no puede tener más de 8 dígitos";
    }
    return errors;
}