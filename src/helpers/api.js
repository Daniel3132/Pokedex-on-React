export const urlBuscar = 'https://pokeapi.co/api/v2/pokemon/'
export const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit='

export const buscarPoke = async (pokemon) => {
    try {
        const resp = await fetch(urlBuscar + pokemon)
        const data = await resp.json()
        if (pokemon === '') {
            return ''
        } else {
            return data
        }
    } catch (err) {
        console.log(err);
    }
}

//le damos estado inicial a limit y a offset
export const getPokes = async (limit = 25, offset = 0) => {
    try {
        const resp = await fetch(API_URL + limit + '&offset=' + offset)
        const data = await resp.json()
        return data
    } catch (error) {
        console.log(error);
    }
}

export const getPokeData = async (url) => {
    try {
        const resp = await fetch(url)
        const data = await resp.json()
        return data
    } catch (error) {
        console.log(error);
    }
}