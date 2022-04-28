import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { baseDatos } from "../../Firebase/firebaseConfig"
import { typesProducts } from "../types/types"


// funcion agregar

export const addProduct = (product) => {
    return (dispatch) => {
        addDoc(collection(baseDatos, "productosBD"), product)
            .then(resp => {
                dispatch(addProductSync(product))
            })
            .catch(error => {
                console.warn(error)
            })

    }
}

export const addProductSync = (product) => {
    return {
        type: typesProducts.add,
        payload: product,
    }
}

//funcion listar
export const listProducts = () => {
    return async (dispatch) => {
        const collectionTraer = await getDocs(collection(baseDatos, "productosBD"))
        const products = []
        collectionTraer.forEach((doc) => {
            products.push({
                ...doc.data()
            })
        })
        dispatch(listSync(products))
    }
}

export const listSync = (product) => {
    return {
        type: typesProducts.list,
        payload: product
    }
}

//funcion borrar
export const delProduct = (codigo) => {
    return async (dispatch) => {
        const collectionTraer = collection(baseDatos, "productosBD")
        const q = query(collectionTraer, where("codigo", "==", codigo))
        const traerDatosQ = await getDocs(q)
        traerDatosQ.forEach((docum => {
            deleteDoc(doc(baseDatos, "productosBD", docum.id))
        }))
        dispatch(delSync(codigo))
        dispatch(listProducts())
    }
}

export const delSync = (codigo) => {
    return {
        type: typesProducts.delete,
        payload: codigo
    }
}


//funcion editar

export const editProducts = (codigo, product) => {
    return async (dispatch) => {
        const collectionTraer = collection(baseDatos, "productosBD")
        const q = query(collectionTraer, where("codigo", "==", codigo))
        const traerDatosQ = await getDocs(q)
        let id
        traerDatosQ.forEach(async (docu) => {
            id = docu.id
        })
        console.log(id);
        const documentRef = doc(baseDatos, "productosBD", id)
        await updateDoc(documentRef, product)
            .then(resp => {
                dispatch(editSync(product))
                console.log(resp);
            })
            .catch((err) => console.log(err))
        dispatch(listProducts)
    }
}

export const editSync = (product) => {
    return {
        type: typesProducts.editSync,
        payload: product
    }
}
