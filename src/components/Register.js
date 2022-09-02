import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { registerAsync } from '../redux/actions/actionRegister';
import { Link } from 'react-router-dom';
import '../styles/login.scss'


//----------------Validacion de cada input -----------
const SignupSchema = Yup.object().shape({
    nombre: Yup.string()
        .min(2, 'El nombre es muy corto')
        .max(50, 'excede el maximo')
        .required('Nombre Obligatorio'),

    email: Yup.string()
        .email('debe ser de tipo email, ex. ana@gmail.com')
        .min(5, 'El Correo es muy corto')
        .max(50, 'excede el maximo')
        .required('Correo Obligatorio'),

    pass: Yup.string()
        .min(5, 'Mínimo 5 caracteres')
        .max(10, 'Máximo 10')
        .required('La contraseña obligatoria')
        .oneOf([Yup.ref('pass2')], 'Las contraseñas no coinciden'),

    pass2: Yup.string()
        .min(5, 'Mínimo 5 caracteres')
        .max(10, 'Máximo 10')
        .required('La contraseña obligatoria')
        .oneOf([Yup.ref('pass')], 'Las contraseñas no coinciden')
});



export const Register = () => {

    const dispatch = useDispatch()

    return (

        <div>
            <Formik
                initialValues={
                    {
                        nombre: '',
                        email: '',
                        pass: '',
                        pass2: ''
                    }
                }
                validationSchema={SignupSchema}
                onSubmit={values => {
                    console.log(values)
                    dispatch(registerAsync(values.email, values.pass, values.nombre))

                }}
            >
                {({ errors, touched, handleSubmit, handleChange, handleReset }) => (
                    <Form
                        className='formulario'>

                        <h1>Registrarse</h1>
                        <Field name="nombre" placeholder="Nombre" type="text" />
                        {errors.nombre && touched.nombre ?
                            (<small>{errors.nombre}</small>) : null}

                        <Field name="email" placeholder="Correo Electronico" type="email" />
                        {errors.email && touched.email ?
                            (<small>{errors.email}</small>) : null}

                        <Field name="pass" placeholder="Contraseña" type="password" />
                        {errors.pass && touched.pass ?
                            (<small>{errors.pass}</small>) : null}


                        <Field name="pass2" placeholder="Confirmar contraseña" type="password" />
                        {errors.pass2 && touched.pass2 ?
                            (<small>{errors.pass2}</small>) : null}

                        <button type="submit">Enviar</button>
                        <Link to="/login">Iniciar Sesión</Link>
                    </Form>
                )}

            </Formik>
        </div>
    );
} 
