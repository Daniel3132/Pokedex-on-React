export const obtenerLocalStorage = () => {
    const carritoStorage = sessionStorage.getItem('carrito')
    if (carritoStorage === null) {
        return undefined
    }
    return JSON.parse(carritoStorage)
}

export const guardarLocalStorage = (state) => {
    const carritoState = JSON.stringify(state)
    sessionStorage.setItem('carrito', carritoState)
}

export const guardarUsuarioStorage = (nombre, email) => {
    sessionStorage.setItem('nombre', nombre)
    sessionStorage.setItem('email', email)
}

export const obtenerUsuarioStorage = (chosen) => {
    return sessionStorage.getItem(chosen)
}
