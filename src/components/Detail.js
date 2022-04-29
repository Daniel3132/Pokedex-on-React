import React, { useEffect, useState } from 'react'
import { getPokeData } from '../helpers/api'
import EvolutionChain from './EvolutionChain'

const Detail = ({ pokemon, setmodal }) => {

    const [imagen1, setimagen1] = useState(pokemon.sprites?.front_default)
    const [imagen2, setimagen2] = useState(pokemon.sprites?.front_shiny)

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

    return (
        <>
            <button onClick={() => setmodal(false)}>close</button>
            <section>
                <h1>{pokemon.name}</h1>
                <span>#{pokemon.id}</span>

                <div>
                    <img
                        onMouseOver={() => changeImage('back')}
                        onMouseLeave={() => changeImage()}
                        src={imagen1} alt="" />
                </div>

                <div>
                    <strong>{pokemon.sprites.front_shiny ? 'Shiny' : ''}</strong>
                    <img
                        onMouseOver={() => changeImage2('back')}
                        onMouseLeave={() => changeImage2()}
                        src={imagen2} alt="" />
                </div>

                <p>Base Experience: {pokemon.base_experience}</p>
                <p>{pokemon.height / 10} m</p>
                <p>{pokemon.weight / 10} kg</p>

                <div>
                    <h5>abilities</h5>
                    <ol>
                        {pokemon.abilities.map((ability, index) => {
                            return <li key={index}>{ability.ability.name}</li>
                        })}
                    </ol>
                </div>

                <div>
                    <h5>Moves</h5>
                    <ul>
                        {pokemon.moves.map((move, index) => {
                            return <li key={index}>{move.move.name}</li>
                        })}
                    </ul>
                </div>

                {/* <div>
                    <EvolutionChain species={species} />
                </div> */}

            </section>

        </>
    )
}

export default Detail