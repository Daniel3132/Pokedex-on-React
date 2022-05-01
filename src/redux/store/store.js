import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { loginReducers } from "../reducers/loginReducers";
import { registerReducers } from "../reducers/registerReducers";
import { pokemonsReducers } from "../reducers/pokemonsReducers";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducersEnviar = combineReducers({
    login: loginReducers,
    register: registerReducers,
    pokemons: pokemonsReducers
})

const store = createStore(
    reducersEnviar,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)

export default store