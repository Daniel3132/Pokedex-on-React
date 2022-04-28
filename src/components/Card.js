import React from 'react'

const Card = ({ pokemon }) => {
    return (
        <>
            <div>
                <h2>{pokemon.name}</h2>
                <img src={pokemon.sprites.front_default} alt="" />
                <h4>No.{pokemon.id}</h4>
                {
                    pokemon.types.map((type, index) => {
                        return <div key={index}>{type.type.name}</div>
                    })
                }
            </div>
        </>
    )
}

export default Card