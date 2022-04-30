import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { buscarPoke, getlinkSpecies, getPokeData } from '../helpers/api'
import EvolutionChain from './EvolutionChain'

const Detail = () => {

    const { nombre } = useParams()

    const [pokemon, setpokemon] = useState([])

    const frontDefault = pokemon?.sprites?.front_default

    const [imagen1, setimagen1] = useState()
    const [imagen2, setimagen2] = useState()

    const [evolution, setEvolution] = useState([])

    const changeImage = (side) => {
        side === 'back'
            ? setimagen1(pokemon.sprites?.back_default)
            : setimagen1(pokemon.sprites?.front_default)
    }

    const changeImage2 = (side) => {
        side === 'back'
            ? setimagen2(pokemon.sprites?.back_shiny)
            : setimagen2(pokemon.sprites?.front_shiny)
    }

    const fetchSpecies = async (id) => {
        setimagen1(pokemon?.sprites?.front_default)
        setimagen2(pokemon.sprites?.front_shiny)
        const response = await getlinkSpecies(id)
        const evolutionChain = await getPokeData(response?.evolution_chain.url)
        setEvolution(evolutionChain)
    }

    useEffect(() => {
        const setElegido = async () => {
            setpokemon(await buscarPoke(nombre))
            fetchSpecies(pokemon.id)
        }
        setElegido()
    }, [frontDefault, nombre])

    return (
        <>
            {<section id='detail'>
                <h1>{pokemon.name}</h1>
                <span>#{pokemon.id}</span>
                <div>
                    <div>
                        <img
                            onMouseOver={() => changeImage('back')}
                            onMouseLeave={() => changeImage()}
                            src={imagen1} alt="" />
                    </div>
                    <strong>{pokemon?.sprites?.front_shiny ? 'Shiny: ' : ''}</strong>
                    <div>
                        <img
                            onMouseOver={() => changeImage2('back')}
                            onMouseLeave={() => changeImage2()}
                            src={imagen2} alt="" />
                    </div>

                    <div className='stats'>
                        <p>Base Experience: {pokemon.base_experience}</p>
                        <p>height: {pokemon.height / 10} m</p>
                        <p>weight: {pokemon.weight / 10} kg</p>
                        
                        <div className='types'>
                            <p>Types:</p>
                            {pokemon?.types?.map((type, index) => {
                                return <strong className={'type ' + type.type.name} key={index}>{type.type.name}</strong>
                            })}
                        </div>
                    </div>
                </div>

                <EvolutionChain evolutionChain={evolution} />

                <h2>abilities</h2>
                <div>
                    <ol>
                        {pokemon.abilities?.map((ability, index) => {
                            return <li key={index}>{ability.ability.name}</li>
                        })}
                    </ol>
                </div>
                <h2>Moves</h2>
                <div>
                    <ul className='moves'>
                        {pokemon.moves?.map((move, index) => {
                            return <li key={index}>{move.move.name}</li>
                        })}
                    </ul>
                </div>
                <button>Catch!</button>
            </section>}
        </>
    )
}

export default Detail