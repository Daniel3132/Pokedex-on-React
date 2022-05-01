import React, { useEffect, useState } from 'react'
import { getPokeData, getPokes } from '../helpers/api'
import List from './List'
import { motion } from 'framer-motion'

const containerVariants = {
	hidden: {
		opacity: 0,
	},
	show: {
		opacity: 1,
		transition: { delay: 1 },
	},
};

const Home = () => {

	const [pokemons, setPokemons] = useState([])
	const [page, setPage] = useState(0)
	const [total, setTotal] = useState(0)
	const [loading, setLoading] = useState(true)

	const getPokemons = async () => {
		try {
			setLoading(true)
			//primero el numero limite por pagina, luego se multiplica para obtener las paginas segun el limite
			const data = await getPokes(25, 25 * page)
			//array de promesas
			const promises = data.results.map(async (pokemon) => {
				return await getPokeData(pokemon.url)
			})
			const results = await Promise.all(promises)
			setPokemons(results)
			setLoading(false)
			setTotal(Math.ceil(data.count / 25))
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getPokemons()
	}, [page])

	return (
		<motion.div variants={containerVariants} initial="hidden" animate="show" exit="exit">
			{
				<List
					loading={loading}
					pokemons={pokemons}
					page={page}
					setPage={setPage}
					total={total}
				/>
			}
		</motion.div >
	)
}

export default Home