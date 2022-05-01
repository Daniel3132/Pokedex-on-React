import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import uuid from 'react-uuid'
import Swal from 'sweetalert2'
import { obtenerUsuarioStorage } from '../helpers/LocalStorage'
import { useForm } from '../hooks/useForm'
import { addPokemon } from '../redux/actions/actionPokemons'
import { useNavigate } from 'react-router-dom'

const Add = () => {

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [pokemon, setpokemon] = useState({})
	const { nombre } = useParams()
	const trainer = obtenerUsuarioStorage('email')
	const codigo = uuid()
	const level = Math.floor(Math.random() * 100 + 1)
	const image = pokemon?.sprites?.front_default

	useEffect(() => {
		axios.get('https://pokeapi.co/api/v2/pokemon/' + nombre)
			.then(function (response) {
				setpokemon(response.data)
			})
	}, [])


	const [values, handleInputChange, reset] = useForm({
		nickname: '',
	})

	const { nickname } = values

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(values)
		dispatch(addPokemon(
			{
				...values,
				trainer,
				nombre,
				level,
				image,
				codigo
			}
		))
		reset()

		Swal.fire({
			title: `${nombre} Catched!`,
			text: 'You can see it on your profile screen.',
			imageUrl: pokemon?.sprites?.front_default,
			imageWidth: 400,
			imageHeight: 200,
			imageAlt: 'Catched Pokemon',
		})
		navigate('/')
	}


	return (
		<div>
			<form onSubmit={handleSubmit} className="addForm">
				<h1>Catch Pokemon!</h1>
				<p>Do you wanna catch this wild {nombre} level {level}?</p>
				<img src={pokemon?.sprites?.front_default} alt="" />
				<div>
					{/* <input type="text" name="trainer" placeholder="Trainer" value={trainer} /> */}
					<label>Give a Nickname to your new pokemon</label>
					<input type="text" name="nickname" placeholder="Nickname" value={nickname} onChange={handleInputChange} required />
					<input type="text" name="nombre" placeholder="Pokemon Name" value={nombre} readOnly />
					<input type="text" name="level" placeholder="level" value={level}  readOnly/>
					{/* <input type="text" name="codigo" placeholder="Codigo" value={codigo}  /> */}
				</div>
				<button type="submit">
					<h2>Catch!</h2>
				</button>

			</form>

		</div>
	)
}

export default Add