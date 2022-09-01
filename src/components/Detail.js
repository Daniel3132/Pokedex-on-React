import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { buscarPoke, getlinkSpecies, getPokeData } from '../helpers/api'
import EvolutionChain from './EvolutionChain'
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

const Detail = () => {

    const { nombre } = useParams()
    const [pokemon, setpokemon] = useState([])
    const [imagen1, setimagen1] = useState('')
    const [imagen2, setimagen2] = useState('')
    const [Movimientos, setMovimientos] = useState(4)

    const [evolution, setEvolution] = useState([])

    const front = pokemon?.sprites?.front_default

    const changeImage = (side) => {
        side === 'back'
            ? setimagen1(pokemon.sprites?.back_default)
            : setimagen1(front)
    }

    const changeImage2 = (side) => {
        side === 'back'
            ? setimagen2(pokemon.sprites?.back_shiny)
            : setimagen2(pokemon.sprites?.front_shiny)
    }

    const fetchSpecies = async (id = '') => {
        setimagen1(pokemon?.sprites?.front_default)
        setimagen2(pokemon.sprites?.front_shiny)
        const response = await getlinkSpecies(id)
        const evolutionChain = await getPokeData(response?.evolution_chain?.url)
        setEvolution(evolutionChain)
    }

    useEffect(() => {
        const setElegido = async () => {
            setpokemon(await buscarPoke(nombre))
            fetchSpecies(await pokemon.id)
        }

        setElegido()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [front])

    return (
        <>
            {<motion.section id='detail' variants={containerVariants} initial="hidden" animate="show" exit="exit">
                <h1>{pokemon.name}</h1>
                <span style={{ color: 'orange' }} >#{pokemon.id}</span>
                <hr />
                <div>
                    <div>
                        <img
                            onMouseOver={() => changeImage('back')}
                            onMouseLeave={() => changeImage()}
                            src={imagen1} alt="" />
                    </div>
                    
                    <div>
                        <strong>{pokemon?.sprites?.front_shiny ? 'Shiny: ' : ''}</strong>
                        <img
                            onMouseOver={() => changeImage2('back')}
                            onMouseLeave={() => changeImage2()}
                            src={imagen2} alt="" />
                    </div>
                    <div className='stats'>
                        <p><strong>Base Experience:</strong> {pokemon.base_experience}</p>
                        <p> <strong>Height:</strong> {pokemon.height / 10} m</p>
                        <p><strong>Weight:</strong> {pokemon.weight / 10} kg</p>

                        <div className='types'>
                            <p><strong>Types:</strong></p>
                            {pokemon?.types?.map((type, index) => {
                                return <span className={'type ' + type.type.name} key={index}>{type.type.name}</span>
                            })}
                        </div>
                    </div>
                </div>
                <hr />
                <EvolutionChain evolutionChain={evolution} />
                <hr />
                <h2>Abilities</h2>
                <div>
                    <ol>
                        {pokemon.abilities?.map((ability, index) => {
                            return <li key={index}>{ability.ability.name}</li>
                        })}
                    </ol>
                </div>
                <hr />
                
                <div>
                    <h2>Moves</h2>
                    <ul className='moves'>
                        {pokemon.moves?.map((move, index) => 
                            index < Movimientos ?
                           <li key={index}>{move.move.name}</li>
                           : null
                        )}
                    </ul>
                    {
                        ((pokemon.moves)?.length - Movimientos) !== 0 ? 
                        <button className='btnVerMas' onClick={()=>setMovimientos(pokemon?.moves.length)}>Ver más ({ (pokemon.moves)?.length - Movimientos})</button>
                        : <button className='btnVerMas' onClick={()=>setMovimientos(4)}>Ver Menos</button>
                    }
                </div>
                <hr />
                <Link to={`/catch/${pokemon.name}`}  >
                    <button>Catch!</button>
                </Link>
            </motion.section>}
        </>
    )
}

export default Detail