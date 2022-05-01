import React from 'react'

const Pagination = ({onLeft, onRight, page, totalPages}) => {
    return (
        <div id='pagination'>
            <button onClick={onLeft}>Back</button>
            <div>{page} of {totalPages}</div>
            <button onClick={onRight}>Next</button>
        </div>
    )
}
export default Pagination