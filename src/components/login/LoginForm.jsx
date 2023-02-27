import React, {useContext, useState} from 'react';
import { loginUser } from '../../services/users.service';
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import { loginContext, SUCESS } from './loginReducer';

const initialvalues = {
    username: '',
    password: '',

}




const loginSchema = Yup.object().shape(

    {
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    }
)






const LoginForm = () => {
    const {loginState, loginDispatch} = useContext(loginContext);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const Navigate = useNavigate();

    const clearMessages = () => {
        setTimeout(() => {
          setErrorMessage(null);
          setSuccessMessage(null);
        }, 2000);
      };

    return (
        <div className='d-flex justify-content-center align-items-center align-self-center form-div flex-column'>
        <h4 style={{color: 'white'}}>Welcome To Your Task Manager</h4>
          <Formik 
            initialValues = { initialvalues }
            validationSchema = { loginSchema }
            onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                
                loginUser(values.username, values.password).then((response) => {
                        console.log(response.status);
                        localStorage.setItem('token', response.data.token);

                        if (response.status === 200) {
                            setSuccessMessage('LOGIN SUCCESSFUL');
                            loginDispatch({type: SUCESS});

                            clearMessages();

                            setTimeout(() => {
                                Navigate('/');
                            }, 2000);
                            
                        }

                    }).catch((error) => {
                        if(error.response && error.response.status === 401) {
                            setErrorMessage('Wrong Credentials, Please Try Again')
                            clearMessages();
                        }else {
                            console.log(error);
                            setErrorMessage('Something went wrong, please try again later.');
                            clearMessages();
                        }
                    });
                
                
            }}>
                {/* We obtain props from formik */}
                {({ isSubmitting}) => 
                    ( 
                        <Form className='login-form d-flex flex-column gap-3 justify-content-center align-items-center ' name='form'>
                            <label htmlFor="username" style={{color: 'white'}} className='form-label badge fs-5'>Username</label>
                            <Field id="username" name="username"  type="username" placeholder="LemonMantis5571" className='form-control' />
                                {/* Mensaje de error en email */}
                       
                                <ErrorMessage name='username' component='div' className='ErrorMessage bg-danger'></ErrorMessage>

                       
                            <label htmlFor="password" style={{color: 'white'}} className='form-label badge fs-5'>Password</label>
                            <Field id="password" name="password" type="password" placeholder="Dont use real password"  className='form-control'/>
                                {/* Mensaje de error en password */}
                           
                                <ErrorMessage name='password' component='div' className='ErrorMessage bg-danger'></ErrorMessage>
                                  
                            <button type="submit" disabled={isSubmitting} className='btn btn-primary'>Submit</button>
                            
                            {isSubmitting ? (<p className='ErrorMessage bg-success'>Login in...</p>) : null}
                            {errorMessage ? (<div className='ErrorMessage bg-danger'>{errorMessage}</div>) : null}
                            {successMessage ? (<div className='ErrorMessage bg-success'>{successMessage}</div>) : null}
                        </Form>

                    )
                }
               
          </Formik>
            
        </div>
    );
}

export default LoginForm;
