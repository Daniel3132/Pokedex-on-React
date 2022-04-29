import React, { useEffect, useState } from 'react'
import { buscarPoke } from '../helpers/api'

const EvolutionChain = ({ evolutionChain }) => {

	const [babyImage, setbabyImage] = useState()
	const [midImage, setmidImage] = useState()
	const [adultImage, setadultImage] = useState()

	const baby = evolutionChain?.chain?.species.name
	const mid = evolutionChain?.chain?.evolves_to.map(e => e.species.name)
	const adult = evolutionChain?.chain?.evolves_to.map(e => e.evolves_to.map(s => s.species.name))

	const getImages = async (nombre = '') => {
		const data = await buscarPoke(nombre)
		return await data?.sprites?.front_default
	}

	const setImages = async () => {
		setbabyImage(await getImages(baby))
		setmidImage(await getImages(mid))
		setadultImage(await getImages(adult))
	}

	useEffect(() => {
		setImages();
	}, [baby])


	return (
		<div>Evolution Chain:
			<div>
				<h1>{baby}</h1>
				<img src={babyImage} alt="" />
			</div>

			<div>
				<h1>{mid}</h1>
				<img src={midImage} alt="" />
			</div>

			<div>
				<h1>{adult}</h1>
				<img src={adultImage} alt="" />
			</div>
		</div>
	)
}

export default EvolutionChain