import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { obtenerUsuarioStorage } from '../helpers/LocalStorage'
import { delPokemon, listPokemons } from '../redux/actions/actionPokemons'
import { motion } from 'framer-motion'
import Edit from './Edit'

const containerVariants = {
	hidden: {
		y: "10vw",
		opacity: 0,
	},
	show: {
		y: "0vw",
		opacity: 1,
		transition: { delay: 0.5 },
	},
};

const Perfil = () => {

	const dispatch = useDispatch()

	const [modal, setModal] = useState(false)
	const [enviarDatosModal, setEnviarDatosModal] = useState([])


	let { pokemons } = useSelector(store => store.pokemons)

	pokemons = pokemons.filter(p => p.trainer === obtenerUsuarioStorage('email'))

	useEffect(() => {
		dispatch(listPokemons())
	}, [pokemons])

	const edit = (codigo) => {
		const traerPokemon = pokemons.find(p => p.codigo === codigo)
		setModal(true)
		setEnviarDatosModal(traerPokemon)
	}

	const deletePokemonFirebase = (codigo, nombre, image) => {
		Swal.fire({
			title: `Are you sure you want to release ${nombre}?`,
			text: "You can't undo this action!",
			imageUrl: image,
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: 'grey',
			confirmButtonText: 'Yes, Release!',
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(delPokemon(codigo))
				Swal.fire(
					'Pokemon Released!',
					`Goodbye ${nombre} :(`,
					'success'
				)
			}
		})
	}


	return (
		<motion.section variants={containerVariants} initial="hidden" animate="show" exit="exit" id='profile'>
			<img src="" alt="" />
			<h1>{obtenerUsuarioStorage('nombre')}</h1>
			<hr />
			<h3>Your Pokemon: </h3>
			<div className='trainerCont'>
				{
					pokemons.map(p =>
						<div key={p.codigo}>
							<h4>{p.nombre}</h4>
							<img src={p.image} alt="" />
							<p>{p.nickname}</p>
							<p style={{ marginBottom: '1rem' }}>Level: {p.level}</p>
							<Link to={`/detail/${p.nombre}`}><button>See More</button></Link>
							<button onClick={() => deletePokemonFirebase(p.codigo, p.nickname, p.image)}>Release</button>
							<button onClick={() => edit(p.codigo)}>Rename</button>
						</div>
					)
				}
				{
					modal === true ?
						<Edit pokemon={enviarDatosModal} modal={modal} setModal={setModal} />
						:
						''
				}
			</div>

		</motion.section>
	)
}

export default Perfil