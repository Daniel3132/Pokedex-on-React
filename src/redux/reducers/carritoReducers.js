import { typesCarrito } from "../types/types"

const initialState = {
    carrito: []
}

export const carritoReducers = (state = initialState, action) => {
    switch (action.type) {
        case typesCarrito.crear:
            return {
                carrito: [...state.carrito, action.payload]
            }
        case typesCarrito.editar:
            return {
                ...state,
                carrito: state.carrito.map(pro => pro.codigo === action.payload.codigo ? action.payload : pro)
            }
        case typesCarrito.eliminar:
            return {
                carrito: state.carrito.filter(carrito => carrito.codigo !== action.payload)
            }
        case typesCarrito.eliminarAll:
            return {
                carrito: []
            }
        case typesCarrito.filtrar:
            return {
                carrito: state.carrito.filter(carrito => carrito.state === action.payload)
            }
        default:
            return state
    }
}