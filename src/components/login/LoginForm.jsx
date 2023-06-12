import React, { useContext } from 'react';
import { getUser, loginUser } from '../../services/users.service';
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup';
import loginIMG from '../../assets/images/login.png';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { LOGIN, loginContext, SUCCESS } from './loginReducer';
import { toast } from 'react-toastify';

const initialvalues = {
    username: '',
    password: '',

}

/**
 * This function takes a message as an argument and returns a toast.loading(message) function.
 * @returns A toast object.
 */
const notifyLoading = (message) => {
    return toast.loading(message);
}

const notifySuccess = (message) => {
    const toastId = notifyLoading('Loading...');
    toast.update(toastId, {
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

const notifyError = (message, time) => {
    const toastId = notifyLoading('Loading...');
    toast.update(toastId, {
        render: message,
        type: 'error',
        position: "bottom-right",
        autoClose: time ? time : 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        isLoading: false
    });
}


const loginSchema = Yup.object().shape(

    {
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
    }
)



const LoginForm = () => {
    const { loginDispatch } = useContext(loginContext);
    const Navigate = useNavigate();

    return (
        <div className='d-flex justify-content-center align-items-center align-self-center form-div flex-column'>

            <Formik
                initialValues={initialvalues}
                validationSchema={loginSchema}
                onSubmit={async (values) => {

                    await new Promise((r) => setTimeout(r, 1000));
                    localStorage.removeItem('token');
                    notifyLoading('Login in...');

                    try {
                        const response = await loginUser(values.username, values.password);
                        localStorage.setItem('token', response.data.token);

                        if (response.status === 200) {
                            notifySuccess('LOGIN SUCCESSFUL');
                            toast.dismiss();
                            // Move the getUser() call inside the then block
                            try {

                                const user = await getUser();
                                loginDispatch({ type: LOGIN, payload: { id: user.data.id, user: user.data.user } });

                            } catch (error) {

                                console.log(error.response);

                            }

                            setTimeout(() => {

                                loginDispatch({ type: SUCCESS });
                                Navigate('/');

                            }, 1000);
                        }

                    } catch (error) {

                        if (error.response && error.response.status === 401) {
                            toast.dismiss();
                            notifyError('Wrong Credentials, Please Try Again');
                            toast.dismiss();

                        } else {

                            console.log(error);
                            notifyError('Something went wrong, please try again later.');
                            toast.dismiss();
                        }
                    };
                }}>
                {/* We obtain props from formik */}
                {({ isSubmitting }) =>
                (
                    <div className='login-form justify-content-center d-flex'>
                        <Form className='w-100 h-100 d-flex flex-column gap-3 justify-content-center align-items-center' name='form'>
                            <div className='d-flex w-100 h-100 login-container'>

                                <div className='w-100 h-100 img-div'>
                                    <img src={loginIMG} alt='loginVector' className='img-fluid'></img>
                                </div>

                                <div className='h-100 w-75 d-flex flex-column justify-content-center align-items-center parent-login-div'>

                                    <h6 className='display-6 fw-bold mb-3'>Login</h6>

                                    <div className="w-50 mb-3 d-flex flex-column input-div">
                                        <label htmlFor="username" style={{ color: 'black' }} className='form-label badge fs-5'>Username</label>
                                        <div className='input-group'>
                                            <span className="input-group-text" id="basic-addon1">
                                                <i className='bi bi-person'></i>
                                            </span>
                                            <Field id="username" name="username" type="input" placeholder="Username" className='form-control' />
                                        </div>
                                        {/* Mensaje de error en username */}
                                        <ErrorMessage name='username' component='div' className='ErrorMessage bg-danger'></ErrorMessage>
                                    </div>

                                    <div className='w-50 mb-3 d-flex flex-column input-div'>
                                        <label htmlFor="password" style={{ color: 'black' }} className='form-label badge fs-5'>Password</label>
                                        <div className='input-group'>
                                            <span className="input-group-text" id="basic-addon1">
                                                <i className="bi bi-lock"></i>
                                            </span>
                                            <Field id="password" name="password" type="password" placeholder="Password" className='form-control' />
                                        </div>
                                        {/* Mensaje de error en password */}
                                        <ErrorMessage name='password' component='div' className='ErrorMessage bg-danger'></ErrorMessage>
                                    </div>

                                    <button type="submit" disabled={isSubmitting} className='btn btn-primary'>Log In!</button>
                                </div>
                            </div>
                        </Form>
                    </div>

                )
                }
            </Formik>
        </div>
    );
}

export default LoginForm;
