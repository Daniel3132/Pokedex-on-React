import React from 'react'
import Card from './Card'
import Pagination from './Pagination'

const List = ({ pokemons, page, setPage, total, loading }) => {

    const lastPage = () => {
        const nextPage = Math.max(page - 1, 0)
        setPage(nextPage)
    }

    const nextPage = () => {
        const nextPage = Math.min(page + 1, total)
        setPage(nextPage)
    }

    return (
        <div>
            {loading ?
                <div>Cargando...</div>
                :
                pokemons.map(pokemon =>
                    <Card
                        key={pokemon.name}
                        pokemon={pokemon}
                    />
                )}
            <Pagination
                page={page + 1}
                totalPages={total}
                onLeft={lastPage}
                onRight={nextPage}
            />
        </div>
    )
}

export default List