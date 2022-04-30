import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { buscarPoke } from '../helpers/api'
import { obtenerUsuarioStorage } from '../helpers/LocalStorage'
import { useForm } from '../hooks/useForm'
import { logoutAsync } from '../redux/actions/actionLogin'
import Card from './Card'

const NavBar = () => {

	const navigate = useNavigate()
	const [modal, setModal] = useState(false)
	const [pokemon, setPokemon] = useState()


	const dispatch = useDispatch()

	const [values, handleInputChange, reset] = useForm({
		busqueda: ''
	})

	const { busqueda } = values

	const handleSubmit = async (e) => {
		e.preventDefault()
		const data = await buscarPoke(values.busqueda)
		if (data === undefined || data === '') {
			Swal.fire({
				title: 'Error!',
				heightAuto: '1rem',
				text: `No se encontro nada referente a ${busqueda} `,
				icon: 'error',
				confirmButtonText: 'Cool'
			})
		} else {
			setPokemon(data)
			reset()
			setModal(true)
		}
	}

	const handleLogout = () => {
        Swal.fire({
            title: '¿Cerrar Sesión?',
            text: "¿Estás seguro que deseas salir?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(logoutAsync())
                navigate("/login")
                Swal.fire(
                    'Adios!',
                    'Gracias!',
                    'success'
                )
            }
        })
    }

	return (
		<header>
			<nav>
				<div>
				<p>{obtenerUsuarioStorage('nombre')}</p>
				<img src="https://cdn-icons-png.flaticon.com/512/64/64572.png" alt="perfil" />
				</div>
				<div>
					<img onClick={()=>navigate('/')} className='pokeLogo' src="https://crisgon.github.io/pokedex/src/images/logo.png" alt="Pokemon Logo" />
					<form onSubmit={handleSubmit}>
						<input name='busqueda' value={busqueda} onChange={handleInputChange} type="text" placeholder='Search by name or Id' />
						<button type="submit">Search</button>
					</form>
				</div>
				<div>
				<img onClick={handleLogout} src="https://cdn-icons-png.flaticon.com/512/126/126467.png" alt="logout" />
				</div>
			</nav>
			{
				modal === true ?
					<div style={{margin:'2rem auto'}}>
						<button  onClick={() => setModal(false)}>Close</button>
						<Card pokemon={pokemon} />
					</div>
					: ''
			}
		</header>
	)
}

export default NavBar