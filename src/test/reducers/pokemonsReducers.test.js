import { pokemonsReducers } from "../../redux/reducers/pokemonsReducers"
import { typesPokemons } from "../../Redux/types/types"


describe('Pruebas en pokemons Reducer',()=>{

    test('Agregar Pokemon',()=>{
        const initState = {
            pokemons: []
        }
        const action ={
            type: typesPokemons.add ,
            payload: {
                nombre: 'pikachu',
            }
        }
        const state = pokemonsReducers(initState, action)
        expect(state).toEqual({
            pokemons: [{
                nombre: 'pikachu',
            }]
        })
    })
        
    test('Editar Pokemon',()=>{
        const initState = {
            pokemons: []
        }
        const action ={
            type: typesPokemons.edit,
            payload: {
                nombre: 'pikachu',
            }
        }
        const state = pokemonsReducers(initState, action)
        expect(state).toEqual({
            ...state
        })
    })
    
    test('Borrar Pokemon',()=>{
        const initState = {
            pokemons: []
        }
        const action ={
            type: typesPokemons.delete,
            payload: {
                nombre: 'pikachu',
            }
        }
        const state = pokemonsReducers(initState, action)
        expect(state).toEqual({
            pokemons: state.pokemons.filter(prod => prod !== action.payload)
        })
    })

    test('State Default',()=>{
        const initState={
            pokemons: []
        }
        const action ={
            type: typesPokemons.typeInventadoDePrueba,
        }
        const state = pokemonsReducers(initState, action)
        expect(state).toEqual(initState)
    })
})