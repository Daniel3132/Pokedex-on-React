import { typesProducts } from "../types/types";

const initialState = {
    products: [],
}

export const productosReducers = (state = initialState, action) => {
    switch (action.type) {
        case typesProducts.add:
            return {
                products: [action.payload]
            }
        case typesProducts.list:
            return {
                products: [...action.payload]
            }
        case typesProducts.edit:
            return {
                ...state
            }
        case typesProducts.delete:
            return {
                products: state.products.filter(prod => prod !== action.payload)
            }
        default:
            return state
    }
}