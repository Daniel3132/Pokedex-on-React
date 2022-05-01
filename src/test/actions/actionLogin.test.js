import { loginSincronico, logoutSync } from "../../Redux/actions/actionLogin"
import { typesLogin } from "../../Redux/types/types"

describe('Verificar acciones de Login',()=>{

    test('Validar login sincronico',()=>{
        const email = 'ejemplo@gmail.com'
        const password = 'passwordtesting'

        const loginAction = loginSincronico(email, password)

        expect(loginAction).toEqual({
            type: typesLogin.login,
            payload:{
                email,
                password
            }
        })
    })

    test('Logout',()=>{
        const logoutAction = logoutSync()

        expect(logoutAction).toEqual({
            type: typesLogin.logout,
        })
    })
})