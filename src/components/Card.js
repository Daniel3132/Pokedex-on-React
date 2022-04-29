import React, { useState } from 'react'
import Detail from './Detail'

const Card = ({ pokemon }) => {
    const [modal, setmodal] = useState(false)
    return (
        <>
            <div>
                <h2>{pokemon.name}</h2>
                <img src={pokemon.sprites.front_default} alt="" />
                <h4>No.{pokemon.id}</h4>
                {pokemon.types.map((type, index) => {
                    return <div key={index}>{type.type.name}</div>
                })}
                <button onClick={()=>setmodal(true)}>Open Detail</button>
            </div>
            {
                modal === true ?

                <Detail pokemon={pokemon} setmodal={setmodal} />

                :

                ""
            }
        </>
    )
}

export default Card