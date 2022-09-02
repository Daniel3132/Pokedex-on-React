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

	const getmid = async (mid = '') => {
		const arrayMid = []
		for (const mi of mid) {
			const userarrayMid = await getImages(mi)
			arrayMid?.push(userarrayMid)
		}
		return arrayMid
	}

	const getAdult = async (adult = [[]]) => {

		const arrayAdult = []
		for (const ad of adult[0]) {
			const userarrayAdult = await getImages(ad)
			arrayAdult?.push(userarrayAdult)
		}
		return arrayAdult
	}

	const setImages = async () => {
		setbabyImage(await getImages(baby))
		setmidImage(await getmid(mid))
		setadultImage(await getAdult(adult))
	}

	useEffect(() => {
		setImages();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [baby])


	return (
		<>
			<h2>Evolution Chain:</h2>
			<div>
				<div className='evolve2'>
					<h3>{baby}</h3>
					<div>
						<img src={babyImage} alt="" />
					</div>
				</div>
				<div className='evolve2'>
					<ul>
						{
							mid?.map((name, index) =>
								<h3 key={index}>{name}</h3>
							)
						}
					</ul>
					<div>
						{

							midImage?.map((a, index) =>
								<img key={index} src={a} alt='' />
							)
						}
					</div>
				</div>
				<div className='evolve2'>
					<ol>
						{
							adult ?
								adult[0]?.map((name, index) =>
									<h3 key={index}>{name}</h3>
								)
								: ''
						}
					</ol>
					<div>
						{
							adultImage ?
								adultImage?.map((a, index) =>
									<img key={index} src={a} alt='' />
								)
								: ''
						}
					</div>
				</div>
			</div>
		</>
	)
}

export default EvolutionChain