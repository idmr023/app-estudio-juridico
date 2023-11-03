export function validation(values) {
    let errors = {};
    const regex_email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const regex_pswd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const regex_dni = /^\d{1,7}$/;

    if (values.name === "") {
        errors.name = "El campo nombre no debe estar vacío";
    }else{
        errors.name = "";
    }

    if (values.dni === "") {
        errors.dni = "El campo DNI no debe estar vacío";
    } else if (!regex_dni.test(values.dni)) {
        errors.dni = "El DNI no puede tener más de 8 dígitos";
    }

    if (values.email === "") {
        errors.email = "El campo email no debe estar vacío";
    } else if (!regex_email.test(values.email)) {
        errors.email = "El email no cumple con el formato válido";
    }

    // if (values.password === "") {
    //     errors.password = "El campo password no debe estar vacío";
    // } else if (!regex_pswd.test(values.password)) {
    //     errors.password = "La contraseña no cumple con los requisitos";
    // }

    return errors;
}
