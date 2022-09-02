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
import { motion } from 'framer-motion'

const containerVariants = {
	hidden: {
		x: "10vw",
		opacity: 0,
	},
	show: {
		x: "0vw",
		opacity: 1,
		transition: { delay: 0.3 },
	},
};

const Add = () => {

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [pokemon, setpokemon] = useState({})
	const { nombre } = useParams()
	const trainer = obtenerUsuarioStorage('email')
	const codigo = uuid()

	const image = pokemon?.sprites?.front_default

	useEffect(() => {
		axios.get('https://pokeapi.co/api/v2/pokemon/' + nombre)
			.then(function (response) {
				setpokemon(response.data)
			})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const [values, handleInputChange, reset] = useForm({
		nickname: '',
	})

	const { nickname } = values

	const handleSubmit = (e) => {
		const level = Math.floor(Math.random() * 100 + 1)
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
			confirmButtonText: 'Continue',
		}).then((result) => {
			if (result.isConfirmed) {
				navigate('/')
			}
		})
	}

	return (
		<motion.section variants={containerVariants} initial="hidden" animate="show" exit="exit">
			<form onSubmit={handleSubmit} className="addForm">
				<h1>Catch Pokemon!</h1>
				<p>Do you wanna catch this wild {nombre}?</p>
				<img src={pokemon?.sprites?.front_default} alt="" />
				<div>
					<label>Give a Nickname to your new pokemon</label>
					<input type="text" name="nickname" placeholder="Nickname" value={nickname} onChange={handleInputChange} required />
					<input type="text" name="nombre" placeholder="Pokemon Name" value={nombre} readOnly />
				</div>
				<button type="submit">
					<h2>Catch!</h2>
				</button>
				<br />
				<small>you will be able to  see the level of this pokemon in your profile list </small>
			</form>
		</motion.section>
	)
}

export default Add