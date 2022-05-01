import { loginReducers } from "../../Redux/reducers/loginReducers"
import { typesLogin } from "../../Redux/types/types"

describe('Pruebas en loginReducer',()=>{
    
    test('debe realizar el login',()=>{
        const initState={}
        const action ={
            type: typesLogin.login,
            payload: {
                email: 'prueba@gmail.com',
                password: 'Daniel'
            }
        }
        const state = loginReducers(initState, action)
        expect(state).toEqual({
            id:'prueba@gmail.com',
            name:'Daniel'
        })
    })
    
    test('Logout',()=>{
        const initState={
            id:'prueba@gmail.com',
            name:'Daniel'
        }
        const action ={
            type: typesLogin.logout,
        }
        const state = loginReducers(initState, action)
        expect(state).toEqual({})
    })
    
    test('State Default',()=>{
        const initState={
            id:'prueba@gmail.com',
            name:'Daniel'
        }
        const action ={
            type: typesLogin.typeInventadoDePrueba,
        }
        const state = loginReducers(initState, action)
        expect(state).toEqual(initState)
    })
})