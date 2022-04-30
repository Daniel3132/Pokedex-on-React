import { typesPokemons } from "../types/types";

const initialState = {
    pokemons: [],
}

export const pokemonsReducers = (state = initialState, action) => {
    switch (action.type) {
        case typesPokemons.add:
            return {
                pokemons: [action.payload]
            }
        case typesPokemons.list:
            return {
                pokemons: [...action.payload]
            }
        case typesPokemons.edit:
            return {
                ...state
            }
        case typesPokemons.delete:
            return {
                pokemons: state.pokemons.filter(poke => poke !== action.payload)
            }
        default:
            return state
    }
}