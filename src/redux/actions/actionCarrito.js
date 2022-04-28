import { typesCarrito } from "../types/types"

export const Crearcarritos = (carrito) => {
    return {
        type: typesCarrito.crear,
        payload: carrito
    }
}
export const Eliminarcarritos = (id) => {
    return {
        type: typesCarrito.eliminar,
        payload: id
    }
}
export const Editarcarritos = (carritoEdit) => {
    return {
        type: typesCarrito.editar,
        payload: carritoEdit
    }
}
export const EliminarAll = () => {
    return {
        type: typesCarrito.eliminarAll
    }
}
export const Filtrarcarritos = (estado) => {
    return {
        type: typesCarrito.filtrar,
        payload: estado
    }
}