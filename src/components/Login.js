import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginEmailPassAsync, loginFacebook, loginGoogle } from '../redux/actions/actionLogin';
import { Link } from 'react-router-dom';
import '../styles/login.scss'

//----------------Validacion de cada input -----------
const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .email('debe ser de tipo email, ex. ana@gmail.com')
        .min(5, 'El Correo es muy corto')
        .max(50, 'excede el maximo')
        .required('El correo es obligatorio'),

    pass: Yup.string()
        .min(5, 'Mínimo 5 caracteres')
        .max(10, 'Máximo 10')
        .required('La contraseña es obligatoria')
});

export const Login = () => {

    const dispatch = useDispatch()

    const handleGoogle = () => {
        dispatch(loginGoogle())
    }

    const handleFacebook = () => {
        dispatch(loginFacebook())
    }

    return (
        <section className='login'>
            <Formik
                initialValues={
                    {
                        email: '',
                        pass: '',
                    }
                }
                validationSchema={SignupSchema}
                onSubmit={values => {
                    console.log(values)
                    dispatch(loginEmailPassAsync(values.email, values.pass))
                }}
            >
                {({ errors, touched, handleSubmit, handleChange, handleReset }) => (
                    <Form
                        className='formulario'>
                        <img style={{ width: '2.5rem' }} src="https://cdn-icons-png.flaticon.com/512/287/287221.png" alt="" />

                        <h2>Iniciar sesión</h2>

                        <Field name="email" placeholder="Correo Electronico" type="email" />
                        {errors.email && touched.email ?
                            (<small>{errors.email}</small>) : null}

                        <Field name="pass" placeholder="Contraseña" type="password" />
                        {errors.pass && touched.pass ?
                            (<small>{errors.pass}</small>) : null}

                        <button type="submit" >Enviar</button>

                        <div className='btnCont'>
                            <div className="auth__social-networks">
                                <button
                                    type='button'
                                    className="google-btn"
                                    onClick={handleGoogle}
                                >
                                    <div className="google-icon-wrapper">
                                        <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                                    </div>
                                </button>
                            </div>

                            <div className="auth__social-networks">
                                <button
                                    type='button'
                                    className="fb-btn"
                                    onClick={handleFacebook}
                                >
                                    <div className="google-icon-wrapper">
                                        <img className="google-icon" src="https://res.cloudinary.com/dcyn2bjb9/image/upload/v1647906709/samples/sprint2reto2/icon-facebook_wtrxil.svg" alt="google button" />
                                    </div>
                                </button>
                            </div>
                        </div>
                        <Link to="/register">Registrarse</Link>
                    </Form>
                )}
            </Formik>
        </section>
    );
} 
