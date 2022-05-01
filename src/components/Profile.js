import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { obtenerUsuarioStorage } from '../helpers/LocalStorage'
import { delPokemon, listPokemons } from '../redux/actions/actionPokemons'

const Perfil = () => {

	const dispatch = useDispatch()

	const [modal, setModal] = useState(false)
	const [enviarDatosModal, setEnviarDatosModal] = useState([])

	let { pokemons } = useSelector(store => store.pokemons)

	pokemons = pokemons.filter(p => p.trainer === obtenerUsuarioStorage('email'))

	useEffect(() => {
		dispatch(listPokemons())
	}, [])

	const editar = (codigo) => {
		const traerPokemon = pokemons.find(t => t.codigo === codigo)
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
		<section id='profile'>
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
						<p>Nickname: {p.nickname}</p>
						<p style={{marginBottom:'1rem'}}>Level: {p.level}</p>
						<Link to={`/detail/${p.nombre}`}><button>See More</button></Link>
						<button onClick={() => deletePokemonFirebase(p.codigo, p.nickname, p.image)}>Release</button>
					</div>
				)
			}
			</div>
			{
				/*  modal === true ? <Edit modal={enviarDatosModal} /> : '' */
			}
		</section>
	)
}

export default Perfil