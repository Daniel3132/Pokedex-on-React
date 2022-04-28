import React from 'react'

const Pagination = ({onLeft, onRight, page, totalPages}) => {

    return (
        <div>
            <button onClick={onLeft}>Left</button>
            <div>{page} of {totalPages}</div>
            <button onClick={onRight}>right</button>
        </div>
    )
}

export default Pagination