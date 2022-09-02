import React from 'react'

const Pagination = ({onLeft, onRight, page, totalPages}) => {
    return (
        <div id='pagination'>
            <button onClick={onLeft}>
            <i class="fa fa-arrow-left" aria-hidden="true"></i>
            </button>
            <div>
                <p>{page} of {totalPages}</p>
            </div>
            <button onClick={onRight}>
            <i class="fa fa-arrow-right" aria-hidden="true"></i>
            </button>
        </div>
    )
}
export default Pagination