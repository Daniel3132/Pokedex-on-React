import { typesLogin, typesPokemons, typesRegister } from "../../redux/types/types"

describe('Verificar types', () => {

    test('comparar objetos', () => {

        expect(typesLogin).toEqual({
            login: 'login',
            logout: 'logout',
        })

        expect(typesRegister).toEqual({
            register: 'register'
        })

        expect(typesPokemons).toEqual({
            add: 'add',
            list: 'list',
            edit: 'edit',
            delete: 'delete',
            detail: 'detail',
            search: 'search'
        })

    })
})