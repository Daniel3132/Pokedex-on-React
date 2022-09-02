import React, { useState } from 'react'
import squirtle from '../assets/squirtle.png'
import bulbasaur from '../assets/bulbasaur.png'
import charmander from '../assets/charmander.png'
import blastoise from '../assets/blastoise.jpg'
import venusaur from '../assets/venusaur.jpg'
import charizard from '../assets/charizard.jpg'

const BgChoose = () => {
    const [Bg, setBg] = useState(blastoise);
    document.body.style.backgroundImage = `url(${Bg})`;
    return (
        <div className='bgChoose'>
            <button onClick={() => setBg(venusaur)}>
                <img alt="" src={bulbasaur} />
            </button>

            <button onClick={() => setBg(blastoise)}>
                <img alt="" src={squirtle} />
            </button>

            <button onClick={() => setBg(charizard)}>
                <img alt="" src={charmander} />
            </button>
        </div>
    )
}

export default BgChoose