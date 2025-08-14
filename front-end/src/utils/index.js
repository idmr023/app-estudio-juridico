/**
 * Recorre el array de servicios y acumula el precio total.
 * @param {Array} servicios - Array de objetos con propiedad srv_precio.
 * @returns {number} Precio total.
 */
export const totalPrice = (servicios) => {
    return servicios.reduce((acc, servicio) => acc + servicio.srv_precio, 0);
}

/**
 * This function obtains current DateTime
 * @returns {number} Date Time
 */

export const dateTime = () => {
    const date = new Date().toLocaleDateString();        
    return date;
}
