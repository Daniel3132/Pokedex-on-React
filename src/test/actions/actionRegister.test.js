import { registerSync } from "../../Redux/actions/actionRegister"
import { typesRegister } from "../../Redux/types/types"

describe('Verificar acciones de Registro', () => {

    test('Validar Registro sincronico', () => {

        const email = 'ejemplo@gmail.com'
        const pass = '123456789'
        const name = 'Testing'

        const registerAction = registerSync(email, pass, name);

        expect(registerAction).toEqual({
            type: typesRegister.register,
            payload: {
                email,
                pass,
                name
            }
        })
    })
})