import { registerReducers } from "../../Redux/reducers/registerReducers"
import { typesRegister } from "../../Redux/types/types"

describe('Pruebas en registerReducers', () => {

    test('debe realizar el registro', () => {
        const initState = {}

        const action = {
            type: typesRegister.register,
            payload: {
                email: 'danielc31@gmail.com',
                pass: '123',
                name: 'daniel'
            }
        }

        const state = registerReducers(initState, action);

        expect(state).toEqual({
            email: 'danielc31@gmail.com',
            pass: '123',
            name: 'daniel'
        })
    })

    test('State Default', () => {
        const initState = {
            email: 'danielc31@gmail.com',
            pass: '123',
            name: 'daniel'
        }
        const action = {
            type: typesRegister.typeInventadoDePrueba,
        }
        const state = registerReducers(initState, action);
        expect(state).toEqual(initState)
    })
})