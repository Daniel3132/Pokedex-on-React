import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { buscarPoke } from '../helpers/api'
import { useForm } from '../hooks/useForm'
import Card from './Card'

const NavBar = () => {

	const navigate = useNavigate()
	const [modal, setModal] = useState(false)
	const [pokemon, setPokemon] = useState()

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

	return (
		<header>
			<nav>
				<div>
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
				<img src="https://cdn-icons-png.flaticon.com/512/126/126467.png" alt="logout" />
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