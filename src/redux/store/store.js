import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { loginReducers } from "../reducers/loginReducers";
import { registerReducers } from "../reducers/registerReducers";
import { obtenerLocalStorage } from "../../helpers/LocalStorage";
import { pokemonsReducers } from "../reducers/pokemonsReducers";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const storageState = obtenerLocalStorage()

const reducersEnviar = combineReducers({
    login: loginReducers,
    register: registerReducers,
    products: pokemonsReducers
})

const store = createStore(
    reducersEnviar,
    storageState,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)

export default store