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
        <div className='home'>
            <Pagination
                page={page + 1}
                totalPages={total}
                onLeft={lastPage}
                onRight={nextPage}
            />
            <div id='list' >
                {loading ?
                    <>
                    <div>
                        <img style={{ width: '10rem' }} src="https://cdn-icons-png.flaticon.com/512/287/287221.png" alt="" />
                        <h1 style={{ textAlign: 'center' }}> . . . </h1>
                        </div>
                    </>
                    :

                    pokemons.map(pokemon =>
                        <Card
                            key={pokemon.name}
                            pokemon={pokemon}
                        />
                    )}
            </div>
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