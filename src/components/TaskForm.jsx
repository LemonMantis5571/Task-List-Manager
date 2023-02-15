import React, {useRef} from 'react';
import { ADD_TASK,  TaskDispatchContext} from './container/TaskContainer';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';

    



const TaskForm = () => {
    const initialValues = { 
        name: '',
        description: '',
    }
    const taskSchema = Yup.object().shape(
        {
            name: Yup.string().min(2, 'Too Short')
                .max(30, 'Too Long')
                .required('Task name is required'),

            description: Yup.string().min(2,'Need a better Description')
                .required('Description required')
        }
    )

    const {dispatch} = TaskDispatchContext();

    
    const submit = (values) => {
        
        dispatch({
            type: ADD_TASK,
            payload: {
                name: values.name,
                description: values.description
            }
        })
    }

    return (
    <div>
        <Formik
            initialValues={initialValues}
            validationSchema={taskSchema}
            onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                submit(values);
            }}>
            {({isSubmitting, resetForm}) => (
                <div className='d-flex justify-content-center align-items-center w-100 form-div'>
                    <Form className='form-parent d-flex flex-column align-items-center justify-content-center align-self'>
                        <div className='mb-3'>
                            <label htmlFor="name" className='form-label badge bg-primary fs-5'>Task name</label>
                            <Field id="name" name="name"  type="text" placeholder="TaskNameExample" className='form-control' />
                                {/* Mensaje de error en taskName */}
                            <ErrorMessage name='name' component='div' className='ErrorMessage bg-danger'></ErrorMessage>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="description" className='form-label badge bg-primary fs-5'>Description</label>
                            <Field id="description" name="description"  type="description" placeholder="TaskDescriptionExample" className='form-control'/>
                                    {/* Mensaje de error en description */}
                            <ErrorMessage name='description' component='div' className='ErrorMessage bg-danger'></ErrorMessage>
                        </div>
                        <div>
                            <button type="submit" className='btn btn-success'>Create Task</button>
                                {isSubmitting ? (<p style={{color: 'white'}}>Submiting Task...</p>) : null}
                                {resetForm}
                        </div>
                    </Form>
                </div>
              
            )}
                

        </Formik>
                    

            
                {/* <form onSubmit={submit}>
                            <input 
                            type='text'
                            placeholder='Task Name'
                            ref={nameRef}
                            />
                            
                            <input 
                            type='text'
                            placeholder='description'
                            ref={descriptionRef}/>
                            <button type='submit'>Create Task</button>
                        </form> */}
    </div>
    );
}

export default TaskForm;
