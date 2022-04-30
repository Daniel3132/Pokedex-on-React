import React, { useState } from 'react'
import { Link} from 'react-router-dom'
import Detail from './Detail'


const Card = ({ pokemon }) => {
    const [modal, setmodal] = useState(false)
    return (
        <section id='card'>
            <div>
                <h3>{pokemon.name}</h3>
                <img src={pokemon.sprites.front_default} alt="" />
                <div className='types'>
                    {pokemon.types.map((type, index) => {
                        return <strong className={'type ' + type.type.name} key={index}>{type.type.name}</strong>
                    })}
                </div>
                <small>No. {pokemon.id}</small>
                <Link to={`/detail/${pokemon.name}`}  >
                    <button>See More</button></Link>
            </div>
            {
                modal === true ?
                    <Detail pokemon={pokemon} setmodal={setmodal} />
                    :
                    ""
            }
        </section>
    )
}

export default Card