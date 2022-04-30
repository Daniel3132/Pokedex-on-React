import React, { useEffect, useState } from 'react'
import { buscarPoke } from '../helpers/api'

const EvolutionChain = ({ evolutionChain }) => {

	const [babyImage, setbabyImage] = useState()
	const [midImage, setmidImage] = useState([])
	const [adultImage, setadultImage] = useState([])

	const baby = evolutionChain?.chain?.species.name
	const mid = evolutionChain?.chain?.evolves_to.map(e => e.species.name)
	const adult = evolutionChain?.chain?.evolves_to.map(e => e.evolves_to.map(s => s.species.name))

	const getImages = async (nombre = '') => {
		const data = await buscarPoke(nombre)
		return await data?.sprites?.front_default
	}

	const setImages = async () => {
		setbabyImage(await getImages(baby))

		const arrayMid = []	
		for (const mi of await mid) {
			const userarrayMid = await getImages(mi)
			arrayMid.push(userarrayMid)
		}
		setmidImage( arrayMid)

		const arrayAdult = []
		for (const ad of await adult) {
			const userarrayAdult = await getImages(ad)
			arrayAdult.push(userarrayAdult)
		}
		setadultImage(arrayAdult)
	}

	useEffect(() => {
		setImages();
	}, [baby])


	return (
		<>
		<h2>Evolution Chain:</h2>
		<div>
			<div>
				<h1>{baby}</h1>
				<img src={babyImage} alt="" />
			</div>
			<div>
				<div>			
					{
						mid?.map((name, index) =>
							<h1 key={index}>{name}</h1>
						)
					}
					{

						midImage?.map((a, index) =>
							<img key={index} src={a} alt='' />
						)
					}
				</div>
			</div>
			<div>
				{
					adult?.map((name, index) =>
						<h1 key={index}>{name}</h1>
					)
				}
				{
					adultImage.map((a, index) =>
						<img key={index} src={a} alt='' />
					)
				}
			</div>
		</div>
		</>
	)
}

export default EvolutionChain