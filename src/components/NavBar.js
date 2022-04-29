import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { buscarPoke } from '../helpers/api'
import { useForm } from '../hooks/useForm'
import Card from './Card'

const NavBar = () => {

  const [modal, setModal] = useState(false)
  const [pokemon, setPokemon] = useState()

  const [values, handleInputChange, reset] = useForm({
    busqueda: ''
  })

  const { busqueda } = values

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await buscarPoke(values.busqueda)
    if (data === undefined || data === '') {
      Swal.fire({
        title: 'Error!',
        heightAuto: '1rem',
        text: `No se encontro nada referente a ${busqueda} `,
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    } else {
      console.log(data);
      setPokemon(data)
      reset()
      setModal(true)
    }
  }

  return (

    <header>
      <nav>
        <img style={{ width: '10rem' }} src="https://crisgon.github.io/pokedex/src/images/logo.png" alt="" />
        <form onSubmit={handleSubmit}>
          <input name='busqueda' value={busqueda} onChange={handleInputChange} type="text" placeholder='Search by name or Id' />
          <button type="submit">Search</button>
        </form>
      </nav>
      {
        modal === true ?
          <div>
            <button onClick={() => setModal(false)}>Close</button>
            <Card pokemon={pokemon} />
          </div>
          : ''
      }
    </header>
  )
}

export default NavBar