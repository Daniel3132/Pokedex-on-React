export const guardarUsuarioStorage = (nombre, email, photo) => {
    sessionStorage.setItem('nombre', nombre)
    sessionStorage.setItem('email', email)
    sessionStorage.setItem('photo', photo)
}

export const obtenerUsuarioStorage = (chosen) => {
    return sessionStorage.getItem(chosen)
}
