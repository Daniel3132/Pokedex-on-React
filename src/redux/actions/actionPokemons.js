import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { baseDatos } from "../../firebase/firebaseConfig"
import { typesPokemons } from "../types/types"

// funcion agregar
export const addPokemon = (pokemon) => {
    return (dispatch) => {
        addDoc(collection(baseDatos, "pokemonsBD"), pokemon)
            .then(resp => {
                dispatch(addPokemonSync(pokemon))
            })
            .catch(error => {
                console.warn(error)
            })

    }
}

export const addPokemonSync = (pokemon) => {
    return {
        type: typesPokemons.add,
        payload: pokemon,
    }
}

//funcion listar
export const listPokemons = () => {
    return async (dispatch) => {
        const collectionTraer = await getDocs(collection(baseDatos, "pokemonsBD"))
        const pokemons = []
        collectionTraer.forEach((doc) => {
            pokemons.push({
                ...doc.data()
            })
        })
        dispatch(listSync(pokemons))
    }
}

export const listSync = (pokemon) => {
    return {
        type: typesPokemons.list,
        payload: pokemon
    }
}

//funcion borrar
export const delPokemon = (codigo) => {
    return async (dispatch) => {
        const collectionTraer = collection(baseDatos, "pokemonsBD")
        const q = query(collectionTraer, where("codigo", "==", codigo))
        const traerDatosQ = await getDocs(q)
        traerDatosQ.forEach((docum => {
            deleteDoc(doc(baseDatos, "pokemonsBD", docum.id))
        }))
        dispatch(delSync(codigo))
        dispatch(listPokemons())
    }
}

export const delSync = (codigo) => {
    return {
        type: typesPokemons.delete,
        payload: codigo
    }
}

//funcion editar
export const editPokemons = (codigo, pokemon) => {
    return async (dispatch) => {
        const collectionTraer = collection(baseDatos, "pokemonsBD")
        const q = query(collectionTraer, where("codigo", "==", codigo))
        const traerDatosQ = await getDocs(q)
        let id
        traerDatosQ.forEach(async (docu) => {
            id = docu.id
        })
        console.log(id);
        const documentRef = doc(baseDatos, "pokemonsBD", id)
        await updateDoc(documentRef, pokemon)
            .then(resp => {
                dispatch(editSync(pokemon))
                console.log(resp);
            })
            .catch((err) => console.log(err))
        dispatch(listPokemons)
    }
}

export const editSync = (pokemon) => {
    return {
        type: typesPokemons.editSync,
        payload: pokemon
    }
}