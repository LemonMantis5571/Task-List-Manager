import React, {useState} from 'react';
import { createUser } from '../../services/users.service';
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup';
import registerIMG from '../../assets/images/register.png';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import { toast } from 'react-toastify';


const notifySuccess = (message) => {
    toast.success(message, {
    render: message,
    type: 'success',
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    isLoading: false
    });
}

const notifyError = (message) => {
    toast.error(message, {
    render: message,
    type: 'error',
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    isLoading: false
    });
}



const initialvalues = {
    username: '',
    password: '',
    passwordConfirmation: ''

}

const loginSchema = Yup.object().shape(

    {
        username: Yup.string().required('Username is required').min(2, 'Too Short')
        .max(30, 'Too Long'),
        password: Yup.string().required('Password is required').min(2, 'Too Short')
        .max(30, 'Too Long'),
        passwordConfirmation: Yup.string()
                    .test('passwords-match', 'Passwords must match', function(value){
                    return this.parent.password === value
                    }),
    }
)


const RegisterForm = () => {
    const Navigate = useNavigate();

    return (
        <div className='d-flex justify-content-center align-items-center align-self-center form-div flex-column'>
          <Formik 
            initialValues = { initialvalues }
            validationSchema = { loginSchema }
            onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 1000));
                
                createUser(values.username.toLowerCase(), values.password).then((response) => {
                        if (response.status === 200) {
                            notifySuccess('Account created successfully');

                            setTimeout(() => {
                                Navigate('/login');
                            }, 2000);
                            
                        }
                    }).catch((error) => {
                        console.log(error.response.status);
                        if(error.response && error.response.status === 409) {
                            notifyError('Account already exists');
                            
                        }else {
                            console.log(error);
                            notifyError('Something went wrong. Try again later');
                        }
                    });
                
                
            }}>
                {/* We obtain props from formik */}
                {({ isSubmitting}) => 
                    ( 
                        <Form className='login-form d-flex flex-column gap-3 justify-content-center align-items-center' name='form'>
                            <div className='d-flex w-100 h-100 login-container'>
                                <div className='w-100 h-100 img-div'>
                                    <img src={registerIMG} alt='registerVector'></img>
                                </div>
                                <div className='h-100 w-75 d-flex flex-column justify-content-center align-items-center parent-login-div'>
                                    <h6 className='display-6 fw-bold mb-3'> Register</h6>
                                    <div className='w-50 h-50'>
                                            <div className="mb-3 d-flex flex-column">
                                                <label htmlFor="username" style={{color: 'black'}} className='form-label badge fs-5'>Username</label>
                                                <div className='input-group d-flex'>
                                                    <span className="input-group-text" id="basic-addon1">
                                                        <i className='bi bi-person'></i>
                                                    </span>
                                                    <Field id="username" name="username"  type="input" placeholder="Username" className='form-control' />
                                                </div>
                                                     {/* Mensaje de error en username */}
                                                <ErrorMessage name='username' component='div' className='ErrorMessage bg-danger'></ErrorMessage>
                                            </div>
                                           
                                           

                                        <div className='mb-3 d-flex flex-column'>
                                            <label htmlFor="password" style={{color: 'black'}} className='form-label badge fs-5'>Password</label>
                                            <div className='input-group d-flex'>
                                                    <span className="input-group-text" id="basic-addon1">
                                                        <i className="bi bi-lock"></i>
                                                    </span>
                                                    <Field id="password" name="password" type="password" placeholder="Password"  className='form-control'/>
                                            </div>
                                            {/* Mensaje de error en password */}
                                            <ErrorMessage name='password' component='div' className='ErrorMessage bg-danger'></ErrorMessage>
                                        </div>

                                        <div className='mb-3 d-flex flex-column'>
                                            <label htmlFor="passwordConfirmation" style={{color: 'black'}} className='form-label badge fs-5'>Confirm Password</label>
                                            <div className='input-group d-flex'>
                                                    <span className="input-group-text" id="basic-addon1">
                                                        <i className="bi bi-arrow-repeat"></i>
                                                    </span>
                                                    <Field id="passwordConfirmation" name="passwordConfirmation" type="password" placeholder="Repeat Password"  className='form-control'/>
                                            </div>
                                            {/* Mensaje de error en password */}
                                            <ErrorMessage name='passwordConfirmation' component='div' className='ErrorMessage bg-danger'></ErrorMessage>
                                        </div>

                                        <button type="submit" disabled={isSubmitting} className='btn btn-primary'>Create account</button>       
                                    </div>
                                    </div>
                                </div>                            
                        </Form>

                    )
                }
               
          </Formik>
            
        </div>
    );
}

export default RegisterForm;
