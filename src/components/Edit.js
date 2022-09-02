import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from '../hooks/useForm';
import { editPokemons } from '../redux/actions/actionPokemons';


const Edit = ({ pokemon, modal, setModal }) => {

    const dispatch = useDispatch()

    const [values, handleInputChange] = useForm({
        nombre: pokemon.nombre,
        codigo: pokemon.codigo,
        image: pokemon.image,
        level: pokemon.level,
        nickname: pokemon.nickname,
        trainer: pokemon.trainer,

    })

    const { nombre, codigo, nickname, trainer } = values

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(editPokemons(codigo, values))
        setModal(false)
    }

    return (
        <>
            <div className='editModal'>
                <form onSubmit={() => handleSubmit()}>
                    <label>Name</label>
                    <input type="text" name="nombre" value={nombre} readOnly />

                    <label>Nickname</label>
                    <input type="text" name="nickname" value={nickname} onChange={handleInputChange} />

                    <label>Trainer</label>
                    <input type="text" name="trainer" value={trainer} onChange={handleInputChange} />
                    <small style={{ fontStyle: 'italic', color: 'red' }}>Change email to give this pokemon to another trainer</small>
                    <button type="submit" onClick={handleSubmit}>
                        Save
                    </button>
                    <button type='button' onClick={() => setModal(false)}>Close</button>
                </form>
            </div>
        </>
    );
};

export default Edit;