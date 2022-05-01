export const guardarUsuarioStorage = (nombre, email) => {
    sessionStorage.setItem('nombre', nombre)
    sessionStorage.setItem('email', email)
}

export const obtenerUsuarioStorage = (chosen) => {
    return sessionStorage.getItem(chosen)
}
