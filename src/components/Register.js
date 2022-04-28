import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { registerAsync} from '../redux/actions/actionRegister';
import { Link } from 'react-router-dom';

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
                    <Field name="nombre" placeholder="Nombre" type="text" style={{ margin: "2%" }} />
                    {errors.nombre && touched.nombre ?
                        (<div>{errors.nombre}</div>) : null}

                    <Field name="email" placeholder="Correo Electronico" type="email" style={{ margin: "2%" }} />
                    {errors.email && touched.email ?
                        (<div>{errors.email}</div>) : null}

                    <Field name="pass" placeholder="Contraseña" type="password" style={{ margin: "2%" }} />
                    {errors.pass && touched.pass ?
                        (<div>{errors.pass}</div>) : null}


                    <Field name="pass2" placeholder="Confirmar contraseña" type="password" style={{ margin: "2%" }} />
                    {errors.pass2 && touched.pass2 ?
                        (<div>{errors.pass2}</div>) : null}

                    <button type="submit" style={{ margin: "2%"}}>Enviar</button>
                    <Link to="/login">Iniciar Sesión</Link>
                </Form>
            )}
            
        </Formik>
    </div>
);
} 
